const gridContainer = document.getElementById('grid-container');
const output = document.getElementById('output');

// Create grid
for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');
    cell.dataset.index = i;
    gridContainer.appendChild(cell);

    cell.addEventListener('click', () => addSquare(cell));
}

// Add a square to a cell
function addSquare(cell) {
    if (!cell.querySelector('.square')) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.draggable = true;

        square.addEventListener('dragstart', dragStart);
        square.addEventListener('dragend', dragEnd);

        // Adicionar evento de clique para remover o quadrado
        square.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que o evento clique atinja a célula
            removeSquare(square);
        });

        cell.appendChild(square);
    }
}

function removeSquare(square) {
    if (square && square.parentElement) {
        square.parentElement.removeChild(square);
    }
}

// Drag and drop functionality
let draggedSquare = null;

function dragStart(e) {
    draggedSquare = e.target;
    setTimeout(() => draggedSquare.classList.add('hidden'), 0);
}

function dragEnd(e) {
    draggedSquare.classList.remove('hidden');
    draggedSquare = null;
}

gridContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    const cell = e.target.closest('.grid-cell');
    if (cell && !cell.querySelector('.square')) {
        cell.appendChild(draggedSquare);
    }
});

// Read the grid and output groupings
function lerGrid(){
    const groupings = [];
    const cells = document.querySelectorAll('.grid-cell');

    for (let i = 0; i < 50; i++) {
        const row = [];
        for (let j = 0; j < 50; j++) {
            const cell = cells[i * 50 + j];
            if ( cell && cell.querySelector('.square')) {
                row.push(cell.dataset.index);
            }
        }
        if (row.length > 0) {
            groupings.push(row);
        }
    }

    return groupings;
}


/*
const piano = document.querySelector('.piano');
const whiteKeysCount    = 18;              // Quantidade de teclas brancas
const blackKeyPositions = [2, 3, 5, 6, 7]; // Posições das teclas pretas em cada oitava (sem as teclas brancas 3 e 7)

for (let i = 0; i < whiteKeysCount; i++) {
    // Criar tecla branca
    const whiteKey = document.createElement('div');
    whiteKey.classList.add('white-key');
    piano.appendChild(whiteKey);
    
    // Checar se deve adicionar uma tecla preta (em posições específicas)
    if (blackKeyPositions.includes(i % 7)) {  // As teclas pretas se repetem a cada 7 teclas brancas
        const blackKey = document.createElement('div');
        blackKey.classList.add('black-key');
        // Posicionar corretamente sobre as teclas brancas
        blackKey.style.gridColumn = i + 2;  // Tecla preta fica entre as teclas brancas
        piano.appendChild(blackKey);
    }
}*/