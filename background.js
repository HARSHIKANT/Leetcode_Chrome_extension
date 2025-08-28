chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "solveProblem") {
        // Wrap async code in IIFE
        (async () => {
            try {
                const apiKey = "AIzaSyDa7u_aiOZR2GxGt152ZiI0s6RfpgNd5y0";
                const response = await fetch(
                    "https://api.generativeai.google/v1beta2/models/gemini-2.5-flash:generateText",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${apiKey}`,
                        },
                        body: JSON.stringify({
                            prompt: `Solve the following coding problem. Provide hints and thinking steps only:\n\n${request.problem}`,
                            maxOutputTokens: 500,
                        }),
                    }
                );

                const data = await response.json();
                const solution = data.outputText || data?.candidates?.[0]?.content || "No response";

                sendResponse({ success: true, solution });
            } catch (error) {
                sendResponse({ success: false, error: error.message });
            }
        })();

        // VERY IMPORTANT: return true to keep message port open
        return true;
    }
});
