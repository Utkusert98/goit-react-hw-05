import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../services/tmdb";
import styles from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr("");
    getMovieReviews(movieId)
      .then((data) => {
        if (alive) setReviews(data);
      })
      .catch((e) => setErr("Failed to load reviews"))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [movieId]);

  if (loading) return <div>Loading reviews...</div>;
  if (err) return <div>{err}</div>;
  if (!reviews.length) return <div>No reviews.</div>;

  return (
    <div className={styles.list}>
      {reviews.map((r) => (
        <div key={r.id} className={styles.item}>
          <div className={styles.author}>{r.author}</div>
          <div className={styles.content}>{r.content}</div>
        </div>
      ))}
    </div>
  );
}
