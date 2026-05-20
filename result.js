function getBmiCategory(bmi) {
  const value = parseFloat(bmi);

  if (isNaN(value)) {
    return { label: "Not available", className: "" };
  }

  if (value < 18.5) {
    return { label: "Underweight", className: "bmi-underweight" };
  }

  if (value < 25) {
    return { label: "Normal weight", className: "bmi-normal" };
  }

  if (value < 30) {
    return { label: "Overweight", className: "bmi-overweight" };
  }

  return { label: "Obese", className: "bmi-obese" };
}



function formatTriage(level) {
  const messages = {
    self_care: "Your symptoms may be managed with self-care.",
    consultation: "Schedule an appointment with a healthcare professional.",
    consultation_24: "Consult a doctor within 24 hours.",
    emergency: "Seek emergency medical attention immediately.",
    emergency_ambulance: "Call emergency services immediately."
  };

  return messages[level] || "Consult a healthcare professional.";
}

// HealthAdvice
function generateHealthAdvice(conditions) {
  if (!conditions || conditions.length === 0) {
    return `
      <div class="advice-card">
        <h2 class="section-title">General Health Advice</h2>
        <ul>
          <li>Maintain a balanced diet rich in fruits and vegetables.</li>
          <li>Exercise regularly for at least 30 minutes daily.</li>
          <li>Drink plenty of water.</li>
          <li>Get adequate sleep and manage stress.</li>
          <li>Consult a healthcare professional if symptoms persist.</li>
        </ul>
      </div>
    `;
  }

  const topCondition = conditions[0].name.toLowerCase();
  let advice = [];

  if (
    topCondition.includes("hypertension") ||
    topCondition.includes("high blood pressure")
  ) {
    advice = [
      "Reduce salt intake.",
      "Exercise regularly.",
      "Avoid smoking and excessive alcohol consumption.",
      "Monitor your blood pressure frequently.",
      "Maintain a healthy body weight."
    ];
  } else if (topCondition.includes("diabetes")) {
    advice = [
      "Reduce sugar and refined carbohydrate intake.",
      "Monitor your blood glucose level regularly.",
      "Exercise consistently.",
      "Maintain a healthy weight.",
      "Follow your doctor's recommendations."
    ];
  } else if (topCondition.includes("malaria")) {
    advice = [
      "Use prescribed antimalarial medication.",
      "Sleep under insecticide-treated mosquito nets.",
      "Keep your environment free of stagnant water.",
      "Stay hydrated and rest adequately.",
      "Seek urgent care if symptoms worsen."
    ];
  } else if (topCondition.includes("typhoid")) {
    advice = [
      "Drink clean and treated water.",
      "Maintain good hand hygiene.",
      "Eat properly cooked food.",
      "Complete prescribed antibiotics.",
      "Avoid street food from unhygienic sources."
    ];
  } else if (topCondition.includes("obesity")) {
    advice = [
      "Adopt a calorie-controlled diet.",
      "Increase physical activity.",
      "Reduce sugary drinks and snacks.",
      "Track your weight regularly.",
      "Consult a nutritionist if necessary."
    ];
  } else if (topCondition.includes("anemia")) {
    advice = [
      "Eat iron-rich foods such as spinach and beans.",
      "Take iron supplements if prescribed.",
      "Consume vitamin C to improve iron absorption.",
      "Treat any underlying causes.",
      "Get regular blood tests."
    ];
  } else {
    advice = [
      "Rest adequately.",
      "Drink plenty of water.",
      "Maintain a balanced diet.",
      "Monitor your symptoms.",
      "Consult a healthcare professional for further evaluation."
    ];
  }

  return `
    <div class="advice-card">
      <h2 class="section-title">Recommended Health Advice</h2>
      <ul>
        ${advice.map(item => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `;
}

