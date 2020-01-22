const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/write/from/:from/to/:to', (req, res) => {
  var frm = req.params['from'];
  var to = req.params['to'];

  var read = fs.readFileSync('/aci/logs/'+frm, function(err) {
    if(err) {
      return console.log(err);
    }
  });

  console.log('read');

  fs.writeFile('/mnt/empty/'+to, read, function(err) {
    if(err) {
      return console.log(err);
    }
  });

  console.log('wrote');

  res.redirect('/');
})

app.listen(process.env.PORT || 80, function() {
 console.log('listening on port ' + process.env.PORT || 80);
});

