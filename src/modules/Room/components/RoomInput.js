import colors from 'app/assets/style/colors';
import useRepository from 'app/database/Model';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { useSelector } from 'react-redux';

export default function RoomInput({ roomUid }) {
  const { roomRepository } = useRepository();
  const currentUser = useSelector(state => state.user);
  const [inputText, setInputText] = useState();

  const submitIcon = require('app/assets/icons/ArrowRight.svg');

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      padding: 10,
      paddingBottom: 48,
      backgroundColor: colors.orange[100],
    },
    input: {
      flex: 1,
      borderColor: colors.orange[1000],
      borderWidth: 2,
      padding: 16,
      borderRadius: 32,
      backgroundColor: 'white',
    },
    submit: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.orange[200],
      padding: 8,
      height: 54,
      width: 54,
      borderRadius: 32,
      marginLeft: 10,
    },
  });
  const handlePost = () => {
    if (!inputText) return;
    roomRepository.post(roomUid, currentUser.uid, inputText);
    setInputText('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={88}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TextInput
            placeholder="Envoyer un message..."
            style={[styles.input]}
            onChangeText={setInputText}
            value={inputText}
          />
          <TouchableOpacity
            style={[styles.submit, !inputText ? styles.submitDisabled : null]}
            onPress={handlePost}>
            <SvgUri
              width="24"
              height="24"
              fill={colors.orange[1000]}
              source={submitIcon}
            />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
