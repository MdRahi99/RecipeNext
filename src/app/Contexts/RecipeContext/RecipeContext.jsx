'use client'
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const [ingredientsData, setIngredientsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchingData, setFetchingData] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                setFetchingData(true);
                const response = await axios.get('/api/recipes');
                setRecipes(response.data.recipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            } finally {
                setFetchingData(false);
            }
        };

        if (!fetchingData) {
            setLoading(false);
        }

        fetchRecipe();
    }, [recipes]);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await axios.get('/api/ingredients');
                setIngredientsData(response.data.ingredients);
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        };

        fetchIngredients();
    }, [ingredientsData]);

    const addNewItem = async (newRecipe) => {
        try {
            const response = await axios.post('/api/recipes', newRecipe);

            setRecipes((prevData) => [...prevData, response.data]);

            reset();

            onClose();
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            const response = await axios.delete(`/api/recipes/${id}`);
            if (response.data.message === 'Success') {
                setRecipes((prevRecipes) =>
                    prevRecipes.filter((recipe) => recipe.id !== id)
                );
            } else {
                console.error('Delete recipe failed:', response.data.error);
            }
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    return (
        <RecipeContext.Provider value={{ recipes, setRecipes, addNewItem, loading, handleDeleteClick, ingredientsData }}>
            {children}
        </RecipeContext.Provider>
    );
};

export default RecipeProvider;