function runAI(){
  const temp = parseFloat(document.getElementById("temp").value);
  const spo2 = parseInt(document.getElementById("spo2").value);
  const hr   = parseInt(document.getElementById("hr").value);

  let risk = "منخفض";
  let badge = "low";
  let advice = "الحالة مستقرة، متابعة داخل العيادة.";

  // AI Rules (Triage Assist)
  if(temp >= 39 || spo2 < 92 || hr > 130){
    risk = "عالي";
    badge = "high";
    advice = "🚨 يوصى بإحالة عاجلة + إشعار ولي الأمر.";
  }
  else if(temp >= 38 || spo2 < 95 || hr > 110){
    risk = "متوسط";
    badge = "mid";
    advice = "⚠️ مراقبة مكثفة + إعادة القياس خلال 15 دقيقة.";
  }

  document.getElementById("aiResult").innerHTML = `
    <p><b>مستوى الخطورة:</b> <span class="badge ${badge}">${risk}</span></p>
    <p><b>توصية AI:</b> ${advice}</p>
    <p style="font-size:12px;color:#aaa">
      *الذكاء الاصطناعي أداة مساندة، والقرار الطبي النهائي للطبيب.
    </p>
  `;
}
