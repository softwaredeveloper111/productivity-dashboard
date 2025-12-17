const allElems = document.querySelectorAll(".elem")
const fullElems =  document.querySelectorAll(".fullElem")
const closeBtns = document.querySelectorAll(".fullElem .close-btn")



function toggle(){
let div = null
allElems.forEach((elem,index)=>{
  elem.addEventListener("click",(e)=>{
    
     div =  fullElems[elem.id]
    div.style.display = "block"


  })
})


closeBtns.forEach((btn,index)=>{
  btn.addEventListener("click",(e)=>{
        div.style.display = "none"
  })
})
}


export default toggle