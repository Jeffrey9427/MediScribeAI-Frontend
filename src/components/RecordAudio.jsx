import Microphone from "../assets/microphone.svg";
import Upload from "../assets/upload.svg";

function RecordAudio() {
    return (
        <div className="flex flex-col gap-y-5 mt-10 text-center">

            {/* Start Recording Area */}
            <div className="border-2 border-black rounded-3xl p-12 border-dashed">
                <p className="font-semibold text-[1.75rem]">Start Recording</p>
                <div className="mt-5">
                    <button className="border-2 border-primary rounded-full p-6">
                        <img src={Microphone} alt="microphone icon" className="w-10 h-10"/>
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
                <div>
                    <button className="">
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