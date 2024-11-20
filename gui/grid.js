// Estrutura de dados para armazenar o estado dos cubos
let gridData = Array(6).fill().map(() => Array(28).fill(null));

const gridContainer = document.getElementById('grid-container');

// Variável global para bloquear a adição temporária
let canAddCube = true; 

// Função para renderizar a grid e os cubos
function renderGrid() {
    gridContainer.innerHTML = ''; // Limpa o grid existente

    // Itera sobre as células da grid
    for (let row = 0; row < gridData.length; row++) {
        for (let col = 0; col < gridData[row].length; col++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            cell.dataset.index = `${row}-${col}`;

            // Verificar se a célula contém cubos (dados) e renderizar
            const cubeData = gridData[row][col];
            if (cubeData != null) {
                const cube = document.createElement('div');
                cube.classList.add('grid-cube');
                cube.dataset.cubeData = JSON.stringify(cubeData);
                cube.style.backgroundColor = '#28a745'; // Cor para cubos "preenchidos"

                // Armazenar as informações de linha e coluna no elemento
                cube.dataset.row = row; // Guardar a linha
                cube.dataset.col = col; // Guardar a coluna

                // Adicionar evento de clique para remover o cubo
                cube.addEventListener('click', function(e) {
                    removeCube(e.target.dataset.row, e.target.dataset.col);
                });

                cell.appendChild(cube);
            }

            // Adicionar evento de clique na célula para adicionar cubo
            cell.addEventListener('click', () => {
                if (!gridData[row][col] && canAddCube) { // Se não houver cubo, adicionar um
                    canAddCube = false; // Desativa a adição temporariamente

                    setTimeout(() => {
                        addCube(row, col);  // Adiciona o cubo após o tempo de espera
                        canAddCube = true;   // Permite adicionar cubos novamente após 500ms
                    }, 100); // Espera 500ms antes de permitir a adição do cubo
                }
            });

            gridContainer.appendChild(cell);
        }
    }
}

// Função para adicionar um cubo na grid
function addCube(row, col) {
    // Verifica se já há um cubo nesta posição
    if ( gridData[row][col] == null ) {
        const newCubeData = { name: 'Novo Cubo', color: '#28a745' }; // Dados fictícios do cubo
        gridData[row][col] = newCubeData;  // Armazena os dados do cubo na gridData
        renderGrid();  // Redesenha a grid para refletir a mudança
    }
}

// Função para remover um cubo da grid
function removeCube(row, col) {
    // Limpa os dados da célula na gridData
    gridData[row][col] = null;  // Remove o cubo (define como null)
    renderGrid();  // Redesenha a grid para refletir a remoção
    canAddCube = false;
    setTimeout(()=>{
        canAddCube = true;
    }, 500)
}

// Inicializa a grid
renderGrid();