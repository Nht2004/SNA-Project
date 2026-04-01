const API = "http://localhost:3000/api/tasks";

let chart;

async function loadTasks() {
  const res = await fetch(API);
  const data = await res.json();

  const table = document.getElementById("taskTable");
  table.innerHTML = "";

  let statusCount = { Pending: 0, Done: 0 };

  data.forEach(task => {
    statusCount[task.status] = (statusCount[task.status] || 0) + 1;

    table.innerHTML += `
      <tr>
        <td>${task.name}</td>
        <td>${task.responsible}</td>
        <td>${task.deadline}</td>
        <td>${task.status}</td>
        <td>
          <button onclick="goEdit(${task.id})">Edit</button>
          <button onclick="deleteTask(${task.id})">Delete</button>
        </td>
      </tr>
    `;
  });

  drawChart(statusCount);
}

async function deleteTask(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadTasks();
}

function goAdd() {
  window.location.href = "add.html";
}

function goEdit(id) {
  window.location.href = `edit.html?id=${id}`;
}

function drawChart(statusCount) {
  const ctx = document.getElementById("myChart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(statusCount),
      datasets: [{
        data: Object.values(statusCount)
      }]
    }
  });
}

loadTasks();