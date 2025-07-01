const axios = require('axios');
const cheerio = require('cheerio');

async function webtoon(query) {
    try {
        const { data } = await axios.get(`https://www.webtoons.com/en/search?keyword=${query}`);
        const $ = cheerio.load(data);
        const hasil = [];

        $('.search .challenge_lst > ul > li').each((index, element) => {
            const result = {
                publis: $(element).find('.author').text().trim() || 'Tidak ada',
                judul: $(element).find('.subj').text().trim() || 'Tidak ada',
                genre: $(element).find('.genre').text().trim() || 'Tidak ada',
                rating: $(element).find('.grade_num').text().trim() || 'Tidak ada',
                // thumbnail: $(element).find('.img_area img').attr('src') || 'Tidak ada',
                link: $(element).find('.challenge_item').attr('href') || '#'
            };
            hasil.push(result);
        });

        return hasil;
    } catch (error) {
        throw error;
    }
}

module.exports = webtoon;
