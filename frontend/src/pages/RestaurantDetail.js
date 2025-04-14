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
            <h2>{restaurant.name}</h2>
            <p>{restaurant.description}</p>
            <p><strong>Location:</strong> {restaurant.location}</p>
            <p><strong>Cuisine type:</strong> {restaurant.cuisine}</p>
            <Link to={`/restaurant/${id}/booking`}>
                <button>Book a table</button>
            </Link>
            <Link to={`/restaurant/${id}/menu`}>
                <button>See meny</button>
            </Link>
            <Link to={`/restaurant/${id}/reviews`}>
                <button>See reviews</button>
            </Link>
        </div>
    );
}

export default RestaurantDetail;
