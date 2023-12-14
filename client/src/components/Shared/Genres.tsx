import { Badge } from "react-bootstrap";

type Props = {
    genres: string[],
}

const Genres = ({ genres }: Props) => {
    return (
        <p>
            <strong>Genres : </strong> {genres.map((item) => <span key={item}><Badge key={item as string} pill bg="light" text="dark">{item}</Badge> {" "}</span>)}
        </p>
    )
}

Genres.defaultProps = {
    genres: []
};

export default Genres;