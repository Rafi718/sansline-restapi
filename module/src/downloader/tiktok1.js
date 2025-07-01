const axios = require('axios');

const tiktok1 = async (videoUrl) => {
  const options = {
    method: 'GET',
    url: 'https://tiktok-video-downloader-api.p.rapidapi.com/media',
    params: { videoUrl: videoUrl },
    headers: {
      'x-rapidapi-key': 'a48d7930f0msh9691ddaea15dc19p13b2f6jsncb4d212a795c',
      'x-rapidapi-host': 'tiktok-video-downloader-api.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const data = response.data;
    
    console.log('API Response:', data); // Log respons API untuk memeriksa struktur data
    
    let result = {
      id: data.id,
      username: data.author.username, // Akses username di dalam objek author
      nickname: data.author.nickname, // Akses nickname di dalam objek author
      verified: data.author.verified, // Akses verified di dalam objek author
      description: data.description,
      cover: data.cover,
      avatar: data.avatar,
      stats: {
        likes: data.stats.likes,
        comments: data.stats.comments,
        views: data.stats.views,
        shares: data.stats.shares,
        saves: data.stats.saves
      },
      url: data.downloadUrl
    };
    return result;
  } catch (error) {
    console.error('Error fetching TikTok data:', error);
    return null;
  }
};

module.exports = tiktok1;
