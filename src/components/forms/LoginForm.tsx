import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { saveCredentials } from "../../store/slices/authSlice";
import { validateEmail, validatePassword } from "../../utils/validation";
import Button from "../ui/Button";
import InputField from "../ui/InputField";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const validEmail = validateEmail(email);
  const validPassword = validatePassword(password);
  const canSubmit = validEmail && validPassword;

  function onSubmit() {
    if (!canSubmit) return;
    dispatch(saveCredentials({ email, password }));
  }

  return (
    <View>
      <Text style={styles.label}>Email</Text>
      <InputField
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {!validEmail && email.length > 0 && (
        <Text style={styles.error}>Invalid email</Text>
      )}

      <Text style={styles.label}>Password</Text>
      <InputField value={password} onChangeText={setPassword} secureTextEntry />
      {!validPassword && password.length > 0 && (
        <Text style={styles.error}>
          Password must be 8-15 chars, 1 uppercase, 1 special char
        </Text>
      )}

      <Button title="Submit" onPress={onSubmit} disabled={!canSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontWeight: "600", marginTop: 12 },
  error: { color: "red", marginBottom: 6 },
});
