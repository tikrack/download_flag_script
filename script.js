const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function downloadFlags() {
    try {
        const jsonData = fs.readFileSync('./country.json', 'utf8');
        const countries = JSON.parse(jsonData);

        if (!fs.existsSync('./Pic')) {
            fs.mkdirSync('./Pic');
        }

        for (const country of countries) {
            const imgAddress = country.flags.png;
            const fileName = imgAddress.split('/').pop();
            const filePath = path.join('./Pic', fileName);

            try {
                const response = await axios.get(imgAddress, { responseType: 'arraybuffer' });
                fs.writeFileSync(filePath, response.data);
                console.log(`Downloaded: ${fileName}`);
            } catch (error) {
                console.error(`Failed to download ${imgAddress}:`, error.message);
            }
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

downloadFlags();