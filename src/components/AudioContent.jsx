import { useState } from 'react';
import PlayButton from "../assets/playbtn1.svg"

function AudioContent( {totalRecord} ) {
    const [isHovered, setIsHovered] = useState(false);
    
    return(
        <>
            {totalRecord === 0 ? (
                <div className="mt-10 text-center">
                    <p className="text-[1.75rem] font-semibold text-quaternary mb-3">You do not have any recording.</p>
                    <p className="text-[1.75rem] font-semibold text-black">Try record one now!</p>
                </div>
            ) : (
                <div className="mt-8">
                    <div className="flex items-center">
                        <div className="grow flex">
                            <img src={PlayButton} className='w-16 h-16'/>
                            <div className="flex flex-col ml-10">
                                <p className="text-2xl font-medium mb-1">Audio Title</p>
                                <p className="text-lg text-quaternary font-medium">Audio Title</p>
                            </div>
                        </div>
                        <div className="flex-none">
                            <button className='bg-transparent hover:bg-primary font-semibold text-primary hover:text-white px-5 py-3 text-xl rounded-lg flex gap-2 border-primary border-2 items-center'>DOWNLOAD AUDIO
                                <svg 
                                    className="w-4 h-4  hover:text-white fill-current transition-colors">
                                    <path d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196666 15.0217 0.000666667 14.5507 0 14V11H2V14H14V11H16V14C16 14.55 15.8043 15.021 15.413 15.413C15.0217 15.805 14.5507 16.0007 14 16H2Z" />
                                </svg>
                                
                            </button>
                        </div>
                    </div>
                </div> 
            )}
        </>
    )
}

export default AudioContent;