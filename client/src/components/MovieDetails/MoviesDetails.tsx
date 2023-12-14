import Card from 'react-bootstrap/Card';
import IMovies from "../../model/IMovies";
import MovieDetails from './MovieDetails';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieById } from '../../service/movies';
import { Alert, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import "./MoviesDetails.css";


const MoviesDetails = () => {

    const [movie, setMovie] = useState<IMovies | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    const url = useLocation();
    const navigate = useNavigate();
    const parentUrl = url.pathname.substring(0, url.pathname.lastIndexOf("/"));

    useEffect(
        () => {

            const helper = async () => {
                try {
                    const result = await getMovieById(url.pathname);
                    setMovie(result);
                } catch (error) {
                    setError(error as Error);
                }

                setLoading(false);
            }

            helper();
        }, []
    )

    return (
        <>
            {
                (!loading && error) && (
                    <Alert variant="danger">
                        {error.message}
                    </Alert>
                )
            }
            {
                !loading && !error && movie && (
                    <Card>
                        <Card.ImgOverlay>
                            <MovieDetails movie={movie as IMovies} />
                            <Button variant="light" className='my-3' onClick={() => navigate(parentUrl)}>
                                <FontAwesomeIcon icon={faLeftLong} style={{ color: "black", }} />
                            </Button>
                        </Card.ImgOverlay>
                    </Card>
                )
            }

        </>
    );
}
export default MoviesDetails;