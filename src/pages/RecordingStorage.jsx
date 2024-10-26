import Header from "../components/Header";
import SearchAudio from "../components/SearchAudio";
import React, { useState, useEffect } from 'react';
import AudioList from "../components/AudioList";
import TranscriptionContent from "../components/TranscriptionContent";
import CreateButton from "../components/CreateButton";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

function RecordingStorage() {
    const location = useLocation();
    const [audioData, setAudioData] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Track loading status
    

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

    const totalRecordings = audioData.length; 
    const [playing, setPlaying] = useState(false);
    const [activeAudio, setActiveAudio] = useState(audioData[0]); // state to track active audio
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

    const handleAudioClick = async (audio) => {
        if (activeAudio?.s3_key === audio.s3_key) {
            setActiveAudio(null); // if clicked again, hide the content
        } else {
            setActiveAudio(audio);
            setPlaying(false); // stop playing when switching audio

            setIsLoading(true); // Set loading to true while fetching

             // Fetch the transcription data for the selected audio
            try {
                
                console.log(audio.s3_key)
                const response = await fetch(`http://127.0.0.1:8000/transcribe/get_transcription/${audio.s3_key}`, {
                    method: "GET",})
              
                if (response.ok) {
                    const transcription = await response.json()
                    setTranscriptionData(transcription);
                } else {
                    console.error("Failed to fetch transcription");
                }
            } catch (error) {
                console.error("Error fetching transcription:", error);
            } finally {
                setIsLoading(false); // Set loading to false when done
            }
            
        }
    };

    const filteredAudioData = audioData.filter(audio => 
        audio.file_name.toLowerCase().includes(searchTerm.toLowerCase()) // match title with search term
    );

    const handleDelete = async (s3_key) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/s3/audio/delete/${s3_key}`, {
                method: "DELETE",
            });
            if (response.ok) {
                console.log("File deleted successfully!");
                setAudioData(prev => prev.filter(audio => audio.s3_key !== s3_key));
                if (activeAudio?.s3_key === s3_key) {
                    setActiveAudio(null); // Reset active audio if deleted
                }
            }
            else console.error("Failed to delete file!")
        } catch (e) {
            console.error(error)
        }

        // lanjut w delete audio in s3
    };

    const handleEdit = async (s3_key, newTitle) => {
        try {
            const parts = s3_key.split('_', 2);
            const newS3Key = `${parts[0]}_${parts[1]}_${newTitle}`;

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
                setAudioData(prev =>
                    prev.map(audio => 
                        audio.s3_key === s3_key 
                            ? { ...audio, file_name: newTitle, s3_key: newS3Key } 
                            : audio
                    )
                );

                if (activeAudio?.s3_key === s3_key) {
                    setActiveAudio(prev => ({ ...prev, file_name: newTitle, s3_key: newS3Key }));
                }
                
                console.log("Title updated successfully!");
            } else {
                console.error("Failed to update title!");
            }
        } catch (error) {
            console.error("Error while updating title:", error);
        }
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
                    {isLoading ? (
                     
                     <div className="flex flex-col items-center justify-center h-full w-full bg-white rounded-lg shadow-lg p-12">
                     <Loader2 className="h-24 w-24 animate-spin text-primary" />
                     <p className="mt-8 text-2xl font-semibold text-gray-700">Loading transcription...</p>
                     <div className="mt-10 flex space-x-4">
                       <div className="h-4 w-4 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                       <div className="h-4 w-4 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                       <div className="h-4 w-4 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                     </div>
                     <p className="mt-6 text-lg text-gray-500">This may take a few moment</p>
                   </div>
                    
                    ) : (
                        <TranscriptionContent transcriptionData={transcriptionData} setTranscriptionData={setTranscriptionData} />
                    )}

                </div>
            </div>
        </div>
    )
}

export default RecordingStorage;