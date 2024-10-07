import Waveform from './Waveform';
import PlayButton from "../assets/playbtn1.svg"
import PauseButton from "../assets/pause.svg"
import React, { useState } from 'react';
import DeleteIcon from "../assets/deleteBlue.svg";

function AudioPlayer ( { audioFile, onDelete, onSave } ) {
    const [playing, setPlaying] = useState(false);
    const [title, setTitle] = useState("");

    const handleSaveClick = () => {
        const finalTitle = title.trim() === "" ? getCurrentDateTimeString() : title;
        onSave(finalTitle);
    };

    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    const getCurrentDateTimeString = () => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        return `AUDIO_${day}${month}${year}_${hours}${minutes}`;
    };


    return(
        <div className="w-full border-2 border-dashed border-black p-6 rounded-3xl mt-10">

            {/* Play/Pause Button */}
            <div className="flex justify-center items-center mt-4">
                <img
                    src={playing ? PauseButton : PlayButton}
                    className="w-16 h-16 cursor-pointer"
                    onClick={handlePlayPause} 
                    alt="play/pause button"
                />
            </div>

            {/* waveform visual representation of the audio */}
            <Waveform 
                audioUrl={audioFile} 
                playing={playing} 
                handlePlayPause={handlePlayPause} 
            />
            
            
            <div className="mt-6 flex gap-3 justify-center lexend text-xl">
                {/* Title Input */}
                <div className='grow'>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={getCurrentDateTimeString()}
                        className="border-primary border-2 pl-5 pr-10 py-2 rounded-3xl placeholder:text-primary mr-5 text-primary placeholder:opacity-60"
                    />
                    <button
                        className="bg-primary text-white px-6 py-2 rounded-3xl font-medium"
                        onClick={handleSaveClick}
                    >
                        Save
                    </button>
                </div>

                {/* Delete Button */}
                <div className="flex-none mt-2">
                    {/* <button
                        className="bg-primary text-white px-4 py-2 rounded-lg"
                        onClick={onDelete}
                    >
                        Delete
                    </button> */}

                    <img
                        src={DeleteIcon}
                        alt="Delete"
                        className=" cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation(); 
                            onDelete(audio.id); 
                        }}
                    />
                </div>
            </div>

            
        </div>
    )
}

export default AudioPlayer;