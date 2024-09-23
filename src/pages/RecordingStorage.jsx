import AudioContent from "../components/AudioContent";
import Header from "../components/Header";
import SearchAudio from "../components/SearchAudio";

function RecordingStorage() {
    return (
        <div className="bg-white ml-48 h-screen rounded-l-3xl py-16 px-28 text-left" >
            <SearchAudio />
            <Header />
            <AudioContent totalRecord={1}/>
        </div>
    )
}

export default RecordingStorage;