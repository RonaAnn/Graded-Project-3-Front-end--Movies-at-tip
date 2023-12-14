import Carousel from 'react-bootstrap/Carousel';
import IMovies from '../../model/IMovies';

import "./MovieCarousel.css"

type Props = {
    movies: IMovies[]
}

const MovieCarousel = ({ movies }: Props) => {

    return (
        <Carousel fade>
            {
                movies.map((movie) => (
                    <Carousel.Item interval={2000} key={movie.id}>
                        <img src={movie.posterurl} alt="Movie poster" className='slide' />
                        <Carousel.Caption className='d-flex align-items-center justify-content-center'>
                            <p></p>
                            <h1 className='caption'>Latest Releases</h1>
                            <p></p>
                        </Carousel.Caption>
                    </Carousel.Item>
                )
                )
            }
        </Carousel>
    );
}

export default MovieCarousel;