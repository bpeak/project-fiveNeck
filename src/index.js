/*

    기본적인건 다짯는데 어떤걸 이제 건드러야하냐면
    4개짜리돌인데 5점아닌걸 지금 퉁으로 묵었거든?
    근데 내가 원하는거는 4점짜리돌인데 아무쪽으로도 막혀있지도않고 빈공간도 없는애만 해당 점수를 주고싶고
    나머지4 O?OOO 나 OO?OO XOOOO 같은애들 있지 이런애들말이야 이런애들은 묶어서 하나의점수로주고싶은데
    이런애들 특징은 O?OOOO 이런식으로 될수도 있다는거야ㅇㅋ?
    그래 그리고 4개이상인데 5점아니라고하면

    XOO?OOX  이거랑
    XOO?O?O 얘도아마 그걸로될걸?
    이거를 어떻게 나눌지를 이제 고민해봐야되는건가.....

    일단 그전에 먼저 해결할게있어
    양쪽으로 공백이있는경우는 어떡할거야?
    가령 O?O?OO 이런경우나
    O?OO?OO 공백한번이랑 두번은 아예 다른돌로 생각해야되는거잖아
    OO?O?OOO 이런경우는? ?
    최대값으로 하면 되려나 ?
    그럼 포인트를 나눠야되네 ㅅㅂ.....
    왼쪽포인트 오른쪽포인트로 계산해서
    만약 서로공백없으면 두개더한게 최종포인트고
    만약 공백이 한쪽만있으면?
    그것도 지금이랑 똑같아
    근데만약에 둘다공백이 존재한다
    그럼 두개의 포인트중 최대값으로 해당돌의 가로포인트르 정하자
    OOO?OOOO 여기서만약에 3번째 동그라미에 놓은경우라면 이건 어떻게계산해야하지? 그럴일은없지만

    OO?OOO 이경우라치면? 이것도없네

    O?OO 이경우라치면? 



    */




// import boardManager from './modules/boardManager'
import AI from './modules/AI'
import playerCtrl from './modules/playerCtrl'
import gameManagerCreator from './modules/gameManagerCreator'
import boardCreator from './modules/boardCreator'
import turnCreator from './modules/turnCreator'
import * as playerTypes from './constants/playerTypes'
import canvasConfig from './configs/canvasConfig.json'
import mouseCreator from './modules/mouseCreator'
import boardPeaceImgSrc from '../img/123.png'
import white from '../img/white.png'
import black from "../img/black.png"
import * as stoneTypes from './constants/stoneTypes'
import * as turnTypes from './constants/turnTypes'

// mainCavnas
const mainCanvas = document.getElementById("omokCanvas")
const mainCtx = mainCanvas.getContext("2d")
mainCanvas.width = canvasConfig.width
mainCanvas.height = canvasConfig.height
// bufferCanvas
const bufferCanvas = document.createElement("canvas")
const bufferCtx = bufferCanvas.getContext("2d")
bufferCanvas.width = mainCanvas.width
bufferCanvas.height = mainCanvas.height

const boardRows = 19
const boardCols = 19
const gameManager = gameManagerCreator()
const boardManager = boardCreator(boardRows, boardCols)
const mouseManager = mouseCreator()
const turnManager = turnCreator({
    [stoneTypes.BLACK] : playerTypes.USER,
    [stoneTypes.WHITE] : playerTypes.USER,
})

const boardConfig = {
    width : mainCanvas.width,
    height : mainCanvas.height,
    onePeaceWidth : mainCanvas.width / boardCols,
    onePeaceHeight : mainCanvas.height / boardRows,
}
const stoneConfig = {
    width : boardConfig.onePeaceWidth / 1.2,
    height : boardConfig.onePeaceHeight / 1.2,
}

const boardPeaceImg = new Image()
boardPeaceImg.src = boardPeaceImgSrc

const whiteImg = new Image()
const path = require("path")
const ddr = path.join('file:///C:/node/projects/omok', __dirname, white)
whiteImg.src = 'file:///C:/node/projects/omok/public/imgs/white.png'
const blackImg = new Image()
blackImg.src = 'file:///C:/node/projects/omok/public/imgs/black.png'

document.getElementById("btnShowStonePoint").addEventListener("click", (e) => {
    console.log(123)
})

mainCanvas.addEventListener("click", (e) => {
    const currentTurn = turnManager.getTurn()
    const { playerType } = currentTurn
    if(playerType === playerTypes.USER){
        const mouseX = e.offsetX
        const mouseY = e.offsetY
        const name = "click"
        mouseManager.saveEvent({
            x : mouseX,
            y : mouseY,
            name : name,
        })
    }
})

// mainCanvas.addEventListener("contextmenu", (e) => {
//     e.preventDefault()
//     const mouseX = e.offsetX
//     const mouseY = e.offsetY
//     const name = "rightClick"
//     mouseManager.saveEvent({
//         x : mouseX,
//         y : mouseY,
//         name : name,
//     })
// })

// mainCanvas.addEventListener("mouseover", (e) => {
//     mouse.isIn = true
// })

// mainCanvas.addEventListener("mouseout", (e) => {
//     mouse.isIn = false
// })

// mainCanvas.addEventListener("mousemove", (e) => {
//     mouse.x = e.offsetX
//     mouse.y = e.offsetY
// })

