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

  // Validation email
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
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // TODO: Remplacer par un vrai appel API
      // const response = await fetch('YOUR_API_ENDPOINT/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });

      // Simulation d'une requête serveur (2 secondes)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Vérification factice (à remplacer par vraie validation serveur)
      if (email === "test@example.com" && password === "password123") {
        Alert.alert("Succès", "Connexion réussie !", [
          { text: "OK", onPress: () => router.push("/dashboard") },
        ]);
      } else {
        Alert.alert("Erreur", "Email ou mot de passe incorrect");
      }
    } catch (error) {
      Alert.alert(
        "Erreur",
        "Une erreur réseau s'est produite. Veuillez réessayer."
      );
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Connexion</Text>

        <View style={styles.form}>
          {/* Email Input */}
          <View>
            <TextInput
              style={[styles.input, errors.email ? styles.inputError : null]}
              placeholder="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors({ ...errors, email: "" });
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
              placeholderTextColor="#999"
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>

          {/* Password Input */}
          <View>
            <TextInput
              style={[styles.input, errors.password ? styles.inputError : null]}
              placeholder="Mot de passe"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrors({ ...errors, password: "" });
              }}
              secureTextEntry
              editable={!loading}
              placeholderTextColor="#999"
            />
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#F5F2ED" size="large" />
            ) : (
              <Text style={styles.loginButtonText}>SE CONNECTER</Text>
            )}
          </TouchableOpacity>

          {/* Back Button */}
          <TouchableOpacity onPress={() => router.back()} disabled={loading}>
            <Text style={styles.backText}>← Retour</Text>
          </TouchableOpacity>

          {/* Demo Info */}
          <View style={styles.demoInfo}>
            <Text style={styles.demoTitle}>Mode démo :</Text>
            <Text style={styles.demoText}>Email: test@example.com</Text>
            <Text style={styles.demoText}>Mot de passe: password123</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F2ED",
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#5D2E0A",
    textAlign: "center",
    marginBottom: 40,
  },
  form: {
    gap: 20,
  },
  input: {
    backgroundColor: "#FFF",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D4C4B0",
    fontSize: 16,
    color: "#333",
  },
  inputError: {
    borderColor: "#DC3545",
    borderWidth: 2,
  },
  errorText: {
    color: "#DC3545",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 8,
  },
  loginButton: {
    backgroundColor: "#5D2E0A",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    minHeight: 56,
    justifyContent: "center",
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: "#F5F2ED",
    fontSize: 18,
    fontWeight: "bold",
  },
  backText: {
    color: "#8B4513",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  demoInfo: {
    backgroundColor: "#FFF3CD",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#FFC107",
    marginTop: 20,
  },
  demoTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#856404",
    marginBottom: 4,
  },
  demoText: {
    fontSize: 12,
    color: "#856404",
    marginVertical: 2,
  },
});
