import { View, Text } from 'react-native';
import React, { useState } from 'react';
import Profile from './Profile';
import Edit from './Edit';
export default function EP(props) {
  const [ed, seted] = useState(true);
  return (
    <View>
      {ed ? (
        <Profile ed={ed} seted={seted} props={props} />
      ) : (
        <Edit ed={ed} seted={seted} />
      )}
    </View>
  );
}
