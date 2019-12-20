var zuA = new Array();
for (var i = 1; i < 25; i++) {
    zuA.push(i.toString() + ".jpg");
}
zuA = shuffle(zuA);
var horizonA = new Array();
for (var i = 1; i < 22; i++) {
    horizonA.push(i.toString() + ".jpg");
}
horizonA = shuffle(horizonA);
var verticalA = new Array();
for (var i = 1; i < 20; i++) {
    verticalA.push(i.toString() + ".jpg");
}
verticalA = shuffle(verticalA);
var zu = new Deque(zuA);
var horizon = new Deque(horizonA);
var vertical = new Deque(verticalA);



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

var zuIndex = new Deque(["zu1", "zu2", "zu3", "zu4"]);
var verticalIndex = new Deque(["zhangfei", "machao", "huangzhong", "zhaoyun"]);

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
    unit = Math.floor(screenHeight / 6);

    // Adjust the positon of the chessboard
    var chessboard = document.getElementById("chessboard");
    chessboard.style.borderStyle = "solid";
    chessboard.style.borderWidth = 2 + "px";
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

    // chessboard.style.display = "block";
    var selectArea = document.getElementById("selectArea");
    selectArea.style.position = "absolute";
    selectArea.style.width = 6 * unit + "px";
    selectArea.style.height = 5 * unit + "px";
    selectArea.style.left = 0.5 * unit + "px";
    selectArea.style.top = origin[1] + "px";

    var hrd = document.getElementById("hrd");
    hrd.style.textAlign = "center";
    hrd.style.display = "block";

    var caocao = document.getElementById("selectCaocao");
    caocao.style.width = 2 * unit + "px";
    caocao.style.height = 2 * unit + "px";
    caocao.style.position = "absolute";
    caocao.style.top = 1.5 * unit + "px";
    caocao.style.display = "inline";
    caocao.style.cursor = "pointer";

    var caocao = document.getElementById("file-input");
    caocao.style.width = 2 * unit + "px";
    caocao.style.height = 2 * unit + "px";
    caocao.style.position = "absolute";
    caocao.style.top = 1.5 * unit + "px";


    var zu = document.getElementById("selectZu");
    zu.style.width = 0.8 * unit + "px";
    zu.style.height = 0.8 * unit + "px";
    zu.style.position = "absolute";
    zu.style.top = 1.5 * unit + "px";
    zu.style.left = (2 + 1.2) * unit + "px";
    zu.style.display = "inline";
    zu.style.cursor = "pointer";

    var guanyu = document.getElementById("selectHorizon");
    guanyu.style.width = 1.6 * unit + "px";
    guanyu.style.height = 0.8 * unit + "px";
    guanyu.style.position = "absolute";
    guanyu.style.top = (1.5 + 2 - 0.8) * unit + "px";
    guanyu.style.left = (2 + 0.8) * unit + "px";
    guanyu.style.display = "inline";
    guanyu.style.cursor = "pointer";

    var verti = document.getElementById("selectVertical");
    verti.style.width = 0.8 * unit + "px";
    verti.style.height = 1.6 * unit + "px";
    verti.style.position = "absolute";
    verti.style.top = (1.5 + (2 - 1.6) / 2) * unit + "px";
    verti.style.left = (2.8 + 1.6 + 0.8) * unit + "px";
    verti.style.display = "inline";
    verti.style.cursor = "pointer";

    var zuLeft = document.getElementById("zuLeft");
    zuLeft.style.width = 0.6 * unit + "px";
    zuLeft.style.height = 0.6 * unit + "px";
    zuLeft.style.position = "absolute";
    zuLeft.style.top = (1.5 + 0.1) * unit + "px";
    zuLeft.style.left = (2 + 0.4) * unit + "px";
    zuLeft.style.display = "inline";
    zuLeft.style.cursor = "pointer";

    var zuRight = document.getElementById("zuRight");
    zuRight.style.width = 0.6 * unit + "px";
    zuRight.style.height = 0.6 * unit + "px";
    zuRight.style.position = "absolute";
    zuRight.style.top = (1.5 + 0.1) * unit + "px";
    zuRight.style.left = (2 + 0.4 + 0.6 + 0.2 + 0.8 + 0.2) * unit + "px";
    zuRight.style.display = "inline";
    zuRight.style.cursor = "pointer";

    var horizonLeft = document.getElementById("horizonLeft");
    horizonLeft.style.width = 0.6 * unit + "px";
    horizonLeft.style.height = 0.6 * unit + "px";
    horizonLeft.style.position = "absolute";
    horizonLeft.style.top = (1.5 + 2 - 0.6 - 0.1) * unit + "px";
    horizonLeft.style.left = (2 + 0.8 - 0.1 - 0.6) * unit + "px";
    horizonLeft.style.display = "inline";
    horizonLeft.style.cursor = "pointer";

    var horizonRight = document.getElementById("horizonRight");
    horizonRight.style.width = 0.6 * unit + "px";
    horizonRight.style.height = 0.6 * unit + "px";
    horizonRight.style.position = "absolute";
    horizonRight.style.top = (1.5 + 2 - 0.6 - 0.1) * unit + "px";
    horizonRight.style.left = (2 + 0.8 + 1.6 + 0.1) * unit + "px";
    horizonRight.style.display = "inline";
    horizonRight.style.cursor = "pointer";

    var verticalUp = document.getElementById("verticalUp");
    verticalUp.style.width = 0.6 * unit + "px";
    verticalUp.style.height = 0.6 * unit + "px";
    verticalUp.style.position = "absolute";
    verticalUp.style.top = (1.5 - 0.6) * unit + "px";
    verticalUp.style.left = (2 + 0.8 + 1.6 + 0.8 + 0.1) * unit + "px";
    verticalUp.style.display = "inline";
    verticalUp.style.cursor = "pointer";

    var verticalDown = document.getElementById("verticalDown");
    verticalDown.style.width = 0.6 * unit + "px";
    verticalDown.style.height = 0.6 * unit + "px";
    verticalDown.style.position = "absolute";
    verticalDown.style.top = (1.5 + 0.2 + 1.6 + 0.2) * unit + "px";
    verticalDown.style.left = (2 + 0.8 + 1.6 + 0.8 + 0.1) * unit + "px";
    verticalDown.style.display = "inline";
    verticalDown.style.cursor = "pointer";

}

