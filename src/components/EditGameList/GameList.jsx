import { useState, useEffect } from "react";
import Games from './Games'
import { getGames, editGame, deleteGame } from '../../features/game/gameSlice';
import { useSelector, useDispatch } from 'react-redux';

const GameList = () => {

    const dispatch = useDispatch();
    const { games, isError } = useSelector((state) => state.game);

    useEffect(() => {
        if (isError) {
            console.log('error');
        }
        dispatch(getGames());

    }, [dispatch, isError])

    const [gamez, setGamez] = useState(games)
    console.log(gamez, 'gamez')

    const deleteGameHandle = (id) => {
        const remainingGames = gamez.filter((game) => id !== game._id)
        setGamez(remainingGames)
        dispatch(deleteGame(id))
    }

    const editGameHandle = (id, newTitle) => {
        const editedGameList = gamez.map(game => {
            if (id === game._id) {
                return { ...game, title: newTitle }
            }
            return game
        })
        const editedGame = {
            title: newTitle
        }

        const sendToRedux = {
            id: id,
            title: newTitle

        }

        console.log(sendToRedux, ' sent')

        setGamez(editedGameList)
        dispatch(editGame(sendToRedux))
    }

    const gameList = gamez
        .map((game) =>
            <Games
                id={game._id}
                title={game.title}
                console={game.console}
                image={game.image}
                key={game._id}
                deleteGameHandle={deleteGameHandle}
                editGameHandle={editGameHandle}
            />
        )

    const gamesNoun = gameList.length !== 1 ? 'games' : 'game';
    const headingText = `${gameList.length} ${gamesNoun} remaining`;


    return (
        <>
            <div className="gameapp stack-large">

                <h2 id="list-heading" className="edit-head">{headingText}</h2>

                <ul className="stack-large" aria-labelledby="list-heading">
                    {gameList}
                </ul>
            </div>
        </>
    )
}

export default GameList