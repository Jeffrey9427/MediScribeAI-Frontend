import AudioContentHeader from './AudioContentHeader';
import Waveform from './Waveform';
import React, { useState } from 'react';

function AudioContent( {totalRecordings} ) {
    const audio = "src/assets/file_example_MP3_700KB.mp3"; 

    const [playing, setPlaying] = useState(false);

    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    return(
        <>
            {totalRecordings === 0 ? (
                <div className="mt-10 text-center">
                    <p className="text-[1.75rem] font-semibold text-quaternary mb-3">You do not have any recording.</p>
                    <p className="text-[1.75rem] font-semibold text-black">Try record one now!</p>
                </div>
            ) : (
                <div className="mt-8">
                    <AudioContentHeader playing={playing} handlePlayPause={handlePlayPause} audioUrl={audio}/>
                    <Waveform audioUrl={audio} playing={playing} handlePlayPause={handlePlayPause} />
                </div> 
            )}
        </>
    )
}

export default AudioContent;