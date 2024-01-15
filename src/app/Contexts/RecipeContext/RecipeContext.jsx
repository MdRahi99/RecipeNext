'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecipeContext = createContext();

const RecipeProvider = ({children}) => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipeTitles = async () => {
            try {
                const response = await axios.get('/api/recipes');
                setRecipes(response.data.recipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipeTitles();
    }, []);

    return (
        <RecipeContext.Provider value={{ recipes, setRecipes }}>
            {children}
        </RecipeContext.Provider>
    );
};

export default RecipeProvider;