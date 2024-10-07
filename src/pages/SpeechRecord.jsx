import Header from "../components/Header";
import SearchAudio from "../components/SearchAudio";
import audioData from '../data';
import React, { useState } from 'react';
import CancelButton from "../components/CancelButton";
import { useNavigate } from "react-router-dom";
import RecordAudio from "../components/RecordAudio";
import AudioList from "../components/AudioList";
import AudioPlayer from "../components/AudioPlayer";

function SpeechRecord() {
    const totalRecordings = audioData.length; 
    const subtitle = "Start and create a new recording";
    const [searchTerm, setSearchTerm] = useState('');
    const [uploadedAudio, setUploadedAudio] = useState(null);  // track uploaded/recorded audio file
    const nav = useNavigate();

    const handleButtonClick = () => {
        nav("/record-storage");
    };

    const handleAudioUpload = async (file) => {
        console.log("Uploaded file: ", file.File);
        const formData = new FormData();
        formData.append("file_upload", file);

        const audioUrl = URL.createObjectURL(file);
        setUploadedAudio(audioUrl); 

        // check di console
        // continue with saving audio in s3 bucket
        try {
            const response = await fetch(`http://127.0.0.1:8000/s3/audio/upload`, {
                method: "POST",
                body: formData
            });
            if (response.ok) console.log("File uploaded successfully!");
            else console.error("Failed to upload file!")
        } catch (e) {
            console.error(error)
        }

    }

    const handleAudioClick = (audio) => {
        // set the clicked audio as active
        nav("/record-storage", { state: { activeAudio: audio } });
    }

    const handleAudioDelete = () => {
        setUploadedAudio(null); 
    }

    const handleTitleSave = (title) => {
        console.log("Saved Title: ", title);
        // continue with saving title to backend, S3, or database
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
            {uploadedAudio ? (
                <AudioPlayer 
                    audioFile={uploadedAudio} 
                    onDelete={handleAudioDelete} 
                    onSave={handleTitleSave} 
                />
            ) : (
                <RecordAudio onUpload={handleAudioUpload} />
            )}

            {/* Audio List Section */}
            <AudioList 
                audioData={filteredAudioData} 
                handleAudioClick={handleAudioClick} 
            />
        </div>
    )
}

export default SpeechRecord;