import {boardsManager} from "./controller/boardsManager.js";
import {loginRegister} from "./controller/userManager.js"

function init() {
    boardsManager.loadBoards();
    loginRegister();
}

init();
