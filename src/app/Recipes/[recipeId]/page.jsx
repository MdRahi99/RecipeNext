'use client'

import RecipeCard from "@/app/Components/RecipeCard/RecipeCard";
import { RecipeContext } from "@/app/Contexts/RecipeContext/RecipeContext";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const RecipeDetails = ({ params }) => {

    const [recipe, setRecipe] = useState([]);
    const { recipes } = useContext(RecipeContext);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`/api/recipes/${params.recipeId}`);
                setRecipe(response.data.recipe);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipe();
    }, []);

    const { ingredients } = recipe;

    const hasCommas = ingredients && ingredients.includes(',');

    const ingredientsArray = hasCommas
        ? ingredients.split(',').map(item => item.trim())
        : [ingredients && ingredients.trim()];

    return (
        <>
            <div className="flex flex-col-reverse lg:flex-row justify-between divide-y-4 divide-y-reverse lg:divide-y-0 lg:divide-x-4 divide-orange-200 w-full gap-4">
                <div className="w-full lg:w-8/12">
                    <RecipeCard ingredientsArray={ingredientsArray} recipe={recipe} />
                    <Link href='/' className="px-4 py-2 bg-orange-400 text-white font-bold text-xl w-full hover:bg-orange-300 flex justify-center text-center">Back</Link>
                </div>
                <div className="flex flex-row lg:flex-col gap-4 lg:w-4/12 p-4">
                    {
                        recipes.map(recipe => {
                            const { id, title } = recipe
                            return <Link href={`/Recipes/${id}`} className="px-4 py-2 rounded-tl-2xl rounded-br-2xl text-center hover:bg-orange-400 hover:text-white shadow-inner shadow-orange-400" key={id}>
                                <h1 className="text-sm lg:text-xl font-bold">{title}</h1>
                            </Link>
                        })
                    }
                </div>
            </div>
        </>
    );
};

export default RecipeDetails;