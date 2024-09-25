import AudioContent from "../components/AudioContent";
import Header from "../components/Header";
import SearchAudio from "../components/SearchAudio";
import audioData from '../data';
import React, { useState, useEffect } from 'react';
import AudioList from "../components/AudioList";
import CreateButton from "../components/CreateButton";
import { useNavigate } from "react-router-dom";

function RecordingStorage() {
    const totalRecordings = audioData.length; 
    const [playing, setPlaying] = useState(false);
    const [activeAudio, setActiveAudio] = useState(null); // state to track active audio
    const [searchTerm, setSearchTerm] = useState('');
    const subtitle = "Collection of your audio recordings";
    const nav = useNavigate();

    const handleButtonClick = () => {
        nav("/speech-record");
    };

    useEffect(() => {
        if (audioData.length > 0) {
            setActiveAudio(audioData[0]); // set the first audio as active
        }
    }, []);

    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    const handleAudioClick = (audio) => {
        // set the clicked audio as active
        setActiveAudio(audio);
        setPlaying(false); // ensure it doesn't auto-play when selected
    }

    const filteredAudioData = audioData.filter(audio => 
        audio.title.toLowerCase().includes(searchTerm.toLowerCase()) // match title with search term
    );

    return (
        <div className="bg-white ml-48 h-screen rounded-l-3xl py-16 px-28 text-left overflow-y-scroll " >
            {/* Top Section */}
            <div className="flex justify-between items-center lexend">
                <SearchAudio searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                <CreateButton handleButtonClick={handleButtonClick} />
            </div>
            <Header subtitle={subtitle} totalRecordings={totalRecordings}/>

            {/* Audio Content and Transcription Section */}
            <AudioContent 
                totalRecordings={totalRecordings} 
                activeAudio={activeAudio} 
                playing={playing} 
                handlePlayPause={handlePlayPause} 
            />

            {/* Audio List Section */}
            <AudioList 
                audioData={filteredAudioData} 
                handleAudioClick={handleAudioClick} 
                activeAudio={activeAudio} 
            />
        </div>
    )
}

export default RecordingStorage;