import Link from 'next/link';
import {FaEdit} from '@react-icons/all-files/fa/FaEdit';
import {MdDelete} from '@react-icons/all-files/md/MdDelete';
import {GrFormView} from '@react-icons/all-files/gr/GrFormView';
import axios from 'axios';

const RecipesList = ({ recipes, setRecipes }) => {

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
        <>
            <div className="w-full flex flex-col rounded-2xl p-3 lg:p-8 shadow-2xl shadow-orange-100 gap-3">
                <div className='flex items-center justify-between px-4 py-2 border-b-2 bg-orange-50 border-dashed border-orange-400'>
                    <div className='flex items-center gap-4 lg:gap-28'>
                        <h1 className='text-lg font-bold text-black w-16'>#</h1>
                        <h1 className='text-lg font-bold text-black'>Name</h1>
                    </div>
                    <div className='flex items-center gap-4 lg:gap-52'>
                        <h1 className='text-lg font-bold text-black'>View</h1>
                        <h1 className='text-lg font-bold text-black'>Edit</h1>
                        <h1 className='text-lg font-bold text-black'>Delete</h1>
                    </div>
                </div>
                <div className='flex flex-col gap-4 bg-white py-2'>
                    {
                        recipes.map(recipe => {
                            const { id, title } = recipe;
                            return <div key={id} className='hover hover:bg-orange-50 px-4 py-2 flex items-center justify-between'>
                                <div className='flex items-center gap-4 lg:gap-28'>
                                    <h1 className='font-bold text-lg w-16 font-mono'>{id}</h1>
                                    <h1 className='font-bold text-lg font-mono'>{title}</h1>
                                </div>
                                <div className='flex items-center gap-4 lg:gap-52'>
                                    <Link href={`/Recipes/${id}`} className='font-bold text-lg font-mono px-3'><GrFormView className='text-3xl' /></Link>
                                    <h1 className='font-bold text-lg font-mono px-3'><FaEdit className='text-xl hover:text-sky-600 text-sky-400' /></h1>
                                    <button  onClick={() => handleDeleteClick(id)} className='font-bold text-lg font-mono px-3'><MdDelete className='text-xl hover:text-orange-400 text-orange-600' /></button>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    );
};

export default RecipesList;