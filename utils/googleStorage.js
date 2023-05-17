const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    projectId: 'analog-pilot-381004',
    keyFilename: '${{ secrets.NAMA_SECRET }}'
  });
const bucket = storage.bucket('tukang-storage');

module.exports = bucket;