const form = document.querySelector(".js-form")
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings")

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text){        //사용자의 이름을 기억하게 함
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault(); //기본동작을막음.
    const currentValue = input.value;
    paintGreeting(currentValue)
    saveName(currentValue)
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}
function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`; //인사해줌
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
    askForName()    // he is not
    } else {
    paintGreeting(currentUser);// he is
    }
}

function init(){
    loadName();
}

init();