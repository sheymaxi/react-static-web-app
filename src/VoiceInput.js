import React, { useState } from 'react';

const VoiceInput = ({ onTranscriptReceived }) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);

  const startListening = async () => {
    setError(null);
    setIsListening(true);

    try {
      const speechConfig = window.SpeechSDK.SpeechConfig.fromSubscription(
        process.env.REACT_APP_SPEECH_KEY,
        process.env.REACT_APP_SPEECH_REGION
      );
      const audioConfig = window.SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
      const recognizer = new window.SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

      recognizer.recognizeOnceAsync(
        (result) => {
          if (result.text) {
            onTranscriptReceived(result.text);
          }
          setIsListening(false);
          recognizer.close();
        },
        (err) => {
          setError('Failed to recognize speech. Please try again.');
          setIsListening(false);
          recognizer.close();
        }
      );
    } catch (err) {
      setError('Failed to start speech recognition. Please try again.');
      setIsListening(false);
    }
  };

  return (
    <div>
      <button onClick={() => !isListening && startListening()} disabled={isListening}>
        {isListening ? 'Listening...' : 'Start Voice Command'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default VoiceInput;
