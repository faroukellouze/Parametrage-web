CORE.create_module("CategorieChambre", function (sb) {
    let CategorieChambre_object;
    let url_ajout = "MajCategorieChambre";
    let langue_index = sb.getLanguageIndex();

    return {
        init: function () {
            CategorieChambre_object = this;
            sb.listen({
                "filter-actif-cathegoriesChambres": this.charger_tableau,
                "refresh-datatables-cathegoriesChambres": this.charger_tableau
            });

            CORE.start("dataTable");
            CORE.start("bntContainer");
            CORE.start("select");
            CORE.start("filtre_actif");

            CategorieChambre_object.charger_tableau({
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
            XHRTable.url = `${url_base}/cathegories/actif?actif=${type.type}`;
            XHRTable.traitement_succes = function (responseText) {
                let response = JSON.parse(responseText);
                if (response) {
                    CategorieChambre_object.prepareData(response, type.mode);
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
            data_dataTables.table = "_grid_ListCategorieChambre";

            rawData.forEach(function (item) {
                data_dataTables.data.push([item.designationAr,
                    item.designation,
                    item.prestAccompagnat !== null ? item.prestAccompagnat.designationAr : '',
                    item.prestAccompagnat !== null ? item.prestSurveillance.designationAr : '',
                    item.prestAccompagnat !== null ? item.prestSuivie.designationAr : '',
                    item.prestAccompagnat !== null ? item.prestSejour.designationAr : '',
                    item.isIcu,
                    item.actif,
                    item]);
            });

            if (mode !== "refresh") {
                let columnsTitle = [
                    ["Désignation arabe", "Designation arab", "البيان بالعربي"],
                    ["Désignation anglais", "Designation english", "البيان إنجليزي"],
                    ["Prestation accompagnant", "Service accompanying", "خدمة مرافقة"],
                    ["Prestation surveillance", "Service monitoring", "خدمة إشراف"],
                    ["Prestation suivie", "Service followed", "خدمة متابعة"],
                    ["Prestation séjour", "Service stay", "خدمة إقامة"],
                    ["ICU", "ICU", "ICU"],
                    ["Actif", "Active", "فعال"]];

                data_dataTables.columns = [
                    {
                        title: columnsTitle[0][langue_index],
                        name: "designationAr",
                        className: "",
                        width: "15%"
                    },
                    {
                        title: columnsTitle[1][langue_index],
                        name: "designationEn",
                        className: "",
                        width: "15%"
                    },
                    {
                        title: columnsTitle[2][langue_index],
                        name: "accompagnant",
                        className: "",
                        width: "15%"
                    },
                    {
                        title: columnsTitle[3][langue_index],
                        name: "surveillance",
                        className: "",
                        width: "15%"
                    },
                    {
                        title: columnsTitle[4][langue_index],
                        name: "suivie",
                        className: "",
                        width: "15%"
                    },
                    {
                        title: columnsTitle[5][langue_index],
                        name: "séjour",
                        className: "",
                        width: "15%"
                    },
                    {
                        title: columnsTitle[6][langue_index],
                        name: "ICU",
                        className: "",
                        width: "5%",
                        render: function (data, type) {
                            if (type === "display")
                                return sb.render_dataTables_boolean(data, type, data_dataTables.edition);
                            else
                                return data;
                        },
                    },
                    {
                        title: columnsTitle[7][langue_index],
                        name: "actif",
                        className: "",
                        width: "5%",
                        render: function (data, type) {
                            if (type === "display")
                                return sb.render_dataTables_boolean(data, type, data_dataTables.edition);
                            else
                                return data;
                        },
                    },
                    {
                        title: "rowData",
                        visible: false
                    }
                ];

                data_dataTables.order = [
                    [0, "desc"]
                ];
                data_dataTables.filtreColonne = true;

                data_dataTables.ajout = function () {
                    let title = ["Ajouter catégorie chambre", "Add category room", "اظافة صنف الغرفة"];
                    let widthModal = "70%";
                    let XHR = sb.XHRObject(sb);
                    XHR.url = url_ajout;
                    XHR.traitement_succes = function (responseText) {
                        let response = responseText;
                        if (response) {
                            let callback = function callback() {
                                sb.notify({
                                    type: "CategorieChambre",
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
                    let title = ["Modification catégorie chambre", "Modification category room", "تغيير صنف الغرفة"];
                    let widthModal = "70%";
                    let XHR = sb.XHRObject(sb);
                    XHR.url = url_ajout;
                    XHR.traitement_succes = function (responseText) {
                        let response = responseText;
                        if (response) {
                            let callback = function callback() {
                                sb.notify({
                                    type: "CategorieChambre",
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
                    let title = ["Suppression catégorie chambre", "Delete category room", "إلغاء صنف الغرفة"];
                    let widthModal = "70%";
                    let XHR = sb.XHRObject(sb);
                    XHR.url = url_ajout;
                    XHR.traitement_succes = function (responseText) {
                        let response = responseText;
                        if (response) {
                            let callback = function callback() {
                                sb.notify({
                                    type: "CategorieChambre",
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

CORE.start("CategorieChambre");
