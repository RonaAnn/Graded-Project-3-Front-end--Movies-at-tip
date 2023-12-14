import MovieCarousel from "./MovieCarousel";
import IMovies from "../../model/IMovies";
import Navigationbar from "../Navbar/Navigationbar";
import { useEffect, useState } from "react";
import { getLatestMovies } from "../../service/movies";
import { Alert, Spinner } from "react-bootstrap";

import "./Home.css";

const Home = () => {

    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState<IMovies[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(
        () => {
            const helper = async () => {
                try {
                    const data = await getLatestMovies();
                    setMovies(data);

                } catch (error) {

                    setError(error as Error);
                }

                setLoading(false);
            }

            helper();

        }, []
    );

    return (
        <>
            <Navigationbar />
            {
                loading && (
                    <div className='d-flex justify-content-center my-3'>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                )
            }
            {
                (!loading && error) && (
                    <Alert variant="danger">
                        {error.message}
                    </Alert>
                )
            }
            {
                (!loading && !error) && (
                    <>
                        <MovieCarousel movies={movies} />
                    </>
                )
            }
        </>
    );
}

export default Home;