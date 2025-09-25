import axios from "axios";
import { Movie } from "../types/movie";
import { TMDB_API_KEY, TMDB_BASE } from "../utils/constants";

export const fetchMoviesAPI = async (
  lang: "en" | "ar",
  query: string,
): Promise<Movie[]> => {
  const endpoint = query
    ? `${TMDB_BASE}/search/movie`
    : `${TMDB_BASE}/movie/popular`;
  const res = await axios.get(endpoint, {
    params: {
      api_key: TMDB_API_KEY,
      language: lang === "ar" ? "ar" : "en-US",
      query: query || undefined,
      page: 1,
    },
  });
  return res.data.results || [];
};
