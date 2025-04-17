import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import Login from './components/Login';
import Register from './components/Register';
import Favorites from './components/Favorites';


const RecipeBook = () => {
  const [recipe, setRecipe] = useState([]);
  const [error, setError] = useState(null);

  const drawRecipes = async () => {
    const url = `https://fsa-recipe.up.railway.app/api/recipes`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setRecipe(data.recipe);
        setError(null);
      } else {
        setError(`Failed to draw recipes`);
      }
    } catch (error) {
      setError(`Error fetching data`);
      console.error(error);
    }
  };

  // Call drawRecipes when the component mounts
  useEffect(() => {
    drawRecipes();
  }, []);

  return (
    <>
      <div id='container'>
        <div id='navbar'>
          <Link to={'/'}>RecipeList</Link> {/**/ }
          <Link to={'/recipe/:id'}>RecipeDetail</Link>
          <Link to={'/login'}>Login</Link>
          <Link to={'/register'}>Register</Link>
          <Link to={'/favorites'}>Favorites</Link>
        </div>
        <div id='main-section'>
          <Routes>
            <Route path='/' element={<RecipeList recipes={recipe} />} />
            <Route path='/recipe/:id' element={<RecipeDetail />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/favorites' element={<Favorites />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default RecipeBook;