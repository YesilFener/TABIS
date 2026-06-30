// Şehirlerin hangi ürünleri yetiştirebileceği ile ilgili bilgiler burada depolanıyor.

const cityData = {
    adana: {
      name: "Adana",
      products: ["Susam", "Nohut", "Patates", "Soğan", "Arpa", "Fasülye", "Patlıcan", "Nar", "Zeytin", "Şeftali", "Elma", "Badem", "Ceviz", "Kiraz", "Domates"],
      description: "Adana iklimi ve toprak yapısı, birçok tarım ürününün yetiştirilmesi için uygun koşullar sunar."
    },
    adiyaman: {
      name: "Adıyaman",
      products: ["Buğday", "Arpa", "Mısır"],
      description: "Adıyaman, sıcak iklimi ile buğday ve arpa ile tanınır."
    },
    afyonkarahisar: {
      name: "Afyonkarahisar",
      products: ["Buğday", "Domates", "Elma", "Kayısı", "Üzüm"],
      description: "Afyonkarahisar, süt ürünleri ve tütün üretimi ile meşhurdur."
    },
    aksaray: {
      name: "Aksaray",
      products: ["Buğday", "Arpa", "Şeker Pancarı", "Elma", "Karpuz"],
      description: "Aksaray, İç Anadolu'nun tahıl üretiminde önemli bir role sahiptir."
    },
    amasya: {
      name: "Amasya",
      products: ["Elma", "Kiraz", "Badem", "Mısır", "Patates"],
      description: "Amasya, özellikle elma üretimi ile tanınır."
    },
    ankara: {
      name: "Ankara",
      products: ["Buğday", "Arpa", "Şeker Pancarı", "Elma", "Patates"],
      description: "Ankara'nın karasal iklimi, hububat ve kök bitkilerinin yetişmesi için uygundur."
    },
    antalya: {
      name: "Antalya",
      products: ["Portakal", "Limon", "Mandalina", "Zeytin", "Domates", "Biber"],
      description: "Antalya'nın Akdeniz iklimi, turunçgiller ve sebze üretimi için elverişlidir."
    },
    artvin: {
      name: "Artvin",
      products: ["Fındık", "Meyve", "Patates", "Mısır", "Çay"],
      description: "Artvin, Karadeniz iklimi sayesinde fındık ve meyve yetiştiriciliğinde önemli bir şehir."
    },
    aydin: {
      name: "Aydın",
      products: ["İncir", "Zeytin", "Pamuk", "Badem"],
      description: "Aydın, sıcak iklimi ve verimli toprakları ile meyve ve zeytin üretiminde ön sıralarda yer alır."
    },
    balikesir: {
      name: "Balıkesir",
      products: ["Zeytin", "Ceviz", "Ayçiçeği", "Mısır", "Şeftali"],
      description: "Balıkesir, zeytin ve ceviz üretimi ile dikkat çeker."
    },
    bartin: {
      name: "Bartın",
      products: ["Fındık", "Meyve", "Patates", "Zeytin"],
      description: "Bartın, Karadeniz iklimi sayesinde fındık ve meyve yetiştirmeye elverişlidir."
    },
    batman: {
      name: "Batman",
      products: ["Buğday", "Pamuk", "Mısır", "Biber", "Zeytin", "Nar", "Fıstık", "Vişne"],
      description: "Batman, güneydoğu Anadolu Bölgesi'nin verimli toprakları ve sıcak iklimiyle buğday, pamuk ve fıstık gibi tarım ürünlerinin yetiştirilmesine olanak tanır."
    },
    bayburt: {
      name: "Bayburt",
      products: ["Buğday", "Arpa", "Patates", "Mısır", "Elma"],
      description: "Bayburt, İç Anadolu iklimine uygun olarak tahıl ve kök bitkileri üretir."
    },
    bingol: {
      name: "Bingöl",
      products: ["Buğday", "Arpa", "Elma", "Mısır", "Patates"],
      description: "Bingöl'ün karasal iklimi, tahıl ve meyve üretimine uygun bir ortam sunar."
    },
    bitlis: {
      name: "Bitlis",
      products: ["Patates", "Mısır", "Buğday", "Arpa", "Elma"],
      description: "Bitlis, soğuk iklimi ile patates ve buğday gibi kök bitkilerinin yetiştirilmesinde önemlidir."
    },
    bolu: {
      name: "Bolu",
      products: ["Elma", "Meyve", "Şeftali", "Patates", "Buğday"],
      description: "Bolu, Karadeniz ikliminin etkisiyle meyve üretimi ve patates yetiştiriciliği için uygundur."
    },
    bursa: {
      name: "Bursa",
      products: ["Kiraz", "Şeftali", "Domates", "Zeytin"],
      description: "Bursa'nın iklimi, meyve bahçeleri ve zeytinlikler için ideal koşulları sunar."
    },
    denizli: {
      name: "Denizli",
      products: ["Pamuk", "Şeker Pancarı", "Zeytin", "Meyve", "Biber"],
      description: "Denizli, özellikle tekstil sanayi için önemli bir pamuk üreticisidir."
    },
    diyarbakir: {
      name: "Diyarbakır",
      products: ["Buğday", "Arpa", "Mısır", "Pamuk", "Zeytin"],
      description: "Diyarbakır, tarıma elverişli topraklarıyla özellikle tahıl ve pamuk üretimiyle bilinir."
    },
    edirne: {
      name: "Edirne",
      products: ["Buğday", "Ayçiçeği", "Mısır", "Çavdar", "Patates"],
      description: "Edirne, Marmara bölgesinin verimli topraklarında tahıl ve sebze yetiştiriciliğiyle tanınır."
    },
    elazig: {
      name: "Elazığ",
      products: ["Kayısı", "Fındık", "Üzüm", "Meyve", "Pamuk"],
      description: "Elazığ, kayısı üretimi ile meşhurdur ve verimli topraklara sahiptir."
    },
    erzincan: {
      name: "Erzincan",
      products: ["Buğday", "Arpa", "Patates", "Elma", "Üzüm"],
      description: "Erzincan, İç Anadolu ikliminin etkisiyle tahıl ve meyve üretimi için uygundur."
    },
    erzurum: {
      name: "Erzurum",
      products: ["Buğday", "Arpa", "Patates", "Şeker Pancarı", "Meyve"],
      description: "Erzurum'un soğuk iklimi, buğday ve diğer tahıl ürünlerinin yetişmesi için uygundur."
    },
    eskişehir: {
      name: "Eskişehir",
      products: ["Mısır", "Ayçiçeği", "Patates", "Buğday"],
      description: "Eskişehir'in bozkır iklimi, tahıl ve ayçiçeği gibi tarım ürünlerinin yetişmesi için uygundur."
    },
    gaziantep: {
      name: "Gaziantep",
      products: ["Antepfıstığı", "Nar", "Biber", "Soğan", "Pamuk"],
      description: "Gaziantep, sıcak iklimi ile antepfıstığı ve baharatlı ürünlerin yetiştirilmesi için elverişlidir."
    },
    giresun: {
      name: "Giresun",
      products: ["Fındık", "Meyve", "Patates", "Mısır"],
      description: "Giresun, Karadeniz'in nemli iklimi sayesinde fındık ve meyve yetiştiriciliği için idealdir."
    },
    gümüşhane: {
      name: "Gümüşhane",
      products: ["Fındık", "Patates", "Meyve", "Arpa", "Buğday"],
      description: "Gümüşhane, fındık üretimiyle tanınır ve aynı zamanda patates ve hububat üretimi yapılır."
    },
    hakkari: {
      name: "Hakkâri",
      products: ["Buğday", "Patates", "Meyve"],
      description: "Hakkâri'nin dağlık yapısı, tarımda daha çok kök bitkileri ve tahılların yetişmesine olanak sağlar."
    },
    hatay: {
      name: "Hatay",
      products: ["Zeytin", "Nar", "Narenciye", "Biber", "Domates"],
      description: "Hatay, Akdeniz iklimi ile narenciye ve zeytin gibi ürünlerin yetiştirilmesine olanak tanır."
    },
    ığdır: {
      name: "Iğdır",
      products: ["Kayısı", "Buğday", "Elma", "Patates", "Mısır"],
      description: "Iğdır, verimli toprakları ve ılıman iklimi ile kayısı ve buğday gibi ürünlerin yetişmesi için uygundur."
    },
    isparta: {
      name: "Isparta",
      products: ["Gül", "Lavanta", "Elma", "Kiraz", "Patates"],
      description: "Isparta, gül üretimi ve lavanta tarlalarıyla tanınır."
    },
    istanbul: {
      name: "İstanbul",
      products: ["Domates", "Biber", "Patates", "Lahana", "Havuç", "Zeytin"],
      description: "İstanbul, farklı iklim ve toprak yapıları ile çeşitli tarım ürünlerine ev sahipliği yapmaktadır."
    },
    izmir: {
      name: "İzmir",
      products: ["Zeytin", "Üzüm", "Domates", "Limon", "Portakal", "İncir"],
      description: "İzmir, Akdeniz ikliminin etkisiyle meyve ve sebze üretimi açısından verimli topraklara sahiptir."
    },
    kahramanmaraş: {
      name: "Kahramanmaraş",
      products: ["Biber", "Pamuk", "Mısır", "Buğday"],
      description: "Kahramanmaraş, sıcak iklim ürünlerine uygundur."
    },
    karabük: {
      name: "Karabük",
      products: ["Elma", "Armut", "Patates", "Soğan", "Buğday"],
      description: "Karabük, Karadeniz iklimi etkisiyle meyve üretimi için uygun toprak yapısına sahiptir."
    },
    kastamonu: {
      name: "Kastamonu",
      products: ["Fındık", "Meyve", "Patates", "Buğday"],
      description: "Kastamonu, Karadeniz'in nemli iklimi sayesinde fındık ve meyve yetiştiriciliği için uygundur."
    },
    kayseri: {
      name: "Kayseri",
      products: ["Kayısı", "Patates", "Buğday"],
      description: "Kayseride kayısı ve patates üretimi yapılır."
    },
    kocaeli: {
      name: "Kocaeli",
      products: ["Fındık", "Ayçiçeği", "Mısır", "Patates"],
      description: "Kocaeli, Marmara bölgesinde zeytin ve fındık gibi meyve ve sebzelerin yetiştiği bir bölgedir."
    },
    konya: {
      name: "Konya",
      products: ["Buğday", "Arpa", "Yulaf", "Nohut", "Şeker Pancarı", "Elma"],
      description: "Konya'nın geniş ova alanları, tahıl ve bakliyat ürünlerinin yetişmesi için uygundur."
    },
    kutahya: {
      name: "Kütahya",
      products: ["Peynir", "Buğday", "Ayçiçeği", "Mısır", "Patates"],
      description: "Kütahya, peynir üretimi ve tahıl yetiştiriciliği ile bilinir."
    },
    malatya: {
      name: "Malatya",
      products: ["Kayısı", "Üzüm", "Pamuk", "Meyve", "Fındık"],
      description: "Malatya, kayısı üretimiyle ünlüdür ve verimli topraklarında birçok ürün yetiştirilir."
    },
    manisa: {
      name: "Manisa",
      products: ["Karpuz", "Tütün", "Üzüm"],
      description: "Manisa, özellikle üzüm ve zeytin üretimi ile bilinir."
    },
    mardin: {
      name: "Mardin",
      products: ["Meyve", "Zeytin", "Biber", "Buğday", "Pirinç"],
      description: "Mardin'in sıcak iklimi ve verimli toprakları, meyve ve zeytin gibi ürünlerin yetişmesini sağlar."
    },
    mersin: {
      name: "Mersin",
      products: ["Limon", "Portakal", "Narenciye", "Pamuk", "Biber"],
      description: "Mersin, Akdeniz iklimi ile narenciye ve sebze üretimi konusunda önemli bir merkezdir."
    },
    muğla: {
      name: "Muğla",
      products: ["Zeytin", "Meyve", "Narenciye", "Domates", "Biber"],
      description: "Muğla, zeytin ve narenciye üretimiyle tanınır."
    },
    mus: {
      name: "Muş",
      products: ["Buğday", "Arpa", "Meyve", "Patates"],
      description: "Muş, verimli topraklarında tahıl ve patates üretimiyle öne çıkar."
    },
    nevsehir: {
      name: "Nevşehir",
      products: ["Üzüm", "Kayısı", "Patates", "Elma"],
      description: "Nevşehir, üzümleri ve bağcılık faaliyetleriyle ünlüdür."
    },
    nigde: {
      name: "Niğde",
      products: ["Patates", "Elma", "Buğday", "Şeker Pancarı"],
      description: "Niğde, patates ve buğday üretimi açısından önemli bir merkezdir."
    },
    ordu: {
      name: "Ordu",
      products: ["Fındık", "Meyve", "Patates", "Zeytin"],
      description: "Ordu, Karadeniz ikliminin etkisiyle fındık üretiminde ön sıralarda yer alır."
    },
    osmaniye: {
      name: "Osmaniye",
      products: ["Nar", "Biber", "Pamuk", "Meyve"],
      description: "Osmaniye, Akdeniz iklimi ile nar ve biber üretimi için elverişlidir."
    },
    rize: {
      name: "Rize",
      products: ["Çay", "Meyve", "Fındık"],
      description: "Rize, çay üretimi ile meşhurdur ve Karadeniz iklimi sayesinde meyve yetiştiriciliği de yapılır."
    },
    sakarya: {
      name: "Sakarya",
      products: ["Fındık", "Ayçiçeği", "Mısır", "Patates", "Elma"],
      description: "Sakarya, tarım açısından verimli topraklara sahip olup, fındık ve ayçiçeği gibi ürünler yetiştirilir."
    },
    samsun: {
      name: "Samsun",
      products: ["Fındık", "Mısır", "Patates", "Elma"],
      description: "Karadeniz'in serin iklimi, fındık ve mısır gibi tarım ürünlerinin yetiştirilmesi için uygun ortam sağlar."
    },
    siirt: {
      name: "Siirt",
      products: ["Fıstık", "Zeytin", "Pamuk"],
      description: "Siirt, özellikle fıstık üretimi ile meşhurdur ve verimli topraklarıyla zeytin üretimi de yapılmaktadır."
    },
    sinop: {
      name: "Sinop",
      products: ["Fındık", "Patates", "Buğday"],
      description: "Sinop, Karadeniz ikliminin etkisiyle fındık ve meyve yetiştiriciliği ile öne çıkar."
    },
    sivas: {
      name: "Sivas",
      products: ["Buğday", "Patates", "Şeker Pancarı"],
      description: "Sivas, İç Anadolu'nun bozkırında tahıl üretimi ve patates yetiştiriciliği ile bilinir."
    },
    şanlıurfa: {
      name: "Şanlıurfa",
      products: ["Pirinç", "Pamuk", "Biber", "Mısır", "Fıstık"],
      description: "Şanlıurfa, sıcak iklimi ile tarımda önemli bir merkezdir, pirinç ve pamuk yetiştirilir."
    },
    tekirdag: {
      name: "Tekirdağ",
      products: ["Ayçiçeği", "Patates", "Üzüm", "Meyve", "Buğday"],
      description: "Tekirdağ, Marmara Bölgesi'nde ayçiçeği üretimi ve üzüm yetiştiriciliği ile öne çıkar."
    },
    tokat: {
      name: "Tokat",
      products: ["Elma", "Üzüm", "Biber", "Patates", "Buğday"],
      description: "Tokat, elma ve üzüm üretimi ile bilinir, aynı zamanda patates de yetiştirilir."
    },
    trabzon: {
      name: "Trabzon",
      products: ["Fındık", "Meyve", "Patates", "Çay", "Zeytin"],
      description: "Trabzon, Karadeniz iklimi ile fındık ve çay gibi ürünlerin yetiştirildiği bir bölgedir."
    },
    tunceli: {
      name: "Tunceli",
      products: ["Buğday", "Patates", "Arpa", "Şeker Pancarı"],
      description: "Tunceli, verimli topraklarıyla buğday ve patates yetiştiriciliği yapılır."
    },
    van: {
      name: "Van",
      products: ["Patates", "Buğday", "Elma"],
      description: "Van, soğuk iklimi ile patates ve buğday gibi ürünlerin yetişmesine olanak sağlar."
    },
    yalova: {
      name: "Yalova",
      products: ["Kiraz", "Çilek", "Domates", "Zeytin", "Biber"],
      description: "Yalova, verimli toprakları ve ılıman iklimi ile kiraz ve çilek üretiminde öne çıkar."
    },
    yozgat: {
      name: "Yozgat",
      products: ["Buğday", "Patates", "Şeker Pancarı"],
      description: "Yozgat, İç Anadolu ikliminin etkisiyle tahıl ve kök bitkileri üretiminde önemli bir yerdedir."
    },
    zonguldak: {
      name: "Zonguldak",
      products: ["Fındık", "Patates", "Zeytin"],
      description: "Zonguldak, Karadeniz iklimi ile fındık ve meyve üretimi açısından uygundur."
    }
  };
  
  export default cityData;
  