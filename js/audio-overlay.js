document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('song');
  const overlay = document.getElementById('overlay');
  const playButton = document.getElementById('play-button');
  const circleReveal = document.getElementById('circle-reveal');

  if (!audio || !overlay || !playButton || !circleReveal) {
    console.error('One or more required elements not found in the DOM.');
    return;
  }

  function playAudio() {
    audio.muted = false;
    audio.play().then(() => {
      console.log('Audio started playing');
      // Start circle reveal animation
      circleReveal.classList.add('expand');

      // After animation ends, hide overlay
      circleReveal.addEventListener('transitionend', () => {
        overlay.style.display = 'none';
      }, { once: true });

      localStorage.setItem('audioPlayed', 'true');
    }).catch((e) => {
      console.log('Audio play failed:', e);
    });
  }

  playButton.addEventListener('click', playAudio);

  window.addEventListener('load', () => {
    if (localStorage.getItem('audioPlayed') === 'true') {
      // If audio already played, hide overlay and play audio
      overlay.style.display = 'none';
      audio.muted = false;
      audio.play().catch(() => {});
    } else {
      // Show overlay and wait for user to click play
      overlay.style.display = 'flex';
    }
  });
});
