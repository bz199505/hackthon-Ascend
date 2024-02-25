import React, { useEffect, useState } from "react"
//import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"

const appId = "<INSERT_SPEECHLY_APP_ID_HERE>"
//const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
//SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const Dictaphone = () => {
  const { transcript = 'https://fastapi-production-cd88.up.railway.app/transcript', listening, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition()
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true })

  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    const words = transcript.split(" ")
    if (words.length >= 0 && transcript.length > 0) {
      const sendData = async () => {
        console.log(666)
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

      sendData()
      resetTranscript()
    }
  }, [transcript, resetTranscript])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }

  return (
    <>
      {/* Microphone */}
      <div>
        <p>Microphone: {listening ? "on" : "off"}</p>
        <button
          className="neon-button"
          onTouchStart={startListening}
          onMouseDown={startListening}
          onClick={resetTranscript}
          onTouchEnd={SpeechRecognition.stopListening}
          onMouseUp={SpeechRecognition.stopListening}
        >
          Hold to talk
        </button>
        <p>{transcript}</p>
      </div>
      {/* picture */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="AI Generated"
          loading={"lazy"}
          style={{
            width: "90%",
            height: "90%",
            borderRadius: "25px",
            boxShadow: "0  0  8px  3px rgba(255,  255,  255,  0.5)",
          }}
        />
      )}
    </>
  )
}
export default Dictaphone
