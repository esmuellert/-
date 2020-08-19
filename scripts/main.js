var layout = [
    [1, 0, 0, 2],
    [1, 0, 0, 2],
    [3, 5, 5, 4],
    [3, 6, 7, 4],
    [8, 10, 11, 9]
]

var origin = [0, 0];

var index = {
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


var inverseIndex = {
    "caocao": 0,
    "zhangfei": 1,
    "machao": 2,
    "huangzhong": 3,
    "zhaoyun": 4,
    "guanyu": 5,
    "zu1": 6,
    "zu2": 7,
    "zu3": 8,
    "zu4": 9,
    "chessboard1": 10,
    "chessboard2": 11,
}

var chessmanPos = new Array();

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

            let chessName = index[id];
            let chess = document.getElementById(chessName);
            if (id === 0) {
                renderBigSquare(chess, i, j, tempLayout);
                chessmanPos[id] = [i, j];
            } else if (id >= 1 && id <= 4) {
                renderVertical(chess, i, j, tempLayout);
                chessmanPos[id] = [i, j];
            } else if (id === 5) {
                renderHorizontal(chess, i, j, tempLayout);
                chessmanPos[id] = [i, j];
            } else {
                renderSquare(chess, i, j, tempLayout);
                chessmanPos[id] = [i, j];
            }

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
}

var chessman = 0;
var targ;
document.getElementById("chessboard").ondragstart = function (e) {
    e = event || window.event;
    if (e.target) targ = e.target
    else if (e.srcElement) targ = e.srcElement

    if (targ.nodeType == 3) // defeat Safari bug
        targ = targ.parentNode
    var tname
    tname = targ.id;
    if (tname == "") tname = "blank";
    chessman = inverseIndex[tname];

    if (tname != "blank") {
        document.addEventListener("mousemove", move);
    }
}

function move(e) {
    var currentarg = e.target;
    var targid = currentarg.id;
    var mouseX = Math.floor((e.clientX - origin[0]) / unit);
    var mouseY = Math.floor((e.clientY - origin[1]) / unit);
    if (targid == "chessboard1" || targid == "chessboard2") {
        var i = chessmanPos[chessman][0];
        var j = chessmanPos[chessman][1];
        var i10 = chessmanPos[10][0];
        var j10 = chessmanPos[10][1];
        var i11 = chessmanPos[11][0];
        var j11 = chessmanPos[11][1];

        if (chessman > 5 && chessman < 10) {
            if (Math.abs(mouseX - i + mouseY - j) == 1 && mouseX >= 0 && mouseX < 4 && mouseY >= 0 && mouseY < 5) {
                var temp = layout[i][j];
                layout[i][j] = layout[mouseY][mouseX];
                layout[mouseY][mouseX] = temp;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }
        } else if (chessman == 5) {
            var cond5h1 = (i10 - i == 1 && j10 == j && i11 - i == 1 && j11 - j == 1) || (i11 - i == 1 && j11 == j && i10 - i == 1 && j10 - j == 1);
            var cond5h2 = (i - i10 == 1 && j10 == j && i - i11 == 1 && j11 - j == 1) || (i - i11 == 1 && j11 == j && i - i10 == 1 && j10 - j == 1);
            if (cond5h1 || cond5h2) {
                layout[i][j] = 10;
                layout[i][j + 1] = 11;
                layout[i10][j10] = 5;
                layout[i11][j11] = 5;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            } else if (j - mouseX == 1 && i == mouseY) {
                if (mouseX == j10 && mouseY == i10) {
                    layout[i][j + 1] = 10;
                } else {
                    layout[i][j + 1] = 11;
                }
                layout[mouseY][mouseX] = chessman;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            } else if (mouseX - j == 2 && i == mouseY) {
                if (mouseX == j10 && mouseY == i10) {
                    layout[i][j] = 10;
                } else {
                    layout[i][j] = 11;
                }
                layout[mouseY][mouseX] = chessman;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }
        } else if (chessman > 0 && chessman < 5) {
            cond1v1 = (i == i10 && j + 1 == j10 && i + 1 == i11 && j + 1 == j11) || (i == i11 && j + 1 == j11 && i + 1 == i10 && j + 1 == j10);
            cond1v2 = (i == i10 && j - 1 == j10 && i + 1 == i11 && j - 1 == j11) || (i == i11 && j - 1 == j11 && i + 1 == i10 && j - 1 == j10);
            if (i - mouseY == 1 && j == mouseX) {
                if (mouseX == j10 && mouseY == i10) {
                    layout[i + 1][j] = 10;
                } else {
                    layout[i + 1][j] = 11;
                }
                layout[mouseY][mouseX] = chessman;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            } else if (mouseY - i == 2 && j == mouseX) {
                if (mouseX == j10 && mouseY == i10) {
                    layout[i][j] = 10;
                } else {
                    layout[i][j] = 11;
                }
                layout[mouseY][mouseX] = chessman;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            } else if (cond1v1 || cond1v2) {
                layout[i][j] = 10;
                layout[i + 1][j] = 11;
                layout[i10][j10] = chessman;
                layout[i11][j11] = chessman;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }
        } else if (chessman == 0) {
            if ((i - i10 == 1 && j == j10 && i - i11 == 1 && j + 1 == j11) || (i - i11 == 1 && j == j11 && i - i10 == 1 && j + 1 == j10)) {
                layout[i10][j10] = chessman;
                layout[i11][j11] = chessman;
                layout[i + 1][j] = 10;
                layout[i + 1][j + 1] = 11;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            } else if ((j - j10 == 1 && i == i10 && j - j11 == 1 && i11 - i == 1) || (j - j11 == 1 && i == i11 && j - j10 == 1 && i10 - i == 1)) {
                layout[i10][j10] = chessman;
                layout[i11][j11] = chessman;
                layout[i][j + 1] = 10;
                layout[i + 1][j + 1] = 11;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            } else if ((j10 - j == 2 && i10 == i && j11 - j == 2 && i11 - i == 1) || (j11 - j == 2 && i11 == i && j10 - j == 2 && i10 - i == 1)) {
                layout[i10][j10] = chessman;
                layout[i11][j11] = chessman;
                layout[i][j] = 10;
                layout[i + 1][j] = 11;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            } else if ((i10 - i == 2 && j10 == j && i11 - i == 2 && j11 - j == 1) || (i11 - i == 2 && j11 == j && i10 - i == 2 && j10 - j == 1)) {
                layout[i10][j10] = chessman;
                layout[i11][j11] = chessman;
                layout[i][j] = 10;
                layout[i][j + 1] = 11;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }
        }
    }
    document.removeEventListener("mousemove", move);
}

document.getElementById("chessboard").ondragenter = function (e) {
    e = event || window.event;
    e.preventDefault();
}

document.getElementById("chessboard").ondragover = function (e) {
    e = event || window.event;
    e.preventDefault();
}









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