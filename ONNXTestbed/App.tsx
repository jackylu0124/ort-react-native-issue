/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import ndarray from "ndarray";
import ops from "ndarray-ops";
import {Env, Tensor} from "onnxruntime-react-native";
import * as ort from "onnxruntime-react-native";
import RNFS from "react-native-fs"

async function runInfernece() {
  try {
    const dest = RNFS.TemporaryDirectoryPath+"/LinearBlend_v001.ort";
    RNFS.downloadFile({fromUrl: Image.resolveAssetSource(require("./onnx_models/LinearBlend_v001.ort")).uri, toFile: dest});
    const file_list = await RNFS.readDir(RNFS.TemporaryDirectoryPath);
    // print out all the content inside the temporary directory
    console.log("*************************************************");
    console.log("Content inside the temporary directory:");
    for (const f of file_list) {
      console.log(f);
    }
    console.log("*************************************************");
    const session: ort.InferenceSession = await ort.InferenceSession.create(dest);
  } catch(e) {
    console.log("Error Message:", e);
  }
}

const ONNXInferenceTest: React.FC<{}> = () => {
  return (
    <View>
      <Button title="Start Inference" onPress={async () => {runInfernece();}}></Button>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <ONNXInferenceTest />
        <Image source={require("./onnx_models/simpson.jpg")}/>
      </ScrollView>
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
