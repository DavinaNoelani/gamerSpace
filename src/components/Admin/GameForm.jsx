import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { createGame } from '../../features/game/gameSlice';
import './Admin.css';

// This component is used to add a new game to the database
// It includes a form with fields for title, console, price, rating, description, and an image upload for the game cover.
// The form data is sent to the Redux store using the createGame action, which handles the API request to create the game.  


const GameForm = () => {
    // useState hooks to manage form state
    // These hooks are used to manage the state of the form fields and feedback messages.
    // State variables for game form
    // These variables will hold the input values for the form fields.  
    const [title, setTitle] = useState('')
    const [console, setConsole] = useState('')
    const [price, setPrice] = useState('')
    const [rating, setRating] = useState('')
    const [description, setDescription] = useState('')
    const [gameImg, setGameImg] = useState(null);
    const [preview, setPreview] = useState(null);
    const [feedback, setFeedback] = useState('');

    const dispatch = useDispatch();

    // This function is called when the form is submitted. It validates the form fields and dispatches the createGame action to add the new game to the database.
    // It also resets the form fields and provides feedback to the user.        
    // This function handles the form submission for adding a new game.
    const addGameHandle = (e) => {
        e.preventDefault();
        // Validate form fields
        if (!console || !title || !price || !rating || !description || !gameImg) {
            setFeedback('Please fill in all fields.');
            return;
        }
        // Create a newGame object to handle file uploads
        const newGame = {
            title,
            console,
            price,
            rating,
            description,
            gameImg: preview // fallback, or handle uploading image differently later
        };
        // If you want to handle the image upload separately, you can do so here    
        if (gameImg) {
            newGame.gameImg = gameImg; // Use the file directly
        } else {
            setFeedback('Please upload an image for the game.');
            return;
        }

        dispatch(createGame(newGame)); // You’ll handle this in Redux
        setFeedback('Game added successfully! ✅');

        // Reset form fields
        setTitle('');
        setConsole('');
        setPrice('');
        setRating('');
        setDescription('');
        setGameImg('');
        setPreview(null);

        setTimeout(() => setFeedback(''), 3000)
        // Clear feedback after 3 seconds
    };

    return (
        <>
            <div className=" form-container formShadow">

                <form className="form" onSubmit={addGameHandle}>

                    <h1 className="card-header edit-head">
                        Add 
                        Game
                        &#10010; 
                    </h1>

                    <label htmlFor="title" className='form-label'>Title</label>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type='text'
                        id="title"
                        name="title"
                        value={title}
                        className='form-input'
                        placeholder="Title .."
                    />

                    <label htmlFor="console" className='form-label'>Console</label>
                    <input
                        onChange={(e) => setConsole(e.target.value)}
                        type='text'
                        id="console"
                        name="console"
                        value={console}
                        className='form-input'
                        placeholder="Console (e.g. Nintendo Switch, Wii U, etc.)"
                    />

                    <label htmlFor="price" className='form-label'>Price</label>
                    <input
                        onChange={(e) => setPrice(e.target.value)}
                        type='text'
                        id="price"
                        name="price"
                        value={price}
                        className='form-input'
                        placeholder="Price"
                    />

                    <label htmlFor="rating" className='form-label'>Rating</label>
                    <input
                        onChange={(e) => setRating(e.target.value)}
                        type='text'
                        id="rating"
                        name="rating"
                        value={rating}
                        className='form-input'
                        placeholder="Rating"
                    />

                    <label htmlFor="description" className='form-label'>Description</label>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        type='text'
                        id="description"
                        name="description"
                        value={description}
                        className='form-input'
                        placeholder="Description"
                    />

                    <label htmlFor="gameImg" className='form-label'>Game Image</label>
                    <input
                        type="file"
                        id="gameImg"
                        className="form-input"
                        name="gameImg"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setGameImg(file);
                                setPreview(URL.createObjectURL(file)); // Set the preview to the file for display
                            }
                        }}
                    />

                    {preview && (
                        <div className="image-preview">
                            <p>Image Preview:</p>
                            {/* Display the preview of the uploaded image */}
                            <img src={preview} alt="Game Image Preview" style={{ maxWidth: "100%", height: 'auto', marginTop: '10px' }} />
                        </div>
                    )}

                    {feedback &&
                        <div className="feedback-message">
                            {feedback}
                        </div>}

                    <button type="submit" className='form-btn'>
                        &#128190;
                    </button>
                </form>
            </div>
        </>
    )
}

export default GameForm