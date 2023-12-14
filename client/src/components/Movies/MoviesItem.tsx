import IMovies from "../../model/IMovies";
import { Card, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast, Flip } from 'react-toastify';
import { addFavouriteMovie, deleteFavouriteMovie } from "../../service/movies";
import { useLocation, Link } from "react-router-dom";
import "./MoviesItem.css"

type Props = {
    movie: IMovies,
    isFav: boolean,
    updateFav: (movie: number, action: string) => void;
}

const imageUrl = process.env.REACT_APP_IMG_BASE_URL;

const MoviesItem = ({ movie, isFav, updateFav }: Props) => {

    const { title, imdbRating, poster } = movie;
    const url = useLocation();

    const addFavourite = async () => {

        if (isFav) {
            toast.info("Already in Favourites");
        } else {
            try {
                await addFavouriteMovie(movie);
                updateFav(movie.id, 'add');
                toast.success("Added to Favourites");
            } catch (error: any) {
                toast.error(error.message, {
                    // Set to 15sec
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 10000,
                });
            }
        }
    }

    const deleteFavourite = async () => {
        try {
            await deleteFavouriteMovie(movie.id);
            updateFav(movie.id, 'remove')
            toast.success("Removed from Favourites");
        } catch (error: any) {
            toast.error(error.message, {
                // Set to 15sec
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 15000,
            });
        }
    }

    return (
        <>
            <Card className="bg-dark text-white">
                <Card.Img src={`${imageUrl}/${poster}`} alt="movie poster" className="size" />
                <Card.ImgOverlay className="spacing">
                    <div className="favourite">
                        <Nav.Link to={`${url.pathname}/${movie.id}`} as={Link} style={{ height: '100%', width: '100%' }}>
                            <FontAwesomeIcon className="fa-xl" icon={faCircleInfo} style={{ color: "whitesmoke", backgroundColor: '#333', borderRadius: '1rem' }} /></Nav.Link>
                        {
                            (url.pathname !== "/favourite")
                                ? <FontAwesomeIcon className="fa-xl" icon={faPlusCircle} style={{ color: "whitesmoke", backgroundColor: '#333', borderRadius: '1rem' }} onClick={addFavourite} />
                                : <FontAwesomeIcon className="fa-xl" icon={faMinusCircle} style={{ color: "whitesmoke", backgroundColor: '#333', borderRadius: '1rem' }} onClick={deleteFavourite} />
                        }
                    </div>
                    <div className="poster">
                        <Card.Title >
                            {title}
                        </Card.Title>
                        <Card.Title >
                            {imdbRating}
                        </Card.Title>
                    </div>
                </Card.ImgOverlay>
            </Card>
            <ToastContainer transition={Flip} autoClose={1000} />
        </>
    );
}

export default MoviesItem;