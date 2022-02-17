import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates, addColumnButton} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";

export let boardsManager = {
    loadBoards: async function () {
        // refresh
        clearBoards()
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            await allowBoardTitleChange()
            domManager.addEventListener(
            `.board-title[data-board-id="${board.id}"]`,
            "input",
            ()=>{saveBoardTitleChange(board.id)}
            );
            domManager.addEventListener(
                `.board-toggle[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
            //domManager.addEventListener()
        }
    },
    initClick: async function () {
        // domManager.addEventListener(".create-board-button","click", createNewBoard)
        domManager.addEventListener('#primary-button','click', createNewBoard)
    }
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    if (clickEvent.target.innerText === 'ᐯ'){
        cardsManager.loadCards(boardId);
        const column = addColumnButton()
        const list = document.querySelector(".board-header")
        clickEvent.target.insertAdjacentHTML('afterend', column)
        console.log(list)
        clickEvent.target.innerHTML = '&#5169;';
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

export async function allowBoardTitleChange(){
    const boardTitles = document.querySelectorAll(".board-title")
    for(let boardTitle of boardTitles){
        boardTitle.contentEditable = 'true'
    }
}

function saveBoardTitleChange(boardId) {
     if(document.body.contains(document.querySelector('.saveButton'))){
         deleteExistingButton()
     }
    let board = document.querySelector(`.board-header[data-board-id="${boardId}"]`)
    let newTitle = document.querySelector(`.board-title[data-board-id="${boardId}"]`).innerHTML
    let saveButton = createSaveButton()
    board.appendChild(saveButton)
    saveButton.addEventListener("click",()=>{
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
    let saveButton = document.querySelector(".saveButton")
    saveButton.remove()
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