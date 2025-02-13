import {generateContent} from "../services/ai.service.js";

const getResponse = async (req, res)=> {
    const prompt = req.body.prompt;

    if(!prompt) {
        return res.status(400).send("Prompt is required");
    }

    const respose = await generateContent(prompt)

    res.send(respose)
}


export { getResponse }