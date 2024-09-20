
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import Voice from '@react-native-voice/voice';
import { Audio, Video } from 'expo-av';
import RNPickerSelect from 'react-native-picker-select';

const App = () => {
  const [text, setText] = useState('');
  const [textHolder, setTextHolder] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [speechError, setSpeechError] = useState('');


  useEffect(() => {
    Voice.onSpeechStart = () => setIsRecording(true);
    Voice.onSpeechEnd = () => setIsRecording(false);
    Voice.onSpeechError = (err) => setSpeechError(err.error);
    Voice.onSpeechResults = (result) => setText(result.value[0]);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecording = async () => {
    try {
      await Voice.start('en-US');
    } catch (err) {
      setSpeechError(err.message);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (err) {
      setSpeechError(err.message);
    }
  };

  const clearRecording = () => {
    setText('');
  };

  return (
    <View style={{ alignItems: 'center', margin: 20 }}>
      <Text style={{ fontSize: 20, color: 'green', fontWeight: '500' }}>
        Voice Input
      </Text>
      <Text>{text}</Text>


      <TouchableOpacity
        style={{ margin: 30 }}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Text style={{ color: 'red' }}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ margin: 30 }}
        onPress={clearRecording}
      >
        <Text style={{ color: 'blue' }}>
          Clear Recording
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;



