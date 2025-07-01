const axios = require('axios');
const cheerio = require('cheerio');

async function republika() {
    try {
        const { data } = await axios.get(`https://republika.co.id/home/mobile_popular`);
        const $ = cheerio.load(data);
        const hasil = [];

        $('.section-terpopuler .card').each((index, element) => {
            const result = {
                judul: $(element).find('.card-title').text().trim() || 'Tidak ada',
                thumbnail: $(element).find('.img-fluid').attr('src') || 'Tidak ada',
                link: $(element).find('.card > a').attr('href') || '#'
            };
            hasil.push(result);
        });

        return hasil;
    } catch (error) {
        throw error;
    }
}

module.exports = republika;
