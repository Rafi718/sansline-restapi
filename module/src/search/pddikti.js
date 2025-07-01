const axios = require("axios");
const web = "https://pddikti.kemdikbud.go.id";

const pddikti = async (query) => {
  const options = {
    method: "GET",
    url: `https://api-frontend.kemdikbud.go.id/hit_mhs/${query}`,
  };

  try {
    const response = await axios.request(options);
    const data = response.data;

    // // Log respons API untuk memeriksa struktur data
    // console.log("API Response:", JSON.stringify(data, null, 2));

    // Pastikan struktur data yang diakses sesuai dengan respons API yang sebenarnya
    let result = data.mahasiswa.map((mhs) => ({
      nama: mhs.text,
      link: `${web}${mhs["website-link"]}`
    }));

    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

module.exports = pddikti;
