'use client'

import { useContext, useEffect, useState } from 'react';
import RecipesList from '../Components/RecipesList/RecipesList';
import { RecipeContext } from '../Contexts/RecipeContext/RecipeContext';
import { useForm } from 'react-hook-form';
import AddRecipe from '../Components/AddRecipe/AddRecipe';
import Loader from '../Components/Loader/Loader';
import Slider from '../Components/Slider/Slider';

const RecipesPage = () => {
    const { recipes, addNewItem, loading } = useContext(RecipeContext);

    const [showModal, setShowModal] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const itemsPerPageDesktop = 6;
    const itemsPerPageMobile = 4;

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                setStartIndex(0); 
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize);
            }
        };
    }, []);

    const showNextItems = () => {
        setStartIndex((prevIndex) =>
            prevIndex + (typeof window !== 'undefined' && window.innerWidth >= 768 ? itemsPerPageDesktop : itemsPerPageMobile)
        );
    };

    const showPrevItems = () => {
        setStartIndex((prevIndex) =>
            Math.max(0, prevIndex - (typeof window !== 'undefined' && window.innerWidth >= 768 ? itemsPerPageDesktop : itemsPerPageMobile))
        );
    };

    const canShowNext =
        recipes.length > startIndex + (typeof window !== 'undefined' && window.innerWidth >= 768 ? itemsPerPageDesktop : itemsPerPageMobile);
    const canShowPrev = startIndex > 0;

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const onSubmit = async (data) => {
        const formattedIngredients = Array.isArray(data.ingredients)
            ? data.ingredients.join(', ')
            : data.ingredients;
        await addNewItem({ ...data, ingredients: formattedIngredients });
        reset();
        closeModal()
    }

    if (loading) {
        return <Loader />
    }

    const title = 'Add New Recipe'

    return (
        <>
            <div>
                <div className='flex items-center justify-between'>
                    <button onClick={openModal} className='px-4 py-1 bg-orange-500 text-white font-bold text-lg lg:text-xl hover:bg-orange-400 font-sans hover:rounded-br-2xl rounded-tl-2xl uppercase shadow-lg shadow-orange-300'>
                        Add Recipe
                    </button>
                    <Slider
                        showPrevItems={showPrevItems} showNextItems={showNextItems}
                        canShowPrev={canShowPrev}
                        canShowNext={canShowNext} />
                </div>
                <AddRecipe
                    title={title}
                    showModal={showModal}
                    closeModal={closeModal}
                    onSubmit={onSubmit}
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors} />
                {
                    recipes.length > 0 ?
                        <RecipesList
                            startIndex={startIndex}
                            itemsPerPageDesktop={itemsPerPageDesktop}
                            itemsPerPageMobile={itemsPerPageMobile} />
                        :
                        <div className='text-2xl font-bold text-center p-12 uppercase bg-orange-100 my-10 lg:my-20'>
                            <h1>No Recipes Found!!!</h1>
                        </div>
                }
            </div>
        </>
    );
};

export default RecipesPage;
