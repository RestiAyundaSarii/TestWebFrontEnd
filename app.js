const express = require('express')
const expressLayout =require('express-ejs-layouts')
const app = express()


//import local modules
const {getData} = require('./utils/dt')

app.set('view engine','ejs');//konfigurasi ejs
app.use(expressLayout)
app.use(express.static('public'))
// middleware encoding dari form
app.use(express.urlencoded());

app.get('/', function (req, res) {//method request yang didapatkan dari halaman website, untuk form get dapat diganti dengan post
    // res.sendFile('./index.html',{root:__dirname})
    const data1 = getData();  
    const data={
      title: "Halaman Home",
      layout :"layouts/main-layout",
      data1
    }
    res.render('index',data);
  })

app.get('/mahasiswa', function (req, res) {
    // res.sendFile('./mahasiswa.html',{root:__dirname})
    const mahasiswa = getMahasiswa();
    const data={
      title: "Halaman Mahasiswa",
      layout :"layouts/main-layout",
      mahasiswa
    }
    res.render('mahasiswa',data);
  })
    
  app.get('/jurusan', function (req, res) {
    // res.sendFile('./jurusan.html',{root:__dirname})
    const data={
      title: "Halaman Jurusan",
      layout :"layouts/main-layout"
    }
    res.render('jurusan',data);
  })
  app.get('/praktikum/:id/:kategori/:value', function (req, res) {
    res.send(`Params =${req.params.id},${req.params.kategori},${req.params.value}`)
  })
  app.get('/praktikum/', function (req, res) {
    res.send(`Query = ${req.query.id},${req.query.jurusan}`)
  })


app.get('/mahasiswa/tambah', (req, res) => {
 
   res.render('mahasiswa-tambah', {
       layout: 'layouts/main-layout',
       title: 'Mahasiswa'
      
   });
})

app.post('/mahasiswa',(req,res) =>{
  tambahMahasiswa(req.body);
  res.redirect('/mahasiswa');
})

app.get('/mahasiswa/ubah/:nim', (req, res) => {

  const mhs = ambilMahasiswa(req.params.nim);
  res.render('mahasiswa-ubah', {
      layout: 'layouts/main-layout',
      title: 'Mahasiswa',
      mhs

  });
})
app.post('/mahasiswa/ubah', (req, res) => {
  ubahMahasiswa(req.body);
  res.redirect('/mahasiswa');
})

app.get('/mahasiswa/hapus/:nim', (req, res) => {

  const mhs =  ambilMahasiswa(req.params.nim);
 
  if(!mhs){
      res.status(404);
      res.send('<h1>404</h1>');
  }else{
      hapusMahasiswa(req.params.nim);
  }
    res.redirect('/mahasiswa');
 
 })
 
  app.use('/',(req,res)=>{
      res.status(404);
      res.send('<h1>404</h1>')
  })
 
app.listen(3000)