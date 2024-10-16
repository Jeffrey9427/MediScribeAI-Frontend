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
    const [uploadedAudioName, setUploadedAudioName] = useState('');
    const nav = useNavigate();

    const handleButtonClick = () => {
        nav("/record-storage");
    };

    const handleAudioUpload = async (file) => {
        console.log("Uploaded file: ", file);  // file object logged here
        setUploadedAudioName(file.name);  
        console.log(file.name);  

        const formData = new FormData();
        formData.append("file_upload", file);
        formData.append("doctor_id", 1);

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

    const handleAudioDelete = async (id) => {
        setUploadedAudio(null);
        try {
            const response = await fetch(`http://127.0.0.1:8000/s3/audio/delete/${id}`, {
                method: "DELETE",
            });
            if (response.ok) console.log("File deleted successfully!");
            else console.error("Failed to delete file!")
        } catch (e) {
            console.error(error)
        }
    }

    const handleTitleSave = async (newTitle) => {
        console.log("Saved Title: ", newTitle);
        // continue with saving title to backend, S3, or database
        const formData = new FormData();
        formData.append("update", newTitle);

        console.log("Uploaded Audio Name: ", uploadedAudioName);

        // try {
        //     const response = await fetch(`http://127.0.0.1:8000/s3/audio/update/${uploadedAudioName}`, {
        //         method: "PUT",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({ new_title: newTitle }) 
        //     });
    
        //     if (response.ok) {
        //         console.log("Title updated successfully!");
        //         nav("/record-storage");
        //     } else {
        //         console.error("Failed to update title!");
        //     }
        // } catch (error) {
        //     console.error("Error while updating title:", error);
        // }
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