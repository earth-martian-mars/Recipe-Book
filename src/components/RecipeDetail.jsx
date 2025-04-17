/* (for /recipe/:id)

This component will display the details of an individual recipe, 
including the ingredients and steps to make it. 
It will use the id parameter from the URL to fetch and display the specific recipe.

*/

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchRecipe = async () => {
      const url = `https://your-api-url.com/api/recipes/${id}`; // Replace with your API URL

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setRecipe(data.recipe); // Assuming the API returns the recipe in data.recipe
          setError(null);
        } else {
          setError(data.message || 'Failed to fetch recipe details.');
        }
      } catch (err) {
        setError('Error connecting to the server.');
        console.error(err);
      }
    };

    fetchRecipe();
  }, [id]); // Fetch recipe when the component mounts or when the ID changes

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!recipe) {
    return <p>Loading...</p>; // Show a loading message while fetching data
  }

  return (
    <div>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <p><strong>Ingredients:</strong></p>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p><strong>Instructions:</strong></p>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetail;