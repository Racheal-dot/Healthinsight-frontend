document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("healthForm");

  form.addEventListener("submit", async function (e) {

    e.preventDefault();

    //  // Check disclaimer checkbox first
    const agreed = document.getElementById("agreeDisclaimer").checked;

    if (!agreed) {
      alert("You must agree to the medical disclaimer before continuing.");
      return; // Stop form submission
    }

    try {

      const age = document.getElementById("age").value;
      const gender = document.getElementById("gender").value.toLowerCase();
      const height = document.getElementById("height").value;
      const weight = document.getElementById("weight").value;

      // BMI
      let bmi = null;
      if (height && weight) {
        const h = parseFloat(height) / 100;
        const w = parseFloat(weight);
        bmi = (w / (h * h)).toFixed(1);
      }

      // Symptoms
      let symptoms = [];
      document.querySelectorAll("input[type='checkbox']:checked")
        .forEach(el => symptoms.push(el.value));

      if (symptoms.length === 0) {
        alert("Select at least one symptom");
        return;
      }

      const button = document.querySelector("button");

      button.disabled = true;
      button.innerHTML = "Analyzing Health...";

      const result = await getDiagnosis({
        sex: gender,
        age: { value: parseInt(age) },
        evidence: symptoms.map(s => ({
          id: s,
          choice_id: "present"
        })),

        // ✅ correct
        agreeDisclaimer: true
      });

      // SAVE SESSION
      localStorage.setItem("session", JSON.stringify({
        interview_token: result.interview_token,
        evidence: symptoms.map(s => ({
          id: s,
          choice_id: "present"
        })),
        result: result,
        age: age,
        gender: gender,
        bmi: bmi
      }));

      button.disabled = false;
      button.innerHTML = "Analyze";

      // GO TO RESULT PAGE
      window.location.href = "result.html";

    } catch (err) {
      console.error(err);
      alert("Error occurred. Check console.");
    }

  });

});