import Link from "next/link";
import { MdDelete } from '@react-icons/all-files/md/MdDelete';
import { CgMoreR } from '@react-icons/all-files/cg/CgMoreR';
import Loader from "../Loader/Loader";

const ListData = ({recipe, handleDeleteClick, loading}) => {

    const { id, title } = recipe;

    if(loading){
        return <Loader />
    }

    return (
        <>
            <div className='hover px-4 py-2 flex items-center justify-between'>
                <div className='flex items-center gap-4 lg:gap-28'>
                    <h1 className='font-bold text-lg w-16 font-mono'>{id}</h1>
                    <Link href={`/Recipes/${id}`} className='font-bold text-lg hover:text-orange-500 font-mono'>{title}</Link>
                </div>
                <div className='flex items-center gap-12 lg:gap-52'>
                    <Link href={`/Recipes/${id}`} className='font-bold text-lg font-mono pr-1'><CgMoreR className='text-2xl text-sky-600 hover:text-sky-400 font-bold' /></Link>
                    <button onClick={() => handleDeleteClick(id)} className='font-bold text-lg font-mono px-4'><MdDelete className='text-2xl hover:text-orange-400 text-orange-600' /></button>
                </div>
            </div>
        </>
    );
};

export default ListData;