import { useState } from "react"
import GameForm from "./GameForm"
import MerchForm from "./MerchForm"
import Header from "../Header";
import EditableList from "../Shared/EditableList";
import { deleteGame } from '../../features/game/gameSlice';
import { deleteMerch } from '../../features/merch/merchSlice';
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

                    {showGameList && (
                        <EditableList
                            items={games}
                            onDelete={(id) => dispatch(deleteGame(id))}
                            onEdit={(item) => console.log('Edit Game:', item)} //for now
                            type="Game"
                        />
                    )}

                    <div className="list-toggle">
                        <h2>Edit Merch</h2>
                        <button className="btn" onClick={() => setShowMerchList(!showMerchList)}>
                            {showMerchList ? 'Hide' : 'Show'} Merch List
                        </button>
                    </div>

                    {showMerchList && (
                        <EditableList
                            items={merch}
                            onDelete={(id) => dispatch(deleteMerch(id))}
                            onEdit={(item) => console.log('Edit Merch:', item)} //for now
                            type="Merch"
                        />
                    )}

                </div>
            </div>
        </>
    )
}

export default Admin