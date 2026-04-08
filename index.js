const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/country", async (req, res) => {
  const name = req.query.name;

  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
    const data = response.data[0];

    res.json({
      name: data.name.common,
      capital: data.capital ? data.capital[0] : "N/A",
      population: data.population,
      region: data.region,
      flag: data.flags.png
    });

  } catch (error) {
    res.status(404).json({ error: "Country not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});