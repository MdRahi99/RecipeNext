'use client'
import Link from "next/link";
import Search from "../Search/Search";
import { useContext } from "react";
import { RecipeContext } from "@/app/Contexts/RecipeContext/RecipeContext";

const Header = () => {

    const {searchTerm, setSearchTerm, handleSearch, clearSearch} = useContext(RecipeContext);

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-4 lg:h-10 items-center justify-between">
                <Link href='/' className="text-xl px-3 text-orange-500 bg-orange-50 py-1 border-orange-400 border-l-4 border-b-2 rounded-tl-2xl font-semibold uppercase text-center font-serif">Recipe app</Link>
                <Search
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                clearSearch={clearSearch} />
            </div>
        </>
    );
};

export default Header;