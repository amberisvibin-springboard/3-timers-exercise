//prevent js from trying to run on elements that dont exist
document.addEventListener("DOMContentLoaded", function(){
    const todo = document.querySelector(".todo-list");
    const list = localStorage.getItem("list");
    if (list === null) {
        todo.innerHTML = `
        <li>
            <form>
                <button class='item' type='button'>Example Item</button>
                <input type='text' class='edit-box' placeholder='Type here...'>
                <button class='edit' type='submit'>edit</button>
                <button class='remove' type='button'>remove</button>
             </form>
        </li>
        <li>
            <form>
                <button class='item done' type='button'>Completed Item</button>
                <input type='text' class='edit-box' placeholder='Type here...'>
                <button class='edit' type='submit'>edit</button>
                <button class='remove' type='button'>remove</button>
            </form>
        </li>
        `;
    } else {
        todo.innerHTML = list;
    }
    //check for clicks and handle them
    document.addEventListener("click", function(event) {
        //TODO: add remove button to remove item. maybe only when editing?
        const firstClass = event.target.classList[0];
        if (firstClass === "item") {
            //if its an item, toggle it's class to add/remove strikethrough
            event.target.classList.toggle("done");
            localStorage.setItem("list", todo.innerHTML);
        }
        else if (firstClass === "new-todo") {
            const newItem = document.createElement('li');
            //html in a string is a terrible idea, I know.
            //I really should generate this programatically, for security
            newItem.innerHTML = `
            <form>
                <button class='item' style='display: none' type='button'>Test Item</button>
                <input type='text' class='edit-box' style='display: inline' placeholder='Type here...'>
                <button class='save' type='submit'>save</button>
                <button class='remove' style='display: inline' type='button'>remove</button>
            </form>
            `
            todo.append(newItem);
            const last = todo.querySelector("li:last-child input");
            last.focus();
        }
        else if (firstClass === "edit") {
            editItem(event);
        }
        else if (firstClass === "save") {
            saveItem(event);
            localStorage.setItem("list", todo.innerHTML);
        }
        else if (firstClass === "remove") {
            //event.path[2] goes to the parent's parent  
            event.path[2].remove();
        }
    }); 

    document.addEventListener("submit", function(event) {
        //prevent page reload upon clicking a button
        event.preventDefault();
    })
})

function editItem(event) {
    //path[1] goes up to the element's parent. I couldn't get parentElement to work
    //I don't know why
    const parent = event.path[1];
    const item = parent.querySelector(".item");
    //hide element
    item.style.display = 'none';
    const editBox = parent.querySelector(".edit-box")
    //unhide element
    editBox.value = item.innerText;
    editBox.style.display = 'inline';
    //bring cursor to element
    editBox.focus();
    //show remove button
    const removeButton = parent.querySelector(".remove");
    removeButton.style.display = 'inline';
    event.target.classList.toggle("edit");
    event.target.classList.toggle("save");
    //change button text to 'save'
    event.target.innerText = 'save';
}

function saveItem(event) {
    const parent = event.path[1];
    const editBox = parent.querySelector(".edit-box");
    editBox.style.display = 'none';
    const item = parent.querySelector(".item");
    item.innerText = editBox.value;
    item.style.display = 'inline';
    const editButton = parent.querySelector('.save');
    editButton.classList.toggle("edit");
    editButton.classList.toggle("save");
    editButton.innerText = 'edit';
    const removeButton = parent.querySelector(".remove");
    removeButton.style.display = 'none';
}