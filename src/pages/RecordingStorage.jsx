import Header from "../components/Header";
import SearchAudio from "../components/SearchAudio";
import audioData from '../data';
import React, { useState, useEffect } from 'react';
import AudioList from "../components/AudioList";
import TranscriptionContent from "../components/TranscriptionContent";
import CreateButton from "../components/CreateButton";
import { useNavigate, useLocation } from "react-router-dom";

function RecordingStorage() {
    const location = useLocation();
    const [audioRecords, setAudioRecords] = useState(audioData);
    const totalRecordings = audioRecords.length; 
    const [playing, setPlaying] = useState(false);
    const [activeAudio, setActiveAudio] = useState(audioRecords[0]); // state to track active audio
    const [searchTerm, setSearchTerm] = useState('');
    const subtitle = "Collection of your audio recordings";
    const nav = useNavigate();
    const [transcriptionData, setTranscriptionData] = useState(activeAudio?.transcription || []);

    const handleButtonClick = () => {
        nav("/speech-record");
    };

    useEffect(() => {
        // If there's an active audio passed from the SpeechRecord page, set it
        if (location.state?.activeAudio) {
            setActiveAudio(location.state.activeAudio);
        }
    }, [location.state]);

    useEffect(() => {
        if (activeAudio) {
            setTranscriptionData(activeAudio.transcription || []);
        }
    }, [activeAudio]);


    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    const handleAudioClick = (audio) => {
        if (activeAudio?.id === audio.id) {
            setActiveAudio(null); // if clicked again, hide the content
        } else {
            setActiveAudio(audio);
            setPlaying(false); // stop playing when switching audio
        }
    };

    const filteredAudioData = audioRecords.filter(audio => 
        audio.title.toLowerCase().includes(searchTerm.toLowerCase()) // match title with search term
    );

    const handleDelete = (id) => {
        setAudioRecords(prev => prev.filter(audio => audio.id !== id));
        if (activeAudio?.id === id) {
            setActiveAudio(null); // Reset active audio if deleted
        }

        // lanjut w delete audio in s3
    };

    const handleEdit = (id, newTitle) => {
        setAudioRecords(prev =>
            prev.map(audio => audio.id === id ? { ...audio, title: newTitle } : audio)
        );

        // lanjut w edit audio title in s3
    };

    return (
        <div className="bg-white ml-48 h-screen rounded-l-3xl py-16 px-28 text-left overflow-y-scroll " >
            {/* Top Section */}
            <div className="flex justify-between items-center lexend">
                <SearchAudio searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                <CreateButton handleButtonClick={handleButtonClick} />
            </div>
            <Header subtitle={subtitle} totalRecordings={totalRecordings}/>


            <div className="flex gap-20">
                <div className="flex-1">
                    {/* Audio List Section */}
                    <AudioList 
                        audioData={filteredAudioData} 
                        handleAudioClick={handleAudioClick} 
                        activeAudio={activeAudio} 
                        playing={playing}
                        handlePlayPause={handlePlayPause}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
                </div>
                <div className="flex-1">
                    {/* section displaying the transcription for the active audio */}
                    <TranscriptionContent transcriptionData={transcriptionData} setTranscriptionData={setTranscriptionData} />
                </div>
            </div>
        </div>
    )
}

export default RecordingStorage;