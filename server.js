var express = require('express');
var app = express();

app.get('/api/data', function (req, res) {
  var data = {
    name: 'Test Campaign',
    campaignType: 'Return to Hoth',
    completedMissions: ['hoth_intro', 'side_mission_1'],
    imperialPlayer: {
      name: 'Alice',
      classDeck: 'super_minions',
      totalXP: 4,
      currentXP: 1,
      influence: 2,
      upgrades: [
        'super_minions_1',
        'super_minions_3',
      ],
    },
    rebelTotalCredits: 1750,
    rebelCurrentCredits: 400,
    rebelTotalXP: 5,
    rebelPlayers: [
    {
      name: 'Bob',
      hero: 'diala',
      currentXP: 0,
      upgrades: [
        'diala_1',
        'diala_2',
      ],
      equipment: [
        'lightsaber',
        'headband',
      ],
    },
    {
      name: 'Charlie',
      hero: 'loku',
      currentXP: 2,
      upgrades: [
        'loku_1',
        'loku_3',
      ],
      equipment: [
        'sniper_rifle',
        'invisibility_cloak',
      ],
    },
    ],
    missionLog: [
    {
      type: 'begin',
    },
    {
      type: 'complete_mission',
      mission: 'hoth_intro',
      winningSide: 'rebel',
    },
    {
      type: 'complete_mission',
      mission: 'side_mission_1',
      winningSide: 'imperial',
    },
    ],
  };
  res.send(data);
});

app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
