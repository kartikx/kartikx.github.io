import * as utils from '../utils.js';
import {Config} from '../config.js';

export async function bidirectional(startNode, endNode, animationTime) {
    const step = [-Config.gridCols, Config.gridCols, -1, 1];
    const stepX = [-1 , 1, 0, 0];
    const stepY = [0, 0, -1, 1];

    let queueS = [];
    let queueE = [];

    let [visitedS, predS] = utils.getVisited();
    let [visitedE, predE] = utils.getVisited();

    queueS.push(startNode);
    visitedS[startNode] = true;

    queueE.push(endNode);
    visitedE[endNode] = true;

    while ((queueS.length > 0 || queueE.length > 0) && Config.execute) {
        let currNodeS=startNode, currNodeE=endNode;
        if (queueS.length > 0)
        {
            currNodeS = queueS.shift();
        }
        if (queueE.length > 0)
        {
            currNodeE = queueE.shift();
        }

        if (currNodeS != startNode)
        {
            utils.markVisited(currNodeS);
        }
        if (currNodeE != endNode)
        {
            utils.markVisited(currNodeE);
        }

        // if (currNode == endNode) {
        //     utils.markFound(currNode);
        //     utils.printPath(endNode, pred, animationTime*4);
        //     break;
        // }

        for (let c = 0; c < 4; c++) {
            let nextNodeS = currNodeS + step[c];
            let xS = Math.floor(currNodeS/Config.gridCols) + stepX[c];
            let yS = Math.floor(currNodeS%Config.gridCols) + stepY[c];

            let nextNodeE = currNodeE + step[c];
            let xE = Math.floor(currNodeE/Config.gridCols) + stepX[c];
            let yE = Math.floor(currNodeE%Config.gridCols) + stepY[c];

            if (utils.isValid(xS, yS)){
                if (visitedE[nextNodeS] && !visitedS[nextNodeS]) {
                    utils.markPath(nextNodeS);
                    utils.markPath(currNodeS);
                    utils.printPath(currNodeS, predS, animationTime*4);
                    utils.printPath(nextNodeS, predE, animationTime*4);
                    utils.runComplete(animationTime);
                    return;
                }
                else if (!visitedS[nextNodeS]) {
                    visitedS[nextNodeS] = true;
                    // if (nextNodeS != endNode)
                    utils.markToVisit(nextNodeS);
                    queueS.push(nextNodeS);
                    predS[nextNodeS] = currNodeS;
                    if (animationTime)
                        await utils.sleep(animationTime);
                }
            }

            if (utils.isValid(xE, yE)){
                if (visitedS[nextNodeE] && !visitedE[nextNodeE]) {
                    utils.markPath(nextNodeE);
                    utils.markPath(currNodeE);
                    utils.printPath(currNodeE, predE, animationTime*4);
                    utils.printPath(nextNodeE, predS, animationTime*4);
                    utils.runComplete(animationTime);
                    return;
                }
                else if (!visitedE[nextNodeE]) {
                    visitedE[nextNodeE] = true;
                    // if (nextNodeE != startNode)
                    utils.markToVisit(nextNodeE);
                    queueE.push(nextNodeE);
                    predE[nextNodeE] = currNodeE;
                    if (animationTime)
                        await utils.sleep(animationTime);
                }
            }
        }
    }
    utils.runComplete(1);
}
