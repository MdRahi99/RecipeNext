'use client'

import { RecipeContext } from "@/app/Contexts/RecipeContext/RecipeContext";
import { useContext } from "react";

const AddRecipe = ({ title, showModal, closeModal, register, handleSubmit, onSubmit, errors, recipe }) => {

  const { ingredientsData } = useContext(RecipeContext);

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-5/6 lg:w-2/5 h-fit px-8 py-4 rounded-xl">
            <h2 className="text-2xl font-bold text-center border-b-2 border-black p-2 mb-6">{title}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 lg:gap-4'>
              <div>
                <h1 className="font-semibold text-lg mb-1">Recipe Name</h1>
                <input
                  type="text"
                  name="title"
                  defaultValue={recipe ? recipe.title : ''}
                  placeholder="Enter recipe name here"
                  className={`input input-bordered w-full mx-auto rounded-lg focus:outline-none ${errors.title ? 'border-red-500 focus:border-red-500' : ''
                    }`}
                  {...register("title", { required: 'Recipe name is required', maxLength: { value: 50, message: 'Recipe name must be at most 50 characters' } })}
                />
                {errors.title && <span className="text-red-500">{errors.title.message}</span>}
              </div>

              <div className="flex flex-col overflow-y-auto h-24 mt-4">
                {ingredientsData.map((ingredient) => (
                  <div key={ingredient.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`${ingredient.id}`}
                      value={ingredient.label}
                      defaultChecked={recipe && recipe.ingredients && recipe.ingredients.includes(ingredient.label)}
                      {...register("ingredients", {
                        required: 'Select at least one ingredient'
                      })}
                    />
                    <label htmlFor={`${ingredient.id}`} className="ml-2">
                      {ingredient.label}
                    </label>
                  </div>
                ))}
              </div>

              <div>
                <h1 className="font-semibold text-lg mb-1">Recipe Instructions</h1>
                <textarea
                  name="instructions"
                  defaultValue={recipe ? recipe?.instructions : ''}
                  className={`textarea textarea-bordered w-full mx-auto rounded-lg focus:outline-none ${errors.instructions ? 'border-red-500 focus:border-red-500' : ''
                    }`}
                  placeholder="Enter recipe instructions here"
                  {...register("instructions", { required: 'Recipe instructions is required', maxLength: { value: 1500, message: 'Recipe name must be at most 1500 characters' } })} >
                </textarea>
                {errors.instructions && <span className="text-red-500">{errors.instructions.message}</span>}
              </div>

              <div>
                <h1 className="font-semibold text-lg mb-1">Recipe Image Url</h1>
                <input
                  type="text"
                  name="imageURL"
                  defaultValue={recipe ? recipe?.imageURL : ''}
                  placeholder="Enter recipe image url here"
                  className={`input input-bordered w-full mx-auto rounded-lg focus:outline-none`}
                  {...register("imageURL")}
                />
              </div>

              <div className="flex items-center justify-between gap-4 lg:gap-8 mt-2 lg:mt-6">
                <button className="w-full lg:w-1/2 mx-auto rounded-xl p-2 shadow-md font-bold uppercase hover:bg-orange-600 hover:text-white shadow-orange-300">
                  Add
                </button>
                <button
                  onClick={closeModal}
                  className="w-full lg:w-1/2 mx-auto rounded-xl p-2 shadow-md font-bold uppercase hover:bg-orange-600 hover:text-white shadow-orange-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddRecipe;
