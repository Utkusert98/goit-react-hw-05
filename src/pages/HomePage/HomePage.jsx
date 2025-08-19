import { useEffect, useState } from "react";
import { getTrendingToday } from "../../services/tmdb";
import MovieList from "../../components/MovieList/MovieList.jsx";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr("");
    getTrendingToday()
      .then((data) => {
        if (alive) setMovies(data);
      })
      .catch(() => setErr("Failed to load trending movies"))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Trending Today</h1>
      {loading && <div>Loading...</div>}
      {err && <div>{err}</div>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
