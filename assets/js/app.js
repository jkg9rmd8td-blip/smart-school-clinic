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

/* ---------- DOM Ready ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  if (toggle && window.themeManager) {
    toggle.addEventListener("click", () => window.themeManager.toggleTheme());
  }
  routerInit();
});

/* ---------- Router ---------- */
function routerInit() {
  const page = document.body.dataset.page;

  switch (page) {
    case "landing": landing.init(); break;
    case "nurse-dashboard": nurseDashboard.init(); break;
    case "doctor": doctorPanel.init(); break;
    case "admin": adminPanel.init(); break;
    case "parent": parentPortal.init(); break;
    case "student": studentPage.init(); break;
    case "case-details": caseDetails.init(); break;
    case "emergency": emergencyFlow.init(); break;
    case "video-call": videoCall.init(); break;
  }
}

/* ============================================================
   LANDING
============================================================ */
const landing = {
  init() {
    console.log("Landing loaded");
  }
};

/* ============================================================
   NURSE DASHBOARD
============================================================ */
const nurseDashboard = {
  init() {
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
   DOCTOR PANEL
============================================================ */
const doctorPanel = {
  init() {
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
  },

  issueLeave() {
    alert("تم إصدار إجازة مرضية للطالب (محاكاة)");
  },

  prescribeMedication() {
    alert("تم إضافة وصفة دواء للطالب (محاكاة)");
  },

  sendReport() {
    alert("تم إرسال تقرير طبي لولي الأمر (محاكاة)");
  }
};

/* ============================================================
   ADMIN PANEL
============================================================ */
const adminPanel = {
  init() {
    console.log("Admin panel loaded");
  }
};

/* ============================================================
   PARENT PORTAL
============================================================ */
const parentPortal = {
  init() {
    console.log("Parent portal loaded");
  }
};

/* ============================================================
   STUDENT PAGE (Tabs)
============================================================ */
const studentPage = {
  init() {
    this.initTabs();
  },

  initTabs() {
    const tabs = document.querySelectorAll(".tab");
    const panels = document.querySelectorAll(".tab-panel");
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove("active"));
        panels.forEach(p => p.classList.remove("active"));

        tab.classList.add("active");
        const panel = document.querySelector(`.tab-panel[data-tab="${target}"]`);
        if (panel) panel.classList.add("active");
      });
    });
  },

  analyzeSymptoms() {
    const symptoms = [...document.querySelectorAll(".symptom input:checked")].map(i => i.value);
    const temp = parseFloat(document.getElementById("temp")?.value || 0);
    const pulse = parseFloat(document.getElementById("pulse")?.value || 0);
    const oxygen = parseFloat(document.getElementById("oxygen")?.value || 0);
    const bp = document.getElementById("bp")?.value || "";

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
        <div class="glass" style="padding:12px;border-radius:var(--radius-md);font-size:0.9rem;">
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
   CASE DETAILS
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
   EMERGENCY FLOW
============================================================ */
const emergencyFlow = {
  init() {
    console.log("Emergency flow loaded");
  }
};

/* ============================================================
   VIDEO CALL
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
