const youtubedl = require('youtube-dl-exec');
const path = require('path');

async function igdl(videoUrl, query) {
  try {
    const cookieFilePath = path.join(__dirname, 'instagram_cookies.txt'); // Path relatif ke file cookies

    const output = await youtubedl(videoUrl, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      cookies: cookieFilePath // Path ke file cookies
    });

    const { channel, channel_id, uploader, uploader_id, channel_url, uploader_url, track, album, artists, duration, title, description, timestamp } = output;

    let result = {
      username: channel || 'Unknown Channel',
      user_id: channel_id || '',
      uploader: uploader || 'Unknown Uploader',
      uploader_id: uploader_id || '',
      channel_url: channel_url || '',
      uploader_url: uploader_url || '',
      track: track || '',
      album: album || '',
      artists: artists || [],
      duration: duration || 0,
      title: title || '',
      timestamp: timestamp || '',
      description: description || '',
      url: `${query[0]}/api/downloader/video?${query[1]}` || ''
    };

    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Melempar kembali error untuk ditangani di luar
  }
}

module.exports = igdl;
