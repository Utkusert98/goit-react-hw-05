import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
  Route,
  Routes,
} from "react-router-dom";
import { getMovieDetails, IMAGE_BASE } from "../../services/tmdb";
import styles from "./MovieDetailsPage.module.css";
import appStyles from "../../App.module.css";
import MovieCast from "../../components/MovieCast/MovieCast.jsx";
import MovieReviews from "../../components/MovieReviews/MovieReviews.jsx";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backRef = useRef(location.state?.from ?? "/movies");

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr("");
    getMovieDetails(movieId)
      .then((data) => {
        if (alive) setMovie(data);
      })
      .catch(() => setErr("Failed to load movie"))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [movieId]);

  return (
    <div>
      <Link to={backRef.current} className={appStyles.back}>
        Go back
      </Link>

      {loading && <div>Loading...</div>}
      {err && <div>{err}</div>}
      {movie && (
        <>
          <div className={styles.head}>
            <img
              className={styles.poster}
              src={movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : ""}
              alt={movie.title}
              loading="lazy"
            />
            <div className={styles.info}>
              <h2>{movie.title}</h2>
              <div>{movie.release_date}</div>
              <div className={styles.sectionTitle}>Overview</div>
              <div>{movie.overview}</div>
              <div className={styles.sectionTitle}>Genres</div>
              <div>{movie.genres?.map((g) => g.name).join(", ")}</div>
            </div>
          </div>

          <div className={appStyles.subnav}>
            <NavLink to="cast">Cast</NavLink>
            <NavLink to="reviews">Reviews</NavLink>
          </div>

          <div className={appStyles.outlet}>
            <Suspense fallback={<div>Loading section...</div>}>
              <Routes>
                <Route path="cast" element={<MovieCast />} />
                <Route path="reviews" element={<MovieReviews />} />
              </Routes>
              <Outlet />
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
}
