var map = L.map('map').setView([-25.643946, -49.312761], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var ecotrade = L.marker([-25.63842943918111, -49.31358039502297]).addTo(map);
var casa = L.marker([-25.644290175502498, -49.31591371317451]).addTo(map);

ecotrade.on('click', function () {
    var popupContent = "Alo";
    var popup = L.popup().setContent(popupContent);
    ecotrade.bindPopup(popup).openPopup();
    ecotrade.unbindPopup().bindPopup(popup).openPopup();

});

// Suponha que você tenha um elemento HTML com id "infoSidebar" para a barra lateral.
var infosidebar = document.getElementById('infoSidebar');

// ecotrade.on('click', function () {
//     // Atualize o conteúdo da barra lateral com informações do local clicado.
//     info.innerHTML = '<a href="https://www.ecotrade.ind.br" target="_blank">Site</a>';
// });
