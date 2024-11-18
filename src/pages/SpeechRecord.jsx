import Header from "../components/Header";
import SearchAudio from "../components/SearchAudio";
import React, { useState, useEffect } from 'react';
import CancelButton from "../components/CancelButton";
import { useNavigate } from "react-router-dom";
import RecordAudio from "../components/RecordAudio";
import AudioList from "../components/AudioList";

function SpeechRecord() {
    const [audioData, setAudioData] = useState([]);

    useEffect(() => {
        const fetchAudioData = async () => {
            try {
                const response = await fetch('https://mediscribeai-backend.vercel.app/s3/audio/get_all_file_detail');
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
    const totalRecordings = audioData.length;
    const nav = useNavigate();

    const handleButtonClick = () => {
        nav("/record-storage");
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

    const handleAudioSubmit = async (file) => {
        const title = getCurrentDateTimeString();
        const uploadFile = new File([file], title + '.' + file.name.split(".").pop(), {"type": file.type})

        console.log("Uploaded file: ", uploadFile);  // file object logged here
        console.log(uploadFile.name);

        const formData = new FormData();
        formData.append("file_upload", uploadFile);
        formData.append("doctor_id", 1);
        formData.append("patient_name", "John Doe");

        try {
            const response = await fetch(`https://mediscribeai-backend.vercel.app/s3/audio/upload`, {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                const audioData = await response.json();   
                // setAudioRecord(audioData);  
                console.log("File uploaded successfully!", audioData)
             
                const new_key = audioData.s3_key;
                try {
                    console.log("transcribing: " + new_key);
                    const response = await fetch(`https://mediscribeai-backend.vercel.app/transcribe/start_job/${new_key}`, {
                        method: "POST",
                    });
                    
                    if (response.ok) {
                        const transcription = await response.json();
                        console.log("Transcription started successfully!", transcription);
                    } else {
                        console.error("Failed to transcribe");
                    }
                } catch (error) {
                    console.error("Error transcribing:", error);
                }
                nav("/record-storage");
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

            <RecordAudio onSubmit={handleAudioSubmit} />    

            {/* Audio List Section */}
            <AudioList 
                audioData={filteredAudioData} 
                handleAudioClick={handleAudioClick}
            />
        </div>
    )
}

export default SpeechRecord;