const API_URL = "https://healthinsight.page.gd/health-api.php";

async function getDiagnosis(data) {
    const response = await fetch(API_URL, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const text = await response.text();
    console.log("Server response:", text);

    let result;
    try {
        result = JSON.parse(text);
    } catch (error) {
        throw new Error("Server returned HTML instead of JSON.");
    }

    if (!response.ok) {
        throw new Error(
            result.error ||
            result.message ||
            "Failed to fetch diagnosis"
        );
    }

    return result;
}