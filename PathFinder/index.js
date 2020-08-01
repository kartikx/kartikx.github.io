const gridMap = document.querySelector('.grid-map');
const selectBox = document.querySelector('.algorithms-drop-down');
const runButton = document.querySelector('.btn-run');
const clearButton = document.querySelector('.btn-clear');
const addWallButton = document.querySelector('.wall');
let selectSpeed = document.querySelector('.select-speed');

let startNode, endNode;

let startNodePressed = false;
let endNodePressed = false;
let addWallPressed = false;
let addWall = false;

let runCompleted = false;

const gridRows = 20;
const gridCols = 54;
makeRows(gridRows, gridCols);
let gridCells = document.querySelectorAll('.grid-cell');
initializeStartEnd();


let animationTime = selectSpeed.value;

// Events
runButton.addEventListener('click', runAlgorithm);
clearButton.addEventListener('click', resetGrid);
addWallButton.addEventListener('click', () => {addWallPressed = true;});
selectSpeed.addEventListener('change', setSpeed);

// Functions

function setSpeed() {
    animationTime = selectSpeed.value;
    document.body.style.setProperty('--speed', animationTime);
    console.log(animationTime);
}

function toggleButtons() {
    runButton.disabled = !runButton.disabled;
    clearButton.disabled = !clearButton.disabled;
    clearButton.classList.toggle('btn-disabled');
}

function runAlgorithm(e) {
    e.target.classList.add('btn-is-running');
    toggleButtons();
    runCompleted = false;
    if (selectBox.value == 'Dijkstra') {
        bfs(startNode, endNode, animationTime);
    }
}

function resetGrid() {
    gridMap.innerHTML = "";
    makeRows(gridRows, gridCols);
    gridCells = document.querySelectorAll('.grid-cell');
    initializeStartEnd();
    runCompleted = false;
}

function onMouseDown(cell) {
    if (Number(cell.getAttribute('cell-value')) == startNode)
        startNodePressed = true;
    else if (Number(cell.getAttribute('cell-value')) == endNode)
        endNodePressed = true;
    else if (addWallPressed)
    {
        cell.classList.add('grid-cell-wall');
        addWall = true;
    }
}

function onMouseHover(cell){
    let cellV = Number(cell.getAttribute('cell-value'));

    if (startNodePressed) {
        if (startNode != -1) {
            gridCells[startNode].classList.remove('grid-cell-start');
        }
        startNode = cellV;
        cell.classList.add('grid-cell-start');

        if (runCompleted) {
            bfs(startNode, endNode, 0);
        }
    }

    else if (endNodePressed) {
        if (endNode != -1) {
            gridCells[endNode].classList.remove('grid-cell-end');
        }
        endNode = cellV;
        cell.classList.add('grid-cell-end');
        if (runCompleted) {
            bfs(startNode, endNode, 0);
        }
    }

    else if (addWall) {
        cell.classList.add('grid-cell-wall');  
    }
}

function onMouseUp(cell){
    startNodePressed = false;
    endNodePressed = false;
    addWall = false;
}

function makeRows(rows, cols) {
    gridMap.style.setProperty('--grid-rows', rows);
    gridMap.style.setProperty('--grid-cols', cols);
    for (let c=0; c<rows*cols; c++){
        let cell = document.createElement("div");
        cell.setAttribute('cell-value', c);
        cell.setAttribute('draggable', 'false');
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
    endNode = gridCols*(gridRows/2 - 1) + 3*Math.floor(gridCols/4);

    gridCells[startNode].classList.add('grid-cell-start');
    gridCells[endNode].classList.add('grid-cell-end');
}

// TODO Read the article.
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function isValid(x, y) {
    if (x < 0 || y < 0 || x >=gridRows || y>=gridCols)
        return false;
    
    return true;
}

async function testF(){
    console.log('Going to sleep');
    await sleep(0);
    console.log('Woke up');
}
function markVisited(val) {
    let cl = gridCells[val].classList;
    cl.add('grid-cell-visited');
    if (cl.contains('grid-cell-tovisit')){
        cl.remove('grid-cell-tovisit');
    }
}

function markToVisit(val) {
    gridCells[val].classList.add('grid-cell-tovisit');
}


function getVisited(){
    visited = [];
    pred = []
    for (let c = 0; c < gridRows*gridCols ; c++)
    {
        if (!gridCells[c].classList.contains('grid-cell-wall'))
        {
            gridCells[c].classList.remove('grid-cell-visited');
            gridCells[c].classList.remove('grid-cell-tovisit');
            gridCells[c].classList.remove('grid-cell-path');
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

async function bfs(startNode, endNode, animationTime) {
    const step = [-gridCols, gridCols, -1, 1];
    const stepX = [-1 , 1, 0, 0];
    const stepY = [0, 0, -1, 1];

    let queue = [];
    let [visited, pred] = getVisited();

    queue.push(startNode);
    visited[startNode] = true;

    while (queue.length > 0) {
        let currNode = queue.shift();
        if (currNode != startNode && currNode != endNode)
            markVisited(currNode);
        if (currNode == endNode) {
            printPath(endNode, pred, animationTime*6);
            break;
        }
        for (let c = 0; c < 4; c++) {
            let nextNode = currNode + step[c];
            let x = Math.floor(currNode/gridCols) + stepX[c];
            let y = Math.floor(currNode%gridCols) + stepY[c];

            if (isValid(x, y) && !visited[nextNode]){
                visited[nextNode] = true;
                if (nextNode != endNode)
                    markToVisit(nextNode);
                queue.push(nextNode);
                pred[nextNode] = currNode;
                if (animationTime)
                    await sleep(animationTime);
            }
        }
    }
}

function markPath(val){
    gridCells[val].classList.add('grid-cell-path');
}

async function printPath(endNode, pred, animationTime)
{
    endNode = pred[endNode];
    while(endNode != -1 && pred[endNode] != -1)
    {
        markPath(endNode);
        endNode = pred[endNode];
        if (animationTime)
            await sleep(animationTime);
    }

    runComplete(animationTime);
}

function runComplete(animationTime) {
    runCompleted = true;
    if (animationTime)
    {
        runButton.classList.remove('btn-is-running');
        toggleButtons();
    }
}