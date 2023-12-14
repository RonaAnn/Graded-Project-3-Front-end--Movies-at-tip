import IMovies from "../../model/IMovies";
import MoviesItem from "./MoviesItem";
import Navigationbar from "../Navbar/Navigationbar";
import { useEffect, useState } from "react";
import { getFavouriteMovies, getMovies } from "../../service/movies";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";


const MoviesList = () => {

    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState<IMovies[]>([]);
    const [fav, setFav] = useState<number[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [noData, setNoData] = useState(false);

    const url = useLocation();

    useEffect(
        () => {
            const helper = async () => {
                try {

                    const data = await getMovies(url.pathname);
                    setMovies(data);

                    if (url.pathname !== "/favourite") {
                        const data = await getFavouriteMovies();
                        setFav(data);
                    }

                } catch (error) {

                    setError(error as Error);
                }

                setLoading(false);
                setNoData(false);
            }

            helper();

        }, [url]
    );

    const serachMovies = (searchMovies: IMovies[]) => {

        if (searchMovies.length !== 0) {
            setNoData(false);
            setMovies(searchMovies);
        } else {
            noSearchData();
        }
    }

    const noSearchData = () => {

        setMovies([]);
        setNoData(true);
    }

    const updateFav = (id: number, action: string) => {
        const favIds = [...fav];

        if (action === 'add') {
            favIds.push(id);
            setFav(favIds);
        }

        if (action === 'remove') {

            favIds.splice(0, favIds.length, id);
            const movieData = movies.filter((movie) => {

                return movie.id !== id;
            });

            setFav(favIds);
            setMovies(movieData);
        }
    }

    return (
        <>
            <Navigationbar searchMovies={serachMovies} />
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
                (!loading && !error && !noData) && (
                    <>
                        <h3 className="my-2">Movies</h3>
                        <Row sm={1} md={2} lg={6} className="mx-2 my-3">
                            {
                                movies.map(
                                    movie => (
                                        <Col key={movie.id} className='d-flex align-item-stretch mb-3'>
                                            <MoviesItem movie={movie} isFav={fav.includes(movie.id)} updateFav={updateFav} />

                                        </Col>
                                    )
                                )
                            }
                        </Row>
                    </>
                )
            }
            {
                (noData) && (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "16rem"
                    }}> <h3>Movie not found...</h3> </div>
                )
            }
        </>
    );
}

export default MoviesList;