/* ============================================================
   SMART SCHOOL CLINIC — APP CORE
============================================================ */

/* ---------- Navigation Helpers ---------- */
function go(page) {
  window.location.href = page;
}

function back() {
  window.history.back();
}

function home() {
  window.location.href = "index.html";
}

/* ---------- THEME TOGGLE (with theme.js hook) ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      if (window.themeManager) {
        window.themeManager.toggleTheme();
      }
    });
  }

  routerInit();
});

/* ---------- ROUTER INIT (page-based) ---------- */
function routerInit() {
  const page = document.body.dataset.page;

  switch (page) {
    case "landing": landing.init(); break;
    case "nurse-dashboard": nurseDashboard.init(); break;
    case "doctor": doctorPanel.init(); break;
    case "admin": adminPanel.init(); break;
    case "parent": parentPortal.init(); break;
    case "student": studentProfile.init(); break;
    case "student-self": studentSelfReport.init(); break;
    case "case-details": caseDetails.init(); break;
    case "emergency": emergencyFlow.init(); break;
    case "video-call": videoCall.init(); break;
  }
}

/* ============================================================
   LANDING MODULE
============================================================ */
const landing = {
  init() {
    console.log("Landing loaded");
  }
};

/* ============================================================
   NURSE DASHBOARD MODULE
============================================================ */
const nurseDashboard = {
  init() {
    console.log("Nurse dashboard loaded");
    this.loadCases();
    this.loadAlerts();
  },

  loadCases() {
    const tbody = document.getElementById("cases-body");
    if (!tbody) return;

    const sample = [
      { name: "أحمد خالد", grade: "الخامس", risk: "critical", time: "10:32" },
      { name: "سارة محمد", grade: "الرابع", risk: "watch", time: "09:15" },
      { name: "عبدالله ناصر", grade: "السادس", risk: "normal", time: "08:50" }
    ];

    tbody.innerHTML = sample.map(c => `
      <tr onclick="go('case-details.html')">
        <td>${c.name}</td>
        <td>${c.grade}</td>
        <td>
          <span class="badge ${this.riskClass(c.risk)}">
            ${this.riskLabel(c.risk)}
          </span>
        </td>
        <td>${c.time}</td>
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
      <div class="glass" style="padding:10px;border-radius:var(--radius-md);font-size:0.85rem;">
        ${a}
      </div>
    `).join("");
  },

  riskClass(risk) {
    if (risk === "critical") return "badge-critical";
    if (risk === "watch") return "badge-warning";
    return "badge-normal";
  },

  riskLabel(risk) {
    if (risk === "critical") return "حرجة";
    if (risk === "watch") return "متوسطة";
    return "طبيعية";
  }
};

/* ============================================================
   DOCTOR MODULE
============================================================ */
const doctorPanel = {
  init() {
    console.log("Doctor panel loaded");
    this.loadCases();
  },

  loadCases() {
    const container = document.getElementById("doctor-cases");
    if (!container) return;

    const cases = [
      {
        id: 101,
        student: "أحمد خالد",
        grade: "الخامس",
        risk: "critical",
        reason: "حرارة + ضيق تنفس",
        time: "10:32"
      },
      {
        id: 102,
        student: "سارة محمد",
        grade: "السادس",
        risk: "watch",
        reason: "صداع متكرر",
        time: "09:15"
      },
      {
        id: 103,
        student: "عبدالله ناصر",
        grade: "الرابع",
        risk: "normal",
        reason: "ألم بطن بسيط",
        time: "08:50"
      }
    ];

    container.innerHTML = cases.map(c => `
      <div class="glass" style="padding:10px;border-radius:var(--radius-md);display:flex;justify-content:space-between;align-items:center;cursor:pointer;"
           onclick="doctorPanel.selectCase(${c.id})">
        <div>
          <strong>${c.student}</strong>
          <div class="text-soft" style="font-size:0.8rem;">${c.grade} – ${c.reason}</div>
        </div>
        <div style="text-align:right;">
          <span class="badge ${nurseDashboard.riskClass(c.risk)}">${nurseDashboard.riskLabel(c.risk)}</span><br>
          <span class="text-soft" style="font-size:0.75rem;">${c.time}</span>
        </div>
      </div>
    `).join("");

    this._cases = cases;
  },

  selectCase(id) {
    const c = (this._cases || []).find(x => x.id === id);
    if (!c) return;

    const summary = document.getElementById("case-summary");
    const vitals = document.getElementById("case-vitals");
    const aiAssist = document.getElementById("ai-assist");
    const snapshot = document.getElementById("patient-snapshot");

    if (summary) {
      summary.innerHTML = `
        <strong>${c.student}</strong><br>
        <span class="text-soft">الصف: ${c.grade}</span><br>
        <span class="text-soft">سبب الزيارة: ${c.reason}</span>
      `;
    }

    if (vitals) {
      vitals.innerHTML = `
        <div>الحرارة<br><strong>38.9 °C</strong></div>
        <div>النبض<br><strong>112 bpm</strong></div>
        <div>الأكسجين<br><strong>94%</strong></div>
        <div>الضغط<br><strong>110/70</strong></div>
      `;
    }

    if (aiAssist) {
      aiAssist.innerHTML = `
        <div class="glass" style="padding:10px;border-radius:var(--radius-md);font-size:0.85rem;">
          <strong>تحليل AI:</strong><br>
          الحالة مصنفة كـ <span style="color:var(--danger);font-weight:600;">متوسطة إلى حرجة</span> بناءً على:
          <ul style="margin:6px 16px;">
            <li>ارتفاع الحرارة</li>
            <li>زيادة النبض</li>
            <li>انخفاض نسبي في الأكسجين</li>
          </ul>
          التوصية: تقييم مباشر من الطبيب خلال 10 دقائق، مع متابعة المؤشرات الحيوية كل 15 دقيقة.
        </div>
      `;
    }

    if (snapshot) {
      snapshot.innerHTML = `
        <strong>${c.student}</strong><br>
        <span class="text-soft">لا توجد حساسية معروفة</span><br>
        <span class="text-soft">لا توجد أمراض مزمنة مسجلة</span><br>
        <span class="text-soft">آخر زيارة: قبل شهرين – صداع بسيط</span>
      `;
    }
  },

  saveDiagnosis() {
    const text = document.getElementById("doctor-diagnosis");
    if (!text || !text.value.trim()) {
      alert("الرجاء إدخال التشخيص");
      return;
    }
    alert("تم حفظ التشخيص (محاكاة)");
  }
};

