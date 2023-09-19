const redacao = document.getElementById("redacao");
const result = document.getElementById("result");
const submitButton = document.getElementById("submitButton");
const clearButton = document.getElementById("clearButton");

clearButton.addEventListener("click", () => {
	localStorage.removeItem("conversas");
	result.value = "";
});

const conversasSalvas = localStorage.getItem("conversas");
if (conversasSalvas) {
	result.value = conversasSalvas;
}

submitButton.addEventListener("click", () => {
	SendQuestion();
});

const OPENAI_API_KEY = "";

function SendQuestion() {
  let sQuestion = redacao.value;

	fetch("https://api.openai.com/v1/completions", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + OPENAI_API_KEY,
    },
		body: JSON.stringify({
			model: "text-davinci-003",
			prompt: "Corrija minha redação a seguir com base nos quesitos do enem, pontuando e mostrando o que pode melhorar" + sQuestion,
			max_tokens: 4000,
			temperature: 0.5,
    }),
  })
  .then((response) => response.json())
	.then((json) => {
    if (result.value) result.value += "\n";
			if (json.error?.message) {
				result.value += `Error: ${json.error.message}`;
      } else if (json.choices?.[0].text) {
          let text = json.choices[0].text || "Sem resposta";
						result.value += "Correção: " + text;
        }
						result.scrollTop = result.scrollHeight;
						localStorage.setItem("conversas", result.value);
  })
  .catch((error) => console.error("Error:", error))
  .finally(() => {
		redacao.value = "";
		redacao.disabled = false;
		redacao.focus();
  });
		if (result.value) result.value += "\n\n\n";
			result.value += `Redação: ${sQuestion}`;
			redacao.value = "Carregando...";
			redacao.disabled = true;
	result.scrollTop = result.scrollHeight;
}