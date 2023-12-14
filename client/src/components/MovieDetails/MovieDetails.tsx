import { Card, Col, Collapse, Row } from "react-bootstrap";
import { avgRating } from "../../service/helper";
import { useState } from "react";
import Rating from "../Shared/Rating";
import IMovies from "../../model/IMovies";
import Genres from "../Shared/Genres";
import Stars from "../Shared/Stars";

const imageUrl = process.env.REACT_APP_IMG_BASE_URL;

const MovieDetails = ({ movie }: { movie: IMovies }) => {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <Card className="card">
            <Row className="my-2">
                <Col md={{ span: 3, offset: 1 }} className="movies-details" style={{ "backgroundImage": `url('${imageUrl}/${movie.poster}')`, backgroundColor: 'black' }}></Col>
                <Col md={{ span: 7 }}>
                    <Card.Body>
                        <Card.Title><h1>{movie.title}</h1></Card.Title>
                        <Card.Text><strong>Year: </strong>{movie?.year} - <strong>Duration: </strong>{movie?.duration?.toLocaleLowerCase().split('pt')[1]}</Card.Text>
                        <Card.Text
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            className="pointer"
                        >
                            <Rating rating={avgRating(movie.ratings)} numRatings={movie.ratings?.length} />
                        </Card.Text>
                        <Collapse in={open}  >
                            <div id="other-ratings-collapse" className='other-ratings-collapse'>
                                <p><strong>Content Rating :</strong> {movie.contentRating}</p>
                                <p><strong>IMDB Rating :</strong> {movie.imdbRating}</p>
                            </div>
                        </Collapse>
                        <Card.Text>{movie.storyline}</Card.Text>
                        <Genres genres={movie.genres} />
                        <Stars stars={movie.actors as string[]} />
                        <p><strong>Release Date :</strong> {movie.releaseDate}</p>
                    </Card.Body>
                </Col>
            </Row>
        </Card >
    );
}

export default MovieDetails;