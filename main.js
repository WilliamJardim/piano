// Função para tocar a música
function playMusic( nodes ) {

  nodes.forEach(function( element, i ){
   
   //Se for um array de notas(nota composta)
   if( element instanceof Array ){
       if( element['paralel'] == true ){
         setTimeout(function(){
           playMusic( element );
         },0);

       //Se a nota não estiver em paralelo
       }else{
          playMusic( element );
       }

   }else{

     const previousElement = nodes[i-1];
     const sameinstant = element['sameinstant'] == true;

     if( element['type'] == undefined ){
         element['type'] = 'piano'; //A default type
     }
     if( element['duration'] == undefined ){
         element['duration'] = 0.3; //A default duration
     }
     if( element['startTime'] == undefined ){

         if( previousElement != undefined ){
             element['startTime'] = previousElement['startTime'];

         }else if( previousElement == undefined ){{
             element['startTime'] = 0; //A default startTime
         }

     }

     const startTime = element['startTime'] || 0; // Tempo de início opcional
 
     const newStartTime = sameinstant == true ? startTime : (startTime + ( previousElement ? previousElement['duration'] : 0));
     element['startTime'] = newStartTime;

     if (element['type'] === 'guitar') {
       if( !element['note'] || !element['duration'] || !newStartTime ){
         //AQUI O element['startTime'] deu NaN
       }
       playGuitarraEletrica(element['note'], element['duration'], newStartTime );

     } else if (element['type'] === 'piano') {
       if( !element['note'] || !element['duration'] || !newStartTime ){
         
       }
       playPiano(element['note'], element['duration'], newStartTime );
     }
   }
 }
});
}

/** Abstrations for Audio Engine  */
var Tone = function( config={} ){
   let context = {};
   context._config        = config;
   context.notes          = config.notes;
   context.allParael      = config.paralel;
   context.type           = config.type || null;
   context.duration       = config.duration || null;

   //Se todas as notas do tom estiverem em paralelo
   if( context.allParael == true ){
      context.notes.forEach(function(note){
          note.paralel = true;
      })
   }

   //Se todas as notas do tom tiverem um tipo
   if( context.type ){
     context.notes.forEach(function(note){
        note.type = context.type;
     })
   }

   //Se todas as notas do tom tiverem uma duração
   if( context.duration ){
    context.notes.forEach(function(note){
      note.type = context.duration;
    })
   }

   context.getNotes = function(){
      return context.notes;
   }

   return context;
}

/**
* Instantiate itself as a copy of a another tone
* @param {Tone} anotherTone 
* @returns 
*/
Tone.replicate = function(anotherTone){
  let toneNotes = [... anotherTone.getNotes()].copyWithin();

  return Tone({
    notes: toneNotes,
    paralel: anotherTone.paralel
  });
}

var Composition = function( tonesArray ){
   let context = {};
   context.tones = tonesArray;

   context.getTones = function(){
      return context.tones;
   }

   return context;
}

function playComposition( compositionObj ){
  
  if( compositionObj instanceof Array ){
    setTimeout(function(){
      playComposition( compositionObj );
    },0);

  }else{

     const tones = compositionObj.getTones();
     const nodes = tones.map( function(tone){ return tone.getNotes() } );
     playMusic( nodes );
  }

}


/*
  document.querySelectorAll('.container')[0].innerHTML = ``;
  for( let i = 300 ; i < 1090 ; i = i + 10 ){
    document.querySelectorAll('.container')[0].innerHTML += `<div class="piano-key" data-convert="false" data-note="${i}"></div>`;
  }

// Adiciona ouvintes de clique aos botões das teclas
document.querySelectorAll('.piano-key').forEach(key => {
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
*/
