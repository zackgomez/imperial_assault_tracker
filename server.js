var express = require('express');
var app = express();

app.get('/api/data', function (req, res) {
  var data = {
    name: 'Test Campaign',
    campaign_type: 'Return to Hoth',
    completed_missions: ['hoth_intro', 'side_mission_1'],
    imperial_player: {
      name: 'Alice',
    },
    rebel_players: [
    {
      name: 'Bob',
      hero: 'diala',
    },
    {
      name: 'Charlie',
      hero: 'loku',
    },
    ],
  };
  res.send(data);
});

app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
