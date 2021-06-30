function initBoard() {
    if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem("boardSize", parseInt(document.getElementById("initboard").value));
        sessionStorage.setItem("players", parseInt(document.getElementById("initplayers").value));
        sessionStorage.setItem("currentPlayer", "X");
        var table = document.createElement("TABLE");
        table.setAttribute("id", "board");
        table.setAttribute("class", "board");
        for (var i=0; i<sessionStorage.getItem("boardSize"); i++) {
            var tr = document.createElement("TR");
            for (var j=0; j<sessionStorage.getItem("boardSize"); j++) {
                var td = document.createElement("TD");
                td.setAttribute("onclick", "takeCell(this)");
                td.setAttribute("class", "");
                td.setAttribute("style", "");
                loc = String(j) + String(i);
                td.setAttribute("id", loc)
                tr.appendChild(td)
            }
            table.appendChild(tr);
        }
        var container = document.getElementById("boardcontainer");
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        container.appendChild(table)
    } else {
        //Browser not compatible
    }
}

function takeCell(cell) {
    x = cell.id.substring(0, 1);
    for (var i=sessionStorage.getItem("boardSize")-1; i>=0; i--) {
        var currentCell = document.getElementById(x + String(i));
        if (currentCell.getAttribute("class") == "") {
            currentCell.setAttribute("class", sessionStorage.getItem("currentPlayer"))
            if (checkWin(currentCell)) {
                removeOnclick();
                var br = document.createElement("br");
                var p = document.createElement("p");
                if (sessionStorage.getItem("currentPlayer") == "X") {
                    p.textContent = "Black Wins!"
                } else {
                    p.textContent = "Red Wins!"
                }
                var btn1 = document.createElement("button");
                btn1.setAttribute("onclick", "reload()");
                btn1.textContent = "Exit";
                var btn2 = document.createElement("button");
                btn2.setAttribute("onclick", "resetBoard()");
                btn2.textContent = "Reset Board"
                var container = document.getElementById("boardcontainer");
                container.appendChild(br);
                container.appendChild(p);
                container.appendChild(br);
                container.appendChild(btn1);
                container.appendChild(btn2);
            }
            if (checkTie()) {
                removeOnclick();
                var br = document.createElement("br");
                var p = document.createElement("p");
                p.textContent = "Tie Game!"
                var btn1 = document.createElement("button");
                btn1.setAttribute("onclick", "reload()");
                btn1.textContent = "Exit";
                var btn2 = document.createElement("button");
                btn2.setAttribute("onclick", "resetBoard()");
                btn2.textContent = "Reset Board"
                var container = document.getElementById("boardcontainer");
                container.appendChild(br);
                container.appendChild(p);
                container.appendChild(br);
                container.appendChild(btn1);
                container.appendChild(btn2);
            }
            changePlayer();
            return;
        }
    }
    return;
}

function changePlayer() {
    if (sessionStorage.getItem("currentPlayer") == "X") {
        sessionStorage.setItem("currentPlayer", "O");
    } else {
        sessionStorage.setItem("currentPlayer", "X");
    }
}

function checkWin(cell) {
    var currentPlayer = sessionStorage.getItem("currentPlayer");
    var currentCellX = parseInt(cell.id.substring(0,1));
    var currentCellY = parseInt(cell.id.substring(1,2));
    var directions = [[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]
    for (var i=0; i < directions.length; i++) {
        var counter = 1;
        for (var j=1; j<4; j++) {
            var modX = directions[i][0] * j;
            var modY = directions[i][1] * j;
            if ((currentCellX + modX) >= 0 && (currentCellX + modX) < sessionStorage.getItem("boardSize")
            && (currentCellY + modY) >= 0 && (currentCellY + modY) < sessionStorage.getItem("boardSize")) {
                var checkCell = String(currentCellX + modX) + String(currentCellY + modY);
                checkCell = document.getElementById(checkCell);
                if (checkCell.getAttribute("class") == currentPlayer) {
                    counter++;
                }
            }
        }
        if (counter == 4) {
            return true;
        }
    }
    return false;
}

function checkTie() {
    var cells = sessionStorage.getItem("boardSize");
    for (var i=0; i<cells; i++) {
        for (var j=0; j<cells; j++) {
            var cCell = String(i) + String(j);
            cCell = document.getElementById(cCell);
            if (cCell.getAttribute("class") == "") {
                return false;
            }
        }
    }
    return true;
}

function reload() {
    window.location.reload();
}

function resetBoard() {
    var table = document.createElement("TABLE");
    table.setAttribute("id", "board");
    table.setAttribute("class", "board");
    for (var i=0; i<sessionStorage.getItem("boardSize"); i++) {
        var tr = document.createElement("TR");
        for (var j=0; j<sessionStorage.getItem("boardSize"); j++) {
            var td = document.createElement("TD");
            td.setAttribute("onclick", "takeCell(this)");
            td.setAttribute("class", "");
            td.setAttribute("style", "");
            loc = String(j) + String(i);
            td.setAttribute("id", loc)
            tr.appendChild(td)
        }
        table.appendChild(tr);
    }
    var container = document.getElementById("boardcontainer");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    container.appendChild(table)
    sessionStorage.setItem("currentPlayer", "X");
}

function removeOnclick() {
    for (var i=0; i < sessionStorage.getItem("boardSize"); i++) {
        for (var j=0; j < sessionStorage.getItem("boardSize"); j++) {
            var currentID = String(i) + String(j);
            document.getElementById(currentID).removeAttribute("onclick");
        }
    }
}