function analyzeCase(data){
  let score = 0;
  let factors = [];

  // Vitals
  if(data.temp >= 39){
    score += 30;
    factors.push("حرارة مرتفعة جدًا");
  } else if(data.temp >= 38){
    score += 20;
    factors.push("حرارة مرتفعة");
  }

  if(data.spo2 < 92){
    score += 35;
    factors.push("انخفاض حاد في الأكسجين");
  } else if(data.spo2 < 95){
    score += 20;
    factors.push("انخفاض بسيط في الأكسجين");
  }

  if(data.hr > 130){
    score += 25;
    factors.push("تسارع شديد في النبض");
  } else if(data.hr > 110){
    score += 15;
    factors.push("تسارع في النبض");
  }

  // Symptoms
  score += data.symptoms.length * 5;
  if(data.symptoms.includes("breath")){
    score += 15;
    factors.push("ضيق تنفس");
  }

  // History
  if(data.history === "asthma" || data.history === "heart"){
    score += 15;
    factors.push("تاريخ مرضي حساس");
  }

  // Decision
  let level = "منخفض";
  let color = "low";
  let action = "متابعة داخل المدرسة";

  if(score >= 75){
    level = "عالي";
    color = "high";
    action = "إحالة عاجلة + تفعيل بروتوكول الطوارئ";
  } else if(score >= 45){
    level = "متوسط";
    color = "mid";
    action = "مراقبة + إعادة تقييم خلال 15 دقيقة";
  }

  return {
    score,
    level,
    color,
    action,
    factors
  };
}
