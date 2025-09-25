import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export default function InputField(props: TextInputProps) {
  return <TextInput {...props} style={[styles.input, props.style]} />;
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginVertical: 6,
  },
});
