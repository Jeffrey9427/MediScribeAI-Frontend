import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Waveform = ({ audioUrl, playing, handlePlayPause }) => {
    const waveformRef = useRef(null);
    const wavesurferRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);


    // format time helper function to format seconds to mm:ss
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        // initialize WaveSurfer when the component mounts
        wavesurferRef.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: '#ddd',
            progressColor: '#F87060',
            cursorColor: '#F87060',
            height: 300,
            responsive: true,
            partial: false,
        });

        // load the audio file into wavesurfer
        if (audioUrl) {
            wavesurferRef.current.load(audioUrl);
        }

        // event listener to update duration once the audio is loaded
        wavesurferRef.current.on('ready', () => {
            setDuration(wavesurferRef.current.getDuration());
        });

        // event listener to update current time as the audio plays
        wavesurferRef.current.on('audioprocess', () => {
            setCurrentTime(wavesurferRef.current.getCurrentTime());
        });


        return () => {
            if (wavesurferRef.current) {
                try {
                    wavesurferRef.current.destroy();
                } catch (error) {
                    console.error("Error destroying wavesurfer instance:", error);
                }
            }
        };
    }, [audioUrl]);

    useEffect(() => {
        if (playing) {
            wavesurferRef.current.play();
        } else {
            wavesurferRef.current.pause();
        }
    }, [playing]);

    return (
        <div>
            <div className="waveform-container mt-10 border-black border-b">
                <div id="waveform" ref={waveformRef} className="waveform" />
            </div>
            <div className="flex justify-end mt-4 text-lg text-quaternary font-medium">
                <span>{formatTime(currentTime)}/</span>
                <span>{formatTime(duration)}</span>
            </div>
        </div>
    );
};

export default Waveform;
