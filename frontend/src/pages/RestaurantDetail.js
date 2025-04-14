import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function RestaurantDetail() {
    const { id } = useParams(); 
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/restaurants/${id}/`) 
            .then(res => {
                setRestaurant(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Ошибка при загрузке данных ресторана", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!restaurant) {
        return <div>Restaurant not found.</div>;
    }

    return (
        <div>
            <div class="slider">
                <button class="prev" onclick="moveSlide(-1)">&#10094;</button>
                <div class="slides">
                    <img src="https://static.tildacdn.pro/tild3735-3537-4761-b462-363634646238/IMG_6637.jpg" class="Slide 1"/>
                    <img src="https://static.tildacdn.pro/tild3765-3632-4134-b132-306432396264/IMG_7030-HDR.jpg" alt="Slide 2" />
                    <img src="https://static.tildacdn.pro/tild3163-3934-4633-b562-383764323066/IMG_7053-HDR.jpg" alt="Slide 3" />
                </div>
                <button class="next" onclick="moveSlide(1)">&#10095;</button>

            </div>
            <h2>{restaurant.name}</h2>
            <p>{restaurant.description}</p>
            <p><strong>Location:</strong> {restaurant.location}</p>
            <p><strong>Cuisine type:</strong> {restaurant.cuisine}</p>
            <Link to={`/restaurant/${id}/booking`}>
                <button>Book a table</button>
            </Link>
            <Link to={`/restaurant/${id}/menu`}>
                <button>See menu</button>
            </Link>
            <Link to={`/restaurant/${id}/reviews`}>
                <button>See reviews</button>
            </Link>
        </div>
    );
}

export default RestaurantDetail;
