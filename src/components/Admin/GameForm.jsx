import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { createGame } from '../../features/game/gameSlice';



const GameForm = () => {



    const [console, setConsole] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [rating, setRating] = useState('')
    const [description, setDescription] = useState('')
    const [gameImg, setGameImg] = useState('')

    useEffect(() => {
        return () => {
            if (gameImg) {
                URL.revokeObjectURL(gameImg);
            }
        };
    }, [gameImg]);



    const dispatch = useDispatch();

    const addGameHandle = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('console', console);
        formData.append('price', price);
        formData.append('rating', rating);
        formData.append('description', description);
        formData.append('gameImg', gameImg); // raw file

        dispatch(createGame(formData)); // You’ll handle this in Redux

        // Reset form fields
        setTitle('');
        setConsole('');
        setPrice('');
        setRating('');
        setDescription('');
        setGameImg(null);
};


    return (
        <>
            <div className="form-container">

                <form className="form" method="post">

                    <h1 className="card-header edit-head">&#10010; Game</h1>

                    <label htmlFor="title" className="inputLabels">

                    </label>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type='text'
                        id="title"
                        name="title"
                        value={title}
                        className='form-input'
                        placeholder="Name of Game"
                    />

                    <label htmlFor="console" className="inputLabels">

                    </label>
                    <input
                        onChange={(e) => setConsole(e.target.value)}
                        type='text'
                        id="console"
                        name="console"
                        value={console}
                        className='form-input'
                        placeholder="Setting name of console (e.g. Nintendo Switch, Wii U, etc.)"
                    />

                    <label htmlFor="price" className="inputLabels">

                    </label>
                    <input
                        onChange={(e) => setPrice(e.target.value)}
                        type='text'
                        id="price"
                        name="price"
                        value={price}
                        className='form-input'
                        placeholder="Price"
                    />

                    <label htmlFor="rating" className="inputLabels">

                    </label>
                    <input
                        onChange={(e) => setRating(e.target.value)}
                        type='text'
                        id="rating"
                        name="rating"
                        value={rating}
                        className='form-input'
                        placeholder="Rating"
                    />

                    <label htmlFor="description" className="inputLabels">

                    </label>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        type='text'
                        id="description"
                        name="description"
                        value={description}
                        className='form-input'
                        placeholder="description"
                    />

                    <label htmlFor="gameImg" className="inputLabels">

                    </label>                  

                    <input
                        type="file"
                        id="gameImg"
                        className="form-input"
                        name="gameImg"
                        accept="image/*"
                        onChange={(e) => setGameImg(e.target.files[0])}
                    />

                    {gameImg && (
                        <img src={URL.createObjectURL(gameImg)} alt="Preview" width="150" />
                    )}


                    <button onClick={(e) => addGameHandle(e)} className='form-btn'>
                        &#128190;
                    </button>
                </form>
            </div>

        </>
    )
}

export default GameForm