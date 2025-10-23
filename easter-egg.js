// --- Konami Code Easter Egg ---
const konamiCode = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];
let konamiIndex = 0;

function handleKeyDown(event) {
  const requiredKey = konamiCode[konamiIndex];
  if (event.key === requiredKey) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      triggerEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
}

function triggerEasterEgg() {
  document.getElementById('easter-egg').style.display = 'block';
}

function closeEasterEgg() {
  document.getElementById('easter-egg').style.display = 'none';
}

document.addEventListener('keydown', handleKeyDown);
document.getElementById('easter-egg-close').addEventListener('click', closeEasterEgg);

// --- EASTER EGG (Flash & Corrupt) ---
let isCorrupted = false;
const flashbang = document.getElementById('flashbang');
const corruptionChars = '█▒▓░ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?#';
let corruptionInterval;
let finalBreakTimeout;

function playPowerDownSound() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'sawtooth';
    const now = audioCtx.currentTime;
    const duration = 0.5;

    oscillator.frequency.setValueAtTime(440, now);
    oscillator.frequency.exponentialRampToValueAtTime(50, now + duration);

    gainNode.gain.setValueAtTime(0.5, now);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);
  } catch (e) {
    console.error("Could not play power down sound:", e);
  }
}

function animateFailureText(element, textToAnimate) {
  let currentCharIndex = 0;
  const typingSpeed = 100;

  const interval = setInterval(() => {
    element.innerText = textToAnimate.substring(0, currentCharIndex);
    
    if(currentCharIndex >= textToAnimate.length){
      clearInterval(interval);
      playPowerDownSound();

      setTimeout(() => {
        location.reload();
      }, 2000);
      
    } else {
      currentCharIndex++;
    }
  }, typingSpeed);
}

function corruptRandomElement() {
  const allElements = document.querySelectorAll('body *');
  const safeElements = Array.from(allElements).filter(el => 
      el.tagName !== 'SCRIPT' && 
      el.tagName !== 'STYLE' && 
      el.tagName !== 'AUDIO' &&
      !el.closest('#easter-egg') && 
      el.id !== 'flashbang' &&
      !el.closest('.failure-message') &&
      !el.closest('#failure-wrapper') 
  );
  if (safeElements.length === 0) return;

  const randomElement = safeElements[Math.floor(Math.random() * safeElements.length)];
  const corruptionType = Math.floor(Math.random() * 4);

  try {
    switch (corruptionType) {
      case 0: // Text Glitch
        const textNode = Array.from(randomElement.childNodes).find(node => node.nodeType === 3 && node.textContent.trim().length > 1);
        if (textNode) {
          let text = textNode.textContent;
          let charIndex = Math.floor(Math.random() * text.length);
          let randomChar = corruptionChars[Math.floor(Math.random() * corruptionChars.length)];
          textNode.textContent = text.substring(0, charIndex) + randomChar + text.substring(charIndex + 1);
        }
        break;
      case 1: // Displacement Glitch
        randomElement.style.position = 'relative';
        randomElement.style.left = Math.random() * 10 - 5 + 'px';
        randomElement.style.top = Math.random() * 10 - 5 + 'px';
        randomElement.style.transform = `rotate(${Math.random() * 4 - 2}deg)`;
        break;
      case 2: // Color Glitch
        randomElement.style.color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
        randomElement.style.background = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
        break;
      case 3: // Fade Glitch
        randomElement.style.opacity = Math.random();
        break;
    }
  } catch (e) {
    // Ignore errors
  }
}

function startCorruption() {
  flashbang.style.display = 'block';
  
  setTimeout(() => {
    flashbang.style.display = 'none';
    
    corruptionInterval = setInterval(corruptRandomElement, 50);
    
    finalBreakTimeout = setTimeout(() => {
      clearInterval(corruptionInterval);
      
      document.body.className = 'failure-state';
      document.body.innerHTML = '<div id="failure-wrapper" style="display: flex; justify-content: center; align-items: center; height: 100%; width: 100%; padding: 1em; box-sizing: border-box;"><h1 class="failure-message" id="failure-text"></h1></div>';
      
      const failureTextElement = document.getElementById('failure-text');
      animateFailureText(failureTextElement, "CHAOS CONTROL!");
      
    }, 10000);

  }, 500);
}
