import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { createMerch, deleteMerch, editMerch } from '../../features/merch/merchSlice';


const MerchForm = () => {

    const [merchType, setMerchType] = useState('')
    const [name, setName] = useState('')
    const [size, setSize] = useState('')
    const [price, setPrice] = useState('')
    const [ageRange, setAgeRange] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState([])

    const dispatch = useDispatch();

    const addMerchHandle = (e) => {
        e.preventDefault()
        const newMerch = {
            merchType: merchType,
            name: name,
            size: size,
            price: price,
            ageRange: ageRange,
            description: description,
            image: image,
        }

        dispatch(createMerch(newMerch))
        setMerchType('')
        setName('')
        setSize('')
        setPrice('')
        setAgeRange('')
        setDescription('')

    }


    return (

        <>
            <div className="form-container">
                <form className="form" action="/new-merch" method="post">
                    <h1 className="card-header edit-head">
                        {/* Add  */}
                        &#10010; Merch
                    </h1>

                    <label htmlFor="merchType" className="inputLabels">
                    
                    </label>
                    <input
                        onChange={(e) => setMerchType(e.target.value)}
                        type='text'
                        id="merchType"
                        name="merchType"
                        value={merchType}
                        className='form-input'
                        placeholder="type"
                    />

                    <label htmlFor="name" className="inputLabels">
                    
                    </label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        type='text'
                        id="name"
                        name="name"
                        value={name}
                        className='form-input'
                        placeholder="name"
                    />

                    <label htmlFor="size" className="inputLabels">
                   
                    </label>
                    <input
                        onChange={(e) => setSize(e.target.value)}
                        type='text'
                        id="size"
                        name="size"
                        value={size}
                        className='form-input'
                        placeholder="size"
                    />

                    <label htmlFor="merchPrice" className="inputLabels">
                        
                    </label>
                    <input
                        onChange={(e) => setPrice(e.target.value)}
                        type='text'
                        id="merchPrice"
                        name="price"
                        value={price}
                        className='form-input'
                        placeholder="price"
                    />

                    <label htmlFor="ageRange" className="inputLabels">
                 
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

                    <label htmlFor="merchDescription" className="inputLabels">

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

                    <button onClick={(e) => addMerchHandle(e)} className='form-btn'>
                        &#128190;
                    </button>
                </form>
            </div>
        </>
    )

}

export default MerchForm