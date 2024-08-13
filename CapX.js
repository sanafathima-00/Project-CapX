let currentQuestion = 1; //current question being displayed
let answers = {}; //stores user's answers

//close question card
function closeQuestion() {
  document.getElementById(`question-card-${currentQuestion}`).style.display = "none";
}

//go to next question
function goToNextSection() {
  closeQuestion();
  currentQuestion++;
  document.getElementById(`question-card-${currentQuestion}`).style.display = "block";
}

//submit answer and go to next question
function nextQuestion(questionNumber) {
  const answer = document.getElementById("answer").value.trim();
  if (answer === "") {
    alert("Please enter your answer.");
    return;
  }
  answers[questionNumber] = answer;
  closeQuestion();
  currentQuestion++;
  document.getElementById(`question-card-${currentQuestion}`).style.display = "block";
}

// submit answer and go to title screen
function goToResult() {
  const options = document.querySelectorAll(".option-button");
  let selectedOption = null;
  options.forEach((option) => {
    if (option.classList.contains("selected")) {
      selectedOption = option.textContent;
    }
  });
  if (selectedOption === null) {
    alert("Please select an option.");
    return;
  }
  answers[3] = selectedOption;
  localStorage.setItem("answers", JSON.stringify(answers)); //assumed that the user's answers are stored in local storage using the 'localStorage' API
  document.getElementById("question-page").style.display = "none";
  document.getElementById("title-page").style.display = "block";
}

//check if user has already answered the questions
function checkAnswers() {
  const storedAnswers = localStorage.getItem("answers"); 
  if (storedAnswers !== null) {
    document.getElementById("question-page").style.display = "none";
    document.getElementById("title-page").style.display = "block";
  }
}

//event listeners on option buttons
document.querySelectorAll(".option-button").forEach((option) => {
  option.addEventListener("click", () => {
    option.classList.add("selected");
    document.querySelectorAll(".option-button").forEach((otherOption) => {
      if (otherOption !== option) {
        otherOption.classList.remove("selected");
      }
    });
  });
});

checkAnswers(); //prevents users from answering multiple times 