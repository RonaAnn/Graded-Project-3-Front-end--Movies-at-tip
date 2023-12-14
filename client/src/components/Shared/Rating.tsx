import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty, faStarHalfAlt } from '@fortawesome/free-regular-svg-icons';
import './Shared.css';

type Props = {
    rating: number,
    numRatings: number | undefined
}

const Rating = ({ rating, numRatings }: Props) => {
    const numFullStars = Math.floor(rating);
    const numHalfStars = Math.round(rating) - numFullStars;
    const numEmptyStar = 5 - (numFullStars + numHalfStars);
    return (
        <>
            <span className='rating'>
                {
                    Array.from({ length: numFullStars }).map((item, index) => <FontAwesomeIcon key={item + "-" + index as string} icon={faStar} />)
                }
                {
                    Array.from({ length: numHalfStars }).map((item, index) => <FontAwesomeIcon key={item + "-" + index as string} icon={faStarHalfAlt} />)
                }
                {
                    Array.from({ length: numEmptyStar }).map((item, index) => <FontAwesomeIcon key={item + "-" + index as string} icon={faStarEmpty} />)
                }
            </span>
            <span>&nbsp;&nbsp;({numRatings})</span>
        </>
    )
}

Rating.defaultProps = {
    rating: 5
};

export default Rating;