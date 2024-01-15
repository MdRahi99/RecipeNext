'use client'

import { useContext } from 'react';
import RecipesList from '../Components/RecipesList/RecipesList';
import { RecipeContext } from '../Contexts/RecipeContext/RecipeContext';

const RecipesPage = () => {
    const {recipes} = useContext(RecipeContext);

    return (
        <>
            <div>
                <RecipesList recipes={recipes} />
            </div>
        </>
    );
};

export default RecipesPage;
