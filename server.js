const express = require("express");
const app = express();
const pug = require('pug');

// Compile the source code
const compiledFunction = pug.compileFile('views/index.pug');

// app.set('view engine', 'pug')

app.use(express.static(__dirname + '/public'));


// ROUTES
app.get("/", function(req, res) {
  // res.send("Hello World!");
  // Render a set of datar

  let org = req.params.organization; 

  let html = compiledFunction(
    {
      name:
        Math.random()
    }
  );

  // res.render("index");
  res.send(html);
});


app.get("/login", (req, res) => {
  res.render('login');
})

app.listen(3000, function() {
  console.log("listening on port 3000");
});
