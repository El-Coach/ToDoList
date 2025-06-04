// vars

const savedTasks = localStorage.getItem("tasks");
let tasks = savedTasks
    ? JSON.parse(savedTasks)
    : [
          {
              title: "test",
              date: "20 / 20 / 2020 | 20 : 20 : 20",
              isDone: false,
          },
      ];
console.log(tasks);

let table = document.getElementById("tasks");

function fillTasks() {
    table.innerHTML = "";
    let counter = 0;
    for (let task of tasks) {
        let row = `<tr class="task" id="task${counter}">
                    <td class="buttons">
                        <i class="fa-solid fa-trash" onClick="deleteTask(${counter})"></i>
                        <i class="fa-regular fa-pen-to-square" onClick="editTask(${counter})"></i>
                        <div id="check"></div>
                    </td>
                    <td class="contant">
                        <p class="name">${task.title}</p>
                        <span class="date">${task.date}</span>
                    </td>
                </tr>`;
        table.innerHTML += row;
        let check = document
            .getElementById("task" + counter)
            .querySelector("#check");
        if (task.isDone) {
            check.innerHTML = `<i class="fa-solid fa-circle-xmark" onClick="switchTaskState(${counter})"></i>`;
            document.getElementById("task" + counter).style.backgroundColor =
                "#00c50087";
        } else {
            check.innerHTML = `<i class="fa-regular fa-square-check" onClick="switchTaskState(${counter})"></i>`;
        }
        counter++;
    }
    document.getElementById(
        "numperOfTasks"
    ).innerHTML = `<span> number of tasks ${tasks.length}</span>`;
}
fillTasks();

function addTask() {
    let taskName = prompt("Enter Task");
    let now = new Date();
    let date =
        now.getDate() +
        " / " +
        (now.getMonth() + 1) +
        " / " +
        now.getFullYear() +
        " | " +
        now.getHours() +
        " : " +
        now.getMinutes() +
        " : " +
        now.getSeconds();
    let taskOpj = {
        title: taskName,
        date: date,
        isDone: false,
    };
    tasks.push(taskOpj);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    fillTasks();
}

function editTask(index) {
    let taskName = prompt("Edit Task", tasks[index].title);
    tasks[index].title = taskName;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    fillTasks();
}

function deleteTask(index) {
    let confirmed = confirm(
        `Are You Sure You Want To Delete ${tasks[index].title} ?`
    );
    if (confirmed) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        fillTasks();
    }
}

function switchTaskState(index) {
    if (tasks[index].isDone) {
        tasks[index].isDone = false;
    } else {
        tasks[index].isDone = true;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    fillTasks();
}
