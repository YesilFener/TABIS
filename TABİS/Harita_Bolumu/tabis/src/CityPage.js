// React ve React Router'dan gerekli bileşenleri import ediyoruz
import React, { useState } from 'react';  // React ve useState hook'unu import ediyoruz
import { useParams } from 'react-router-dom';  // URL parametrelerini almak için useParams'ı import ediyoruz
import cityData from './cityData';  // Şehir bilgilerini içeren cityData dosyasını import ediyoruz
import './CityPage.css';  // Sayfa stillerini içeren CSS dosyasını import ediyoruz

// CityPage bileşeni, şehir bilgilerini ve sulama planını gösterir
const CityPage = () => {
  // URL'den gelen cityName parametresini alıyoruz
  const { cityName } = useParams();
  
  // cityData'dan cityName parametresi ile ilgili şehir bilgilerini alıyoruz
  const cityInfo = cityData[cityName.toLowerCase()];

  // schedule durumunu oluşturuyoruz, başlangıçta null
  const [schedule, setSchedule] = useState(null);

  // Eğer cityInfo mevcut değilse, hata mesajı döndürüyoruz
  if (!cityInfo) {
    return <div className="error-message">Şehir Bulunamadı</div>;
  }

  // Form gönderildiğinde çağrılacak fonksiyon
  const handleFormSubmit = async (event) => {
    event.preventDefault();  // Formun sayfanın yeniden yüklenmesini engelliyoruz

    // Kullanıcının seçtiği tarım ürününü alıyoruz
    const selectedProduct = event.target.urun.value;
    
    try {
      // Flask API'ye POST isteği gönderiyoruz
      const response = await fetch('http://127.0.0.1:3002/get_schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Gönderilen verinin JSON formatında olduğunu belirtiyoruz
        },
        // API'ye şehir ve seçilen ürün bilgilerini JSON formatında gönderiyoruz
        body: JSON.stringify({
          city: cityInfo.name,  // Şehir adını gönderiyoruz
          crop: selectedProduct, // Seçilen tarım ürününü gönderiyoruz
        }),
      });

      // Eğer API'den başarılı bir yanıt alınmazsa, hata mesajı gösteriyoruz
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || 'Bir hata oluştu');
        return;
      }

      // API'den alınan veriyi schedule durumuna kaydediyoruz
      const data = await response.json();
      setSchedule(data.schedule); // Bir aylık sulama planını alıyoruz
    } catch (error) {
      console.error('İstek sırasında bir hata oluştu:', error);
      alert('Sunucuya bağlanırken bir hata oluştu.');  // Hata durumunda kullanıcıyı bilgilendiriyoruz
    }
  };

  return (
    <div>
      <header>
        {/* Şehir adı ve tarım ürünleri başlığı */}
        <h1>{cityInfo.name} Tarım Ürünleri</h1>
      </header>
      <div className="container">
        {/* Şehir hakkında açıklama */}
        <p>{cityInfo.description}</p>
        
        {/* Tarım ürünü seçme formu */}
        <form id="tarim_form" onSubmit={handleFormSubmit}>
          <label htmlFor="urun">Hangi tarım ürününü yetiştirmek istersiniz?</label>
          <select name="urun" id="urun">
            {/* Şehirdeki mevcut ürünleri dropdown menüsünde listele */}
            {cityInfo.products.map((product, index) => (
              <option key={index} value={product.toLowerCase()}>{product}</option>
            ))}
          </select>
          <button type="submit">Seç</button>  {/* Formu gönderme butonu */}
        </form>

        {/* Eğer schedule bir dizi (Array) ise, sulama planını göster */}
        {Array.isArray(schedule) && (
          <div className="result">
            <h3>Sulama Planı ({cityInfo.name})</h3>
            <table>
              <thead>
                <tr>
                  <th>Tarih</th>  {/* Sulama tarihinin başlığı */}
                  <th>Günlük Su İhtiyacı (litre/m²)</th>  {/* Günlük su ihtiyacının başlığı */}
                </tr>
              </thead>
              <tbody>
                {/* Sulama planını tablo halinde listele */}
                {schedule.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>  {/* Sulama tarihini yazıyoruz */}
                    <td>{item.daily_water.toFixed(2)}</td>  {/* Günlük su ihtiyacını yazıyoruz */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <footer>
        <p>&copy; 2025 TABİS</p>  {/* Footer kısmı */}
      </footer>
    </div>
  );
};

// CityPage bileşenini dışa aktarıyoruz
export default CityPage;
