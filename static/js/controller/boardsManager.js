import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates, addColumnButton} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
import {loginRegister} from "./userManager.js";

export let boardsManager = {
    loadBoards: async function () {
        let loggedData = await dataHandler.getLoggedStatus();
        loginRegister(loggedData);
        clearBoards();
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            let baseTitle = board.title
            domManager.addChild("#root", content);
            domManager.addEventListener(
            `.board-title[data-board-id="${board.id}"]`,
            "keydown",
            ()=>{saveBoardTitleChange(board.id, baseTitle)}
            );
            domManager.addEventListener(
                `.board-toggle[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
            //domManager.addEventListener()
        }
    },
    boardButton: async function () {
        domManager.addEventListener('#primary-button','click', createNewBoard)
    },


};

 function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    if (clickEvent.target.innerText === 'ᐯ'){
        cardsManager.loadCards(boardId);
        const column = addColumnButton()
        const list = document.querySelector(".board-header")
        clickEvent.target.insertAdjacentHTML('afterend', column)
        clickEvent.target.innerHTML = '&#5169;';
        const btn = document.getElementById('add-card')
         btn.addEventListener( 'click', createCard)
    }
    else {
        cardsManager.hideCards(boardId);
        document.getElementById('add-column').remove()
        document.getElementById('add-card').remove()
        clickEvent.target.innerHTML = 'ᐯ';
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


function limitTitleLength(boardId){
    let boardTitle = document.querySelector(`.board-title[data-board-id="${boardId}"]`)
     $(boardTitle).on("keypress paste", function (e) {
         console.log(boardTitle.getAttribute("max"))
        if (boardTitle.innerHTML.length >= boardTitle.getAttribute("max")) {
            e.preventDefault();
            return false;
        }
    });
}


function saveBoardTitleChange(boardId) {
    deleteExistingButton()
    limitTitleLength(boardId)
    let board = document.querySelector(`.board-header[data-board-id="${boardId}"]`)
    let saveButton = createSaveButton()

    board.appendChild(saveButton)
    saveButton.addEventListener("click",()=>{
        let newTitle = document.querySelector(`.board-title[data-board-id="${boardId}"]`).innerHTML
        changeTitleAjax(boardId, newTitle)
    })
}


function changeTitleAjax(boardId, newTitle){
            $.ajax({
            url: `/change_board_title/${boardId}/${newTitle}`,
            type: "POST",
            dataType: "Json",
            success: function (data){
                $(board-title).replace(data)
            }
            });
        deleteExistingButton()
}


function deleteExistingButton(){
    if(document.body.contains(document.querySelector('.saveButton'))) {
        document.querySelector(".saveButton").remove()
    }
}


function createSaveButton(){
    let saveButton = document.createElement("button")
    saveButton.classList.add("saveButton")
    saveButton.innerHTML = "Save"
    return saveButton
}

async function createNewBoard(){
    const title = document.getElementById("board-title").value
    await dataHandler.createNewBoard(title).then(r => {return console.log(r)})
        boardsManager.loadBoards()

}

function clearBoards(){
    const boards = document.querySelector(".board-container #root")
    boards.innerHTML = ""
}

async function createCard(event){
     const divTarget = event.target.parentNode.nextSibling.nextSibling.childNodes[1]
    const id = divTarget.getAttribute('data-board-id')
    const title = window.prompt()
    const newStatusId = 1
    await dataHandler.createNewCard(title, id, newStatusId)

    }

