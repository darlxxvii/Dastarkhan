import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MapContainer from './MapContainer';
import dasLogo from '../dasLogo.png';

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/restaurants/')
      .then(res => {
        setRestaurants(res.data);
        setLoading(false);
      });
  }, []);

  const filteredRestaurants = restaurants.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <img src={dasLogo} className="logo"></img>
      <h3 id="wd">Dastarkhanga kosh keldiniz!</h3>
      <h1>Restaurants</h1>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map(restaurant => (
              <li key={restaurant.id}>
                        <Link to={`/restaurant/${restaurant.id}`}>
                            {restaurant.name} - {restaurant.location}
                        </Link>
                    </li>
            ))
          ) : (
            <li>Not found</li>
          )}
        </ul>
      )}
      <div className="map-container">
              <h1>Map</h1>
              <MapContainer />
          </div>
      <button onClick={() => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    window.location.href = '/login';
}}>Log out</button>
    </div>
  );
}

export default Restaurants;