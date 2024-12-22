document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Prüfe gespeicherten Modus in localStorage
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        themeToggle.textContent = "🌞 Light Mode";
    }

    // Theme wechseln
    themeToggle.addEventListener("click", function() {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "🌞 Light Mode";
        } else {
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "🌙 Dark Mode";
        }
    });

    // Lade Notizen
    const noteList = document.getElementById("note-list");
    fetch('/get_notes')
        .then(response => response.json())
        .then(notes => {
            notes.forEach((note, index) => addNoteToList(note, index));
        });

    function addNoteToList(note, index) {
        const li = document.createElement("li");
        li.innerHTML = `
            ${note}
            <button class="delete-btn" data-index="${index}">Löschen</button>
        `;
        noteList.appendChild(li);
    }

    // Event Listener für Löschen der Notizen
    noteList.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn")) {
            const index = event.target.getAttribute("data-index");
            deleteNote(index, event.target.parentElement);
        }
    });

    function deleteNote(index, noteElement) {
        fetch(`/delete/${index}`, {
            method: "POST",
        })
        .then(response => {
            if (response.ok) {
                noteElement.remove();  // Entfernt die Notiz aus der Liste
            } else {
                alert("Fehler beim Löschen der Notiz.");
            }
        });
    }
});
