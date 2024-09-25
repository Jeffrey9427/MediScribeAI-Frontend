import { GoChevronDown } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";

function TranscriptionContent() {
    return (
        <div className="tabs px-8 py-7 my-5 rounded-2xl shadow-xl mb-16">
            <div className="flex items-center">
                <div className="flex space-x-7 grow">
                    <button className="text-primary font-medium text-xl underline underline-offset-8">Transcription</button>
                    <button className="text-quaternary font-medium text-xl">Summary</button>
                </div>
                <div className="flex-none">
                    <GoChevronDown size={25}/>
                </div>

                
            </div>

            <div className="mt-8 px-3 border-primary border-l-[4px]">
                <p className="text-lg text-quinary flex space-x-4 items-center">
                    <span className="text-primary font-semibold">Speaker 1</span> 
                    <span>00:00</span>
                    <FaRegEdit size={22} className="-mt-1"/>
                </p>
                <p className="text-lg text-quinary mt-1">Selamat pagi, Pak. Apa kabar hari ini? </p>
            </div>
        </div>
    )
}

export default TranscriptionContent;

