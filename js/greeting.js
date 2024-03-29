const greetingBox = document.querySelector(".js-greetingBox");
const greetingForm = document.querySelector(".js-form");
const greetingInput = greetingForm.querySelector("input");
const greetingWords = document.querySelector(".js-greetings");
const greetingUsername = document.querySelector(".js-username");

const USER_LS = "currentUser"; // user localStorage
const SHOWING_CN = "showing"; // showing className
const DIR_CHANGE = "drReverse"; // flex-direction 바꾸기

function askForName() {
  greetingForm.classList.add(SHOWING_CN);
  greetingForm.addEventListener("submit", handleSubmit);
}

function paintGreeting() {
  const date = new Date();
  const time = date.getHours();
  let greetingWord = "";

  if (time < 7) {
    greetingWord = "Good day";
  } else if (time < 10) {
    greetingWord = "Good morning";
  } else if (time < 18) {
    greetingWord = "Good afternoon";
  } else {
    greetingWord = "Good evening";
  }
  greetingForm.classList.remove(SHOWING_CN);
  greetingWords.classList.add(SHOWING_CN);
  greetingWords.innerText = `${greetingWord},`;
}

function paintUsername(text) {
  greetingUsername.classList.add(SHOWING_CN);
  greetingUsername.innerText = `${text}`;
}

function modifyName() {
  greetingUsername.addEventListener("click", handleModify);
  greetingForm.addEventListener("submit", handleSubmit);
}

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleModify() {  //이름 수정 시 shared.css에서 전체 적용되고 있는 flex-direction: column 떄문에 수정 중인 이름박스가 내려가지 않도록 row로 바꿔주기 위해 DIR_CHANGE 클래스를 추가함
  const currentUsername = localStorage.getItem(USER_LS);
  greetingBox.classList.add(DIR_CHANGE);
  greetingUsername.classList.remove(SHOWING_CN);
  greetingForm.classList.add(SHOWING_CN);
  greetingInput.setAttribute("value", currentUsername);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = greetingInput.value;
  paintGreeting(); // 인사말 출력
  paintUsername(currentValue); // 유저 네임 출력
  saveName(currentValue); // 유저 네임을 로컬 스토리지에 저장
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting();
    paintUsername(currentUser);
    modifyName(currentUser); //이름을 수정할 시 수정된 이름으로 다시 저장하고 화면에 띄움
  }
}

function init() {
  loadName();
}

init();