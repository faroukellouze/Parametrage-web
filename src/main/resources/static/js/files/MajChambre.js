CORE.create_module("MajChambre", function (sb) {
    let MajChambre_object;
    let langue_index = sb.getLanguageIndex();
    let activeSideBar = sb.getActiveSideBar();

    let schema = {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "title": "Société",
        "description": "A product from Acme's catalog",
        "type": "object",
        "required": ["nbrLit", "numeroChambre"],
        "properties": {
            "nbrLit": {
                "id": "/properties/nbrLit",
                "type": "integer",
                "minimum": 0,
                "maximum": 30,
                "exclusiveMinimum": true
            },
            "numeroChambre": {
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
            MajChambre_object = this;
            sb.listen({
                "Chambre": this.modification
            });

            /* Categorie */
            let XHRSelectCategorie = sb.XHRObject(sb);
            XHRSelectCategorie.url = `${url_base}/cathegories/actif?actif=true`;
            XHRSelectCategorie.traitement_succes = function (XHRresponse) {
                let columnsCategorie = null;
                let champsCategorie = [
                    {title: "designation", width: "100%"}
                ];
                let data_SelectCategorie = sb.selectObject();
                data_SelectCategorie.element = "codeCathegorie";
                data_SelectCategorie.response = JSON.parse(XHRresponse);
                data_SelectCategorie.columns = columnsCategorie;
                data_SelectCategorie.champs = champsCategorie;
                data_SelectCategorie.champsSelection = "designation";
                data_SelectCategorie.boutonAjoutRapide = false;

                sb.notify({
                    type: 'createSelect',
                    data: data_SelectCategorie
                });
            };
            let xhrSelectCategorie = sb.openXhr(XHRSelectCategorie);
            xhrSelectCategorie.send();
            /* Fin Categorie */

            /* Etage */
            let XHRSelectEtage = sb.XHRObject(sb);
            XHRSelectEtage.url = `${url_base}/etages/actif?actif=true`;
            XHRSelectEtage.traitement_succes = function (XHRresponse) {
                let columnsEtage = null;
                let champsEtage = [
                    {title: "designationAr", width: "100%"}
                ];
                let data_SelectEtage = sb.selectObject();
                data_SelectEtage.element = "codeEtage";
                data_SelectEtage.response = JSON.parse(XHRresponse);
                data_SelectEtage.columns = columnsEtage;
                data_SelectEtage.champs = champsEtage;
                data_SelectEtage.champsSelection = "designationAr";
                data_SelectEtage.boutonAjoutRapide = false;
                sb.notify({
                    type: 'createSelect',
                    data: data_SelectEtage
                });
            };
            let xhrSelectEtage = sb.openXhr(XHRSelectEtage);
            xhrSelectEtage.send();
            /* fin Etage */

            /* Service */
            let XHRSelectService = sb.XHRObject(sb);
            XHRSelectService.url = `${url_base}/services/actif?actif=true`;
            XHRSelectService.traitement_succes = function (XHRresponse) {
                let columnsService = null;
                let champsService = [
                    {title: "designation"}
                ];
                let data_SelectService = sb.selectObject();
                data_SelectService.element = "codeService";
                data_SelectService.response = JSON.parse(XHRresponse);
                data_SelectService.columns = columnsService;
                data_SelectService.champs = champsService;
                data_SelectService.champsSelection = "designation";
                data_SelectService.boutonAjoutRapide = false;

                sb.notify({
                    type: 'createSelect',
                    data: data_SelectService
                });
            };
            let xhrSelectService = sb.openXhr(XHRSelectService);
            xhrSelectService.send();
            /* Fin Service */

            /* Etat */
            let XHRSelectEtat = sb.XHRObject(sb);
            XHRSelectEtat.url = `${url_base}/etat-chambres/ActifAndEtat?actif=true&etat=true`;
            XHRSelectEtat.traitement_succes = function (XHRresponse) {
                let columnsEtat = null;
                let champsEtat = [
                    {title: "designationAr", width: "100%"}
                ];
                let data_SelectEtat = sb.selectObject();
                data_SelectEtat.element = "etatChambre";
                data_SelectEtat.response = JSON.parse(XHRresponse);
                data_SelectEtat.columns = columnsEtat;
                data_SelectEtat.champs = champsEtat;
                data_SelectEtat.champsSelection = "designationAr";
                data_SelectEtat.boutonAjoutRapide = false;

                sb.notify({
                    type: 'createSelect',
                    data: data_SelectEtat
                });
            };
            let xhrSelectEtat = sb.openXhr(XHRSelectEtat);
            xhrSelectEtat.send();
            /* Fin Etat */
            /* Lits INPUT CHAMBRE + INPUT NBRE LITS*/
            let inputNbreLit = activeSideBar.querySelector("#nbrLit");
            inputNbreLit.addEventListener("change", function () {
                let nbreLit = parseInt(activeSideBar.querySelector("#nbrLit").value);
                if (nbreLit <= 30 && nbreLit > 0) {
                    MajChambre_object.chargerLit([], true);
                } else {
                    MajChambre_object.chargerLit([], false);
                    sb.addErreur(activeSideBar.querySelector("#nbrLit"));
                }
            }, true);
            let inputNumeroChambre = activeSideBar.querySelector("#numeroChambre");
            inputNumeroChambre.addEventListener("change", function () {
                let nbreLit = parseInt(activeSideBar.querySelector("#nbrLit").value);
                if (this.value !== "") {
                    activeSideBar.querySelector("#nbrLit").disabled = false;
                    if (nbreLit <= 30 && nbreLit > 0) {
                        MajChambre_object.chargerLit([], true);
                    } else {
                        MajChambre_object.chargerLit([], false);
                        sb.addErreur(activeSideBar.querySelector("#nbrLit"));
                    }
                } else {
                    MajChambre_object.chargerLit([], false);
                    activeSideBar.querySelector("#nbrLit").disabled = true;
                }

            }, true);
            /* Fin Lits */
        },
        chargerLit: function (data, update) {
            let nbreLit = parseInt(activeSideBar.querySelector("#nbrLit").value);
            let Lits;
            if (update) {
                let listLits = activeSideBar.querySelectorAll('#lit tbody tr');
                let listeLits = [];
                if (listLits[0].querySelector("td.dataTables_empty") === null) {
                    for (let i = 0; i < listLits.length; i++) {
                        listeLits.push([
                            activeSideBar.querySelector('#numeroChambre').value,
                            `${activeSideBar.querySelector('#numeroChambre').value}-${i + 1}`,
                            listLits[i].querySelector('td.actif input').checked
                        ]);

                    }
                }
                Lits = listeLits.splice(0, nbreLit);
                for (let i = Lits.length; i < nbreLit; i++) {
                    Lits.push([
                        activeSideBar.querySelector('#numeroChambre').value,
                        `${activeSideBar.querySelector('#numeroChambre').value}-${Lits.length + 1}`,
                        null,
                        true
                    ]);
                }
            } else {
                Lits = data;
            }
            let data_dataTables = sb.dataTablesObject();
            data_dataTables.table = "lit";
            data_dataTables.data = Lits;
            let columnsTitle = [
                ["Numéro chambre", "Room number", "رقم الغرفة"],
                ["Numéro lit", "Bed number", "رقم السرير"],
                ["Etat", "State", "حالة"],
                ["Actif", "Active", "فعال"]];
            data_dataTables.columns = [
                {title: columnsTitle[0][langue_index], width: "30%", className: "numChambre"},
                {
                    title: columnsTitle[1][langue_index],
                    className: "contenteditable numLit",
                    width: "30%",
                    test: function (value) {
                        let listLits = activeSideBar.querySelectorAll('#lit tbody tr');
                        let listeLits = [];
                        for (let i = 0; i < listLits.length; i++) {
                            listeLits.push(listLits[i].querySelector('td.numLit').innerHTML);
                        }
                        let cache = {};
                        let tableau = listeLits.filter(function (elem, index, array) {
                            return cache[elem] ? 0 : cache[elem] = 1;
                        });
                        let numeroChambre = activeSideBar.querySelector('#numeroChambre').value;
                        return value.length > 0 && value.indexOf(numeroChambre) >= 0 && tableau.length === listeLits.length;
                    }
                },
                {
                    title: columnsTitle[2][langue_index],
                    name: "actif",
                    className: "actif",
                    render: function (data) {
//                        let XHRSelectEtat = sb.XHRObject(sb);
//                        let data_SelectEtat = sb.selectObject();
//                        XHRSelectEtat.url = `${url_base}/etat-chambres/ActifAndEtat?actif=true&etat=true`;
//                        XHRSelectEtat.traitement_succes = function (XHRresponse) {
//                            let columnsEtat = null;
//                            let champsEtat = [
//                                {title: "designationAr", width: "100%"}
//                            ];
//                            data_SelectEtat.response = JSON.parse(XHRresponse);
//                            data_SelectEtat.columns = columnsEtat;
//                            data_SelectEtat.champs = champsEtat;
//                            data_SelectEtat.champsSelection = "designationAr";
//                            data_SelectEtat.boutonAjoutRapide = false;
//                        };
//                        let xhrSelectEtat = sb.openXhr(XHRSelectEtat);
//                        xhrSelectEtat.send();
                        return sb.render_dataTables_Select(data);
                    },
                    width: "20%"
                },
                {
                    title: columnsTitle[3][langue_index],
                    name: "etat",
                    className: "etat",
                    render: function (data, type) {
                        return sb.render_dataTables_boolean(data, type, data_dataTables.edition);
                    },
                    width: "20%"
                }
            ];
            data_dataTables.info = false;
            data_dataTables.buttonVisibility = false;
            data_dataTables.details_ligne = false;
            data_dataTables.searching = false;
            data_dataTables.filtreColonne = false;

            sb.notify({
                type: 'createDataTable',
                data: data_dataTables
            });
        },
        destroy: function () {
            MajChambre_object = null;
        },
        modification: function (chambre) {
            if (chambre.type === "Ajouter") {
                MajChambre_object.chargerLit([], false);
                let btnValider = activeSideBar.querySelector("#btnValiderChambre");
                btnValider.addEventListener("click", function () {
                    let Chambre = MajChambre_object.prepareChambre(chambre);
                    if (Chambre) {
                        MajChambre_object.validerAjout(Chambre);
                    } else {
                        return false;
                    }
                }, true);
            } else {
                let XHRSociete = sb.XHRObject(sb);
                XHRSociete.url = `${url_base}/chambres/${chambre.data.code}`;
                XHRSociete.async = false;
                XHRSociete.traitement_succes = function (XHRresponse) {
                    let response = JSON.parse(XHRresponse);

                    sb.notify({
                        type: "selectRowByObject",
                        data: {elementSelect: "codeCathegorie", object: response.codeCathegorie}
                    });

                    activeSideBar.querySelector("#actif").checked = response.actif;
                    activeSideBar.querySelector("#autorisAccompagant").checked = response.autorisAccompagant;
                    activeSideBar.querySelector("#virtuelle").checked = response.virtuelle;
                    sb.notify({
                        type: "selectRowByObject",
                        data: {elementSelect: "codeEtage", object: response.codeEtage}
                    });

                    sb.notify({
                        type: "selectRowByObject",
                        data: {elementSelect: "codeService", object: response.codeService}
                    });

                    sb.notify({
                        type: "selectRowByObject",
                        data: {elementSelect: "etatChambre", object: response.etatChambre}
                    });

                    activeSideBar.querySelector("#nbrLit").value = response.nbrLit;
                    activeSideBar.querySelector("#nbrLit").disabled = false;
                    activeSideBar.querySelector("#numeroChambre").value = response.numeroChambre;
                    let litCollection = response.litCollection;
                    let Lits = [];
                    for (let i = 0; i < litCollection.length; i++) {
                        Lits.push([
                            response.numeroChambre,
                            litCollection[i].numLit,
                            litCollection[i].actif
                        ]);
                    }
                    MajChambre_object.chargerLit(Lits, false);
                    let btnValider = activeSideBar.querySelector("#btnValiderChambre");
                    if (chambre.type === 'Delete') {
                        btnValider.addEventListener("click", function () {
                            MajChambre_object.validerDelete(chambre.data);
                        }, true);
                        let fieldset = activeSideBar.querySelectorAll('form#formChambre fieldset');
                        for (let i = 0; i < fieldset.length; i++) {
                            fieldset[i].setAttribute("disabled", "disabled");
                        }
                    } else if (chambre.type === 'Modif') {
                        btnValider.addEventListener("click", function () {
                            let Chambre = MajChambre_object.prepareChambre(chambre);
                            if (Chambre) {
                                MajChambre_object.validerModif(Chambre);
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
        validerModif: function (chambre) {
            let XHRValiderModifSociete = sb.XHRObject(sb);
            XHRValiderModifSociete.url = `${url_base}/chambres/`;
            XHRValiderModifSociete.method = "PUT";
            XHRValiderModifSociete.async = false;
            XHRValiderModifSociete.data = chambre;
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
                    data: "chambres"
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
            xhrValiderModifSociete.send(JSON.stringify(chambre));
        },
        validerDelete: function (data) {
            let XHRDeleteAjoutSociete = sb.XHRObject(sb);
            XHRDeleteAjoutSociete.url = `${url_base}/chambres/${data.code}`;
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
                    data: "chambres"
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
        validerAjout: function (chambre) {
            let XHRValiderAjoutSociete = sb.XHRObject(sb);
            XHRValiderAjoutSociete.url = `${url_base}/chambres/`;
            XHRValiderAjoutSociete.method = "POST";
            XHRValiderAjoutSociete.async = false;
            XHRValiderAjoutSociete.data = chambre;
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
                    data: "chambres"
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
            xhrValiderAjoutSociete.send(JSON.stringify(chambre));
        },
        prepareChambre: function (data) {
            let chambre = sb.serializeArrayForm("formChambre");
            let listLits = activeSideBar.querySelectorAll('#lit tbody tr');
            let listeLits = [];
            if (listLits[0].querySelector("td.dataTables_empty") === null) {
                let coef = activeSideBar.querySelectorAll('#lit tbody tr td.actif input:checked').length;
                for (let i = 0; i < listLits.length; i++) {
                    listeLits.push({
                        numLit: listLits[i].querySelector('td.numLit').innerHTML,
                        coefficient: listLits[i].querySelector('td.actif input').checked ? parseFloat(1 / coef) : 0,
                        actif: listLits[i].querySelector('td.actif input').checked,
                        etatLit: SelectedData["etatChambre"][0]
                    });
                }
            } else {
                sb.addErreur(activeSideBar.querySelector("#nbrLit"));
            }

            chambre.nbrLit = parseInt(chambre.nbrLit);
            chambre.actif = chambre.actif !== undefined;
            chambre.virtuelle = chambre.virtuelle !== undefined;
            chambre.autorisAccompagant = chambre.autorisAccompagant !== undefined;
            chambre.codeCathegorie = SelectedData["codeCathegorie"][0];
            chambre.codeEtage = SelectedData["codeEtage"][0];
            chambre.codeService = SelectedData["codeService"][0];
            chambre.etatChambre = SelectedData["etatChambre"][0];
            chambre.litCollection = listeLits;
            if (chambre.codeCathegorie === undefined) {
                sb.addErreur(activeSideBar.querySelector("#codeCathegorie"));
                return false;
            }
            if (chambre.codeEtage === undefined) {
                sb.addErreur(activeSideBar.querySelector("#codeEtage"));
                return false;
            }
            if (chambre.etatChambre === undefined) {
                sb.addErreur(activeSideBar.querySelector("#etatChambre"));
                return false;
            }
            if (chambre.codeService === undefined) {
                sb.addErreur(activeSideBar.querySelector("#codeService"));
                return false;
            }
            if (data.type === "Ajouter") {
                chambre.code = null;
                chambre.userCreation = null;
                chambre.dateCreation = null;
            } else if (data.type === "Modif") {
                chambre.code = data.data.code;
                chambre.userCreation = data.data.userCreation;
                chambre.dateCreation = data.data.dateCreation;
            }
            let validation = sb.jsonSchemaValidation(chambre, schema, "formChambre");
            if (validation.valid) {
                return chambre;
            } else {
                sb.afficherErreursFormulaire(validation, "formChambre");
            }
        }
    };
});

CORE.start("MajChambre");
