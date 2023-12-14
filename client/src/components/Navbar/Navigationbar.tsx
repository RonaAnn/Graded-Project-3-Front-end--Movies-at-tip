import { Link, useLocation } from 'react-router-dom';
import IMovies from '../../model/IMovies';
import { useEffect, useState } from 'react';
import { getMovies } from '../../service/movies';
import { toast } from 'react-toastify';
import { Container, Form, Nav, Navbar } from 'react-bootstrap';
import { faClapperboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
    searchMovies?: (values: IMovies[]) => void,
}

const Navigationbar = ({ searchMovies }: Props) => {

    const [moviesList, setMoviesList] = useState<IMovies[]>([]);

    const url = useLocation();

    useEffect(
        () => {
            const helper = async () => {
                try {

                    const data = await getMovies(url.pathname);
                    setMoviesList(data);

                } catch (error: any) {

                    toast.error(error.message, {
                        // Set to 15sec
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 10000,
                    });
                }
            }
            helper()
        }, [url]
    )

    const searchHandler = (value: string) => {

        if (searchMovies) {

            if (value === '') {
                searchMovies(moviesList);
            } else if (value.length > 0) {

                const data = moviesList.filter((movie) => {

                    return movie?.title?.toLowerCase().includes(value.toLowerCase());
                });
                searchMovies(data);
            }
        }
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark" sticky='top'>
                <Container fluid>
                    <Navbar.Brand to="/" as={Link}>
                        <FontAwesomeIcon icon={faClapperboard} className='fa-flip fa-xl me-1 fa-light' style={{ color: "#f7f7f7", animationDuration: '5s' }} />
                        MoviesAtTip</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link to="/movies-in-theaters" as={Link}>Movies</Nav.Link>
                            <Nav.Link to="/top-rated-movies" as={Link}>Top Rated Movies</Nav.Link>
                            <Nav.Link to="/top-rated-india" as={Link}>Top Rated India</Nav.Link>
                            <Nav.Link to="/movies-coming" as={Link}>Coming Soon</Nav.Link>
                            <Nav.Link to="/favourite" as={Link}>Favourite</Nav.Link>

                        </Nav>
                        {
                            (url.pathname !== "/") && (
                                <>
                                    <Form className="d-flex">
                                        <Form.Control
                                            type="search"
                                            placeholder="Search"
                                            className="me-2"
                                            aria-label="Search"
                                            onChange={(e) => searchHandler(e.target.value)}

                                        />
                                    </Form>
                                </>
                            )
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Navigationbar;