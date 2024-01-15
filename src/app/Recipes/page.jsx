'use client'

import { useContext } from 'react';
import RecipesList from '../Components/RecipesList/RecipesList';
import { RecipeContext } from '../Contexts/RecipeContext/RecipeContext';

const RecipesPage = () => {
    const {recipes, setRecipes} = useContext(RecipeContext);

    return (
        <>
            <div>
                <RecipesList recipes={recipes} setRecipes={setRecipes} />
            </div>
        </>
    );
};

export default RecipesPage;
