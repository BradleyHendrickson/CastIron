import { supabase } from "@/utils/supabase";
import React, { useState } from "react";
import { AppState, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

AppState.addEventListener("change", (nextAppState) => {
  if (nextAppState === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
  }
  
  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    if (!session) Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Sign In / Sign Up</Text>
        <TextInput
            style={styles.input}
            placeholder="email@address.com"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            textContentType="emailAddress"
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textContentType="password"
        />
        <TouchableOpacity
            style={styles.button}
            disabled={loading}
            onPress={signInWithEmail}
        >
            <Text style={styles.buttonText}>{loading ? "Loading..." : "Sign in"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.buttonsecondary}
            disabled={loading}
            onPress={signUpWithEmail}
        >
            <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
    </SafeAreaView>
)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
    alignSelf: "center",
    color: "#888", // Changed to grey
  },
  input: {
    height: 48,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "rgba(255,255,255,0.5)",
    color: "#000",
  },
  button: {
    backgroundColor: "rgba(0,122,255,0.9)",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonsecondary: {
    backgroundColor: "rgba(100,100,100,0.9)",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Auth;
