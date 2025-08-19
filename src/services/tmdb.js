import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmI1MGI2OWQzYTY4ZDg5YzJiYmIyYmM3YjlmZWQ3MiIsIm5iZiI6MTc1NTMzOTE4MS41ODgsInN1YiI6IjY4YTA1OWFkODdjMTg1OWMzZDAyY2MyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7CWixT-ZbDUvGWyR49i0zL5bG9jNBg1BDxhOr8P3jSM`,
  },
});

export const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export function getTrendingToday() {
  return api.get("/trending/movie/day").then((r) => r.data.results || []);
}

export function searchMovies(query, page = 1) {
  return api
    .get("/search/movie", {
      params: { query, include_adult: false, language: "en-US", page },
    })
    .then((r) => r.data.results || []);
}

export function getMovieDetails(movieId) {
  return api
    .get(`/movie/${movieId}`, { params: { language: "en-US" } })
    .then((r) => r.data);
}

export function getMovieCredits(movieId) {
  return api.get(`/movie/${movieId}/credits`).then((r) => r.data.cast || []);
}

export function getMovieReviews(movieId) {
  return api
    .get(`/movie/${movieId}/reviews`, { params: { language: "en-US" } })
    .then((r) => r.data.results || []);
}
