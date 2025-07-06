import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createMerch } from '../../features/merch/merchSlice';


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

    const dispatch = useDispatch();

    const addMerchHandle = (e) => {
        e.preventDefault();

        if (!merchType || !name || !size || !price || !ageRange || !description || !image) {
            setFeedback('⚠️ Please fill in all fields.');
            return;
        }

        const newMerch = {
            merchType,
            name,
            size,
            price,
            ageRange,
            description,
            image: preview // If file upload is implemented, send `image` instead
        }

        dispatch(createMerch(newMerch))
        setFeedback('✅ Merch item added successfully!')

        // clear form
        setMerchType('')
        setName('')
        setSize('')
        setPrice('')
        setAgeRange('')
        setDescription('')
        setImage(null)
        setPreview(null)

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

                    {preview && (
                        <div className="preview-container">
                            <p>Preview:</p>
                            <img src={preview} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
                        </div>
                    )}

                    {feedback && <div className="feedback-message">{feedback}</div>}

                    <button type="submit" className="form-btn">
                        &#128190;
                    </button>

                </form>
            </div>
        </>
    )

}

export default MerchForm