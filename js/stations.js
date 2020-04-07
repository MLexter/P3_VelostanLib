class Stations {
    constructor(name, address, availableBikes, bikeStands, availableBikeStands, status, position) {
        this.name = name,
        this.address = address,
        this.availableBikes = availableBikes;
        this.bikeStands = bikeStands,
        this.availableBikeStands = availableBikeStands;
        this.status = status;
        this.position = position;
    }

    // Affiche les infos de la station au clic:
    displayInfos() {
        let infos = document.getElementById("txt_info");
        document.getElementById("markers-color").style.display = "none";
        infos.style.display = "block";
        infos.innerHTML = `
        <span id="info_box">
            <div class="fa_icon-info">
            <i class="fas fa-map-marked-alt"></i>

                <span class="txt_station">
               NOM DE LA STATION: </span><p class="val_station">${this.name}</p>
            </div>
            <div class="fa_icon-info">
            <i class="fas fa-map-signs"></i>
                <span class="txt_station">
                ADRESSE: </span><p class="val_station">${this.address}</p>
            </div>
            <div class="fa_icon-info">
                <i class="fas fa-bicycle"></i>
                <span class="txt_station">
                VELOS DISPONIBLES : </span><span id="val_bikes">${this.availableBikes} / ${this.bikeStands}</span>
            </div>
            <br>
                <p id="dispo"></p>
            
            <div id="reserver">
                <div id="fa-hand">
                    <i class="fas fa-hand-point-right"></i>       
                Réserver
                </div>
            </div>
        </span>
        `;

        let dispoBox = document.getElementById("dispo");
        let containerForm = document.getElementById("container_form");
        let shContainer;


        // Ecouteur qui masque ou fait apparaitre le formulaire: + attribution de l'adresse:
        document.getElementById("reserver")
            .addEventListener("click", () => {
                shContainer = containerForm.className;
                document.getElementById("station_infos").style.alignItems = "none";
                document.getElementById("hiddenAddress").value = this.address;

                if (shContainer == "container_active") {
                    containerForm.className = "container_hidden";
                    document.getElementById("station_infos").style.height = "89%";
                } else if (shContainer == "container_hidden") {
                    containerForm.className = "container_active";
                    document.getElementById("station_infos").style.height = "65%";
                }
            })

        // Affiche un message lorsqu'il y a peu ou pas de vélos à la station:
        if (this.availableBikes == 0) {
            shContainer = containerForm.className;
            if (shContainer == "container_active") {
                containerForm.className = "container_hidden";
            }

            document.getElementById("dispo").style.marginTop = "15px";
            document.getElementById("station_infos").style.height = "89%";
            document.getElementById("val_bikes").style.color = "red";
            document.getElementById("reserver").style.display = "none";
            dispoBox.innerHTML = `
        <span id="fa_empty">
        <i class="fas fa-times-circle"></i>
        </span>       
            Cette station n'a plus de vélos disponibles !
            `
        }

        else if (this.availableBikes > 0 && this.availableBikes <= 4) {
            document.getElementById("val_bikes").style.color = "#eb9800";
            dispoBox.innerHTML = `
            <span id="fa_info">
                <i class="fas fa-exclamation-circle"></i>
                Plus que ${this.availableBikes} vélo(s) à cette station.
            </span>       
                    `
        }

        else if (this.availableBikes > 4) {
            document.getElementById("val_bikes").style.color = "#17b74f";
        }
        else if (this.status != "OPEN") {
            document.getElementById("reserver").style.display = "none";
            dispoBox.innerHTML = `
            <span id="fa_maintenance">
                <i class="fas fa-snowplow"></i>
                Cette station est en maintenance.<br>
                    La réservation n'est pas permise.
            </span>            
            `
        } else {
            dispoBox.style.display = "none";
        }
    }
}