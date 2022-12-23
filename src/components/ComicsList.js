import '../styles/general.scss'
import '../styles/parts/comicsList.scss'
import {Link} from "react-router-dom";
import useMarvelService from "../services/MarvelService";
import {useEffect, useState} from "react";
import nextId from "react-id-generator";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";
import {CSSTransition, TransitionGroup} from "react-transition-group";

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
            return (
                <CSSTransition classNames="comicses__transition">
                    <li
                        key={nextId()}
                        className="comicses__item">
                        <Link to={`/comics/${obj.id}`} className="comicses__link">
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
                        </Link>
                    </li>
                </CSSTransition>
            )
        });
    }

    const items = renderItems(comics);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemsLoading ? <Spinner/> : null;

    return (
        <section className="comicses">
            <ul className="comicses__list">
                <TransitionGroup component={null}>
                    {spinner || errorMessage || items}
                </TransitionGroup>
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