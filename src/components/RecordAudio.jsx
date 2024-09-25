import Microphone from "../assets/microphone.svg";
import Upload from "../assets/upload.svg";
import { useRef } from "react";

function RecordAudio({onUpload}) {
    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            onUpload(file);
        }
    }

    return (
        <div className="flex flex-col gap-y-5 mt-10 text-center">

            {/* Start Recording Area */}
            <div className="border-2 border-black rounded-3xl p-12 border-dashed">
                <p className="font-semibold text-[1.75rem]">Start Recording</p>
                <div className="mt-5">
                    <button className="border-2 border-primary rounded-full p-6 hover:bg-primary group">
                        <img src={Microphone} alt="microphone icon" className="w-10 h-10 group-hover:filter group-hover:brightness-0 group-hover:invert"/>
                    </button>
                    <p className="mt-4">00:00/01:00</p>
                </div>
            </div>

            {/* Divider */}
            <div className="flex items-center mt-4">
                <hr className="flex-grow border-black" />
                <p className="mx-3 lexend font-medium text-xl">OR</p>
                <hr className="flex-grow border-black" />
            </div>

            {/* Upload Audio Area */}
            <div className="border-2 border-black rounded-3xl p-16 border-dashed">
                <input
                    type="file"
                    accept=".mp3,.wav,.m4a"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}  // Handles the file change event
                />
                <div>
                    <button className="" onClick={handleUploadClick}>
                        <img src={Upload} alt="upload icon" className="w-12 h-12"/>
                    </button>
                    <p className="mt-1 font-medium text-2xl">Upload an audio file</p>
                    <p className="mt-2 text-black text-lg">Drop your MP3/WAV/M4A here.</p>
                </div>
            </div>
        </div>
    )
}

export default RecordAudio;