import { Badge } from "react-bootstrap";

type Props = {
    stars: string[],
}

const Stars = ({ stars }: Props) => {
    return (
        <p>
            <strong>Starts : </strong> {stars.map((item) => <span key={item}><Badge key={item as string} pill bg="light" text="dark">{item}</Badge>{" "}</span>)}
        </p>

    );
}

Stars.defaultProps = {
    starts: []
};

export default Stars;