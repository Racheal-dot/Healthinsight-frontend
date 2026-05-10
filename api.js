async function getDiagnosis(data){

  const response = await fetch("http://healthinsight.local/wp-json/health/v1/diagnosis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return await response.json();
}