let taskList = [];
let hourPerWeek = 24 * 7;
const addTask = (e) => {
  // Use formData constructure is easy than the other method if you have a large text filed

  const newForm = new FormData(e);
  // use .get method only get data from element name, not ID
  const task = newForm.get("task");
  //this + is covert string from form into number
  const hour = +newForm.get("hour");
  const obj = {
    task,
    hour,
    id: idGeneration(),
    type: "entry",
  };
  console.log(getTotalHour);
  if (getTotalHour() + hour > hourPerWeek) {
    alert("Sorry no more hour then 168 per week");
    return;
  }
  taskList.push(obj);
  // console.log(taskList);
  displayList();
};

const deleteTask = (id) => {
  // get index from inside array as object
  //const idIndex = taskList.findIndex((list) => list.id === id);
  const result = window.confirm("Are you sure you want to delete this task?");
  if (result) {
    taskList = taskList.filter((item) => item.id !== id);
  }
  displayList();
  displayBadList();
};

const switchList = (id, type) => {
  //   update type in taskList by ID
  taskList.forEach((list) => {
    if (list.id === id) {
      list.type = type;
      // console.log("type change ", type);
    }
  });

  displayList();
  displayBadList();
};

const displayList = () => {
  const entrylist = document.getElementById("entryList");
  let str = "";
  const entry = taskList.filter((list) => list.type === "entry");
  //console.log("Display List", entry);
  entry.forEach((item, index) => {
    //  delete task need to be string because it needs return id from html when click on delete icon
    str += `<tr>
                  <td>${index + 1}</td>
                  <td>${item.task}</td>
                  <td>${item.hour} hr</td>
                  <td class="text-end">
                    <button class="btn btn-danger" onclick="deleteTask('${item.id}')">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <button class="btn btn-success" onclick="switchList('${item.id}','bad')">
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
  const badHour = document.getElementById("badHour");
  let str = "";
  const bad = taskList.filter((list) => list.type === "bad");
  bad.forEach((item, index) => {
    //  delete task need to be string because it needs return id from html when click on delete icon
    str += `<tr>
                  <td>${index + 1}</td>
                  <td>${item.task}</td>
                  <td>${item.hour} hr</td>
                  <td class="text-end">
                  <button class="btn btn-warning" onclick="switchList('${item.id}','entry')" >
                  <i class="fa-solid fa-arrow-left"></i>
                  </button>
                  <button class="btn btn-danger" onclick="deleteTask('${item.id}')">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                  </td>
                </tr>`;
  });
  badlist.innerHTML = str;
  badHour.innerText = bad.reduce((acc, item) => acc + item.hour, 0);
};

const getTotalHour = () => {
  const entryHour = document.getElementById("entryHour");

  /* version 2 
        use reduce to calculate total  
    */
  const totalHr = taskList.reduce((acc, item) => {
    return acc + item.hour;
  }, 0);
  entryHour.innerText = totalHr;
  return totalHr;
  /* version 2 */
  //   let totalEntryHr = 0;
  //   let totalBadHr = 0;
  //   const entryHour = document.getElementById("entryHour");
  //   const badHour = document.getElementById("badHour");
  //   taskList.forEach((item) => {
  //     if (item.type === "entry") {
  //       totalEntryHr += Number(item.hour);
  //     }
  //     if (item.type === "bad") {
  //       totalBadHr += Number(item.hour);
  //     }
  //   });
  //   entryHour.innerText = totalEntryHr;
  //   badHour.innerText = totalBadHr;
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
