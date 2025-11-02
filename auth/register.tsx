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
  ScrollView,
  LinearGradient,
} from "react-native";
import { useRouter } from "expo-router";

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
    <LinearGradient
      colors={["#0f0f0f", "#1a1a1a", "#2d2416"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Accent décoratif en haut */}
      <View style={styles.topAccent} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Contenu principal */}
          <View style={styles.content}>
            {/* Titre principal */}
            <Text style={styles.title}>adopte</Text>

            {/* Sous-titre */}
            <Text style={styles.subtitle}>INSCRIPTION</Text>

            {/* Ligne décorative */}
            <View style={styles.decorativeLine} />

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
                  placeholderTextColor="#666"
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
                  placeholderTextColor="#666"
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
                  placeholderTextColor="#666"
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
                    placeholderTextColor="#666"
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
                    placeholderTextColor="#666"
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
              <LinearGradient
                colors={["#d4a574", "#c68c4d"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.registerButtonGradient}
              >
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
                    <Text style={styles.registerButtonText}>
                      CRÉER LE COMPTE
                    </Text>
                  )}
                </TouchableOpacity>
              </LinearGradient>

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

      {/* Accent décoratif en bas */}
      <View style={styles.bottomAccent} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#d4a574",
  },
  bottomAccent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#d4a574",
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
    marginBottom: 5,
    letterSpacing: 3,
  },
  subtitle: {
    fontSize: 12,
    color: "#d4a574",
    textAlign: "center",
    letterSpacing: 4,
    marginBottom: 20,
    fontWeight: "600",
  },
  decorativeLine: {
    height: 1,
    backgroundColor: "rgba(212, 165, 116, 0.3)",
    marginHorizontal: 40,
    marginBottom: 30,
  },
  formContainer: {
    marginBottom: 30,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    color: "#bbb",
    marginBottom: 8,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(212, 165, 116, 0.3)",
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 13,
    color: "#fff",
    fontSize: 15,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    fontFamily: "System",
  },
  inputError: {
    borderColor: "#ff6b6b",
    backgroundColor: "rgba(255, 107, 107, 0.08)",
  },
  errorText: {
    color: "#ff8a8a",
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
  registerButtonGradient: {
    borderRadius: 6,
    marginTop: 15,
    shadowColor: "#d4a574",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  registerButton: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 6,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  loginLink: {
    marginTop: 20,
    alignItems: "center",
  },
  loginLinkText: {
    color: "#aaa",
    fontSize: 13,
  },
  loginLinkBold: {
    color: "#d4a574",
    fontWeight: "700",
  },
  disclaimer: {
    fontSize: 10,
    color: "#777",
    textAlign: "center",
    marginTop: 25,
    lineHeight: 15,
  },
});
