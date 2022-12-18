import { View, Text, Image, TextInput } from 'react-native';
import React from 'react';
import initfirebase from '../../config';
import { Button } from 'react-native-paper';
import { FragmentHeaderstyles } from '../../Style/FragmentHeaderstyles';
import { ProfileStyle } from '../../Style/ProfileStyle';
import { styles } from '../../Style/Siginstyles';
import { useState, useEffect } from 'react';
import { Avatar } from '@rneui/themed';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  pickImage,
  uploadImage,
} from '../../Service/ProfileService';
import { EditStyle } from '../../Style/EditStyle';
import AwesomeAlert from 'react-native-awesome-alerts';
import { getAuth } from 'firebase/auth';
export default function Edit({ seted }) {
  //-------------------------------------------------------  Fire base ---------------------------------------------------------------
  const database = initfirebase.database();
  const store = initfirebase.storage();
  //------------------------------------------------------------ Use State ---------------------------------------------------------------
  const [email, setemail] = useState('');
  const [name, setname] = useState('');
  const [phone, setphone] = useState('');
  const [image, setImage] = useState(
    'https://thumbs.dreamstime.com/b/vecteur-d-ic%C3%B4ne-de-profil-avatar-par-d%C3%A9faut-photo-sociale-inconnue-utilisateur-m%C3%A9dias-l-184816085.jpg'
  );
  const [showAlert, setshowAlert] = useState(false);
  const [currentUserKey, setcurrentUserKey] = useState();
  const [spinner, setspinner] = useState(false);
  const [message, setmessage] = useState({
    msg: 'Your Profile is successfully updated !',
    conftext: '   OK   ',
    color: '#00C897',
  });
  const storage = initfirebase.storage();
  const auth = getAuth();
  //--------------------------------------------------------------------- Use Effect------------------------------------------------------------
  useEffect(() => {
    const currentUserEmail = auth.currentUser.email;
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
  //--------------------------------------------------------------------- Return ------------------------------------------------------------
  return (
    <View>
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
        <Avatar
          size={55}
          rounded
          icon={{
            name: 'home',
            type: 'font-awesome',
          }}
          containerStyle={{
            paddingTop: 12,
            marginRight: 10,
          }}
          onPress={() => seted(true)}
        />
      </View>
      <Spinner
        color="#4682B4"
        visible={spinner}
        textContent={'Loading...'}
        textStyle={{ color: '#4682B4' }}
      />
      <View style={ProfileStyle.view1Style}>
        <View style={EditStyle.v1}>
          {/* View  FOR UPLOAD IMAGE */}
          <View style={ProfileStyle.avatarStyle}>
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
              onPress={() => pickImage(setImage)}
            />
          </View>
          <Avatar
            size={40}
            rounded
            icon={{
              name: 'camera',
              type: 'font-awesome',
            }}
            containerStyle={{
              backgroundColor: '#4682B4',
              marginTop: -39,
              marginRight: -92,
            }}
            onPress={() => pickImage(setImage)}
          />
          <Text style={styles.labelTextStyle}>Name</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="First Name"
            onChangeText={(e) => {
              setname(e);
            }}
            defaultValue={name}
          ></TextInput>
          <Text style={styles.labelTextStyle}>
            Phone Number
          </Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Last Name"
            keyboardType="phone-pad"
            onChangeText={(e) => {
              setphone(e);
            }}
            defaultValue={phone}
          ></TextInput>
          <Text style={styles.labelTextStyle}>Email</Text>
          <TextInput
            editable={false}
            style={styles.textInputStyle}
            placeholder="exemple@gamil.com"
            keyboardType="email-address"
            onChangeText={(e) => {
              setemail(e);
            }}
            defaultValue={email}
          ></TextInput>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Button
              style={{
                marginTop: 25,
                backgroundColor: '#0082B4',
                paddingHorizontal: 15,
                marginHorizontal: 8,
              }}
              onPress={() => {
                if (!name || !phone || !image) {
                  setmessage({
                    msg: 'Make sure all fields are filled !',
                    conftext: '   OK   ',
                    Color: '#DC3535',
                  });
                  setshowAlert(true);
                } else {
                  setspinner(true);
                  (async () => {
                    if (currentUserKey) {
                      const url = await uploadImage(
                        image,
                        storage
                      );
                      await database
                        .ref('profils')
                        .child(currentUserKey)
                        .update({
                          email: email,
                          nom: name,
                          phone: phone + '',
                          ImageProfileURL: url,
                        });
                      setspinner(false);
                      setmessage({
                        msg: 'Your Profile is successfully updated !',
                        conftext: '   OK   ',
                        color: '#00C897',
                      });
                    } else {
                      setmessage({
                        msg: 'Your Profile is Not Exist !',
                        conftext: '   CANCEL   ',
                        color: '#DC3535',
                      });
                    }
                    setspinner(false);
                    setshowAlert(true);
                  })();
                }
              }}
            >
              <Text
                style={{
                  color: '#fff',
                }}
              >
                Save
              </Text>
            </Button>
            <Button
              style={{
                marginTop: 25,
                backgroundColor: '#0082B4',
                paddingHorizontal: 5.5,
                marginHorizontal: 8,
              }}
              onPress={() => {
                seted(true);
              }}
            >
              <Text
                style={{
                  color: '#fff',
                }}
              >
                Cancel
              </Text>
            </Button>
          </View>
        </View>
      </View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        alertContainerStyle={{ fontsize: 20 }}
        title="ChatApp"
        message={message.msg}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText={message.conftext}
        confirmButtonColor={message.color}
        onCancelPressed={() => {
          setshowAlert(false);
        }}
        onConfirmPressed={() => {
          setshowAlert(false);
        }}
      />
    </View>
  );
}
