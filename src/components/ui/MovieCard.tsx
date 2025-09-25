import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function MovieCard({
  title,
  posterUrl,
}: {
  title: string;
  posterUrl?: string;
}) {
  return (
    <View style={styles.card}>
      {posterUrl ? (
        <Image source={{ uri: posterUrl }} style={styles.image} />
      ) : (
        <View style={[styles.image, { backgroundColor: "#eee" }]} />
      )}
      <Text numberOfLines={2} style={styles.title}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 2,
  },
  image: { width: "100%", height: 180 },
  title: { padding: 8, fontSize: 14, fontWeight: "600" },
});
