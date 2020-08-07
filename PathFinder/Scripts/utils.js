import {Config} from './config.js';

// TODO Read the article.
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Returns whether a given (row, column) cell
 * is a valid cell or not.
 */
export function isValid(x, y) {
    if (x < 0 || y < 0 || x >= Config.gridRows || y >= Config.gridCols)
        return false;
    
    return true;
}

export function markVisited(val) {
    let classList_ = Config.gridCells[val].classList;
    classList_.add('grid-cell-visited');
    if (classList_.contains('grid-cell-tovisit')){
        classList_.remove('grid-cell-tovisit');
    }
}

export function markToVisit(val) {
    Config.gridCells[val].classList.add('grid-cell-tovisit');
}

export function markFound(val) {
    Config.gridCells[val].classList.add('grid-cell-found');
}

export function markPath(val){
    Config.gridCells[val].classList.add('grid-cell-path');
}

export function getVisited(){
    let visited = [];
    let pred = []
    for (let c = 0; c < Config.gridRows*Config.gridCols ; c++)
    {
        if (!Config.gridCells[c].classList.contains('grid-cell-wall'))
        {
            Config.gridCells[c].classList.remove('grid-cell-visited');
            Config.gridCells[c].classList.remove('grid-cell-tovisit');
            Config.gridCells[c].classList.remove('grid-cell-path');
            Config.gridCells[c].classList.remove('grid-cell-found');
            visited[c] = false;
            pred[c] = -1;
        }
        else {
            visited[c] = true;
            pred[c] = -1;
        }
    }
    return [visited, pred];
}

export async function printPath(endNode, pred, animationTime)
{
    endNode = pred[endNode];
    while(endNode != -1 && pred[endNode] != -1)
    {
        markPath(endNode);
        endNode = pred[endNode];
        if (animationTime)
            await sleep(animationTime);
    }
}

export function runComplete(animationTime) {
    Config.runCompleted = true;

    // If the runComplete was called when the user was moving
    // the node after the run was finished, then the Button's weren't changed.
    if (animationTime)
    {
        Config.runButton.classList.remove('btn-is-running');
        Config.gridMap.style.setProperty('--found', true);
        toggleButtons();
    }
    Config.runButton.innerText = 'Run Algorithm!';
}

export function toggleButtons() {
    Config.clearButton.disabled = !Config.clearButton.disabled;
    Config.clearButton.classList.toggle('btn-disabled');
}