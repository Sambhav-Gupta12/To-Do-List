function setNote(notes) {
    localStorage.setItem("Notes", JSON.stringify(notes));
}

function getNotes() {
    let notes = localStorage.getItem("Notes");
    return notes ? JSON.parse(notes) : [];
}

function createNote(note) {
    let newDiv = document.createElement("li");
    newDiv.innerHTML = `<span class="bullet">✦</span><span class="task-text">${note}</span>`;
    document.querySelector(".note").appendChild(newDiv);
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