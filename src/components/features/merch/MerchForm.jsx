import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createMerch } from '../../../redux/merch/merchSlice';


const MerchForm = () => {
    const [merchType, setMerchType] = useState('')
    const [name, setName] = useState('')
    const [size, setSize] = useState('')
    const [price, setPrice] = useState('')
    const [ageRange, setAgeRange] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0); // Assuming you want to handle rating as well
    const [stock, setStock] = useState(0); // Default stock, can be adjusted later

    const dispatch = useDispatch();

    const addMerchHandle = (e) => {
        e.preventDefault();

        if (!merchType || !name || !size || !price || !ageRange || !description || !image || rating <= 0) {
            setFeedback('⚠️ Please fill in all fields.');
            return;
        }

        const newMerch = {
            merchType,
            name,
            size,
            ageRange,
            description,
            price,
            image: preview, // If file upload is implemented, send `image` instead
            rating, // Assuming you want to handle rating as well
            stock: 0, // Default stock, can be adjusted later
        }

        dispatch(createMerch(newMerch))
        setFeedback('✅ Merch item added successfully!')

        // clear form
        setMerchType('')
        setName('')
        setSize('')
        setAgeRange('')
        setDescription('')
        setPrice('')
        setImage(null)
        setPreview(null)
        setRating(0)
        setStock(0); // Reset stock to default

        setTimeout(() => setFeedback(''), 3000);

    };


    return (
        <>
            <div className="form-container formShadow" >

                <form className="form " onSubmit={addMerchHandle} >

                    <h1 className="card-header edit-head">
                        Add
                        Merch &#10010;
                    </h1>

                    <label htmlFor="merchType" className='form-label'>Type</label>
                    <input
                        onChange={(e) => setMerchType(e.target.value)}
                        type='text'
                        id="merchType"
                        name="merchType"
                        value={merchType}
                        className='form-input'
                        placeholder="Product Type"
                    />

                    <label htmlFor="name" className='form-label'>Name</label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        type='text'
                        id="name"
                        name="name"
                        value={name}
                        className='form-input'
                        placeholder="Product Name"
                    />

                    <label htmlFor="size" className='form-label'>
                        Size
                    </label>
                    <input
                        onChange={(e) => setSize(e.target.value)}
                        type='text'
                        id="size"
                        name="size"
                        value={size}
                        className='form-input'
                        placeholder="Product Size"
                    />


                    <label htmlFor="ageRange" className='form-label'>
                        Age
                    </label>
                    <input
                        onChange={(e) => setAgeRange(e.target.value)}
                        type='text'
                        id="ageRange"
                        name="ageRange"
                        value={ageRange}
                        className='form-input'
                        placeholder="Age Range"
                    />

                    <label htmlFor="merchDescription" className='form-label'>
                        Description
                    </label>
                    <input
                        onChange={(e) => setDescription(e.target.value)}
                        type='text'
                        id="merchDescription"
                        name="merchDescription"
                        value={description}
                        className='form-input'
                        placeholder="description"
                    />

                    <label htmlFor="merchPrice" className='form-label'>
                        Price
                    </label>

                    <input
                        onChange={(e) => setPrice(e.target.value)}
                        type='text'
                        id="merchPrice"
                        name="price"
                        value={price}
                        className='form-input'
                        placeholder="Price"
                    />


                    {preview && (
                        <div className="preview-container">
                            <p>Preview:</p>
                            <img src={preview} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
                        </div>
                    )}

                    {feedback && <div className="feedback-message">{feedback}</div>}
                    <label htmlFor="merchImg" className='form-label'>Merch Image</label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type='file'
                        id="merchImg"
                        name="merchImg"
                        className='form-input'
                    />
                    <div className="image-preview">
                        {image && <img src={URL.createObjectURL(image)} alt="Image Preview" />}
                    </div>
                    <label htmlFor="rating" className='form-label'>Rating</label>
                    <input
                        onChange={(e) => setRating(e.target.value)}
                        type='number'
                        id="rating"
                        name="rating"
                        value={rating}
                        className='form-input'
                        placeholder="Rating (1-5)"
                        min="1"
                        max="5"
                    />
                    <label htmlFor="stock" className='form-label'>Stock</label>
                    <input
                        onChange={(e) => setStock(i => i < e.target.value ? e.target.value : i++)}
                        type='number'
                        id="stock"
                        name="stock"
                        value={stock}
                        className='form-input'
                        placeholder="Stock Quantity"
                        min="0"

                    />

                    <button type="submit" className="form-btn">
                        &#128190;
                    </button>

                </form>
            </div>
        </>
    )

}

export default MerchForm