CORE.create_module("authentification-box", function (sb) {
    let username, password, validate;
    let url_authentification = "json/authentification.json";
    let url_menu = "/Parametrage/menu";

    return {
        object: null,
        init: function () {
            object = this;
            NodeList.prototype.forEach = Array.prototype.forEach;

            username = document.getElementById("username");
            password = document.getElementById("password");
            validate = document.getElementById("submit");

            username.focus();
            validate.addEventListener("click", this.validerAuthentification, false);
            document.addEventListener("keypress", function (e) {
                let key = e.keyCode || e.which;
                if (key === 13)
                    object.validerAuthentification();
            });

            object.langue();

            document.getElementById("liste_langue").addEventListener("click", function (e) {
                let imgElement = e.target.querySelectorAll("img")[0];
                let abr = imgElement.getAttribute("abr");

                sessionStorage.setItem("langue", abr);
                if (abr === "fr")
                    sessionStorage.setItem("langue_index", 0);
                else if (abr === "en")
                    sessionStorage.setItem("langue_index", 1);
                else if (abr === "ar")
                    sessionStorage.setItem("langue_index", 2);

                window.location.href = window.location.origin + window.location.pathname + "?lang=" + abr;
            });
        },
        destroy: function () {
            username = password = validate = null;
        },
        /**
         * Affecter langue de l'application (FR par défaut si aucune langue trouvée dans la session
         */
        langue: function () {
            let lang = sessionStorage.getItem("langue");
            let element;
            if (lang !== null) {
                element = document.querySelectorAll("#liste_langue > li[lang=" + lang + "]")[0];
                element.classList.add("active");
            } else {
                element = document.querySelectorAll("#liste_langue > li[lang=fr]")[0];
                element.classList.add("active");
                sessionStorage.setItem("langue", "fr");
                sessionStorage.setItem("langue_index", 0);
            }

            let imgElement = element.querySelectorAll("img")[0];
            let abr = imgElement.getAttribute("abr");
            let class_img = imgElement.getAttribute("class");
            let alt = imgElement.getAttribute("alt");

            let langue_en_cours = document.getElementById("langue_en_cours");
            langue_en_cours.setAttribute("class", class_img);
            langue_en_cours.setAttribute("alt", alt);
            langue_en_cours.setAttribute("abr", abr);
            langue_en_cours.parentElement.querySelectorAll("span")[0].innerHTML = abr;
        },
        /**
         * Valider champs authentification
         */
        validerAuthentification: function () {
            let data = {};
            data["user"] = username.value;
            data["pass"] = password.value;

            if (data.user && data.pass) {
                object.authenticate(data);
            } else
                alert("champs manquants !");
        },
        /**
         * Effectuer l'authentification
         * @param data contient le nom d'utilisateur et le password saisis
         * @example
         * data = {
             user = "",
             pass= "",
             };
         */
        authenticate: function (data) {
            let XHRObject = sb.XHRObject(sb);
            XHRObject.url = url_authentification;
            XHRObject.traitement_succes = function (XHRresponse) {
                response = JSON.parse(XHRresponse);
                if (data.user === response[0].user && data.pass === response[0].pass) {
                    if (document.querySelectorAll("input[type='checkbox']")[0].checked)
                        window.localStorage.setItem('login', user);
                    else
                        window.localStorage.removeItem('login');

                    window.location.href = url_menu;
                } else {
                    username.value = "";
                    password.value = "";

                    sb.notify({
                        type: "showMessage",
                        data: {
                            title: "Avertissement",
                            numMsg: 1,
                            typeMsg: "error",
                            delai: 5000
                        }
                    });
                }
            };

            let xhr = sb.openXhr(XHRObject);
            xhr.send();
        }
    };
});

CORE.start("authentification-box");