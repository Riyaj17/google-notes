const updateLocalStorageData = () => { //for storage purpose
    const textareaData = document.querySelectorAll('textarea');
    const notes = [];
    console.log(textareaData);

    // for storing data in array
    textareaData.forEach((note) => {
        return notes.push(note.value);
    })
    console.log(notes);
    localStorage.setItem('notes', JSON.stringify(notes))  //if add something in local system then use set, if get something then use get method
    // getting data as a Json form using this 'JSON.stringify(notes)'
}
// for getting reference
const addButton = document.querySelector('#add');

const addNewNote = ( text ='' ) =>{ //text use for note write or not

    const note = document.createElement('div'); //create a new div as html by Js

    note.classList.add('note'); //for adding class

    const htmlData = `
    <div class="operation">
		<button class="edit"> <i class="fas fa-edit"></i></button>
		<button class="delete"> <i class="fas fa-trash-alt"></i></button>
	</div>

	<div class="main ${text ? "" : "hidden" }""></div> 
	<textarea class="${text ? "hidden" : "" }"></textarea>`; //if text present then hide the text part. if text not present (in the upper case) then past part blank and 2nd part hide bcoz of possible writing

    note.insertAdjacentHTML('afterbegin', htmlData); //adding html data in newly created div by js
    console.log(note);

// get references for edit and delete icon
    const editButton = note.querySelector('.edit');//all element in the note thats why we not write the note.query...for getting references
    const deleteButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textarea = note.querySelector('textarea');

// deleting the node 
    deleteButton.addEventListener('click', () => {
       note.remove(); //for deleteing call remove mathod 
       updateLocalStorageData();
    })

// toggle using edit button

textarea.value = text;
mainDiv.innerHTML = text;
    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    })

    textarea.addEventListener('change', (event) => { // the event tells the value of all the value, text area etc
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLocalStorageData();
    })

    document.body.appendChild(note);//the method appends a node as the last child of a node. and prepend means add to last

}

// getting data from the local storage
const notes = JSON.parse(localStorage.getItem('notes')); //get the data original form

if(notes){notes.forEach((note) => addNewNote(note) ) };


addButton.addEventListener('click', () => addNewNote() );
