import { useState, useEffect } from "react";
import Merch from "./Merch";
import { getMerch, deleteMerch, editMerch } from "../../features/merch/merchSlice";
import { useSelector, useDispatch } from 'react-redux';

const MerchList = () => {

    const dispatch = useDispatch();
    const { merch, isError } = useSelector((state) => state.merch);

    useEffect(() => {
        if (isError) {
            console.log('error');
        }
        dispatch(getMerch());

    }, [dispatch, isError])

    const [merchandise, setMerch] = useState(merch)
    useEffect(() => {
        setMerch(merch);
    }, [merch]);

    const deleteMerchHandle = (id) => {
        const remainingMerch = merch.filter((m) => id !== m._id)
        setMerch(remainingMerch)
        dispatch(deleteMerch(id))
    }

    const editMerchHandle = (id, newName) => {
        const editedMerchList = merch.map(ms => {
            if (id === ms._id) {
                return { ...ms, name: newName }
            }
            return ms
        })
        const editedMerch = {
            name: newName
        }

        const sendToRedux = {
            id: id,
            name: newName
        }

        console.log(sendToRedux, ' sent')

        setMerch(editedMerchList)
        dispatch(editMerch(sendToRedux))
    }

    const merchList = merchandise
        .map((mer) =>
            <Merch
                id={mer._id}
                merchType={mer.merchType}
                name={mer.name}
                image={mer.image}
                ageRange={mer.ageRange}
                size={mer.size}
                key={mer._id}
                deleteMerchHandle={deleteMerchHandle}
                editMerchHandle={editMerchHandle}
            />
        )

    const merchNoun = merchList.length !== 1 ? 'items' : 'item';
    const headingText = `${merchList.length} ${merchNoun} remaining`;

    return (
        <>
            <div className="gameapp stack-large">

                <h2 id="list-heading" className="edit-head">{headingText}</h2>

                <ul className="stack-large" aria-labelledby="list-heading">
                    {merchList}
                </ul>
            </div>
        </>
    )
}

export default MerchList