// function for data storing on local storage   
const updateLocalStorageData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];

    textAreaData.forEach((note) => {
        return notes.push(note.value);
    })
    localStorage.setItem('note', JSON.stringify(notes))
}


// define addNewNotes function
const addNewNotes = (text = '') => {

    // made note div using javascript
    const note = document.createElement('div');
    note.classList.add('notes');
    // insert html code into note div
    const htmlData = ` <div class="operation">
                            <button class="edit"><i class="fas fa-edit"></i></button>
                            <button class="delete"><i class="fas fa-trash-alt"></i></button>
                       </div>
                       <div class="main ${text? " " : "hidden"}"></div>
                       <textarea class=" ${text?  "hidden" : " "}"></textarea> `;

    // insert note div to the html body
    note.insertAdjacentHTML("afterbegin", htmlData);

    // getting reference of all the major element
    const mainContainer = document.querySelector('.mainContainer');
    const editButton = note.querySelector('.edit');
    const deleteButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    // Delete event on delete button
    deleteButton.addEventListener('click', () => {
        note.remove();
        updateLocalStorageData();
    })

    // toggle method on edit button 

    textArea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('change', (event) => {
        mainDiv.textContent = event.target.value;
        updateLocalStorageData();

    })


    mainContainer.appendChild(note);

}

// getting data from localstorage

const notes = JSON.parse(localStorage.getItem('note'));

if (notes) {
    notes.forEach((note) => {
        addNewNotes(note);
    })
}


// click event on add button
const btn = document.querySelector('#add');
btn.addEventListener('click', () => addNewNotes());