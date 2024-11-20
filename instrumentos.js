
// Cria o contexto de áudio
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Função para tocar um som de guitarra elétrica com eco, fade-in e fade-out
var playGuitarraEletrica = function(frequency, duration, startTime = 0) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const delayNode = audioContext.createDelay();
    const feedbackNode = audioContext.createGain(); // Para controle do feedback do delay
  
    // Usamos uma onda triangular para imitar o som de uma guitarra elétrica
    oscillator.type = 'triangle'; // Onda triangular é mais rica em harmônicos
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + startTime);
  
    // Configura o ganho
    gainNode.gain.setValueAtTime(0, audioContext.currentTime + startTime); // Inicia com silêncio
    gainNode.gain.linearRampToValueAtTime(0.8, audioContext.currentTime + startTime + 0.1); // Fade-in: aumenta rapidamente
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + startTime + duration - 0.1); // Sustento com leve decaimento
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + startTime + duration); // Fade-out: diminui até o silêncio
  
    // Configura o delay
    delayNode.delayTime.setValueAtTime(0.3, audioContext.currentTime + startTime); // Tempo de delay de 300ms
    feedbackNode.gain.setValueAtTime(0.3, audioContext.currentTime + startTime); // Nível de feedback do delay
  
    // Conecta o oscilador ao ganho, depois ao delay e ao feedback
    oscillator.connect(gainNode);
    gainNode.connect(delayNode);
    delayNode.connect(feedbackNode);
    feedbackNode.connect(delayNode); // Feedback do delay vai para o próprio delay
    delayNode.connect(audioContext.destination);
  
    // Inicia o oscilador
    oscillator.start(audioContext.currentTime + startTime);
    // Para o oscilador após o tempo de duração total
    oscillator.stop(audioContext.currentTime + startTime + duration);
  };



  // Função para tocar uma nota de piano com eco, fade-in e fade-out
var playPiano = function(frequency, duration, startTime = 0) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const delayNode = audioContext.createDelay();
    const feedbackNode = audioContext.createGain(); // Para controle do feedback do delay
  
    // Usamos uma onda senoidal para imitar o som de um piano eletrônico
    oscillator.type = 'sine'; // Onda senoidal para um som mais suave
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + startTime);
  
    // Configura o ganho
    gainNode.gain.setValueAtTime(0, audioContext.currentTime + startTime); // Inicia com silêncio
    gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + startTime + 0.05); // Fade-in: aumenta rapidamente
    gainNode.gain.linearRampToValueAtTime(0.7, audioContext.currentTime + startTime + duration - 0.05); // Sustento com leve decaimento
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + startTime + duration); // Fade-out: diminui até o silêncio
  
    // Configura o delay
    delayNode.delayTime.setValueAtTime(0.2, audioContext.currentTime + startTime); // Tempo de delay de 200ms
    feedbackNode.gain.setValueAtTime(0.2, audioContext.currentTime + startTime); // Nível de feedback do delay
  
    // Conecta os nodes
    oscillator.connect(gainNode);
    gainNode.connect(delayNode);
    delayNode.connect(feedbackNode);
    feedbackNode.connect(delayNode); // Feedback do delay vai para o próprio delay
    delayNode.connect(audioContext.destination);
  
    // Inicia o oscilador
    oscillator.start(audioContext.currentTime + startTime);
    // Para o oscilador após o tempo de duração total
    oscillator.stop(audioContext.currentTime + startTime + duration + 0.2); // Adiciona um tempo extra para o eco
  
    // Configura o delay para terminar após o tempo de duração total
    delayNode.delayTime.setValueAtTime(0.2, audioContext.currentTime + startTime + duration + 0.2); // Tempo de delay de 200ms
  };

  // Função para tocar uma nota de violino
function playViolin(frequency, duration, startTime = 0) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();
  const modulator = audioContext.createOscillator();
  const modulatorGain = audioContext.createGain();

  // Parâmetros do violino
  const attackTime = 0.05;
  const decayTime = 0.2;
  const sustainLevel = 0.5;
  const releaseTime = 0.3;

  // Tempo de início no AudioContext
  const currentTime = audioContext.currentTime;
  const start = Math.max(currentTime + startTime, currentTime); // Garantir que o tempo de início não seja negativo
  const end = start + duration;
  const sustainEnd = Math.min(end - releaseTime, start + duration); // Garantir que o final do sustain não seja após o final

  // Configura o oscilador principal
  oscillator.type = 'sine'; // Onda senoidal
  oscillator.frequency.setValueAtTime(frequency, start);

  // Configura o modulador para criar um efeito vibrato
  modulator.type = 'sine';
  modulator.frequency.setValueAtTime(5, start); // Frequência do vibrato
  modulatorGain.gain.setValueAtTime(0.5, start); // Intensidade do vibrato

  // Configura o filtro para modelar o timbre
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1500, start); // Frequência de corte

  // Configura o ganho para o envelope ADSR
  gainNode.gain.setValueAtTime(0, start);
  gainNode.gain.linearRampToValueAtTime(1, start + attackTime); // Fade-in
  gainNode.gain.linearRampToValueAtTime(sustainLevel, start + attackTime + decayTime); // Decay
  gainNode.gain.setValueAtTime(sustainLevel, sustainEnd); // Sustain
  gainNode.gain.linearRampToValueAtTime(0, end); // Fade-out

  // Conecta os nodes
  oscillator.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioContext.destination);

  modulator.connect(modulatorGain);
  modulatorGain.connect(oscillator.frequency); // Aplica o vibrato à frequência do oscilador

  // Inicia os osciladores
  oscillator.start(start);
  modulator.start(start);

  // Para os osciladores após o tempo de duração total
  oscillator.stop(end);
  modulator.stop(end);
}