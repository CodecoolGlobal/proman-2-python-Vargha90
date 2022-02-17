import {boardsManager} from "./controller/boardsManager.js";
import {loginRegister} from "./controller/userManager.js"

function init() {
    boardsManager.boardButton()
    boardsManager.loadBoards();
    // boardsManager.cardButton()
    // loginRegister();
}

init();
