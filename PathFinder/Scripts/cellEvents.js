import {Config} from './config.js';

export function onMouseDown(cell) {
    if (Number(cell.getAttribute('cell-value')) == Config.startNode)
        Config.startNodePressed = true;
    else if (Number(cell.getAttribute('cell-value')) == Config.endNode)
        Config.endNodePressed = true;
    else if (Config.addWallPressed)
    {
        cell.classList.add('grid-cell-wall');
        Config.addWall = true;
    }
}
/**
 * If runCompleted is true, then pressing the button should restart it right?
 */
export function onMouseHover(cell){
    if (Config.runStarted && !Config.runCompleted)
        return;

    let cellV = Number(cell.getAttribute('cell-value'));

    if (Config.startNodePressed) {
        if (Config.startNode != -1) {
            Config.gridCells[Config.startNode].classList.remove('grid-cell-start');
        }
        Config.startNode = cellV;
        cell.classList.add('grid-cell-start');

        if (Config.runStarted && Config.runCompleted) {
            Config.algorithm(Config.startNode, Config.endNode, Config.animationTime*0);
        }
    }

    else if (Config.endNodePressed) {
        if (Config.endNode != -1) {
            Config.gridCells[Config.endNode].classList.remove('grid-cell-end');
            Config.gridCells[Config.endNode].classList.remove('grid-cell-found');
        }
        Config.endNode = cellV;
        cell.classList.add('grid-cell-end');
        if (Config.runStarted && Config.runCompleted) {
            Config.algorithm(Config.startNode, Config.endNode, Config.animationTime*0);
        }
    }

    else if (Config.addWall) {
        cell.classList.add('grid-cell-wall');  
    }
}

export function onMouseUp(cell){
    Config.startNodePressed = false;
    Config.endNodePressed = false;
    Config.addWall = false;
}
