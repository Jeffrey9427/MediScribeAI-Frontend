import AudioContentHeader from './AudioContentHeader';
import Waveform from './Waveform';
import TranscriptionContent from './TranscriptionContent';

function AudioContent( {totalRecordings, activeAudio, playing, handlePlayPause } ) {
    return(
        <>
            {/* if there are no recordings available, show a message encouraging the user to record */}
            {totalRecordings === 0 ? (
                <div className="mt-10 text-center">
                    <p className="text-[1.75rem] font-semibold text-quaternary mb-3">You do not have any recording.</p>
                    <p className="text-[1.75rem] font-semibold text-black">Try record one now!</p>
                </div>
            ) : (
                // display content for active audio if available
                <div className="mt-10 lexend">
                    {activeAudio && (
                        <>
                            {/* header section for active audio file selected */}
                            <AudioContentHeader 
                                playing={playing} 
                                handlePlayPause={handlePlayPause} 
                                audio={activeAudio}
                            />

                            {/* waveform visual representation of the audio */}
                            <Waveform 
                                audioUrl={activeAudio.audio_url} 
                                playing={playing} 
                                handlePlayPause={handlePlayPause} 
                            />
                        </>
                    )}
                </div> 
            )}
        </>
    )
}

export default AudioContent;