// specialist
function recommendSpecialist(conditions) {
  if (!conditions || conditions.length === 0) {
    return `
            <div class="specialist-card">
                <h2 class="section-title">Recommended Specialist</h2>
                <p>General Practitioner (Primary Care Doctor)</p>
                <p>A general practitioner can review your symptoms and refer you to a specialist if necessary.</p>
            </div>
        `;
  }

  const topCondition = conditions[0].name.toLowerCase();

  let specialist = "General Practitioner";
  let description = "A general practitioner can provide an initial medical evaluation and guide further treatment.";

  if (topCondition.includes("hypertension") || topCondition.includes("heart") || topCondition.includes("cardiac")) {
    specialist = "Cardiologist";
    description = "A cardiologist specializes in heart conditions and blood pressure management.";
  }
  else if (topCondition.includes("diabetes")) {
    specialist = "Endocrinologist";
    description = "An endocrinologist specializes in hormonal disorders such as diabetes.";
  }
  else if (topCondition.includes("asthma") || topCondition.includes("pneumonia") || topCondition.includes("bronchitis")) {
    specialist = "Pulmonologist";
    description = "A pulmonologist specializes in lung and respiratory disorders.";
  }
  else if (topCondition.includes("arthritis") || topCondition.includes("fracture") || topCondition.includes("bone") || topCondition.includes("joint")) {
    specialist = "Orthopedic Specialist";
    description = "An orthopedic specialist treats bone, joint, and musculoskeletal conditions.";
  }
  else if (topCondition.includes("kidney") || topCondition.includes("renal")) {
    specialist = "Nephrologist";
    description = "A nephrologist specializes in kidney-related diseases.";
  }
  else if (topCondition.includes("anemia") || topCondition.includes("blood")) {
    specialist = "Hematologist";
    description = "A hematologist specializes in blood disorders.";
  }
  else if (topCondition.includes("skin") || topCondition.includes("eczema") || topCondition.includes("rash")) {
    specialist = "Dermatologist";
    description = "A dermatologist specializes in skin conditions.";
  }
  else if (topCondition.includes("depression") || topCondition.includes("anxiety") || topCondition.includes("mental")) {
    specialist = "Psychiatrist";
    description = "A psychiatrist specializes in mental health disorders.";
  }
  else if (topCondition.includes("malaria") || topCondition.includes("typhoid") || topCondition.includes("infection")) {
    specialist = "Infectious Disease Specialist";
    description = "This specialist manages complex infectious diseases.";
  }
  else if (topCondition.includes("pregnancy") || topCondition.includes("menstrual") || topCondition.includes("ovarian")) {
    specialist = "Gynecologist";
    description = "A gynecologist specializes in women's reproductive health.";
  }
  else if (
    topCondition.includes("ulcer") ||
    topCondition.includes("gastritis")
  ) {
    specialist = "Gastroenterologist";
    description =
      "A gastroenterologist specializes in digestive system disorders.";
  }

  return `
        <div class="specialist-card">
            <h2 class="section-title">Recommended Specialist</h2>
            <h3>${specialist}</h3>
            <p>${description}</p>
        </div>
    `;
}

// clinic specialist
function generateClinicRecommendation() {
  return `
    <div class="clinic-card">
      <h2 class="section-title">Visit the School Clinic</h2>
      <p>
        Based on your assessment, you are advised to visit the
        <strong>Pogil College of Health Technology School Clinic</strong>
        for professional evaluation and treatment.
      </p>
      <p>
        The clinic can provide further examination and refer you to the
        appropriate specialist if necessary.
      </p>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("output");
  const session = JSON.parse(localStorage.getItem("session"));

  if (!session || !session.result) {
    container.innerHTML = "<h2>No session data found.</h2>";
    return;
  }

  const diagnosis = session.result.diagnosis;
  const triage = session.result.triage;
  const bmiInfo = getBmiCategory(session.bmi);

  let html = `
    <div class="result-card">
      <h2 class="section-title">User Information</h2>
      <p><strong>Age:</strong> ${session.age}</p>
      <p><strong>Gender:</strong> ${session.gender}</p>
      <p>
        <strong>BMI:</strong> ${session.bmi || "N/A"}
        ${session.bmi
      ? `<span class="bmi-badge ${bmiInfo.className}">${bmiInfo.label}</span>`
      : ""
    }
      </p>

     <p><strong>Symptoms:</strong></p> 
<div class="symptom-tags">
  ${
    session.symptoms && session.symptoms.length > 0
      ? session.symptoms
          .map(symptom => `<span class="symptom-tag">${symptom}</span>`)
          .join("")
      : "<span>None selected</span>"
  }
</div>

    </div>
  `;

  if (diagnosis.conditions && diagnosis.conditions.length > 0) {
    html += `<h2 class="section-title">Possible Conditions</h2>`;

    diagnosis.conditions.slice(0, 5).forEach((condition) => {
      let risk = "Low Risk";
      let riskClass = "low-risk";

      if (condition.probability >= 0.7) {
        risk = "High Risk";
        riskClass = "high-risk";
      } else if (condition.probability >= 0.4) {
        risk = "Medium Risk";
        riskClass = "medium-risk";
      }

      html += `
        <div class="result-card">
          <h3>${condition.name}</h3>
          <p><strong>Probability:</strong> ${(condition.probability * 100).toFixed(1)}%</p>
          <p class="${riskClass}">${risk}</p>
        </div>
      `;
    });
  } else {
    html += `<p>No conditions found.</p>`;
  }


  if (triage) {
    html += `
      <div class="advice-box"> <h2 class="section-title">Recommended Action</h2>
        <p><strong>${triage.triage_level}</strong></p>
        <p>${formatTriage(triage.triage_level)}</p>
      </div>
    `;
  }

  // Function call
  html += generateHealthAdvice(diagnosis.conditions);

  // specialist call
  html += recommendSpecialist(diagnosis.conditions);

  // clinic call
  html += generateClinicRecommendation();

  // Disclaimer
 html += `
  <div class="disclaimer-box">
    <h2 class="section-title">Medical Disclaimer</h2>
    <p>
      This health assessment tool was developed for the
      Pogil College of Health Technology School Clinic.
      It is intended for educational and preliminary screening purposes only
      and does not replace professional medical diagnosis or treatment.
    </p>
  </div>
`;



  container.innerHTML = html;
});