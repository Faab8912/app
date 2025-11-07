import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    if (!name || !email || !age || !password || !confirmPassword) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return;
    }

    Alert.alert("Succès", "Compte créé avec succès !", [
      { text: "OK", onPress: () => router.push("/dashboard") },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Gradient overlay background */}
      <View style={styles.gradientBackground} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Logo */}
          <Text style={styles.logo}>Mr&Mme</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>INSCRIPTION</Text>

          {/* Decorative line */}
          <View style={styles.decorativeLine} />

          {/* Form Container - Compact and centered */}
          <View style={styles.formWrapper}>
            <View style={styles.form}>
              {/* Full Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nom complet</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Votre nom complet"
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {/* Email */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="votre@email.com"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Age */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Âge</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Votre âge"
                  placeholderTextColor="#999"
                  value={age}
                  onChangeText={setAge}
                  keyboardType="numeric"
                />
              </View>

              {/* Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mot de passe</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder="Minimum 8 caractères"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text style={styles.eyeText}>
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirmer le mot de passe</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder="Confirmez votre mot de passe"
                    placeholderTextColor="#999"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Text style={styles.eyeText}>
                      {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Register Button */}
              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegister}
              >
                <Text style={styles.registerButtonText}>CRÉER LE COMPTE</Text>
              </TouchableOpacity>

              {/* Back to home */}
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.backText}>← Retour</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer text */}
          <Text style={styles.footerText}>
            En créant un compte, vous acceptez nos conditions d'utilisation
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
  gradientBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#1a1a1a",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  content: {
    width: "100%",
    maxWidth: 600,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  logo: {
    fontSize: 48,
    fontWeight: "300",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 12,
    color: "#d4a574",
    textAlign: "center",
    letterSpacing: 3,
    marginBottom: 20,
    fontWeight: "600",
  },
  decorativeLine: {
    height: 1,
    backgroundColor: "rgba(212, 165, 116, 0.3)",
    width: "40%",
    marginBottom: 30,
  },
  formWrapper: {
    width: "100%",
    maxWidth: 450,
    alignSelf: "center",
  },
  form: {
    gap: 18,
  },
  inputGroup: {
    marginBottom: 8,
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
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderColor: "rgba(212, 165, 116, 0.3)",
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#fff",
    fontSize: 15,
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
  eyeText: {
    fontSize: 18,
  },
  registerButton: {
    backgroundColor: "#d4a574",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#d4a574",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  backText: {
    color: "#d4a574",
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    fontWeight: "500",
  },
  footerText: {
    fontSize: 11,
    color: "#777",
    textAlign: "center",
    marginTop: 25,
    lineHeight: 16,
  },
});
