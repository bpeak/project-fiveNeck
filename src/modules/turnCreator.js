import * as stoneTypes from '../constants/stoneTypes'

const turnCreator = (stoneOwnerSets) => {
    let turns = {
        [stoneTypes.BLACK] : {
            playerType : stoneOwnerSets.BLACK,
            stoneType : stoneTypes.BLACK,
        },
        [stoneTypes.WHITE] : {
            playerType : stoneOwnerSets.WHITE,
            stoneType : stoneTypes.WHITE,
        },
    }

    let currentTurnKey = stoneTypes.BLACK
    let isLogged = false
    let isEnd = false
    return ({
        getTurn : () => turns[currentTurnKey],
        getOppositeTurn : () => {
            if(currentTurnKey === stoneTypes.BLACK){
                const oppositeTurnKey = stoneTypes.WHITE
                return turns[oppositeTurnKey]
            } else if(currentTurnKey === stoneTypes.WHITE){
                const oppositeTurnKey = stoneTypes.BLACK
                return turns[oppositeTurnKey]
            }
        },
        next : () => {
            if(currentTurnKey === stoneTypes.BLACK){
                currentTurnKey = stoneTypes.WHITE
            } else if(currentTurnKey === stoneTypes.WHITE){
                currentTurnKey = stoneTypes.BLACK
            }
            isLogged = false
        },
        getIsEnd : () => isEnd,
        setIsEnd : (nextIsEnd) => { isEnd = nextIsEnd },
        log : () => {
            if(isLogged === false){
                const currentTurn = turns[currentTurnKey]
                console.log(`
                턴 : ${currentTurn.stoneType}        
                소유자 : ${currentTurn.playerType}            
                `)
                isLogged = true
            }
        }
    })
}

export default turnCreator