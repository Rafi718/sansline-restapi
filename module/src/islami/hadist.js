const axios = require('axios');
const cheerio = require('cheerio');

async function hadist(query) {
    try {
        const { data } = await axios.get(`https://hadits.tazkia.ac.id/search/hadits?q=${query}`);
        const $ = cheerio.load(data);
        const hasil = [];

        $('.container .hadits').map((index, element) => {
            const result = {
                riwayat: $(element).find('.hadits > h2').text().trim() || 'Tidak ada',
                ayat: $(element).find('.arabic').text().trim() || 'Tidak ada',
                artinya: $(element).find('.indonesia').text().trim() || 'Tidak ada',
                link: `https://hadits.tazkia.ac.id/search/hadits?q=${query}` || '#'
            };
            hasil.push(result);
        });

        return hasil;
    } catch (error) {
        throw error;
    }
}

module.exports = hadist;
