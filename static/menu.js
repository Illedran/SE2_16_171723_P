(function () {
    "use strict";

    var primi = document.getElementsByClassName("primo");
    var secondi = document.getElementsByClassName("secondo");
    var contorni = document.getElementsByClassName("contorno");
    var desserts = document.getElementsByClassName("dessert");

    var select_pasto = function () {
        var is_selected = this.classList.contains("selected");
        if (this.classList.contains("primo")) {
            for (var i = 0; i < primi.length; i++) {
                primi[i].classList.remove("selected");
            }
        }
        if (this.classList.contains("secondo")) {
            for (var i = 0; i < secondi.length; i++) {
                secondi[i].classList.remove("selected");
            }
        }
        if (this.classList.contains("contorno")) {
            for (var i = 0; i < contorni.length; i++) {
                contorni[i].classList.remove("selected");
            }
        }
        if (this.classList.contains("dessert")) {
            for (var i = 0; i < desserts.length; i++) {
                desserts[i].classList.remove("selected");
            }
        }


        if (is_selected) {
            this.classList.remove("selected");
        } else {
            this.classList.add("selected");
        }
    };

    for (var i = 0; i < primi.length; i++) {
        primi[i].addEventListener('click', select_pasto, false);
    }
    for (var i = 0; i < secondi.length; i++) {
        secondi[i].addEventListener('click', select_pasto, false);
    }
    for (var i = 0; i < contorni.length; i++) {
        contorni[i].addEventListener('click', select_pasto, false);
    }
    for (var i = 0; i < desserts.length; i++) {
        desserts[i].addEventListener('click', select_pasto, false);
    }

    var errConferma = document.getElementById("conferma-label");
    var conferma = document.getElementById("conferma-ordine");
    conferma.addEventListener("click", function () {
        errConferma.innerHTML = "";
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/conferma-ordine", true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        var data = {"pasti": []};
        var selezionati = document.getElementsByClassName("selected");
        if (selezionati.length === 0) {
            errConferma.innerHTML = "Seleziona almeno una pietanza."
        } else {
            for (var i = 0; i < selezionati.length; i++) {
                data.pasti.push(parseInt(selezionati[i].id));
            }
            // send the collected data as JSON
            xhr.send(JSON.stringify(data));

            xhr.onloadend = function () {
                window.location.href = "/riepilogo"
            }
        }
    }, false);
}());