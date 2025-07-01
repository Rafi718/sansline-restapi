function key(validKey) {
    return function (req, res, next) {
      // Ambil produk kunci dari permintaan (misalnya, dari header atau parameter)
      const clientProductKey = ['product-key'];
      // Periksa apakah produk kunci dari klien cocok dengan yang sah
      if (clientProductKey[0] === validKey) {

        // Produk kunci valid, lanjutkan permintaan
        next();
      } else {
        // Produk kunci tidak valid, kirim respon error
        res.status(401).json({ error: 'Masukan Licensi key Yang benar.' });
      }
    };
  }
  
  module.exports = key;
  
  