import { useContext } from 'react';
import { RecipeContext } from '@/app/Contexts/RecipeContext/RecipeContext';
import ListData from './ListData';

const RecipesList = () => {

    const { recipes, handleDeleteClick, filteredRecipes, loading } = useContext(RecipeContext);

    return (
        <>
            <div className="w-full flex flex-col rounded-2xl p-3 lg:p-8 shadow-2xl shadow-orange-100 gap-3">
                <div className='flex items-center justify-between px-4 py-2 border-b-2 bg-orange-50 border-dashed border-orange-400'>
                    <div className='flex items-center gap-4 lg:gap-28'>
                        <h1 className='text-lg font-bold text-black w-16'>#</h1>
                        <h1 className='text-lg font-bold text-black'>Name</h1>
                    </div>
                    <div className='flex items-center gap-12 lg:gap-52'>
                        <h1 className='text-lg font-bold text-black'>View</h1>
                        <h1 className='text-lg font-bold text-black'>Delete</h1>
                    </div>
                </div>
                <div className='flex flex-col gap-4 bg-white py-2'>
                    {filteredRecipes.length > 0 ? (
                        filteredRecipes.map((recipe, index) => {
                            return <ListData key={index} recipe={recipe}
                            handleDeleteClick={handleDeleteClick}
                            loading={loading} />
                        })
                    ) : (
                        recipes.map((recipe, index) => {
                            return <ListData key={index} recipe={recipe}
                            handleDeleteClick={handleDeleteClick}
                            loading={loading} />
                        })
                    )}
                </div>
            </div>
        </>
    );
};

export default RecipesList;