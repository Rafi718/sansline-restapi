const youtubedl = require("youtube-dl-exec");

async function tiktok(videoUrl, query) {
  try {
    const output = await youtubedl(videoUrl, {
      dumpSingleJson: true,
      noCheckCertificates: true,
    });

    // Mendapatkan informasi tambahan
    const { uploader_id, uploader, thumbnail, title, description, view_count, duration } = output;

    // Membuat objek result
    let result = {
      //   format_note: downloadFormat.format_note || 'unknown',
      username: uploader || "Unknown Channel",
      user_id: uploader_id || "",
      thumbnail: thumbnail || "",
      title: title || "",
      description: description || "",
      view: view_count || "",
      duration: duration || "",
      url: `${query[0]}/api/downloader/video?${query[1]}` || "",
    };
    console.log(output);
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Melempar kembali error untuk ditangani di luar
  }
}

module.exports = tiktok;
