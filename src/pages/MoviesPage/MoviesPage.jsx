import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/tmdb";
import MovieList from "../../components/MovieList/MovieList.jsx";
import styles from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get("query") || "";
  const [query, setQuery] = useState(q);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!q) {
      setMovies([]);
      return;
    }
    let alive = true;
    setLoading(true);
    setErr("");
    searchMovies(q)
      .then((data) => {
        if (alive) setMovies(data);
      })
      .catch(() => setErr("Search failed"))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [q]);

  function onSubmit(e) {
    e.preventDefault();
    const next = query.trim();
    if (next) setParams({ query: next });
    else setParams({});
  }

  return (
    <div>
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <button className={styles.btn} type="submit">
          Search
        </button>
      </form>

      {loading && <div>Loading...</div>}
      {err && <div>{err}</div>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
