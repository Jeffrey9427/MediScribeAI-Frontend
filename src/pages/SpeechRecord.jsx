import Header from "../components/Header";
import SearchAudio from "../components/SearchAudio";
// import audioData from '../data';
import React, { useState, useEffect } from 'react';
import CancelButton from "../components/CancelButton";
import { useNavigate } from "react-router-dom";
import RecordAudio from "../components/RecordAudio";
import AudioList from "../components/AudioList";
import AudioPlayer from "../components/AudioPlayer";

function SpeechRecord() {
    const [audioData, setAudioData] = useState([]);

    useEffect(() => {
        const fetchAudioData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/s3/audio/get_all_file_detail');
                if (response.ok) {
                    const data = await response.json();
                    setAudioData(data);
                    console.log("Fetched audio data: ", data);
                } else {
                    console.error("Failed to fetch audio data");
                }
            } catch (error) {
                console.error("Error fetching audio data:", error);
            }
        };

        fetchAudioData();
    }, []);

    const subtitle = "Start and create a new recording";
    const [searchTerm, setSearchTerm] = useState('');
    const [uploadedAudio, setUploadedAudio] = useState(null);  // track uploaded/recorded audio file
    const [uploadedAudioName, setUploadedAudioName] = useState('');
    const [audioRecord, setAudioRecord] = useState(null);
    const totalRecordings = audioData.length;
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
        formData.append("patient_name", "John Doe");

        const audioUrl = URL.createObjectURL(file);
        setUploadedAudio(audioUrl); 

        // check di console
        // continue with saving audio in s3 bucket
        try {
            const response = await fetch(`http://127.0.0.1:8000/s3/audio/upload`, {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                const audioData = await response.json();   
                setAudioRecord(audioData);  
                console.log("File uploaded successfully!", audioData);
            } else {
                console.error("Failed to upload file!");
            }
        } catch (e) {
            console.error(error)
        }
    }

    const handleAudioClick = (audio) => {
        // set the clicked audio as active
        nav("/record-storage", { state: { activeAudio: audio } });
    }

    const handleAudioDelete = async (s3_key) => {
        setUploadedAudio(null);
        try {
            const response = await fetch(`http://127.0.0.1:8000/s3/audio/delete/${s3_key}`, {
                method: "DELETE",
            });
            if (response.ok) {
                console.log("File deleted successfully!");
                setAudioRecord(null);
            }
            else console.error("Failed to delete file!")
        } catch (e) {
            console.error(error)
        }
        
    }

    const handleTitleSave = async (s3_key, newTitle) => {
        console.log("Saved Title: ", newTitle);
        // continue with saving title to backend, S3, or database

        console.log("Uploaded Audio Name: ", uploadedAudioName);
        console.log("Recorded Audio: ", audioRecord);

        try {
            const response = await fetch(`http://127.0.0.1:8000/s3/audio/edit/${s3_key}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({  
                    new_filename: newTitle
                })
            });
    
            if (response.ok) {
                console.log("Title updated successfully!");
                nav("/record-storage");
                setAudioRecord(null);
            } else {
                console.error("Failed to update title!");
            }
        } catch (error) {
            console.error("Error while updating title:", error);
        }
    }

    const filteredAudioData = audioData.filter(audio => 
        audio.file_name.toLowerCase().includes(searchTerm.toLowerCase()) // match title with search term
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
            {uploadedAudio && audioRecord ? (
                <AudioPlayer 
                    audioFile={uploadedAudio} 
                    onDelete={handleAudioDelete} 
                    onSave={handleTitleSave} 
                    s3_key={audioRecord?.s3_key}
                />
            ) : (
                <RecordAudio onUpload={handleAudioUpload} />
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