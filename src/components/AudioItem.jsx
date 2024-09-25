import PlayButton from "../assets/playbtn1.svg";
import DeleteIcon from "../assets/delete.svg";

function AudioItem({ audio, active, onClick }) {
    return (
        <div 
            className={`pl-7 pr-10 py-4 flex items-center lexend rounded-3xl cursor-pointer ${active ? 'bg-primary text-white' : ''} group`}
            onClick={onClick}
        >
            <div className="flex space-x-8 grow">
                <img
                    src={PlayButton}
                    alt="playButton"
                    className={`w-8 ${active ? 'filter brightness-0 invert' : ''}`}
                />
                <p className={`text-[1.375rem] font-${active ? 'medium' : 'bold'}`}>{audio.title}</p>
            </div>
            <div className="flex-none mr-5">
                <p className={`text-lg ${active ? 'text-white' : 'text-quaternary'}`}>{audio.datetime}</p>
            </div>
            <div className="flex items-center flex-none relative">
                <p className={`text-lg ${active ? 'text-white' : 'text-quaternary'} transition-all duration-100`}>{audio.duration}</p>
            </div>

            {/* show delete icon when hovering through the active audio */}
            {
                active === true ?  (
                    <img
                        src={DeleteIcon}
                        alt="Delete"
                        className="w-5 group-hover:ml-4 opacity-0 group-hover:opacity-100 transition-all duration-100 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation(); 
                            onDelete(audio.id); 
                        }}
                    />
                ) : (
                    <>
                    </>
                )
            }
        </div>
    );
}

export default AudioItem;
