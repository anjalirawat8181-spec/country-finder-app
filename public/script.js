async function searchCountry() {
  const country = document.getElementById("searchInput").value;
  const resultDiv = document.getElementById("result");

  if (!country) {
    alert("Enter country name");
    return;
  }

  resultDiv.innerHTML = "Loading...";

  try {
    const res = await fetch(`/country?name=${country}`);
    const data = await res.json();

    if (data.error) {
      resultDiv.innerHTML = "❌ Country not found";
      return;
    }

    resultDiv.innerHTML = `
      <div class="card">
        <h2>${data.name}</h2>
        <img src="${data.flag}">
        <p><b>Capital:</b> ${data.capital}</p>
        <p><b>Population:</b> ${data.population.toLocaleString()}</p>
        <p><b>Region:</b> ${data.region}</p>
      </div>
    `;

  } catch (err) {
    resultDiv.innerHTML = "Error fetching data";
  }
}

// Enter key support
document.getElementById("searchInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    searchCountry();
  }
});