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
  document.getElementById("save-status").innerText = "✅ Notes saved!";
}

// Load notes when page reloads
window.onload = function () {
  const savedNotes = localStorage.getItem("selfCareNotes");
  if (savedNotes) {
    document.getElementById("notes-area").value = savedNotes;
  }
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





