import React, { useEffect, useState } from "react"
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"

const Dictaphone = () => {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition()
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (transcript.length > 0) {
        sendData()
      }
    }, 1000) // Debounce time of 1000ms

    return () => clearTimeout(debounceTimeout)
  }, [transcript, resetTranscript])

  const sendData = async () => {
    try {
      const response = await fetch(
        "https://fastapi-production-cd88.up.railway.app/transcript",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transcript: transcript }),
          mode: "cors",
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setImageUrl(data.message)
    } catch (error) {
      console.error("Network error:", error)
    }
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }

  return (
    <>
      <div>
        <p>Microphone: {listening ? "on" : "off"}</p>
        <button
          className="neon-button"
          onTouchStart={() => {
            SpeechRecognition.startListening()
          }}
          onMouseDown={() =>
            SpeechRecognition.startListening()
          }
          onTouchEnd={SpeechRecognition.stopListening}
          onMouseUp={SpeechRecognition.stopListening}
        >
          Hold to talk
        </button>
        <p>{transcript}</p>
      </div>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="AI Generated"
          loading="lazy"
          style={{
            width: "400px",
            height: "400px",
            borderRadius: "25px",
            boxShadow: "0  0  8px  3px rgba(255,  255,  255,  0.5)",
          }}
        />
      )}
    </>
  )
}

export default Dictaphone
