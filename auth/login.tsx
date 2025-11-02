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
} from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Validation email avec regex
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validation du formulaire
  const validateForm = (): boolean => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Email requis";
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Email invalide";
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

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulation d'une requête API
      setTimeout(() => {
        Alert.alert("Succès", `Bienvenue ${email}!`, [
          { text: "OK", onPress: () => router.push("/dashboard") },
        ]);
        setLoading(false);
      }, 1500);
    } catch (error) {
      Alert.alert("Erreur", "Erreur lors de la connexion");
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Connexion</Text>

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={!loading}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>SE CONNECTER</Text>
          )}
        </TouchableOpacity>

        {/* Back Button */}
        <TouchableOpacity onPress={() => router.push("/")}>
          <Text style={styles.backLink}>← Retour</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5a3a2a",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 12,
    marginBottom: 8,
    marginTop: -6,
  },
  button: {
    backgroundColor: "#5a3a2a",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  backLink: {
    color: "#5a3a2a",
    textAlign: "center",
    marginTop: 16,
    fontSize: 14,
  },
});
