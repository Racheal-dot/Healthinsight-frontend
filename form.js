document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("healthForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitButton = form.querySelector("button[type='submit']");

    try {
      const agreed = document.getElementById("agreeDisclaimer").checked;

      if (!agreed) {
        alert("You must agree to the medical disclaimer before continuing.");
        return;
      }

      const age = document.getElementById("age").value;
      const gender = document.getElementById("gender").value.toLowerCase();
      const height = document.getElementById("height").value;
      const weight = document.getElementById("weight").value;

      let bmi = null;

      if (height && weight) {
        const h = parseFloat(height) / 100;
        const w = parseFloat(weight);
        bmi = (w / (h * h)).toFixed(1);
      }

      // Symptoms (FIXED)
      let symptoms = Array.from(
        document.querySelectorAll("input[name='symptoms']")
      )
        .filter(el => el.checked)
        .map(el => el.value);

      console.log("SYMPTOMS SELECTED:", symptoms);

      if (symptoms.length === 0) {
        alert("Select at least one symptom");
        return;
      }

      // symptoms input
      const symptomInputs = document.querySelectorAll(
        'input[name="symptoms"]:checked'
      );

      const symptomIds = Array.from(symptomInputs).map(input => input.value);

      const symptomNames = Array.from(symptomInputs).map(input =>
        input.parentElement.querySelector(".symptoms-text").textContent.trim()
      );

      submitButton.disabled = true;
      submitButton.textContent = "Analyzing Health...";

      const evidence = symptoms.map((symptomId) => ({
        id: symptomId,
        choice_id: "present"
      }));

      const result = await getDiagnosis({
        sex: gender,
        age: {
          value: parseInt(age)
        },
        evidence,
        agreeDisclaimer: true
      });

      localStorage.setItem(
        "session",
        JSON.stringify({
          interview_token: result.diagnosis.interview_token,
          evidence,
          result,
          age,
          gender,
          bmi,
          symptoms: symptomNames
        })
      );

      window.location.href = "result.html";
    } catch (error) {
      console.error(error);
      alert(error.message || "An error occurred.");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Analyze";
    }
  });
});