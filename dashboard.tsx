import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function DashboardScreen() {
  const router = useRouter();

  const handleMenuPress = (menuItem: string) => {
    Alert.alert(
      `${menuItem}`,
      "Cette fonctionnalité sera disponible prochainement.",
      [{ text: "OK" }]
    );
  };

  const handleLogout = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Déconnecter",
        style: "destructive",
        onPress: () => router.push("/"),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Bienvenue sur Mr&Mme</Text>
          <Text style={styles.subtitle}>Votre tableau de bord</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>📤</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.menuGrid}>
          {/* Découvrir */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress("Découvrir")}
            activeOpacity={0.7}
          >
            <Text style={styles.menuIcon}>🔍</Text>
            <Text style={styles.menuText}>Découvrir</Text>
          </TouchableOpacity>

          {/* Matches */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress("Matches")}
            activeOpacity={0.7}
          >
            <Text style={styles.menuIcon}>💕</Text>
            <Text style={styles.menuText}>Matches</Text>
          </TouchableOpacity>

          {/* Messages */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress("Messages")}
            activeOpacity={0.7}
          >
            <Text style={styles.menuIcon}>💬</Text>
            <Text style={styles.menuText}>Messages</Text>
          </TouchableOpacity>

          {/* Profil */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress("Profil")}
            activeOpacity={0.7}
          >
            <Text style={styles.menuIcon}>👤</Text>
            <Text style={styles.menuText}>Profil</Text>
          </TouchableOpacity>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>💡 Info</Text>
          <Text style={styles.infoText}>
            Les fonctionnalités Découvrir, Matches, Messages et Profil seront
            disponibles dans les prochaines mises à jour.
          </Text>
        </View>
      </View>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/")}
      >
        <Text style={styles.backText}>← Retour à l'accueil</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F2ED",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5D5C0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5D2E0A",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#8B4513",
  },
  logoutButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 40,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 30,
  },
  menuItem: {
    backgroundColor: "#FFF",
    width: "45%",
    aspectRatio: 1,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5D2E0A",
  },
  infoBox: {
    backgroundColor: "#E8F4F8",
    borderLeftWidth: 4,
    borderLeftColor: "#17A2B8",
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0C5460",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: "#0C5460",
    lineHeight: 20,
  },
  backButton: {
    marginVertical: 20,
    alignItems: "center",
  },
  backText: {
    color: "#8B4513",
    fontSize: 16,
  },
});
