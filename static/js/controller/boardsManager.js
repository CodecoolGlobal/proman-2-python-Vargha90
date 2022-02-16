import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";

export let boardsManager = {
    loadBoards: async function () {
        domManager.addEventListener(".create-board-button","click", createNewBoard)
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            await changeBoardTitle()
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
            domManager.addEventListener()
        }
    },
};


function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    if (clickEvent.target.innerText == 'ᐯ'){
        cardsManager.loadCards(boardId);
        clickEvent.target.innerHTML = '&#5169;';
    }
    else {
        cardsManager.hideCards(boardId);
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

export async function changeBoardTitle(){
    const boardTitles = document.querySelectorAll(".board-title")
    for(let boardTitle of boardTitles){
        boardTitle.contentEditable = 'true'
    }
}

function saveBoardTitleChange(boardId) {
    if (document.querySelector(".saveButton") == null){
        let saveButton = document.createElement("button")
        let board = document.querySelector(`.board-header[data-board-id="${boardId}"]`)
        saveButton.classList.add("saveButton")
        saveButton.innerHTML = "Save"
        console.log(saveButton)
        board.appendChild(saveButton)
        saveButton.addEventListener("click",()=>{
            //coming soon
        })

    }
}

function createNewBoard(){
document.addEventListener('click', (e)=>{
    const data = e.target
    console.log(data)
    })

}