let taskList = [];
const addTask = (e) => {
  // Use formData constructure is easy than the other method if you have a large text filed

  const newForm = new FormData(e);
  // use .get method only get data from element name, not ID
  const task = newForm.get("task");
  const hour = newForm.get("hour");

  const obj = {
    task,
    hour,
  };
  taskList.push(obj);
  // console.log(taskList);
  displayList();
};

const displayList = () => {
  const entrylist = document.getElementById("entryList");
  let str = "";
  taskList.forEach((item, index) => {
    str += `<tr>
                  <td>${index + 1}</td>
                  <td>${item.task}</td>
                  <td>${item.hour}hr</td>
                  <td class="text-end">
                    <button class="btn btn-danger">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <button class="btn btn-success">
                      <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </td>
                </tr>`;
  });

  entrylist.innerHTML = str;
};
