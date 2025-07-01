const axios = require("axios");
const cheerio = require("cheerio");

async function pddikti2(query) {
  try {
    const { data } = await axios.get(
      `https://pddikti.kemdikbud.go.id/search/${query}`
    );
    const $ = cheerio.load(data);
    const hasil = [];

    $('overflow-x-auto').map((index, element) => {
        const result = {
            nama: $(element).find('.bg-white .px-4').text().trim() || 'Tidak ada',
            judul: $(element).find('.subj').text().trim() || 'Tidak ada',
            genre: $(element).find('.genre').text().trim() || 'Tidak ada',
            rating: $(element).find('.grade_num').text().trim() || 'Tidak ada',
            // thumbnail: $(element).find('.img_area img').attr('src') || 'Tidak ada',
            link: $(element).find('.challenge_item').attr('href') || '#'
        };
        hasil.push(result);
    });
    // const result = data;
    return hasil;
  } catch (error) {
    throw error;
  }
}

module.exports = pddikti2;
