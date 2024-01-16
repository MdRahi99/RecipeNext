'use client'

import { useContext, useState } from 'react';
import RecipesList from '../Components/RecipesList/RecipesList';
import { RecipeContext } from '../Contexts/RecipeContext/RecipeContext';
import { useForm } from 'react-hook-form';
import AddRecipe from '../Components/AddRecipe/AddRecipe';
import Loader from '../Components/Loader/Loader';

const RecipesPage = () => {
    const { recipes, addNewItem, loading } = useContext(RecipeContext);

    const [showModal, setShowModal] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const onSubmit = async (data) => {
        await addNewItem(data);
        reset();
        closeModal()
    }

    if(loading){
        return <Loader />
    }

    return (
        <>
            <div>
                <div className='text-right'>
                    <button onClick={openModal} className='px-4 py-1 bg-orange-500 text-white font-bold text-lg lg:text-xl hover:bg-orange-400 font-sans hover:rounded-br-2xl rounded-tl-2xl uppercase shadow-lg shadow-orange-300'>
                        Add Recipe
                    </button>
                </div>
                <AddRecipe
                showModal={showModal}
                closeModal={closeModal}
                onSubmit={onSubmit}
                register={register}
                handleSubmit={handleSubmit}
                errors={errors} />
                {
                    recipes.length > 0 ?
                    <RecipesList />
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
