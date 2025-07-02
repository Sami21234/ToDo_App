const listContainer = document.getElementById("List-container");
const inputBox = document.getElementById("input-box");
const dateTime = document.getElementById("datetime");
const priority = document.getElementById("priority");

function addTask() {

    if (inputBox.value === '') {      //  .value gets whatever the user typed

        alert("Enter some task!")

    } else {

        let li = document.createElement("li");      // Dynamically creating the LI element in the Javascript
        li.innerHTML = `<strong>${inputBox.value}</strong><br>
        <small>⏰ ${dateTime.value || 'No deadline'} | 🔺 ${priority.value}</small> `;

        li.setAttribute("data-priority", priority.value);

        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";  // (x) cross sign code
        li.appendChild(span);

    }
    inputBox.value = "";
    dateTime.value = "";
    priority.value = "low";
    saveTask();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveTask();
    } else if (e.target.tagName === "SPAN") {     //This will also removes the data from the localStorage by clicking the cross button
        e.target.parentElement.remove();
        saveTask();
    }
});

function filterHighPriority() {
    const tasks =
        listContainer.querySelectorAll("li");
    tasks.forEach(tasks => {
        if (tasks.getAttribute("data-priority")?.toLowerCase() !== "high") {
            tasks.style.display = "none";
        } else {
            tasks.style.display = "block";
        }
    });
}

// function to save the data to the localstorage

function saveTask() {
    localStorage.setItem("data", listContainer.innerHTML)
}

// function to get the data from the localstorage to the browser

function getTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
getTask()
