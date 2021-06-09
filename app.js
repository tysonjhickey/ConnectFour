function initBoard() {
    if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem("boardSize", parseInt(document.getElementById("initboard").value));
        //console.log("boardSize: " + sessionStorage.getItem("boardSize"));
        sessionStorage.setItem("players", parseInt(document.getElementById("initplayers").value));
        //console.log("players: " + sessionStorage.getItem("players"))
        sessionStorage.setItem("currentPlayer", "X");
        var table = document.createElement("TABLE");
        table.setAttribute("id", "board");
        table.setAttribute("class", "board");
        for (var i=0; i<sessionStorage.getItem("boardSize"); i++) {
            var tr = document.createElement("TR");
            for (var j=0; j<sessionStorage.getItem("boardSize"); j++) {
                var td = document.createElement("TD");
                td.setAttribute("onclick", "takeCell(this)");
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
    //console.log(cell.id.substring(0, 1));
    //console.log(cell.id.substring(1, 2));
    x = cell.id.substring(0, 1);
    for (var i=sessionStorage.getItem("boardSize")-1; i>=0; i--) {
        var currentCell = document.getElementById(x + String(i));
        //console.log(currentCell);
        if (currentCell.textContent == "") {
            currentCell.textContent = sessionStorage.getItem("currentPlayer")
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