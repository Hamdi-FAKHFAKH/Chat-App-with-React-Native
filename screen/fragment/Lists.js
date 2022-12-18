import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { FragmentHeaderstyles } from '../../Style/FragmentHeaderstyles';
import initfirebase from '../../config';
import { Avatar } from '@rneui/themed';
export default function Lists(props) {
  const database = initfirebase.database();
  const ref_prof = database.ref('profils');
  const [data, setdata] = useState([]);
  const d = [{ nom: 14, email: 'fffffff' }];
  useEffect(() => {
    ref_prof.on('value', (datasnapshot) => {
      const dd = datasnapshot.val();
      setdata(
        Object.keys(dd).map((val) => {
          return {
            nom: dd[val].nom,
            prenom: dd[val].prenom,
            email: dd[val].email,
            ImageProfileURL: dd[val].ImageProfileURL,
          };
        })
      );
    });
  }, []);
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
          List
        </Text>
      </View>
      <FlatList
        style={{
          width: '100%',
          height: '100 %',
          marginTop: 20,
        }}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              marginHorizontal: 8,
              paddingBottom: 10,
            }}
            onPress={() =>
              props.navigation.navigate('chat', {
                receiver: item.email,
              })
            }
          >
            <Avatar
              size={55}
              rounded
              source={
                item.ImageProfileURL
                  ? { uri: item.ImageProfileURL }
                  : {
                      uri: 'https://thumbs.dreamstime.com/b/vecteur-d-ic%C3%B4ne-de-profil-avatar-par-d%C3%A9faut-photo-sociale-inconnue-utilisateur-m%C3%A9dias-l-184816085.jpg',
                    }
              }
            />
            <View
              style={{
                borderBottomWidth: 1,
                width: '80%',
                marginStart: 10,
                marginTop: -2,
              }}
            >
              <Text
                style={{
                  paddingStart: 10,
                  paddingTop: 7,
                }}
              >
                {item.nom}
              </Text>
              <Text
                style={{
                  paddingStart: 10,
                  paddingTop: 2,
                }}
              >
                {item.email}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({});
