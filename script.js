function startQuiz()
{
    document.getElementById("quiz-section").classList.remove("hidden");
    document.getElementById("result-section").classList.add("hidden");
}

function calculateSelfCare(){
    const form=document.getElementById("quiz-form");
    const inputs=form.querySelectorAll('input[type="checkbox"]');
    let score=0;

    inputs.forEach((checkbox)=>{if (checkbox.checked){score++;}});

    const result=document.getElementById("result-section");
    const rating=document.getElementById("rating-text");

    if(score>=8){
        rating.innerText="Execellent!Youre taking great care of your self";
    }
    else if(score>=5)
    {
         rating.innerText="You are doing ok but there's more to improve";
    }
    else
    {
        rating.innerText="Its high time is to priorities to yourself";
    }

    document.getElementById("result-section").classList.remove("hidden");
    result.style.display="block";
}

// Save notes to localStorage
function saveNotes() {
  const notes = document.getElementById("notes-area").value;
  localStorage.setItem("selfCareNotes", notes);
  const status = document.getElementById("save-status");
  if (status) {
    status.innerText = "✅ Notes saved!";
  }
}

function loadNotesFromStorage() {
  const savedNotes = localStorage.getItem("selfCareNotes");
  if (savedNotes) {
    const notesArea = document.getElementById("notes-area");
    if (notesArea) {
      notesArea.value = savedNotes;
    }
  }
}

const selfCareChecklistTasks = [
  { key: 'drinkWater', label: 'Drink a glass of water' },
  { key: 'stretch', label: 'Stretch or move for 5 minutes' },
  { key: 'breathe', label: 'Take a deep breathing break' },
  { key: 'rest', label: 'Give yourself a restful pause' },
  { key: 'gratitude', label: 'Notice one thing you\'re grateful for' }
];

function saveChecklist() {
  const checklistState = {};
  selfCareChecklistTasks.forEach(item => {
    const checkbox = document.querySelector(`[data-task="${item.key}"]`);
    checklistState[item.key] = checkbox ? checkbox.checked : false;
  });
  localStorage.setItem('selfCareChecklist', JSON.stringify(checklistState));
  const status = document.getElementById('checklist-status');
  if (status) {
    status.innerText = '✅ Checklist saved!';
  }
}

function loadChecklist() {
  const savedChecklist = JSON.parse(localStorage.getItem('selfCareChecklist') || '{}');
  selfCareChecklistTasks.forEach(item => {
    const checkbox = document.querySelector(`[data-task="${item.key}"]`);
    if (checkbox) {
      checkbox.checked = !!savedChecklist[item.key];
    }
  });
  const status = document.getElementById('checklist-status');
  if (status) {
    status.innerText = 'Checklist loaded.';
  }
}

function getMoodHistory() {
  return JSON.parse(localStorage.getItem('moodHistory') || '[]');
}

function saveMood(mood) {
  const history = getMoodHistory();
  history.unshift({ mood, time: new Date().toLocaleString() });
  localStorage.setItem('moodHistory', JSON.stringify(history.slice(0, 5)));
  updateMoodStatus();
}

function updateMoodStatus() {
  const history = getMoodHistory();
  const status = document.getElementById('mood-status');
  const list = document.getElementById('mood-history');
  if (status) {
    status.innerText = history.length > 0 ? `Today's mood: ${history[0].mood}` : 'No mood saved yet.';
  }
  if (list) {
    list.innerHTML = '';
    history.forEach(entry => {
      const item = document.createElement('li');
      item.textContent = `${entry.time} — ${entry.mood}`;
      list.appendChild(item);
    });
  }
}

function initMoodButtons() {
  const moodButtons = document.querySelectorAll('.mood-btn');
  moodButtons.forEach(button => {
    button.addEventListener('click', () => {
      saveMood(button.dataset.mood);
    });
  });
}

function updateActiveNavLinks() {
  const links = document.querySelectorAll('.navbar ul li a');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(link => {
    const linkPath = link.getAttribute('href').split('/').pop();
    if (linkPath === currentPath || (linkPath === 'index.html' && currentPath === '')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function initSelfCareFeatures() {
  const themeButton = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('siteTheme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');

  document.documentElement.classList.toggle('dark-mode', theme === 'dark');
  if (themeButton) {
    themeButton.innerText = theme === 'dark' ? 'Light Mode' : 'Dark Mode';

    themeButton.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark-mode');
      localStorage.setItem('siteTheme', isDark ? 'dark' : 'light');
      themeButton.innerText = isDark ? 'Light Mode' : 'Dark Mode';
    });
  }

  let backButton = document.getElementById('back-to-top');
  if (!backButton) {
    backButton = document.createElement('button');
    backButton.id = 'back-to-top';
    backButton.type = 'button';
    backButton.textContent = '↑';
    backButton.title = 'Back to top';
    document.body.appendChild(backButton);
  }

  backButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 280) {
      backButton.style.display = 'flex';
    } else {
      backButton.style.display = 'none';
    }
  });

  initMoodButtons();
  loadChecklist();
  updateMoodStatus();
}

if (!window.selfCareAppInitialized) {
  window.selfCareAppInitialized = true;
  window.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLinks();
    initSelfCareFeatures();
    loadNotesFromStorage();
  });
}

//--------------------- List of affirmations----------------------------//
const affirmations = [
  "You're allowed to grow at your own pace 🏡.",
  "Be proud of how far you've come🥹.",
  "You deserve peace and progress🤍.",
  "Small steps lead to big changes✨.",
  "Your emotions are valid, always 🫡."
];

// Create popup container
const popup = document.createElement('div');
popup.style.position = 'fixed';
popup.style.bottom = '30px';
popup.style.left = '50%';
popup.style.transform = 'translateX(-50%)';
popup.style.background = '#fff7f3';
popup.style.padding = '15px 25px';
popup.style.borderRadius = '10px';
popup.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
popup.style.fontFamily = "'Playfair Display', serif";
popup.style.fontSize = '16px';
popup.style.zIndex = '9999';
popup.style.display = 'flex';
popup.style.alignItems = 'center';
popup.style.justifyContent = 'space-between';
popup.style.maxWidth = '90%';
popup.style.minWidth = '250px';
popup.style.opacity = '0';
popup.style.transition = 'opacity 0.8s ease';

// Add affirmation text
const text = document.createElement('p');
text.style.margin = '0';
text.style.flex = '1';
text.textContent = affirmations[Math.floor(Math.random() * affirmations.length)];

// Add close button
const closeBtn = document.createElement('span');
closeBtn.textContent = '×';
closeBtn.style.marginLeft = '15px';
closeBtn.style.cursor = 'pointer';
closeBtn.style.fontSize = '20px';
closeBtn.style.color = '#555';
closeBtn.onclick = () => popup.remove();

// Append everything
popup.appendChild(text);
popup.appendChild(closeBtn);
document.body.appendChild(popup);

// Fade in softly
setTimeout(() => {
  popup.style.opacity = '1';
}, 300);





