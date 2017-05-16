let CORE = (function () {
    let moduleData = {},
            to_s = function (anything) {
                return Object.prototype.toString.call(anything);
            },
            debug = true;

    return {
        debug: function (on) {
            debug = on ? true : false;
        },
        create_module: function (moduleID, creator) {
            let temp;
            if (typeof moduleID === 'string' && typeof creator === 'function') {
                temp = creator(Sandbox.create(this, moduleID));
                if (temp.init && typeof temp.init === 'function' && temp.destroy && typeof temp.destroy === 'function') {
                    temp = null;
                    moduleData[moduleID] = {
                        create: creator,
                        instance: null
                    };
                } else {
                    this.log(1, "Module '" + moduleID + "' Registration : FAILED : instance has no init or destory functions");
                }
            } else {
                this.log(1, "Module '" + moduleID + "' Registration : FAILED : one or more arguments are of incorrect type");
            }
        },
        start: function (moduleID) {
            let mod = moduleData[moduleID];
            if (mod) {
                mod.instance = mod.create(Sandbox.create(this, moduleID));
                mod.instance.init();
            }
        },
        registerEvents: function (evts, mod) {
            if (this.is_obj(evts) && mod) {
                if (moduleData[mod]) {
                    moduleData[mod].events = evts;
                } else {
                    this.log(1, "");
                }
            } else {
                this.log(1, "");
            }
        },
        triggerEvent: function (evt) {
            let mod;
            for (mod in moduleData) {
                if (moduleData.hasOwnProperty(mod)) {
                    mod = moduleData[mod];
                    if (mod.events && mod.events[evt.type]) {
                        mod.events[evt.type](evt.data);
                    }
                }
            }
        },
        log: function (severity, message) {
            if (debug) {
                console[(severity === 1) ? 'log' : (severity === 2) ? 'warn' : 'error'](message);
            } else {
                // send to the server
            }
        },
        dom: {
            eventStore: {},
            bind: function (element, evt, fn) {
                if (element && evt) {
                    if (typeof evt === 'function') {
                        fn = evt;
                        evt = 'click';
                    }
                    if (element.length) {
                        let i = 0, len = element.length;
                        for (; i < len; ) {
                            this.eventStore[element[i] + evt + fn] = dojo.connect(element[i], evt, element[i], fn);
                            i++;
                        }
                    } else {
                        this.eventStore[element + evt + fn] = dojo.connect(element, evt, element, fn);
                    }
                }
            },
            unbind: function (element, evt, fn) {
                if (element && evt) {
                    if (typeof evt === 'function') {
                        fn = evt;
                        evt = 'click';
                    }
                    if (element.length) {
                        let i = 0, len = element.length;
                        for (; i < len; ) {
                            dojo.disconnect(this.eventStore[element[i] + evt + fn]);
                            delete this.eventStore[element[i] + evt + fn];
                            i++;
                        }
                    } else {
                        dojo.disconnect(this.eventStore[element + evt + fn]);
                        delete this.eventStore[element + evt + fn];
                    }
                }
            },
            create: function (el) {
                return document.createElement(el);
            }
        },
        is_obj: function (obj) {
            return obj !== null && typeof obj === 'object';
        },
        open_xhr: function (data) {
            let xhr = new XMLHttpRequest();
            xhr.open(data.method, data.url, data.async);
            xhr.setRequestHeader("Accept-Language", sessionStorage.getItem("langue"));

            xhr.addEventListener('readystatechange', function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200 || xhr.status === 201 || xhr.status === 204) {
                        if (data.traitement_succes !== undefined)
                            data.traitement_succes(xhr.response);
                    } else {
                        if (data.traitement_fail !== undefined)
                            data.traitement_fail(xhr.response);
                    }
                }
            });

            if (data.method.toLowerCase() === "post")
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            if (data.method.toLowerCase() === "put")
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

            return xhr;
        },
        showNotification: function (data) {
            let color, icon, sound, index;
            let langue = sessionStorage.getItem("langue").toLowerCase();
            let divSmallBoxes = document.getElementById("divSmallBoxes");
            if (divSmallBoxes !== null)
                divSmallBoxes.innerHTML = "";

            let SmallBoxanimated = document.getElementsByClassName("SmallBox animated");
            if (SmallBoxanimated !== null)
                SmallBoxanimated.innerHTML = null;

            if (data.typeMsg === "error") {
                color = "#a90329";
                icon = "fa fa-times-circle fa-2x bounce animated";
                sound = "voice_alert";
            } else if (data.typeMsg === "notification") {
                color = "#296191";
                icon = "fa fa-thumbs-up fa-2x bounce animated";
                sound = "bigbox";
            } else {
                color = "#296191";
                icon = "fa fa-thumbs-up fa-2x bounce animated";
                sound = "bigbox";
                window.parent.$(".SmallBox.animated").remove();
            }

            if (langue === "fr") {
                index = 0;

                if (data.typeMsg === "error")
                    data.title = "Attention";
                else if (data.typeMsg === "notification")
                    data.title = "Attention";
                else
                    data.title = "Succès";
            } else if (langue === "en") {
                index = 1;

                if (data.typeMsg === "error")
                    data.title = "Attention";
                else if (data.typeMsg === "notification")
                    data.title = "Attention";
                else
                    data.title = "Succes";
            } else if (langue === "ar") {
                index = 2;

                if (data.typeMsg === "error")
                    data.title = "تحذير";
                else if (data.typeMsg === "notification")
                    data.title = "تحذير";
                else
                    data.title = "نجاح";
            }

            $.sound_path = "sound/";
            $.sound_on = true;

            if (data.delai === 0) {
                $.smallBox({
                    title: data.title,
                    content: data.msg,
                    color: color,
                    iconSmall: icon,
                    sound_file: sound
                });
            } else {
                $.smallBox({
                    title: data.title,
                    content: data.msg,
                    color: color,
                    iconSmall: icon,
                    timeout: data.delai,
                    sound_file: sound
                });
            }

            if (langue === "ar") {
                let width = $(window).width() - 500;
                window.parent.$(".SmallBox").css("right", width + "px").css("direction", "ltr");
            }
        },
        showSideBar: function (codeHTML, widthModal, title, callback) {
            let activeView = document.querySelectorAll(".views div.active")[0];
            let sideBar = activeView.getElementsByTagName("aside")[0];
            sideBar.innerHTML = codeHTML;
            sideBar.style.width = widthModal;
            $(".views").find(".active").find("aside").show();
            sideBar.querySelector("h3").innerHTML = title;

            let scripts = sideBar.getElementsByTagName("script");
            for (let i = 0; i < scripts.length; i++) {
                let script = document.createElement("script");
                script.type = "text/javascript";
                if (scripts[i].getAttribute("src") !== null)
                    script.src = scripts[i].getAttribute("src");
                else
                    script.text = scripts[i].outerText;
                activeView.appendChild(script);
            }

            setTimeout(function () {
                callback();
            }, 300);
        },
        addErreur: function (el) {
            let tagName = 'section';
            while (el && el.parentNode) {
                el = el.parentNode;
                if (el.tagName && el.tagName.toLowerCase() === tagName) {
                    el.classList.add("erreur");
                    el.addEventListener("click", function () {
                        el.classList.remove("erreur");
                    }, true);
                    return true;
                }
            }
            return null;
        },
        hideSideBar: function (traitement) {
            let activeView = document.querySelectorAll(".views div.active")[0];
            let form = activeView.querySelectorAll("aside form")[0];
            if (form === undefined) {
                if (traitement !== undefined)
                    traitement();

                $(".views").find(".active").find("aside").empty().hide();
                return false;
            }

            form = form.id;
            let changed = CORE.FormChanges(form);
            // if (changed.length > 0) {
            //     let title = ["Confirmation", "Confirmation", "إثبات"];
            //     let message = ["Toutes vos modifications vont être supprimées ! <br>Voulez vous fermer quand même ?", "All your changes will be deleted! <br> Want to close anyway?", "كل التغييرات سيتم حذف! <BR> تريد إغلاقه على أية حال؟"];
            //     let Nonfermer = ["Ne pas fermer", "Do not close", "لا تغلق"];
            //     let fermer = ["Fermer", "Close", "أغلق"];
            //     bootbox.dialog({
            //         message: message[CORE.getLanguageIndex()],
            //         title: title[CORE.getLanguageIndex()],
            //         buttons: {
            //             success: {
            //                 label: Nonfermer[CORE.getLanguageIndex()],
            //                 className: "btn-success",
            //                 callback: function () {
            //                     bootbox.hideAll();
            //                 }
            //             },
            //             danger: {
            //                 label: fermer[CORE.getLanguageIndex()],
            //                 className: "btn-danger",
            //                 callback: function () {
            //                     bootbox.hideAll();
            //                     $("aside").empty().hide();
            //                     if (traitement !== undefined)
            //                         traitement();
            //                 }
            //             }
            //         }
            //     });
            // } else
            // $(".views").find(".active").find("aside").empty().hide();

            let tables = $(".views").find(".active").find("aside .dataTables_wrapper ");
            for (const table of tables) {
                Tables[table.id.replace("_wrapper", "")] = null;
            }

            $(".views").find(".active").find("aside").empty().hide();
        },
        /**
         * L'objet à préparer pour créer SelectCsys
         * @example
         * obj = {
         element: "",
         response: [],
         columns: [],
         champs: [],
         multSelect: false,
         searchVisibility: true,
         width: "auto",
         boutonAjoutRapide: true,
         champsSelection: "",
         ajoutRapide: function () {}
         }
         */
        selectObject: function () {
            return data_testSelect = {
                element: "",
                response: [],
                columns: [],
                champs: [],
                multSelect: false,
                searchVisibility: true,
                width: "auto",
                boutonAjoutRapide: true,
                champsSelection: "",
                ajoutRapide: function () {
                },
                elementSelected: function () {
                }
            };
        },
        /**
         * L'objet à préparer pour créer DataTables
         * @example
         * obj = {
         table: "",
         data: [],
         columns: [],
         detailColumns: [],
         autoWidthSince: false,
         order: [],
         pagination: false,
         pageLength: 20,
         colReorder: true,
         group: false,
         edition: true,
         info: true,
         details_ligne: true,
         buttonVisibility: true,
         searching: true,
         filtreColonne: false
         }
         */
        dataTablesObject: function () {
            return data_dataTables = {
                table: "",
                data: [],
                columns: [],
                detailColumns: [],
                autoWidthSince: false,
                order: [],
                pagination: false,
                pageLength: 20,
                colReorder: true,
                group: false,
                edition: true,
                info: true,
                details_ligne: true,
                buttonVisibility: true,
                searching: true,
                filtreColonne: false
            };
        },
        /**
         * L'objet à préparer et passer à XMLHttpRequest()
         * @param sb l'instance de sandbox
         * @example
         * obj = {
         url: "",
         method: "GET",
         data: {},
         async: true,
         traitement_succes: function () {},
         traitement_fail: function () {
         sb.notify({
         type: "showMessage",
         data: {
         title: "Avertissement",
         numMsg: 2,
         typeMsg: "error",
         delai: 5000
         }
         });
         }
         };
         */
        XHRObject: function (sb) {
            return obj = {
                url: "",
                method: "GET",
                data: {},
                async: true,
                traitement_succes: function () {
                },
                traitement_fail: function () {
                    sb.notify({
                        type: "showMessage",
                        data: {
                            title: "Avertissement",
                            numMsg: 2,
                            typeMsg: "error",
                            delai: 5000
                        }
                    });
                }
            };
        },
        /**
         * Retourne la langue en cours à partir de la session
         * 0 si FR
         * 1 si EN
         * 2 si AR
         */
        getLanguageIndex: function () {
            return sessionStorage.getItem("langue_index");
        },
        /**
         * Afficher les variables boolean du dataTables avec le style
         * @param {boolean} data donnée à afficher (true/false)
         * @param {string} type "display"
         * @param {boolean} edition case à cocher modifiable ou non (true/false)
         * @returns {string} le code HTML qui sert à dessiner la case à cocher
         */
        render_dataTables_boolean: function (data, type, edition) {
            let disabled = 'disabled';
            if (edition === true)
                disabled = '';

            let codeHTML = '<div class="smart-form"><label class="checkbox">';
            if (type === 'display' && data === true) {
                codeHTML += '<input type="checkbox" name="checkbox" checked ' + disabled + '><i></i></label></div>';
            } else if (type === 'display' && data === false) {
                codeHTML += '<input type="checkbox" name="checkbox" ' + disabled + '><i></i></label></div>';
            }
            return codeHTML;
        },
        render_dataTables_Select: function (data, data_Select, sb) {
            let random = new Date().getTime();
            return "<div id='Select" + random + "'>" + random + "</div>";
        },
        /**
         * Vérifier si l'objet contient le mot à chercher
         * @param {object} obj l'objet à itérer
         * @param {string} search le mot à chercher
         * @returns {boolean}
         */
        iterateObject: function (obj, search) {
            return Object.values(obj).some(function (el) {
                if (el === null)
                    return false;

                if (typeof el === "string")
                    return el.toLowerCase().indexOf(search) > -1;
                else if (typeof el === "object")
                    return CORE.iterateObject(el, search);
                else if (typeof el === "boolean")
                    return el.toString().indexOf(search) > -1;
                else
                    return false;
            });
        },
        /**
         * Vérifier si la liste contient un objet donnée
         * @param {object} obj l'objet à trouver
         * @param {array} array la liste à filtrer
         */
        checkObjectInArray: function (obj, array) {
            return _.find(array, function (item) {
                return _.isEqual(item, obj);
            });
        },
        FormChanges: function (form) {
            // get form
            if (typeof form === "string")
                form = document.getElementById(form);
            if (!form || !form.nodeName || form.nodeName.toLowerCase() !== "form")
                return null;

            // find changed elements
            let changed = [], n, c, def, o, ol, opt;
            for (let e = 0, el = form.elements.length; e < el; e++) {
                n = form.elements[e];
                c = false;

                switch (n.nodeName.toLowerCase()) {
                    // select boxes
                    case "select":
                        def = 0;
                        for (o = 0, ol = n.options.length; o < ol; o++) {
                            opt = n.options[o];
                            c = c || (opt.selected !== opt.defaultSelected);
                            if (opt.defaultSelected)
                                def = o;
                        }
                        if (c && !n.multiple)
                            c = (def !== n.selectedIndex);
                        break;

                        // input / textarea
                    case "textarea":
                    case "input":

                        switch (n.type.toLowerCase()) {
                            case "checkbox":
                            case "radio":
                                // checkbox / radio
                                c = (n.checked !== n.defaultChecked);
                                break;
                            default:
                                // standard values
                                c = (n.value !== n.defaultValue);
                                break;
                        }
                        break;
                }

                if (c)
                    changed.push(n);
            }

            return changed;
        },
        correspondence: function (data) {
            if ("tabs" === data)
                return "royal_tab";
            else if ("tabs-nav" === data)
                return "ui-tabs-nav";
        },
        cloneElement: function (element) {
            let new_element = element.cloneNode(true);
            element.parentElement.appendChild(new_element);
            element.remove();

            return new_element;
        },
        serializeArrayForm: function (element) {
            return $("#" + element).serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});
        },
        jsonSchemaValidationInit: function () {
            let XHRModal = CORE.XHRObject();
            XHRModal.url = "locales/" + sessionStorage.getItem("langue") + "/jsonSchemaValidation.json";
            XHRModal.method = "GET";
            XHRModal.traitement_succes = function (XHRresponse) {
                tv4.addLanguage(sessionStorage.getItem("langue"), JSON.parse(XHRresponse));
            };
            let xhr = CORE.open_xhr(XHRModal);
            xhr.send();
        },
        jsonSchemaValidation: function (obj, schema, formId) {
            tv4.language(sessionStorage.getItem("langue"));

            let formElement = document.querySelectorAll("aside #" + formId)[0];
            let erreurSection = formElement.querySelectorAll(".erreur");
            for (const error of erreurSection) {
                error.classList.remove("erreur");
                if (error.getElementsByClassName("error-csys")[0] !== undefined)
                    error.getElementsByClassName("error-csys")[0].remove();
            }

            return tv4.validateMultiple(obj, schema);
        },
        afficherErreursFormulaire: function (validation, formId) {
            for (const error of validation.errors) {
                let errorId = error.dataPath.replace("/", "");
                if (errorId !== "") {
                    let field = document.getElementById(errorId);
                    let errorField = field.parentElement.getElementsByClassName("error-csys")[0];
                    let section = document.querySelector("#" + field.id).closest("section");

                    section.classList.add("erreur");
                    errorField = document.createElement("small");
                    errorField.classList.add("error-csys");
                    errorField.innerHTML = error.message;
                    field.parentElement.appendChild(errorField);
                } else {
                    alert(error.message);
                }

                console.log(error);
            }
        },
        renderTemplate: function (template, dataTemplate) {
            return Mustache.render(template, dataTemplate);
        },
        getActiveSideBar: function () {
            return document.querySelectorAll(".views div.active")[0].getElementsByTagName("aside")[0];
        }
    };
}());
