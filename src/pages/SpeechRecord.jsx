import Header from "../components/Header";
import SearchAudio from "../components/SearchAudio";
import audioData from '../data';
import React, { useState } from 'react';
import CancelButton from "../components/CancelButton";
import { useNavigate } from "react-router-dom";
import RecordAudio from "../components/RecordAudio";
import AudioList from "../components/AudioList";

function SpeechRecord() {
    const totalRecordings = audioData.length; 
    const subtitle = "Start and create a new recording";
    const [searchTerm, setSearchTerm] = useState('');
    const nav = useNavigate();

    const handleButtonClick = () => {
        nav("/record-storage");
    };

    const handleAudioUpload = (file) => {
        console.log("Uploaded file: ", file);

        // check di console
        // continue with saving audio in s3 bucket
    }

    const handleAudioClick = (audio) => {
        // set the clicked audio as active
        nav("/record-storage", { state: { activeAudio: audio } });
    }

    const filteredAudioData = audioData.filter(audio => 
        audio.title.toLowerCase().includes(searchTerm.toLowerCase()) // match title with search term
    );

    return (
        <div className="bg-white ml-48 h-screen rounded-l-3xl py-16 px-28 text-left overflow-y-scroll " >
            {/* Top Section */}
            <div className="flex justify-between items-center lexend">
                <SearchAudio searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                <CancelButton handleButtonClick={handleButtonClick}/> 
            </div>
            <Header subtitle={subtitle} totalRecordings={totalRecordings} />

            {/* Record / Upload Audio Section */}
            <RecordAudio onUpload={handleAudioUpload} />

            {/* Audio List Section */}
            <AudioList 
                audioData={filteredAudioData} 
                handleAudioClick={handleAudioClick} 
            />
        </div>
    )
}

export default SpeechRecord;