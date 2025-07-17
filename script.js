let totalLectures = 0;
let attendedLectures = 0;
let records = [];
let editIndex = -1;
let chart;

function addOrUpdateRecord() {
  const date = document.getElementById("date").value;
  const total = parseInt(document.getElementById("total").value);
  const attended = parseInt(document.getElementById("attended").value);

  if (!date || isNaN(total) || isNaN(attended) || attended > total) {
    alert("Please enter valid data.");
    return;
  }

  if (editIndex >= 0) {
    // update existing record
    totalLectures -= records[editIndex].total;
    attendedLectures -= records[editIndex].attended;

    records[editIndex] = { date, total, attended };
    editIndex = -1;
  } else {
    records.push({ date, total, attended });
  }

  totalLectures += total;
  attendedLectures += attended;

  saveData();
  renderTable();
  updateSummary();
  updateChart();

  document.getElementById("date").value = "";
  document.getElementById("total").value = "";
  document.getElementById("attended").value = "";
}

function editRecord(index) {
  const rec = records[index];
  document.getElementById("date").value = rec.date;
  document.getElementById("total").value = rec.total;
  document.getElementById("attended").value = rec.attended;
  editIndex = index;
}

function deleteRecord(index) {
  totalLectures -= records[index].total;
  attendedLectures -= records[index].attended;
  records.splice(index, 1);
  saveData();
  renderTable();
  updateSummary();
  updateChart();
}

function updateSummary() {
  const percent = totalLectures === 0 ? 0 : ((attendedLectures / totalLectures) * 100).toFixed(2);
  const needed = totalLectures === 0 ? 0 : Math.max(Math.ceil((0.75 * totalLectures) - attendedLectures), 0);

  document.getElementById("totalLectures").textContent = totalLectures;
  document.getElementById("attendedLectures").textContent = attendedLectures;
  document.getElementById("percentage").textContent = `${percent}%`;
  document.getElementById("needed").textContent = needed;

  // 🔁 ADD THIS LINE
  calculateRemainingLecturesFor75();
}


function renderTable() {
  const table = document.getElementById("recordTable");
  table.innerHTML = "";

  records.forEach((rec, i) => {
    const row = `<tr>
      <td>${rec.date}</td>
      <td>${rec.total}</td>
      <td>${rec.attended}</td>
      <td class="actions">
        <button onclick="editRecord(${i})">✏️</button>
        <button onclick="deleteRecord(${i})">🗑️</button>
      </td>
    </tr>`;
    table.innerHTML += row;
  });
}

function updateChart() {
  const ctx = document.getElementById("attendanceChart").getContext("2d");
  const labels = records.map(r => r.date);
  const totals = records.map(r => r.total);
  const attended = records.map(r => r.attended);

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Total Lectures",
          data: totals,
          backgroundColor: "#8888ff",
        },
        {
          label: "Attended",
          data: attended,
          backgroundColor: "#44cc88",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Attendance Overview" },
      },
    },
  });
}

function downloadCSV() {
  let csv = "Date,Total Lectures,Attended\n";
  records.forEach(r => {
    csv += `${r.date},${r.total},${r.attended}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "attendance.csv";
  link.click();
}

function saveData() {
  localStorage.setItem("records", JSON.stringify(records));
  localStorage.setItem("totalLectures", totalLectures);
  localStorage.setItem("attendedLectures", attendedLectures);
}

function loadData() {
  const saved = JSON.parse(localStorage.getItem("records"));
  const t = parseInt(localStorage.getItem("totalLectures"));
  const a = parseInt(localStorage.getItem("attendedLectures"));

  if (saved) records = saved;
  if (!isNaN(t)) totalLectures = t;
  if (!isNaN(a)) attendedLectures = a;

  renderTable();
  updateSummary();
  updateChart();
}

function setupDarkMode() {
  const toggle = document.getElementById("darkModeToggle");
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode === "on") {
    document.body.classList.add("dark");
    toggle.checked = true;
  }

  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "on");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "off");
    }
  });
}

window.onload = () => {
  setupDarkMode();
  loadData();
};

function resetData() {
  if (confirm("Are you sure you want to reset all data?")) {
    localStorage.clear();
    location.reload();
  }
}

function calculateRemainingLecturesFor75() {
    // Total lectures between June 16 to Sept 30
    const totalWednesdays = 16;
    const totalOtherDays = 61;
    const totalLecturesBySeptEnd = (totalWednesdays * 3) + (totalOtherDays * 4); // 48 + 244 = 292
    const requiredFor75 = Math.ceil(0.75 * totalLecturesBySeptEnd);

    const attended = records.reduce((sum, rec) => sum + parseInt(rec.attended), 0);
    const stillNeeded = Math.max(0, requiredFor75 - attended);

    document.getElementById('lecturesRemaining').innerHTML =
        `📅 Lectures you need to attend to reach 75% by Sept 30: <span style="color: limegreen;">${stillNeeded}</span>`;
}


