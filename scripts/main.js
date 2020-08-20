let layout = [
    [1, 0, 0, 2],
    [1, 0, 0, 2],
    [3, 5, 5, 4],
    [3, 6, 7, 4],
    [8, 10, 11, 9]
]

const origin = [0, 0];

const pieceIndex = {
    0: "caocao",
    1: "zhangfei",
    2: "machao",
    3: "huangzhong",
    4: "zhaoyun",
    5: "guanyu",
    6: "zu1",
    7: "zu2",
    8: "zu3",
    9: "zu4",
    10: "chessboard1",
    11: "chessboard2"
};


let piecePos = {};

window.onload = function () {
    renderInterface();
    renderChessboard(layout);
}

window.onresize = function () {
    renderInterface();
    renderChessboard(layout);
}

function renderInterface() {
    // chessboard.style.display = "none";
    // Get the height and width of screen
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    unit = Math.floor(screenHeight / 7);

    // Adjust the positon of the chessboard
    var chessboard = document.getElementById("chessboard");
    // chessboard.style.borderStyle = "solid";
    // chessboard.style.borderWidth = 2 + "px";
    chessboard.style.background = "url(images/blank.jpg)"
    chessboard.style.cursor = "pointer";
    chessboard.style.position = "relative";
    chessboard.style.width = 4 * unit + "px";
    chessboard.style.height = 5 * unit + "px";
    origin[0] = (screenWidth - 4 * unit) * 5 / 6;
    origin[1] = (screenHeight - 5 * unit) / 2;
    if (origin[0] < 7 * unit) {
        origin[0] = 7 * unit;
    }
    chessboard.style.left = origin[0] + "px";
    chessboard.style.top = origin[1] + "px";

    var background = document.getElementById("chessBackground");
    background.style.width = 8 * unit + "px";
    background.style.height = 7 * unit + "px";
    background.style.display = "inline";
    background.style.position = "absolute";
    background.style.left = -1.93 * unit + origin[0] + "px";
    background.style.top = -0.7 * unit + origin[1] + "px";

    // chessboard.style.display = "block";
    var selectArea = document.getElementById("selectArea");
    var selectAreaHeight = 5;
    var selectAreaWidth = 6;
    selectArea.style.position = "absolute";
    selectArea.style.width = selectAreaWidth * unit + "px";
    selectArea.style.height = selectAreaHeight * unit + "px";
    selectArea.style.left = (origin[0] - selectAreaWidth * unit) / 2 + "px";
    selectArea.style.top = origin[1] + "px";

    var hrd = document.getElementById("hrd");
    hrd.style.textAlign = "center";
    hrd.style.display = "block";
    hrd.style.margin = 0 + "px";
    hrd.style.fontSize = unit / 4 + "px";
    hrd.draggable = false

    var inputCaocao = document.getElementById("inputCaocao");
    inputCaocao.style.width = 2 * unit + "px";
    inputCaocao.style.height = 2 * unit + "px";
    inputCaocao.style.position = "absolute";
    inputCaocao.style.top = 1.5 * unit + "px";
    inputCaocao.draggable = false

    var selectCaocao = document.getElementById("selectCaocao");
    selectCaocao.style.width = 2 * unit + "px";
    selectCaocao.style.height = 2 * unit + "px";
    selectCaocao.style.display = "inline";
    selectCaocao.style.cursor = "pointer";
    selectCaocao.draggable = false

    var fileInput = document.getElementById("file-input");
    fileInput.style.width = 2 * unit + "px";
    fileInput.style.height = 2 * unit + "px";
    fileInput.draggable = false

    var zu = document.getElementById("selectZu");
    zu.style.width = 0.8 * unit + "px";
    zu.style.height = 0.8 * unit + "px";
    zu.style.position = "absolute";
    zu.style.top = 1.5 * unit + "px";
    zu.style.left = (2 + 1.2) * unit + "px";
    zu.style.display = "inline";
    zu.style.cursor = "pointer";
    zu.draggable = false

    var guanyu = document.getElementById("selectHorizon");
    guanyu.style.width = 1.6 * unit + "px";
    guanyu.style.height = 0.8 * unit + "px";
    guanyu.style.position = "absolute";
    guanyu.style.top = (1.5 + 2 - 0.8) * unit + "px";
    guanyu.style.left = (2 + 0.8) * unit + "px";
    guanyu.style.display = "inline";
    guanyu.style.cursor = "pointer";
    guanyu.draggable = false

    var verti = document.getElementById("selectVertical");
    verti.style.width = 0.8 * unit + "px";
    verti.style.height = 1.6 * unit + "px";
    verti.style.position = "absolute";
    verti.style.top = (1.5 + (2 - 1.6) / 2) * unit + "px";
    verti.style.left = (2.8 + 1.6 + 0.8) * unit + "px";
    verti.style.display = "inline";
    verti.style.cursor = "pointer";
    verti.draggable = false

    var zuPrev = document.getElementById("zuPrev");
    zuPrev.style.width = 0.6 * unit + "px";
    zuPrev.style.height = 0.6 * unit + "px";
    zuPrev.style.position = "absolute";
    zuPrev.style.top = (1.5 + 0.1) * unit + "px";
    zuPrev.style.left = (2 + 0.4) * unit + "px";
    zuPrev.style.display = "inline";
    zuPrev.style.cursor = "pointer";
    zuPrev.draggable = false

    var zuNext = document.getElementById("zuNext");
    zuNext.style.width = 0.6 * unit + "px";
    zuNext.style.height = 0.6 * unit + "px";
    zuNext.style.position = "absolute";
    zuNext.style.top = (1.5 + 0.1) * unit + "px";
    zuNext.style.left = (2 + 0.4 + 0.6 + 0.2 + 0.8 + 0.2) * unit + "px";
    zuNext.style.display = "inline";
    zuNext.style.cursor = "pointer";
    zuNext.draggable = false

    var horizonPrev = document.getElementById("horizonPrev");
    horizonPrev.style.width = 0.6 * unit + "px";
    horizonPrev.style.height = 0.6 * unit + "px";
    horizonPrev.style.position = "absolute";
    horizonPrev.style.top = (1.5 + 2 - 0.6 - 0.1) * unit + "px";
    horizonPrev.style.left = (2 + 0.8 - 0.1 - 0.6) * unit + "px";
    horizonPrev.style.display = "inline";
    horizonPrev.style.cursor = "pointer";
    horizonPrev.draggable = false

    var horizonNext = document.getElementById("horizonNext");
    horizonNext.style.width = 0.6 * unit + "px";
    horizonNext.style.height = 0.6 * unit + "px";
    horizonNext.style.position = "absolute";
    horizonNext.style.top = (1.5 + 2 - 0.6 - 0.1) * unit + "px";
    horizonNext.style.left = (2 + 0.8 + 1.6 + 0.1) * unit + "px";
    horizonNext.style.display = "inline";
    horizonNext.style.cursor = "pointer";
    horizonNext.draggable = false

    var verticalPrev = document.getElementById("verticalPrev");
    verticalPrev.style.width = 0.6 * unit + "px";
    verticalPrev.style.height = 0.6 * unit + "px";
    verticalPrev.style.position = "absolute";
    verticalPrev.style.top = (1.5 - 0.6) * unit + "px";
    verticalPrev.style.left = (2 + 0.8 + 1.6 + 0.8 + 0.1) * unit + "px";
    verticalPrev.style.display = "inline";
    verticalPrev.style.cursor = "pointer";
    verticalPrev.draggable = false

    var verticalNext = document.getElementById("verticalNext");
    verticalNext.style.width = 0.6 * unit + "px";
    verticalNext.style.height = 0.6 * unit + "px";
    verticalNext.style.position = "absolute";
    verticalNext.style.top = (1.5 + 0.2 + 1.6 + 0.2) * unit + "px";
    verticalNext.style.left = (2 + 0.8 + 1.6 + 0.8 + 0.1) * unit + "px";
    verticalNext.style.display = "inline";
    verticalNext.style.cursor = "pointer";
    verticalNext.draggable = false
}

