// Case = حالة صحية واحدة
const CASE_KEY = "active_case";

function createCase(data){
  const c = {
    id: Date.now(),
    student: data.student,
    symptoms: data.symptoms,
    status: "created", // created → reviewed → notified → closed
    doctorDecision: null,
    updatedAt: new Date().toISOString()
  };
  localStorage.setItem(CASE_KEY, JSON.stringify(c));
}

function getCase(){
  return JSON.parse(localStorage.getItem(CASE_KEY));
}

function updateCase(update){
  const c = getCase();
  Object.assign(c, update, {
    updatedAt: new Date().toISOString()
  });
  localStorage.setItem(CASE_KEY, JSON.stringify(c));
}
