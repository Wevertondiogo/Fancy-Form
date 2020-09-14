const q = (q) => document.querySelector(q);
const questions = [
  { question: "Enter Your First Name" },
  { question: "Enter Your Last Name" },
  {
    question: "Enter Your Email",
    pattern: /\S+@\S+\.\S+/,
  },
  { question: "Create A Password", type: "password" },
];

//Transition Times

const shakeTime = 100; // Snake Transition Time
const switchTime = 200; // Transition Between Questions

//Init Position At Question

let position = 0;

//Init DOM Elements

const formBox = q("#form-box");
const nextBtn = q("#next-btn");
const prevBtn = q("#prev-btn");
const inputGroup = q("#input-group");
const inputField = q("#input-field");
const inputLabel = q("#input-label");
const inputProgress = q("#input-progress");
const progress = q("#progress-bar");

//EVENTS

// Get Question On DOM Load
document.addEventListener("DOMContentLoaded", getQuestion);

// Next Button Click

document.addEventListener("click", validate);

// Input Field Enter Click
inputField.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) {
    validate();
  }
});

//FUNCTIONS

//Get Question From Array & Add To  Markup
function getQuestion() {
  // Get Current Question
  inputLabel.innerHTML = questions[position].question;
  // Get Current Type
  inputField.type = questions[position].question.type || "text";
  // Get Current Answer
  inputField.value = questions[position].answer || "";
  // Focus On Elements
  inputField.focus();

  //set Progress Bar Width - Variable To Yje questions length

  progress.style.width = (position * 100) / questions.length + "%";

  // Add User Icon Or Back Arrow Depending On Question
  prevBtn.className = position ? "fa fa-arrow-left" : "fa fa-user";

  showQuestion();
}

// Display Question To User
function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transiton = "";
  inputProgress.style.width = "100%";
}

// Hide Question From User

function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transiton = "none";
  inputGroup.style.border = null;
}

// transform to Create Snake Motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// Validate Field
function validate() {
  // Make Sure Pattern Matches If There Is One
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}

//Field Input Fail
function inputFail() {
  formBox.className = "error";
  // Repeat Shake Motion - Set I to number of snakes
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
  }
}

//Field Input Fail
function inputPass() {
  formBox.className = "";
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  // Store Answer In Array
  questions[position].answer = inputField.value;

  // Increment Position
  position++;

  //If New Question, Hide Current And Get Nect
  if (questions[position]) {
    hideQuestion();
    getQuestion();
  } else {
    // Remove If No More Questions
    hideQuestion();
    formBox.className = "close";
    progress.style.width = "100%";

    // Form Complete
    formComplete();
  }
}

// All Fields Complete - Show h1 end
function formComplete() {
  const h1 = document.createElement("h1");
  h1.classList.add("end");
  h1.appendChild(
    document.createTextNode(
      `Thanks ${questions[0].answer} You are registred and will get an email shortly  `
    )
  );
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => (h1.style.opacity = 1));
  }, 1000);
}
