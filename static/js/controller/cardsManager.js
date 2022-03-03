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
            changeCardTitle(card.id)
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
            draggable.classList.add('dragging')
        })

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging')
        })
    })

    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault()
            const afterElement = getDragAfterElement(container, e.clientY)
            const draggable = document.querySelector('.dragging')
            if (afterElement == null){
                container.appendChild(draggable)
            } else {
                container.insertBefore(draggable, afterElement)
            }
            changeColumnAttr(container, draggable)
            saveDragChanges(container, draggable)
        })
    })
}

function getDragAfterElement(container, y){
    const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')]
    return draggableElements.reduce((closest, child) =>{
        const box = child.getBoundingClientRect()
        const offset = y -box.top - box.height / 2
        if (offset < 0 && offset > closest.offset){
            return {offset: offset, element: child}
        }
        else{
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element
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
function changeCardTitle(cardId){
    let card = document.querySelector(`.card[data-card-id="${cardId}"]`)
    let base_value = card.innerText
    $(card).on('keydown', function (event) {
    if (event.keyCode === 13) {
        onEnter(event, card, cardId)
        base_value = card.innerText
    }
    else if(event.keyCode === 27){
        onEscape(card, base_value)
    }
    detectClickOutside(event, card, cardId)
   });
}

function onEnter(event, card, cardId){
    event.preventDefault();
    card.blur()
    card.classList.add("changed")
    changeCardTitleAjax(cardId, card.innerText)
}

function onEscape(card, base_value){
    card.blur()
    card.innerText =  base_value
}

function detectClickOutside(event, card, cardId){
    jQuery(function($){
        $(card).click(function(e){
        e.stopPropagation();
        });
    $(document).click(function() {
        card.blur()
        onEnter(event, card, cardId)
      });
    });
}

function changeCardTitleAjax(card_id, new_title){
            $.ajax({
            url: `/change_card_title/${card_id}/${new_title}`,
            type: "POST",
            dataType: "Json",
            success: function (data){
                $(card).replace(data)
            }
            });
}
