import React, { useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";

function TranscriptionContent({ transcriptionData, setTranscriptionData }) {
    const [editIndex, setEditIndex] = useState(null); 
    const [editedText, setEditedText] = useState('');  

    const handleEditClick = (index, currentText) => {
        setEditIndex(index); 
        setEditedText(currentText); 
    };

    const handleSaveClick = (index) => {
        const updatedTranscriptions = transcriptionData.map((item, i) => {
            if (i === index) {
                return { ...item, text: editedText };
            }
            return item;
        });

        setTranscriptionData(updatedTranscriptions); // Update transcription data state
        setEditIndex(null); // Reset edit index
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
                {transcriptionData.map((entry, index) => (
                    <div
                        key={index}
                        className={`mt-8 px-4 border-l-[4px] rounded-l-sm ${
                            entry.speaker === 'Speaker 1' ? 'border-primary' : 'border-secondary'
                        }`}
                    >
                        {/* Speaker and Timestamp */}
                        <p className="text-lg text-quinary flex space-x-4 items-center">
                            <span
                                className={`font-medium ${
                                    entry.speaker === 'Speaker 1' ? 'text-primary' : 'text-secondary'
                                }`}
                            >
                                {entry.speaker}
                            </span>
                            <span>{entry.timestamp}</span>
                            <FaRegEdit
                                size={22}
                                className="-mt-1 cursor-pointer"
                                onClick={() => handleEditClick(index, entry.text)}
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
                            <p className="text-lg text-quinary mt-1">{entry.text}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TranscriptionContent;

