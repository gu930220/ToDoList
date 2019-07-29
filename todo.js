const toDoForm = document.querySelector(".js-toDoForm")
    toDoInput = toDoForm.querySelector("input")
    toDoList = document.querySelector(".js-toDoList")

const TODOS_LS = 'toDos';

let toDos = []; //array생성 , const를 let으로 바꿈 이유는 지우기위해

function filterFn(toDo){
    return toDo.id === 1
}


function button_event(){
  if (confirm("정말 삭제하시겠습니까??") == true){    //확인
      document.form.submit();
  }else{   //취소
      return;
  }
}


function deleteToDo(event){      //리스트에 있는 것 삭제
    const btn = event.target;       //지정
    const li = btn.parentNode;      //id가져옴
    toDoList.removeChild(li);       //지움
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);   //지우기 위해 id를 리턴
    }); //filter는 array안의 모든것에 통함
    toDos = cleanToDos;
    saveToDos();            //저장
}

function saveToDos(){           //로컬에 저장
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));//json.stringify는 자바스크립트 object를 string으로 바꿔줌
}


function paintToDo(text){           //list 만들기
    const li = document.createElement("li"); //비어있는 li 만듬
    const delBtn = document.createElement("button");  //삭제버튼 만듬
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerHTML = "X";  //삭제버튼
    delBtn.addEventListener("click", deleteToDo); //delete클릭하는 event

    span.innerText = text;
    li.appendChild(delBtn);  // 삭제버튼을 li에 넣음
    li.appendChild(span);  //span을 li에 넣음
    li.id = newId;
    toDoList.appendChild(li);  //마지막으로 li를 ul에다 넣음
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos()
}

function handleSubmit(event){       //제출(?)
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = ""; //입력하고 지워줌
}

function loadToDos(){           //로컬에서 불러옴
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo)  {  //forEach는 각각에 대해서 function실행
            paintToDo(toDo.text);
        });
    }
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();