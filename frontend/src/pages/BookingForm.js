import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BookingForm() {
    const { id: restaurantId } = useParams(); 
    const [tables, setTables] = useState([]);
    const [formData, setFormData] = useState({
        tableId: '',
        date: '',
        time: '',
    });
    const [status, setStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8000/api/restaurants/${restaurantId}/tables/`)
            .then(res => {
                console.log(res.data);
                setTables(res.data);
            })
            .catch(err => {
                console.error("Ошибка при загрузке столов:", err);
                setErrorMessage('Couldn\'t load tables. Try again.');
            });
    }, [restaurantId]);
    console.log(localStorage.getItem('access'));


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('access');
        if (!token) {
            setErrorMessage('Not authorized');
            setStatus('error');
            return;
        }
    
        const payload = {
            restaurant_id: restaurantId,
            table_id: formData.tableId,
            date: formData.date,
            time: formData.time,
        };
    
        axios.post('http://localhost:8000/api/create_booking/', payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            setStatus('success');
            setErrorMessage('');
        })
        .catch((err) => {
            setStatus('error');
            console.error("Ошибка при создании бронирования:", err);
            setErrorMessage('Reservation error. Try again.');
        });
    };
    

    return (
        <div>
            <h3>Make a reservation</h3>
            <form onSubmit={handleSubmit}>
                <label>Choose a table:</label>
                <select name="tableId" onChange={handleChange} value={formData.tableId} required>
                    <option value="">--Choose--</option>
                    {tables.length > 0 ? (
                        tables.filter(table => table.is_available).map(table => (
                            <option key={table.id} value={table.id}>
                                Table #{table.id} (Seats: {table.size}, {table.is_available ? 'Available' : 'Not available'})
                            </option>
                        ))
                    ) : (
                        <option>No available tables</option>
                    )}
                </select>

                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                <input type="time" name="time" value={formData.time} onChange={handleChange} required />
                <button type="submit">Reserve</button>
            </form>

            {status === 'success' && <p style={{ color: 'green' }}>Success!</p>}
            {status === 'error' && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}

export default BookingForm;
