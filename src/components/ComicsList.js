import '../styles/general.scss'
import '../styles/parts/comicsList.scss'
import useMarvelService from "../services/MarvelService";
import {useEffect, useState} from "react";
import nextId from "react-id-generator";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";

const ComicsList = () => {
    const {loading, error, getAllComics} = useMarvelService();
    const [comics, setComics] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(260);
    const [comicsEnded, setComicsEnded] = useState(false);

    const onComicsLoaded = (newComics) => {
        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }
        setComics(comics => [...comics, ...newComics]);
        setNewItemsLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    }

    const getComics = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded);
    }

    useEffect(() => {
        getComics(offset, true);
    }, []);

    const renderItems = (arr) => {
        return arr.map(obj => {
            console.log(obj.price);
            return (
                <li
                    key={nextId()}
                    className="comicses__item">
                    <a href="#" className="comicses__link">
                        <div className="comicses__img">
                            <img style={obj.noThumbnail ? {objectFit: 'contain'} : null}
                                 src={obj.thumbnail}
                                 alt={obj.name}/>
                        </div>
                        <h3 className="comicses__name title">
                            {obj.title}
                        </h3>
                        <div className="comicses__price">
                            {obj.price}
                        </div>
                    </a>
                </li>
            )
        });
    }

    const items = renderItems(comics);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemsLoading ? <Spinner/> : null;

    return (
        <section className="comicses">
            <ul className="comicses__list">
                {spinner || errorMessage || items}
            </ul>
            <button
                disabled={newItemsLoading}
                onClick={() => getComics(offset)}
                style={{'display': comicsEnded ? 'none' : 'flex'}}
                className="comicses__more button button_wide">
                LOAD MORE
            </button>
        </section>
    )
}

export default ComicsList;