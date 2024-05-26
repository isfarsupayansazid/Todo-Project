// inputBox and todo-list-div declaration

let myInputBox = document.getElementById("inputBox");
let mainTodoList = document.getElementById("todo-list-div");

// Get todo list from local storage
const getTodoListFromLocalStorage = () =>{
  return JSON.parse(localStorage.getItem("My Todo List Item"));;
}
const addTodoListLocalStorage = (myInputCovertToArray) =>{
    return localStorage.setItem("My Todo List Item",JSON.stringify(myInputCovertToArray))
}
let myInputCovertToArray =  getTodoListFromLocalStorage() ||[];

//Show todo list after get todo list from local storage
const addTodoShowFromLocalStorage = (curElem) =>{
    const newTodoListDiv = document.createElement("div");
    newTodoListDiv.classList.add("new-todo-list-div");
    newTodoListDiv.innerHTML = `<li>${curElem}</li> <button class="button">Delete</button>`;
    mainTodoList.append(newTodoListDiv)
}
const addTodoListFunction = (e) =>{
    e.preventDefault();

    //myInputBox value convert to array with trim and use [...new set()] make for ignore double value 
    
    const myInputValueTrim = myInputBox.value.trim();
    myInputBox.value = "";
    if(myInputValueTrim !== "" && !myInputCovertToArray.includes(myInputValueTrim)){
        
        myInputCovertToArray.push(myInputValueTrim);
        myInputCovertToArray = [...new Set(myInputCovertToArray)];
        console.log(myInputCovertToArray);
        
        // add todo on localStorage with name of My Todo List Item
        localStorage.setItem("My Todo List Item",JSON.stringify(myInputCovertToArray))
        
        
        // Function create for click button and showing todo-list-div
        
        addTodoShowFromLocalStorage(myInputValueTrim)
    }
}

// show todo list on window by get list from local storage
const showTodoList = () =>{
    console.log(myInputCovertToArray);

    myInputCovertToArray.forEach((curElem) =>{
        addTodoShowFromLocalStorage(curElem)
    })
}
showTodoList()

const removeTodoElement = (e) =>{
    let todoRemove = e.target;
    let todoContentElem = todoRemove.previousElementSibling.innerText;
    let parentElem = todoRemove.parentElement;
    console.log(todoContentElem);

   myInputCovertToArray= myInputCovertToArray.filter((curTodo) =>{
       return curTodo !== todoContentElem
    })
    addTodoListLocalStorage(myInputCovertToArray);
    parentElem.remove();
    console.log(myInputCovertToArray);
}


mainTodoList.addEventListener("click",(e) =>{
    e.preventDefault()
    if(e.target.classList.contains("button")){

        removeTodoElement(e)
    }
})
//Button declaration and add with addTodoListFunction()
document.querySelector(".button").addEventListener("click",(e)=>{
    addTodoListFunction(e);
})