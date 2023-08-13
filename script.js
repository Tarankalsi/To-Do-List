function currentDate(date) {
    let m = date.getMonth();
    let d = date.getDate();
    let y = date.getFullYear();

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let month;

    for (let i = 0; i < months.length; i++) {
        if (m == i) {
            month = months[i];
            break
        }
    }
    let full_date = `${month} ${d}, ${y}`
    return full_date
}
function currentDay(date) {
    let d = date.getDay();
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day;
    for (let index = 0; index < dayNames.length; index++) {
        if (index == d) {
            day = dayNames[index];
        }
    }

    return day
}
function previousDate() {
    date_obj.setDate(date_obj.getDate() - 1);
    return [currentDate(date_obj), currentDay(date_obj)]
}

function nextDate() {
    date_obj.setDate(date_obj.getDate() + 1);
    return [currentDate(date_obj), currentDay(date_obj)]
}


function updateCurrentDateDisplay(date, day) {
    document.getElementById('full-date').innerHTML = date;
    document.getElementById('day').innerHTML = day;
}

let date_obj = new Date();

const nextButton = document.getElementById('next');
const previousButton = document.getElementById('prev');

previousButton.addEventListener('click', function () {
    const previous_date = previousDate()
    date = previous_date[0];
    day = previous_date[1];
    updateCurrentDateDisplay(date, day);
});

nextButton.addEventListener('click', function () {
    const next_date = nextDate()
    date = next_date[0];
    day = next_date[1];
    updateCurrentDateDisplay(date, day);
});

updateCurrentDateDisplay(currentDate(date_obj), currentDay(date_obj));

const form = document.getElementById('input-task');
const task = document.getElementById("task-value");
let taskCount = localStorage.length

form.addEventListener('submit', () => {
    console.log(taskCount)
    taskCount++
    const inputtask = task.value;
    localStorage.setItem(taskCount, inputtask)
    console.log(taskCount)
})

function taskDone(checkbox) {
    const textElement = checkbox.nextElementSibling;

    if (checkbox.checked) {
        textElement.style.textDecoration = 'line-through'
        console.log("checked")
    } else {
        textElement.style.textDecoration = 'none'
        console.log("Unchecked")
    }
}

const taskContainer = document.getElementById('task-container')
function displayTask() {
    for (let index = 1; index <= localStorage.length; index++) {
        let label = document.createElement('label')
        label.classList.add('gap-3')
        label.classList.add('task-label')
        label.innerHTML = `<div class="d-flex gap-5 py-2 ">
                            <input class="custom-checkbox my-3" id="check" type="checkbox" onclick='taskDone(this)'>
                                <h5 >${localStorage.getItem(index)}</h5>

                                <span class="pt-1 "></span>
                            </div>

                            <div class="dropdown">
                                 <button class="dropdown-button">&#8942;</button>
                            <div class="dropdown-content p-3">
                                <button class="dropdown-it py-1 px-4 col-12 ">Pin</button>
                                <button class="dropdown-it py-1 px-4 col-12 " onclick="deleteTask(this)">Delete</button>
                                </div>
                             </div>`
        taskContainer.appendChild(label)
    }
}

function deleteTask(button){
    const delete_Label = button.closest(".task-label")
    const textElement = delete_Label.querySelector('h5');
    const text = textElement.textContent;
    console.log(delete_Label);
    console.log(textElement);
    console.log(text)
    for (let index = 1; index < localStorage.length; index++) {
        if (localStorage.getItem(index) == text) {
            localStorage.removeItem(index)
            break;
        }
    }
}

displayTask();

