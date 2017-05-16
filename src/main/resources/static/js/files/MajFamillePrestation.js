CORE.create_module("MajFamillePrestation", function (sb) {
    let majPrestation_object;
    let activeSideBar = sb.getActiveSideBar();
    let schema = {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "title": "famillePrestation",
        "description": "A product from Acme's catalog",
        "type": "object",
        "required": ["designationAr", "designationEn"],
        "properties": {
            "actif": {
                "id": "/properties/actif",
                "type": "boolean"
            },
            "designationAr": {
                "type": "string",
                "$ref": "#/definitions/minLength"
            },
            "designationEn": {
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
            majPrestation_object = this;

            sb.listen({
                "famillePrestation": this.modification
            });
            /* Type prestation */
            let XHRSelectTypePrestation = sb.XHRObject(sb);
            XHRSelectTypePrestation.url = `${url_base}/type-prestations/actif?actif=true`;
            XHRSelectTypePrestation.traitement_succes = function (XHRresponse) {
                let columnsTypePrestation = null;
                let champsTypePrestation = [
                    {title: "designation", width: "100%"}
                ];
                let data_SelectTypePrestation = sb.selectObject();
                data_SelectTypePrestation.element = "codeTypePrestation";
                data_SelectTypePrestation.response = JSON.parse(XHRresponse);
                data_SelectTypePrestation.columns = columnsTypePrestation;
                data_SelectTypePrestation.champs = champsTypePrestation;
                data_SelectTypePrestation.width = "300px";
                data_SelectTypePrestation.champsSelection = "designation";
                data_SelectTypePrestation.boutonAjoutRapide = false;

                sb.notify({
                    type: 'createSelect',
                    data: data_SelectTypePrestation
                });
            };
            let xhrSelectTypePrestation = sb.openXhr(XHRSelectTypePrestation);
            xhrSelectTypePrestation.send();
            /* Fin Type prestation */
        },
        destroy: function () {
            majPrestation_object = null;
        },
        modification: function (famillePrestation) {
            if (famillePrestation.type === "Ajouter") {
                let btnValider = activeSideBar.querySelector("#btnValiderFamillePrestation");
                btnValider.addEventListener("click", function () {
                    let FamillePrestation = majPrestation_object.prepareFamillePrestation(famillePrestation);
                    if (FamillePrestation) {
                        majPrestation_object.validerAjout(FamillePrestation);
                    } else {
                        return false;
                    }
                }, true);
            } else {
                let XHRFamillePrestation = sb.XHRObject(sb);
                XHRFamillePrestation.url = `${url_base}/famille-prestations/${famillePrestation.data.code}`;
                XHRFamillePrestation.async = false;
                XHRFamillePrestation.traitement_succes = function (XHRresponse) {
                    let response = JSON.parse(XHRresponse);
                    activeSideBar.querySelector("#actif").checked = response.actif;
                    activeSideBar.querySelector("#designationEn").value = response.designationEn;
                    activeSideBar.querySelector("#designationAr").value = response.designationAr;
                    sb.notify({
                        type: "selectRowByObject",
                        data: {elementSelect: "codeTypePrestation", object: response.codeTypePrestation}
                    });
                    let btnValider = activeSideBar.querySelector("#btnValiderFamillePrestation");
                    if (famillePrestation.type === 'Delete') {
                        btnValider.addEventListener("click", function () {
                            majPrestation_object.validerDelete(famillePrestation.data);
                        }, true);
                        let fieldset = activeSideBar.querySelectorAll('form#formFamillePrestation fieldset');
                        for (let i = 0; i < fieldset.length; i++) {
                            fieldset[i].setAttribute("disabled", "disabled");
                        }
                    } else if (famillePrestation.type === 'Modif') {
                        btnValider.addEventListener("click", function () {
                            let FamillePrestation = majPrestation_object.prepareFamillePrestation(famillePrestation);
                            if (FamillePrestation) {
                                majPrestation_object.validerModif(FamillePrestation);
                            } else {
                                return false;
                            }
                        }, true);
                    }
                };
                let xhrFamillePrestation = sb.openXhr(XHRFamillePrestation);
                xhrFamillePrestation.send();
            }
        },
        validerModif: function (famillePrestation) {
            let XHRValiderModifFamillePrestation = sb.XHRObject(sb);
            XHRValiderModifFamillePrestation.url = `${url_base}/famille-prestations`;
            XHRValiderModifFamillePrestation.method = "PUT";
            XHRValiderModifFamillePrestation.async = false;
            XHRValiderModifFamillePrestation.data = famillePrestation;
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
                    data: "famille-prestations"
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
            xhrValiderModifFamillePrestation.send(JSON.stringify(famillePrestation));
        },
        validerDelete: function (data) {
            let XHRDeleteAjoutFamillePrestation = sb.XHRObject(sb);
            XHRDeleteAjoutFamillePrestation.url = `${url_base}/famille-prestations/${data.code}`;
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
                    data: "famille-prestations"
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
        validerAjout: function (famillePrestation) {
            let XHRValiderAjoutFamillePrestation = sb.XHRObject(sb);
            XHRValiderAjoutFamillePrestation.url = `${url_base}/famille-prestations`;
            XHRValiderAjoutFamillePrestation.method = "POST";
            XHRValiderAjoutFamillePrestation.async = false;
            XHRValiderAjoutFamillePrestation.data = famillePrestation;
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
                    data: "famille-prestations"
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
            xhrValiderAjoutFamillePrestation.send(JSON.stringify(famillePrestation));
        },
        prepareFamillePrestation: function (data) {
            let famillePrestation = sb.serializeArrayForm("formFamillePrestation");
            famillePrestation.actif = famillePrestation.actif !== undefined;
            famillePrestation.codeTypePrestation = SelectedData["codeTypePrestation"][0];
            if (famillePrestation.codeTypePrestation === undefined) {
                sb.addErreur(activeSideBar.querySelector("#codeTypePrestation"));
                return false;
            }
            if (data.type === "Ajouter") {
                famillePrestation["code"] = null;
            } else if (data.type === "Modif") {
                famillePrestation["code"] = data.data.code;
                famillePrestation["prefixe"] = data.data.prefixe;
            }
            let validation = sb.jsonSchemaValidation(famillePrestation, schema, "formFamillePrestation");
            if (validation.valid) {
                return famillePrestation;
            } else {
                sb.afficherErreursFormulaire(validation, "formFamillePrestation");
            }
        }
    };
});

CORE.start("MajFamillePrestation");
