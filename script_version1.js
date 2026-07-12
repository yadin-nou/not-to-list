let taskList = [];
let taskBadList = [];
const addTask = (e) => {
  // Use formData constructure is easy than the other method if you have a large text filed

  const newForm = new FormData(e);
  // use .get method only get data from element name, not ID
  const task = newForm.get("task");
  const hour = newForm.get("hour");
  const obj = {
    task,
    hour,
    id: idGeneration(),
  };
  taskList.push(obj);
  console.log(taskList);
  displayList();
};

const deleteTask = (id) => {
  // get index from inside array as object
  const idIndex = taskList.findIndex((list) => list.id === id);
  const result = window.confirm("Are you sure you want to delete this task?");
  //start delete from list
  if (result && idIndex !== -1) {
    taskList.splice(idIndex, 1);
  }
  displayList();
};

const deleteBadList = (id) => {
  //const idIndex = taskBadList.findIndex((list) => list.id === id);
  const result = window.confirm("Are you sure you want to delete this task?");
  // use filter() instead of using findIndex
  // filter() loops through every item in taskBadList and
  // keeps only the items where the condition is true.
  //the result is similar deleteTask function but we use filter this time.
  if (result) {
    taskBadList = taskBadList.filter((item) => item.id !== id);
  }
  //result ? taskBadList.splice(idIndex, 1) : "";
  displayBadList();
};

const getBadList = (id) => {
  const idIndex = taskList.findIndex((list) => list.id === id);
  taskBadList.push(taskList[idIndex]);
  taskList.splice(idIndex, 1);
  displayList();
  displayBadList();
  //console.log(taskBadList);
};

const getEntryList = (id) => {
  const idIndex = taskBadList.findIndex((list) => list.id === id);
  taskList.push(taskBadList[idIndex]);
  taskBadList.splice(idIndex, 1);
  displayBadList();
  displayList();
};
const displayList = () => {
  const entrylist = document.getElementById("entryList");
  let str = "";
  taskList.forEach((item, index) => {
    //  delete task need to be string because it needs return id from html when click on delete icon
    str += `<tr>
                  <td>${index + 1}</td>
                  <td>${item.task}</td>
                  <td>${item.hour} hr</td>
                  <td class="text-end">
                    <button class="btn btn-danger" onclick="deleteTask('${item.id}')">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <button class="btn btn-success" onclick="getBadList('${item.id}')">
                      <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </td>
                </tr>`;
  });
  getTotalHour();
  entrylist.innerHTML = str;
};
const displayBadList = () => {
  const badlist = document.getElementById("badList");
  let str = "";
  taskBadList.forEach((item, index) => {
    //  delete task need to be string because it needs return id from html when click on delete icon
    str += `<tr>
                  <td>${index + 1}</td>
                  <td>${item.task}</td>
                  <td>${item.hour} hr</td>
                  <td class="text-end">
                  <button class="btn btn-warning" onclick="getEntryList('${item.id}')" >
                  <i class="fa-solid fa-arrow-left"></i>
                  </button>
                  <button class="btn btn-danger" onclick="deleteBadList('${item.id}')">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                  </td>
                </tr>`;
  });
  getTotalHour("badList");
  badlist.innerHTML = str;
};

const getTotalHour = (list = "entry") => {
  let total = 0;
  const entryHour = document.getElementById("entryHour");
  const badHour = document.getElementById("badHour");
  if (list === "entry") {
    taskList.forEach((item) => (total += Number(item.hour)));
    entryHour.innerText = total;
  } else {
    taskBadList.forEach((item) => (total += Number(item.hour)));
    badHour.innerText = total;
  }
};

const idGeneration = (length = 6) => {
  const str =
    "pxzksjkjfoiajhklajoinakljhhanskjeiABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let id = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * str.length);
    id += str[randomIndex];
  }

  return id;
};