function renderChessboard(layout) {
    let tempLayout = layout.map(array => array.slice())

    for (let i = 0; i < tempLayout.length; i++) {
        for (let j = 0; j < tempLayout[0].length; j++) {
            let id = tempLayout[i][j];

            if (id < 0) {
                continue;
            }

            let piece = document.getElementById(pieceIndex[id]);
            if (id === 0) {
                renderBigSquare(piece, i, j, tempLayout);
                piecePos[piece.id] = [i, j];
            } else if (id >= 1 && id <= 4) {
                renderVertical(piece, i, j, tempLayout);
                piecePos[piece.id] = [i, j];
            } else if (id === 5) {
                renderHorizontal(piece, i, j, tempLayout);
                piecePos[piece.id] = [i, j];
            } else {
                renderSquare(piece, i, j, tempLayout);
                piecePos[piece.id] = [i, j];
            }
            piece.style.zIndex = "1"
        }
    }
}

function renderBigSquare(chess, i, j, tempLayout) {    // Render the chesses
    chess.style.position = "absolute";
    chess.style.width = 2 * unit + "px";
    chess.style.height = 2 * unit + "px";
    chess.style.left = j * unit + "px";
    chess.style.top = i * unit + "px";
    chess.style.display = "inline";
    tempLayout[i + 1][j] = -1;
    tempLayout[i + 1][j + 1] = -1;
    tempLayout[i][j + 1] = -1;
}

