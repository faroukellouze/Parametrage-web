CORE.create_module("etatChambre", function (sb) {
    let etatChambre_object;
    let url_ajout = "MajEtatChambre";

    return {
        init: function () {
            etatChambre_object = this;

            sb.listen({
                "filter-actif-etat-chambres": this.charger_tableau,
                "refresh-datatables-etat-chambres": this.charger_tableau
            });

            CORE.start("dataTable");
            CORE.start("select");
            CORE.start("filtre_actif");


            etatChambre_object.charger_tableau({
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
            XHRTable.url = `${url_base}/etat-chambres/actif?actif=${type.type}`;
            XHRTable.traitement_succes = function (responseText) {
                let response = JSON.parse(responseText);
                if (response) {
                    etatChambre_object.prepareData(response, type.mode);
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
            let langue_index = sb.getLanguageIndex();
            let data_dataTables = sb.dataTablesObject();
            data_dataTables.table = "_grid_ListEtatChambre";

            rawData.forEach(function (item) {
                data_dataTables.data.push([
                    item.designation,
                    item.designationAr,
                    item.couleur,
                    item.etat,
                    item.actif,
                    item
                ]);
            });
            if (mode !== "refresh") {
                let columnsTitle = [
                    ["Désignation", "Designation", "البيان"],
                    ["Désignation arabe", "Designation arab", "البيان بالعربي"],
                    ["Couleur", "Color", "اللون"],
                    ["Visible lors ajout chambre", "Visible when adding room", "مرئي في إضافة غرفة"],
                    ["Actif", "Active", "فعال"]];
                data_dataTables.columns = [
                    {
                        title: columnsTitle[0][langue_index],
                        name: "Designation",
                        width: "35%"
                    },
                    {
                        title: columnsTitle[1][langue_index],
                        name: "DesignationAr",
                        width: "35%"
                    },
                    {
                        title: columnsTitle[2][langue_index],
                        name: "Couleur",
                        render: function (data, type) {
                            return '<label class="btn btn-info filtreCouleurEtat" style="background-color: ' + data + ';"></label>';
                        },
                        width: "5%"
                    },
                    {
                        title: columnsTitle[3][langue_index],
                        name: "Visible",
                        render: function (data, type) {
                            if (type === "display")
                                return sb.render_dataTables_boolean(data, type, data_dataTables.edition);
                            else
                                return data;
                        },
                        width: "15%"
                    },
                    {
                        title: columnsTitle[4][langue_index],
                        name: "actif",
                        render: function (data, type) {
                            if (type === "display")
                                return sb.render_dataTables_boolean(data, type, data_dataTables.edition);
                            else
                                return data;
                        },
                        width: "10%"
                    },
                    {
                        title: "rowData",
                        visible: false
                    }
                ];
                data_dataTables.order = [
                    [1, "desc"]
                ];
                data_dataTables.filtreColonne = true;

                data_dataTables.ajout = function () {
                    let title = ["Ajouter état chambre", "Add room condition", "اظافة حالة الغرفة"];
                    let widthModal = "50%";
                    let XHR = sb.XHRObject(sb);
                    XHR.url = url_ajout;
                    XHR.traitement_succes = function (responseText) {
                        let response = responseText;
                        if (response) {
                            let callback = function callback() {
                                sb.notify({
                                    type: "etatChambre",
                                    data: {data: null, type: "Ajouter"}
                                });
                            };

                            sb.showSideBar(response, widthModal, title[langue_index], callback);
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
                    let title = ["Modification état chambre", "Modification room condition", "تغيير حالة الغرفة"];
                    let widthModal = "50%";
                    let XHR = sb.XHRObject(sb);
                    XHR.url = url_ajout;
                    XHR.traitement_succes = function (responseText) {
                        let response = responseText;
                        if (response) {
                            let callback = function callback() {
                                sb.notify({
                                    type: "etatChambre",
                                    data: {data: data, type: "Modif"}
                                });
                            };

                            sb.showSideBar(response, widthModal, title[langue_index], callback);
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
                    let title = ["Suppression état chambre", "Delete room condition", "إلغاء حالة الغرفة"];
                    let widthModal = "50%";
                    let XHR = sb.XHRObject(sb);
                    XHR.url = url_ajout;
                    XHR.traitement_succes = function (responseText) {
                        let response = responseText;
                        if (response) {
                            let callback = function callback() {
                                sb.notify({
                                    type: "etatChambre",
                                    data: {data: data, type: "Delete"}
                                });
                            };

                            sb.showSideBar(response, widthModal, title[langue_index], callback);
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

CORE.start("etatChambre");
