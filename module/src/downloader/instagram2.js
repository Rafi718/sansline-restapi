const axios = require("axios");

const instagram = async (videoUrl) => {
  const options = {
    method: "GET",
    url: "https://instagram-downloader-download-instagram-videos-stories.p.rapidapi.com/index",
    params: { url: videoUrl }, // Gunakan 'url' sebagai parameter
    headers: {
      "x-rapidapi-key": "a48d7930f0msh9691ddaea15dc19p13b2f6jsncb4d212a795c",
      "x-rapidapi-host": "instagram-downloader-download-instagram-videos-stories.p.rapidapi.com", // Nama host yang sesuai
    },
  };

  console.log("Request options:", options); // Log opsi request untuk debugging

  try {
    const response = await axios.request(options);
    const data = response.data;

    console.log("API Response:", data); // Log respons API untuk memeriksa struktur data

    if (data.Type === "Post-Video") {
      let result = {
        thumbnail: data.thumbnail, // Akses thumbnail dari respons
        type: data.Type, // Akses tipe dari respons
        title: data.title, // Akses judul dari respons
        url: data.media, // Akses media URL dari respons
      };
      return result;
    } else if (data.Type === "Image") {
      let result = {
        thumbnail: data.thumbnail, // Akses thumbnail dari respons
        type: data.Type, // Akses tipe dari respons
        title: data.title, // Akses judul dari respons
        url: data.media, // Akses media URL dari respons
      };
      return result;
    } else if (data.Type === "Carousel") {
      let result = {
        thumbnail: data.carousel_thumb, // Akses thumbnail dari respons
        type: data.Type, // Akses tipe dari respons
        title: data.title, // Akses judul dari respons
        media: data.media_with_thumb.map(item => ({ 
          media: item.media, 
          thumbnail: item.thumb 
        })), // Akses media dan thumbnail dari respons carousel
      };
      return result;
    } else {
      console.error("Unexpected response type:", data.Type);
      return null;
    }
  } catch (error) {
    console.error("Error fetching Instagram data:", error);
    if (error.response) {
      console.error("Response data:", error.response.data); // Log respons error dari server
    }
    return null;
  }
};

module.exports = instagram;
