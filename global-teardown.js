import fs from 'fs';

export default async function globalTeardown() {
    const filePath = 'data/storage.json';

    console.log(`globalTeardown: started`);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Storage state deleted successfully.`);
    }
}