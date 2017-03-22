var express = require('express');
var bodyParser = require('body-parser');
var uuid = require('uuid');


var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var data = {
  name: 'Test Campaign',
  campaignType: 'Return to Hoth',
  completedMissions: ['hoth_intro', 'side_mission_1'],
  imperialPlayer: {
    id: '123',
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
    id: '1234',
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
    id: '1235',
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
  {
    id: '1236',
    name: 'Erin',
    hero: 'jyn',
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
  {
    id: '1237',
    name: 'Daniella',
    hero: 'verena',
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

var gameByID = {};

app.get('/api/data', function (req, res) {
  res.json(data);
});

function find_rebel(playerID) {
  return data.rebelPlayers.find(function(player) {
    return player.id === playerID;
  });
}

app.get('/api/game/:gameID', function(req, res) {
  var gameID = req.params.gameID;
  var game = gameByID[gameID];
  if (!game) {
    res.status(404).end();
    return;
  }
  res.json(game);
});

app.post('/api/create_game', function(req, res) {
  var body = req.body;
  console.log(body);
  var campaignName = body.campaignName;
  var campaignType = body.campaignType;
  var imperialName = body.imperialName;
  var imperialClassDeck = body.imperialClassDeck;

  var rebels = body.rebels;

  if (!campaignName || !campaignType || !imperialName || !imperialClassDeck || !rebels) {
    res.status(400).send('Missing params');
    return;
  }

  var rebelPlayers = rebels.map(function(def, idx) {
    return {
      id: 'rebel'+idx,
      name: def.name,
      hero: def.hero,
      currentXP: 0,
      upgrades: [],
      equipment: [],
    };
  });

  var game = {
    id: uuid(),
    name: campaignName,
    campaignType: campaignType,
    completedMissions: [],
    imperialPlayer: {
      id: 'imp',
      name: imperialName,
      classDeck: imperialClassDeck,
      totalXP: 0,
      currentXP: 0,
      influence: 0,
      upgrades: [],
    },
    rebelTotalCredits: 0,
    rebelCurrentCredits: 0,
    rebelTotalXP: 0,
    rebelPlayers: rebelPlayers,
    missionLog: [],
  };

  gameByID[game.id] = game;
  res.json(game);
});

app.post('/api/rebel/:playerID/add_item', function (req, res) {
  var playerID = req.params.playerID;
  var item = req.body.item;
  if (!playerID) {
    res.status(400).end();
    return;
  }
  var player = find_rebel(playerID);
  if (!player) {
    res.status(400).end();
    return;
  }
  player.equipment.push(item);
  res.json(data);
});

app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
