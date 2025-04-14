import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Reviews() {
  const { id: restaurantId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
    console.log(restaurantId)
  useEffect(() => {
    if (restaurantId) {
      axios.get(`http://localhost:8000/api/reviews/${restaurantId}/`)
        .then(res => setReviews(res.data))
        .catch(err => console.error('Ошибка загрузки отзывов', err));
    }
  }, [restaurantId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access'); 
      const res = await axios.post(
        'http://localhost:8000/api/reviews/',
        {
          rating,
          comment,
          restaurant_id: restaurantId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setReviews([...reviews, res.data]);
      setComment('');
      setRating(5);
    } catch (err) {
      console.error('Ошибка отправки отзыва:', err);
      alert('Try again later');
    }
  };
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
  
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1); 
  };
  
  return (
    <div>
      <h3>Reviews</h3>
      <p>Overall rating: <strong>{calculateAverageRating()}</strong> ⭐</p>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <strong>Rating: {review.rating}</strong>
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>

      <h4>Write a review:</h4>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </label>
        <textarea
          placeholder="Your review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">Send a review</button>
        
      </form>
    </div>
  );
}

export default Reviews;
