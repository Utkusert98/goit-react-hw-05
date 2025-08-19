import { Link, useLocation } from "react-router-dom";
import { IMAGE_BASE } from "../../services/tmdb";
import styles from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();
  if (!movies?.length) return null;

  return (
    <div className={styles.grid}>
      {movies.map((m) => (
        <Link
          key={m.id}
          to={`/movies/${m.id}`}
          state={{ from: location }}
          className={styles.card}
        >
          <img
            className={styles.img}
            src={m.poster_path ? `${IMAGE_BASE}${m.poster_path}` : ""}
            alt={m.title || m.name || "movie"}
            loading="lazy"
          />
          <div className={styles.title}>{m.title || m.name}</div>
        </Link>
      ))}
    </div>
  );
}
