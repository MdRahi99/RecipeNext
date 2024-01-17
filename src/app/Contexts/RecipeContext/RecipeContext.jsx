'use client'
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const [ingredientsData, setIngredientsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchingData, setFetchingData] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [clear, setClear] = useState(false);

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
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
    };

    const updateItem = async (id, updatedRecipe) => {
        try {
            const response = await axios.put(`/api/recipes/${id}`, updatedRecipe);
            if (response.data.message === 'Success') {
                setRecipes((prevRecipes) =>
                    prevRecipes.map((recipe) => (recipe.id === id ? response.data : recipe))
                );
            } else {
                console.error('Update recipe failed:', response.data.error);
            }
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            const response = await axios.delete(`/api/recipes/${id}`);
            if (response.data.message === 'Success') {
                setRecipes((prevRecipes) =>
                    prevRecipes.filter((recipe) => recipe.id !== id)
                );

                setFilteredRecipes((prevFilteredRecipes) =>
                    prevFilteredRecipes.filter((recipe) => recipe.id !== id)
                );
            } else {
                console.error('Delete recipe failed:', response.data.error);
            }
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    const handleSearch = () => {
        const filteredRecipes = recipes.filter((recipe) =>
            recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredRecipes(filteredRecipes);
    };

    const clearSearch = () => {
        setClear(true);
        if (clear) {
            setSearchTerm('');
            setFilteredRecipes(recipes);
        };
    };

    return (
        <RecipeContext.Provider value={{ recipes, setRecipes, addNewItem, updateItem, loading, handleDeleteClick, ingredientsData, searchTerm, setSearchTerm, handleSearch, filteredRecipes, clearSearch }}>
            {children}
        </RecipeContext.Provider>
    );
};

export default RecipeProvider;