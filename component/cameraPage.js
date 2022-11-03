import React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView, Button, Image } from "react-native";
import { useRef } from "react";
import { Camera } from "expo-camera";
import { showMessage } from "react-native-flash-message";
import { StatusBar } from "expo-status-bar";

export default function Camerapage() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState();
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    // console.log(newPhoto);
    setPhoto(newPhoto);
  };

  if (photo) {
    let uploadPhoto = () => {
      fetch(
        // TODO: Replace this with the actual URL: "https://cargoshakti.com/clubtrakkapi/api/member/save-member-photo"
        "https://a9a6f834-e0a2-412f-9a01-cf26e313d3dc.mock.pstmn.io/api/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            MemberId: 123,
            Photo: photo.base64,
          }),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          showMessage({
            message: "Photo Upload is successful",
            type: "success",
          });
        });
    };
    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <View style={styles.buttonContainer}>
          <Button style={styles.button} title="Upload" onPress={uploadPhoto} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            title="Capture again"
            onPress={() => setPhoto(undefined)}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef} type={type}>
      <Button title="Capture" onPress={takePic}></Button>
      <Button
        icon="axis-z-rotate-clockwise"
        style={{ marginRight: 12 }}
        title="front"
        mode="outlined"
        color="gray"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      >
        {type === Camera.Constants.Type.back ? "Front" : "Back "}
      </Button>
      <StatusBar style="auto" />
    </Camera>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",
  },
  preview: {
    alignSelf: "stretch",
    // flex: 1,
    height: 120,
    width: 120,
    marginLeft: 130,
    marginBottom: 6,
  },
  buttonContainer: {
    backgroundColor: "blue",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    width: 185,
    margin: 30,
  },
});
