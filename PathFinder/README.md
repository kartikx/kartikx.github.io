# PathFinder
PathFinder is a Graph Visualizing Algorithm built using Javascript. The User is allowed to place the Start and End Points, as well as any obstructions on the Map, the App then renders the Shortest Path in realtime using the Algorithm that the User selects.

The Live Demo may be viewed here [PathFinder Demo](https://kartikx.github.io/PathFinder/)

You may also view a short 1 minute video [here](https://imgur.com/a/ao5O1fE) to understand how to use the basic functionality.

## File Directory Structure
* __Scripts__: Stores the Javascript Implementations
    * index.js: Main script responsible for DOM Functionality.
    * grid.js: Contructing and Resetting the Grid.
    * cellEvents.js: Hovering, Clicking and Dragging Functionality of Grid Cells.
    * utils.js: Various Utility Functions used in the Graph Algorithms.
    * config.js: Common variables shared among modules.

* __Styles__: SCSS based Style Sheets for the DOM Elements.



___
This project was inspired (but not copied) by a similar project by [Clement Mihailescu](https://github.com/clementmihailescu/Pathfinding-Visualizer).