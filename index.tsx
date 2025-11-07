import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F2ED" />

      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Text style={styles.logo}>Mr&amp;Mme</Text>
          <Text style={styles.slogan}>Là où Monsieur Rencontre Madame</Text>
        </View>

        {/* Heart Icon */}
        <View style={styles.heartContainer}>
          <Text style={styles.heartIcon}>💝</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <a href="/auth/register" style={styles.registerButton}>
            <Text style={styles.registerButtonText}>S'INSCRIRE</Text>
          </a>

          <a href="/auth/login" style={styles.loginButton}>
            <Text style={styles.loginButtonText}>CONNEXION</Text>
          </a>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Une rencontre authentique vous attend</Text>
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
    alignItems: "center",
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 60,
  },
  logo: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#5D2E0A",
    marginBottom: 8,
    textAlign: "center",
  },
  slogan: {
    fontSize: 16,
    color: "#8B4513",
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 24,
  },
  heartContainer: {
    marginBottom: 80,
  },
  heartIcon: {
    fontSize: 64,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
    marginBottom: 40,
    alignItems: "center",
  },
  registerButton: {
    backgroundColor: "#5D2E0A",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    minHeight: 56,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    maxWidth: 300,
    textDecoration: "none",
    display: "flex",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  registerButtonText: {
    color: "#F5F2ED",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  loginButton: {
    backgroundColor: "transparent",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#5D2E0A",
    minHeight: 56,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    maxWidth: 300,
    textDecoration: "none",
    display: "flex",
  },
  loginButtonText: {
    color: "#5D2E0A",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  footer: {
    fontSize: 14,
    color: "#8B4513",
    textAlign: "center",
    fontStyle: "italic",
  },
});
