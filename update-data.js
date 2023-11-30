import fs from 'fs';
import url from 'url';
import path from 'path';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const dataPath = path.resolve(__dirname, './app/data');

fetch('http://localhost:8000/api/parcelTypes')
  .then((res) => res.json())
  .then(({ data }) => {
    fs.writeFile(
      path.resolve(dataPath, './parcel-types.json'),
      JSON.stringify(data),
      (err) => {
        if (err) {
          return console.log(err);
        }
        console.log('- Successfully created parcel types file');
      }
    );
  });

fetch('http://localhost:8000/api/deliverby')
  .then((res) => res.json())
  .then(({ data }) => {
    fs.writeFile(
      path.resolve(dataPath, './deliverbies.json'),
      JSON.stringify(data),
      (err) => {
        if (err) {
          return console.log(err);
        }
        console.log('- Successfully created deliverbies file');
      }
    );
  });
