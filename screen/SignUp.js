import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  ImageBackground,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Button } from 'react-native-paper';
import initfirebase from '../config';
import { useState } from 'react';
import { styles } from '../Style/Siginstyles';
import {
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
export default function Sigin(props) {
  const [email, setemail] = useState('');
  const [psw, setpsw] = useState('');
  const [name, setname] = useState('');
  const [phone, setphone] = useState('');
  const auth = initfirebase.auth();
  const database = initfirebase.database();
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
            <Text style={styles.textTitre}>SignUp</Text>

            <Text style={styles.labelTextStyle}>Name</Text>
            <TextInput
              style={styles.textInputStyle}
              placeholder="First Name"
              onChangeText={(e) => {
                setname(e);
              }}
            ></TextInput>
            <Text style={styles.labelTextStyle}>
              Phone Number
            </Text>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              onChangeText={(e) => {
                setphone(e);
              }}
            ></TextInput>
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
              secureTextEntry={true}
              onChangeText={(e) => setpsw(e)}
            ></TextInput>

            <Button
              onPress={() => {
                database.ref('profils').push({
                  nom: name,
                  phone: phone,
                  email: email,
                });
                if (email.length > 0 && email.includes('@'))
                  auth
                    .createUserWithEmailAndPassword(
                      email,
                      psw
                    )
                    .then(() => {
                      props.navigation.replace('home');
                    })
                    .catch((erreur) => {
                      alert(erreur);
                    });
                //   }
                else {
                  alert('verifiez vos donnée');
                }
              }}
              style={{
                backgroundColor: '#00cc44',
                marginRight: 100,
                marginLeft: 100,
                marginTop: 30,
                marginBottom: 5,
              }}
            >
              <Text style={{ color: 'white' }}>
                Sign Up
              </Text>
            </Button>

            <TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  width: '85%',
                  textAlign: 'right',
                  marginTop: 5,
                  fontSize: 15,
                }}
                onPress={() =>
                  props.navigation.replace('auth')
                }
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