function renderVertical(chess, i, j, tempLayout) {
    chess.style.position = "absolute";
    chess.style.height = 2 * unit + "px";
    chess.style.width = unit + "px";
    chess.style.left = j * unit + "px";
    chess.style.top = i * unit + "px";
    chess.style.display = "inline";
    tempLayout[i + 1][j] = -1;
}

function renderHorizontal(chess, i, j, tempLayout) {
    chess.style.position = "absolute";
    chess.style.width = 2 * unit + "px";
    chess.style.height = unit + "px";
    chess.style.left = j * unit + "px";
    chess.style.top = i * unit + "px";
    chess.style.display = "inline";
    tempLayout[i][j + 1] = -1;
}

function renderSquare(chess, i, j, tempLayout) {
    chess.style.position = "absolute";
    chess.style.width = unit + "px";
    chess.style.height = unit + "px";
    chess.style.left = j * unit + "px";
    chess.style.top = i * unit + "px";
    chess.style.display = "inline";
    if (chess.id === "chessboard1" || chess.id === "chessboard2") {
        chess.draggable = false
        chess.style.cursor = "default"
    }
}

document.getElementById("chessboard").addEventListener("mousedown", function (event) {
    let target = event.target
    event.preventDefault()
    let pos1 = 0, pos2 = 0, pos3 = event.clientX, pos4 = event.clientY, z = target.style.zIndex
    let move = function (event) {
        pos1 = pos3 - event.clientX
        pos2 = pos4 - event.clientY
        pos3 = event.clientX
        pos4 = event.clientY
        target.style.zIndex = "999"
        target.style.top = target.offsetTop - pos2 + "px"
        target.style.left = target.offsetLeft - pos1 + "px"
    }
    let stop = function (event) {
        document.removeEventListener("mousemove", move)
        document.removeEventListener("mouseup", stop)
        target.style.zIndex = "0"
        const mouseX = Math.floor((event.clientX - origin[0]) / unit);
        const mouseY = Math.floor((event.clientY - origin[1]) / unit);
        const pieceX = piecePos[target.id][1]
        const pieceY = piecePos[target.id][0]

        let elementDown = document.elementFromPoint(event.clientX, event.clientY)
        const diffX = Math.abs(pieceX - mouseX)
        const diffY = Math.abs(pieceY - mouseY)


        if (elementDown.id === "chessboard1" || elementDown.id === "chessboard2") {
            if (target.className === "zu" && ((diffX === 1 && diffY === 0)
                || (diffY === 1 && diffX === 0))) {
                const temp = layout[mouseY][mouseX]
                layout[mouseY][mouseX] = layout[pieceY][pieceX]
                layout[pieceY][pieceX] = temp
            } else if (target.className === "vertical") {
                if (diffX === 0) {
                    if (diffY === 1) {
                        const temp = layout[mouseY][mouseX]
                        layout[mouseY][mouseX] = layout[pieceY + 1][pieceX]
                        layout[pieceY + 1][pieceX] = temp
                    } else if (mouseY - pieceY === 2) {
                        const temp = layout[mouseY][mouseX]
                        layout[mouseY][mouseX] = layout[pieceY][pieceX]
                        layout[pieceY][pieceX] = temp
                    }
                } else if (diffX === 1) {
                    if (mouseX > pieceX && (layout[pieceY][pieceX + 1] > 9 && layout[pieceY + 1][pieceX + 1] > 9)) {
                        let temp = layout[pieceY][pieceX + 1]
                        layout[pieceY][pieceX + 1] = layout[pieceY][pieceX]
                        layout[pieceY][pieceX] = temp

                        temp = layout[pieceY + 1][pieceX]
                        layout[pieceY + 1][pieceX] = layout[pieceY + 1][pieceX + 1]
                        layout[pieceY + 1][pieceX + 1] = temp
                    } else if (mouseX < pieceX && (layout[pieceY][pieceX - 1] > 9 && layout[pieceY + 1][pieceX - 1] > 9)) {
                        let temp = layout[pieceY][pieceX - 1]
                        layout[pieceY][pieceX - 1] = layout[pieceY][pieceX]
                        layout[pieceY][pieceX] = temp

                        temp = layout[pieceY + 1][pieceX]
                        layout[pieceY + 1][pieceX] = layout[pieceY + 1][pieceX - 1]
                        layout[pieceY + 1][pieceX - 1] = temp
                    }
                }
            } else if (target.id === "guanyu") {
                if (diffY === 0) {
                    if (diffX === 1) {
                        const temp = layout[mouseY][mouseX]
                        layout[mouseY][mouseX] = layout[pieceY][pieceX + 1]
                        layout[pieceY][pieceX + 1] = temp
                    } else if (mouseX - pieceX === 2) {
                        const temp = layout[mouseY][mouseX]
                        layout[mouseY][mouseX] = layout[pieceY][pieceX]
                        layout[pieceY][pieceX] = temp
                    }
                } else if (diffY === 1) {
                    if (mouseY > pieceY && (layout[pieceY + 1][pieceX] > 9 && layout[pieceY + 1][pieceX + 1] > 9)) {
                        let temp = layout[pieceY + 1][pieceX]
                        layout[pieceY + 1][pieceX] = layout[pieceY][pieceX]
                        layout[pieceY][pieceX] = temp

                        temp = layout[pieceY][pieceX + 1]
                        layout[pieceY][pieceX + 1] = layout[pieceY + 1][pieceX + 1]
                        layout[pieceY + 1][pieceX + 1] = temp
                    } else if (mouseY < pieceY && (layout[pieceY - 1][pieceX] > 9 && layout[pieceY - 1][pieceX + 1] > 9)) {
                        let temp = layout[pieceY - 1][pieceX]
                        layout[pieceY - 1][pieceX] = layout[pieceY][pieceX]
                        layout[pieceY][pieceX] = temp

                        temp = layout[pieceY][pieceX + 1]
                        layout[pieceY][pieceX + 1] = layout[pieceY - 1][pieceX + 1]
                        layout[pieceY - 1][pieceX + 1] = temp
                    }
                }
            } else {
                if (mouseY < pieceY && layout[pieceY - 1][pieceX] + layout[pieceY - 1][pieceX + 1] > 20) {
                    layout[pieceY - 1][pieceX] = 0
                    layout[pieceY - 1][pieceX + 1] = 0
                    layout[pieceY + 1][pieceX] = 10
                    layout[pieceY + 1][pieceX + 1] = 11
                } else if (mouseY > pieceY && layout[pieceY + 2][pieceX] + layout[pieceY + 2][pieceX + 1] > 20) {
                    layout[pieceY + 2][pieceX] = 0
                    layout[pieceY + 2][pieceX + 1] = 0
                    layout[pieceY][pieceX] = 10
                    layout[pieceY][pieceX + 1] = 11
                } else if (mouseX < pieceX && layout[pieceY][pieceX - 1] + layout[pieceY + 1][pieceX - 1] > 20) {
                    layout[pieceY][pieceX - 1] = 0
                    layout[pieceY + 1][pieceX - 1] = 0
                    layout[pieceY + 1][pieceX + 1] = 10
                    layout[pieceY][pieceX + 1] = 11
                } else if (mouseX > pieceX && layout[pieceY][pieceX + 2] + layout[pieceY + 1][pieceX + 2] > 20) {
                    layout[pieceY][pieceX + 2] = 0
                    layout[pieceY + 1][pieceX + 2] = 0
                    layout[pieceY][pieceX] = 10
                    layout[pieceY + 1][pieceX] = 11
                }
            }
        }

        target.style.zIndex = z
        renderChessboard(layout)
    }
    if (target.id !== "chessboard1" && target.id !== "chessboard2") {
        document.addEventListener("mousemove", move)
        document.addEventListener("mouseup", stop)
    }
})


