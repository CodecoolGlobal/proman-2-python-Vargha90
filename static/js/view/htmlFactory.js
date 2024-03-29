export const htmlTemplates = {
    board: 1,
    card: 2,
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder
};

export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }

    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
}

function boardBuilder(board) {
    return `<section class="board">
                <div class="board-header" data-board-id="${board.id}"><span id="board-title" contentEditable = 'true' max="50" class="board-title" data-board-id="${board.id}">${board.title}</span>
                    <button class="board-toggle toggle-board-button" data-board-id="${board.id}">&#5167;</button>
                </div>
                <div class="board-container">
                    <div class="board" id=${board.id} data-board-id=${board.id}>
                    <div class="board-columns" data-board-id=${board.id}></div>
                    </div>
                </div>
            </section>`;
    /*<section class="board">
            <div class="board-header"><span class="board-title">Board 1</span>
                <button class="board-add">Add Card</button>
                <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
            </div>
            <div class="board-columns">
                <div class="board-column">
                    <div class="board-column-title">New</div>
                    <div class="board-column-content">
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 1</div>
                        </div>
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 2</div>
                        </div>
                    </div>
                </div>
                <div class="board-column">
                    <div class="board-column-title">In Progress</div>
                    <div class="board-column-content">
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 1</div>
                        </div>
                    </div>
                </div>
                <div class="board-column">
                    <div class="board-column-title">Testing</div>
                    <div class="board-column-content">
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 1</div>
                        </div>
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 2</div>
                        </div>
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 3</div>
                        </div>
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 4</div>
                        </div>
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 5</div>
                        </div>
                    </div>
                </div>
                <div class="board-column">
                    <div class="board-column-title">Done</div>
                    <div class="board-column-content">
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 1</div>
                        </div>
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 2</div>
                        </div>
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 3</div>
                        </div>
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 4</div>
                        </div>
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 5</div>
                        </div>
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 6</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>*/
}

function cardBuilder(card) {
    return`<div class="card" contentEditable='true' card-column="${card.status_id}" draggable="true" data-card-id="${card.id}">${card.title}</div>`;

}

export function addColumnButton(){
    return`<button class="board-add" id="add-card">Add Card</button>
<button class="board-add" id="add-column">Add Column</button>`;

}