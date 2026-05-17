const API_URL = "https://healthinsight-backend-production-8c5c.up.railway.app/health-api.php";

async function getDiagnosis(data) {
    try {
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
            throw new Error("Server returned invalid JSON.");
        }

        if (!response.ok) {
            throw new Error(
                result.error ||
                result.message ||
                "Failed to fetch diagnosis"
            );
        }

        return result;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}