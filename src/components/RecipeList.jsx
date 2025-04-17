/* (for /recipe)
This component will serve as the home page 
and display a list of at least 20 recipes. 
Each recipe can be linked to its detail page.
*/

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch("https://fsa-recipe.up.railway.app/api/recipes");
                if (!response.ok) {
                    throw new Error("Failed to fetch recipes");
                }
                const data = await response.json();
                setRecipes(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    if (loading) return <div>Loading recipes...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.idMeal}>
                        <Link to={`/recipe/${recipe.idMeal}`}>
                            <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ width: '100px', height: '100px' }} />
                            <h2>{recipe.strMeal}</h2>
                            <p>{recipe.strCategory} - {recipe.strArea}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
