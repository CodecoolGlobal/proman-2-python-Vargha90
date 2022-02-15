import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const statuses = await dataHandler.getStatuses();
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let i in statuses) {
            domManager.addChild(`.board-columns[data-board-id="${boardId}"]`,
                `<div class="board-column">
                            <div class="board-column-title">${statuses[i]['title']}</div>
                            <div class="board-column-content" something="${boardId}/${parseInt(i) +1}"></div></div>`)
        }
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            domManager.addChild(`.board-column-content[something="${boardId}/${card['status_id']}"]`, content);
            domManager.addEventListener(
                `.card[data-card-id="${card.id}"]`,
                "click",
                deleteButtonHandler
            );
        }
    },
    hideCards: function (boardId){
        let board = document.getElementsByClassName("board-columns")[boardId-1]
        while (board.lastElementChild) {
        board.removeChild(board.lastElementChild);
        }
    },
};



function deleteButtonHandler(clickEvent) {
}
