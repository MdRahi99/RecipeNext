'use client'

import { MdKeyboardArrowLeft } from "@react-icons/all-files/md/MdKeyboardArrowLeft";
import { MdKeyboardArrowRight } from "@react-icons/all-files/md/MdKeyboardArrowRight";

const Slider = ({ showPrevItems, showNextItems, canShowPrev, canShowNext }) => {

    return (
        <>
            <div className="flex items-center">
                <button
                    onClick={showPrevItems}
                    className={`${canShowPrev ? '' : 'opacity-50'}`}
                    disabled={!canShowPrev}
                >
                    <MdKeyboardArrowLeft className="text-4xl text-black opacity-80" />
                </button>
                <button
                    onClick={showNextItems}
                    className={`${canShowNext ? '' : 'opacity-50'}`}
                    disabled={!canShowNext}
                >
                    <MdKeyboardArrowRight className="text-4xl text-black opacity-80" />
                </button>
            </div>
        </>
    );
};

export default Slider;
