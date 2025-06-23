import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { createGame } from '../../features/game/gameSlice';



const GameForm = () => {

    const [console, setConsole] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [rating, setRating] = useState('')
    const [description, setDescription] = useState('')
    const [gameImg, setGameImg] = useState('')
    const [saveGame, setSaveGame] = useState([])

    const dispatch = useDispatch();

    const addGameHandle = (e) => {
        e.preventDefault()
        const newGame = {
            console: console,
            title: title,
            price: price,
            rating: rating,
            description: description,
            gameImg: gameImg
        }

        dispatch(createGame(newGame))
        setConsole('')
        setTitle('')
        setPrice('')
        setRating('')
        setDescription('')
        setGameImg('')

    }






    return (
        <>
            <div className="form-container">

                <form className="form" action="/new-game" method="post">

                    <h1 className="card-header edit-head">&#10010; Game</h1>

                    <label htmlFor="console" className="inputLabels">

                    </label>
                    <input
                        onChange={(e) => setConsole(e.target.value)}
                        type='text'
                        id="console"
                        name="console"
                        value={console}
                        className='form-input'
                        placeholder="Console"
                    />

                    <label htmlFor="title" className="inputLabels">

                    </label>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type='text'
                        id="title"
                        name="title"
                        value={title}
                        className='form-input'
                        placeholder="Title"
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
                        placeholder="price"
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
                    <input
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
                        id="gameImg"
                        className='form-input'
                        type='file'
                        name="gameImg"
                        value={gameImg}
                        onChange={(e) => setGameImg(e.target.value)}
                        accept='image/*'

                    />                          

                    <button onClick={(e) => addGameHandle(e)} className='form-btn'>
                        &#128190;
                    </button>
                </form>
            </div>

        </>
    )
}

export default GameForm