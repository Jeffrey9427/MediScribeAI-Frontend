import Microphone from "../assets/microphone.svg";
import Upload from "../assets/upload.svg";
import Stop from "../assets/stop.svg";
import { useRef, useState, useEffect } from "react";

function RecordAudio({onUpload}) {
    const fileInputRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState(null); 
    const [audioChunks, setAudioChunks] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0); // Track the elapsed recording time
    const MAX_DURATION = 600;

    useEffect(() => {
        let intervalId;

        if (isRecording) {
            intervalId = setInterval(() => {
                setElapsedTime((prevTime) => {
                    if (prevTime >= MAX_DURATION) {
                        stopRecording(); // stop the recording if the max duration is reached
                        return MAX_DURATION;
                    }
                    return prevTime + 1;
                });
            }, 1000);
        }

        // clear the timer when recording stops
        return () => clearInterval(intervalId);
    }, [isRecording]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            onUpload(file);
        }
    }

    const startRecording = async () => {
        // request permission to use the microphone
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const newRecorder = new MediaRecorder(stream);

        newRecorder.ondataavailable = (event) => {
            setAudioChunks((prev) => [...prev, event.data]);
        };

        newRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
            const audioFile = new File([audioBlob], "recording.wav", { type: "audio/wav" });
            onUpload(audioFile); // pass the recorded file to the parent
            setAudioChunks([]); // clear the chunks for future recordings
            setElapsedTime(0);
        };

        setRecorder(newRecorder);
        newRecorder.start();
        setIsRecording(true);
    };

    const stopRecording = () => {
        recorder.stop();
        setIsRecording(false);
    };

    const handleRecordClick = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    return (
        <div className="flex flex-col gap-y-5 mt-10 text-center">

            {/* Start Recording Area */}
            <div className="border-2 border-black rounded-3xl p-12 border-dashed">
                <p className="font-semibold text-[1.75rem]">Start Recording</p>
                <div className="mt-5">
                <button
                        className="border-2 border-primary rounded-full p-6 hover:bg-primary group"
                        onClick={handleRecordClick}
                    >
                        <img
                            src={isRecording ? Stop : Microphone}
                            alt={isRecording ? "Stop recording" : "Start recording"}
                            className="w-10 h-10 group-hover:filter group-hover:brightness-0 group-hover:invert"
                        />
                    </button>
                    <p className="mt-4">{`${formatTime(elapsedTime)}/10:00`}</p>
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