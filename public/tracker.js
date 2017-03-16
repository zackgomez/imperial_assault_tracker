var updateView = function(data) { 
  $('#campaignName').text(data.name);
  $('#campaignType').text(data.campaignType);

  for (var index in data.completedMissions) {
    var mission = data.completedMissions[index];
    $('#missionList').append('<div class="completedMission">' + mission + '</div>');
  };

  // Add infor for Imperial player
  var imperialPlayer = $('<div/>').attr({
    class: 'well text-left',
  });

  // Create sub divs for each attribute
  var imperialPlayerName = $('<h4/>').attr({
    class: 'playerName text-center'
  }).text(data.imperialPlayer.name);

  var classDeck = $('<div/>').attr({
    class: 'classDeck',
  }).text('Class Deck: ' + data.imperialPlayer.classDeck);

  var totalXP = $('<div/>').attr({
    class: 'playerXP',
  }).text('Total XP: ' + data.imperialPlayer.totalXP);

  var currentXP = $('<div/>').attr({
    class: 'playerXP',
  }).text('Current XP: ' + data.imperialPlayer.currentXP);

  var influence = $('<div/>').attr({
    class: 'influence',
  }).text('Influence: ' + data.imperialPlayer.influence);

  var upgrades = createListObject(data.imperialPlayer.upgrades, 'upgrades', 'Upgrades');

  imperialPlayer.append(imperialPlayerName, classDeck, totalXP, currentXP, influence, upgrades);
  $('#imperialPlayer').html(imperialPlayer);

  // Display stats for rebel team
  var rebelTeam = $('<div/>').attr({
    id: 'rebelTeamStats',
    class: 'well text-left'
  });

  var rebelCurrentCredits = $('<div/>').attr({
  }).text('Current credits: ' + data.rebelCurrentCredits);
  var rebelTotalCredits = $('<div/>').attr({
  }).text('Total credits: ' + data.rebelTotalCredits);
  var rebelTotalXP = $('<div/>').attr({
  }).text('Total XP: ' + data.rebelTotalXP);

  rebelTeam.append(rebelCurrentCredits, rebelTotalCredits, rebelTotalXP);
  $('#rebelTeamStats').replaceWith(rebelTeam);

  // Add info for each rebel player
  var rebelRow = $('<div/>').attr({
    id: "rebelPlayers",
    class: "row",
  });
  for (var index in data.rebelPlayers) {
    var rebel = data.rebelPlayers[index];
    // Create div for each player and sub divs for each attribute
    var rebelContainer = $('<div/>').attr({
      class: 'well col-sm-6 text-left',
    });

    // Create a div for each player attribute
    var name = $('<h4/>').attr({
      class: 'playerName text-center'
    }).text(rebel.name);

    var hero = $('<div/>').attr({
      class: 'hero',
    }).text('Hero: ' + rebel.hero);

    var xp = $('<div/>').attr({
      class: 'playerXP',
    }).text('XP: ' + rebel.currentXP);

    var upgrades = createListObject(rebel.upgrades, 'upgrades text-left', 'Upgrades', rebel.id);
    var equipment = createListObject(rebel.equipment, 'equipment', 'Equipment', rebel.id);

    rebelContainer.append(name, hero, xp, upgrades, equipment);
    rebelRow.append(rebelContainer);
  };
  $('#rebelPlayers').replaceWith(rebelRow);

  $(".playerName").addClass("bg-info");
  console.log(data);
};

function createListObject(list, classString, listName, playerID) {
  var listContainer = $('<div/>').attr({
  }).text(listName + ': ');

  var listObject = $('<ul/>').attr({
    class: classString,
  });

  var items = list.map(function(item) {
    return $('<li/>').attr({
      class: classString,
    }).text(item);
  });

  var addItemButton = $('<button/>').attr({
    type: 'button',
    class: 'btn btn-primary btn-sm'
  }).text('+ ' + listName);

  if (listName == 'Equipment') {
    addItemButton.click({id: playerID}, addItem);
  };

  listObject.append(items);
  listContainer.append(listObject, addItemButton);
  return listContainer;
};

function addItem(event) {
  //alert("Adding item.  Player ID: " + event.data.id);
  var item = prompt('Enter item: ', 'New Item');
  if (item == null) {
    return
  };
  $.ajax({
    url: '/api/rebel/' + event.data.id + '/add_item',
    type: 'POST',
    data: 'item=' + item,
    success: updateView,
  });
};

$.ajax({
  cache: false,
  dataType: 'json',
  url: '/api/data',
  success: updateView
});