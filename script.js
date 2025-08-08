function setNote(notes) {
    localStorage.setItem("Notes", JSON.stringify(notes));
}

function getNotes() {
    let notes = localStorage.getItem("Notes");
    console.log(notes, "The notes");
    return notes ? JSON.parse(notes) : [];
}

function createNote(note) {
    let newDiv = document.createElement("li");
    newDiv.innerHTML = `<span class="bullet">✦</span><span class="task-text">${note}</span>`;
    newDiv.classList.add("lis");
    createDelete(newDiv);
    document.querySelector(".note").appendChild(newDiv);
}

function createDelete(parentElement) {
    let newDelete = document.createElement("button");
    newDelete.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 6H5H21" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 11V17" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14 11V17" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

    newDelete.classList.add("delete-btn");
    parentElement.appendChild(newDelete);

    newDelete.addEventListener("click", () => {
    const taskText = parentElement.querySelector(".task-text").textContent;
    let notes = getNotes().filter(n => n !== taskText);
    setNote(notes);
    parentElement.remove();
});
}

function loadNotes() {
    let notes = getNotes();
    notes.forEach(note => {
        createNote(note);
    });
}

document.querySelector(".submit").addEventListener("click", () => {
    let noteInput = document.getElementById("task");
    let note = noteInput.value.trim();
    if (note) {
        let notes = getNotes();
        notes.push(note);
        setNote(notes);
        createNote(note);
        noteInput.value = "";
    } else {
        alert("Please enter a task.");
    }
}
)

loadNotes();

document.querySelector(".note").addEventListener("mouseover", (e) => {
    const listItem = e.target.closest(".lis");
    if (listItem) {
        const deleteBtn = listItem.querySelector(".delete-btn");
        if (deleteBtn) deleteBtn.style.display = "block";
    }
});

document.querySelector(".note").addEventListener("mouseout", (e) => {
    const listItem = e.target.closest(".lis");
    if (listItem) {
        const deleteBtn = listItem.querySelector(".delete-btn");
        if (deleteBtn) deleteBtn.style.display = "none";
    }
});

document.querySelector(".theme").addEventListener("mouseover", (e) => {
    const themeHover =  document.querySelector(".theme");
    themeHover.style.backgroundColor = "rgb(78, 75, 75)";
    }
);

document.querySelector(".theme").addEventListener("mouseout", (e) => {
    const themeHover =  document.querySelector(".theme");
    if (document.body.classList.contains("dark-mode")) {
        themeHover.style.backgroundColor = "white";
        themeHover.style.color = "black";
     }
});

const button = document.querySelector(".theme");

button.innerHTML = `Dark`;

button.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        button.innerHTML = "Light";
        button.style.backgroundColor = "white";
        button.style.color = "black";
    } else {
        button.innerHTML = "Dark";
        button.style.backgroundColor = "black";
        button.style.color = "white";
    }
});
