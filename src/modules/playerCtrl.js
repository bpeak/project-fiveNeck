const playerCtrl = {
    getMatrixFromMousePos : (mouseX, mouseY, board, boardConfig) => {
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[0].length; j++){
                const startX = j * boardConfig.onePeaceWidth
                const endX = startX + boardConfig.onePeaceWidth
                const startY = i * boardConfig.onePeaceHeight
                const endY = startY + boardConfig.onePeaceHeight
                if(mouseX >= startX && mouseX < endX && mouseY >= startY && mouseY <= endY){
                    return ({
                        row : i,
                        col : j,
                    })
                    // const currentTurn = turnManager.get()
                    // if(board[i][j] !== stoneTypes.EMPTY){ return }
                    // boardManager.updateBoard(i, j, currentTurn.stoneType)
                    // turnManager.setIsEnd(true)
                }
            }
        }            
    }
}

export default playerCtrl