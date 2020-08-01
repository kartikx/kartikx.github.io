const gridMap = document.querySelector('.grid-map');
const selectBox = document.querySelector('.algorithms-drop-down');
const runButton = document.querySelector('.btn-run');
const clearButton = document.querySelector('.btn-clear');
const addWallButton = document.querySelector('.add-wall');

let startNode, endNode;

let startNodePressed = false;
let endNodePressed = false;
let addWallPressed = false;
let addWall = false;

const gridRows = 16;
const gridCols = 54;
makeRows(gridRows, gridCols);
let gridCells = document.querySelectorAll('.grid-cell');
initializeStartEnd();

function makeRows(rows, cols) {
    gridMap.style.setProperty('--grid-rows', rows);
    gridMap.style.setProperty('--grid-cols', cols);
    for (let c=0; c<rows*cols; c++){
        let cell = document.createElement("div");
        cell.setAttribute('cell-value', c);
        gridMap.appendChild(cell).className = "grid-cell";
        cell.addEventListener('mousedown', () => {
            onMouseDown(cell);
        });
        cell.addEventListener('mouseenter', () => {
            onMouseHover(cell);
        });
        cell.addEventListener('mouseup', () => {
            onMouseUp(cell);
        });
    };
}

function initializeStartEnd(){
    startNode = gridCols*(gridRows/2 - 1) + Math.floor(gridCols/4);
    // startNode = gridCols * (Math.floor((2*gridRows + 1)/4));
    endNode = gridCols*(gridRows/2 - 1) + 3*Math.floor(gridCols/4);

    gridCells[startNode].classList.add('grid-cell-start');
    gridCells[endNode].classList.add('grid-cell-end');

}
