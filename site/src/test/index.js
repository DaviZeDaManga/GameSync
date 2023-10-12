import { Configuration, OpenAIApi } from "openai";
import 'dotenv/config';
import axios from "axios";

const configuration = new Configuration({
    organization: "org-j397jq5q8gq5mx0cEuKbbVAO",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();

const url = 'https://api.openai.com/v1/fine_tuning/jobs/{fine_tuning_job_id}/events';

const requisizao = axios.get(url, configuration)
console.log(requisizao)