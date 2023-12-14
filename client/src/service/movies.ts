import axios from "axios";
import IMovies from "../model/IMovies";


const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getLatestMovies = async () => {

    const result = await axios.get(`${baseUrl}/movies-in-theaters?_sort=releaseDate&_order=desc&_limit=7`)
    return result.data as IMovies[];

}

const getMovies = async (url: string) => {

    const result = await axios.get(`${baseUrl}${url}`);
    return result.data as IMovies[];

}

const getMovieById = async (url: string) => {

    const result = await axios.get(`${baseUrl}${url}`);
    return result.data as IMovies;
}

const getFavouriteMovies = async () => {

    const result = await axios.get(`${baseUrl}/favourite`);

    const ids = result.data.map((x: IMovies) => {
        return x.id;
    });

    return ids;
}


const addFavouriteMovie = async (movie: IMovies) => {

    await axios.post(`${baseUrl}/favourite`, movie);
}

const deleteFavouriteMovie = async (id: number) => {
    await axios.delete(`${baseUrl}/favourite/${id}`);
}

export {
    getMovies, getLatestMovies, getFavouriteMovies, addFavouriteMovie, deleteFavouriteMovie, getMovieById
};

