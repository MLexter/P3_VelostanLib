class FormResa {
    constructor(nom, prenom, hiddenAddress) {
        this.nom = document.getElementById("nom");
        this.prenom = document.getElementById("prenom");
        this.hiddenAddress = document.getElementById("hiddenAddress");
        this.confirmCancelBox = document.getElementById("container_confirm_cancel");
        this.sendForm();
    }


    storedMsg() {
        if (sessionStorage.getItem("min") != "20") {
            document.getElementById("txt_booking").innerHTML = `
            <span id="fa-id">
                <i class="fas fa-id-card"></i>
            </span>
                    Vélo réservé au nom de <span class="idClient">${localStorage.getItem("nom")} ${localStorage.getItem("prenom")}</span> à la station située <span class="idClient">${sessionStorage.getItem("address")}</span>`;
            document.getElementById("compteur").innerHTML = `Cette réservation expire dans ${sessionStorage.getItem("min")}:${sessionStorage.getItem("sec")}`;
            countdownTimer.startCountdown();
        } else {
            document.getElementById("compteur").innerHTML = ``;
        }
    }

    sendForm() {
        document.getElementById("booking1").addEventListener("submit", (e) => {
            let error;
            let inputs = document.getElementsByTagName("input");

            // Vérification du remplissage des champs:
            for (let i = 0; i < inputs.length; i++) {
                if (!inputs[i].value) {
                    error = "Veuillez renseigner tous les champs."
                }
            }

            // Si une erreur est détectée, l'affiche:
            if (error) {
                e.preventDefault();
                document.getElementById("error").innerHTML = error;
                return;
            }

            // Si les valeurs existent, prévient l'utilisateur:
            if (this.nom.value === localStorage.getItem("nom") && this.prenom.value === localStorage.getItem("prenom") && countdownTimer.compteur === true) {

                document.getElementById("error").textContent = `Une réservation est déjà en cours pour ${this.nom.value} ${this.prenom.value}.`;

                // Si ce sont de nouvelles valeurs, demande de confirmation pour annuler la réservation en cours:
            } else if (sessionStorage.getItem("min")) {
                e.preventDefault();

                document.getElementById("container_confirm_cancel").style.opacity = "1";
                document.getElementById("container_confirm_cancel").style.pointerEvents = "auto";

                this.cancelClick();
                this.confirmClick();

            } else {

                // Si les valeurs n'existent pas, les créent:
                e.preventDefault();
                userSignature.getRect();
                userSignature.clearInitCanvas();

                localStorage.setItem("nom", this.nom.value);
                localStorage.setItem("prenom", this.prenom.value);

                document.getElementById("txt_booking").innerHTML = `Réservation en cours...`;
                document.getElementById("error").innerHTML = "";
                document.getElementById("container_canvas").style.opacity = "1";
                document.getElementById("container_canvas").style.pointerEvents = "auto";
            }
            e.preventDefault();
        });
    }

    confirmClick() {
        document.getElementById("confirm").addEventListener("click", () => {
            countdownTimer.clearTimer();

            document.getElementById("container_confirm_cancel").style.opacity = "0";
            document.getElementById("container_confirm_cancel").style.pointerEvents = "none";
            document.getElementById("txt_booking").innerHTML = `Réservation en cours...`;
            document.getElementById("error").innerHTML = "";
            document.getElementById("container_canvas").style.opacity = "1";
            document.getElementById("container_canvas").style.pointerEvents = "auto";

            localStorage.setItem("nom", this.nom.value);
            localStorage.setItem("prenom", this.prenom.value);

            let userSignature = new SignatureCanvas();
            userSignature.clearInitCanvas();
            userSignature.getRect();
        })
    }

    cancelClick() {
        document.getElementById("cancel").addEventListener("click", () => {
            document.getElementById("container_confirm_cancel").style.opacity = "0";
            document.getElementById("container_confirm_cancel").style.pointerEvents = "none";
        })
    }
}

let bookingStation = new FormResa(this.nom, this.prenom, this.hiddenAddress);



