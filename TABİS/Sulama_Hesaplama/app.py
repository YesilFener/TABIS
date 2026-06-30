from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from datetime import datetime, timedelta
from collections import defaultdict

app = Flask(__name__)
CORS(app)

API_KEY = "55333e6718949a9676bad5de9569c941"

crop_data = {
    "buğday": {"daily_need": 5, "watering_interval": 24},
    "mısır": {"daily_need": 8, "watering_interval": 48},
    "arpa": {"daily_need": 4, "watering_interval": 72},
    "pamuk": {"daily_need": 12, "watering_interval": 24},
    "domates": {"daily_need": 6, "watering_interval": 24},
    "patates": {"daily_need": 7, "watering_interval": 48},
    "soya": {"daily_need": 10, "watering_interval": 72},
    "ayçiçeği": {"daily_need": 9, "watering_interval": 48},
    "şeker pancarı": {"daily_need": 10, "watering_interval": 72},
    "fasulye": {"daily_need": 5, "watering_interval": 48},
    "kabak": {"daily_need": 6, "watering_interval": 24},
    "biber": {"daily_need": 6, "watering_interval": 24},
    "salatalık": {"daily_need": 8, "watering_interval": 24},
    "kavun": {"daily_need": 7, "watering_interval": 48},
    "karpuz": {"daily_need": 8, "watering_interval": 48},
    "elma": {"daily_need": 12, "watering_interval": 168},
    "armut": {"daily_need": 10, "watering_interval": 168},
    "üzüm": {"daily_need": 9, "watering_interval": 72},
    "nar": {"daily_need": 7, "watering_interval": 72},
    "zeytin": {"daily_need": 5, "watering_interval": 168},
    "portakal": {"daily_need": 10, "watering_interval": 168},
    "limon": {"daily_need": 9, "watering_interval": 168},
    "çilek": {"daily_need": 5, "watering_interval": 24},
    "marul": {"daily_need": 4, "watering_interval": 24},
    "ıspanak": {"daily_need": 5, "watering_interval": 24},
    "nohut": {"daily_need": 5, "watering_interval": 72},
    "mercimek": {"daily_need": 4, "watering_interval": 72},
    "soğan": {"daily_need": 5, "watering_interval": 48},
    "sarımsak": {"daily_need": 4, "watering_interval": 48}
}


def get_weather_data(city):
    url = "https://api.openweathermap.org/data/2.5/forecast"

    params = {
        "q": f"{city},TR",
        "appid": API_KEY,
        "units": "metric",
        "lang": "tr"
    }

    response = requests.get(url, params=params, timeout=10)
    response.raise_for_status()

    return response.json()["list"]


def convert_to_daily_weather(forecast_list):
    grouped = defaultdict(list)

    for item in forecast_list:
        date = item["dt_txt"].split(" ")[0]
        grouped[date].append(item)

    daily_data = []

    for date, items in grouped.items():
        temps = [x["main"]["temp"] for x in items]
        humidities = [x["main"]["humidity"] for x in items]
        rains = [x.get("rain", {}).get("3h", 0) for x in items]

        daily_data.append({
            "date": date,
            "avg_temp": round(sum(temps) / len(temps), 1),
            "avg_humidity": round(sum(humidities) / len(humidities), 1),
            "total_rain_mm": round(sum(rains), 1),
            "real_forecast": True
        })

    return daily_data


def extend_to_30_days(daily_weather):
    result = daily_weather.copy()

    last_days = result[-3:] if len(result) >= 3 else result

    avg_temp = sum(d["avg_temp"] for d in last_days) / len(last_days)
    avg_humidity = sum(d["avg_humidity"] for d in last_days) / len(last_days)
    avg_rain = sum(d["total_rain_mm"] for d in last_days) / len(last_days)

    last_date = datetime.strptime(result[-1]["date"], "%Y-%m-%d")

    while len(result) < 30:
        last_date += timedelta(days=1)

        result.append({
            "date": last_date.strftime("%Y-%m-%d"),
            "avg_temp": round(avg_temp, 1),
            "avg_humidity": round(avg_humidity, 1),
            "total_rain_mm": round(avg_rain, 1),
            "real_forecast": False
        })

    return result[:30]


def calculate_water_need(base_need, temp, humidity, rain):
    water = base_need

    if temp >= 35:
        water *= 1.35
    elif temp >= 30:
        water *= 1.20
    elif temp <= 10:
        water *= 0.60
    elif temp <= 15:
        water *= 0.80

    if humidity >= 75:
        water *= 0.75
    elif humidity <= 30:
        water *= 1.20

    if rain >= 10:
        water = 0
    elif rain >= 5:
        water *= 0.40
    elif rain >= 2:
        water *= 0.70

    return round(max(water, 0), 2)


def generate_watering_schedule(daily_weather, crop):
    schedule = []

    interval_days = max(1, crop["watering_interval"] // 24)
    base_need = crop["daily_need"]

    for i, day in enumerate(daily_weather):
        should_water = i % interval_days == 0

        daily_water = 0
        decision = "Sulama yapılmayacak"

        if should_water:
            daily_water = calculate_water_need(
                base_need,
                day["avg_temp"],
                day["avg_humidity"],
                day["total_rain_mm"]
            )

            if daily_water > 0:
                decision = "Sulama yapılacak"
            else:
                decision = "Yağış yeterli, sulama yapılmayacak"

        schedule.append({
            "date": day["date"],
            "decision": decision,
            "daily_water": daily_water,
            "avg_temp": day["avg_temp"],
            "avg_humidity": day["avg_humidity"],
            "rain_mm": day["total_rain_mm"],
            "data_type": "Gerçek tahmin" if day["real_forecast"] else "30 güne tamamlanan tahmin"
        })

    return schedule


@app.route("/get_schedule", methods=["POST"])
def get_schedule():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "JSON veri gönderilmedi."}), 400

        city = data.get("city", "").strip()
        crop_name = data.get("crop", "").strip().lower()

        if not city:
            return jsonify({"error": "Şehir bilgisi eksik."}), 400

        if not crop_name:
            return jsonify({"error": "Ürün bilgisi eksik."}), 400

        crop = crop_data.get(crop_name)

        if not crop:
            return jsonify({
                "error": f"{crop_name} ürünü bulunamadı.",
                "available_crops": list(crop_data.keys())
            }), 400

        forecast_list = get_weather_data(city)
        daily_weather = convert_to_daily_weather(forecast_list)
        monthly_weather = extend_to_30_days(daily_weather)
        schedule = generate_watering_schedule(monthly_weather, crop)

        return jsonify({
            "city": city,
            "crop": crop_name,
            "note": "İlk günler OpenWeather gerçek tahminidir. Kalan günler ortalama değerlere göre 30 güne tamamlanmıştır.",
            "schedule": schedule
        })

    except requests.exceptions.RequestException as e:
        return jsonify({
            "error": f"Hava durumu servisine ulaşılamadı: {str(e)}"
        }), 500

    except Exception as e:
        return jsonify({
            "error": f"Sunucu hatası: {str(e)}"
        }), 500


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "TABİS Sulama API çalışıyor.",
        "endpoint": "/get_schedule"
    })


if __name__ == "__main__":
    app.run(debug=True, port=3002)