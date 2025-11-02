import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";

const BACKGROUND_IMAGE = require("../../assets/background.jpg");

export default function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    age: "",
    password: "",
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors = {
      fullName: "",
      email: "",
      age: "",
      password: "",
    };
    let isValid = true;

    if (!fullName.trim()) {
      newErrors.fullName = "Nom complet requis";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email requis";
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Email invalide";
      isValid = false;
    }

    if (!age.trim()) {
      newErrors.age = "Âge requis";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Mot de passe requis";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Min 6 caractères";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      setTimeout(() => {
        Alert.alert("Succès", `Bienvenue ${fullName}!`, [
          { text: "OK", onPress: () => router.push("/dashboard") },
        ]);
        setLoading(false);
      }, 1500);
    } catch (error) {
      Alert.alert("Erreur", "Erreur lors de l'inscription");
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={styles.background}
      blurRadius={5}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.overlay} />

        <View style={styles.contentContainer}>
          <Text style={styles.title}>INSCRIPTION</Text>

          {/* Full Name */}
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="nom complet"
              placeholderTextColor="rgba(255,255,255,0.6)"
              value={fullName}
              onChangeText={setFullName}
              editable={!loading}
            />
            {errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )}
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="adresse email"
              placeholderTextColor="rgba(255,255,255,0.6)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              editable={!loading}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          {/* Age */}
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="âge"
              placeholderTextColor="rgba(255,255,255,0.6)"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              editable={!loading}
            />
            {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="mot de passe"
              placeholderTextColor="rgba(255,255,255,0.6)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          {/* Register Button */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>créer le compte</Text>
            )}
          </TouchableOpacity>

          {/* Back Button */}
          <TouchableOpacity onPress={() => router.push("/auth/login")}>
            <Text style={styles.backText}>← retour à la connexion</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contentContainer: {
    width: "85%",
    maxWidth: 350,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "300",
    color: "#fff",
    marginBottom: 40,
    textAlign: "center",
    letterSpacing: 2,
  },
  inputGroup: {
    marginBottom: 24,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.6)",
    paddingVertical: 12,
    paddingHorizontal: 0,
    fontSize: 14,
    color: "#fff",
    fontStyle: "italic",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 11,
    marginTop: 4,
    fontStyle: "italic",
  },
  button: {
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.7)",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 16,
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "300",
    letterSpacing: 1,
    textTransform: "lowercase",
  },
  backText: {
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    fontSize: 12,
    fontStyle: "italic",
  },
});
