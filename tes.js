const seaart = require('./module/src/ai/seaart'); // Sesuaikan dengan nama file dan path yang benar

async function exampleUsage() {
    try {
        const textToSearch = '1 girl, blue eyes, reading book'; // Ganti dengan kata kunci pencarian yang diinginkan
        const result = await seaart(textToSearch);
        console.log('Random Artwork Result:', result);
    } catch (error) {
        console.error('Error in exampleUsage:', error);
    }
}

// Panggil fungsi exampleUsage
exampleUsage();
