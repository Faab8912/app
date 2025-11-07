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

  const handleRegister = () => {
    if (name && email && age && password) {
      Alert.alert("Succès", "Compte créé avec succès !", [
        { text: "OK", onPress: () => router.push("/dashboard") },
      ]);
    } else {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentWrapper}>
          <View style={styles.content}>
            <Text style={styles.title}>Inscription</Text>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Nom complet"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />

              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TextInput
                style={styles.input}
                placeholder="Âge"
                placeholderTextColor="#999"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegister}
              >
                <Text style={styles.registerButtonText}>CRÉER LE COMPTE</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.backText}>← Retour à l'accueil</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F2ED",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  content: {
    width: "100%",
    maxWidth: 450,
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
    color: "#000",
  },
  registerButton: {
    backgroundColor: "#5D2E0A",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
