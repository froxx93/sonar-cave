const Control = {};

const KEY_LEFT =

Control.keyDown = (e, gp) => {
    if (Control.keyIsInUse(e.key)) {
        const index = gp.pressedKeys.indexOf(e.key);
        if (index == -1) {
            gp.pressedKeys.push(e.key);
        }
    }
}

Control.keyUp = (e, gp) => {
    if (Control.keyIsInUse(e.key)) {
        const index = gp.pressedKeys.indexOf(e.key);
        gp.pressedKeys.splice(index, 1);
    }
}

Control.keyIsInUse = (key) => {
    switch (key) {
        case "a":
        case "ArrowLeft":
        case "d":
        case "ArrowRight":
        case "w":
        case "ArrowUp":
        case "s":
        case "ArrowDown":
        case " ":
            return true;
        default:
            return false;
    }
}
