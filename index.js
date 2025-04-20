const data = {
  years: null,
  months: null,
  weeks: null,
  days: null,
  hours: null,
  minutes: null,
  seconds: null,
  time: new Date(2019, 3, 21, 8, 45, 0, 0) // 21/4/2019 @ 8:45 AM Sri Lanka Time
};
 
// Cache DOM elements to improve performance
const progresses = document.querySelectorAll(".progress[fraction]");
let animationFrameId = null;
let isMobile = window.innerWidth < 768;

// Check device type on resize for responsive adjustments
window.addEventListener('resize', () => {
  isMobile = window.innerWidth < 768;
});

// Handle visibility change to save battery on mobile
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cancelAnimationFrame(animationFrameId);
  } else {
    update();
  }
});

update();

function update() {
  const now = new Date().getTime();
  const seconds = (now - data.time) / 1000;
  data.years = seconds / 31556952;
  data.months = seconds / 2592000;
  data.weeks = seconds / 604800;
  data.days = seconds / 86400;
  data.hours = seconds / 3600;
  data.minutes = seconds / 60;
  data.seconds = seconds;
  updatePies();
  
  // Use less frequent updates on mobile to improve performance
  if (isMobile) {
    animationFrameId = setTimeout(update, 1000); // Update once per second on mobile
  } else {
    animationFrameId = requestAnimationFrame(update);
  }
}

function updatePies() {
  const radius = 25;
  const circumference = radius * 2 * Math.PI;
  progresses.forEach(progress => {
    const value = data[progress.getAttribute("fraction")];
    const complete = Math.floor(value);
    let v = complete.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    // Format numbers differently based on their value
    if (complete < 10) v = value.toFixed(2);
    if (complete < 1) v = value.toFixed(3);
    
    // Optimize for mobile by reducing decimal places on small screens
    if (isMobile && complete > 1000) {
      v = Math.floor(complete).toLocaleString();
    }
    
    progress.querySelector("h2").innerText = v;
    const percent = Math.round((value - complete) * 100 * 10) / 10;
    const offset = circumference - (percent / 100) * circumference;
    
    progress.querySelector(
      ".left"
    ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 100 100">
    <circle class="bg" r="${radius}" cx="50" cy="50" />
    <circle
      class="prog"
      r="${radius}"
      cx="50"
      cy="50"
      stroke-dasharray="${circumference} ${circumference}"
      stroke-dashoffset="${offset}"
    />
  </svg>`;
  });
}
