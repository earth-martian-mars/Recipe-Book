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
      const url = `https://fsa-recipe.up.railway.app/api/recipes/${id}`;

      try {
        const response = await fetch(url);
        console.log(response)
        const data = await response.json();
        console.log(data)
        
          setRecipe(data); // Assuming the API returns the recipe in data.recipe
          setError(null);
        
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

  const setFavorite = async() => {
    const token = localStorage.getItem("token")
    console.log(token)
    const response = await fetch(`https://fsa-recipe.up.railway.app/api/favorites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            mealId: recipe.idMeal,
            name: recipe.strMeal,
            imageUrl: recipe.strMealThumb,
            strArea: recipe.strArea
        })
    });
  }

  return (
    <div>
      <h2>{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <button onClick={()=>setFavorite()}>Set Favorite</button>
      <p><strong>Ingredients:</strong></p>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p><strong>Instructions:</strong></p>
      <p>{recipe.strInstructions}</p>
    </div>
  );
};

export default RecipeDetail;