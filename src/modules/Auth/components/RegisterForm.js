import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import BabbleButton from '@/components/BabbleButton';
import BabbleInput from '@/components/BabbleInput';
import useRepository from '@/database/Model';
import { setErrorMessage } from '@/store/App';

const auth = getAuth();

export default function RegisterForm() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const [mail, setMail] = useState(null);
  const [errorArray, setErrorArray] = useState([]);
  const { userRepository } = useRepository();

  const dispatch = useDispatch();

  const onRegister = async () => {
    if (
      username === null ||
      password === null ||
      passwordConfirm === null ||
      mail === null
    ) {
      dispatch(setErrorMessage('Remplir tous les champs'));
      onInputError();
      return;
    }
    if (password !== passwordConfirm) {
      dispatch(setErrorMessage('Les mots de passe ne correspondent pas'));
      onInputError();
      return;
    }
    try {
      await userRepository.create(auth, mail, password, username);
    } catch (error) {
      dispatch(setErrorMessage(`${error.code}: ${error.message}`));
    }
  };

  const onInputError = () => {
    setErrorArray([]);

    if (username === null) {
      setErrorArray(oldArray => [...oldArray, 'username']);
    }
    if (password === null || password !== passwordConfirm) {
      setErrorArray(oldArray => [...oldArray, 'password']);
    }
    if (passwordConfirm === null || password !== passwordConfirm) {
      setErrorArray(oldArray => [...oldArray, 'passwordConfirm']);
    }
    if (mail === null) {
      setErrorArray(oldArray => [...oldArray, 'mail']);
    }
  };

  const onInput = (type, value) => {
    setErrorArray([]);

    switch (type) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'passwordConfirm':
        setPasswordConfirm(value);
        break;
      case 'mail':
        setMail(value);
        break;
      default:
        break;
    }
  };

  const checkError = inputName => errorArray.includes(inputName);

  return (
    <View style={styles.container}>
      <BabbleInput
        style={styles.input}
        label="Email"
        value={mail}
        placeholder="votre.email@mail.com"
        onChangeText={text => onInput('mail', text)}
        autoCorrect={false}
        keyboardType="email-address"
        autoCapitalize="none"
        error={checkError('mail')}
      />
      <BabbleInput
        style={styles.input}
        label="Nom d'utilisateur"
        autoCorrect={false}
        value={username}
        placeholder="beubeuDu33"
        textContentType="username"
        onChangeText={text => onInput('username', text)}
        error={checkError('username')}
      />
      <BabbleInput
        style={styles.input}
        label="Mot de passe"
        value={password}
        placeholder="••••••••••••"
        onChangeText={text => onInput('password', text)}
        autoComplete="password"
        secureTextEntry
        error={checkError('password')}
      />
      <BabbleInput
        style={styles.input}
        label="Confirmer le mot de passe"
        value={passwordConfirm}
        placeholder="••••••••••••"
        onChangeText={text => onInput('passwordConfirm', text)}
        autoComplete="password"
        secureTextEntry
        error={checkError('passwordConfirm')}
      />
      <BabbleButton style={styles.button} onPress={() => onRegister()}>
        S'enregistrer
      </BabbleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 42,
    marginBottom: 80,
  },
  input: {
    marginTop: 16,
  },
  button: {
    marginTop: 32,
  },
});