/* ============================================================
   ADMIN MODULE
============================================================ */
const adminPanel = {
  init() {
    console.log("Admin panel loaded");
  }
};

/* ============================================================
   PARENT MODULE
============================================================ */
const parentPortal = {
  init() {
    console.log("Parent portal loaded");
  }
};

/* ============================================================
   STUDENT PROFILE MODULE
============================================================ */
const studentProfile = {
  init() {
    console.log("Student profile loaded");
  }
};

/* ============================================================
   STUDENT SELF-REPORT MODULE
============================================================ */
const studentSelfReport = {
  init() {
    console.log("Student self-report loaded");
  },

  analyzeSymptoms() {
    const symptoms = [...document.querySelectorAll(".symptom input:checked")].map(i => i.value);
    const temp = parseFloat(document.getElementById("temp").value);
    const pulse = parseFloat(document.getElementById("pulse").value);
    const oxygen = parseFloat(document.getElementById("oxygen").value);
    const bp = document.getElementById("bp").value;

    let result = "";
    let risk = "normal";

    if (symptoms.includes("ضيق تنفس") || (symptoms.includes("حرارة") && temp >= 39)) {
      risk = "critical";
      result += "⚠ الحالة حرجة. يجب التوجه للعيادة فورًا.<br>";
    }

    if (oxygen && oxygen < 93) {
      risk = "critical";
      result += "⚠ انخفاض في مستوى الأكسجين.<br>";
    }

    if (pulse && pulse > 120) {
      if (risk !== "critical") risk = "watch";
      result += "⚠ نبض مرتفع يحتاج متابعة.<br>";
    }

    if (!result) {
      result = "✔ الحالة تبدو مستقرة. يُنصح بالراحة وشرب الماء، والمتابعة إذا استمرت الأعراض.";
    }

    const box = document.getElementById("ai-result");
    if (box) {
      box.innerHTML = `
        <div class="glass" style="padding:12px;border-radius:var(--radius-md);">
          <strong>توصية الذكاء الاصطناعي:</strong><br>
          ${result}
        </div>
      `;
    }
  },

  startVirtualVisit() {
    go("video-call.html");
  }
};

/* ============================================================
   CASE DETAILS MODULE
============================================================ */
const caseDetails = {
  init() {
    console.log("Case details loaded");
  },

  saveDiagnosis() {
    const text = document.getElementById("diagnosis");
    if (!text || !text.value.trim()) {
      alert("الرجاء إدخال الملاحظات");
      return;
    }
    alert("تم حفظ الملاحظات (محاكاة)");
  }
};

/* ============================================================
   EMERGENCY FLOW MODULE
============================================================ */
const emergencyFlow = {
  init() {
    console.log("Emergency flow loaded");
  }
};

/* ============================================================
   VIDEO CALL MODULE
============================================================ */
const videoCall = {
  init() {
    console.log("Video call loaded");
  },

  toggleMic() {
    alert("تبديل حالة المايك (محاكاة)");
  },

  toggleCam() {
    alert("تبديل حالة الكاميرا (محاكاة)");
  },

  endCall() {
    alert("تم إنهاء الزيارة الافتراضية");
    back();
  }
};
