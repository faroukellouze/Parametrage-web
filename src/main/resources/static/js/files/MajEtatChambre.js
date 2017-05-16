CORE.create_module("MajEtatChambre", function (sb) {
    let majEtatChambre_object;
    let activeSideBar = sb.getActiveSideBar();
    let schema = {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "title": "état chambre",
        "description": "A product from Acme's catalog",
        "type": "object",
        "required": ["couleur", "designationAr", "designation"],
        "properties": {
            "couleur": {
                "type": "string",
                "$ref": "#/definitions/minLength"
            },
            "designation": {
                "type": "string",
                "$ref": "#/definitions/minLength"
            },
            "designationAr": {
                "type": "string",
                "$ref": "#/definitions/minLength"
            }
        },
        "definitions": {
            "minLength": {
                "minLength": 1
            }
        }
    };
    return {
        init: function () {
            majEtatChambre_object = this;

            sb.listen({
                "etatChambre": this.modification
            });
        },
        destroy: function () {
            majEtatChambre_object = null;
        },
        modification: function (etatChambre) {
            if (etatChambre.type === "Ajouter") {
                let btnValider = activeSideBar.querySelector("#btnValiderEtatChambre");
                btnValider.addEventListener("click", function () {
                    let EtatChambre = majEtatChambre_object.prepareEtatChambre(etatChambre);
                    if (EtatChambre) {
                        majEtatChambre_object.validerAjout(EtatChambre);
                    } else {
                        return false;
                    }
                }, true);
            } else {
                let XHREtatChambre = sb.XHRObject(sb);
                XHREtatChambre.url = `${url_base}/etat-chambres/${etatChambre.data.code}`;
                XHREtatChambre.async = false;
                XHREtatChambre.traitement_succes = function (XHRresponse) {
                    let response = JSON.parse(XHRresponse);
                    activeSideBar.querySelector("#etat").checked = response.etat;
                    activeSideBar.querySelector("#actif").checked = response.actif;
                    activeSideBar.querySelector("#designation").value = response.designation;
                    activeSideBar.querySelector("#designationAr").value = response.designationAr;
                    activeSideBar.querySelector("#couleur").value = response.couleur;
                    let btnValider = activeSideBar.querySelector("#btnValiderEtatChambre");
                    if (etatChambre.type === 'Delete') {
                        btnValider.addEventListener("click", function () {
                            majEtatChambre_object.validerDelete(etatChambre.data);
                        }, true);
                        let fieldset = activeSideBar.querySelectorAll('form#formEtatChambre fieldset');
                        for (let i = 0; i < fieldset.length; i++) {
                            fieldset[i].setAttribute("disabled", "disabled");
                        }
                    } else if (etatChambre.type === 'Modif') {
                        btnValider.addEventListener("click", function () {
                            let EtatChambre = majEtatChambre_object.prepareEtatChambre(etatChambre);
                            if (EtatChambre) {
                                majEtatChambre_object.validerModif(EtatChambre);
                            } else {
                                return false;
                            }
                        }, true);
                    }
                };
                let xhrEtatChambre = sb.openXhr(XHREtatChambre);
                xhrEtatChambre.send();
            }
        },
        validerModif: function (etatChambre) {
            let XHRValiderModifEtatChambre = sb.XHRObject(sb);
            XHRValiderModifEtatChambre.url = `${url_base}/etat-chambres`;
            XHRValiderModifEtatChambre.method = "PUT";
            XHRValiderModifEtatChambre.async = false;
            XHRValiderModifEtatChambre.data = etatChambre;
            XHRValiderModifEtatChambre.traitement_succes = function (XHRresponse) {
                sb.notify({
                    type: "showMessage",
                    data: {
                        title: "Avertissement",
                        numMsg: 26,
                        typeMsg: "Succes",
                        delai: 5000
                    }
                });

                sb.hideSideBar();
                sb.notify({
                    type: "trigger-refresh",
                    data: "etat-chambres"
                });
            };
            XHRValiderModifEtatChambre.traitement_fail = function (XHRresponse) {
                let response = JSON.parse(XHRresponse);
                sb.notify({
                    type: "showMessage",
                    data: {
                        title: "Avertissement",
                        numMsg: response.description,
                        typeMsg: "error",
                        delai: 5000
                    }
                });
            };
            let xhrValiderModifEtatChambre = sb.openXhr(XHRValiderModifEtatChambre);
            xhrValiderModifEtatChambre.send(JSON.stringify(etatChambre));
        },
        validerDelete: function (data) {
            let XHRDeleteAjoutEtatChambre = sb.XHRObject(sb);
            XHRDeleteAjoutEtatChambre.url = `${url_base}/etat-chambres/${data.code}`;
            XHRDeleteAjoutEtatChambre.method = "DELETE";
            XHRDeleteAjoutEtatChambre.async = false;
            XHRDeleteAjoutEtatChambre.traitement_succes = function (XHRresponse) {
                sb.notify({
                    type: "showMessage",
                    data: {
                        title: "Avertissement",
                        numMsg: 26,
                        typeMsg: "Succes",
                        delai: 5000
                    }
                });

                sb.hideSideBar();
                sb.notify({
                    type: "trigger-refresh",
                    data: "etat-chambres"
                });
            };
            XHRDeleteAjoutEtatChambre.traitement_fail = function (XHRresponse) {
                let response = JSON.parse(XHRresponse);
                sb.notify({
                    type: "showMessage",
                    data: {
                        title: "Avertissement",
                        numMsg: response.description,
                        typeMsg: "error",
                        delai: 5000
                    }
                });
            };
            let xhrDeleteAjoutEtatChambre = sb.openXhr(XHRDeleteAjoutEtatChambre);
            xhrDeleteAjoutEtatChambre.send();
        },
        validerAjout: function (etatChambre) {
            let XHRValiderAjoutEtatChambre = sb.XHRObject(sb);
            XHRValiderAjoutEtatChambre.url = `${url_base}/etat-chambres`;
            XHRValiderAjoutEtatChambre.method = "POST";
            XHRValiderAjoutEtatChambre.async = false;
            XHRValiderAjoutEtatChambre.data = etatChambre;
            XHRValiderAjoutEtatChambre.traitement_succes = function (XHRresponse) {
                sb.notify({
                    type: "showMessage",
                    data: {
                        title: "Avertissement",
                        numMsg: 26,
                        typeMsg: "Succes",
                        delai: 5000
                    }
                });

                sb.hideSideBar();
                sb.notify({
                    type: "trigger-refresh",
                    data: "etat-chambres"
                });
            };
            XHRValiderAjoutEtatChambre.traitement_fail = function (XHRresponse) {
                let response = JSON.parse(XHRresponse);
                sb.notify({
                    type: "showMessage",
                    data: {
                        title: "Avertissement",
                        numMsg: response.description,
                        typeMsg: "Succes",
                        delai: 5000
                    }
                });
            };
            let xhrValiderAjoutEtatChambre = sb.openXhr(XHRValiderAjoutEtatChambre);
            xhrValiderAjoutEtatChambre.send(JSON.stringify(etatChambre));
        },
        prepareEtatChambre: function (data) {
            let etatChambre = sb.serializeArrayForm("formEtatChambre");
            etatChambre.actif = etatChambre.actif !== undefined;
            etatChambre.etat = etatChambre.etat !== undefined;
            if (data.type === "Ajouter") {
                etatChambre["code"] = null;
            } else if (data.type === "Modif") {
                etatChambre["code"] = data.data.code;
            }

            let validation = sb.jsonSchemaValidation(etatChambre, schema, "formEtatChambre");
            if (validation.valid) {
                return etatChambre;
            } else {
                sb.afficherErreursFormulaire(validation, "formEtatChambre");
            }
        }
    };
});

CORE.start("MajEtatChambre");
