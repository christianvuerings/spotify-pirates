var sp = getSpotifyApi(1);
var m = sp.require('sp://import/scripts/api/models');
var v = sp.require('sp://import/scripts/api/views');

exports.init = init;
exports.m = init;

var list = document.getElementById('list');

function addListeners() {

  var forEach = Array.prototype.forEach;

  forEach.call(document.querySelectorAll('.name a'), function(el) {
    el.addEventListener('click', function(e){
      e.preventDefault();
      m.player.play(this.attributes['data-uri'].value);
    }, false);
  });
}

function addSong(track) {
  if (track.name) {
    var image = '<img src="' + track.album.image + '" width="20" height="20" />';
    var thepiratebay = 'http://thepiratebay.se/search/';
    var hypem = 'http://hypem.com/search/';
    var link =  track.name.replace(' - ', ' ') + ' ' + track.artists[0].name;
    var piratelink = thepiratebay + link + '/0/7/100';
    var hypemlink = hypem + link;
    var mp3skulllink = 'http://mp3skull.com/mp3/' + link.toLowerCase().replace(/ /g, '_').replace('_&amp;', '') + '.html';

    var name = track.name + ' - ' + track.artists[0].name;
    var trackhtml = '<li><div class="name">' + image + '<a href data-uri="' + track.uri + '">' + name + '</a></div><div class="download"><a href="' + piratelink + '"> ☠ </a> <a href="' + hypemlink + '"> ♥ </a> <a href="' + mp3skulllink + '"> mp3skull </a></div></li>';
    list.innerHTML = list.innerHTML + trackhtml;
  }
}

function loadSong(trackData) {
  var t = m.Track.fromURI(trackData, function(track) {
    addSong(track);
  });
}

function init() {
  var starredSongs = m.library.starredPlaylist.data.all();
  for(var i = starredSongs.length - 1; i >= 0; i--) {

    loadSong(starredSongs[i]);
  }
  addListeners();
}
