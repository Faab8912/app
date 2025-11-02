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

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });

  // Validation email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validation du mot de passe fort
  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  // Validation du formulaire
  const validateForm = (): boolean => {
    const newErrors = {
      name: "",
      email: "",
      age: "",
      password: "",
      confirmPassword: "",
    };
    let isValid = true;

    // Validation nom
    if (!name.trim()) {
      newErrors.name = "Nom requis";
      isValid = false;
    } else if (name.trim().length < 3) {
      newErrors.name = "Min 3 caractères";
      isValid = false;
    }

    // Validation email
    if (!email.trim()) {
      newErrors.email = "Email requis";
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Email invalide";
      isValid = false;
    }

    // Validation âge
    if (!age.trim()) {
      newErrors.age = "Âge requis";
      isValid = false;
    } else if (parseInt(age) < 18) {
      newErrors.age = "Min 18 ans";
      isValid = false;
    } else if (parseInt(age) > 120) {
      newErrors.age = "Âge invalide";
      isValid = false;
    }

    // Validation mot de passe
    if (!password.trim()) {
      newErrors.password = "Mot de passe requis";
      isValid = false;
    } else if (!validatePassword(password)) {
      newErrors.password = "Min 8 caractères";
      isValid = false;
    }

    // Validation confirmation mot de passe
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirmation requise";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Mots de passe différents";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // TODO: Remplacer par un vrai appel API
      // const response = await fetch('YOUR_API_ENDPOINT/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, age, password }),
      // });

      // Simulation d'une requête serveur (2 secondes)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      Alert.alert("Succès", "Compte créé avec succès !", [
        { text: "OK", onPress: () => router.push("/dashboard") },
      ]);
    } catch (error) {
      Alert.alert("Erreur", "Une erreur s'est produite lors de l'inscription.");
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Inscription</Text>

        <View style={styles.form}>
          {/* Nom Input */}
          <View>
            <TextInput
              style={[styles.input, errors.name ? styles.inputError : null]}
              placeholder="Nom complet"
              value={name}
              onChangeText={(text) => {
                setName(text);
                setErrors({ ...errors, name: "" });
              }}
              editable={!loading}
              placeholderTextColor="#999"
            />
            {errors.name ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}
          </View>

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

          {/* Âge Input */}
          <View>
            <TextInput
              style={[styles.input, errors.age ? styles.inputError : null]}
              placeholder="Âge"
              value={age}
              onChangeText={(text) => {
                setAge(text);
                setErrors({ ...errors, age: "" });
              }}
              keyboardType="numeric"
              editable={!loading}
              placeholderTextColor="#999"
            />
            {errors.age ? (
              <Text style={styles.errorText}>{errors.age}</Text>
            ) : null}
          </View>

          {/* Mot de passe Input */}
          <View>
            <TextInput
              style={[styles.input, errors.password ? styles.inputError : null]}
              placeholder="Mot de passe (min 8 caractères)"
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

          {/* Confirmation Mot de passe Input */}
          <View>
            <TextInput
              style={[
                styles.input,
                errors.confirmPassword ? styles.inputError : null,
              ]}
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setErrors({ ...errors, confirmPassword: "" });
              }}
              secureTextEntry
              editable={!loading}
              placeholderTextColor="#999"
            />
            {errors.confirmPassword ? (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            ) : null}
          </View>

          {/* Register Button */}
          <TouchableOpacity
            style={[
              styles.registerButton,
              loading && styles.registerButtonDisabled,
            ]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#F5F2ED" size="large" />
            ) : (
              <Text style={styles.registerButtonText}>CRÉER LE COMPTE</Text>
            )}
          </TouchableOpacity>

          {/* Back Button */}
          <TouchableOpacity onPress={() => router.back()} disabled={loading}>
            <Text style={styles.backText}>← Retour à l'accueil</Text>
          </TouchableOpacity>
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
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#5D2E0A",
    textAlign: "center",
    marginBottom: 40,
  },
  form: {
    gap: 16,
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
  registerButton: {
    backgroundColor: "#5D2E0A",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    minHeight: 56,
    justifyContent: "center",
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    color: "#F5F2ED",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  backText: {
    color: "#8B4513",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
