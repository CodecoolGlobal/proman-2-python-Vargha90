import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            domManager.addEventListener(
                `.board-toggle[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
        }
    },
};


function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    if (clickEvent.target.innerHTML == '<i class="fas fa-chevron-down"></i>'){
        cardsManager.loadCards(boardId);
        loadColumns(boardId)
        clickEvent.target.innerHTML = '<i class="fas fa-chevron-up"></i>';
    }
    else {
        cardsManager.hideCards(boardId);
        clickEvent.target.innerHTML = '<i class="fas fa-chevron-down"></i>';
    }

}

async function loadColumns(boardId){
    const statuses =  await dataHandler.getStatuses()
    const board = document.querySelector(".column-container")
    for (let status of statuses){
        let text = document.createElement("div")
        let element = document.createElement("div")
        text.innerHTML = status.title
        element.id = status.id
        element.classList.add("column")
        element.appendChild(text)
        board.appendChild(element)
    }
}


