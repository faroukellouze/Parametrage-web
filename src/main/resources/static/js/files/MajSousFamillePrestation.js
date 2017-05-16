CORE.create_module("MajSousFamillePrestation", function (sb) {
    let majSousFamillePrestation_object;
    let activeSideBar = sb.getActiveSideBar();
    let schema = {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "title": "famillePrestation",
        "description": "A product from Acme's catalog",
        "type": "object",
        "required": ["designationAr", "designation"],
        "properties": {
            "actif": {
                "id": "/properties/actif",
                "type": "boolean"
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
            majSousFamillePrestation_object = this;

            sb.listen({
                "sousFamillePrestation": this.modification
            });

            /*  famille */
            let XHRSelectFamille = sb.XHRObject(sb);
            XHRSelectFamille.url = `${url_base}/famille-prestations/actif?actif=true`;
            XHRSelectFamille.traitement_succes = function (XHRresponse) {
                let columnsSousFamille = null;
                let champsSousFamille = [
                    {title: "designationEn", width: "100%"}
                ];
                let data_SelectFamille = sb.selectObject();
                data_SelectFamille.element = "codeFamille";
                data_SelectFamille.response = JSON.parse(XHRresponse);
                data_SelectFamille.columns = columnsSousFamille;
                data_SelectFamille.champs = champsSousFamille;
                data_SelectFamille.champsSelection = "designationEn";
                data_SelectFamille.boutonAjoutRapide = false;
                sb.notify({
                    type: 'createSelect',
                    data: data_SelectFamille
                });
            };
            let xhrSelectFamille = sb.openXhr(XHRSelectFamille);
            xhrSelectFamille.send();
            /* fin famille */
        },
        destroy: function () {
            majSousFamillePrestation_object = null;
        },
        modification: function (sousFamillePrestation) {
            if (sousFamillePrestation.type === "Ajouter") {
                let btnValider = activeSideBar.querySelector("#btnValiderSousFamillePrestation");
                btnValider.addEventListener("click", function () {
                    let FamillePrestation = majSousFamillePrestation_object.prepareSousFamillePrestation(sousFamillePrestation);
                    if (FamillePrestation) {
                        majSousFamillePrestation_object.validerAjout(FamillePrestation);
                    } else {
                        return false;
                    }
                }, true);
            } else {
                let XHRSousFamillePrestation = sb.XHRObject(sb);
                XHRSousFamillePrestation.url = `${url_base}/sous-famille-prestations/${sousFamillePrestation.data.code}`;
                XHRSousFamillePrestation.async = false;
                XHRSousFamillePrestation.traitement_succes = function (XHRresponse) {
                    let response = JSON.parse(XHRresponse);
                    activeSideBar.querySelector("#actif").checked = response.actif;
                    activeSideBar.querySelector("#designation").value = response.designation;
                    activeSideBar.querySelector("#designationAr").value = response.designationAr;
                    sb.notify({
                        type: "selectRowByObject",
                        data: {elementSelect: "codeFamille", object: response.codeFamille}
                    });
                    let btnValider = activeSideBar.querySelector("#btnValiderSousFamillePrestation");
                    if (sousFamillePrestation.type === 'Delete') {
                        btnValider.addEventListener("click", function () {
                            majSousFamillePrestation_object.validerDelete(sousFamillePrestation.data);
                        }, true);
                        let fieldset = activeSideBar.querySelectorAll('form#formSousFamillePrestation fieldset');
                        for (let i = 0; i < fieldset.length; i++) {
                            fieldset[i].setAttribute("disabled", "disabled");
                        }
                    } else if (sousFamillePrestation.type === 'Modif') {
                        btnValider.addEventListener("click", function () {
                            let FamillePrestation = majSousFamillePrestation_object.prepareSousFamillePrestation(sousFamillePrestation);
                            if (FamillePrestation) {
                                majSousFamillePrestation_object.validerModif(FamillePrestation);
                            } else {
                                return false;
                            }
                        }, true);
                    }
                };
                let xhrFamillePrestation = sb.openXhr(XHRSousFamillePrestation);
                xhrFamillePrestation.send();
            }
        },
        validerModif: function (sousFamillePrestation) {
            let XHRValiderModifFamillePrestation = sb.XHRObject(sb);
            XHRValiderModifFamillePrestation.url = `${url_base}/sous-famille-prestations`;
            XHRValiderModifFamillePrestation.method = "PUT";
            XHRValiderModifFamillePrestation.async = false;
            XHRValiderModifFamillePrestation.data = sousFamillePrestation;
            XHRValiderModifFamillePrestation.traitement_succes = function (XHRresponse) {
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
                    data: "sous-famille-prestations"
                });
            };
            XHRValiderModifFamillePrestation.traitement_fail = function (XHRresponse) {
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
            let xhrValiderModifFamillePrestation = sb.openXhr(XHRValiderModifFamillePrestation);
            xhrValiderModifFamillePrestation.send(JSON.stringify(sousFamillePrestation));
        },
        validerDelete: function (data) {
            let XHRDeleteAjoutFamillePrestation = sb.XHRObject(sb);
            XHRDeleteAjoutFamillePrestation.url = `${url_base}/sous-famille-prestations/${data.code}`;
            XHRDeleteAjoutFamillePrestation.method = "DELETE";
            XHRDeleteAjoutFamillePrestation.async = false;
            XHRDeleteAjoutFamillePrestation.traitement_succes = function (XHRresponse) {
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
                    data: "sous-famille-prestations"
                });
            };
            XHRDeleteAjoutFamillePrestation.traitement_fail = function (XHRresponse) {
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
            let xhrDeleteAjoutFamillePrestation = sb.openXhr(XHRDeleteAjoutFamillePrestation);
            xhrDeleteAjoutFamillePrestation.send();
        },
        validerAjout: function (sousFamillePrestation) {
            let XHRValiderAjoutFamillePrestation = sb.XHRObject(sb);
            XHRValiderAjoutFamillePrestation.url = `${url_base}/sous-famille-prestations`;
            XHRValiderAjoutFamillePrestation.method = "POST";
            XHRValiderAjoutFamillePrestation.async = false;
            XHRValiderAjoutFamillePrestation.data = sousFamillePrestation;
            XHRValiderAjoutFamillePrestation.traitement_succes = function (XHRresponse) {
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
                    data: "sous-famille-prestations"
                });
            };
            XHRValiderAjoutFamillePrestation.traitement_fail = function (XHRresponse) {
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
            let xhrValiderAjoutFamillePrestation = sb.openXhr(XHRValiderAjoutFamillePrestation);
            xhrValiderAjoutFamillePrestation.send(JSON.stringify(sousFamillePrestation));
        },
        prepareSousFamillePrestation: function (data) {
            let sousFamillePrestation = sb.serializeArrayForm("formSousFamillePrestation");
            sousFamillePrestation.actif = sousFamillePrestation.actif !== undefined;
            sousFamillePrestation.codeFamille = SelectedData["codeFamille"][0];
            if (sousFamillePrestation.codeFamille === undefined) {
                sb.addErreur(activeSideBar.querySelector("#codeFamille"));
                return false;
            }
            if (data.type === "Ajouter") {
                sousFamillePrestation["code"] = null;
            } else if (data.type === "Modif") {
                sousFamillePrestation["code"] = data.data.code;
            }
            let validation = sb.jsonSchemaValidation(sousFamillePrestation, schema, "formSousFamillePrestation");
            if (validation.valid) {
                return sousFamillePrestation;
            } else {
                sb.afficherErreursFormulaire(validation, "formSousFamillePrestation");
            }
        }
    };
});

CORE.start("MajSousFamillePrestation");
