CORE.create_module("MajPrestation", function (sb) {
    let Prestation_object;
    let activeSideBar = sb.getActiveSideBar();
    let schema = {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "title": "Prestation",
        "description": "A product from Acme's catalog",
        "type": "object",
        "required": ["codeSaisie", "designationAr", "designationEn"],
        "properties": {
            "codeSaisie": {
                "type": "string",
                "$ref": "#/definitions/minLength"
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
    }
    return {
        init: function () {
            Prestation_object = this;

            sb.listen({
                "Prestation": this.modification
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
                data_SelectTypePrestation.elementSelected = function (data) {
                    activeSideBar.querySelector("#codeSaisie").value = "";
                    activeSideBar.querySelector("#famille").value = "";
                    let XHRSelectSousFamille = sb.XHRObject(sb);
                    XHRSelectSousFamille.url = `${url_base}/sous-famille-prestations/ActifCodeFamille/TypePrestation?actif=true&codeTypePrestation=${data.code}`;
                    XHRSelectSousFamille.traitement_succes = function (XHRresponse) {
                        let columnsSousFamille = null;
                        let champsSousFamille = [
                            {title: "designation", width: "100%"}
                        ];
                        let data_SelectSousFamille = sb.selectObject();
                        data_SelectSousFamille.element = "codeSousFamille";
                        data_SelectSousFamille.response = JSON.parse(XHRresponse);
                        data_SelectSousFamille.columns = columnsSousFamille;
                        data_SelectSousFamille.champs = champsSousFamille;
                        data_SelectSousFamille.champsSelection = "designation";
                        data_SelectSousFamille.width = "300px";
                        data_SelectSousFamille.boutonAjoutRapide = false;
                        data_SelectSousFamille.elementSelected = function (data) {
                            activeSideBar.querySelector("#codeSaisie").value = data.codeFamille.prefixe + data.codeFamille.suffixe;
                            activeSideBar.querySelector("#famille").value = data.codeFamille.designationAr;

                        };
                        sb.notify({
                            type: 'createSelect',
                            data: data_SelectSousFamille
                        });
                    };
                    let xhrSelectSousFamille = sb.openXhr(XHRSelectSousFamille);
                    xhrSelectSousFamille.send();

                };
                sb.notify({
                    type: 'createSelect',
                    data: data_SelectTypePrestation
                });
            };
            let xhrSelectTypePrestation = sb.openXhr(XHRSelectTypePrestation);
            xhrSelectTypePrestation.send();
            /* Fin Type prestation */

            /* Sous famille */
//            let XHRSelectSousFamille = sb.XHRObject(sb);
//            XHRSelectSousFamille.url = `${url_base}/sous-famille-prestations/actif?actif=true`;
//            XHRSelectSousFamille.traitement_succes = function (XHRresponse) {
            let columnsSousFamille = null;
            let champsSousFamille = [
                {title: "designation", width: "100%"}
            ];
            let data_SelectSousFamille = sb.selectObject();
            data_SelectSousFamille.element = "codeSousFamille";
            data_SelectSousFamille.response = [];
            data_SelectSousFamille.columns = columnsSousFamille;
            data_SelectSousFamille.champs = champsSousFamille;
            data_SelectSousFamille.champsSelection = "designation";
            data_SelectSousFamille.width = "300px";
            data_SelectSousFamille.boutonAjoutRapide = false;
            data_SelectSousFamille.elementSelected = function (data) {
//                    sb.notify({
//                        type: "selectRowByObject",
//                        data: {elementSelect: "codeTypePrestation", object: data.codeFamille.codeTypePrestation}
//                    });
                activeSideBar.querySelector("#codeSaisie").value = data.codeFamille.prefixe + data.codeFamille.suffixe;
                activeSideBar.querySelector("#famille").value = data.codeFamille.designationAr;

            };
            sb.notify({
                type: 'createSelect',
                data: data_SelectSousFamille
            });
//            };
//            let xhrSelectSousFamille = sb.openXhr(XHRSelectSousFamille);
//            xhrSelectSousFamille.send();
            /* fin Sous famille */

            /* TVA */
            let XHRSelectTVA = sb.XHRObject(sb);
            XHRSelectTVA.url = `${url_base}/tvas/actif?actif=true`;
            XHRSelectTVA.traitement_succes = function (XHRresponse) {
                let columnsTVA = null;
                let champsTVA = [
                    {title: "tva", width: "100%"}
                ];
                let data_SelectTVA = sb.selectObject();
                data_SelectTVA.element = "tva";
                data_SelectTVA.response = JSON.parse(XHRresponse);
                data_SelectTVA.columns = columnsTVA;
                data_SelectTVA.champs = champsTVA;
                data_SelectTVA.champsSelection = "tva";
                data_SelectTVA.boutonAjoutRapide = false;
                data_SelectTVA.searchVisibility = false;

                sb.notify({
                    type: 'createSelect',
                    data: data_SelectTVA
                });
            };
            let xhrSelectTVA = sb.openXhr(XHRSelectTVA);
            xhrSelectTVA.send();
            /* Fin TVA */

            /* Famille facturation */
            let XHRSelectFamilleFacturation = sb.XHRObject(sb);
            XHRSelectFamilleFacturation.url = `${url_base}/famille-facturations`;
            XHRSelectFamilleFacturation.traitement_succes = function (XHRresponse) {
                let columnsFamilleFacturation = null;
                let champsFamilleFacturation = [
                    {title: "designationAr", width: "100%"}
                ];
                let data_SelectFamilleFacturation = sb.selectObject();
                data_SelectFamilleFacturation.element = "codeFamilleFacturation";
                data_SelectFamilleFacturation.response = JSON.parse(XHRresponse);
                data_SelectFamilleFacturation.columns = columnsFamilleFacturation;
                data_SelectFamilleFacturation.champs = champsFamilleFacturation;
                data_SelectFamilleFacturation.champsSelection = "designationAr";
                data_SelectFamilleFacturation.width = "300px";
                data_SelectFamilleFacturation.boutonAjoutRapide = false;

                sb.notify({
                    type: 'createSelect',
                    data: data_SelectFamilleFacturation
                });
            };
            let xhrSelectFamilleFacturation = sb.openXhr(XHRSelectFamilleFacturation);
            xhrSelectFamilleFacturation.send();
            /* Fin Famille facturation */
        },
        destroy: function () {
            Prestation_object = null;
        },
        modification: function (prestation) {
            if (prestation.type === "Ajouter") {
                let btnValider = activeSideBar.querySelector("#btnValiderPrestation");
                btnValider.addEventListener("click", function () {
                    let Prestation = Prestation_object.preparePrestation(prestation);
                    if (Prestation) {
                        Prestation_object.validerAjout(Prestation);
                    } else {
                        return false;
                    }
                }, true);
            } else {
                let XHRPrestation = sb.XHRObject(sb);
                XHRPrestation.url = `${url_base}/prestations/${prestation.data.code}`;
                XHRPrestation.async = false;
                XHRPrestation.traitement_succes = function (XHRresponse) {
                    let response = JSON.parse(XHRresponse);
                    sb.notify({
                        type: "selectRowByObject",
                        data: {elementSelect: "codeTypePrestation", object: response.codeSousFamille.codeFamille.codeTypePrestation}
                    });
                    activeSideBar.querySelector("#actif").checked = response.actif;
                    activeSideBar.querySelector("#designationEn").value = response.designationEn;
                    activeSideBar.querySelector("#designationAr").value = response.designationAr;
                    setTimeout(function () {
                        sb.notify({
                            type: "selectRowByObject",
                            data: {elementSelect: "codeSousFamille", object: response.codeSousFamille}
                        });
                    }, 50);
                    activeSideBar.querySelector("#codeSaisie").value = response.codeSaisie;
                    sb.notify({
                        type: "selectRowByObject",
                        data: {elementSelect: "tva", object: response.tva}
                    });
                    sb.notify({
                        type: "selectRowByObject",
                        data: {elementSelect: "codeFamilleFacturation", object: response.codeFamilleFacturation}
                    });
                    activeSideBar.querySelector("#facturation").checked = response.facturation;
                    activeSideBar.querySelector("#etage").checked = response.etage;
                    activeSideBar.querySelector("#autorisModifierPrix").checked = response.autorisModifierPrix;
                    activeSideBar.querySelector("#demandeObligatoire").checked = response.demandeObligatoire;
                    activeSideBar.querySelector("#compteRendu").checked = response.compteRendu;
                    activeSideBar.querySelector("#sousTraitance").checked = response.sousTraitance;
                    let btnValider = activeSideBar.querySelector("#btnValiderPrestation");
                    if (prestation.type === 'Delete') {
                        btnValider.addEventListener("click", function () {
                            Prestation_object.validerDelete(prestation.data);
                        }, true);
                        let fieldset = activeSideBar.querySelectorAll('form#formPrestation fieldset');
                        for (let i = 0; i < fieldset.length; i++) {
                            fieldset[i].setAttribute("disabled", "disabled");
                        }
                    } else if (prestation.type === 'Modif') {
                        btnValider.addEventListener("click", function () {
                            let Prestation = Prestation_object.preparePrestation(prestation);
                            if (Prestation) {
                                Prestation_object.validerModif(Prestation);
                            } else {
                                return false;
                            }
                        }, true);
                    }
                };
                let xhrPrestation = sb.openXhr(XHRPrestation);
                xhrPrestation.send();
            }
        },
        validerModif: function (prestation) {
            let XHRValiderModifPrestation = sb.XHRObject(sb);
            XHRValiderModifPrestation.url = `${url_base}/prestations/`;
            XHRValiderModifPrestation.method = "PUT";
            XHRValiderModifPrestation.async = false;
            XHRValiderModifPrestation.data = prestation;
            XHRValiderModifPrestation.traitement_succes = function (XHRresponse) {
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
                    data: "prestations"
                });
            };
            XHRValiderModifPrestation.traitement_fail = function (XHRresponse) {
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
            let xhrValiderModifPrestation = sb.openXhr(XHRValiderModifPrestation);
            xhrValiderModifPrestation.send(JSON.stringify(prestation));
        },
        validerDelete: function (data) {
            let XHRDeleteAjoutPrestation = sb.XHRObject(sb);
            XHRDeleteAjoutPrestation.url = `${url_base}/prestations/${data.code}`;
            XHRDeleteAjoutPrestation.method = "DELETE";
            XHRDeleteAjoutPrestation.async = false;
            XHRDeleteAjoutPrestation.traitement_succes = function (XHRresponse) {
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
                    data: "prestations"
                });
            };
            XHRDeleteAjoutPrestation.traitement_fail = function (XHRresponse) {
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
            let xhrDeleteAjoutPrestation = sb.openXhr(XHRDeleteAjoutPrestation);
            xhrDeleteAjoutPrestation.send();
        },
        validerAjout: function (prestation) {
            let XHRValiderAjoutPrestation = sb.XHRObject(sb);
            XHRValiderAjoutPrestation.url = `${url_base}/prestations/`;
            XHRValiderAjoutPrestation.method = "POST";
            XHRValiderAjoutPrestation.async = false;
            XHRValiderAjoutPrestation.data = prestation;
            XHRValiderAjoutPrestation.traitement_succes = function (XHRresponse) {
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
                    data: "prestations"
                });
            };
            XHRValiderAjoutPrestation.traitement_fail = function (XHRresponse) {
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
            let xhrValiderAjoutPrestation = sb.openXhr(XHRValiderAjoutPrestation);
            xhrValiderAjoutPrestation.send(JSON.stringify(prestation));
        },
        preparePrestation: function (data) {
            let prestation = sb.serializeArrayForm("formPrestation");
            prestation.actif = prestation.actif !== undefined;
            prestation.facturation = prestation.facturation !== undefined;
            prestation.etage = prestation.etage !== undefined;
            prestation.autorisModifierPrix = prestation.autorisModifierPrix !== undefined;
            prestation.demandeObligatoire = prestation.demandeObligatoire !== undefined;
            prestation.compteRendu = prestation.compteRendu !== undefined;
            prestation.sousTraitance = prestation.sousTraitance !== undefined;
            prestation["codeSaisie"] = activeSideBar.querySelector("#codeSaisie").value;
            prestation["codeSousFamille"] = SelectedData["codeSousFamille"][0];
            prestation["codeTypePrestation"] = SelectedData["codeTypePrestation"][0];
            prestation["tva"] = SelectedData["tva"][0];
            prestation["codeFamilleFacturation"] = SelectedData["codeFamilleFacturation"][0];
            if (prestation["codeSousFamille"] === undefined) {
                sb.addErreur(activeSideBar.querySelector("#codeSousFamille"));
                return false;
            }
            if (prestation["codeTypePrestation"] === undefined) {
                sb.addErreur(activeSideBar.querySelector("#codeTypePrestation"));
                return false;
            }
            if (prestation["tva"] === undefined) {
                sb.addErreur(activeSideBar.querySelector("#tva"));
                return false;
            }
            if (prestation["codeFamilleFacturation"] === undefined) {
                sb.addErreur(activeSideBar.querySelector("#codeFamilleFacturation"));
                return false;
            }
            if (data.type === "Ajouter") {
                prestation["code"] = null;
                prestation["userCreate"] = null;
                prestation["dateCreate"] = null;
            } else if (data.type === "Modif") {
                prestation["code"] = data.data.code;
                prestation["userCreate"] = data.data.userCreate;
                prestation["dateCreate"] = data.data.dateCreate;
            }
            let validation = sb.jsonSchemaValidation(prestation, schema, "formPrestation");
            if (validation.valid) {
                return prestation;
            } else {
                sb.afficherErreursFormulaire(validation, "formPrestation");
            }
        }
    };
});

CORE.start("MajPrestation");
