import Header from "../components/Header";
import SearchAudio from "../components/SearchAudio";
import audioData from '../data';
import React, { useEffect, useState } from 'react';
import CancelButton from "../components/CancelButton";
import { useNavigate } from "react-router-dom";
import RecordAudio from "../components/RecordAudio";
import AudioList from "../components/AudioList";
import AudioPlayer from "../components/AudioPlayer";

function SpeechRecord() {
    const totalRecordings = audioData.length; 
    const subtitle = "Start and create a new recording";
    const [searchTerm, setSearchTerm] = useState('');
    const [audioFile, setAudioFile] = useState(null);
    const [uploadedAudio, setUploadedAudio] = useState(null);  // track uploaded/recorded audio file
    const [uploadedAudioName, setUploadedAudioName] = useState('');
    const nav = useNavigate();

    const handleButtonClick = () => {
        nav("/record-storage");
    };

    const handleAudioSubmit = async (file) => {
        const audioUrl = URL.createObjectURL(file);
        setUploadedAudio(audioUrl);
        setAudioFile(file);
    }

    const handleAudioUpload = async (title) => {
        let uploadFile = audioFile;
        if(title) uploadFile = new File([audioFile], title + '.' + audioFile.name.split(".").pop(), {"type": audioFile.type});
        
        console.log("Uploaded file: ", uploadFile);  // file object logged here
        setUploadedAudioName(uploadFile.name);  
        console.log(uploadFile.name);

        const formData = new FormData();
        formData.append("file_upload", uploadFile);
        formData.append("doctor_id", 1);
        formData.append("patient_name", "test123");

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

    const handleAudioRecordTitleSubmit = async (newTitle) => {
        console.log(newTitle)

        handleAudioUpload(newTitle);
        return;

        console.log("Uploaded file: ", audioFile);  // file object logged here
        setUploadedAudioName(audioFile.name);  
        console.log(audioFile.name);  

        const formData = new FormData();
        formData.append("file_upload", audioFile);
        formData.append("doctor_id", 1);
        formData.append("patient_name", "test123");

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

    const handleTitleSave = async (id, newTitle) => {
        console.log("Saved Title: ", newTitle);
        // continue with saving title to backend, S3, or database

        console.log("Uploaded Audio Name: ", uploadedAudioName);

        try {
            const response = await fetch(`http://127.0.0.1:8000/s3/audio/edit/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    "new_filename": newTitle
                } 
            });
    
            if (response.ok) {
                console.log("Title updated successfully!");
                nav("/record-storage");
            } else {
                console.error("Failed to update title!");
            }
        } catch (error) {
            console.error("Error while updating title:", error);
        }
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
                    onSave={handleAudioRecordTitleSubmit} 
                />
            ) : (
                <RecordAudio onSubmit={handleAudioSubmit} />
            )}

            {/* Audio List Section */}
            <AudioList 
                audioData={filteredAudioData} 
                handleAudioClick={handleAudioClick}
                handleEdit={handleTitleSave}
            />
        </div>
    )
}

export default SpeechRecord;