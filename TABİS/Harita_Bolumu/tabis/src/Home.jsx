import React from 'react';
import { useNavigate } from 'react-router-dom';
import TurkeyMap from 'turkey-map-react';

const Home = () => {
  const navigate = useNavigate();

  const handleMapClick = (city) => {
    const cityName = city.name;  // Tıklanan şehri al
    navigate(`/city/${cityName.toLowerCase()}`);  // React Router ile yönlendir
  };

  return (
    <div className="turkey-map-container">
      {/* Bölge Seçimi başlığı */}
      <div className="region-title">Bölge Seçimi</div>

      <div className="turkey-map">
        <TurkeyMap
          hoverable={true}
          customStyle={{ idleColor: "#2b2d42", hoverColor: "ef233c" }}
          showTooltip={true}
          onClick={(city) => handleMapClick(city)}  // Tıklama işlemi
        />
      </div>
    </div>
  );
};

export default Home;
