const fs = require('fs')
const dirPath = './data'

//buat folder jika belum ada
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)//make directory
 }
 
 //Buat file jika belum ada
 const filePath = './data/data.json';
 if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath,'[]','utf-8');//make file
 }
 
 const getData = () =>{//mengambil data mahasiswa
    const fileBuffer = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileBuffer);//mengubah karakter atau string menjadi sebuah object dengan menggunakan parse
    return data;
 }
 module.exports = { getData};