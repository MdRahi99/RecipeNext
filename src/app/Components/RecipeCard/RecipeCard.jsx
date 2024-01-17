import Image from "next/image";
import Loader from "../Loader/Loader";

const RecipeCard = ({ ingredientsArray, recipe, loading }) => {

    const { imageURL, instructions, title } = recipe;

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4 flex-col lg:flex-row h-fit">
                    <div className="w-full h-96 lg:w-1/2">
                        {imageURL ?
                            <Image
                                className="rounded-tl-3xl rounded-br-3xl h-full w-full"
                                src={imageURL}
                                alt="Description of the image"
                                width={500}
                                height={300}
                                priority
                            />
                            :
                            <Image
                                className="h-96 w-full"
                                src='http://surl.li/pizdg'
                                alt="Description of the image"
                                width={500}
                                height={300}
                                priority
                            />
                        }
                    </div>
                    <div className="flex flex-col gap-8 bg-orange-50 p-6 w-full lg:w-1/2 h-96">
                        <h1 className="text-2xl font-sans uppercase px-3 py-1 shadow-2xl shadow-orange-400 text-center font-bold">{title}</h1>
                        <div>
                            <p className="text-xl font-semibold py-2 border-b-4 border-orange-300 mb-2 font-sans">Ingredients:</p>
                            <ul className="grid grid-cols-2 gap-3">
                                {ingredientsArray.map((ingredient, index) => (
                                    <li
                                        key={index}
                                        className="text-sm font-medium shadow-2xl bg-orange-400 text-center text-white px-2 py-1 rounded-tl-2xl rounded-br-2xl mt-4"
                                    >
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-xl mt-4 font-semibold py-2 border-b-4 border-orange-300 mb-2 font-sans">Instructions:</p>
                    <p className="font-sans font-normal overflow-hidden break-words shadow-orange-200 shadow-xl rounded-tr-2xl p-5 w-full">
                        {instructions}
                    </p>
                </div>
            </div>
        </>
    );
};

export default RecipeCard;