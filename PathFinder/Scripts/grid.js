import * as cellEvents from './cellEvents.js';
import {Config} from './config.js';

export function makeRows() {
    Config.gridMap.style.setProperty('--grid-rows', Config.gridRows);
    Config.gridMap.style.setProperty('--grid-cols', Config.gridCols);
    for (let c=0; c<Config.gridRows*Config.gridCols; c++){
        let cell = document.createElement("div");
        cell.setAttribute('cell-value', c);
        cell.setAttribute('draggable', 'false');
        Config.gridMap.appendChild(cell).className = "grid-cell";
        cell.addEventListener('mousedown', () => {
            cellEvents.onMouseDown(cell);
        });
        cell.addEventListener('mouseenter', () => {
            cellEvents.onMouseHover(cell);
        });
        cell.addEventListener('mouseup', () => {
            cellEvents.onMouseUp(cell);
        });
    };
    Config.gridCells = document.querySelectorAll('.grid-cell');
}

export function initializeStartEnd(){
    Config.startNode = Config.gridCols*(Config.gridRows/2 - 1) + Math.floor(Config.gridCols/4);
    Config.endNode = Config.gridCols*(Config.gridRows/2 - 1) + 3*Math.floor(Config.gridCols/4);

    // console.log(Config.startNode, Config.endNode);

    Config.gridCells[Config.startNode].classList.add('grid-cell-start');
    Config.gridCells[Config.endNode].classList.add('grid-cell-end');
}

export function resetGrid() {
    Config.gridMap.innerHTML = "";
    makeRows();
    Config.gridCells = document.querySelectorAll('.grid-cell');
    initializeStartEnd();
    Config.runCompleted = false;
    Config.runStarted = false;
}
