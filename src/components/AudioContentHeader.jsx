import PlayButton from "../assets/playbtn1.svg"
import PauseButton from "../assets/pause.svg"

function AudioContentHeader({ playing, handlePlayPause, audio }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        
        const formattedDate = date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    
        return formattedDate.replace(",", ""); // Optional: remove comma if not needed
    }

    return (
        <div className="flex items-center">
            <div className="grow flex">
                <img
                    src={playing ? PauseButton : PlayButton}
                    className="w-16 h-16 cursor-pointer"
                    onClick={handlePlayPause} 
                    alt="play/pause button"
                />
                <div className="flex flex-col ml-10">
                    <p className="text-2xl font-medium mb-1">{audio.file_name}</p>
                    <p className="text-lg text-quaternary font-medium">{formatDate(audio.created_at)}</p>
                </div>
            </div>
            <div className="flex-none">
                <a 
                    href={`http://127.0.0.1:8000/s3/audio/download/${audio.s3_key}`}
                    download 
                    className="bg-transparent hover:bg-primary font-semibold text-primary hover:text-white px-5 py-3 text-xl rounded-lg flex gap-2 border-primary border-2 items-center"
                >
                    DOWNLOAD AUDIO
                    <svg 
                        className="w-4 h-4 hover:text-white fill-current transition-colors">
                        <path d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196666 15.0217 0.000666667 14.5507 0 14V11H2V14H14V11H16V14C16 14.55 15.8043 15.021 15.413 15.413C15.0217 15.805 14.5507 16.0007 14 16H2Z" />
                    </svg>
                </a>
            </div>
        </div>
    )
}

export default AudioContentHeader;