import Link from 'next/link';
import React from 'react';
import {FaEdit} from '@react-icons/all-files/fa/FaEdit';
import {MdDelete} from '@react-icons/all-files/md/MdDelete';

const RecipesList = ({ recipes }) => {

    return (
        <>
            <div className="w-full flex flex-col rounded-2xl p-3 lg:p-8 shadow-2xl shadow-orange-100 gap-3">
                <div className='flex items-center justify-between px-4 py-2 border-b-2 bg-orange-50 border-dashed border-orange-400'>
                    <div className='flex items-center gap-4 lg:gap-28'>
                        <h1 className='text-lg font-bold text-black w-16'>#</h1>
                        <h1 className='text-lg font-bold text-black'>Name</h1>
                    </div>
                    <div className='flex items-center gap-4 lg:gap-52'>
                        <h1 className='text-lg font-bold text-black'>Edit</h1>
                        <h1 className='text-lg font-bold text-black'>Delete</h1>
                    </div>
                </div>
                <div className='flex flex-col gap-4 bg-white py-2'>
                    {
                        recipes.map(recipe => {
                            const { id, title } = recipe;
                            return <Link key={id} href={`/Recipes/${id}`} className='hover hover:bg-orange-50 px-4 py-2 flex items-center justify-between'>
                                <div className='flex items-center gap-4 lg:gap-28'>
                                    <h1 className='font-bold text-lg w-16 font-mono'>{id}</h1>
                                    <h1 className='font-bold text-lg font-mono'>{title}</h1>
                                </div>
                                <div className='flex items-center gap-4 lg:gap-52'>
                                    <h1 className='font-bold text-lg font-mono px-3'><FaEdit className='text-xl hover:text-sky-600 text-sky-400' /></h1>
                                    <h1 className='font-bold text-lg font-mono px-3'><MdDelete className='text-xl hover:text-orange-400 text-orange-600' /></h1>
                                </div>
                            </Link>
                        })
                    }
                </div>
            </div>
        </>
    );
};

export default RecipesList;