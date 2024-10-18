import PlayButton from "../assets/playbtn1.svg";
import DeleteIcon from "../assets/delete.svg";
import EditIcon from "../assets/editbtn.svg";
import { useState } from "react";

function AudioItem({ audio, active, onClick, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(audio.file_name); 

    const handleEditClick = () => {
        if (isEditing) {
            onEdit(audio.s3_key, newTitle); 
        }
        setIsEditing(!isEditing); 
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            handleEditClick(); 
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        
        const formattedDate = date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    
        return formattedDate.replace(",", ""); // Optional: remove comma if not needed
    }

    return (
        <div 
            className={`pl-7 pr-10 py-4 flex items-center lexend rounded-3xl cursor-pointer ${active ? 'bg-primary text-white' : ''} group`}
            onClick={onClick}
        >
            <div className="flex space-x-8 grow">
                <img
                    src={PlayButton}
                    alt="playButton"
                    className={`w-8 ${active ? 'filter brightness-0 invert' : ''}`}
                />
                {isEditing ? (
                    <textarea
                        value={newTitle}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="text-[1.375rem] font-medium text-black"
                    />
                ) : (
                    <p className={`text-[1.375rem] font-${active ? 'medium' : 'bold'}`}>{audio.file_name}</p>
                )}
            </div>
            <div className="flex-none mr-5">
                <p className={`text-lg ${active ? 'text-white' : 'text-quaternary'}`}>{formatDate(audio.created_at)}</p>
            </div>
            <div className="flex items-center flex-none relative">
                <p className={`text-lg ${active ? 'text-white' : 'text-quaternary'} transition-all duration-100`}>{audio.duration}</p>
            </div>

            {/* show delete and edit icons when hovering through the active audio */}
            {
                active === true ?  (
                    <>
                        <img
                            src={EditIcon}
                            alt="Edit"
                            className="w-7 group-hover:ml-4 opacity-0 group-hover:opacity-100 transition-all duration-100 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEditClick(); 
                            }}
                        />
                        <img
                            src={DeleteIcon}
                            alt="Delete"
                            className="w-5 group-hover:ml-4 opacity-0 group-hover:opacity-100 transition-all duration-100 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation(); 
                                onDelete(audio.s3_key); 
                            }}
                        />
                        
                    </>
                    
                ) : null
            }
        </div>
    );
}

export default AudioItem;
