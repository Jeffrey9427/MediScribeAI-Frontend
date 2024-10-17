import AudioItem from './AudioItem';
import AudioContent from './AudioContent';
import { AnimatePresence, motion } from 'framer-motion';

function AudioList({ audioData, handleAudioClick, activeAudio, playing, handlePlayPause, handleDelete, handleEdit }) {
    return (
        <div className="mt-6 space-y-4">
            {audioData.map((audio) => (
                <div key={audio.s3_key}>
                    <AudioItem
                        audio={audio}
                        active={activeAudio?.s3_key === audio.s3_key}
                        onClick={() => handleAudioClick(audio)}
                        onDelete={handleDelete} 
                        onEdit={handleEdit} 
                    />
                    
                    {/* If this is the active audio, display AudioContent below it */}
                    <AnimatePresence>
                        {activeAudio?.s3_key === audio.s3_key && (
                            <motion.div
                                key={audio.s3_key}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <AudioContent
                                    totalRecordings={audioData.length}
                                    activeAudio={activeAudio}
                                    playing={playing}
                                    handlePlayPause={handlePlayPause}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}

export default AudioList;
