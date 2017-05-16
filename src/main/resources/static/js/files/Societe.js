CORE.create_module("Societe", function (sb) {
    let MotifAdm_object;
    let url_ajout = "MajSociete";

    return {
        init: function () {
            MotifAdm_object = this;

            sb.listen({
                "filter-actif-societes": this.charger_tableau,
                "refresh-datatables-societes": this.charger_tableau
            });

            CORE.start("dataTable");
            CORE.start("bntContainer");
            CORE.start("select");
            CORE.start("filtre_actif");

            MotifAdm_object.charger_tableau({
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
        charger_tableau: function (data) {
            let XHRTable = sb.XHRObject(sb);
            XHRTable.url = `${url_base}/societes/actif/${data.type}`;
            XHRTable.traitement_succes = function (responseText) {
                let response = JSON.parse(responseText);
                if (response) {
                    MotifAdm_object.prepareData(response, data.mode);
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
            data_dataTables.table = "_grid_ListMotif";

            rawData.forEach(function (item) {
                let element = [];
                element[0] = item.codeSecteurActivite.designation;
//                element[1] = null;
                element[1] = item.codeSaisie;
                element[2] = item.designation;
                element[3] = item.seuilCredit;
                element[4] = item.seuilCreditAlerte;
                element[5] = item.delaisFacturation;
                element[6] = item.delaisReglement;
                element[7] = item.actif;
                element[8] = item.contactSocieteCollection;
                element[9] = item;
                data_dataTables.data.push(element);
            });

            if (mode !== "refresh") {
                let columnsTitle = [];
                columnsTitle[0] = ["Secteur d'activité", "Sector of work", "القطاع"];
//                columnsTitle[1] = ["", "", ""];
                columnsTitle[1] = ["code", "code", "الرمز"];
                columnsTitle[2] = ["Désignation", "Designation", "البيان"];
                columnsTitle[3] = ["Seuil crédit", "Threshold credit", "الحد الاقصى للمطالبة المالية"];
                columnsTitle[4] = ["Seuil crédit alerte", "Threshold credit alert", "الحد الاقصى لايقاف التعامل"];
                columnsTitle[5] = ["Deadlines billing(days)", "Delais facturation(jours)", "تاريخ استحقاق السداد"];
                columnsTitle[6] = ["Deadlines payment(days)", "Delais réglement(jours)", "تاريخ استحقاق المطالبة"];
                columnsTitle[7] = ["Actif", "Active", "فعال"];
                data_dataTables.columns = [
                    {
                        title: columnsTitle[0][langue_index],
                        name: "secteur",
                        defaultContent: "",
                        width: "15%"
                    },
//                    {
//                        title: columnsTitle[1][langue_index],
//                        name: "details-control",
//                        className: "details-control",
//                        orderable: false,
//                        data: null,
//                        defaultContent: "",
//                        width: "5%"
//                    },
                    {
                        title: columnsTitle[1][langue_index],
                        name: "code",
                        className: "",
                        defaultContent: "",
                        width: "5%"
                    },
                    {
                        title: columnsTitle[2][langue_index],
                        name: "designation",
                        className: "",
                        defaultContent: "",
                        width: "30%"
                    },
                    {
                        title: columnsTitle[3][langue_index],
                        name: "credit",
                        className: "",
                        defaultContent: "",
                        width: "10%"
                    },
                    {
                        title: columnsTitle[4][langue_index],
                        name: "creditalert",
                        className: "",
                        defaultContent: "",
                        width: "10%"
                    },
                    {
                        title: columnsTitle[5][langue_index],
                        name: "facturation",
                        defaultContent: "",
                        width: "10%"
                    },
                    {
                        title: columnsTitle[6][langue_index],
                        name: "reglement",
                        defaultContent: "",
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
                    }
                ];

//                let detailColumnsTitle = [];
//                detailColumnsTitle[0] = ["Type contact", "Contact type", "نوع الاتصال"];
//                detailColumnsTitle[1] = ["Valeur", "Value", "القيمة"];
//                data_dataTables.detailColumns = [
//                    [detailColumnsTitle[0][langue_index], detailColumnsTitle[1][langue_index]], //header
//                    ["contactSocieteCollection.designation", "contactSocieteCollection.valeur"] //body
//                ];
                data_dataTables.order = [
                    [2, "desc"]
                ];
                data_dataTables.group = ["secteur:name"];
                data_dataTables.filtreColonne = true;

                data_dataTables.ajout = function () {
                    let widthModal = "90%";
                    let XHR = sb.XHRObject(sb);
                    XHR.url = url_ajout;
                    XHR.traitement_succes = function (responseText) {
                        let title = ["Ajouter societé", "Add company", "اظافة جهة"];
                        let response = responseText;
                        if (response) {
                            let callback = function callback() {
                                sb.notify({
                                    type: "Societe",
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
                    let title = ["Modification societé", "Modification company", "تغيير جهة"];
                    let widthModal = "90%";
                    let XHR = sb.XHRObject(sb);
                    XHR.url = url_ajout;
                    XHR.traitement_succes = function (responseText) {
                        let response = responseText;
                        if (response) {
                            let callback = function callback() {
                                sb.notify({
                                    type: "Societe",
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
                    let title = ["Suppression societé", "Delete company", "إلغاء جهة"];
                    let widthModal = "90%";
                    let XHR = sb.XHRObject(sb);
                    XHR.url = url_ajout;
                    XHR.traitement_succes = function (responseText) {
                        let response = responseText;
                        if (response) {
                            let callback = function callback() {
                                sb.notify({
                                    type: "Societe",
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

CORE.start("Societe");
