import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import MovieCard from "../components/ui/MovieCard";
import { fetchMoviesAPI } from "../services/movieApi";
import { clearCredentials } from "../store/slices/authSlice";
import { Movie } from "../types/movie";
import { TMDB_IMAGE_BASE } from "../utils/constants";

const MoviesScreen = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState<"en" | "ar">("en");
  const dispatch = useDispatch();

  useEffect(() => {
    loadMovies();
  }, [lang]);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const results = await fetchMoviesAPI(lang, query);
      setMovies(results);
    } catch (e) {
      console.warn("Failed to fetch movies", e);
    } finally {
      setLoading(false);
    }
  };

  const toggleLanguage = () => setLang(lang === "en" ? "ar" : "en");

  const handleLogout = () => dispatch(clearCredentials());

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <MovieCard
      title={item.title}
      posterUrl={
        item.poster_path ? `${TMDB_IMAGE_BASE}${item.poster_path}` : undefined
      }
    />
  );

  const renderEmptyList = () => (
    <Text style={{ padding: 20 }}>No movies found.</Text>
  );

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Movies</Text>
        <View style={{ flexDirection: "row" }}>
          <Button
            title={lang === "en" ? "AR" : "EN"}
            onPress={toggleLanguage}
          />
          <View style={{ width: 8 }} />
          <Button title="Logout" onPress={handleLogout} />
        </View>
      </View>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search movies..."
        style={styles.search}
        onSubmitEditing={loadMovies}
      />

      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} size="large" />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          renderItem={renderMovieItem}
          contentContainerStyle={{ padding: 8 }}
          ListEmptyComponent={renderEmptyList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  header: { fontSize: 20, fontWeight: "700", padding: 12 },
  search: {
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
  },
});

export default MoviesScreen;
