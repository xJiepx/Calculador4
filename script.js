const criticalAlert = document.getElementById('critical-alert');

setTimeout(() => {
  criticalAlert.classList.add('pulse');
}, 1200);

criticalAlert.addEventListener('click', () => {
  criticalAlert.classList.remove('pulse');
});
