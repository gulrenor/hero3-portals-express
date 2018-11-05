const express = require("express");
const app = express();
const pug = require('pug');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');

// Compile the source code
const mainView = pug.compileFile('views/index.pug');
const portalLoginView = pug.compileFile('views/academic_login.pug');
// app.set('view engine', 'pug')

app.basedir = __dirname + '/views';

// SCSS Middleware
app.use(sassMiddleware({
  src: path.join(__dirname, 'scss'),
  dest: path.join(__dirname, '/public/css'),
  debug: true,
  outputStyle: 'compressed',
  force: true,
  // prefix: '/css'
}));
app.use(express.static(path.join(__dirname, '/public')));

// app.use('/images', express.static(path.join('.', 'public/images')));
// app.use('/css', express.static(path.join('.', 'public/css')));
// app.use('/scripts', express.static(path.join('.', 'public/js')));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));

// ROUTES
app.get("/", (req, res) =>{
  let html = mainView();
  // res.render("index");
  res.send(html);
});

app.get('/:organization/login/', (req, res) => {
  let org = req.params.organization;
  let html = portalLoginView(
    {
      basedir: __dirname + '/views',
      name: org,
      brandColorPrimary: '#f00',
      brandColorSecondary: '#0f0'
    }
  )
  res.send(html);
})

app.listen(3000, function() {
  console.log("listening on port 3000");
});
