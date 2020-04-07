class Slider {

    constructor() {
        this.slides = document.querySelectorAll(".item_slide");
        this.diapoContent = document.querySelector("#diapo_container");
        this.diapoTitle = document.querySelector("#title_slider");
        this.diapoTitleText = document.querySelector("h1");
        this.index = 0;
        this.displayShow();
        this.hideShowSlider();
        this.diapoContent.querySelector(".next")
            .addEventListener("click", () => {
                this.next();
            })

        this.diapoContent.querySelector(".prev")
            .addEventListener("click", () => {
                this.prev();
            })

        this.diapoContent.querySelector("#stop")
            .addEventListener("click", () => {
                this.stop();
            })

        this.diapoContent.querySelector("#play")
            .addEventListener("click", () => {
                if (this.intervalId == null) this.play()
            })

        this.play();

        // ############################
        // Contrôle avec les touches du clavier:
        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowRight":
                    this.next();
                    break;
                case "ArrowLeft":
                    this.prev();
                    break;
                case " ":
                    if (this.intervalId == null) {
                        this.play();
                    } else {
                        this.stop();
                    }
                    break;
            }
        });
    }
    // ############################

    removeLoader() {
        document.querySelector(".loader-div").style.opacity = "0";
        document.querySelector(".loader-div").style.pointerEvents = "none";
    }

    // Ne montrer que le slider actif via un index et masque les autres:
    displayShow() {
        for (var i = 0; i < this.slides.length; i++) {
            this.slides[i].style.display = "none";
        };
        this.slides[this.index].style.display = "block";
    }

    play() {
        this.intervalId = setInterval(() => {
            this.next();
        }, 5000);
    }

    next() {
        this.index++;

        // Si index trop grand -> au début
        if (this.index >= this.slides.length) {
            this.index = 0;
        };
        this.displayShow();
    }

    prev() {
        this.index--;

        // Si index trop petit -> à la fin
        if (this.index < 0) {
            this.index = this.slides.length - 1;
        };
        this.displayShow();
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }
    // ############################

    // Montrer ou masquer le diaporama:
    hideShowSlider() {

        this.diapoTitle.addEventListener("click", () => {
            let showS = this.diapoContent.className;
            
            if (showS == "diapo_hidden") {
                this.diapoContent.className = "diapo_active";
                this.diapoTitleText.textContent = "Comment ça marche ?";

                document.querySelector("#carte").style.height = "480px";
                document.getElementById("fa-sh-slider").style.transform = "rotateZ(0deg)";
                
            } else {

                this.diapoTitleText.textContent = "Afficher le guide";
                this.diapoContent.className = "diapo_hidden";
                document.querySelector("#carte").style.height = "690px";
                document.getElementById("fa-sh-slider").style.transform = "rotateZ(-90deg)";
                
                let intervalDisplay = setInterval(() => {
                    this.diapoContent.style.display = "none";
                }, 1000);
                clearInterval(intervalDisplay);
            }
        });
    }
}








