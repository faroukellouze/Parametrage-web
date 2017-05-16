CORE.create_module("MajCategorieChambre", function (sb) {
    let MajCategorieChambre_object;
    let activeSideBar = sb.getActiveSideBar();
    let schema = {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "title": "cathegories",
        "description": "A product from Acme's catalog",
        "type": "object",
        "required": ["designation", "designationAr"],
        "properties": {
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
            MajCategorieChambre_object = this;

            sb.listen({
                "CategorieChambre": this.modification
            });

            /*prestation */
            let XHRSelectTypePrestation = sb.XHRObject(sb);
            XHRSelectTypePrestation.url = `${url_base}/prestations/actif?actif=true`;
            XHRSelectTypePrestation.traitement_succes = function (XHRresponse) {
                let response = JSON.parse(XHRresponse);
                let columnsPrestation = null;
                let champsPrestation = [
                    {title: "designationAr", width: "100%"}
                ];
                let data_SelectPrestationSejour = sb.selectObject();
                data_SelectPrestationSejour.element = "prestSejour";
                data_SelectPrestationSejour.response = response;
                data_SelectPrestationSejour.columns = columnsPrestation;
                data_SelectPrestationSejour.champs = champsPrestation;
                data_SelectPrestationSejour.champsSelection = "designationAr";
                data_SelectPrestationSejour.boutonAjoutRapide = false;

                sb.notify({
                    type: 'createSelect',
                    data: data_SelectPrestationSejour
                });
                let data_SelectPrestationAccompagnant = sb.selectObject();
                data_SelectPrestationAccompagnant.element = "prestAccompagnat";
                data_SelectPrestationAccompagnant.response = response;
                data_SelectPrestationAccompagnant.columns = columnsPrestation;
                data_SelectPrestationAccompagnant.champs = champsPrestation;
                data_SelectPrestationAccompagnant.champsSelection = "designationAr";
                data_SelectPrestationAccompagnant.boutonAjoutRapide = false;

                sb.notify({
                    type: 'createSelect',
                    data: data_SelectPrestationAccompagnant
                });
                let data_SelectPrestationSurveillance = sb.selectObject();
                data_SelectPrestationSurveillance.element = "prestSurveillance";
                data_SelectPrestationSurveillance.response = response;
                data_SelectPrestationSurveillance.columns = columnsPrestation;
                data_SelectPrestationSurveillance.champs = champsPrestation;
                data_SelectPrestationSurveillance.champsSelection = "designationAr";
                data_SelectPrestationSurveillance.boutonAjoutRapide = false;

                sb.notify({
                    type: 'createSelect',
                    data: data_SelectPrestationSurveillance
                });
                let data_SelectPrestationSuivie = sb.selectObject();
                data_SelectPrestationSuivie.element = "prestSuivie";
                data_SelectPrestationSuivie.response = response;
                data_SelectPrestationSuivie.columns = columnsPrestation;
                data_SelectPrestationSuivie.champs = champsPrestation;
                data_SelectPrestationSuivie.champsSelection = "designationAr";
                data_SelectPrestationSuivie.boutonAjoutRapide = false;

                sb.notify({
                    type: 'createSelect',
                    data: data_SelectPrestationSuivie
                });

            };
            let xhrSelectTypePrestation = sb.openXhr(XHRSelectTypePrestation);
            xhrSelectTypePrestation.send();
            /* Fin prestation */
        },
        destroy: function () {
            MajCategorieChambre_object = null;
        },
        modification: function (cathegorie) {
            if (cathegorie.type === "Ajouter") {
                let btnValider = activeSideBar.querySelector("#btnValiderCategorie");
                btnValider.addEventListener("click", function () {
                    let Cathegorie = MajCategorieChambre_object.prepareCathegorie(cathegorie);
                    if (Cathegorie) {
                        MajCategorieChambre_object.validerAjout(Cathegorie);
                    } else {
                        return false;
                    }
                }, true);
            } else {
                let XHRSociete = sb.XHRObject(sb);
                XHRSociete.url = `${url_base}/cathegories/${cathegorie.data.code}`;
                XHRSociete.async = false;
                XHRSociete.traitement_succes = function (XHRresponse) {
                    let response = JSON.parse(XHRresponse);
                    sb.notify({
                        type: "selectRowByObject",
                        data: {elementSelect: "prestSejour", object: response.prestSejour}
                    });
                    sb.notify({
                        type: "selectRowByObject",
                        data: {elementSelect: "prestAccompagnat", object: response.prestAccompagnat}
                    });
                    sb.notify({
                        type: "selectRowByObject",
                        data: {elementSelect: "prestSurveillance", object: response.prestSurveillance}
                    });
                    sb.notify({
                        type: "selectRowByObject",
                        data: {elementSelect: "prestSuivie", object: response.prestSuivie}
                    });
                    activeSideBar.querySelector("#isIcu").checked = response.isIcu;
                    activeSideBar.querySelector("#actif").checked = response.actif;
                    activeSideBar.querySelector("#designationAr").value = response.designationAr;
                    activeSideBar.querySelector("#designation").value = response.designation;
                    let btnValider = activeSideBar.querySelector("#btnValiderCategorie");
                    if (cathegorie.type === 'Delete') {
                        btnValider.addEventListener("click", function () {
                            MajCategorieChambre_object.validerDelete(cathegorie.data);
                        }, true);
                        let fieldset = activeSideBar.querySelectorAll('form#formCategorie fieldset');
                        for (let i = 0; i < fieldset.length; i++) {
                            fieldset[i].setAttribute("disabled", "disabled");
                        }
                    } else if (cathegorie.type === 'Modif') {
                        btnValider.addEventListener("click", function () {
                            let Cathegorie = MajCategorieChambre_object.prepareCathegorie(cathegorie);
                            if (Cathegorie) {
                                MajCategorieChambre_object.validerModif(Cathegorie);
                            } else {
                                return false;
                            }
                        }, true);
                    }
                };
                let xhrSociete = sb.openXhr(XHRSociete);
                xhrSociete.send();
            }
        },
        validerModif: function (cathegorie) {
            let XHRValiderModifSociete = sb.XHRObject(sb);
            XHRValiderModifSociete.url = `${url_base}/cathegories/`;
            XHRValiderModifSociete.method = "PUT";
            XHRValiderModifSociete.async = false;
            XHRValiderModifSociete.data = cathegorie;
            XHRValiderModifSociete.traitement_succes = function (XHRresponse) {
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
                    data: "cathegoriesChambres"
                });
            };
            XHRValiderModifSociete.traitement_fail = function (XHRresponse) {
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
            let xhrValiderModifSociete = sb.openXhr(XHRValiderModifSociete);
            xhrValiderModifSociete.send(JSON.stringify(cathegorie));
        },
        validerDelete: function (data) {
            let XHRDeleteAjoutSociete = sb.XHRObject(sb);
            XHRDeleteAjoutSociete.url = `${url_base}/cathegories/${data.code}`;
            XHRDeleteAjoutSociete.method = "DELETE";
            XHRDeleteAjoutSociete.async = false;
            XHRDeleteAjoutSociete.traitement_succes = function (XHRresponse) {
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
                    data: "cathegoriesChambres"
                });
            };
            XHRDeleteAjoutSociete.traitement_fail = function (XHRresponse) {
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
            let xhrDeleteAjoutSociete = sb.openXhr(XHRDeleteAjoutSociete);
            xhrDeleteAjoutSociete.send();
        },
        validerAjout: function (cathegorie) {
            let XHRValiderAjoutSociete = sb.XHRObject(sb);
            XHRValiderAjoutSociete.url = `${url_base}/cathegories/`;
            XHRValiderAjoutSociete.method = "POST";
            XHRValiderAjoutSociete.async = false;
            XHRValiderAjoutSociete.data = cathegorie;
            XHRValiderAjoutSociete.traitement_succes = function (XHRresponse) {
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
                    data: "cathegoriesChambres"
                });
            };
            XHRValiderAjoutSociete.traitement_fail = function (XHRresponse) {
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
            let xhrValiderAjoutSociete = sb.openXhr(XHRValiderAjoutSociete);
            xhrValiderAjoutSociete.send(JSON.stringify(cathegorie));
        },
        prepareCathegorie: function (data) {
            let cathegorie = sb.serializeArrayForm("formCategorie");
            cathegorie.actif = cathegorie.actif !== undefined;
            cathegorie.isIcu = cathegorie.isIcu !== undefined;
            cathegorie.prestSejour = SelectedData["prestSejour"][0];
            cathegorie.prestAccompagnat = SelectedData["prestAccompagnat"][0];
            cathegorie.prestSurveillance = SelectedData["prestSurveillance"][0];
            cathegorie.prestSuivie = SelectedData["prestSuivie"][0];

            if (data.type === "Ajouter") {
                cathegorie.code = null;
                cathegorie.userCreation = null;
                cathegorie.dateCreation = null;
            } else if (data.type === "Modif") {
                cathegorie.code = data.data.code;
                cathegorie.userCreation = data.data.userCreation;
                cathegorie.dateCreation = data.data.dateCreation;
            }
            let validation = sb.jsonSchemaValidation(cathegorie, schema, "formCategorie");
            if (validation.valid) {
                return cathegorie;
            } else {
                sb.afficherErreursFormulaire(validation, "formCategorie");
            }
        }
    };
});

CORE.start("MajCategorieChambre");
