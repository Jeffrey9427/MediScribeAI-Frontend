import React, { useState, useEffect } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'
import Header from "../components/Header"
import SearchAudio from "../components/SearchAudio"
import AudioList from "../components/AudioList"
import TranscriptionContent from "../components/TranscriptionContent"
import CreateButton from "../components/CreateButton"
import { useNavigate, useLocation } from "react-router-dom"

function RecordingStorage() {
  const location = useLocation()
  const [audioData, setAudioData] = useState([])
  const [isTranscriptionLoading, setIsTranscriptionLoading] = useState(false)
  const [isAudioStorageLoading, setIsAudioStorageLoading] = useState(false)
  const [activeAudio, setActiveAudio] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [transcriptionData, setTranscriptionData] = useState([])
  const [transcriptionStatus, setTranscriptionStatus] = useState(null)
  const nav = useNavigate()

  const totalRecordings = audioData.length
  const subtitle = "Collection of your audio recordings"

  useEffect(() => {
    const fetchAudioData = async () => {
      setIsAudioStorageLoading(true)
      try {
        const response = await fetch('https://mediscribeai-backend.vercel.app/s3/audio/get_all_file_detail')
        if (response.ok) {
          const data = await response.json()
          setAudioData(data)
          console.log("Fetched audio data: ", data)
        } else {
          console.error("Failed to fetch audio data")
        }
      } catch (error) {
        console.error("Error fetching audio data:", error)
      } finally {
        setIsAudioStorageLoading(false)
      }
    }

    fetchAudioData()
  }, [])

  useEffect(() => {
    if (location.state?.activeAudio) {
      setActiveAudio(location.state.activeAudio)
    }
  }, [location.state])

  useEffect(() => {
    if (activeAudio) {
      setTranscriptionData(activeAudio.transcription || [])
    }
  }, [activeAudio])

  const handleButtonClick = () => {
    nav("/")
  }

  const handlePlayPause = () => {
    setPlaying(!playing)
  }

  const handleAudioClick = async (audio) => {
    if (activeAudio?.s3_key === audio.s3_key) {
      setActiveAudio(null)
    } else {
      setActiveAudio(audio)
      setPlaying(false)
      setIsTranscriptionLoading(true)
      setTranscriptionStatus(null)

      try {
        const response = await fetch(`https://mediscribeai-backend.vercel.app/transcribe/get_transcription/${audio.s3_key}`, {
          method: "GET",
        })
        const data = await response.json()

        if (data.status === "IN_PROGRESS") {
          setTranscriptionStatus("IN_PROGRESS")
          setTranscriptionData([])
          console.log("Still fetching")
        } else {
          setTranscriptionStatus("COMPLETED")
          setTranscriptionData(data || [])
          console.log("Fetched transcription data: ", data)
        }
      } catch (error) {
        console.error("Error fetching transcription:", error)
        setTranscriptionStatus("ERROR")
      } finally {
        setIsTranscriptionLoading(false)
      }
    }
  }

  const handleDelete = async (s3_key) => {
    try {
      const response = await fetch(`https://mediscribeai-backend.vercel.app/s3/audio/delete/${s3_key}`, {
        method: "DELETE",
      })
      if (response.ok) {
        console.log("File deleted successfully!")
        setAudioData(prev => prev.filter(audio => audio.s3_key !== s3_key))
        if (activeAudio?.s3_key === s3_key) {
          setActiveAudio(null)
        }
      } else console.error("Failed to delete file!")
    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = async (s3_key, newTitle) => {
    try {
      const parts = s3_key.split('_', 2)
      const newS3Key = `${parts[0]}_${parts[1]}_${newTitle}`

      const response = await fetch(`https://mediscribeai-backend.vercel.app/s3/audio/edit/${s3_key}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  
          new_filename: newTitle
        })
      })

      if (response.ok) {
        setAudioData(prev =>
          prev.map(audio => 
            audio.s3_key === s3_key 
              ? { ...audio, file_name: newTitle, s3_key: newS3Key } 
              : audio
          )
        )

        if (activeAudio?.s3_key === s3_key) {
          setActiveAudio(prev => ({ ...prev, file_name: newTitle, s3_key: newS3Key }))
        }
        
        console.log("Title updated successfully!")
      } else {
        console.error("Failed to update title!")
      }
    } catch (error) {
      console.error("Error while updating title:", error)
    }
  }

  const filteredAudioData = audioData.filter(audio => 
    audio.file_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const CustomAlert = ({ message, type }) => (
    <div className="flex items-center justify-center h-full bg-white shadow-lg">
      <div className={`p-8 rounded-lg ${type === 'error' ? 'bg-red-50 text-red-800' : 'bg-yellow-50 text-yellow-800'} max-w-md w-full`} role="alert">
        <div className="flex items-center mb-4">
          <AlertCircle className="h-8 w-8 mr-4" aria-hidden="true" />
          <span className="text-2xl font-semibold">{type === 'error' ? 'Error' : 'Processing'}</span>
        </div>
        <p className="text-lg">{message}</p>
      </div>
    </div>
  )

  return (
    <div className="bg-white ml-48 h-screen rounded-l-3xl py-16 px-28 text-left overflow-y-scroll">
      <div className="flex justify-between items-center lexend">
        <SearchAudio searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CreateButton handleButtonClick={handleButtonClick} />
      </div>
      <Header subtitle={subtitle} totalRecordings={totalRecordings} />

      <div className="flex gap-20">
        <div className="flex-1  rounded-lg p-6">
          {isAudioStorageLoading ? (
            <div className="flex flex-col items-center justify-center h-full w-full rounded-lg p-12 bg-white">
              <Loader2 className="h-24 w-24 animate-spin text-primary" />
              <p className="mt-8 text-2xl font-semibold text-gray-700">Loading audio collection...</p>
              <div className="mt-10 flex space-x-4">
                <div className="h-4 w-4 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="h-4 w-4 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="h-4 w-4 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <p className="mt-6 text-lg text-gray-500">This may take a few moments</p>
            </div>
          ) : (
            <AudioList 
              audioData={filteredAudioData} 
              handleAudioClick={handleAudioClick} 
              activeAudio={activeAudio} 
              playing={playing}
              handlePlayPause={handlePlayPause}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          )}
        </div>
        <div className="flex-1 rounded-lg p-6 h-[calc(100vh-12rem)]">
          {isTranscriptionLoading ? (
            <div className="flex flex-col items-center justify-center h-full w-full bg-white rounded-lg p-12 shadow-lg ">
              <Loader2 className="h-24 w-24 animate-spin text-primary" />
              <p className="mt-8 text-2xl font-semibold text-gray-700">Loading transcription...</p>
              <div className="mt-10 flex space-x-4">
                <div className="h-4 w-4 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="h-4 w-4 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="h-4 w-4 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <p className="mt-6 text-lg text-gray-500">This may take a few moments</p>
            </div>
          ) : (
            <>
              {transcriptionStatus === "IN_PROGRESS" && (
                <CustomAlert 
                  message="Your transcription is still being processed. Please try again later." 
                  type="warning"
                />
              )}
              {transcriptionStatus === "ERROR" && (
                <CustomAlert 
                  message="An error occurred while fetching the transcription. Please try again." 
                  type="error"
                />
              )}
              {transcriptionStatus === "COMPLETED" && (
                <TranscriptionContent 
                  transcriptionData={transcriptionData} 
                  setTranscriptionData={setTranscriptionData} 
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )


}

export default RecordingStorage

