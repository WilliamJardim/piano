var nomeInstrumento = 'piano';

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

mapaTeclas.todasTeclas = mapaTeclas.cima.concat(mapaTeclas.baixo);

// Adiciona ouvintes de clique aos botões das teclas
mapaTeclas.tecla2tecla = {};
document.querySelectorAll('.key').forEach( (key, keyIndex) => {

    const aTecla = mapaTeclas.todasTeclas[keyIndex];

    key.setAttribute('tecla-vinculada', aTecla);
    mapaTeclas.tecla2tecla[aTecla] = key;

    function tocarTecla(){
        const note = key.getAttribute('data-note');
        switch(nomeInstrumento){
            case 'guitarra':
                playGuitarraEletrica(Number(note), 0.4);
                break;

            case 'piano':
                 playPiano(Number(note), 0.2);
                 break;

            case 'violino':
                playViolin(Number(note), 0.5, 0);
                break;

            default:
                break;
        }
    }

    key.addEventListener('click', () => {
        tocarTecla();
    });

});

window.addEventListener('keydown', function(evento){
    const nomeTecla = evento.code.replace('Key', '').toLowerCase();
    if( mapaTeclas.tecla2tecla[nomeTecla] ){
        mapaTeclas.tecla2tecla[nomeTecla].click();
        mapaTeclas.tecla2tecla[nomeTecla].oldBackgroundColor =  mapaTeclas.tecla2tecla[nomeTecla].style.backgroundColor;
        mapaTeclas.tecla2tecla[nomeTecla].style.backgroundColor = 'green'
    }
});

window.addEventListener('keyup', function(evento){
    const nomeTecla = evento.code.replace('Key', '').toLowerCase();
    if( mapaTeclas.tecla2tecla[nomeTecla] ){
        mapaTeclas.tecla2tecla[nomeTecla].click();
        mapaTeclas.tecla2tecla[nomeTecla].style.backgroundColor = mapaTeclas.tecla2tecla[nomeTecla].oldBackgroundColor;
    }
});