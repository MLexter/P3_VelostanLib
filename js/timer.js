class Timer {
    constructor(compteur, min, sec) {

        this.compteur;
        this.min = "20";
        this.sec = "00";
        this.compteurDiv = document.getElementById("compteur");
    }


    startCountdown() {
        this.compteur = true;
        document.getElementById("txt_booking").innerHTML = `
                    <span id="fa-id">
                    <i class="fas fa-id-card"></i>
                    </span>
                    Vélo réservé au nom de <span class="idClient">${bookingStation.nom.value} ${bookingStation.prenom.value} </span> à la station située <span class="idClient">${bookingStation.hiddenAddress.value}</span>`;


        document.getElementById("cancel_resa_btn").style.display = "block";
        this.compteurDiv.style.display = "block";

        this.intervalRef = setInterval(() => {
            if (this.compteur === true) {
                this.sec--;

                if (this.sec < "10") {
                    this.sec = `0${this.sec}`;
                }
                if (this.sec < "00") {
                    this.sec = "59";
                    this.min--;
                }

                this.compteurDiv.innerHTML = `
                <span id="fa-chrono">
                    <i class="fas fa-stopwatch"></i>
                </span>
                Votre réservation expire dans <span id="colored-timer">${this.min}:${this.sec}</span>`;

                sessionStorage.setItem("min", this.min);
                sessionStorage.setItem("sec", this.sec);
            }


            if (this.min == "0" && this.sec == "00") {
                clearInterval(this.intervalRef);
                this.compteur = false;

                sessionStorage.removeItem("min");
                sessionStorage.removeItem("sec");
                sessionStorage.removeItem("address");

                myMap.returnedBike();
                localStorage.stationIndex = "";

                this.compteurDiv.style.display = "none";
                document.getElementById("cancel_resa_btn").style.display = "none";
                document.getElementById("txt_booking").innerHTML = `<span id="expired_text">Réservation expirée.</span> <br>
                Une nouvelle réservation est possible.`;

                let txtExpired = setTimeout(() => {
                    document.getElementById("txt_booking").innerHTML = ``;
                }, 5500);
                clearTimeout(this.txtExpired);
            }
        }, 1000);

        this.cancelTimer();
    }

    cancelTimer() {
        document.getElementById("cancel_resa_btn").addEventListener("click", (event) => {
            clearInterval(this.intervalRef);
            this.compteur = false;
            this.compteurDiv.style.display = "none";
            this.compteurDiv.innerHTML = ``;
            this.min = "20";
            this.sec = "00";
            document.getElementById("cancel_resa_btn").style.display = "none";
            document.getElementById("txt_booking").innerHTML = 'Votre réservation a bien été annulée.';
            myMap.returnedBike();
            let txtExpired1 = setTimeout(() => {
                document.getElementById("txt_booking").innerHTML = ``;
            }, 2500);
            clearTimeout(this.txtExpired);

            sessionStorage.clear();
        });
    }

    clearTimer() {
        clearInterval(this.intervalRef);

        this.compteur = false;
        this.compteurDiv.style.display = "none";
        this.compteurDiv.innerHTML = ``;
        this.min = "20";
        this.sec = "00";
        document.getElementById("cancel_resa_btn").style.display = "none";

        sessionStorage.clear();
    }
}

let countdownTimer = new Timer(false, this.min, this.sec);