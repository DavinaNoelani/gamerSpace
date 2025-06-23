import React, { useState, useEffect } from "react"
import GameForm from "./GameForm"
import MerchForm from "./MerchForm"
import GameList from "../EditGameList/GameList";
import MerchList from '../EditMerchList/MerchList'
import Header from "../Header";


const Admin = () => {

    const [switchEdit, setSwitchEdit] = useState(false)
    const [switchMerchEdit, setMerchEdit] = useState(false)



    const showEdit = () => {
        setSwitchEdit(!switchEdit)

    }

    return (
        <>
            <Header />
            
            <div className="container-fluid">
                <div className="row media">
                    <div className="col">
                        <GameForm />
                        <MerchForm />
                    </div>

                    <div className="col">

                        <div className="edit-row">
                            <h1 className="text-center edit-head"> Edit Games </h1>
                            <button className="btn edit-btn" onClick={showEdit}>&#9998;</button>
                        </div>

                        <div className="edit-side">
                            {switchEdit && (
                                <GameList />
                            )}
                            {/* <button className="btn">&#10008;</button> */}
                        </div>

                        <div className="edit-row">
                            <h1 className="text-center edit-head"> Edit Merch </h1>
                            <button className="btn edit-btn" onClick={() => setMerchEdit(!switchMerchEdit)}>&#9998;</button>
                        </div>

                        <div className="edit-side">
                            {switchMerchEdit && (
                                <MerchList />
                            )}
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Admin