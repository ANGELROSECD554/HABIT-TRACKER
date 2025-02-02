// Tree growth stages (emojis)
const treeStages = ["🌱", "🌿", "🌳"];

// DOM Elements
const tree = document.getElementById("tree");
const dayCount = document.getElementById("day-count");
const habitList = document.getElementById("habit-list");
const addHabitForm = document.getElementById("add-habit-form");
const habitInput = document.getElementById("habit-input");
const celebrationMusic = document.getElementById("celebration-music");

let completedDays = 0;

// Add a new habit
addHabitForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission
  const habitText = habitInput.value.trim();

  if (habitText) {
    // Create a new habit item
    const habitItem = document.createElement("li");
    habitItem.innerHTML = `
      <input type="checkbox" class="habit-checkbox" />
      <label>${habitText}</label>
    `;
    habitList.appendChild(habitItem);

    // Clear the input field
    habitInput.value = "";

    // Add event listener to the new checkbox
    const checkbox = habitItem.querySelector(".habit-checkbox");
    checkbox.addEventListener("change", updateProgress);
  }
});

// Update tree and progress
function updateProgress() {
  // Check if all habits are completed for the day
  const checkboxes = document.querySelectorAll(".habit-checkbox");
  const allChecked = Array.from(checkboxes).every((checkbox) => checkbox.checked);

  if (allChecked) {
    completedDays++;
    dayCount.textContent = completedDays;

    // Update tree stage
    const stage = Math.floor(completedDays / 10); // 3 stages for 30 days
    if (stage < treeStages.length) {
      tree.textContent = treeStages[stage];
    }

    // Trigger confetti and music when the tree is fully grown
    if (completedDays === 30) {
      triggerConfetti();
      celebrationMusic.play();
    }

    // Reset checkboxes for the next day
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
  }
}

// Trigger confetti animation
function triggerConfetti() {
  const confettiContainer = document.getElementById("confetti-container");
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.animationDelay = `${Math.random() * 2}s`;
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confettiContainer.appendChild(confetti);
  }

  // Remove confetti after animation ends
  setTimeout(() => {
    confettiContainer.innerHTML = "";
  }, 2000);
}