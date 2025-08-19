import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits, IMAGE_BASE } from "../../services/tmdb";
import styles from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr("");
    getMovieCredits(movieId)
      .then((data) => {
        if (alive) setCast(data);
      })
      .catch((e) => setErr("Failed to load cast"))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [movieId]);

  if (loading) return <div>Loading cast...</div>;
  if (err) return <div>{err}</div>;
  if (!cast.length) return <div>No cast info.</div>;

  return (
    <div className={styles.list}>
      {cast.map((c) => (
        <div
          key={c.cast_id || `${c.id}-${c.credit_id}`}
          className={styles.item}
        >
          <img
            className={styles.img}
            src={c.profile_path ? `${IMAGE_BASE}${c.profile_path}` : ""}
            alt={c.name}
            loading="lazy"
          />
          <div className={styles.name}>{c.name}</div>
          <div className={styles.char}>{c.character}</div>
        </div>
      ))}
    </div>
  );
}
