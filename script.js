import toggle from "./toggle.js"
toggle()


let CardNoClick = null

const todo_title_input = document.querySelector("#task-title-heading")
const todo_textarea_input =  document.querySelector("#taskContent");
const todo_form = document.querySelector("form");
const allTaskContainer = document.querySelector('.all-task')


const errorvalidationone = document.querySelector(".error-validation-one")
const errorvalidationTwo = document.querySelector(".error-validation-two")
const check = document.querySelector("#check");


const contextMenuCard = document.querySelector(".contextMenuCard")





function todoFormValidation(data){
  if(data.length>=5){
    return true
  }
  else{
    return false
  }
}

function getCurrentDateTime(){
   const now = new Date();
   const day = String(now.getDate()).padStart(2, '0');
   const month = String(now.getMonth() + 1).padStart(2, '0');
   const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2,'0');
  const minutes = String(now.getMinutes()).padStart(2,'0')
  return `${day}-${month}-${year} : ${hours}-${minutes}`
}



function formSubmit(){
  todo_form.addEventListener("submit",(e)=>{
  e.preventDefault();

   errorvalidationone.style.display = "none";
   errorvalidationTwo.style.display = "none";

  let taskTitle = todo_title_input.value.trim();
  let textAreaData = todo_textarea_input.value.trim();


  
  let proceesed = true;
  if(!todoFormValidation(taskTitle)){  
     errorvalidationone.style.display = "block";
     proceesed=false;
  }

  if(!todoFormValidation(textAreaData)){
     errorvalidationTwo.style.display = "block";
     proceesed = false;
  }

  if(proceesed){
      
  let todos = localStorage.getItem("todos")
  if(!todos){
     localStorage.setItem('todos',JSON.stringify([{title:taskTitle,content:textAreaData,isImportant:check.checked,isCompleted:false,createdAt:getCurrentDateTime()}]))

     renderTodosFromLocalStorage();
  }
  else{
    let data = JSON.parse(localStorage.getItem("todos"));
    data.push({title:taskTitle,content:textAreaData,isImportant:check.checked,isCompleted:false,createdAt:getCurrentDateTime()})
    localStorage.setItem("todos",JSON.stringify(data));
    renderTodosFromLocalStorage();
  }
  todo_form.reset()
  }

})

}




function isCompleted(){
 
  let x;
  let y;


allTaskContainer.addEventListener("click",(e)=>{
   contextMenuCard.style.display = "none"
  if(e.target.id==="markAsCompleted"){
     let data = JSON.parse(localStorage.getItem("todos"))
     data = data.map((item,index)=>{
        if(String(index) === e.target.dataset.taskId){
     
           return {...item,isCompleted:e.target.checked}
        }
        else{
          return item
        }
        
     })
     localStorage.setItem("todos",JSON.stringify(data));
     renderTodosFromLocalStorage()
  }
})

allTaskContainer.addEventListener("contextmenu",(e)=>{
    e.preventDefault();
    let tastE1 = e.target.closest(".task");
    if(!tastE1) return;
    x = e.clientX;
    y = e.clientY;

    contextMenuCard.style.display  = "flex";
    contextMenuCard.style.left = x+'px'
    contextMenuCard.style.top = y+'px'
    
    CardNoClick = tastE1.id ;

  })


}





function renderTodosFromLocalStorage(){
  const todos = JSON.parse(localStorage.getItem("todos"));
  allTaskContainer.innerHTML =  `<h3 class="task-title">All Task</h3>`
  let clutter = ""
  todos.forEach((item,index)=>{     

       clutter+=`<div class="task" id=${index}  title="right click for edit">
        <div class="task-data">
           <span class="${item.isCompleted ? "completed" : ""}"> ${item.title}  ${item.isImportant?` <sup class="important">Imp</sup>`:""} <input type="checkbox" data-task-id="${index}" id="markAsCompleted" title="mark as completed" ${item.isCompleted?"checked":null}></span>
            <span>Created At: ${item.createdAt}</span>
        </div>
       <span class="${item.isCompleted ? "completed" : ""}">${item.content}</span>
      </div>`

      
      
    
  })

  

  allTaskContainer.innerHTML+=clutter;


}





formSubmit()

renderTodosFromLocalStorage()


isCompleted()













contextMenuCard.addEventListener('click',(e)=>{
 
  let re = e.target.closest(".delete")
  if(!re) return;
  console.log("delete click");
  if(CardNoClick===null){
     contextMenuCard.style.display = "none"
  }
  else{
      contextMenuCard.style.display = "none";
      console.log(CardNoClick);
     let data =  JSON.parse(localStorage.getItem("todos"));
     data.splice(CardNoClick,1);
     localStorage.setItem("todos",JSON.stringify(data));
     renderTodosFromLocalStorage();
  }
})