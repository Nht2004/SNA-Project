const API = "/api/tasks";
let chart;

// format date chuẩn yyyy-mm-dd
function formatDate(dateStr) {
  const d = new Date(dateStr);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

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
        <td>${task.name || ""}</td>
        <td>${task.description || ""}</td>
        <td>${task.responsible || ""}</td>
        <td>${formatDate(task.deadline)}</td>
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
  if (!confirm("Delete this task?")) return;

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
        data: Object.values(statusCount),
        backgroundColor: ["#f39c12", "#2ecc71"]
      }]
    }
  });
}

loadTasks();