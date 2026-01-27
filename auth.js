function setRole(role){
  localStorage.setItem("role", role);
  location.href = role + ".html";
}

function guard(allowed){
  const role = localStorage.getItem("role");
  if(!allowed.includes(role)){
    document.body.innerHTML = `
      <div style="padding:60px;text-align:center;color:#aaa">
        🚫 لا تملك صلاحية الوصول
      </div>`;
  }
}
