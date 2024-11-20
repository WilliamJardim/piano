//Teclas de cima
document.getElementById('teclas-cima').innerHTML = ``;
for( let i = 300 ; i < 500 ; i = i + 10 ){
    document.getElementById('teclas-cima').innerHTML += `<div class="key black" data-convert="false" data-note="${i}"></div>`;
}

//Teclas de baixo
document.getElementById('teclas-baixo').innerHTML = ``;
for( let i = 300 ; i < 1000 ; i = i + 10 ){
    document.getElementById('teclas-baixo').innerHTML += `<div class="key white" data-convert="false" data-note="${i}"></div>`;
}

// Adiciona ouvintes de clique aos botões das teclas
document.querySelectorAll('.key').forEach(key => {

    key.addEventListener('click', () => {
        const note = key.getAttribute('data-note');

        if( !key.getAttribute('data-convert') ){
            playGuitarraEletrica(notes[note], 0.5);
        
        }else if( key.getAttribute('data-convert') == "false" )
        {
            playGuitarraEletrica(Number(note), 0.5);
        }
    });

});