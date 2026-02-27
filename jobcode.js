document.addEventListener("DOMContentLoaded", () => {
  const postContainer = document.getElementById("post-container");

  const totalEl = document.getElementById("total-count");
  const interviewEl = document.getElementById("interview-count");
  const rejectedEl = document.getElementById("rejected-count");
  const availableEl = document.getElementById("available-jobs");
  const noJobsEl = document.getElementById("no-jobs-section");

  const filterButtons = document.querySelectorAll(".filter-btn");
  let activeFilter = "all";

  function posts() {
    return postContainer.querySelectorAll("section");
  }

  function statusOf(section) {
    if (section.classList.contains("status-interview")) return "interview";
    if (section.classList.contains("status-rejected")) return "rejected";
    return "all"; // means NOT APPLIED
  }

  function setBadge(section, status) {
    const badge = section.querySelector(".not-applied");

    if (status === "interview") {
      badge.textContent = "INTERVIEW";
      badge.className = "not-applied btn btn-soft text-white bg-emerald-700 mb-2";
    } else if (status === "rejected") {
      badge.textContent = "REJECTED";
      badge.className = "not-applied btn btn-soft text-white bg-rose-700 mb-2";
    } else {
      badge.textContent = "NOT APPLIED";
      badge.className = "not-applied btn btn-soft text-gray-950 mb-2";
    }
  }

  function applyFilter() {
    posts().forEach((sec) => {
      const st = statusOf(sec);
      sec.style.display = activeFilter === "all" || st === activeFilter ? "block" : "none";
    });
  }

  function updateUI() {
    // counts
    totalEl.textContent = posts().length;
    interviewEl.textContent = postContainer.querySelectorAll(".status-interview").length;
    rejectedEl.textContent = postContainer.querySelectorAll(".status-rejected").length;

    // visible count
    let visible = 0;
    posts().forEach((sec) => {
      if (sec.style.display !== "none") visible++;
    });

    availableEl.textContent = visible;
    noJobsEl.classList.toggle("hidden", visible > 0);
  }

  // Tabs
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("bg-primary", "text-white"));
      btn.classList.add("bg-primary", "text-white");

      activeFilter = btn.dataset.status;
      applyFilter();
      updateUI();
    });
  });

  // Card buttons 
  postContainer.addEventListener("click", (e) => {
    const section = e.target.closest("section");
    if (!section) return;

    // Interview
    if (e.target.closest(".interview-btn")) {
      const isInterview = section.classList.contains("status-interview");

      section.classList.remove("status-interview", "status-rejected");
      if (!isInterview) section.classList.add("status-interview");

      setBadge(section, isInterview ? "all" : "interview");
    }

    // Rejected
    if (e.target.closest(".rejected-btn")) {
      const isRejected = section.classList.contains("status-rejected");

      section.classList.remove("status-interview", "status-rejected");
      if (!isRejected) section.classList.add("status-rejected");

      setBadge(section, isRejected ? "all" : "rejected");
    }

    // Delete
    if (e.target.closest(".mobile-del")) {
      section.remove();
    }

    applyFilter();
    updateUI();
  });

  // Default
  document.querySelector('[data-status="all"]')?.classList.add("bg-primary", "text-white");
  applyFilter();
  updateUI();
});