const omokChecker = (stoneType) => {
    const board = boardManager.getBoard()
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[0].length; j++){
            const color = stoneType
            if(board[i][j] !== color){ continue }
            // 왼쪽위to오른쪽아래 대각선
            let leftTopToRightBottom = 1
            for(let lt = 1; lt <= i && lt <= j; lt++){
                const row = i - lt
                const col = j - lt
                if(board[row][col] !== color){ break }
                leftTopToRightBottom ++
            }
            for(let rt = 1; rt <= board[0].length - j && rt < board.length - i; rt++){
                const row = i + rt
                const col = j + rt
                if(board[row][col] !== color){ break }
                leftTopToRightBottom ++
            }
            //왼쪽아래to오른쪽위 대각선
            let leftBottomToRightTop = 1
            for(let lb = 1; lb <= j && lb < board.length - i; lb++){
                const row = i + lb
                const col = j - lb
                if(board[row][col] !== color){ break }
                leftBottomToRightTop ++
            }
            //상하
            let updown = 1
            for(let u = 1; u <= i; u++){
                const row = i - u
                const col = j
                if(board[row][col] !== color){ break }
                updown ++
            }
            for(let d = 1; d < board.length - i; d++){
                const row = i + d
                const col = j
                if(board[row][col] !== color){ break }
                updown ++
            }
            //좌우
            let leftright = 1
            for(let l = 1; l <= j; l++){
                const row = i
                const col = j - l
                if(board[row][col] !== color){ break }
                leftright ++
            }
            for(let r = 1; r <= board[0].length - j; r++){
                const row = i
                const col = j + r
                if(board[row][col] !== color){ break }
                leftright ++
            }            
            if(updown >= 5 || leftright >= 5 || leftTopToRightBottom >= 5 || leftBottomToRightTop >= 5){
                return true
            } else {
                return false
            }
        }
    }
}

const update = () => {
    turnManager.log()
    const currentTurn = turnManager.getTurn()
    const currentBoard = boardManager.getBoard()
    if(currentTurn.playerType === playerTypes.COM){
        const placeableMatrices = AI.getPlaceableMatrices(currentBoard)
        const pointsCaseByMatrix = []
        // for(let i = 0; i < placeableMatrices.length; i++){
        //     const copiedBoard = boardManager.copyBoard()
        //     const { row, col } = placeableMatrices[i]
        //     copiedBoard[row][col] = currentTurn.stoneType
        //     const ddr = AI.evaluateBoard(copiedBoard, currentTurn.stoneType)
        //     pointsCaseByMatrix.push({
        //         row : row,
        //         col : col,
        //         points : ddr,
        //     })
        // }
        console.log(pointsCaseByMatrix)
        turnManager.setIsEnd(true)
    }
    if(currentTurn.playerType === playerTypes.USER){
        const mouseEvent = mouseManager.getEvent()
        if(mouseEvent === null){ return }
        if(mouseEvent.name === "click"){
            const mouseX = mouseEvent.x
            const mouseY = mouseEvent.y
            const clickMatrix = playerCtrl.getMatrixFromMousePos(mouseX, mouseY, currentBoard, boardConfig)
            if(currentBoard[clickMatrix.row][clickMatrix.col] !== stoneTypes.EMPTY){ return }
            boardManager.updateBoard(clickMatrix.row, clickMatrix.col, currentTurn.stoneType)
            mouseManager.consumeEvent()
            turnManager.setIsEnd(true)
        }
    }

    const points = AI.evaluateBoard(boardManager.getBoard(), currentTurn.stoneType, turnManager.getOppositeTurn().stoneType)
    console.log(points)

    if(turnManager.getIsEnd() === true){
        console.log("ㅡㅡㅡ해당턴 종료ㅡㅡㅡ")
        if(omokChecker(currentTurn.stoneType)){
            gameManager.setIsEnd(true)   
            gameManager.setWinner("기현")
        }
        turnManager.next()
        turnManager.setIsEnd(false)
    }
}

const draw = () => {
    //판, 돌
    const board = boardManager.getBoard()
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board.length; j++){
            const x = j * boardConfig.onePeaceWidth
            const y = i * boardConfig.onePeaceHeight
            const width = boardConfig.onePeaceWidth
            const height = boardConfig.onePeaceHeight
            bufferCtx.drawImage(boardPeaceImg, x, y, width, height)
            if(board[i][j] == stoneTypes.BLACK){
                bufferCtx.drawImage(blackImg, x + boardConfig.onePeaceWidth / 2 - stoneConfig.width/2, y + boardConfig.onePeaceWidth / 2 - stoneConfig.width/2, stoneConfig.width, stoneConfig.width)        
            } else if (board[i][j] == stoneTypes.WHITE){
                bufferCtx.drawImage(whiteImg, x + boardConfig.onePeaceWidth / 2 - stoneConfig.width/2, y + boardConfig.onePeaceWidth / 2 - stoneConfig.width/2, stoneConfig.width, stoneConfig.width)    
            }
        }
    }

    mainCtx.drawImage(bufferCanvas, 0, 0, mainCanvas.width, mainCanvas.height)

    const isGameEnd = gameManager.getIsEnd()
    if(isGameEnd){
        alert("끝")
    }
}


const gameLoop = () => {
    const isGameEnd = gameManager.getIsEnd()
    if(isGameEnd !== true){
        update()
        draw()
    }
    window.requestAnimationFrame(gameLoop)
}

// init()
gameLoop()