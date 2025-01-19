import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const generatePost = async (prompt: string) => {
	const completion = await groq.chat.completions
		.create({
			messages: [
				{
					role: "user",
					content: prompt,
				},
			],
			model: "llama-3.1-8b-instant",
		})
		.then((chatCompletion) => {
			return chatCompletion.choices[0]?.message?.content || "";
		});
	return completion;
};

export { generatePost };
