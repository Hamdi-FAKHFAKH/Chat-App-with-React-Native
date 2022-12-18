import React, { useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { FragmentHeaderstyles } from '../../Style/FragmentHeaderstyles';

export default function Groupe() {
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
          Groupe
        </Text>
      </View>
    </View>
  );
}
