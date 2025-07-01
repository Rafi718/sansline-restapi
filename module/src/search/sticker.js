const axios = require('axios');
const cheerio = require('cheerio');

async function sticker(query) {
    try {
        const { data } = await axios.get(`https://getstickerpack.com/stickers?query=${query}`);
        const $ = cheerio.load(data);
        const hasil = [];

        $('.justify-content-center .sticker-pack-cols').each((index, element) => {
            const result = {
                username: $(element).find('.username').text().trim() || 'Tidak ada',
                judul: $(element).find('.sticker-pack-block .title').text().trim() || 'Tidak ada',
                thumbnail: $(element).find('.sticker-pack-block img').attr('src') || 'Tidak ada',
                link: $(element).find('.sticker-pack-cols > a').attr('href') || '#'
            };
            hasil.push(result);
        });

        return hasil;
    } catch (error) {
        throw error;
    }
}

module.exports = sticker;
