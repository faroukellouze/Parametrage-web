CORE.create_module("sousFamillePrestation", function (sb) {
    let sousFamillePrestation_object;
    let url_ajout = "MajSousFamillePrestation";

    return {
        init: function () {
            sousFamillePrestation_object = this;

            sb.listen({
                "filter-actif-sous-famille-prestations": this.charger_tableau,
                "refresh-datatables-sous-famille-prestations": this.charger_tableau
            });

            CORE.start("dataTable");
            CORE.start("select");
            CORE.start("filtre_actif");


            sousFamillePrestation_object.charger_tableau({
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
            XHRTable.url = `${url_base}/sous-famille-prestations/actif?actif=${type.type}`;
            XHRTable.traitement_succes = function (responseText) {
                let response = JSON.parse(responseText);
                if (response) {
                    sousFamillePrestation_object.prepareData(response, type.mode);
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
            data_dataTables.table = "_grid_ListsousFamillePrestation";

            rawData.forEach(function (item) {
                data_dataTables.data.push([
                    item.codeFamille.designationEn,
                    item.designation,
                    item.designationAr,
                    item.actif,
                    item
                ]);
            });
            if (mode !== "refresh") {
                let columnsTitle = [
                    ["Famille", "Family", "مجموعة"],
                    ["Désignation", "Designation", "البيان"],
                    ["Désignation arabe", "Designation arab", "البيان بالعربي"],
                    ["Actif", "Active", "فعال"]];
                data_dataTables.columns = [
                    {
                        title: columnsTitle[0][langue_index],
                        name: "famille",
                        width: "30%"
                    },
                    {
                        title: columnsTitle[1][langue_index],
                        name: "Designation",
                        width: "30%"
                    },
                    {
                        title: columnsTitle[2][langue_index],
                        name: "DesignationAr",
                        width: "30%"
                    },
                    {
                        title: columnsTitle[3][langue_index],
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
                data_dataTables.group = ["famille:name"];
                data_dataTables.filtreColonne = true;

                data_dataTables.ajout = function () {
                    let title = ["Ajouter sous famille prestation", "Add under family service", "اظافة مجموعة تحتية"];
                    let widthModal = "50%";
                    let XHR = sb.XHRObject(sb);
                    XHR.url = url_ajout;
                    XHR.traitement_succes = function (responseText) {
                        let response = responseText;
                        if (response) {
                            let callback = function callback() {
                                sb.notify({
                                    type: "sousFamillePrestation",
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
                    let title = ["Modification sous famille prestation", "Modification under family service", "تغيير في مجموعة تحتية"];
                    let widthModal = "50%";
                    let XHR = sb.XHRObject(sb);
                    XHR.url = url_ajout;
                    XHR.traitement_succes = function (responseText) {
                        let response = responseText;
                        if (response) {
                            let callback = function callback() {
                                sb.notify({
                                    type: "sousFamillePrestation",
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
                    let title = ["Suppression sous famille prestation", "Delete under family service", "إلغاء مجموعة تحتية"];
                    let widthModal = "50%";
                    let XHR = sb.XHRObject(sb);
                    XHR.url = url_ajout;
                    XHR.traitement_succes = function (responseText) {
                        let response = responseText;
                        if (response) {
                            let callback = function callback() {
                                sb.notify({
                                    type: "sousFamillePrestation",
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

CORE.start("sousFamillePrestation");
