async function getDiagnosis(data) {
  const response = await fetch(
    "https://healthinsight-backend-production-8c5c.up.railway.app/health-api.php",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  );

  const result = await response.json();

  console.log("Server response:", result);

  if (!response.ok) {
    throw new Error(result.error || result.message || "API Error");
  }

  return result;
}