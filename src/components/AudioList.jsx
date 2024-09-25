import AudioItem from './AudioItem';

function AudioList({ audioData, handleAudioClick, activeAudio }) {
    return (
        <div className="mt-6 space-y-4">
            {audioData.map((audio) => (
                <AudioItem
                    key={audio.id}
                    audio={audio}
                    active={activeAudio?.id === audio.id}
                    onClick={() => handleAudioClick(audio)}
                />
            ))}
        </div>
    );
}

export default AudioList;
