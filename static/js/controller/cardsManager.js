import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        const statuses =  await dataHandler.getStatuses()
        for (let i in statuses) {
            domManager.addChild(`.board-columns[data-board-id="${boardId}"]`,
                `<div class="board-column">
                            <div class="board-column-title">${statuses[i]['title']}</div>
                            <div class="board-column-content" something="${boardId}/${parseInt(i) +1}" column="${parseInt(i) +1}"></div></div>`)
        }
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            domManager.addChild(`.board-column-content[something="${boardId}/${card['status_id']}"]` , content);
            domManager.addEventListener(
                `.card[data-card-id="${card.id}"]`,
                "click",
                deleteButtonHandler
            );
        }

        DragAndDrop();
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

function DragAndDrop()  {
    const cards = document.querySelectorAll('.card');
    const containers = document.querySelectorAll('.board-column-content');
    cards.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            console.log('DragStart')
            draggable.classList.add('dragging')
        })

        draggable.addEventListener('dragend', () => {
            console.log('DragEnd')
            draggable.classList.remove('dragging')
        })
    })

    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            console.log('DragOver')
            e.preventDefault()
            const draggable = document.querySelector('.dragging')
            container.appendChild(draggable)
            changeColumnAttr(container, draggable)
            saveDragChanges(container, draggable)
        })
    })
}

function changeColumnAttr(container, draggable){
    let column = container.getAttribute("column")
    draggable.setAttribute("card-column", column)
}

function saveDragChanges(container, draggable){
    const cardColumnId = draggable.getAttribute("card-column")
    const boardId = container.parentElement.parentElement.getAttribute("data-board-id")
    const cardId = draggable.getAttribute("data-card-id")
    dragChangesAjax(boardId, cardColumnId, cardId)
}

function dragChangesAjax(board_id, card_column_id, card_id){
            $.ajax({
            url: `/save_drag_changes/${board_id}/${card_column_id}/${card_id}`,
            type: "POST",
            dataType: "Json",
            });
}