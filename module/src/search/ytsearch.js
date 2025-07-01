const axios = require('axios');

const ytsearch = async (query) => {
    const options = {
        method: 'GET',
        url: 'https://yt-api.p.rapidapi.com/search',
        params: { query: query },
        headers: {
          'x-rapidapi-key': 'a48d7930f0msh9691ddaea15dc19p13b2f6jsncb4d212a795c',
          'x-rapidapi-host': 'yt-api.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const data = response.data;

        console.log('API Response:', data); // Log respons API untuk memeriksa struktur data
        
        // Pastikan untuk memeriksa struktur data dari response dan sesuaikan dengan yang diinginkan
        let result = data.data.map(video => ({
            videoId: video.videoId,
            title: video.title,
            channelTitle: video.channelTitle,
            description: video.description,
            viewCount: video.viewCount,
            publishedTimeText: video.publishedTimeText,
            thumbnailUrl: video.thumbnail && video.thumbnail[0] ? video.thumbnail[0].url : null // Memeriksa apakah thumbnail dan elemen pertama ada
        }));
        
        return result;
    } catch (error) {
        console.error('Error fetching YouTube data:', error);
        return null;
    }
};

module.exports = ytsearch;
