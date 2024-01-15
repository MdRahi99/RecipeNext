'use client'

import axios from 'axios';
import { useState, useEffect } from 'react';
import RecipesList from '../Components/RecipesList/RecipesList';

const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipeTitles = async () => {
            try {
                const response = await axios.get('/api/recipes');
                setRecipes(response.data.recipes);
            } catch (error) {
                console.error('Error fetching recipe titles:', error);
            }
        };

        fetchRecipeTitles();
    }, []);

    return (
        <>
            <div>
                <RecipesList recipes={recipes} />
            </div>
        </>
    );
};

export default RecipesPage;
