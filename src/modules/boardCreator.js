import * as stoneTypes from '../constants/stoneTypes'

const boardCreator = (row, col) => {
    let board = []
    const boardCol = []
    for(let i = 0; i < col; i++){
        boardCol.push(stoneTypes.EMPTY)
    }
    for(let i = 0; i < row; i++){
        board.push(JSON.parse(JSON.stringify(boardCol)))
    }
    return ({
        getBoard : () => {
            return board
        },
        updateBoard : (row, col, stoneNum) => {
            const newBoard = JSON.parse(JSON.stringify(board))
            newBoard[row][col] = stoneNum
            board = newBoard
        },
        copyBoard : () => {
            const copiedBoard = JSON.parse(JSON.stringify(board))
            return copiedBoard
        },
    })
}

export default boardCreator