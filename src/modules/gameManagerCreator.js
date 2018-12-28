const gameManagerCreator = () => {
    let isGameStart = false
    let isGameEnd = false
    let winner = null
    return ({
        getIsStart : () => isGameStart,
        setIsStart : (nextIsGameStart) => { isGameStart = nextIsGameStart },
        getIsEnd : () => isGameEnd,
        setIsEnd : (nextIsGameEnd) => { isGameEnd = nextIsGameEnd },
        setWinner : (lastWinner) => {winner = lastWinner },
    })
}

export default gameManagerCreator