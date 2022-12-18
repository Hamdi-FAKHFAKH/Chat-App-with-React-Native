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
export default function Chat({ route, navigation }) {
  //------------------------------- ---------------------------------- UseState ----------------------------------------------------
  const [msg, setmsg] = useState();
  const [data, setdata] = useState([]);
  const [currentUserEmail, setcurrentUserEmail] =
    useState();
  const [dest, setdest] = useState();
  const [table, settable] = useState();
  // ------------------------------ ------------------------------ FireBase --------------------------------------------------------------
  const database = initfirebase.database();
  const auth = getAuth();
  const flatList = React.useRef(null);
  // ---------------------------------------------------------------- Function ----------------------------------------------------------------

  //console.log(table);
  var chatid = '';
  //---------------------------------------------------------------- Use Effect ----------------------------------------------------------------
  const ref_chat = database.ref('tablemsg/' + chatid);
  useEffect(() => {
    let { receiver } = route.params;
    receiver = String(receiver);
    var currentUserEmail2 = auth.currentUser.email;
    currentUserEmail2 = currentUserEmail2
      .substring(0, currentUserEmail2.indexOf('@'))
      .replace('.', ' ');
    receiver = receiver
      .substring(0, receiver.indexOf('@'))
      .replace('.', ' ');
    setcurrentUserEmail(currentUserEmail2);
    setdest(receiver);
    //console.log('getTableName');
    //console.log(currentUserEmail);
    //console.log(receiver);

    if (currentUserEmail2[0] > receiver[0]) {
      chatid = currentUserEmail2 + '-' + receiver;
    } else {
      chatid = receiver + '-' + currentUserEmail2;
    }
    ref_chat.on('value', (datasnapshot) => {
      const dd = datasnapshot.val();
      settable([]);
      settable(
        Object.keys(dd).map((val) => {
          return {
            msg: dd[val].msg,
            sender: dd[val].sender,
          };
        })
      );
    });
  }, []);
  // ---------------------------------------------------------------- Render ----------------------------------------------------------------
  return (
    <View style={{ height: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#4682B4',
        }}
      >
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
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#AEBDCA',
        }}
        data={table}
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
            <Text
              style={{
                backgroundColor: '#5DA7DB',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 20,
                color: '#fff',
                textAlign: 'center',
              }}
            >
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
          style={{
            height: 40,
            color: 'black',
            width: '100%',
            backgroundColor: '#AEBDCA',
            borderColor: 'black',
            borderTopWidth: 1,
            paddingTop: 5,
            borderBottomColor: '#000000',
          }}
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
            // setdata((data) => [
            //   ...data,
            //   { sender: currentUserEmail, msg: msg },
            // ]);
            setmsg('');
            if (msg != '') {
              if (currentUserEmail[0] > dest[0]) {
                chatid = currentUserEmail + '-' + dest;
              } else {
                chatid = dest + '-' + currentUserEmail;
              }
              database.ref('tablemsg/' + chatid).push({
                sender: currentUserEmail,
                msg: msg,
              });
            }
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
});
