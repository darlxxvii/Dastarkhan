import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RestaurantMenu() {
  const { id: restaurantId } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [note, setNote] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/menu/?restaurant_id=${restaurantId}`)
      .then(res => setMenuItems(res.data))
      .catch(err => console.error('Menu error', err));
  }, [restaurantId]);

  const toggleItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handlePreorder = async () => {
    try {
      const token = localStorage.getItem('access');
      await axios.post('http://localhost:8000/api/preorder/', {
        restaurant_id: restaurantId,
        item_ids: selectedItems,
        note,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('PreOrder is made!');
      setSelectedItems([]);
      setNote('');
    } catch (err) {
      console.error('PreOrder error', err);
      alert('Couldn\'t make PreOrder');
    }
  };

  return (
    <div>
      <h3>Restauran Menu</h3>
      <ul>
        {menuItems.map(item => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleItem(item.id)}
              />
              <strong>{item.name}</strong> — {item.price}₸
              <p>{item.description}</p>
            </label>
          </li>
        ))}
      </ul>

      <textarea
        placeholder="Additional:"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button onClick={handlePreorder} disabled={selectedItems.length === 0}>
        Make Pre-Order 
      </button>
    </div>
  );
}

export default RestaurantMenu;
