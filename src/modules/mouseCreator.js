const mouseCreator = () => {
    let mouseEvent = null
    let mouseX = 0
    let mouseY = 0
    let isMouseIn = false
    return ({
        getIsIn : () => {
            return isMouseIn
        },
        setIsIn : (nextIsMouseIn) => {
            isMouseIn = nextIsMouseIn
        },
        setX : (nextMouseX) => {
            mouseX = nextMouseX
        },
        setY : (nextMouseY) => {
            mouseY = nextMouseY
        },
        getX : () => {
            return mouseX
        },
        getY : () => {
            return mouseY
        },
        getEvent : () => {
            return mouseEvent
        },
        saveEvent : (nextMouseEvent) => {
            mouseEvent = nextMouseEvent
        },
        consumeEvent : () => {
            mouseEvent = null
        }
    })
}

export default mouseCreator