// router.js — Smart School Clinic Navigation System

// دالة تنقل بسيطة وسريعة
function go(page) {
  window.location.href = page;
}

// دالة رجوع للصفحة السابقة
function back() {
  window.history.back();
}

// دالة رجوع للصفحة الرئيسية
function home() {
  window.location.href = "index.html";
}
