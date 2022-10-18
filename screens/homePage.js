import react from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button } from "react-native";
import * as React from "react";

export default function HomePage({ navigation }) {
  const onPressHandler = () => {
    navigation.navigate("AddPhotoPage");
  };

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.buttonText}
          title="Member Photo"
          onPress={onPressHandler}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 8,
    backgroundColor: "blue",
    padding: 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
