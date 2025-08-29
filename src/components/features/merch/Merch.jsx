import React, { useState } from "react";

const Merch = ({ editMerchHandle, id, name, deleteMerchHandle, image, merchType }) => {

    const [isEditing, setEditing] = useState(false)
    const [newName, setNewName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        editMerchHandle(id, newName, name)
        setNewName('')
        setEditing(false)
    }


    const editingTemplate = (
        <form className="stack-small game-list" onSubmit={handleSubmit}>
            <div className="row">
                <label className="view-label col" htmlFor={id}>
                    Edit: {name}
                </label>

                <img alt='Merch item' className='view-thumbnail' src={image} />

                <input
                    id={id}
                    className="form-input col"
                    type='text'
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder='new name'
                />
            </div>

            <div className="btn-group">
                <button
                    type='button'
                    className="btn cancelBtn edit-cancel"
                    onClick={() => setEditing(false)}
                >
                    Cancel &#10006;
                    <span className="visually-hidden">
                        renaming {name}
                    </span>
                </button>

                <button type="submit" className="btn game-edit">
                    Save &#10004;
                    <span className="visually-hidden">new name for {name}</span>
                </button>
            </div>
        </form>
    )

    const viewTemplate = (
        <div className="stack-small game-list">
            <div className="row">
                <label className="view-label col" htmlFor={id}>
                    {name}                 
                </label>
                
                <img className='view-thumbnail img-fluid' src={image} />

                <div className="col viewConsole-label">
                    Type: {merchType}
                </div>
            </div>


            <div className="btn-group">
                <button
                    type="button"
                    className="editBTNhover btn"
                    onClick={() => setEditing(true)}
                >
                    Edit &#9997;
                    <span className="visually-hidden">
                        {name}
                    </span>
                </button>

                <button
                    className="btn cancelBtn"
                    type="button"
                    onClick={() => deleteMerchHandle(id)}
                >
                    Delete &#10008;
                    <span className="visually-hidden">{name}
                    </span>
                </button>
            </div>
        </div>
    )


    return (

        <>
            <li className="games">
                {isEditing ? editingTemplate : viewTemplate}
            </li>
        </>
    )
}

export default Merch