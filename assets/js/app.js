/* ============================================================
   SMART SCHOOL CLINIC — UNIFIED JS FILE
   Organized by modules (Dashboard, Parent, Admin, Doctor, Case...)
   ============================================================ */


/* ============================================================
   GLOBAL HELPERS
============================================================ */

function go(page) {
  window.location.href = page;
}

function back() {
  window.history.back();
}

function home() {
  window.location.href = "index.html";
}


/* ============================================================
   DASHBOARD MODULE (nurse-dashboard.html)
============================================================ */

const dashboard = {
  init() {
    this.loadCases();
    this.loadAlerts();
  },

  loadCases() {
    const tbody = document.getElementById("cases-body");
    if (!tbody) return;

    const sample = [
      { name: "أحمد خالد", age: 10, risk: "critical", time: "10:32" },
      { name: "سارة محمد", age: 11, risk: "normal", time: "09:15" },
      { name: "عبدالله ناصر", age: 9, risk: "watch", time: "08:50" }
    ];

    tbody.innerHTML = sample.map(c => `
      <tr onclick="go('case-details.html')">
        <td>${c.name}</td>
        <td>${c.age}</td>
        <td>
          <span class="badge badge-${c.risk}">
            ${c.risk === "critical" ? "حرجة" : c.risk === "watch" ? "متوسطة" : "طبيعية"}
          </span>
        </td>
        <td>${c.time}</td>
        <td><button class="primary-btn">عرض</button></td>
      </tr>
    `).join("");
  },

  loadAlerts() {
    const list = document.getElementById("alerts-list");
    if (!list) return;

    const alerts = [
      "ارتفاع حرارة طالب في الصف الخامس",
      "انخفاض أكسجين طالب في الصف الرابع",
      "صداع متكرر لطالب في الصف السادس"
    ];

    list.innerHTML = alerts.map(a => `
      <div class="alert-item glass" style="padding:12px;border-radius:var(--radius-md);">
        ${a}
      </div>
    `).join("");
  }
};


/* ============================================================
   PARENT MODULE (parent.html)
============================================================ */

const parentPortal = {
  init() {
    console.log("Parent portal loaded");
  }
};


/* ============================================================
   ADMIN MODULE (admin.html)
============================================================ */

const adminPanel = {
  init() {
    console.log("Admin panel loaded");
  }
};


/* ============================================================
   DOCTOR MODULE (doctor.html)
============================================================ */

const doctorPanel = {
  init() {
    console.log("Doctor panel loaded");
  }
};


/* ============================================================
   CASE DETAILS MODULE (case-details.html)
============================================================ */

const caseDetails = {
  init() {
    console.log("Case details loaded");
  },

  saveDiagnosis() {
    const text = document.getElementById("diagnosis").value;
    if (!text.trim()) {
      alert("الرجاء إدخال التشخيص");
      return;
    }
    alert("تم حفظ التشخيص بنجاح");
  }
};


/* ============================================================
   STUDENT PROFILE MODULE (student-profile.html)
============================================================ */

const studentProfile = {
  init() {
    console.log("Student profile loaded");
  }
};


/* ============================================================
   EMERGENCY MODULE (emergency-flow.html)
============================================================ */

const emergencyFlow = {
  init() {
    console.log("Emergency flow loaded");
  }
};


/* ============================================================
   PAGE AUTO-INIT
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  switch (page) {
    case "dashboard": dashboard.init(); break;
    case "parent": parentPortal.init(); break;
    case "admin": adminPanel.init(); break;
    case "doctor": doctorPanel.init(); break;
    case "case": caseDetails.init(); break;
    case "student": studentProfile.init(); break;
    case "emergency": emergencyFlow.init(); break;
  }
});
