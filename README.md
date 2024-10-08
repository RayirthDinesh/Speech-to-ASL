**ASLify App created by Rayirth Dinesh and Sami Uddin**

ASLify website:https://shugga228.github.io/ASLifyWeb/

https://github.com/user-attachments/assets/98d2ff6f-e830-4526-9201-b8514cd9e235

**Step 1:** Create a new React Native Project
- npx create-expo-app@latest
- cd into directory

**Step 2:** Convert tsx files in app folder into js
- index.tsx to index.js
- delete all the files in the tabs folder expect index.js
- move index.js outside the tab folder and delete the tabs folder
- delete the other files in the app folder (
only leave the index.js file)

**Step 3:** Install the necessary packages
- Use npm install react, react-native, @react-native-voice/voice, expo-av

**Step 4:** Paste Code onto index.js
```

import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput, Keyboard } from 'react-native';
import Voice from '@react-native-voice/voice';

import { Audio, Video } from 'expo-av';


const App = () => {
  const [titleText, setTitleText] = useState('Speech')
  const [showTextInput, setShowTextInput] = useState(false);
  const [showSpeakerOutput, setShowSpeakerOutput] = useState(false);
  const [showSpeaker, setShowSpeaker] = useState(false);
  const [text, setText] = useState('');
  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('idle');
  const [audioData, setAudioData] = useState(null);
  const [recordButtonVisible, setRecordButtonVisible] = useState(true);
  const [transcribeButtonVisible, setTranscribeButtonVisible] = useState(false);
  const [playing, setPlaying] = useState(false);

  const [videoUrl, setVideoUrl] = useState('');
  const [videoQueue, setVideoQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(false);
  const [errorCheck, setErrorCheck] = useState(false);
  const [synonym, setSynonym] = useState('')
  const [textHolder, setTextHolder] = useState('');
  const videoRef = useRef(null);

  const [isRecording, setIsRecording] = useState(false);
  const [speechError, setSpeechError] = useState('');

  useEffect(() => {
    Voice.onSpeechStart = () => setIsRecording(true);
    Voice.onSpeechEnd = () => setIsRecording(false);
    Voice.onSpeechError = (err) => setSpeechError(err.error);
    Voice.onSpeechResults = (result) => setTextHolder(result.value[0]);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);



  const handleShowTextInput = () => {
    setTitleText('Text');
    setShowTextInput(true);
    setShowSpeaker(false);
    setShowSpeakerOutput(false);
  };

  const handleShowSpeaker = () => {
    setTitleText('Speech');
    setShowSpeaker(true);
    setShowTextInput(false);
    setShowSpeakerOutput(true);

  };

  const handleConvertButtonClick = async () => {
    setErrorCheck(false);
    setError(false);
    if (recording) {
      stopRecording();
    }


    const contractions = {
      "ain't": "am not",
      "aren't": "are not",
      "can't": "cannot",
      "can't've": "cannot have",
      "'cause": "because",
      "could've": "could have",
      "couldn't": "could not",
      "couldn't've": "could not have",
      "didn't": "did not",
      "doesn't": "does not",
      "don't": "do not",
      "hadn't": "had not",
      "hadn't've": "had not have",
      "hasn't": "has not",
      "haven't": "have not",
      "he'd": "he would",
      "he'd've": "he would have",
      "he'll": "he will",
      "he'll've": "he will have",
      "he's": "he is",
      "how'd": "how did",
      "how'd'y": "how do you",
      "how'll": "how will",
      "how's": "how is",
      "i'd": "i would",
      "i'd've": "i would have",
      "i'll": "i will",
      "i'll've": "i will have",
      "i'm": "i am",
      "i've": "i have",
      "isn't": "is not",
      "it'd": "it would",
      "it'd've": "it would have",
      "it'll": "it will",
      "it'll've": "it will have",
      "it's": "it is",
      "let's": "let us",
      "ma'am": "madam",
      "mayn't": "may not",
      "might've": "might have",
      "mightn't": "might not",
      "mightn't've": "might not have",
      "must've": "must have",
      "mustn't": "must not",
      "mustn't've": "must not have",
      "needn't": "need not",
      "needn't've": "need not have",
      "o'clock": "of the clock",
      "oughtn't": "ought not",
      "oughtn't've": "ought not have",
      "shan't": "shall not",
      "sha'n't": "shall not",
      "shan't've": "shall not have",
      "she'd": "she would",
      "she'd've": "she would have",
      "she'll": "she will",
      "she'll've": "she will have",
      "she's": "she is",
      "should've": "should have",
      "shouldn't": "should not",
      "shouldn't've": "should not have",
      "so've": "so have",
      "so's": "so is",
      "that'd": "that would",
      "that'd've": "that would have",
      "that's": "that is",
      "there'd": "there would",
      "there'd've": "there would have",
      "there's": "there is",
      "they'd": "they would",
      "they'd've": "they would have",
      "they'll": "they will",
      "they'll've": "they will have",
      "they're": "they are",
      "they've": "they have",
      "to've": "to have",
      "wasn't": "was not",
      "we'd": "we would",
      "we'd've": "we would have",
      "we'll": "we will",
      "we'll've": "we will have",
      "we're": "we are",
      "we've": "we have",
      "weren't": "were not",
      "what'll": "what will",
      "what'll've": "what will have",
      "what're": "what are",
      "what's": "what is",
      "what've": "what have",
      "when's": "when is",
      "when've": "when have",
      "where'd": "where did",
      "where's": "where is",
      "where've": "where have",
      "who'll": "who will",
      "who'll've": "who will have",
      "who's": "who is",
      "who've": "who have",
      "why's": "why is",
      "why've": "why have",
      "will've": "will have",
      "won't": "will not",
      "won't've": "will not have",
      "would've": "would have",
      "wouldn't": "would not",
      "wouldn't've": "would not have",
      "y'all": "you all",
      "y'all'd": "you all would",
      "y'all'd've": "you all would have",
      "y'all're": "you all are",
      "y'all've": "you all have",
      "you'd": "you would",
      "you'd've": "you would have",
      "you'll": "you will",
      "you'll've": "you will have",
      "you're": "you are",
      "you've": "you have"
    };

    function expandContractions(text) {
      text = text.normalize("NFKD").replace(/[\u2019\u2018]/g, "'");

      return text.replace(/\b(\w+\'\w+)\b/g, function (match) {
        return contractions[match.toLowerCase()] || match;
      });
    }

    function stemWords(text) {
      text = expandContractions(text);
      var words = text.split(' ');
      var stemmedWords = words.map(word => {
        word = word.toLowerCase();
        if (word.endsWith("'s") || word.endsWith("s'")) {
          return word.replace(/'s$/, "").replace(/s'$/, "");
        } else if (word.endsWith('ing')) {
          return word.slice(0, -3);
        } else if (word.endsWith('ly')) {
          return word.slice(0, -2);
        } else if (word.endsWith('s') && word.length > 1) {
          return word.slice(0, -1);
        } else {
          return word;
        }
      });
      return stemmedWords.join(' ');
    }
    const inputText = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    const stemmedText = stemWords(inputText);



    const textInputArray = stemmedText.split(" ");



    const videos = [];

    for (let i = 0; i < textInputArray.length; i++) {
      if (textInputArray[i].length > 2 || textInputArray[i] == "i") {
        if (textInputArray[i] == "i") {
          videos.push(`https://media.signbsl.com/videos/asl/valleybible/mp4/I%20am.mp4`);
          continue;
        }

        const firstLetter = textInputArray[i].substring(0, 1);
        const firstThreeLetters = textInputArray[i].substring(0, 3);
        const url = `https://www.handspeak.com/word/${firstLetter}/${firstThreeLetters}/${textInputArray[i]}.mp4`;

        videos.push(url);
      }

    }

    setVideoQueue(videos);


    setCurrentIndex(0);
    if (videos.length > 0) {
      setVideoUrl(videos[0]);
      setPlaying(true);
    }
  };

  const showNextVideo = () => {

    if ((currentIndex < videoQueue.length - 1)) {
      const nextIndex = currentIndex + 1;
      setVideoUrl(videoQueue[nextIndex]);
      setCurrentIndex(nextIndex);
      setErrorCheck(false);
    }

    else {
      setPlaying(false);
    }
  };


  const alternativeVideo = () => {
    setErrorCheck(true);
    const word = videoUrl.substring(37);
    setVideoUrl(`https://media.signbsl.com/videos/asl/startasl/mp4/${word}`);

    setPlaying(true);
    setError(false);
  };

  const handleError = (error) => {
    setError(true);
    alternativeVideo();
    if (errorCheck) {
      showNextVideo();
      console.error("Could not play: ", videoUrl.substring(50));
      console.log("Could not play: ", videoUrl.substring(50));
    }


  };

  const startRecording = async () => {
    try {
      await Voice.start('en-US');
      setRecordButtonVisible(false);
      setRecordingStatus('recording');
      setTranscribeButtonVisible(true);
    } catch (err) {
      setSpeechError(err.message);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setRecordingStatus('idle');
      setTranscribeButtonVisible(true);
      setIsRecording(false); 
    } catch (err) {
      setSpeechError(err.message);

    }
  };

  const transcribeAudio = async () => {
    try {
      setText(textHolder)

    } catch (error) {
      console.error('Failed to transcribe audio', error.message);
    }
  };

  const clearRecordings = () => {
    setText('');
    setRecordButtonVisible(true);
    setTranscribeButtonVisible(false);

  };

  const renderRecordingControls = () => {
    if (recordingStatus === 'idle' && recordButtonVisible) {
      return <Button title="Record" onPress={startRecording} />;
    } else if (recordingStatus === 'recording') {
      return (
        <View style={styles.row}>
          <Text style={[styles.fill, styles.whiteText]}>Recording...</Text>
          <Button style={styles.button} onPress={stopRecording} title="Stop Recording"></Button>
        </View>
      );
    }
    return null;
  };

  const renderRecordings = () => {
    if (recordingStatus === 'idle' && isRecording === false && transcribeButtonVisible===true) {
      return (
        <View style={styles.row}>
          <Button style={styles.button} onPress={clearRecordings} title="Clear"></Button>
          <Button style={styles.button} onPress={transcribeAudio} title="Transcribe"></Button>
          
        </View>
      );
    }
    return null;
  };

  const getDurationFormatted = (millis) => {
    if (millis === undefined || millis === null) {
      return '0:00';
    }

    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ASLify</Text>
      <Text style={styles.subtitle}>{titleText} to ASL</Text>
      
      <TouchableOpacity style={[styles.button, styles.greenButton]} onPress={handleShowTextInput}>
        <Text style={styles.buttonText}>Show Text Input</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.greenButton]} onPress={handleShowSpeaker}>
        <Text style={styles.buttonText}>Show Speaker</Text>
        
      </TouchableOpacity>
      

      {showTextInput && (
        <TextInput
          style={styles.textBox}
          placeholder="Type your text here"
          placeholderTextColor="#fff"
          multiline
          value={text}
          onChangeText={setText}
        />
      )}
      {showSpeakerOutput && (
        <TextInput
          style={styles.textBox}
          placeholder="Your speech will appear here"
          placeholderTextColor="#fff"
          multiline
          value={text}
          onChangeText={setText}
        />
      )}
      {playing && (
        <View>
          <Video
            ref={videoRef}
            source={{ uri: videoUrl }}
            style={{ height: 200 }}
            useNativeControls
            resizeMode="contain"
            shouldPlay={true}
            isLooping={false}
            onError={(error) => {
              handleError(error);
              if (errorCheck) {
                handleError(error);
                console.log("in error check")
              }
            }}
            positionMillis={0}
            onLoad={(loadEvent) => {
              videoRef.current.playAsync();
            }}
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) {
                videoRef.current.setPositionAsync(0);
                showNextVideo();
              }
            }}
          />
        </View>
      )}

      {showSpeaker && (
        <View>
          {renderRecordingControls()}
          {renderRecordings()}

        </View>

      )}
      {(showSpeaker || showTextInput) && !playing && (
        <Button title="Convert" color="#4CAF50" onPress={() => {
          handleConvertButtonClick();
          Keyboard.dismiss();}}/>
         
      )}
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    color: '#FFF',
    marginBottom: 70,
    marginTop: -400,
    fontWeight: 'bold',
  },
  subtitle:{
    textAlign: 'center',
    fontSize: 20,
    color: '#FFF',
    marginBottom: 30,
    marginTop: -50,
    fontWeight: 'bold',
  },
  textBox: {
    width: '100%',
    height: 50,
    backgroundColor: '#444',
    color: '#FFF',
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#666',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  greenButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  whiteText: {
    color: '#FFF',
  },
  picker: {
    inputIOS: {
      color: 'white',
    },
    inputAndroid: {
      color: 'white',
    },
  },
  label: {
    color: '#FFF',
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '500',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'white',
    paddingRight: 30,
    backgroundColor: '#444',
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'white',
    paddingRight: 30,
    backgroundColor: '#444',
    marginBottom: 20,
  },
});


export default App;
```
**Step 5:** Install Android Studio
- Open a virtual device (reccomend Pixel 4 API 35)
- Restart Computer

**Step 5:** Generate Android folder to download app:
- npx expo run:android
  
**Step 6:** Run the Development server to run it on Andriod Emulator or an Android device:
- npm install --global eas-cli 
- eas build --profile development --platform android

**Step 7:** Download aab file and convert it to an APK and run the app on your android device
