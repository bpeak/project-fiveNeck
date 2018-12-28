import * as stoneTypes from '../constants/stoneTypes'

const AI = {
    getPossiblePoss : (board, stoneType) => {
        const possiblePoss = []
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[0].length; j++){
                if(board[i][j] === stoneTypes.EMPTY){
                    possiblePoss.push({
                        row : i,
                        col : j
                    })
                }
            }
        }
        return possiblePoss
    },
    getPlaceableMatrices : (board) => {
        const placeableMatrices = []
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[0].length; j++){
                if(board[i][j] === stoneTypes.EMPTY){
                    placeableMatrices.push({
                        row : i,
                        col : j
                    })
                }
            }
        }
        return placeableMatrices
    },
    calculateBoard : (board) => {

    },
    evaluateBoard : (board, currentStoneType, oppositeStoneType) => {
        const points = []
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[0].length; j++){
                if(board[i][j] !== currentStoneType){ continue }

                //ㅡㅡㅡㅡㅡ가로ㅡㅡㅡㅡㅡ
                //1)5목가능여부
                //2)점수
                let horiPossibleCount = 1
                let horiPoint = 2
                let horiCount = 1
                let horiLeftEmptySwitch = false
                let horiRightEmptySwitch = false

                //5목가능여부
                for(let horiLeft = 1; j - horiLeft >= 0; horiLeft++){
                    const row = i
                    const col = j - horiLeft
                    if(board[row][col] === oppositeStoneType){ break }
                    horiPossibleCount++
                }
                for(let horiRight = 1; j + horiRight <= board[0].length - 1; horiRight++){
                    const row = i
                    const col = j + horiRight
                    if(board[row][col] === oppositeStoneType){ break }
                    horiPossibleCount++
                }

                if(horiPossibleCount < 5){
                    //가로5목불가
                    console.log(`${i}행 : ${j}열 의돌은 가로 5목이 될수 없습니다. : 0점`)
                } else {
                    //가로5목가능
                    for(let horiLeft = 1; true; horiLeft++){
                        const row = i
                        const col = j - horiLeft
                        if(col < 0){
                            if(horiLeftEmptySwitch === false){ horiPoint-- }
                            break;
                        }
                        if(board[row][col] === currentStoneType){
                            horiCount++
                            horiPoint++
                        }
                        if(board[row][col] === oppositeStoneType){
                            if(horiLeftEmptySwitch === false){ horiPoint-- }
                            break;
                        }
                        if(board[row][col] === stoneTypes.EMPTY){
                            if(horiLeftEmptySwitch === true){ break }
                            horiLeftEmptySwitch = true
                            continue
                        }
                    }
                    for(let horiRight = 1; true; horiRight++){
                        const row = i
                        const col = j + horiRight
                        if(col > board[0].length - 1){
                            if(horiRightEmptySwitch === true){ break }
                            horiPoint--
                            break;
                        } else {
                            if(board[row][col] === currentStoneType){
                                horiPoint++
                                horiCount++
                            }
                            if(board[row][col] === oppositeStoneType){
                                if(horiRightEmptySwitch === false){ horiPoint --}
                                break;
                            }
                            if(board[row][col] === stoneTypes.EMPTY){
                                if(horiRightEmptySwitch === true){ break }
                                horiRightEmptySwitch = true
                                continue
                            }
                        }
                    }
                    if(horiCount >= 4 && horiPoint !== 5){
                        console.log("얘는 아닌데...")
                        horiPoint = 4
                    }                    
                }

                //세로
                //1)5목가능여부
                //2)점수
                let vertPossibleCount = 1
                let vertPoint = 2
                let vertCount = 1
                let vertTopEmptySwitch = false
                let vertBottomEmptySwitch = false

                for(let vertTop = 1; i - vertTop >= 0; vertTop++){
                    const row = i - vertTop
                    const col = j 
                    if(board[row][col] === oppositeStoneType){ break }
                    vertPossibleCount++
                }
                for(let vertBottom = 1; i + vertBottom <= board.length - 1; vertBottom++){
                    const row = i + vertBottom
                    const col = j
                    if(board[row][col] === oppositeStoneType){ break }
                    vertPossibleCount++
                }

                if(vertPossibleCount < 5){
                    //세로5목불가
                    console.log(`${i}행 : ${j}열은 세로 5목이 될수없습니다. 0점`)
                } else {
                    for(let vertTop = 1; true; vertTop++){
                        const row = i - vertTop
                        const col = j
                        if(row < 0){
                            if(vertTopEmptySwitch === false){ vertPoint -- }
                            break
                        }
                        if(board[row][col] === currentStoneType){
                            vertCount++
                            vertPoint++
                            continue
                        }
                        if(board[row][col] === oppositeStoneType){
                            if(vertTopEmptySwitch === false){ vertPoint-- }
                            break
                        }
                        if(board[row][col] === stoneTypes.EMPTY){
                            if(vertTopEmptySwitch === true){ break }
                            vertTopEmptySwitch = true
                            continue
                        }
                    }
                    for(let vertBottom = 1; true; vertBottom++){
                        const row = i + vertBottom
                        const col = j
                        if(row > board.length - 1){
                            if(vertBottomEmptySwitch === false){ vertPoint-- }
                            break
                        }
                        if(board[row][col] === currentStoneType){
                            vertPoint++
                            vertCount++
                            continue
                        }
                        if(board[row][col] === oppositeStoneType){
                            if(vertBottomEmptySwitch === false){ vertPoint-- }
                            break
                        }
                        if(board[row][col] === stoneTypes.EMPTY){
                            if(vertBottomEmptySwitch === true){ break }
                            vertBottomEmptySwitch = true
                            continue
                        }
                    }
                    if(vertCount >= 4 && vertPoint !== 5){
                        vertPoint = 4
                    }
                }

                let ltrbPossibleCount = 1
                let ltrbPoint = 2
                let ltrbCount = 1
                let ltrbFrontEmptySwitch = false
                let ltrbEndEmptySwitch = false

                //왼쪽위 => 오른쪽아래 5목가능여부
                for(let ltrbFront = 1; true; ltrbFront++){
                    const row = i - ltrbFront
                    const col = j - ltrbFront
                    if(row < 0 || col < 0 || board[row][col] === oppositeStoneType){ break }
                    ltrbPossibleCount++
                }
                for(let ltrbEnd = 1; true; ltrbEnd++){
                    const row = i + ltrbEnd
                    const col = j + ltrbEnd
                    if(row > board.length - 1 || col > board[0].length || board[row][col] === oppositeStoneType){ break }
                    ltrbPossibleCount++
                }

                if(ltrbPossibleCount < 5){
                    console.log(`불가능 : ${i}행 ${j}열 왼쪽위오른쪽아래 오목불가능`)
                    ltrbPoint = 0
                } else {
                    for(let ltrbFront = 1; true; ltrbFront++){
                        const row = i - ltrbFront
                        const col = j - ltrbFront
                        if(row < 0 || col < 0){
                            if(ltrbFrontEmptySwitch === false){ ltrbPoint -- }
                            break
                        }
                        if(board[row][col] === currentStoneType){
                            ltrbCount++
                            ltrbPoint++
                            continue
                        }
                        if(board[row][col] === oppositeStoneType){
                            if(ltrbFrontEmptySwitch === false){ ltrbPoint-- }
                            break
                        }
                        if(board[row][col] === stoneTypes.EMPTY){
                            if(ltrbFrontEmptySwitch === true){ break }
                            ltrbFrontEmptySwitch = true
                            continue
                        }
                    }
                    for(let ltrbEnd = 1; true; ltrbEnd++){
                        const row = i + ltrbEnd
                        const col = j + ltrbEnd
                        if(row > board.length - 1 || col > board[0].length - 1){
                            if(ltrbEndEmptySwitch === false){ ltrbPoint-- }
                            break
                        }
                        if(board[row][col] === currentStoneType){
                            ltrbPoint++
                            ltrbCount++
                            continue
                        }
                        if(board[row][col] === oppositeStoneType){
                            if(ltrbEndEmptySwitch === false) { ltrbPoint-- }
                            break
                        }
                        if(board[row][col] === stoneTypes.EMPTY){
                            if(ltrbEndEmptySwitch === true){ break }
                            ltrbEndEmptySwitch = true
                            continue
                        }
                    }
                    if(ltrbCount >= 4 && ltrbPoint !== 5){
                        ltrbPoint = 4
                        console.log("돌갯수 4개보다큰데 5점이아님 ( 뭔가로막힘 ) 4포인트로 고정합니다")
                    }                    
                }

                //왼쪽아래 => 오른쪽위
                let lbrtPossibleCount = 1
                let lbrtPoint = 2
                let lbrtCount = 1
                let lbrtFrontEmptySwitch = false
                let lbrtEndEmptySwitch = false

                //5목가능여부
                for(let lbrtFront = 1; true; lbrtFront++){
                    const row = i + lbrtFront
                    const col = j - lbrtFront
                    if(row > board.length - 1 || col < 0 || board[row][col] === oppositeStoneType){ break }
                    lbrtPossibleCount++
                }
                for(let lbrtEnd = 1; true; lbrtEnd++){
                    const row = i - lbrtEnd
                    const col = j + lbrtEnd
                    if(row < 0 || col > board[0].length - 1|| board[row][col] === oppositeStoneType){ break }
                    lbrtPossibleCount++
                }

                if(lbrtPossibleCount < 5){
                    lbrtPoint = 0
                } else {
                    for(let lbrtFront = 1; true; lbrtFront++){
                        const row = i + lbrtFront
                        const col = j - lbrtFront
                        if(row > board.length - 1 || col < 0){
                            if(lbrtFrontEmptySwitch === false){ lbrtPoint -- }
                            break
                        }
                        if(board[row][col] === currentStoneType){
                            lbrtCount++
                            lbrtPoint++
                            continue
                        }
                        if(board[row][col] === oppositeStoneType){
                            if(lbrtFrontEmptySwitch === false){ lbrtPoint-- }
                            break
                        }
                        if(board[row][col] === stoneTypes.EMPTY){
                            if(lbrtFrontEmptySwitch === true){ break }
                            lbrtFrontEmptySwitch = true
                            continue
                        }
                    }
                    for(let lbrtEnd = 1; true; lbrtEnd++){
                        const row = i - lbrtEnd
                        const col = j + lbrtEnd
                        if(row < 0 || col > board[0].length - 1){
                            if(lbrtEndEmptySwitch === false){ lbrtPoint-- }
                            break
                        }
                        if(board[row][col] === currentStoneType){
                            lbrtPoint++
                            lbrtCount++
                            continue
                        }
                        if(board[row][col] === oppositeStoneType){
                            if(lbrtEndEmptySwitch === false) { lbrtPoint-- }
                            break
                        }
                        if(board[row][col] === stoneTypes.EMPTY){
                            if(lbrtEndEmptySwitch === true){ break }
                            lbrtEndEmptySwitch = true
                            continue
                        }
                    }
                    if(lbrtCount >= 4 && lbrtPoint !== 5){
                        lbrtPoint = 4
                        console.log("돌갯수 4개보다큰데 5점이아님 ( 뭔가로막힘 ) 4포인트로 고정합니다")
                    }                     
                }

                console.log(`${i}행 ${j}열`)
                // if(horiPoint >= 4 && vertPoint >= 4){
                //     console.log("쌍무언가네")
                // }
                console.log(`
                가로 : ${horiPoint}, 
                세로 : ${vertPoint}, 
                왼쪽▲오른쪽▼ : ${ltrbPoint}
                왼쪽▼오른쪽▲ : ${lbrtPoint}
                `)
            }
        }
        return points
    },
}

export default AI

