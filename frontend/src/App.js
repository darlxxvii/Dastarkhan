import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Restaurants from './pages/Restaurants';
import RestaurantDetail from './pages/RestaurantDetail';
import Login from './pages/Login';
import BookingForm from './pages/BookingForm';
import Reviews from './pages/Reviews';
import RestaurantMenu from './pages/RestaurantMenu';
import MapContainer from './pages/MapContainer';

function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Restaurants />} />
        
          <Route
            path="/restaurant/:id" element={<RestaurantDetail />}
          />
          <Route path="/restaurant/:id/booking" element={<BookingForm />}/>
          <Route path="/restaurant/:id/reviews" element={<Reviews />}/>
          <Route path="/restaurant/:id/menu" element={<RestaurantMenu />} />

        </Routes>
        

      </div>
    </Router>
  );
}

export default App;
