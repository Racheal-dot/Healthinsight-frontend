const API_URL = "https://healthinsight.page.gd/health-api.php";

async function getDiagnosis(data) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error || "Failed to fetch diagnosis");
    }

    return result;
}