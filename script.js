// função que define latitude e longitude a partir do usuário
function localizacao(callback){
    if (navigator.geolocation){
        var options = {
            enableHighAccuracy: true//para maior precisao
          };
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
        },options
        );
    } else { // Caso o navegador não suporte geolocalização, utiliz coordenadas padrão
        console.log("O navegador não suporta localização");
        let latitudePadrao = -25.643946; // coordenadas da cidade de Fazenda Rio Grande - PR
        let longitudePadrao = -49.312761;
        if (typeof callback === "function") {
            callback(latitudePadrao, longitudePadrao);
        }
    }
}


localizacao(function(lat, long){//inicia o mapa com a localização do usuario
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

                var rota = "<a href= https://www.google.com/maps/dir/" + lat + "," + long + "/" + point.lat + "," + point.lng + " target='_blank'" +">"+" Rotas"+"</a>";//define a formatação da rota, abre um link do google maps com a posição atual e o destino

                var descricao ="<b>"+ point.descricao + "</b>" + "<br> " + point.end +"<br>" + point.cidade + " - " + point.estado ;

                var telefone = "<br>Telefone: " + "<a href='tel:"+ point.tel1 + "'>"+ point.tel1+ "</a>" + " / " + "<a href='tel:"+ point.tel2 + "'>"+ point.tel2+ "</a>";

                var link ="<br> <a href= " + point.url + " target='_blank'" +">" +point.nomeLink + " </a>";
                var popup = L.popup().setContent(descricao + telefone + link + "|"+ rota); // Marcador com todos os dados
                marker.bindPopup(popup);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
        });
});
var clickExibir = 0;//nao foi clicado.


function exibirFormulario(){// função que exibe e oculta o formulario de contato
    var formulario = document.getElementById("formulario");
    var botao = document.getElementById("btFormulario");

        if (clickExibir == 0){
            formulario.style.display = "block";
            botao.textContent = "Ocultar Formulario";
            clickExibir = 1;

            
        } else {
            formulario.style.display = "none";
            botao.textContent = "Exibir Formulário";
            clickExibir =0;
        };

}
