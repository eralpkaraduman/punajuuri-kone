import React, {useRef, useCallback, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import {
  BaseButton,
  BorderlessButton,
  RectButton,
} from 'react-native-gesture-handler';
import Share from 'react-native-share';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const ref = useRef();

  const onCapture = useCallback(() => {
    ref.current
      .capture()
      .then(dataUri => {
        Alert.alert('Aldim onu', 'Acayim mi?', [
          {
            text: 'AÇ',
            onPress: () => {
              Share.open({
                title: 'Share file',
                url: dataUri,
                failOnCancel: false,
              });
              console.log(dataUri);
            },
          },
        ]);
      })
      .catch(e => console.error(e));
  }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          justifyContent: 'center',
          top: 0,
          left: 0,
          right: 0,
        }}>
        <RectButton onPress={onCapture} style={{padding: 5}}>
          <Text>BANA BAS</Text>
        </RectButton>
      </View>
      <ViewShot
        ref={ref}
        options={{
          result: 'data-uri',
        }}
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TextInput
          multiline
          style={{
            margin: 0,
            padding: 0,
            fontSize: 24,
            textAlign: 'center',
          }}
          placeholder="NABER?"
        />
      </ViewShot>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