function renderChessboard(layout) {
    var tempLayout = layout.map(function (arr) {   // Copy the array
        return arr.slice();
    });

    for (var i = 0; i < tempLayout.length; i++) {
        for (var j = 0; j < tempLayout[0].length; j++) {
            var id = tempLayout[i][j];

            if (id < 0 || id > 9) {           // The chess is blank or should be skipped
                if (id > 9) {
                    chessmanPos[id] = [i, j];
                }
                continue;
            }

            var chessName = index[id];
            var chess = document.getElementById(chessName);
            if (id == 0) {
                renderBigSquare(chess, i, j, tempLayout);
                chessmanPos[id] = [i, j];
            } else if (id >= 1 && id <= 4) {
                renderVertical(chess, i, j, tempLayout);
                chessmanPos[id] = [i, j];
            } else if (id == 5) {
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
    if (!e) var e = window.event
    if (e.target) targ = e.target
    else if (e.srcElement) targ = e.srcElement
    if (targ.nodeType == 3) // defeat Safari bug
        targ = targ.parentNode
    var tname
    tname = targ.id;
    if (tname == "") tname = "blank";
    chessman = inverseIndex[tname];
    //alert("You clicked on a " + tname + " element.");
    if (tname != "blank") {
        document.getElementById("chessboard").addEventListener("mousemove", move);
    }
}


// function dragging(e) {
//     e = event || windows.event;
//     document.getElementById("chessboard").addEventListener("mousemove", move);


// }


function move(e) {
    e = event || windows.event;
    var currentarg = e.target;
    var targid = currentarg.id;
    var mouseX = Math.floor((e.clientX - origin[0]) / unit);
    var mouseY = Math.floor((e.clientY - origin[1]) / unit);
    if (targid == "chessboard") {
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
        }

        else if (chessman == 5) {
            var cond5h1 = (i10 - i == 1 && j10 == j && i11 - i == 1 && j11 - j == 1) || (i11 - i == 1 && j11 == j && i10 - i == 1 && j10 - j == 1);
            var cond5h2 = (i - i10 == 1 && j10 == j && i - i11 == 1 && j11 - j == 1) || (i - i11 == 1 && j11 == j && i - i10 == 1 && j10 - j == 1);
            if (cond5h1 || cond5h2) {
                layout[i][j] = 10;
                layout[i][j + 1] = 11;
                layout[i10][j10] = 5;
                layout[i11][j11] = 5;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }
            else if (j - mouseX == 1 && i == mouseY) {
                if (mouseX == j10 && mouseY == i10) {
                    layout[i][j + 1] = 10;
                }
                else {
                    layout[i][j + 1] = 11;
                }
                layout[mouseY][mouseX] = chessman;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }

            else if (mouseX - j == 2 && i == mouseY) {
                if (mouseX == j10 && mouseY == i10) {
                    layout[i][j] = 10;
                }
                else {
                    layout[i][j] = 11;
                }
                layout[mouseY][mouseX] = chessman;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }
        }

        else if (chessman > 0 && chessman < 5) {
            cond1v1 = (i == i10 && j + 1 == j10 && i + 1 == i11 && j + 1 == j11) || (i == i11 && j + 1 == j11 && i + 1 == i10 && j + 1 == j10);
            cond1v2 = (i == i10 && j - 1 == j10 && i + 1 == i11 && j - 1 == j11) || (i == i11 && j - 1 == j11 && i + 1 == i10 && j - 1 == j10);
            if (i - mouseY == 1 && j == mouseX) {
                if (mouseX == j10 && mouseY == i10) {
                    layout[i + 1][j] = 10;
                }
                else {
                    layout[i + 1][j] = 11;
                }
                layout[mouseY][mouseX] = chessman;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }

            else if (mouseY - i == 2 && j == mouseX) {
                if (mouseX == j10 && mouseY == i10) {
                    layout[i][j] = 10;
                }
                else {
                    layout[i][j] = 11;
                }
                layout[mouseY][mouseX] = chessman;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }

            else if (cond1v1 || cond1v2) {
                layout[i][j] = 10;
                layout[i + 1][j] = 11;
                layout[i10][j10] = chessman;
                layout[i11][j11] = chessman;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }
        }

        else if (chessman == 0) {
            if ((i - i10 == 1 && j == j10 && i - i11 == 1 && j + 1 == j11) || (i - i11 == 1 && j == j11 && i - i10 == 1 && j + 1 == j10)) {
                layout[i10][j10] = chessman;
                layout[i11][j11] = chessman;
                layout[i + 1][j] = 10;
                layout[i + 1][j + 1] = 11;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }

            else if ((j - j10 == 1 && i == i10 && j - j11 == 1 && i11 - i == 1) || (j - j11 == 1 && i == i11 && j - j10 == 1 && i10 - i == 1)) {
                layout[i10][j10] = chessman;
                layout[i11][j11] = chessman;
                layout[i][j + 1] = 10;
                layout[i + 1][j + 1] = 11;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }

            else if ((j10 - j == 2 && i10 == i && j11 - j == 2 && i11 - i == 1) || (j10 - j == 2 && i10 == i && j11 - j == 2 && i11 - i == 1)) {
                layout[i10][j10] = chessman;
                layout[i11][j11] = chessman;
                layout[i][j] = 10;
                layout[i + 1][j] = 11;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }

            else if ((i10 - i == 2 && j10 == j && i11 - i == 2 && j11 - j == 1) || (i11 - i == 2 && j11 == j && i10 - i == 2 && j10 - j == 1)) {
                layout[i10][j10] = chessman;
                layout[i11][j11] = chessman;
                layout[i][j] = 10;
                layout[i][j + 1] = 11;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }
        }
        document.getElementById("chessboard").removeEventListener("mousemove", move);
    }
    else {
        document.getElementById("chessoboard").removeEventListener("mousemove", move);
    }
}

document.getElementById("chessboard").ondragenter = function (e) {
    e = event || windows.event;
    e.preventDefault();
}

document.getElementById("chessboard").ondragover = function (e) {
    e = event || windows.event;
    e.preventDefault();
}


// document.getElementById("chessboard").onmouseup = function (e) {
//     e = event || windows.event;
//     var inChessboard = (e.clientX > origin[0]) && (e.clientX < origin[0] + 4 * unit);
//     if (!inChessboard) {
//         document.getElementById("chessboard").removeEventListener("mousemove", move);
//     }
// }

function renderCaocao(object) {
    var file = object.files[0];
    // var reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = function(e) {
    //     var img = document.getElementById("caocao");
    //     var caocao = document.getElementById("selectCaocao");
    //     img.src = e.target.result;
    //     caocao.src = e.target.result;
    // }
    saveImg(file, document.getElementById("caocao"));
    saveImg(file, document.getElementById("selectCaocao"));
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function leftClickZu() {
    var show = zu.pop();
    var img = document.getElementById("selectZu");
    img.src = "images/zu/" + show;
    zu.unshift(show);
}

function rightClickZu() {
    var show = zu.shift();
    zu.push(show);
    var img = document.getElementById("selectZu");
    img.src = "images/zu/" + zu.peekFront();
}

function upClickVertical() {
    var show = vertical.pop();
    var img = document.getElementById("selectVertical");
    img.src = "images/vertical/" + show;
    vertical.unshift(show);
}

function downClickVertical() {
    var show = vertical.shift();
    vertical.push(show);
    var img = document.getElementById("selectVertical");
    img.src = "images/vertical/" + vertical.peekFront();
}

function leftClickHorizon() {
    var show = horizon.pop();
    var img = document.getElementById("selectHorizon");
    img.src = "images/horizon/" + show;
    horizon.unshift(show);
}

function rightClickHorizon() {
    var show = horizon.shift();
    horizon.push(show);
    var img = document.getElementById("selectHorizon");
    img.src = "images/horizon/" + horizon.peekFront();
}

function clickHorizon() {
    var guanyu = document.getElementById("guanyu");
    var horizon = document.getElementById("selectHorizon");
    guanyu.src = horizon.src;
}

function clickZu() {
    var zuImg = document.getElementById(zuIndex.peekFront());
    var select = document.getElementById("selectZu");
    zuImg.src = select.src;
    zuIndex.push(zuIndex.shift());
}

function clickVertical() {
    var verticalImg = document.getElementById(verticalIndex.peekFront());
    var select = document.getElementById("selectVertical");
    verticalImg.src = select.src;
    verticalIndex.push(verticalIndex.shift());
}