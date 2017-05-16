CORE.create_module("Chambre", function (sb) {
    let Chambre_object;
    let url_ajout = "MajChambre";
    let langue_index = sb.getLanguageIndex();

    return {
        init: function () {
            Chambre_object = this;

            sb.listen({
                "filter-actif-chambres": this.charger_tableau,
                "refresh-datatables-chambres": this.charger_tableau
            });

            CORE.start("dataTable");
            CORE.start("bntContainer");
            CORE.start("select");
            CORE.start("filtre_actif");

            Chambre_object.charger_tableau({
                type: "true,false"
            });
        },
        destroy: function () {
        },
        /**
         * Récupérer les données du tableau et les passer à la méthode prepareData()
         * @author nadir
         * @param type filtre (actif / inactif / tous)
         */
        charger_tableau: function (type) {
            let XHRTable = sb.XHRObject(sb);
            XHRTable.url = `${url_base}/chambres/actif?actif=${type.type}`;
            XHRTable.traitement_succes = function (responseText) {
                let response = JSON.parse(responseText);
                if (response) {
                    Chambre_object.prepareData(response, type.mode);
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
            let xhrTable = sb.openXhr(XHRTable);
            xhrTable.send();
        },
        /**
         * Préparer l'objet et le passer à D
         * @author nadir
         * @param rawData récupéré de la BD
         * @example
         * data_dataTables = {
         table: "",
         data: [],
         columns: [],
         detailColumns: [],
         autoWidthSince: false,
         order: [],
         pagination: false,
         colReorder: true,
         group: false,
         edition: true,
         info: true,
         details_ligne: true,
         buttonVisibility: true,
         searching: true
         };
         */
        prepareData: function (rawData, mode) {
            let data_dataTables = sb.dataTablesObject();
            data_dataTables.table = "_grid_ListChambre";

            rawData.forEach(function (item) {
                data_dataTables.data.push([
                    item.codeService.designation,
                    item.numeroChambre,
                    item.codeCathegorie.designation,
                    item.codeEtage.designation,
                    item.etatChambre,
                    item.virtuelle,
                    item.autorisAccompagant,
                    item.actif,
                    item]);
            });

            if (mode !== "refresh") {
                let columnsTitle = [
                    ["Service", "Service", "خدمة"],
                    ["Numéro chambre", "Room number", "رقم الغرفة"],
                    ["Catégorie", "Category", "الصنف"],
                    ["Etage", "Plancher", "طابق"],
                    ["Etat", "State", "حالة"],
                    ["Virtuelle", "Virtual", "افتراضية "],
                    ["Autoriser accompagnant", "Authorize Accompanying", "إذن المرافق"],
                    ["Actif", "Active", "فعال"]];
                data_dataTables.columns = [
                    {
                        title: columnsTitle[0][langue_index],
                        name: "service",
                        width: "15%"
                    },
                    {
                        title: columnsTitle[1][langue_index],
                        name: "numero",
                        width: "10%"
                    },
                    {
                        title: columnsTitle[2][langue_index],
                        name: "category",
                        width: "20%"
                    },
                    {
                        title: columnsTitle[3][langue_index],
                        name: "etage",
                        width: "15%"
                    },
                    {
                        title: columnsTitle[4][langue_index],
                        name: "etat",
                        width: "10%",
                        columnFiltre: "designation",
                        render: function (data, type) {
                            return '<label class="filtreCouleur" style="border-left-color: ' + data.couleur + '"><span>' + data.designation + '</span></label>';
//                            '<label class="btn btn-info filtreCouleur" style="background-color: ' + data.coleur + ';">' + data.designation + '</label>';
                        }
                    },
                    {
                        title: columnsTitle[5][langue_index],
                        name: "virtual",
                        render: function (data, type) {
                            if (type === "display")
                                return sb.render_dataTables_boolean(data, type, data_dataTables.edition);
                            else
                                return data;
                        },
                        width: "5%"
                    },
                    {
                        title: columnsTitle[6][langue_index],
                        name: "accompagnant",
                        render: function (data, type) {
                            if (type === "display")
                                return sb.render_dataTables_boolean(data, type, data_dataTables.edition);
                            else
                                return data;
                        },
                        width: "10%"
                    },
                    {
                        title: columnsTitle[7][langue_index],
                        name: "actif",
                        defaultContent: "",
                        render: function (data, type) {
                            if (type === "display")
                                return sb.render_dataTables_boolean(data, type, data_dataTables.edition);
                            else
                                return data;
                        },
                        width: "5%"
                    },
                    {
                        title: "rowData",
                        visible: false
                    }
                ];

                data_dataTables.order = [
                    [1, "asc"]
                ];

                data_dataTables.pagination = true;
                data_dataTables.pageLength = 20;
                data_dataTables.group = ["service:name"];
                data_dataTables.filtreColonne = true;

                data_dataTables.ajout = function () {
                    let title = ["Ajouter chambre", "Add room", "اظافة غرفة"];
                    let widthSideBar = "55%";
                    let XHR = sb.XHRObject(sb);
                    XHR.url = url_ajout;
                    XHR.traitement_succes = function (responseText) {
                        let response = responseText;
                        if (response) {
                            let callback = function callback() {
                                sb.notify({
                                    type: "Chambre",
                                    data: {data: null, type: "Ajouter"}
                                });
                            };

                            sb.showSideBar(response, widthSideBar, title[langue_index], callback);
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
                    let xhr = sb.openXhr(XHR);
                    xhr.send();
                };

                data_dataTables.modif = function (data) {
                    let title = ["Modification chambre", "Modification room", "تغيير غرفة"];
                    let widthSideBar = "55%";
                    let XHR = sb.XHRObject(sb);
                    XHR.url = url_ajout;
                    XHR.traitement_succes = function (responseText) {
                        let response = responseText;
                        if (response) {
                            let callback = function callback() {
                                sb.notify({
                                    type: "Chambre",
                                    data: {data: data, type: "Modif"}
                                });
                            };

                            sb.showSideBar(response, widthSideBar, title[langue_index], callback);
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
                    let xhr = sb.openXhr(XHR);
                    xhr.send();
                };

                data_dataTables.delete = function (data) {
                    let title = ["Suppression chambre", "Delete room", "إلغاء غرفة"];
                    let widthSideBar = "55%";
                    let XHR = sb.XHRObject(sb);
                    XHR.url = url_ajout;
                    XHR.traitement_succes = function (responseText) {
                        let response = responseText;
                        if (response) {
                            let callback = function callback() {
                                sb.notify({
                                    type: "Chambre",
                                    data: {data: data, type: "Delete"}
                                });
                            };

                            sb.showSideBar(response, widthSideBar, title[langue_index], callback);
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
                    let xhr = sb.openXhr(XHR);
                    xhr.send();
                };
            }

            sb.notify({
                type: "createDataTable",
                data: data_dataTables
            });
        }
    };
});

CORE.start("Chambre");
