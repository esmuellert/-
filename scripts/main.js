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
    this.renderInterface();
    this.renderChessboard(this.layout);
}

window.onresize = function () {
    this.renderInterface();
}

function renderInterface() {
    // Get the height and width of screen
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    unit = Math.floor(screenHeight / 6);

    // Adjust the positon of the chessboard
    var chessboard = document.getElementById("chessboard");
    chessboard.style.position = "relative";
    chessboard.style.width = 4 * unit + "px";
    chessboard.style.height = 5 * unit + "px";
    origin[0] = (screenWidth - 4 * unit - 10) / 2;
    origin[1] = (screenHeight - 5 * unit) / 2;
    chessboard.style.left = origin[0] + "px";
    chessboard.style.top = origin[1] + "px";
}

function renderChessboard(layout) {
    var tempLayout = layout.map(function(arr) {   // Copy the array
        return arr.slice();
    });

    for (var i = 0; i < tempLayout.length; i++) {
        for (var j = 0; j < tempLayout[0].length; j++) {
            var id = tempLayout[i][j];

            if (id < 0 || id > 9) {           // The chess is blank or should be skipped
                if(id > 9) {
                    chessmanPos[id] = [i, j];
                }
                continue;
            }

            var chessName = index[id];
            var chess = document.getElementById(chessName);
            if (id == 0) {
                renderBigSquare(chess, i, j, tempLayout);
                chessmanPos[id] = [i, j];
            } else if(id >= 1 && id <= 4) {
                renderVertical(chess, i, j, tempLayout);
                chessmanPos[id] = [i, j];
            } else if(id == 5) {
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
    chess.style.display = "inline";
    chess.style.width = 2 * unit + "px";
    chess.style.height = 2 * unit + "px";
    chess.style.left = j * unit + "px";
    chess.style.top = i * unit + "px";
    tempLayout[i + 1][j] = -1;
    tempLayout[i + 1][j + 1] = -1;
    tempLayout[i][j + 1] = -1;
}

function renderVertical(chess, i, j, tempLayout) {
    chess.style.position = "absolute";
    chess.style.display = "inline";
    chess.style.height = 2 * unit + "px";
    chess.style.width = unit + "px";
    chess.style.left = j * unit + "px";
    chess.style.top = i * unit + "px";
    tempLayout[i + 1][j] = -1;
}

function renderHorizontal(chess, i, j, tempLayout) {
    chess.style.position = "absolute";
    chess.style.display = "inline";
    chess.style.width = 2 * unit + "px";
    chess.style.height = unit + "px";
    chess.style.left = j * unit + "px";
    chess.style.top = i * unit + "px";
    tempLayout[i][j + 1] = -1;
}

function renderSquare(chess, i, j, tempLayout) {
    chess.style.position = "absolute";
    chess.style.display = "inline";
    chess.style.width = unit + "px";
    chess.style.height = unit + "px";
    chess.style.left = j * unit + "px";
    chess.style.top = i * unit + "px";
}

var chessman = 0;
var targ;
document.onmousedown = function (e) {
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
    if (tname != "blank" && chessman != -1) {
        document.getElementById("chessboard").addEventListener("mousemove", move);
    }
}

function move(e) {
    e = event || windows.event;
    var currentarg = e.target;
    var targid = currentarg.id;
    if (targid == "chessboard") {
        var i = chessmanPos[chessman][0];
        var j = chessmanPos[chessman][1];
        var mouseX = Math.floor(e.offsetX / unit);
        var mouseY = Math.floor(e.offsetY / unit);
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
            if ((i10 - i == 1 && j10 == j && i11 - i == 1 && j11 - j == 1) || (i11 - i == 1 && j11 == j && i10 - i == 1 && j10 - j == 1)) {
                layout[i][j] = 10;
                layout[i][j + 1] = 11;
                layout[i10][j10] = 5;
                layout[i11][j11] = 5;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }
            else if ((i - i10 == 1 && j10 == j && i - i11 == 1 && j11 - j == 1) || (i - i11 == 1 && j11 == j && i - i10 == 1 && j10 - j == 1)) {
                layout[i][j] = 10;
                layout[i][j + 1] = 11;
                layout[i10][j10] = 5;
                layout[i11][j11] = 5;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }
            else if (j - j10 == 1 && i == i10) {
                layout[i][j + 1] = 10;
                layout[i10][j10] = chessman;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }
            else if (j - j11 == 1 && i == i11) {
                layout[i][j + 1] = 10;
                layout[i11][j11] = chessman;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }

            else if (j10 - j == 2 && i == i10) {
                layout[i][j] = 10;
                layout[i10][j10] = chessman;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }
            else if (j11 - j == 2 && i == i11) {
                layout[i][j] = 10;
                layout[i11][j11] = chessman;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }
        }

        else if (chessman > 0 && chessman < 5) {
            if (i - i10 == 1 && j == j10) {
                layout[i + 1][j] = 10;
                layout[i10][j10] = chessman;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }
            else if (i - i11 == 1 && j == j11) {
                layout[i + 1][j] = 10;
                layout[i11][j11] = chessman;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }

            else if (i10 - i == 2 && j == j10) {
                layout[i][j] = 10;
                layout[i10][j10] = chessman;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }
            else if (i11 - i == 2 && j == j11) {
                layout[i][j] = 10;
                layout[i11][j11] = chessman;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }
            else if ((i == i10 && j + 1 == j10 && i + 1 == i11 && j + 1 == j11) || (i == i11 && j + 1 == j11 && i + 1 == i10 && j + 1 == j10)) {
                layout[i][j] = 10;
                layout[i + 1][j] = 11;
                layout[i10][j10] = chessman;
                layout[i11][j11] = chessman;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }
            else if ((i == i10 && j - 1 == j10 && i + 1 == i11 && j - 1 == j11) || (i == i11 && j - 1 == j11 && i + 1 == i10 && j - 1 == j10)) {
                layout[i][j] = 10;
                layout[i + 1][j] = 11;
                layout[i10][j10] = chessman;
                layout[i11][j11] = chessman;
                renderChessboard(layout);
                targ = document.getElementById(index[chessman]);
            }
        }
    }
}
document.onmouseup = function (e) {
    e = event || windows.event;
    document.getElementById("chessboard").removeEventListener("mousemove", move);
}

