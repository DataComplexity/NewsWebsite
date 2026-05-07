// Converted CSV to JSON: 
// const fs = require('fs');
// const csv = require('csv-parser');

// const results = [];

// fs.createReadStream('../Datasets/news.csv')
//   .pipe(csv())
//   .on('data', (row) => results.push(row))
//   .on('end', () => {
//     fs.writeFileSync('../Datasets/news.json', JSON.stringify(results, null, 2));
//     console.log('CSV converted to JSON!');
//   });