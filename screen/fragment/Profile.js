import { View, Text, Image } from 'react-native';
import React from 'react';
import initfirebase from '../../config';
import { Button } from 'react-native-paper';
import { FragmentHeaderstyles } from '../../Style/FragmentHeaderstyles';
import UserAvatar from 'react-native-user-avatar';
import { useState, useEffect } from 'react';
import { ProfileStyle } from '../../Style/ProfileStyle';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import { Avatar } from '@rneui/themed';
import { getAuth } from 'firebase/auth';
export default function Profile({ seted, props }) {
  const database = initfirebase.database();
  const storage = initfirebase.storage();
  const auth = getAuth();
  const [email, setemail] = useState('');
  const [name, setname] = useState('');
  const [phone, setphone] = useState('');
  const [image, setImage] = useState();
  const [currentUserKey, setcurrentUserKey] = useState();
  useEffect(() => {
    const currentUserEmail = auth.currentUser.email;
    console.log(currentUserEmail);
    database.ref('profils').on('value', (snapshot) => {
      const dd = snapshot.val();
      Object.keys(dd).map((val) => {
        if (dd[val].email == currentUserEmail) {
          setcurrentUserKey(val);
          setemail(dd[val].email);
          setphone(dd[val].phone);
          setname(dd[val].nom);
          setImage(dd[val].ImageProfileURL);
        }
      });
    });
  }, []);
  return (
    <View
      style={{
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#4682B4',
        }}
      >
        <Text style={FragmentHeaderstyles.textStyle}>
          Profile
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Avatar
            size={55}
            rounded
            icon={{
              name: 'power-off',
              type: 'font-awesome',
            }}
            containerStyle={{
              paddingTop: 12,
              marginRight: 5,
            }}
            onPress={() => {
              auth.signOut();
              props.navigation.navigate('auth');
            }}
          />
          <Avatar
            size={55}
            rounded
            icon={{
              name: 'gear',
              type: 'font-awesome',
            }}
            containerStyle={{
              paddingTop: 12,
              marginRight: 5,
            }}
            onPress={() => seted(false)}
          />
        </View>
      </View>
      <View
        style={{
          width: '90%',
          marginTop: 73,
          height: 320,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            marginTop: 10,

            backgroundColor: '#0D4C921f',
            height: 430,

            borderRadius: 20,
          }}
        >
          <Avatar
            size={160}
            rounded
            source={
              image
                ? { uri: image }
                : {
                    uri: 'https://thumbs.dreamstime.com/b/vecteur-d-ic%C3%B4ne-de-profil-avatar-par-d%C3%A9faut-photo-sociale-inconnue-utilisateur-m%C3%A9dias-l-184816085.jpg',
                  }
            }
            containerStyle={ProfileStyle.avatarStyle}
          />

          <Text
            style={{
              marginTop: 18,
              fontSize: 25,
              fontWeight: '800',
              textTransform: 'uppercase',
            }}
          >
            {name}
          </Text>
          <View
            style={{
              marginTop: 20,
              alignItems: 'flex-start',
              width: '90%',
              flexDirection: 'row',
            }}
          >
            <Entypo
              name="email"
              style={{
                backgroundColor: '#4682B4',
                borderRadius: 10,
                padding: 7,
              }}
              size={45}
              color="white"
            ></Entypo>
            <View>
              <Text
                style={{
                  marginStart: 10,
                  marginBottom: 2,
                  marginTop: 1,
                  fontSize: 20,
                  fontWeight: '800',
                  color: 'gray',
                }}
              >
                Email{' '}
              </Text>
              <Text
                style={{
                  marginStart: 10,
                  width: '100%',
                  fontWeight: '500',
                }}
              >
                {email}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              alignItems: 'flex-start',
              width: '90%',
              flexDirection: 'row',
            }}
          >
            <MaterialCommunityIcons
              name="account"
              style={{
                backgroundColor: '#4682B4',
                borderRadius: 10,
                padding: 7,
              }}
              size={45}
              color="white"
            ></MaterialCommunityIcons>
            <View>
              <Text
                style={{
                  marginStart: 10,
                  marginBottom: 2,
                  marginTop: 1,
                  fontSize: 20,
                  fontWeight: '800',
                  color: 'gray',
                }}
              >
                Name{' '}
              </Text>
              <Text
                style={{
                  marginStart: 10,
                  fontSize: 18,
                  fontWeight: '500',
                }}
              >
                {name}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              alignItems: 'flex-start',
              width: '90%',
              flexDirection: 'row',
            }}
          >
            <Foundation
              name="telephone"
              style={{
                backgroundColor: '#4682B4',
                borderRadius: 10,
                paddingHorizontal: 13,
                paddingVertical: 7,
              }}
              size={45}
              color="white"
            ></Foundation>
            <View>
              <Text
                style={{
                  marginStart: 10,
                  marginBottom: 2,
                  marginTop: 1,
                  fontSize: 20,
                  fontWeight: '800',
                  color: 'gray',
                }}
              >
                Phone{' '}
              </Text>
              <Text
                style={{
                  marginStart: 10,
                  fontSize: 18,
                  fontWeight: '500',
                }}
              >
                {phone}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              alignItems: 'flex-start',
              width: '90%',
              flexDirection: 'row',
            }}
          ></View>
        </View>
      </View>
    </View>
  );
}
