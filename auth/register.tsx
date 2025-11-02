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
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

// Image de fond (à placer dans vos assets)
const BACKGROUND_IMAGE = require("../../assets/background.jpg");

export default function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      confirmPassword: "",
    };
    let isValid = true;

    if (!fullName.trim()) {
      newErrors.fullName = "Le nom complet est requis";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "L'email est requis";
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Email invalide";
      isValid = false;
    }

    if (!age.trim()) {
      newErrors.age = "L'âge est requis";
      isValid = false;
    } else if (isNaN(Number(age)) || Number(age) < 18) {
      newErrors.age = "Vous devez avoir au moins 18 ans";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Le mot de passe est requis";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 8 caractères";
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simuler un appel API
      setTimeout(() => {
        Alert.alert("Succès", "Compte créé avec succès !");
        router.push("/(auth)/login");
      }, 2000);
    } catch (error) {
      Alert.alert("Erreur", "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      {/* Overlay sombre */}
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Contenu principal */}
          <View style={styles.content}>
            {/* Titre */}
            <Text style={styles.title}>adopte</Text>

            {/* Sous-titre */}
            <Text style={styles.subtitle}>INSCRIPTION</Text>

            {/* Formulaire */}
            <View style={styles.formContainer}>
              {/* Champ Nom Complet */}
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Nom complet</Text>
                <TextInput
                  style={[
                    styles.input,
                    errors.fullName ? styles.inputError : null,
                  ]}
                  placeholder="Votre nom complet"
                  placeholderTextColor="#999"
                  value={fullName}
                  onChangeText={setFullName}
                />
                {errors.fullName ? (
                  <Text style={styles.errorText}>{errors.fullName}</Text>
                ) : null}
              </View>

              {/* Champ Email */}
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Adresse email</Text>
                <TextInput
                  style={[
                    styles.input,
                    errors.email ? styles.inputError : null,
                  ]}
                  placeholder="votre@email.com"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
                {errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
              </View>

              {/* Champ Âge */}
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Âge</Text>
                <TextInput
                  style={[styles.input, errors.age ? styles.inputError : null]}
                  placeholder="Votre âge"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  value={age}
                  onChangeText={setAge}
                />
                {errors.age ? (
                  <Text style={styles.errorText}>{errors.age}</Text>
                ) : null}
              </View>

              {/* Champ Mot de passe */}
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Mot de passe</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      styles.passwordInput,
                      errors.password ? styles.inputError : null,
                    ]}
                    placeholder="Minimum 8 caractères"
                    placeholderTextColor="#999"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text style={styles.eyeIconText}>
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors.password ? (
                  <Text style={styles.errorText}>{errors.password}</Text>
                ) : null}
              </View>

              {/* Champ Confirmer mot de passe */}
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Confirmer le mot de passe</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      styles.passwordInput,
                      errors.confirmPassword ? styles.inputError : null,
                    ]}
                    placeholder="Confirmez votre mot de passe"
                    placeholderTextColor="#999"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Text style={styles.eyeIconText}>
                      {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword ? (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                ) : null}
              </View>

              {/* Bouton d'inscription */}
              <TouchableOpacity
                style={[
                  styles.registerButton,
                  loading && styles.registerButtonDisabled,
                ]}
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.registerButtonText}>CRÉER LE COMPTE</Text>
                )}
              </TouchableOpacity>

              {/* Lien vers connexion */}
              <TouchableOpacity
                onPress={() => router.push("/(auth)/login")}
                style={styles.loginLink}
              >
                <Text style={styles.loginLinkText}>
                  Vous avez déjà un compte ?{" "}
                  <Text style={styles.loginLinkBold}>Connexion</Text>
                </Text>
              </TouchableOpacity>
            </View>

            {/* Conditions d'utilisation */}
            <Text style={styles.disclaimer}>
              En créant un compte, vous acceptez nos Conditions d'utilisation et
              notre Politique de confidentialité
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundImage: {
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: "300",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
    letterSpacing: 3,
    marginBottom: 40,
  },
  formContainer: {
    marginBottom: 30,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: "#ccc",
    marginBottom: 8,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: "#fff",
    fontSize: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    fontFamily: "System",
  },
  inputError: {
    borderColor: "#ff6b6b",
    backgroundColor: "rgba(255, 107, 107, 0.1)",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 12,
    marginTop: 6,
    fontStyle: "italic",
  },
  passwordContainer: {
    position: "relative",
    justifyContent: "center",
  },
  passwordInput: {
    paddingRight: 45,
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    padding: 8,
  },
  eyeIconText: {
    fontSize: 18,
  },
  registerButton: {
    backgroundColor: "#c68c4d",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  },
  loginLink: {
    marginTop: 20,
    alignItems: "center",
  },
  loginLinkText: {
    color: "#ccc",
    fontSize: 14,
  },
  loginLinkBold: {
    color: "#c68c4d",
    fontWeight: "600",
  },
  disclaimer: {
    fontSize: 11,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
    lineHeight: 16,
  },
});
