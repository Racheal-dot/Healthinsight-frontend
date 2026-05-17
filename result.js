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
        ${
          session.bmi
            ? `<span class="bmi-badge ${bmiInfo.className}">${bmiInfo.label}</span>`
            : ""
        }
      </p>
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

  html += `
    <div class="disclaimer-box">
      <h2 class="section-title">Medical Disclaimer</h2>
      <p>
        This assessment is for informational purposes only and does not provide
        a medical diagnosis. Always consult a qualified healthcare professional.
      </p>
    </div>
  `;

  container.innerHTML = html;
});