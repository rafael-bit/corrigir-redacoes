const formRedacao = document.getElementById('form__pergunta');

const OPENAI_API_KEY = "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";

if (formRedacao) {
	formRedacao.addEventListener('submit', async (e) => {
		e.preventDefault();
		let redacao = document.getElementById('campo__redacao').value;

		await fetch("https://api.openai.com/v1/completions", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer " + OPENAI_API_KEY,
			},

			body: JSON.stringify({
				model: "text-davinci-003",
				prompt: "Corrija essa redação com o padrão do ENEM, avalie e dê uma nota " + redacao,
				max_tokens: 4000,
				temperature: 0.5
			}),
		})
			.then((resposta) => resposta.json())
			.then((dados) => {
				console.log(dados);
				document.getElementById('resposta').innerHTML = dados.choices[0].text;
			})
			.catch((erro) => {
				console.log(erro);
			});
	});
}