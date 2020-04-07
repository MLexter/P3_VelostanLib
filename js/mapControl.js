// ###############################################################################################
// ########## INITIALISATION DES PARAMETRES AU LANCEMENT DE LA PAGE ##############################
// ###############################################################################################


window.addEventListener('DOMContentLoaded', () => {
    const diapo = new Slider();
    myMap.initMap();
    myMap.manageData();
    diapo.removeLoader();

    if (localStorage != undefined) {
        document.getElementById("nom").value = localStorage.getItem("nom");
        document.getElementById("prenom").value = localStorage.getItem("prenom");
    }

    if (sessionStorage.address != undefined) {
        document.getElementById("txt_booking").style.display = "block";
        document.getElementById("hiddenAddress").value = sessionStorage.getItem("address");
        countdownTimer.min = sessionStorage.getItem("min");
        countdownTimer.sec = sessionStorage.getItem("sec");
        bookingStation.storedMsg();

        // Si une réservation est en cours, récupère index de la station pour décrémenter le tableau JSON:
        let bikeIndex = localStorage.getItem("stationIndex");
        let delayLoad = setTimeout(() => {
            myMap.stations[bikeIndex].availableBikes = myMap.stations[bikeIndex].availableBikes - 1;
        }, 1500);
        // ###############################################################################################
    }
});


class MapControl {

    constructor(displayMap) {
        this.api_url_opendata = "https://api.jcdecaux.com/vls/v1/stations?contract=nancy&apiKey=92c70619b0bdbe7a0d607c5cf53f7ea79dbe61c5";
        this.displayMap = displayMap;
        this.stations = [];
        this.i = 0;
    }

    initMap() {

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoibWxleHRlciIsImEiOiJjanhuYXU0YjEwN3l4M21udnJtN3BvZzV2In0.Llyitp6IPtCXHkgLppkYEA'
        }).addTo(this.displayMap);
    }

    manageData() {
        ajaxGet(this.api_url_opendata, (reponse) => {
            let stationsElt = JSON.parse(reponse);
            this.stations = stationsElt.map(station => {
                return new Stations(
                    station.name.slice(8),
                    station.address,
                    station.available_bikes,
                    station.bike_stands,
                    station.available_bike_stands,
                    station.status,
                    station.position,
                )
            });

            // Créé un marqueur pour chaque station:
            let i = 0;
            this.stations.forEach((station) => {
                station.index = i;
                i++;
                this.createMarker(station);
            });
        })
    }

    createMarker(station) {

        let Lmarker = L.marker([station.position.lat, station.position.lng], { icon: this.getMarkerColor(station) }, { station })
            .on("click", () => {

                this.i = station.index;
                station.displayInfos();


                // Permet l'animation au clic du marker:
                let markerLF = document.querySelectorAll(".leaflet-marker-icon.float");
                if (markerLF.length > 0) {
                    markerLF[0].classList.remove("float");
                }
                Lmarker._icon.classList.add("float");
                document.querySelectorAll(".leaflet-marker-icon.float")[0].style.animation = "float 1.2s ease-in-out";
                //#######################################################

                // Si la résolution le permet, scroll vers la div #infos:
                let anchor = document.querySelector("#mq-scrolldown-anchor");
                anchor.getAttribute("#click-station-display");
                anchor.scrollIntoView({ behavior: 'smooth' });
                //#######################################################

                setTimeout((markerLF) => {
                    document.querySelectorAll(".leaflet-marker-icon.float")[0].style.animation = "none";
                    clearTimeout(markerLF);
                }, 3500)
            })
            .addTo(this.displayMap)
            .bindPopup(station.name);
    }

    rentedBike() {
        this.stations[this.i].availableBikes = this.stations[this.i].availableBikes - 1;
        localStorage.setItem("stationIndex", this.i);
    }

    returnedBike() {
        this.stations[this.i].availableBikes = this.stations[this.i].availableBikes + 1;
        localStorage.stationIndex = "";
    }

    getMarkerColor(station) {

        // Définition des markers en vert par défaut:
        let pinMarker = '../images/markers/green-cycling.png';
        let pinSize = [35, 41];


        // Choix de la couleur du marqueur en fonction de l'état de la station:
        if (station.availableBikes > 5) {
            pinMarker = '../images/markers/green-cycling.png';
        }

        if (station.availableBikes >= 1 && station.availableBikes <= 4) {
            pinMarker = '../images/markers/orange-cycling.png';
        }

        if (station.availableBikes == 0) {
            pinMarker = '../images/markers/red-cycling.png';
        }

        if (station.status != "OPEN") {
            pinMarker = '../images/markers/closed.png';
        }


        // Retourne le bon chemin vers l'image du marker
        return new L.Icon({
            iconUrl: pinMarker,
            iconSize: pinSize,
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
    }
}

// Coordonnées d'affichage initial:
const config = {
    latLng: [48.6924654552072, 6.182],
    zoom: 15.2
};
//#######################################################

const mymap = L.map('carte').setView(config.latLng, config.zoom);
const myMap = new MapControl(mymap);