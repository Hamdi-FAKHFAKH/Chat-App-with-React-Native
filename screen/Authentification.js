import { StatusBar } from 'expo-status-bar';
import { Avatar } from '@rneui/themed';
import {
  ImageBackground,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useState } from 'react';
import initfirebase from '../config';
import { styles } from '../Style/AuthStyle';
import {
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
//--------------------------------------------------------------------------------------------------------------------------------
export default function Authentification(props) {
  const [email, setemail] = useState('');
  const [psw, setpsw] = useState('');
  const [vis, setvis] = useState(false);
  const auth = getAuth();
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require('../assets/bg2.jpg')}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.view1Style}>
          <View style={styles.view2Style}>
            <Text style={styles.textTitre}>
              Authentification
            </Text>
            <Text style={styles.labelTextStyle}>Email</Text>
            <TextInput
              style={styles.textInputStyle}
              placeholder="exemple@gamil.com"
              keyboardType="email-address"
              onChangeText={(e) => {
                setemail(e);
              }}
            ></TextInput>
            <Text style={styles.labelTextStyle}>
              Password
            </Text>
            <TextInput
              style={styles.textInputStyle}
              placeholder="tap your password"
              keyboardType="ascii-capable"
              secureTextEntry={vis}
              onChangeText={(e) => setpsw(e)}
            ></TextInput>
            <Avatar
              size={55}
              rounded
              icon={{
                name: vis ? 'eye-slash' : 'eye',
                type: 'font-awesome',
              }}
              containerStyle={{
                marginTop: -48,
                marginRight: -220,
              }}
              onPress={() => setvis(!vis)}
            />
            <Button
              style={styles.btnstyle}
              onPress={() => {
                signInWithEmailAndPassword(auth, email, psw)
                  .then(() => {
                    props.navigation.replace('home');
                  })
                  .catch((err) => {
                    alert(err.message);
                  });
              }}
            >
              {' '}
              <Text style={{ color: 'white' }}>
                {' '}
                Connexion{' '}
              </Text>
            </Button>

            <TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  width: '85%',
                  textAlign: 'right',
                  marginTop: 20,
                  fontSize: 15,
                }}
                onPress={() =>
                  props.navigation.replace('SignUp')
                }
              >
                {' '}
                create new user
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
