const fetch = require('node-fetch');

const pagePre = 40;
const apiUrl = 'https://www.seaart.ai/api/v1/artwork/list';

const seaart = async (text) => {
    const requestData = {
        page: 1,
        page_size: pagePre,
        order_by: 'new',
        type: 'community',
        keyword: text,
        tags: []
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const { data } = await response.json();
        const items = data.items;

        if (!items || !Array.isArray(items) || items.length === 0) {
            throw new Error('No items found.');
        }

        const randomIndex = Math.floor(Math.random() * items.length);
        return items[randomIndex].banner.url;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

module.exports = seaart;
