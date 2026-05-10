document.addEventListener("DOMContentLoaded", function () {

  const container = document.getElementById("output");

  const session = JSON.parse(localStorage.getItem("session"));

  console.log("SESSION:", session);

  if (!session) {
    container.innerHTML = "<h2>No session data found</h2>";
    return;
  }

  // IMPORTANT
  const result = session.result;

  // DEBUG
  console.log("RESULT:", result);

  // HANDLE BOTH POSSIBLE STRUCTURES
  const apiData = result.data ? result.data : result;

  let html = `
<div class="result-card">

   <h2 class="section-title">User Information</h2>

    <p><strong>Age:</strong> ${session.age}</p>

    <p><strong>Gender:</strong> ${session.gender}</p>

    <p><strong>BMI:</strong> ${session.bmi}</p>

</div>
`;

  // CONDITIONS
  if (apiData.conditions) {

    html += `<h2 class="section-title">Possible Conditions</h2>`;

   apiData.conditions.forEach(condition => {

    let risk = "Low Risk";
    let riskClass = "low-risk";

    if(condition.probability >= 0.7){
        risk = "High Risk";
        riskClass = "high-risk";
    }
    else if(condition.probability >= 0.4){
        risk = "Medium Risk";
        riskClass = "medium-risk";
    }

    html += `
    <div class="result-card">

        <h3>${condition.name}</h3>

        <p>
            Probability:
            ${(condition.probability * 100).toFixed(1)}%
        </p>

        <p class="${riskClass}">
            ${risk}
        </p>

    </div>
    `;
});

  } else {

    html += `<p>No conditions found</p>`;
  }


  // QUESTION
  if (apiData.question) {

    html += `
<div class="question-box">
<h2>More Information Needed</h2>
`;

    apiData.question.items.forEach(item => {

      html += `
        <label>
            <input type="radio" name="followup" value="${item.id}">
            ${item.name}
        </label>
        <br><br>
        `;

    });

    html += `
    <button onclick="submitAnswer()">Next</button>
    `;
  }
  html += `</div>`;

  container.innerHTML = html;


  // FOLLOW-UP
  window.submitAnswer = async function () {

    const selected = document.querySelector("input[name='followup']:checked");

    if (!selected) {
      alert("Select an option");
      return;
    }

    session.evidence.push({
      id: selected.value,
      choice_id: "present"
    });

    const response = await getDiagnosis({
      sex: session.gender,
      age: {
        value: parseInt(session.age)
      },
      evidence: session.evidence,
      interview_token: session.interview_token
    });

    console.log("NEW RESPONSE:", response);

    session.result = response;

    localStorage.setItem("session", JSON.stringify(session));

    location.reload();
  };

});