import React, { useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";

function TranscriptionContent({  transcriptionData, setTranscriptionData }) {
    const [editIndex, setEditIndex] = useState(null); 
    const [editedText, setEditedText] = useState('');  

    const handleEditClick = (index, currentText) => {
        setEditIndex(index); 
        setEditedText(currentText); 
    };

    const handleSaveClick = async (index) => {
        const updatedTranscriptions = transcriptionData.content.map((item, i) => {
            if (i === index) {
                return { ...item, transcript: editedText };
            }
            return item;
        });

        // // Create a new data structure to match format
        // const updatedData = {
        //     s3_name: transcriptionData.s3_name,
        //     content: updatedTranscriptions,
        // };

        // Make sure to send the updated audio segments only
        // const audioSegments = updatedTranscriptions.map(entry => ({
        //     id: entry.id,
        //     transcript: entry.transcript,
        //     start_time: entry.start_time,
        //     end_time: entry.end_time,
        //     speaker_label: entry.speaker_label,
        //     items: entry.items,
        // }));


        
        try {
            console.log("Updating transcription for:", transcriptionData.s3_name);
            const response = await fetch(`https://mediscribeai-backend.vercel.app/transcribe/update_transcription/${transcriptionData.s3_name}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({updatedTranscriptions }), // Make sure this matches your backend expectations
            });
            console.log(JSON.stringify({ updatedTranscriptions}))
            if (!response.ok) {
                throw new Error('Failed to update segment');
            }

            setTranscriptionData((prevData) => ({
                ...prevData,
                content: updatedTranscriptions, // Set the updated content
            }));
    
            alert("Segment updated successfully!");
            setEditIndex(null); // Reset edit index after saving
        } catch (error) {
            console.error("Error updating segment:", error);
            alert("Failed to update segment.");
        }


    }

        
    


        

    const mapSpeakerLabel = (speakerLabel) => {
        if (speakerLabel === "spk_0") return "Speaker 1";
        if (speakerLabel === "spk_1") return "Speaker 2";
        return speakerLabel; 
    };

    const formatTimestamp = (timeInSeconds) => {
        const totalSeconds = Math.floor(timeInSeconds);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };



    return (
        <div className="tabs px-8 py-7 mt-5 rounded-2xl shadow-xl mb-16 lexend ">
            <div className="flex items-center">
                <div className="flex space-x-7 grow">
                    <button className="text-primary font-medium text-xl underline underline-offset-8">Transcription</button>
                    <button className="text-quaternary font-medium text-xl">Summary</button>
                </div>
                {/* <div className="flex-none">
                    <GoChevronDown size={25}/>
                </div> */}
            </div>

            <div className="py-2 bg-white"></div>

            <div className="overflow-y-auto max-h-[100vh]">
                { transcriptionData?.content?.map((entry, index) => (
            
                    <div
                        key={index}
                        className={`mt-8 px-4 border-l-[4px] rounded-l-sm ${
                            entry.speaker_label === 'spk_0' ? 'border-primary' : 'border-secondary'
                        }`}
                    >
                        {/* Speaker and Timestamp */}
                        <p className="text-lg text-quinary flex space-x-4 items-center">
                            <span
                                className={`font-medium ${
                                    entry.speaker_label === 'spk_0' ? 'text-primary' : 'text-secondary'
                                }`}
                            >
                                {mapSpeakerLabel(entry.speaker_label)}
                            </span>
                            <span> {formatTimestamp(entry.start_time)}</span>
                            <FaRegEdit
                                size={22}
                                className="-mt-1 cursor-pointer"
                                onClick={() => handleEditClick(index, entry.transcript)}
                            />
                        </p>

                        {/* Display either the text or an input field if it's being edited */}
                        {editIndex === index ? (
                            <div className="mt-2">
                                <textarea
                                    className="w-full border rounded p-3"
                                    value={editedText}
                                    onChange={(e) => setEditedText(e.target.value)}
                                />
                                <button
                                    className="bg-primary text-white font-medium py-1 px-3 mt-2 rounded"
                                    onClick={() => handleSaveClick(index)}
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <p className="text-lg text-quinary mt-1">{entry.transcript}</p>
                        )}
                    </div>
                ))}
                
            </div>
        </div>
    )
}

export default TranscriptionContent;

