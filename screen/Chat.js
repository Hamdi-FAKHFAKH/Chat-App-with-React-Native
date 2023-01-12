import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { FragmentHeaderstyles } from '../Style/FragmentHeaderstyles';
import { Avatar } from '@rneui/themed';
import initfirebase from '../config';
import { getAuth } from 'firebase/auth';
import { styles } from '../Style/ChatStyle';
export default function Chat({ route, navigation }) {
  //------------------------------- ---------------------------------- UseStates ----------------------------------------------------
  const [msg, setmsg] = useState();
  const [data, setdata] = useState([]);
  const [currentUserEmail, setcurrentUserEmail] =
    useState();
  // ------------------------------ ------------------------------ FireBase --------------------------------------------------------------
  const database = initfirebase.database();
  const auth = getAuth();
  const flatList = React.useRef(null);
  // ---------------------------------------------------------------- Functions ----------------------------------------------------------------
  //get all messages from firebase
  const getalldata = async () => {
    let currentUserEmail = await auth.currentUser.email;
    currentUserEmail = currentUserEmail
      .substring(0, currentUserEmail.indexOf('@'))
      .replace('.', '');
    setcurrentUserEmail(currentUserEmail);
    database.ref('tablemsg').on('value', (snapshot) => {
      const dd = snapshot.val();
      if (dd) {
        setdata(
          Object.keys(dd).map((val) => {
            return {
              sender: dd[val].sender,
              msg: dd[val].msg,
            };
          })
        );
      } else {
        setdata([]);
      }
    });
  };
  //---------------------------------------------------------------- Use Effect ----------------------------------------------------------------
  useEffect(() => {
    getalldata();
  }, []);
  // ---------------------------------------------------------------- Render ----------------------------------------------------------------
  return (
    <View style={{ height: '100%' }}>
      <View style={styles.view1}>
        <Text style={FragmentHeaderstyles.textStyle}>
          Chat
        </Text>
        <Avatar
          size={55}
          rounded
          icon={{
            name: 'arrow-right',
            type: 'font-awesome',
          }}
          containerStyle={{
            paddingTop: 12,
            marginRight: 10,
          }}
          onPress={() => navigation.navigate('home')}
        />
      </View>

      <FlatList
        ref={flatList}
        onContentSizeChange={() => {
          flatList.current.scrollToEnd();
        }}
        style={styles.flatListStyle}
        data={data}
        renderItem={({ item }) => (
          <View
            style={[
              {
                marginVertical: 10,
                marginHorizontal: 20,
                alignSelf:
                  currentUserEmail == item.sender
                    ? 'flex-end'
                    : 'flex-start',
              },
            ]}
          >
            <Text
              style={{
                fontSize: 12,
                marginLeft: 15,
                color: '#7F8487',
              }}
            >
              {item.sender}
            </Text>
            <Text style={styles.textMsgStyle}>
              {' '}
              {item.msg}
            </Text>
          </View>
        )}
      ></FlatList>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <TextInput
          placeholder="Enter your Message"
          cursorColor="#4682B4"
          selectionColor="#4682B4"
          style={styles.textInputStyle}
          theme={{ colors: '#000000' }}
          onChangeText={(e) => setmsg(e)}
          value={msg}
        ></TextInput>
        <Avatar
          size={55}
          rounded
          icon={{
            name: 'send',
            type: 'font-awesome',
            color: '#4682B4',
          }}
          containerStyle={{
            marginLeft: -100,
          }}
          onPress={() => {
            setmsg('');
            if (msg != '') {
              database.ref('tablemsg').push({
                sender: currentUserEmail,
                msg: msg,
              });
              getalldata();
            }
          }}
        />
      </View>
    </View>
  );
}
