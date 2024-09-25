import Header from "../components/Header";
import SearchAudio from "../components/SearchAudio";
import audioData from '../data';
import React, { useState, useEffect } from 'react';
import CancelButton from "../components/CancelButton";
import { useNavigate } from "react-router-dom";
import RecordAudio from "../components/RecordAudio";

function SpeechRecord() {
    const totalRecordings = audioData.length; 
    const subtitle = "Start and create a new recording";
    const nav = useNavigate();

    const handleButtonClick = () => {
        nav("/record-storage");
    };

    const handleAudioUpload = (file) => {
        console.log("Uploaded file: ", file);

        // check di console
        // continue with saving audio in s3 bucket
    }

    return (
        <div className="bg-white ml-48 h-screen rounded-l-3xl py-16 px-28 text-left overflow-y-scroll " >
            {/* Top Section */}
            <div className="flex justify-between items-center lexend">
                <SearchAudio />
                <CancelButton handleButtonClick={handleButtonClick}/>
            </div>
            <Header subtitle={subtitle} totalRecordings={totalRecordings}/>

            {/* Audio List Section */}
            <RecordAudio onUpload={handleAudioUpload}/>
        </div>
    )
}

export default SpeechRecord;