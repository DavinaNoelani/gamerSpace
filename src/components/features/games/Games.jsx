import { useState } from "react";

const Games = ({ editGameHandle, id, title, deleteGameHandle, image, console }) => {

    const [isEditing, setEditing] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [newConsole, setNewConsole] = useState(console)


    const handleSubmit = (e) => {
        e.preventDefault()
        editGameHandle(id, newTitle, title, newConsole)
        setNewTitle('')
        setNewConsole(console)
        setEditing(false)
    }
    


    const editingTemplate = (
        <form className="stack-small game-list" onSubmit={handleSubmit}>
            <div className="row">
                
                <label className="view-label col" htmlFor={id}>
                    {title}
                </label>

                <img className='view-thumbnail img-fluid' src={image} alt={title} />

                <input
                    id={id}
                    className="form-input col"
                    type='text'
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder='new title'
                />

                <input
                    id={id}
                    className="form-input col"
                    type='text'
                    value={newConsole}
                    onChange={(e) => setNewConsole(e.target.value)}
                    placeholder='new console'
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
                        renaming {title}
                    </span>
                </button>

                <button type="submit" className="btn game-edit">
                    Save &#10004;
                    <span className="visually-hidden">new name for {title}</span>
                </button>
            </div>
        </form>
    )

    const viewTemplate = (
        <div className="stack-small game-list">
            <div className="row">
                <label className="view-label col" htmlFor={id}>
                    {title}
                </label>

                <img className='view-thumbnail img-fluid' src={image} />

                <label className="col viewConsole-label">
                    Console: {console}
                </label>
            </div>

            <div className="btn-group">
                <button
                    type="button"
                    className="btn editBTNhover"
                    onClick={() => setEditing(true)}
                >
                    {/* &#9998; */}
                    Edit               
                    &#9997;
                    <span className="visually-hidden">
                        {title}
                    </span>
                </button>

                <button
                    className="btn cancelBtn"
                    type="button"
                    onClick={() => deleteGameHandle(id)}
                >
                    Delete &#10008;
                    <span className="visually-hidden">{title}
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

export default Games