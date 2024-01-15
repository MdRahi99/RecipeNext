import Link from "next/link";
import Search from "../Search/Search";

const Header = () => {
    return (
        <>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-4 lg:h-10 items-center justify-between">
                <Link href='/' className="text-xl px-3 text-orange-500 bg-orange-50 py-1 border-orange-400 border-l-4 border-b-2 rounded-tl-2xl font-semibold uppercase text-center font-serif">Recipe app</Link>
                <Search />
            </div>
        </>
    );
};

export default Header;