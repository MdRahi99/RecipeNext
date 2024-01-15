'use client'

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const RecipeDetails = ({ params }) => {

    const [recipe, setRecipe] = useState([]);

    useEffect(() => {
        const fetchRecipeTitles = async () => {
            try {
                const response = await axios.get(`/api/recipes/${params.recipeId}`);
                setRecipe(response.data.recipe);
            } catch (error) {
                console.error('Error fetching recipe titles:', error);
            }
        };

        fetchRecipeTitles();
    }, []);
    const { id, imageURL, ingredients, instructions, title } = recipe;

    const hasCommas = ingredients && ingredients.includes(',');

    const ingredientsArray = hasCommas
        ? ingredients.split(',').map(item => item.trim())
        : [ingredients && ingredients.trim()];

    return (
        <>
            <div className="flex items-center justify-between w-full">
                <div className="w-full flex flex-col lg:flex-row lg:w-8/12 h-fit">
                    <div className="lg:w-1/2">
                        <Image
                            className="h-96 w-full"
                            src={imageURL}
                            alt="Description of the image"
                            width={500}
                            height={300}
                        />
                    </div>
                    <div className="flex flex-col gap-8 bg-orange-50 p-6 lg:w-1/2 max-h-fit">
                        <h1 className="text-2xl font-serif uppercase px-3 py-1 shadow-2xl shadow-orange-400 text-center font-bold">{title}</h1>
                        <div>
                            <p className="text-xl font-semibold py-2 border-b-4 border-orange-300 mb-2 font-sans">Ingredients:</p>
                            <ul className="grid grid-cols-3 gap-3">
                                {ingredientsArray.map((ingredient, index) => (
                                    <li
                                        key={index}
                                        className="text-lg font-medium shadow-2xl bg-orange-400 text-center text-white px-2 py-1 rounded-tl-2xl rounded-br-2xl mt-4"
                                    >
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <p className="font-sans mt-4 font-normal overflow-hidden break-words border-t-2 shadow-xl rounded-tr-2xl border-dashed border-orange-600 p-3 w-full lg:max-w-[400px]">
                            {instructions}
                        </p>
                    </div>
                </div>
                <div className="hidden lg:w-4/12">

                </div>
            </div>
        </>
    );
};

export default RecipeDetails;