const apiKey = process.env.OPENAI_API_KEY;
const fineTuningJobId = "your_fine_tuning_job_id";

if (!apiKey || !fineTuningJobId) {
  console.error("API Key and/or fine-tuning job ID missing.");
} else {
  const url = `https://api.openai.com/v1/fine_tuning/jobs/${fineTuningJobId}/events`;

  const https = require("https");

  const options = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const requisicao = https.get(url, options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      console.log(data);
    });
  });

  requisicao.on("error", (error) => {
    console.error("Request error:", error);
  });

  requisicao.end();
}
