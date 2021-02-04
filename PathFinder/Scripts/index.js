import * as Grid from './grid.js';
import * as utils from './utils.js';
import {Config} from './config.js';
import {dijkstra} from './Algorithms/dijkstra.js';
import {bidirectional} from './Algorithms/bidirectional.js';

const gridMap = document.querySelector('.grid-map');
const selectBox = document.querySelector('.algorithms-drop-down');
const runButton = document.querySelector('.btn-run');
const clearButton = document.querySelector('.btn-clear');
const addWallButton = document.querySelector('.wall');
let selectSpeed = document.querySelector('.select-speed');

Config.gridRows = 20;
Config.gridCols = 54;
Config.gridMap = gridMap;
Grid.makeRows(gridMap);
Grid.initializeStartEnd();

Config.animationTime = selectSpeed.value;

// DOM Related Events
runButton.addEventListener('click', runAlgorithm);
clearButton.addEventListener('click', Grid.resetGrid);
addWallButton.addEventListener('click', () => {Config.addWallPressed = true;});
selectSpeed.addEventListener('change', setSpeed);

Config.runButton = runButton;
Config.clearButton = clearButton;
Config.addWallButton = addWallButton;

// DOM Related Functions
function setSpeed() {
    Config.animationTime = selectSpeed.value;
    document.body.style.setProperty('--speed', Config.animationTime);
}

function runAlgorithm(e) {

    // Implies Algorithm is Running
    if (!Config.runCompleted && Config.runStarted) {
        Config.execute = false;
        utils.toggleButtons();
        e.target.classList.remove('btn-is-running');
        e.target.innerText = 'Run Algorithm!';
        Config.runCompleted = true;
        return;
    }

    e.target.classList.add('btn-is-running');
    e.target.innerText = 'Cancel';

    utils.toggleButtons();
    Config.runCompleted = false;
    Config.runStarted = true;
    Config.execute = true;

    if (selectBox.value == 'Dijkstra') {
        Config.algorithm = dijkstra;
        Config.algorithm(Config.startNode, Config.endNode, Config.animationTime);
    }
    else if (selectBox.value == 'Bidirectional') {
        Config.algorithm = bidirectional;
        Config.algorithm(Config.startNode, Config.endNode, Config.animationTime);
    }
}
