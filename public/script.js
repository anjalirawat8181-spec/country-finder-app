async function searchCountry() {
  const country = document.getElementById("searchInput").value;
  const resultDiv = document.getElementById("result");

  if (!country) {
    alert("Enter country name");
    return;
  }

  resultDiv.innerHTML = "Loading...";

  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await res.json();

    const c = data[0];

    resultDiv.innerHTML = `
      <div class="card">
        <h2>${c.name.common}</h2>
        <img src="${c.flags.png}">
        <p><b>Capital:</b> ${c.capital ? c.capital[0] : "N/A"}</p>
        <p><b>Population:</b> ${c.population.toLocaleString()}</p>
        <p><b>Region:</b> ${c.region}</p>
      </div>
    `;
  } catch (err) {
    resultDiv.innerHTML = "❌ Country not found";
  }
}