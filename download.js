const https = require('https');
const fs = require('fs');
const path = require('path');

const workouts = [
    { name: 'batman', url: 'https://darebee.com/images/workouts/batman-workout.jpg' },
    { name: 'total-core', url: 'https://darebee.com/images/workouts/total-core-workout.jpg' },
    { name: 'micro-hiit', url: 'https://darebee.com/images/workouts/micro-hiit-workout.jpg' },
    { name: 'legday', url: 'https://darebee.com/images/workouts/legday-workout.jpg' },
    { name: 'power-core', url: 'https://darebee.com/images/workouts/power-core-workout.jpg' },
    { name: 'metcon-prime', url: 'https://darebee.com/images/workouts/metcon-prime-workout.jpg' },
    { name: 'wake-up', url: 'https://darebee.com/images/workouts/wake-up-workout.jpg' },
    { name: 'spartan', url: 'https://darebee.com/images/workouts/spartan-workout.jpg' },
    { name: 'unbound', url: 'https://darebee.com/images/workouts/unbound-workout.jpg' },
    { name: 'everyday-yoga', url: 'https://darebee.com/images/workouts/everyday-yoga-workout.jpg' },
    // Fallbacks just in case
    { name: 'pull-up-level-1', url: 'https://darebee.com/images/workouts/pullup-level1-workout.jpg' },
    { name: 'cardio-trim', url: 'https://darebee.com/images/workouts/cardio-trim-workout.jpg' },
    { name: 'quick-hiit', url: 'https://darebee.com/images/workouts/quick-hiit-workout.jpg' },
];

const targetDir = path.join(__dirname, 'assets', 'workouts');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

function downloadImage(workout) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(targetDir, `${workout.name}.jpg`);
        const file = fs.createWriteStream(filePath);

        https.get(workout.url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`✅ Downloaded: ${workout.name}.jpg`);
                    resolve();
                });
            } else {
                file.close();
                fs.unlinkSync(filePath); // Delete empty file
                console.log(`❌ Failed: ${workout.name} (Status: ${response.statusCode})`);
                resolve(); // Resolve anyway so Promise.all completes
            }
        }).on('error', (err) => {
            fs.unlinkSync(filePath);
            console.error(`Error downloading ${workout.name}:`, err.message);
            resolve();
        });
    });
}

async function main() {
    console.log('Downloading Darebee workout infographics...');
    const promises = workouts.map(w => downloadImage(w));
    await Promise.all(promises);
    console.log('All downloads completed!');
}

main();
