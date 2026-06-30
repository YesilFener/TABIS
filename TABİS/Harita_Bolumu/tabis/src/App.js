// React ve React Router kütüphanelerini içeri aktarıyoruz.
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';  // React Router'ı kullanabilmek için gerekli olan bileşenleri alıyoruz
import Home from './Home';  // Home bileşenini import ediyoruz
import CityPage from './CityPage';  // CityPage bileşenini import ediyoruz

// HomeWithParamCheck bileşeni, URL'deki 'TOKEN' parametresini kontrol eder ve yetkili ise Home sayfasını, yetkisiz ise "Yetkisiz Erişim" mesajını gösterir.
const HomeWithParamCheck = () => {
  // Geçerli URL'nin location bilgisini alıyoruz
  const location = useLocation();

  // URL parametrelerini almak için URLSearchParams kullanıyoruz
  const params = new URLSearchParams(location.search);

  // URL'den 'TOKEN' parametresini alıyoruz
  const TOKEN = params.get('TOKEN');

  // Eğer TOKEN parametresi doğruysa Home bileşenini render ediyoruz, değilse "Yetkisiz Erişim" mesajı gösteriyoruz (Yalnızca giriş yapmış kullanıcıların kullanabilmesi için)
  if (TOKEN === '81633ba8af85162b3bab4de04913f6c0') {
    return <Home />;  // Yetkili erişim, Home bileşeni render ediliyor
  } else {
    return <div>Yetkisiz Erişim</div>;  // Yetkisiz erişim, mesaj olarak gösteriliyor
  }
};

// Ana uygulama bileşeni
const App = () => {
  return (
    // React Router'ı kullanarak uygulama yönlendirmeleri yapıyoruz
    <Router>
      <Routes>
        {/* Ana sayfa rotası, HomeWithParamCheck bileşeni ile yönlendiriliyor */}
        <Route path="/" element={<HomeWithParamCheck />} />
        
        {/* Dinamik şehir sayfası, parametre olarak şehir adı alır */}
        <Route path="/city/:cityName" element={<CityPage />} />  {/* Dinamik şehir sayfası */}
      </Routes>
    </Router>
  );
};

// App bileşenini dışa aktarıyoruz
export default App;
