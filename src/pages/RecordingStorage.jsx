import AudioContent from "../components/AudioContent";
import Header from "../components/Header";
import SearchAudio from "../components/SearchAudio";

function RecordingStorage() {
    const totalRecordings = 1; 

    return (
        <div className="bg-white ml-48 h-screen rounded-l-3xl py-16 px-28 text-left" >
            <SearchAudio />
            <Header totalRecordings={totalRecordings}/>
            <AudioContent totalRecordings={totalRecordings}/>
        </div>
    )
}

export default RecordingStorage;