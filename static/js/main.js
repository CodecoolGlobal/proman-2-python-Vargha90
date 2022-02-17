import {boardsManager} from "./controller/boardsManager.js";
import {loginRegister} from "./controller/userManager.js"

function init() {
    boardsManager.initClick()
    boardsManager.loadBoards();
    // loginRegister();
}

init();
