const youtubedl = require("youtube-dl-exec");

async function tiktok(videoUrl, query) {
  try {
    const output = await youtubedl(videoUrl, {
      dumpSingleJson: true,
      noCheckCertificates: true,
    });

    // Mendapatkan informasi tambahan
    const {
      channel_id,
      uploader_id,
      uploader_url,
      title,
      description,
    } = output;

    // Membuat objek result
    let result = {
      //   format_note: downloadFormat.format_note || 'unknown',
      username: uploader_id || "Unknown Channel",
      user_id: channel_id || "",
      channel_url: uploader_url || "",
      title: title || "",
      description: description || "",
      url: `${query[0]}/api/downloader/video?${query[1]}` || "",
    };
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Melempar kembali error untuk ditangani di luar
  }
}

module.exports = tiktok;
