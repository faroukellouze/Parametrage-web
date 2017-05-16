CORE.create_module("MajSociete", function (sb) {
    let motifAjout_object;
    let AddContact, AddResponsable, AddAttachments;
    let langue_index = sb.getLanguageIndex();
    let activeSideBar = sb.getActiveSideBar();

    let schema = {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "title": "Société",
        "description": "A product from Acme's catalog",
        "type": "object",
        "required": ["codeSaisie", "designation", "rib", "seuilCredit", "seuilCreditAlerte", "delaisFacturation", "delaisReglement", "observation"],
        "properties": {
            "codeSaisie": {
                "type": "string",
                "$ref": "#/definitions/minLength"
            },
            "designation": {
                "type": "string",
                "$ref": "#/definitions/minLength"
            },
            "seuilCredit": {
                "type": "number",
                "$ref": "#/definitions/minLength",
                "minimum": 0
            },
            "seuilCreditAlerte": {
                "type": "number",
                "$ref": "#/definitions/minLength",
                "minimum": 0
            },
            "delaisFacturation": {
                "type": "number",
                "$ref": "#/definitions/minLength",
                "minimum": 0,
                "exclusiveMinimum": true
            },
            "delaisReglement": {
                "type": "number",
                "$ref": "#/definitions/minLength",
                "minimum": 0,
                "exclusiveMinimum": true
            },
            "rib": {
                "type": "string",
                "$ref": "#/definitions/minLength"
            },
            "observation": {
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
            motifAjout_object = this;

            sb.listen({
                "Societe": this.modification
            });

            /* Secteur d'activité */
            let XHRSelectSecteurActivite = sb.XHRObject(sb);
            XHRSelectSecteurActivite.url = `${url_base}/secteur-activites/actif?actif=true`;
            XHRSelectSecteurActivite.traitement_succes = function (XHRresponse) {
                let columnsSecteurActivite = null;
                let champsSecteurActivite = [
                    {title: "designation", width: "100%"}
                ];
                let data_SelectSecteurActivite = sb.selectObject();
                data_SelectSecteurActivite.element = "SelectSecteurActivite";
                data_SelectSecteurActivite.response = JSON.parse(XHRresponse);
                data_SelectSecteurActivite.columns = columnsSecteurActivite;
                data_SelectSecteurActivite.champs = champsSecteurActivite;
                data_SelectSecteurActivite.width = "300px";
                data_SelectSecteurActivite.champsSelection = "designation";
                data_SelectSecteurActivite.ajoutRapide = motifAjout_object.traitementAjoutRapide("ajoutRapide", "GET", `${url_base}/secteur-activites`, "POST", XHRSelectSecteurActivite, data_SelectSecteurActivite);

                sb.notify({
                    type: 'createSelect',
                    data: data_SelectSecteurActivite
                });
            };
            let xhrSelectSecteurActivite = sb.openXhr(XHRSelectSecteurActivite);
            xhrSelectSecteurActivite.send();
            /* Fin Secteur d'activité */

            /* Banque */
            let XHRSelectBank = sb.XHRObject(sb);
            XHRSelectBank.url = `${url_base}/banques/actif?actif=true`;
            XHRSelectBank.traitement_succes = function (XHRresponse) {
                let columnsBanque = null;
                let champsBanque = [
                    {title: "designation", width: "100%"}
                ];
                let data_SelectBanque = sb.selectObject();
                data_SelectBanque.element = "SelectBank";
                data_SelectBanque.response = JSON.parse(XHRresponse);
                data_SelectBanque.columns = columnsBanque;
                data_SelectBanque.champs = champsBanque;
                data_SelectBanque.champsSelection = "designation";
                data_SelectBanque.width = "300px";
                data_SelectBanque.ajoutRapide = motifAjout_object.traitementAjoutRapide("ajoutRapide", "GET", `${url_base}/banques`, "POST", XHRSelectBank, data_SelectBanque);

                sb.notify({
                    type: 'createSelect',
                    data: data_SelectBanque
                });
            };
            let xhrSelectBanque = sb.openXhr(XHRSelectBank);
            xhrSelectBanque.send();
            /* Fin Banque */

            /* Mode reglements */
            let XHRSelectModeReglement = sb.XHRObject(sb);
            XHRSelectModeReglement.url = `${url_base}/mode-reglements/actif?actif=true`;
            XHRSelectModeReglement.traitement_succes = function (XHRresponse) {
                let columnsModeReglement = null;
                let champsModeReglement = [
                    {title: "designation", width: "100%"}
                ];
                let data_SelectModeReglement = sb.selectObject();
                data_SelectModeReglement.element = "SelectRegulationMode";
                data_SelectModeReglement.response = JSON.parse(XHRresponse);
                data_SelectModeReglement.columns = columnsModeReglement;
                data_SelectModeReglement.champs = champsModeReglement;
                data_SelectModeReglement.champsSelection = "designation";
                data_SelectModeReglement.width = "300px";
                data_SelectModeReglement.ajoutRapide = motifAjout_object.traitementAjoutRapide("ajoutRapide", "GET", `${url_base}/mode-reglements`, "POST", XHRSelectModeReglement, data_SelectModeReglement);

                sb.notify({
                    type: 'createSelect',
                    data: data_SelectModeReglement
                });
            };
            let xhrSelectModeReglement = sb.openXhr(XHRSelectModeReglement);
            xhrSelectModeReglement.send();
            /* Fin Mode reglements */

            AddContact = activeSideBar.querySelector("#contact div a.add-contact");
            AddContact.addEventListener("click", motifAjout_object.addContact, true);
            AddResponsable = activeSideBar.querySelector("#responsable div a.add-responsable");
            AddResponsable.addEventListener("click", motifAjout_object.addResponsable, true);
            AddAttachments = activeSideBar.querySelector("#attachments");

            /* Pièces jointes */
            let XHRTypePieceJointeBordereaux = sb.XHRObject(sb);
            XHRTypePieceJointeBordereaux.url = `${url_base}/type-piece-jointe-bordereaux/actif?actif=true`;
            XHRTypePieceJointeBordereaux.traitement_succes = function (XHRresponse) {
                let data_dataTables = sb.dataTablesObject();
                data_dataTables.table = "attachmentsPiece";
                JSON.parse(XHRresponse).forEach(function (item) {
                    let element = [];
                    element[0] = item.code;
                    element[1] = item.designation;
                    element[2] = 1;
                    element[3] = false;
                    element[4] = item;
                    data_dataTables.data.push(element);
                });
                let columnsTitle = [];
                columnsTitle[0] = ["code", "code", "الرمز"];
                columnsTitle[1] = ["Désignation", "Designation", "التسمية"];
                columnsTitle[2] = ["Nombre", "Number", "عدد"];
                columnsTitle[3] = ["", "", ""];
                data_dataTables.columns = [
                    {title: columnsTitle[0][langue_index], className: "code hidden"},
                    {title: columnsTitle[1][langue_index], width: "60%", className: "designation"},
                    {
                        title: columnsTitle[2][langue_index],
                        className: "contenteditable number",
                        width: "20%",
                        test: function (value) {
                            return Number.isInteger(parseFloat(value)) && value > 0;
                        }
                    },
                    {
                        title: columnsTitle[3][langue_index],
                        render: function (data, type) {
                            return sb.render_dataTables_boolean(data, type, data_dataTables.edition);
                        }
                        , width: "20%",
                        className: "checked"
                    },
                    {
                        title: "rowData",
                        visible: false
                    }
                ];
                data_dataTables.order = [
                    [0, 'asc']
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

            };
            let xhrTypePieceJointeBordereaux = sb.openXhr(XHRTypePieceJointeBordereaux);
            xhrTypePieceJointeBordereaux.send();
            /* Fin Pièces jointes */
        },
        destroy: function () {
            motifAjout_object = null;
        },
        addResponsable: function (e) {
            let random = new Date().getTime();
            let id = e.currentTarget;
            let parent = id.parentElement;
            let pos = id.parentElement.parentElement;
            parent.remove();

            let contact = document.createElement('fieldset');
            contact.setAttribute("style", "flex:4;padding: 5px;");
            contact.setAttribute("class", "responsable");

            let dataTemplate;
            if (langue_index === "2") {
                dataTemplate = {nom: "المسؤول", metier: "الوظيفة", ajoutContact: "اظافة الإتصال", random: random};
            } else if (langue_index === "1") {
                dataTemplate = {nom: "Name", metier: "Profession", ajoutContact: "Add contact", random: random};
            } else if (langue_index === "0") {
                dataTemplate = {nom: "Nom", metier: "Métier", ajoutContact: "Ajouter contact", random: random};
            }

            let template = '<i class="glyphicon glyphicon-remove remove-responsable"></i>' +
                    '<div style="display: flex;flex-direction: row;justify-content: space-between;">' +
                    '<section style="flex:2;display: flex;flex-direction: row;justify-content: space-between;">' +
                    '<label class="control-label" style="flex:1;">{{nom}}</label>' +
                    '<div class="control-input" style="flex:2;">' +
                    '<input type="text" class="form-control-csys input-xs">' +
                    '</div>' +
                    '</section>' +
                    '<section style="flex:3;display: flex;flex-direction: row;justify-content: space-between;">' +
                    '<label class="control-label" style="flex:1;">{{metier}}</label>' +
                    '<div class="control-input" style="flex:2;" id="SelectProfession{{random}}">' +
                    '</div>' +
                    '</section>' +
                    '</div>' +
                    '<div  style="display: flex;flex-direction: row;justify-content: space-between;">' +
                    '<a class="add-contact"><i class="fa fa-plus fa-lg-csys"></i>{{ajoutContact}}</a>' +
                    '</div>';

            contact.innerHTML = sb.renderTemplate(template, dataTemplate);
            pos.appendChild(contact);

            let AddResponsable = document.createElement('div');
            AddResponsable.setAttribute("style", "display: flex;flex-direction: row;justify-content: space-between;");
            dataTemplate = {};
            if (langue_index === "2") {
                dataTemplate = {ajoutResponsable: "اظافة مسؤول"};
            } else if (langue_index === "1") {
                dataTemplate = {ajoutResponsable: "Add responsible"};
            } else if (langue_index === "0") {
                dataTemplate = {ajoutResponsable: "Ajouter responsable"};
            }

            template = '<a class="add-responsable"><i class="fa fa-plus fa-lg-csys"></i>{{ajoutResponsable}}</a>';
            AddResponsable.innerHTML = sb.renderTemplate(template, dataTemplate);
            pos.appendChild(AddResponsable);

            let addResponsable = pos.querySelector("div a.add-responsable");
            addResponsable.addEventListener("click", motifAjout_object.addResponsable, true);
            let removeResponsable = pos.querySelectorAll("div fieldset div i.remove-responsable");
            for (let i = 0; i < removeResponsable.length; i++) {
                removeResponsable[i].addEventListener("click", motifAjout_object.removeResponsable, true);
            }

            let addContact = pos.querySelectorAll("div fieldset a.add-contact");
            for (let i = 0; i < removeResponsable.length; i++) {
                addContact[i].addEventListener("click", motifAjout_object.addContact, true);
            }

            let XHRSelectProfession = sb.XHRObject(sb);
            XHRSelectProfession.url = `${url_base}/fonction-responsable-societes/actif?actif=true`;
            XHRSelectProfession.async = false;
            XHRSelectProfession.traitement_succes = function (XHRresponse) {
                let columnsProfession = null;
                let champsProfession = [
                    {title: "designation", width: "100%"}
                ];
                let data_SelectProfession = sb.selectObject();
                data_SelectProfession.element = "SelectProfession" + random;
                data_SelectProfession.response = JSON.parse(XHRresponse);
                data_SelectProfession.columns = columnsProfession;
                data_SelectProfession.champs = champsProfession;
                data_SelectProfession.champsSelection = "designation";
                data_SelectProfession.width = "300px";
                data_SelectProfession.ajoutRapide = motifAjout_object.traitementAjoutRapide("ajoutRapide", "GET", `${url_base}/fonction-responsable-societes`, "POST", XHRSelectProfession, data_SelectProfession);

                sb.notify({
                    type: 'createSelect',
                    data: data_SelectProfession
                });
            };
            let xhrSelectProfession = sb.openXhr(XHRSelectProfession);
            xhrSelectProfession.send();
        },
        addContact: function (e) {
            let random = new Date().getTime();
            let id = e.currentTarget;
            let parent = id.parentElement;
            let pos = id.parentElement.parentElement;
            parent.remove();

            let contact = document.createElement('div');
            contact.setAttribute("class", "contact");
            contact.setAttribute("style", "display: flex;flex-direction: row;justify-content: space-between;");
            contact.innerHTML = '<section style="flex:4;display: flex;flex-direction: row;justify-content: space-between;"><div class="control-input" style="flex:2;" id="SelectContactType' + random + '"></div></section><section style="flex:10;display: flex;flex-direction: row;justify-content: space-between;"><input type="text" class="form-control-csys input-xs"></div></section><section style="flex:1;display: flex;flex-direction: row;justify-content: space-between;"><i class="glyphicon glyphicon-remove remove-contact"></i></section>';
            pos.appendChild(contact);

            let Addcontact = document.createElement('div');
            Addcontact.setAttribute("style", "display: flex;flex-direction: row;justify-content: space-between;");
            if (langue_index === "2") {
                Addcontact.innerHTML = '<a class="add-contact"><i class="fa fa-plus fa-lg-csys"></i><spring:message code="i.addContact"/>اظافة الإتصال</a>';
            } else if (langue_index === "1") {
                Addcontact.innerHTML = '<a class="add-contact"><i class="fa fa-plus fa-lg-csys"></i><spring:message code="i.addContact"/>Add contact</a>';
            } else if (langue_index === "0") {
                Addcontact.innerHTML = '<a class="add-contact"><i class="fa fa-plus fa-lg-csys"></i><spring:message code="i.addContact"/>Ajouter contact</a>';
            }
            pos.appendChild(Addcontact);

            let addContact = pos.querySelector("div a.add-contact");
            addContact.addEventListener("click", motifAjout_object.addContact, true);
            let removeContact = pos.querySelectorAll("div div section i.remove-contact");
            for (let i = 0; i < removeContact.length; i++) {
                removeContact[i].addEventListener("click", motifAjout_object.removeContact, true);
            }

            let XHRSelectTypeContact = sb.XHRObject(sb);
            XHRSelectTypeContact.url = `${url_base}/type-contactes/actif?actif=true`;
            XHRSelectTypeContact.async = false;
            XHRSelectTypeContact.traitement_succes = function (XHRresponse) {
                let columnsTypeContact = null;
                let champsTypeContact = [
                    {title: "designation", width: "100%"}
                ];
                let data_SelectTypeContact = sb.selectObject();
                data_SelectTypeContact.element = "SelectContactType" + random;
                data_SelectTypeContact.response = JSON.parse(XHRresponse);
                data_SelectTypeContact.columns = columnsTypeContact;
                data_SelectTypeContact.champs = champsTypeContact;
                data_SelectTypeContact.champsSelection = "designation";
                data_SelectTypeContact.width = "150px";
                data_SelectTypeContact.searchVisibility = false;
                data_SelectTypeContact.ajoutRapide = motifAjout_object.traitementAjoutRapide("ajoutRapide", "GET", `${url_base}/type-contactes`, "POST", XHRSelectTypeContact, data_SelectTypeContact);

                sb.notify({
                    type: 'createSelect',
                    data: data_SelectTypeContact
                });
            };
            let xhrSelectTypeContact = sb.openXhr(XHRSelectTypeContact);
            xhrSelectTypeContact.send();
        },
        removeContact: function (e) {
            let id = e.currentTarget;
            let pos = id.parentElement.parentElement;
            pos.remove();
        },
        removeResponsable: function (e) {
            let id = e.currentTarget;
            let pos = id.parentElement;
            pos.remove();
        },
        modification: function (societe) {
            if (societe.type === "Ajouter") {
                let btnValider = activeSideBar.querySelector("#btnValiderSociete");
                btnValider.addEventListener("click", function () {
                    let Societe = motifAjout_object.prepareSociete(societe);
                    if (Societe) {
                        motifAjout_object.validerAjout(Societe);
                    } else {
                        return false;
                    }
                }, true);
            } else {
                let XHRSociete = sb.XHRObject(sb);
                XHRSociete.url = `${url_base}/societes/${societe.data.code}`;
                XHRSociete.async = false;
                XHRSociete.traitement_succes = function (XHRresponse) {
                    let response = JSON.parse(XHRresponse);
                    activeSideBar.querySelector("#codeSaisie").value = response.codeSaisie;
                    activeSideBar.querySelector("#designation").value = response.designation;
                    sb.notify({
                        type: "selectRowByObject",
                        data: {elementSelect: "SelectSecteurActivite", object: response.codeSecteurActivite}
                    });
                    activeSideBar.querySelector("#thresholdCredit").value = parseFloat(response.seuilCredit);
                    activeSideBar.querySelector("#thresholdCreditAlert").value = parseFloat(response.seuilCreditAlerte);
                    activeSideBar.querySelector("#deadlinesBilling").value = parseInt(response.delaisFacturation);
                    activeSideBar.querySelector("#deadlinesPayment").value = parseInt(response.delaisReglement);
                    activeSideBar.querySelector("#timbre").checked = response.timbre;
                    activeSideBar.querySelector('input[name=calculDifferencePrix][value=C]').checked = false;
                    activeSideBar.querySelector('input[name=calculDifferencePrix][value=S]').checked = false;
                    activeSideBar.querySelector('input[name=calculDifferencePrix][value=' + response.calculDifferencePrix + ']').checked = true;
                    activeSideBar.querySelector('input[name=niveauBordereau][value=C]').checked = false;
                    activeSideBar.querySelector('input[name=niveauBordereau][value=S]').checked = false;
                    activeSideBar.querySelector('input[name=niveauBordereau][value=' + response.niveauBordereau + ']').checked = true;
                    sb.notify({
                        type: "selectRowByObject",
                        data: {elementSelect: "SelectRegulationMode", object: response.codeModeReglement}
                    });
                    sb.notify({
                        type: "selectRowByObject",
                        data: {elementSelect: "SelectBank", object: response.codeBanque}
                    });
                    activeSideBar.querySelector("#rib").value = response.rib;
                    let listeContact = response.contactSocieteCollection;
                    for (let i = 0; i < listeContact.length; i++) {
                        activeSideBar.querySelector("#contact .add-contact").click();
                        let contact = activeSideBar.querySelectorAll("#contact .contact")[activeSideBar.querySelectorAll("#contact .contact").length - 1];
                        let idSelect = contact.querySelectorAll("section div")[0].getAttribute('id');
                        sb.notify({
                            type: "selectRowByObject",
                            data: {elementSelect: idSelect, object: listeContact[i].codeTypeContact}
                        });
                        contact.querySelectorAll("section input")[1].value = listeContact[i].valeur;
                    }
                    let listeResponsable = response.responsableSocieteCollection;
                    for (let i = 0; i < listeResponsable.length; i++) {
                        activeSideBar.querySelector("#responsable .add-responsable").click();
                        let responsable = activeSideBar.querySelectorAll("#responsable .responsable")[activeSideBar.querySelectorAll("#responsable .responsable").length - 1];
                        let idSelect = responsable.querySelectorAll("section div")[1].getAttribute('id');
                        sb.notify({
                            type: "selectRowByObject",
                            data: {
                                elementSelect: idSelect,
                                object: listeResponsable[i].codeFonctionResponsableSociete
                            }
                        });
                        responsable.querySelectorAll("section div input")[0].value = listeResponsable[i].nomResponsable;

                        let listeContactResponsable = listeResponsable[i].codeTypeContact;
                        for (let j = 0; j < listeContactResponsable.length; j++) {
                            responsable.querySelector(".add-contact").click();
                            let contactResponsable = responsable.querySelectorAll(".contact")[responsable.querySelectorAll(".contact").length - 1];
                            let idSelect = contactResponsable.querySelectorAll("section div")[0].getAttribute('id');
                            sb.notify({
                                type: "selectRowByObject",
                                data: {
                                    elementSelect: idSelect,
                                    object: listeContactResponsable[j].codeTypeContact
                                }
                            });
                            contactResponsable.querySelectorAll("section input")[1].value = listeContactResponsable[j].valeur;
                        }
                    }

                    activeSideBar.querySelector("#observation").value = response.observation;
                    let listPieceJointe = activeSideBar.querySelectorAll('#attachmentsPiece tbody tr');
                    let listePieceJointe = response.pieceJointeBordereauSocieteCollection;
                    for (let k = 0; k < listePieceJointe.length; k++) {
                        for (let j = 0; j < listPieceJointe.length; j++) {
                            if (parseInt(listPieceJointe[j].querySelector('td.code').innerHTML) === listePieceJointe[k].codeTypePieceJointe.code) {
                                listPieceJointe[j].querySelector('td.checked input').checked = true;
                                listPieceJointe[j].querySelector('td.number').innerHTML = listePieceJointe[k].nombre;
                            }
                        }
                    }

                    let btnValider = activeSideBar.querySelector("#btnValiderSociete");
                    if (societe.type === 'Delete') {
                        btnValider.addEventListener("click", function () {
                            motifAjout_object.validerDelete(societe.data);
                        }, true);
                        let fieldset = activeSideBar.querySelectorAll('form#formSociete fieldset');
                        for (let i = 0; i < fieldset.length; i++) {
                            fieldset[i].setAttribute("disabled", "disabled");
                        }
                    } else if (societe.type === 'Modif') {
                        btnValider.addEventListener("click", function () {
                            let Societe = motifAjout_object.prepareSociete(societe);
                            if (Societe) {
                                motifAjout_object.validerModif(Societe);
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
        validerModif: function (societe) {
            let XHRValiderModifSociete = sb.XHRObject(sb);
            XHRValiderModifSociete.url = `${url_base}/societes`;
            XHRValiderModifSociete.method = "PUT";
            XHRValiderModifSociete.async = false;
            XHRValiderModifSociete.data = societe;
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
                    data: "societes"
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
            xhrValiderModifSociete.send(JSON.stringify(societe));
        },
        validerDelete: function (data) {
            let XHRDeleteAjoutSociete = sb.XHRObject(sb);
            XHRDeleteAjoutSociete.url = `${url_base}/societes/${data.code}`;
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
                    data: "societes"
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
        validerAjout: function (societe) {
            let XHRValiderAjoutSociete = sb.XHRObject(sb);
            XHRValiderAjoutSociete.url = `${url_base}/societes`;
            XHRValiderAjoutSociete.method = "POST";
            XHRValiderAjoutSociete.async = false;
            XHRValiderAjoutSociete.data = societe;
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
                    data: "societes"
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
            xhrValiderAjoutSociete.send(JSON.stringify(societe));
        },
        prepareSociete: function (data) {
            let societe = sb.serializeArrayForm("formSociete");

            let listContact = activeSideBar.querySelectorAll("#contact .contact");
            let listeContact = [];
            for (let i = 0; i < listContact.length; i++) {
                let idSelect = listContact[i].querySelectorAll("section div")[0].getAttribute('id');
                let typeContact = SelectedData[idSelect][0];
                if (typeContact === undefined) {
                    sb.addErreur(listContact[i].querySelectorAll("section div")[0]);
                    return false;
                }
                let valeurContact = listContact[i].querySelectorAll("section input")[1].value;
                if (!valeurContact) {
                    sb.addErreur(listContact[i].querySelectorAll("section div input")[1]);
                    return false;
                }
                let contact = {};
                contact["codeTypeContact"] = typeContact;
                contact["valeur"] = valeurContact;
                listeContact.push(contact);
            }
            let listResponsable = activeSideBar.querySelectorAll("#responsable .responsable");
            let listeResponsable = [];
            for (let i = 0; i < listResponsable.length; i++) {
                let idSelect = listResponsable[i].querySelectorAll("section div")[1].getAttribute('id');
                let typeResponsable = SelectedData[idSelect][0];
                if (typeResponsable === undefined) {
                    sb.addErreur(listResponsable[i].querySelectorAll("section div")[1]);
                    return false;
                }
                let nameResponsable = listResponsable[i].querySelectorAll("section div input")[0].value;
                if (!nameResponsable) {
                    sb.addErreur(listResponsable[i].querySelectorAll("section div input")[0]);
                    return false;
                }
                let listContactResponsable = listResponsable[i].querySelectorAll("div.contact");
                let listeContactResponsable = [];
                for (let j = 0; j < listContactResponsable.length; j++) {
                    let idSelectResponsable = listContactResponsable[j].querySelectorAll("section div")[0].getAttribute('id');
                    let typeContactResponsable = SelectedData[idSelectResponsable][0];
                    if (typeContactResponsable === undefined) {
                        sb.addErreur(listContactResponsable[j].querySelectorAll("section div")[0]);
                        return false;
                    }
                    let valeurContactResponsable = listContactResponsable[j].querySelectorAll("section input")[1].value;
                    if (!valeurContactResponsable) {
                        sb.addErreur(listContactResponsable[j].querySelectorAll("section div input")[1]);
                        return false;
                    }
                    let contactResponsable = {};
                    contactResponsable["codeTypeContact"] = typeContactResponsable;
                    contactResponsable["valeur"] = valeurContactResponsable;
                    listeContactResponsable.push(contactResponsable);
                }

                let responsable = {};
                responsable["codeFonctionResponsableSociete"] = typeResponsable;
                responsable["nomResponsable"] = nameResponsable;
                responsable["codeTypeContact"] = listeContactResponsable;
                listeResponsable.push(responsable);
            }

            let listPieceJointe = activeSideBar.querySelectorAll('#attachmentsPiece tbody tr');
            let listePieceJointe = [];
            for (let i = 0; i < listPieceJointe.length; i++) {
                if (listPieceJointe[i].querySelector('td.checked input').checked === true) {
                    let pieceJointe = {};
                    let typePieceJointe = {};
                    typePieceJointe["code"] = parseInt(listPieceJointe[i].querySelector('td.code').innerHTML);
                    typePieceJointe["designation"] = listPieceJointe[i].querySelector('td.designation').innerHTML;
                    pieceJointe["codeTypePieceJointe"] = typePieceJointe;
                    pieceJointe["nombre"] = parseInt(listPieceJointe[i].querySelector('td.number').innerHTML);
                    listePieceJointe.push(pieceJointe);
                }

            }

            societe.delaisFacturation = parseInt(societe.delaisFacturation);
            societe.delaisReglement = parseInt(societe.delaisReglement);
            societe.seuilCredit = parseFloat(societe.seuilCredit);
            societe.seuilCreditAlerte = parseFloat(societe.seuilCreditAlerte);
            societe.actif = societe.actif !== undefined;
            societe.timbre = societe.timbre !== undefined;
            societe.codeSecteurActivite = SelectedData["SelectSecteurActivite"][0];
            societe.codeModeReglement = SelectedData["SelectRegulationMode"][0];
            societe.codeBanque = SelectedData["SelectBank"][0];
            societe.contactSocieteCollection = listeContact;
            societe.responsableSocieteCollection = listeResponsable;
            societe.pieceJointeBordereauSocieteCollection = listePieceJointe;

            //TODO à inséere au schéma
            let arregex = /[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufc3f]|[\ufe70-\ufefc]/;
            if (arregex.test(societe.codeSaisie)) {
                sb.addErreur(activeSideBar.querySelector("#codeSaisie"));
                return false;
            }
            //TODO dependencies
            if (societe.seuilCredit > societe.seuilCreditAlerte) {
                sb.addErreur(activeSideBar.querySelector("#thresholdCredit"));
                sb.addErreur(activeSideBar.querySelector("#thresholdCreditAlert"));
                return false;
            }
            
            
            if (societe["codeSecteurActivite"] === undefined) {
                sb.addErreur(activeSideBar.querySelector("#SelectSecteurActivite"));
                return false;
            }
            
            
            if (societe["codeBanque"] === undefined) {
                sb.addErreur(activeSideBar.querySelector("#SelectBank"));
                return false;
            }
            
            
            if (societe["codeModeReglement"] === undefined) {
                sb.addErreur(activeSideBar.querySelector("#SelectRegulationMode"));
                return false;
            }
            if (data.type === "Ajouter") {
                societe.code = null;
                societe.userCreation = null;
                societe.dateCreation = null;
            } else if (data.type === "Modif") {
                societe.code = data.data.code;
                societe.userCreation = data.data.userCreation;
                societe.dateCreation = data.data.dateCreation;
            }

            console.log(societe);
            let validation = sb.jsonSchemaValidation(societe, schema, "formSociete");
            if (validation.valid) {
                return societe;
            } else {
                sb.afficherErreursFormulaire(validation, "formSociete");
            }
        },
        traitementAjoutRapide: function (urlAjoutRapide, methodAjoutRapide, urlValiderAjoutRapide, methodValiderAjoutRapide, XHRselect, dataselect) {
            return function func() {
                let XHRModal = sb.XHRObject(sb);
                XHRModal.url = urlAjoutRapide;
                XHRModal.method = methodAjoutRapide;
                XHRModal.traitement_succes = function (XHRresponse) {
                    let response = XHRresponse;
                    if (response) {
                        document.querySelectorAll("#modalAjoutRapide .modal-body")[0].innerHTML = response;
                        $("#modalAjoutRapide").modal("show");

                        let new_saveAjoutRapide = sb.cloneElement(document.querySelectorAll("#modalAjoutRapide .modal-footer #saveAjoutRapide")[0]);
                        new_saveAjoutRapide.addEventListener("click", function () {
                            let XHRAjout = sb.XHRObject(sb);
                            XHRAjout.url = urlValiderAjoutRapide;
                            XHRAjout.method = methodValiderAjoutRapide;
                            XHRAjout.data = {
                                code: null,
                                designation: document.querySelectorAll("#modalAjoutRapide form input")[0].value,
                                actif:true
                            };
                            XHRAjout.traitement_succes = function (XHRresponse) {
                                let xhrselect = sb.openXhr(XHRselect);
                                xhrselect.send();

                                setTimeout(function () {
                                    sb.notify({
                                        type: "selectRowByObject",
                                        data: {
                                            elementSelect: dataselect.element,
                                            object: JSON.parse(XHRresponse)
                                        }
                                    });
                                }, 100);

                                sb.notify({
                                    type: "showMessage",
                                    data: {
                                        title: "Avertissement",
                                        numMsg: 26,
                                        typeMsg: "Succes",
                                        delai: 5000
                                    }
                                });
                            };
                            let xhrAjout = sb.openXhr(XHRAjout);
                            xhrAjout.send(JSON.stringify(XHRAjout.data));

                            $("#modalAjoutRapide").modal("hide");
                        }, true);
                    } else {
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
                let xhrModal = sb.openXhr(XHRModal);
                xhrModal.send();
            }
        }
    };
});

CORE.start("MajSociete");
