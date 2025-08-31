chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "solveProblem") {
      (async () => {
        try {
          const apiKey = "AIzaSyDa7u_aiOZR2GxGt152ZiI0s6RfpgNd5y0";  // <--- replace with your real key
  
          const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
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
                        text: `ANSWER ME ONLY UPTO 100 WORDS.\n\n I am providing you my doubt about a CODING question, i have giving the description as well as my code ( may be half written). You have to give me only HINTS and STEPS for solving the problem NEVER give me complete code.
                        
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
  