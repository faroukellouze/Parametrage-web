const url_base = "http://127.0.0.1:9000/api";
Tables = [];
CORE.create_module("mainMenu", function (sb) {
    let div_menu;
    let liste_menu;
    let main;
    let url_menu = "templatesMenu";

    return {
        objectMenu: null,
        init: function () {
            NodeList.prototype.forEach = Array.prototype.forEach;
            sb.jsonSchemaValidationInit();
            abr = sessionStorage.getItem("langue");
            if (abr === "ar") {
                document.getElementsByTagName("body")[0].style.direction = "rtl";
                let url = "css/files/AR.css";
                let head = document.getElementsByTagName("head")[0];
                let link = document.createElement("link");
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = url;
                head.appendChild(link);
            } else
                document.getElementsByTagName("body")[0].style.direction = "ltr";

            objectMenu = this;
            CORE.start("Tabs");

            div_menu = document.getElementById("listModules");
            main = document.getElementsByClassName("main")[0];
            div_royal = document.getElementsByClassName(sb.correspondence("tabs"))[0];
            tabs_nav = document.getElementsByClassName(sb.correspondence("tabs-nav"))[0];

            document.addEventListener('click', function (e) {
                if (e.target.classList.contains("close-asidebar") || e.target.parentElement.classList.contains("close-asidebar")) {
                    sb.hideSideBar();
                }
            });

            sb.listen({
                "charger_page": this.charger_page
            });

            objectMenu.charger_menu(url_menu);
        },
        destroy: function () {
            div_menu = liste_menu = null;
        },
        charger_page: function (data) {
            let XHRObject = sb.XHRObject(sb);
            XHRObject.url = data.url;
            XHRObject.traitement_succes = function (XHRresponse) {
                let response = XHRresponse;
                if (response) {
                    data.element.innerHTML = response;
                    data.element.setAttribute("source", data.url);
                    window.history.pushState(null, null, data.url);
                    setTimeout(function () {
                        let scripts = data.element.getElementsByTagName("script");
                        for (let i = 0; i < scripts.length; i++) {
                            let head = document.getElementsByTagName("head")[0];
                            let script = document.createElement("script");
                            script.type = "text/javascript";
                            script.src = scripts[i].getAttribute("src");
                            head.appendChild(script);
                        }

                        let activeView = document.querySelectorAll(".views div.active")[0];
                        let oldAside = activeView.getElementsByTagName("aside")[0];
                        if (oldAside !== undefined)
                            oldAside.remove();

                        let aside = document.createElement("aside");
                        aside.classList.add("animated");
                        aside.classList.add("slideInRight");
                        aside.style.display = "none";
                        aside.innerHTML = '';
                        activeView.appendChild(aside);
                    }, 350);
                }
            };

            let xhr = sb.openXhr(XHRObject);
            xhr.send();
        },
        charger_menu: function (url_menu) {
            let XHRObject = sb.XHRObject(sb);
            XHRObject.url = url_menu;
            XHRObject.traitement_succes = function (XHRresponse) {
                let response = XHRresponse;
                if (response) {
                    div_menu.innerHTML = response;
                    objectMenu.affecter_click();
                }
            };

            let xhr = sb.openXhr(XHRObject);
            xhr.send();
        },
        affecter_click: function () {
            document.getElementsByTagName("body")[0].addEventListener("click", function (e) {
                if (e.target.classList.contains("link"))
                    objectMenu.click_menu(e.target);
            });
        },
        click_menu: function (e) {
            main.classList.remove('withNotTabs');
            main.classList.add('withTabs');
            if (tabs_api === null) {
                sb.notify({
                    type: 'initializeRoyaTabl',
                    data: div_royal
                });

                sb.notify({
                    type: 'addPlusMenu'
                });
            }

            if (div_royal.querySelectorAll("#tabs #" + e.id).length === 0) {
                let traitement = function () {
                    sb.notify({
                        type: 'addMenu',
                        data: e
                    });
                };

                sb.hideSideBar(traitement);
            } else {
                sb.notify({
                    type: "showMessage",
                    data: {
                        title: "Avertissement",
                        numMsg: 4,
                        typeMsg: "error",
                        delai: 5000
                    }
                });
            }
        }
    };
});

CORE.start("mainMenu");
