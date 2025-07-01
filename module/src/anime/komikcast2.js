const axios = require('axios');
const cheerio = require('cheerio');

async function komikcast2(query) {
    try {
        const { data } = await axios.get(`https://komikcast.cafe/?s=${query}&submit-search=`);
        const $ = cheerio.load(data);
        const hasil = [];

        $('.arch-list .post-item').each((index, element) => {
            const result = {
                author: author,
                judul: $(element).find('.post-item-title > h4').text().trim() || 'Tidak ada',
                rating: $(element).find('.rating i').text().trim() || 'Tidak ada',
                thumbnail: $(element).find('.post-item-thumb img').attr('src') || 'Tidak ada',
                link: $(element).find('.post-item-box > a').attr('href') || '#'
            };
            hasil.push(result);
        });

        return hasil;
    } catch (error) {
        throw error;
    }
}

module.exports = komikcast2;
