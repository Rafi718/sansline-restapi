const axios = require('axios');
const cheerio = require('cheerio');

async function fetchDetail(link) {
    try {
        const { data } = await axios.get(link);
        const $ = cheerio.load(data);

        // Misalnya, mengambil informasi tambahan dari halaman detail
        const additionalInfo = $('.additional-info-selector').text().trim() || 'Tidak ada';
        return additionalInfo;
    } catch (error) {
        console.error(`Error fetching details for ${link}:`, error);
        return 'Tidak ada';
    }
}

async function discover(query) {
    try {
        const encodedQuery = encodeURIComponent(query);
        const { data } = await axios.get(`https://discoverprofile.com/${encodedQuery}/`);
        const $ = cheerio.load(data);
        const hasil = [];

        const elements = $('.value-row');
        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            const link = $(element).find('.challenge_item').attr('href') || '#';

            // Fetch detail for each link
            const additionalInfo = await fetchDetail(link);

            const result = {
                publis: $(element).find('.author').text().trim() || 'Tidak ada',
                judul: $(element).find('.subj').text().trim() || 'Tidak ada',
                genre: $(element).find('.genre').text().trim() || 'Tidak ada',
                rating: $(element).find('.grade_num').text().trim() || 'Tidak ada',
                link: link,
                additionalInfo: additionalInfo
            };
            hasil.push(result);

            // Hanya mengambil hasil pertama
            if (hasil.length >= 1) break;
        }

        return hasil.length > 0 ? hasil[0] : { message: 'Tidak ada data ditemukan' };
    } catch (error) {
        throw error;
    }
}

module.exports = discover;

// // Contoh penggunaan
// const query = 'example_query';
// discover(query).then(data => {
//     console.log(data);
// }).catch(error => {
//     console.error('Error:', error);
// });
