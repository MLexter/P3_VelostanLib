class SignatureCanvas {
    constructor() {
        this.canvasContainer = document.getElementById("container_canvas");
        this.canvasS = document.getElementById("canvas_signature");
        this.cancelBtn = document.getElementById("cancel-btn");
        this.confirmBtn = document.getElementById("confirm-btn");
        this.context = this.canvasS.getContext('2d');
        this.rect = this.canvasS.getBoundingClientRect();
        this.canvasS.canvasFilled = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.draw = false;
        this.bookedStation = false;

        this.resizeCanvas();
        this.cancelCanvasDiv();
        this.onConfirmBtn();
        this.styleCanvas();
        this.onMouseDown(event);
        this.onMouseMove(event);
        this.onMouseUp(event);
        this.onTouchStart();
        this.onTouchMove();
        this.clearSignature();
    }

    getRect() {
        this.rect = this.canvasS.getBoundingClientRect();
    }

    resizeCanvas() {
        window.addEventListener('resize', () => {
            this.rect = this.canvasS.getBoundingClientRect();
        })
    }

    clearInitCanvas() {
        this.context.clearRect(0, 0, this.canvasS.width, this.canvasS.height);
    }

    styleCanvas() {
        this.context.strokeStyle = "black";
        this.context.lineWidth = '3';
    }

    cancelCanvasDiv() {
        this.cancelBtn
            .addEventListener("click", function () {
                document.getElementById("container_canvas").style.opacity = "0";
                document.getElementById("container_canvas").style.pointerEvents = "none";
                document.getElementById("txt_booking").innerHTML = ``;
            });
    }

    // DESKTOP SETTINGS

    onMouseMove(event) {
        this.canvasS
            .addEventListener("mousemove", (event) => {
                event.preventDefault();
                if (this.draw) {

                    this.mouseX = event.clientX - this.rect.left;
                    this.mouseY = event.clientY - this.rect.top;
                    this.context.lineTo(this.mouseX, this.mouseY);
                    this.context.stroke();
                }
            }, false);
    }

    onMouseDown(event) {
        this.canvasS
            .addEventListener("mousedown", (event) => {
                this.getRect();
                document.getElementById("error_signature").textContent = "";
                this.canvasS.canvasFilled = true;
                this.draw = true;
                this.mouseX = event.clientX - this.rect.left;
                this.mouseY = event.clientY - this.rect.top;
                this.context.beginPath();
                this.context.moveTo(this.mouseX, this.mouseY);
            }, false);

    }

    onMouseUp(event) {
        this.canvasS
            .addEventListener("mouseup", (event) => {
                this.draw = false;
            }, false);
        this.canvasS.addEventListener('touchend', (event) => {
            this.canvasS.canvasFilled = true;
            this.draw = false;
        }, false);
    }

    // TABLET SETTINGS

    onTouchMove(event) {
        this.canvasS
            .addEventListener('touchmove', (event) => {
                if (this.draw) {
                    event.preventDefault();
                    this.mouseX = (event.targetTouches[0].clientX) - this.rect.left;
                    this.mouseY = (event.targetTouches[0].clientY) - this.rect.top;
                    this.context.lineTo(this.mouseX, this.mouseY);
                    this.context.stroke();
                }
            }, false);
    }

    onTouchStart(event) {
        this.canvasS
            .addEventListener('touchstart', (event) => {

                document.getElementById("error_signature").textContent = "";
                this.canvasS.canvasFilled = true;
                this.draw = true;
                this.mouseX = (event.targetTouches[0].clientX) - this.rect.left;
                this.mouseY = (event.targetTouches[0].clientY) - this.rect.top;
                this.context.beginPath();
                this.context.moveTo(this.mouseX, this.mouseY);

            }, false);
    }

    // #####################################


    clearSignature() {
        document.getElementById("reset-btn")
            .addEventListener("click", (event) => {
                this.context.clearRect(0, 0, this.canvasS.width, this.canvasS.height);
                this.draw = false;
                this.canvasS.canvasFilled = false;
            })
    }

    onConfirmBtn() {
        this.confirmBtn
            .addEventListener("click", () => {
                if (countdownTimer.compteur === true) {
                    countdownTimer.clearTimer();
                }

                if (this.canvasS.canvasFilled === true) {
                    this.scrollStatus();
                    myMap.rentedBike();
                    countdownTimer.clearTimer();
                    countdownTimer.startCountdown();

                    sessionStorage.setItem("address", bookingStation.hiddenAddress.value);
                    document.getElementById("container_canvas").style.opacity = "0";
                    document.getElementById("container_canvas").style.pointerEvents = "none";
                    document.getElementById("footer").style.height = "auto";
                } else {
                    document.getElementById("error_signature").textContent = "Veuillez signer votre réservation pour confirmer.";
                }
            });
    }

    scrollStatus() {
            let anchorStatus = document.querySelector("#scroll-anchor-status");
            anchorStatus.getAttribute("#status-anchor");
            anchorStatus.scrollIntoView({ behavior: 'smooth' });
            return anchorStatus;
    }
}

let userSignature = new SignatureCanvas();