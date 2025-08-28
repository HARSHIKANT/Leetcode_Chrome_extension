chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "solveProblem") {
      (async () => {
        try {
          const apiKey = "AIzaSyDa7u_aiOZR2GxGt152ZiI0s6RfpgNd5y0";  // <--- replace with your real key
  
          const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-goog-api-key": apiKey,
              },
              body: JSON.stringify({
                contents: [
                  {
                    parts: [
                      {
                        text: `Solve the following coding problem. 
                        Only give hints, never the full solution/code.
                        
                        Problem: ${request.problem}`
                      }
                    ]
                  }
                ]
              }),
            }
          );
  
          const data = await response.json();
  
          // Gemini returns text at: data.candidates[0].content.parts[0].text
          const answer =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "⚠️ No response from AI";
  
          sendResponse({ success: true, text: answer });
        } catch (error) {
          sendResponse({ success: false, error: error.message });
        }
      })();
  
      return true; // keep channel open for async response
    }
  });
  