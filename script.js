// função que define latitude e longitude a partir do usuário
function localizacaoUsuario(callback){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function (position){
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            console.log("Latitude: ", latitude);
            console.log("Longitude: ", longitude);
            if (typeof callback === "function") {
                callback(latitude, longitude);
            }
        }, function (error) {// Caso tenha erro na localização do usuário, utiliza coordenadas padrão
            console.error("Erro ao obter localização do usuário:", error);
            let latitudePadrao = -25.643946; // coordenadas da cidade de Fazenda Rio Grande - PR
            let longitudePadrao = -49.312761;
            if (typeof callback === "function") {
                callback(latitudePadrao, longitudePadrao);
            }
        });
    } else { // Caso o navegador não suporte geolocalização, utilize coordenadas padrão
        console.log("O navegador não suporta localização");
        let latitudePadrao = -25.643946; // coordenadas da cidade de Fazenda Rio Grande - PR
        let longitudePadrao = -49.312761;
        if (typeof callback === "function") {
            callback(latitudePadrao, longitudePadrao);
        }
    }
}

localizacaoUsuario(function(lat, long){//inicia o mapa com a localização do usuario
    var map = L.map('map').setView([lat, long], 13);// Posição inicial do mapa
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    

    fetch('empresas.json') // arquivo json que contém os pontos a serem marcados no mapa
        .then(response => response.json())
        .then(data => {
            data.forEach(point => {
                var marker = L.marker([point.lat, point.lng]).addTo(map);
                
                var popup = L.popup().setContent("<b>"+ point.descricao + "</b>" + "<br> " + point.end +"<br>" + point.cidade + " - " + point.estado + "<br>Telefone: " + "<a href='tel:"+ point.tel1 + "'>"+ point.tel1+ "</a>" + " / " + "<a href='tel:"+ point.tel2 + "'>"+ point.tel2+ "</a>" +"<br> <a href= " + point.url + " target='_blank'" +">" +point.nomeLink + "</a>"); // Marcador
                marker.bindPopup(popup);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
        });
});
