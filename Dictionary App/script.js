const wrapper = document.querySelector(".wrapper");
searchInput = wrapper.querySelector("input");
synonyms = wrapper.querySelector(".synonyms .list");
infoText = wrapper.querySelector(".info-text");

function data(result, word) {
  if (result.title) {
    infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
  } else {
    console.log(result);
    wrapper.classList.add("active");

    let definiteions = result[0].meaning[0].definiteions[0];
    phonetics = `${result[0].meaning[0].partOfSpeech} / ${result[0].phonetics[0].text}/`;

    document.querySelector(".word p").innerText = result[0].word;
    document.querySelector(".word span").innerText = phonetics;
    document.querySelector(".meaning span").innerText =
      definiteions.definiteion;
    document.querySelector(".example span").innerText = definiteions.example;

    for (let i = 0; i < 5; i++) {
      let tag = `<span>${definiteions.synonyms[i]},</span>`;
      synonyms.insertAdjacentHTML("beforeend", tag);
    }
  }
}
function fetchApi(word) {
  infoText.style.color = "#000";
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => data(result, word));
}

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value) {
    fetchApi(e.target.value);
  }
});
