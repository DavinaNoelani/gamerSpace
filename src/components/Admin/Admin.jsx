import { useState } from "react"
import GameForm from "./GameForm"
import MerchForm from "./MerchForm"
import Header from "../Header";
import Games from "../Shared/Games";
import Merch from "../Shared/Merch";
import EditableList from "../Shared/EditableList";
import { deleteGame, editGame } from '../../features/game/gameSlice';
import { deleteMerch, editMerch } from '../../features/merch/merchSlice';
import { useSelector, useDispatch } from 'react-redux';
import './Admin.css'


const Admin = ({ items, onDelete, onEdit, type }) => {

    const [showGameList, setShowGameList] = useState(false);
    const [showMerchList, setShowMerchList] = useState(false);

    const { games } = useSelector((state) => state.game);
    const { merch } = useSelector((state) => state.merch);
    const dispatch = useDispatch()


    return (
        <>
            <Header />

            <div className="admin-container">

                <div className="admin-grid">
                    {/* left-side: forms */}
                    <h2 className="section-header">Add New Game</h2>
                    <GameForm />

                    <h2 className="section-header">Add New Merch</h2>
                    <MerchForm />
                </div>

                {/* Right Side: Editable Lists */}
                <div className="edit-section">
                    <div className="list-toggle">
                        <h2>Edit Game</h2>

                        <button className="btn" onClick={() => setShowGameList(!showGameList)}>
                            {showGameList ? 'Hide' : 'Show'} Game List
                        </button>
                    </div>


                    <EditableList
                        items={games}
                        type="Game"
                        onDelete={(id) => dispatch(deleteGame(id))}
                        onEdit={(item) => console.log(item)} //for now
                        renderItem={item => (
                            <Games
                                key={item._id}
                                item={item._id}
                                title={item.title}
                                image={item.image}
                                console={item.console}
                                editGameHandle={(id, newTitle) =>
                                    dispatch(editGame({ id, title: newTitle }))
                                }
                                deleteGameHandle={(id) => dispatch(deleteGame(id))}
                            />
                        )}
                    />
                    <div className="list-toggle">
                        <h2>Edit Merch</h2>
                        <button className="btn" onClick={() => setShowMerchList(!showMerchList)}>
                            {showMerchList ? 'Hide' : 'Show'} Merch List
                        </button>
                    </div>

                    <EditableList
                        items={merch}
                        type="Merch"
                        onDelete={(id) => dispatch(deleteMerch(id))}
                        onEdit={() => { }}
                        renderItem={(item) => (
                            <Merch
                                key={item._id}
                                id={item._id}
                                name={item.name}
                                image={item.image}
                                merchType={item.merchType}
                                editMerchHandle={(id, newName) =>
                                    dispatch(editMerch({ id, name: newName }))
                                }
                                deleteMerchHandle={(id) => dispatch(deleteMerch(id))}
                            />
                        )}
                    />
                </div>
            </div>
        </>
    )
}

export default Admin