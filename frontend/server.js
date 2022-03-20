const path = require('path');
const express = require('express');
const app = express();
const buildPath = path.join(__dirname, 'build');
const fs = require("fs")

fs.access(buildPath, function(error) {
  if (error) {
    console.log("Directory does not exist.")
  } else {
    console.log("Directory exists.");

    
    fs.readdir(buildPath, (err, files) => {
      files.forEach(file => {
        console.log(file)
      });
    });
  }
});

app.set('port', process.env.PORT || 3000);
app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(app.get('port'), () => {
  console.log('Server is up on ', app.get('port'));
});