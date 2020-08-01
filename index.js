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
