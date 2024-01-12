window.onload = fetchJoke();

document.getElementById("fetch-joke").addEventListener("click", fetchJoke);

function fetchJoke() {
  let b = fetch("https://v2.jokeapi.dev/joke/Programming?type=single")
    .then((response) => response.json())
    .then((data) => {
      displayJoke(data);
    })
    .catch((error) => {
      console.error("Error fetching joke:", error);
    });
  console.log(b);
}

function displayJoke(jokeData) {
  const jokeContainer = document.getElementById("joke-container");
  let url = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomgif_one = url[Math.floor(Math.random() * 26)];

  let randomgif_two = url[Math.floor(Math.random() * 26)];

  jokeContainer.innerHTML = `<div class="genjoke"><img src="https://i.gifer.com/7W${randomgif_one}${randomgif_two}.gif" alt="gif" class="gif"> 
  <span class="joke">"${jokeData.joke}"</span></div>`;

  const copyButton = document.querySelector(".copy-icon");
  copyButton.addEventListener("click", () => copyToClipboard(jokeData.joke));
}

function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  alert("Joke copied to clipboard!");
}
