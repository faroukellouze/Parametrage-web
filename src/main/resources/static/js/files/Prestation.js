CORE.create_module("Prestation", function (sb) {
    let Prestation_object;
    let url_ajout = "MajPrestation";
    let langue_index = sb.getLanguageIndex();

    return {
        init: function () {
            Prestation_object = this;

            sb.listen({
                "filter-actif-prestations": this.charger_tableau,
                "refresh-datatables-prestations": this.charger_tableau
            });

            CORE.start("dataTable");
            CORE.start("bntContainer");
            CORE.start("select");
            CORE.start("filtre_actif");

            Prestation_object.charger_tableau({
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
            XHRTable.url =`${url_base}/prestations/actif?actif=${type.type}`;
            XHRTable.traitement_succes = function (responseText) {
                let response = JSON.parse(responseText);
                if (response) {
                    Prestation_object.prepareData(response, type.mode);
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
            data_dataTables.table = "_grid_ListPrestation";

            rawData.forEach(function (item) {
                let element = [];
                element[0] = item.codeSousFamille.codeFamille.codeTypePrestation.designation;
                element[1] = item.codeSousFamille.codeFamille.designationAr;
                element[2] = item.codeSousFamille.designation;
                element[3] = item.codeSaisie;
                element[4] = item.designationAr;
                element[5] = item.designationEn;
                element[6] = item.facturation;
                element[7] = item.etage;
                element[8] = item.actif;
                element[9] = item;
                data_dataTables.data.push(element);
            });

            if (mode !== "refresh") {
                let columnsTitle = [];
                columnsTitle[0] = ["Type prestation", "Type service", "نوع خدمة"];
                columnsTitle[1] = ["Famille", "Family", "المستوي الثالث"];
                columnsTitle[2] = ["Sous Famille", "Under family", "المستوى الثاني"];
                columnsTitle[3] = ["Code", "Code", "الرمز"];
                columnsTitle[4] = ["Désignation arabe", "Designation arab", "البيان بالعربي"];
                columnsTitle[5] = ["Désignation anglais", "Designation english", "البيان إنجليزي"];
                columnsTitle[6] = ["Saisie à l'étage", "régler le plancher", "ضبط في طابق"];
                columnsTitle[7] = ["Facturation", "billing", "فوترة "];
                columnsTitle[8] = ["Actif", "Active", "فعال"];

                data_dataTables.columns = [
                    {
                        title: columnsTitle[0][langue_index],
                        name: "typePrestation",
                        defaultContent: "",
                        width: "15%"
                    },
                    {
                        title: columnsTitle[1][langue_index],
                        name: "famille",
                        className: "",
                        defaultContent: "",
                        width: "15%"
                    },
                    {
                        title: columnsTitle[2][langue_index],
                        name: "sousFamille",
                        className: "",
                        defaultContent: "",
                        width: "10%"
                    },
                    {
                        title: columnsTitle[3][langue_index],
                        name: "code",
                        className: "",
                        defaultContent: "",
                        width: "5%"
                    },
                    {
                        title: columnsTitle[4][langue_index],
                        name: "designationAr",
                        className: "",
                        defaultContent: "",
                        width: "15%"
                    },
                    {
                        title: columnsTitle[5][langue_index],
                        name: "designationEn",
                        className: "",
                        defaultContent: "",
                        width: "20%"
                    },
                    {
                        title: columnsTitle[6][langue_index],
                        name: "saisie",
                        className: "",
                        defaultContent: "",
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
                        name: "facturation",
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
                        title: columnsTitle[8][langue_index],
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
                    [4, "desc"]
                ];

                data_dataTables.pagination = true;
                data_dataTables.pageLength = 20;
                data_dataTables.group = ["typePrestation:name", "famille:name", "sousFamille:name"];
                data_dataTables.filtreColonne = true;

                data_dataTables.ajout = function () {
                    let title = ["Ajouter prestation", "Add service", "اظافة خدمة"];
                    let widthModal = "55%";
                    let XHR = sb.XHRObject(sb);
                    XHR.url = url_ajout;
                    XHR.traitement_succes = function (responseText) {
                        let response = responseText;
                        if (response) {
                            let callback = function callback() {
                                sb.notify({
                                    type: "Prestation",
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
                    let title = ["Modification prestation", "Modification service", "تغيير خدمة"];
                    let widthModal = "55%";
                    let XHR = sb.XHRObject(sb);
                    XHR.url = url_ajout;
                    XHR.traitement_succes = function (responseText) {
                        let response = responseText;
                        if (response) {
                            let callback = function callback() {
                                sb.notify({
                                    type: "Prestation",
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
                    let title = ["Suppression prestation", "Delete service", "إلغاء خدمة"];
                    let widthModal = "55%";
                    let XHR = sb.XHRObject(sb);
                    XHR.url = url_ajout;
                    XHR.traitement_succes = function (responseText) {
                        let response = responseText;
                        if (response) {
                            let callback = function callback() {
                                sb.notify({
                                    type: "Prestation",
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

CORE.start("Prestation");
