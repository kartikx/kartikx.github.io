import * as utils from '../utils.js';
import {Config} from '../config.js';

export async function dijkstra(startNode, endNode, animationTime) {
    const step = [-Config.gridCols, Config.gridCols, -1, 1];
    const stepX = [-1 , 1, 0, 0];
    const stepY = [0, 0, -1, 1];

    let queue = [];
    let [visited, pred] = utils.getVisited();

    queue.push(startNode);
    visited[startNode] = true;

    while (queue.length > 0 && Config.execute) {
        let currNode = queue.shift();
        if (currNode != startNode && currNode != endNode)
            utils.markVisited(currNode);

        if (currNode == endNode) {
            utils.markFound(currNode);
            utils.printPath(endNode, pred, animationTime*4);
            break;
        }

        for (let c = 0; c < 4; c++) {
            let nextNode = currNode + step[c];
            let x = Math.floor(currNode/Config.gridCols) + stepX[c];
            let y = Math.floor(currNode%Config.gridCols) + stepY[c];

            if (utils.isValid(x, y) && !visited[nextNode]){
                visited[nextNode] = true;
                if (nextNode != endNode)
                    utils.markToVisit(nextNode);
                queue.push(nextNode);
                pred[nextNode] = currNode;
                if (animationTime)
                    await utils.sleep(animationTime);
            }
        }
    }
}
