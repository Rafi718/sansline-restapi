const youtubedl = require('youtube-dl-exec');

async function tiktok(videoUrl, query) {
  try {
    const output = await youtubedl(videoUrl, {
      dumpSingleJson: true,
      noCheckCertificates: true,
    });

   

    // // Cari format dengan format_id 'download'
    // const downloadFormat = output.formats.find(format => format.format_id === 'download');

    // if (!downloadFormat) {
    //   throw new Error("Format 'download' tidak ditemukan dalam respon.");
    // }

    // Mendapatkan informasi tambahan
    const { channel, channel_id, uploader, uploader_id, channel_url, uploader_url, track, album, artists, duration, title, description, timestamp} = output;

    // Membuat objek result
    let result = {
      
    //   format_note: downloadFormat.format_note || 'unknown',
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
      
    //   url: downloadFormat.url
      // Tambahkan properti lain yang Anda perlukan
    };

    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Melempar kembali error untuk ditangani di luar
  }
}

module.exports = tiktok;
