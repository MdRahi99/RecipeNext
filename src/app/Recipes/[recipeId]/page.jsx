'use client'

import AddRecipe from "@/app/Components/AddRecipe/AddRecipe";
import RecipeCard from "@/app/Components/RecipeCard/RecipeCard";
import { RecipeContext } from "@/app/Contexts/RecipeContext/RecipeContext";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const RecipeDetails = ({ params }) => {

    const { recipeId } = params;

    const [recipe, setRecipe] = useState([]);
    const { recipes, updateItem } = useContext(RecipeContext);

    const [showModal, setShowModal] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`/api/recipes/${recipeId}`);
                setRecipe(response.data.recipe);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recipe:', error);
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [recipeId, recipe]);

    const { ingredients } = recipe;

    const onSubmit = async (data) => {
        const formattedIngredients = Array.isArray(data.ingredients)
            ? data.ingredients.join(', ')
            : data.ingredients;

        try {
            await updateItem(recipeId, { ...data, ingredients: formattedIngredients });
            reset();
            closeModal();
        } catch (error) {
            console.error('Error updating recipe:', error);
            console.error('Axios error details:', error.response);
        }
    };

    const hasCommas = ingredients && ingredients.includes(',');

    const ingredientsArray = hasCommas
        ? ingredients.split(',').map(item => item.trim())
        : [ingredients && ingredients.trim()];

    const title = 'Update Recipe'

    return (
        <>
            <div className="flex flex-col-reverse lg:flex-row justify-between divide-y-4 divide-y-reverse lg:divide-y-0 lg:divide-x-4 divide-orange-200 w-full gap-4">
                <div className="w-full lg:w-9/12">
                    <RecipeCard ingredientsArray={ingredientsArray} recipe={recipe} loading={loading} />
                    <div className="flex items-center justify-between mt-6 gap-4">
                        <Link href='/' className="px-4 py-2 bg-orange-400 text-white font-bold text-xl w-full hover:bg-orange-300 flex justify-center text-center">Back</Link>
                        <button onClick={openModal} className="px-4 py-2 bg-orange-400 text-white font-bold text-xl w-full hover:bg-orange-300 flex justify-center text-center">Edit</button>
                    </div>
                </div>
                <AddRecipe
                    recipe={recipe}
                    title={title}
                    showModal={showModal}
                    closeModal={closeModal}
                    onSubmit={onSubmit}
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors} />
                <div className="lg:flex hidden lg:flex-col gap-4 lg:w-3/12 lg:pl-4 pb-3 lg:pb-0">
                    <p className="lg:block hidden text-xl border-b-4 border-orange-300 mb-2 pb-1 font-bold font-sans">Other Recipes:</p>
                    {
                        recipes.map(recipe => {
                            const { id, title } = recipe
                            return <Link href={`/Recipes/${id}`} className="px-4 py-1 rounded-tl-2xl rounded-br-2xl text-center hover:bg-orange-400 hover:text-white shadow-inner shadow-orange-400" key={id}>
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