/* (for /favorites)

Description: This component will display a list of favorited recipes for the authenticated user. It should check if the user is authenticated before rendering the list.

*/

import React, { useEffect, useState } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

  useEffect(() => {
    const fetchFavorites = async () => {
      const url = 'https://fsa-recipe.up.railway.app/api/favorites';

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log(data)

        if (response.ok) {
          setFavorites(data.data);
          setError(null);
        } else {
          setError(data.message || 'Failed to fetch favorites.');
        }
      } catch (err) {
        setError('Error connecting to the server.');
        console.error(err);
      }
    };

    fetchFavorites();
  }, [token]); // Fetch favorites when the component mounts or when the token changes

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (favorites.length === 0) {
    return <p>No favorite meals found.</p>; // Show a message if there are no favorites
  }

  return (
    <div>
      <h2>Your Favorite Meals</h2>
      <div className="favorites-list">
        {favorites.map((meal) => (
          <div key={meal.id} className="favorite-meal">
            <h3>{meal.strMeal}</h3>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <p><strong>Area:</strong> {meal.strArea}</p>
            <p><strong>Category:</strong> {meal.strCategory}</p>
            <p><strong>Instructions:</strong> {meal.strInstructions}</p>
            <p><strong>Tags:</strong> {meal.strTags}</p>
            <p><strong>Ingredients:</strong> {meal.strIngredients}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;