document.getElementById("file-input").addEventListener("change", function (event) {
    let file = event.target.files[0];
    saveImg(file, document.getElementById("caocao"));
    saveImg(file, document.getElementById("selectCaocao"));
})


function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

let zuIndex = ["zu1", "zu2", "zu3", "zu4"];
let verticalIndex = ["zhangfei", "machao", "huangzhong", "zhaoyun"];

let selectors = document.getElementsByClassName("selector")
for (let selector of selectors) {
    selector.addEventListener("click", function (event) {
        let target = event.target
        if (target.id === "selectHorizon") {
            document.getElementById("guanyu").src = target.src
        } else if (target.id === "selectZu") {
            let zu = zuIndex.shift()
            document.getElementById(zu).src = target.src
            zuIndex.push(zu)
        } else {
            let vertical = verticalIndex.shift()
            document.getElementById(vertical).src = target.src
            verticalIndex.push(vertical)
        }
    })
}

let zu = [];
for (let i = 1; i < 25; i++) {
    zu.push(i.toString() + ".jpg");
}
zu = shuffle(zu);

let horizon = [];
for (let i = 1; i < 22; i++) {
    horizon.push(i.toString() + ".jpg");
}
horizon = shuffle(horizon);

let vertical = [];
for (let i = 1; i < 20; i++) {
    vertical.push(i.toString() + ".jpg");
}
vertical = shuffle(vertical);

let prevs = document.getElementsByClassName("prev")
for (let prev of prevs) {
    prev.addEventListener("click", function (event) {
        let target = event.target
        if (target.id === "zuPrev") {
            let image = zu.shift()
            document.getElementById("selectZu").src = "images/zu/" + image
            zu.push(image)
        } else if (target.id === "verticalPrev") {
            let image = vertical.shift()
            document.getElementById("selectVertical").src = "images/vertical/" + image
            vertical.push(image)
        } else {
            let image = horizon.shift();
            document.getElementById("selectHorizon").src = "images/horizon/" + image
            horizon.push(image)
        }
    })
}

let nexts = document.getElementsByClassName("next")
for (let next of nexts) {
    next.addEventListener("click", function (event) {
        let target = event.target
        if (target.id === "zuNext") {
            let image = zu.shift()
            document.getElementById("selectZu").src = "images/zu/" + image
            zu.push(image)
        } else if (target.id === "verticalNext") {
            let image = vertical.shift()
            document.getElementById("selectVertical").src = "images/vertical/" + image
            vertical.push(image)
        } else {
            let image = horizon.shift();
            document.getElementById("selectHorizon").src = "images/horizon/" + image
            horizon.push(image)
        }
    })
}