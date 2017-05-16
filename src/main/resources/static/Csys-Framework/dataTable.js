CORE.create_module("dataTable", function (sb) {
    let dataTable_object;
    let table;

    return {
        init: function () {
            dataTable_object = this;

            sb.listen({
                'createDataTable': this.createDataTable
            });

            dataTable_object.langue = sessionStorage.getItem("langue");
        },
        destroy: function () {
            table = null;
        },
        /**
         * Préparer les données pour le détails d'une ligne de tableau
         * @author nadir
         * @param {array} rowData l'objet complet
         * @param {array} detailColumns les attributs à afficher à partir de l'objet complet
         * @returns {string} le code HTML des lignes de détails à injecter
         */
        formatDetailsLigne: function (rowData, detailColumns) {
            let codeHTML = '<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-condensed" style=" background-color: bisque !important; ">' +
                '<thead>';

            detailColumns[0].forEach(function (item) {
                codeHTML += '<th>' + item + '</th>';
            });

            codeHTML += '</thead><tbody>';

            let details = _.last(rowData);
            details.forEach(function (item) {
                codeHTML += '<tr>';
                detailColumns[1].forEach(function (itemColumns) {
                    temp = item;
                    champs = itemColumns.split(".");
                    champs.forEach(function (itemAttr) {
                        temp = temp[itemAttr];
                    });
                    codeHTML += '<td>' + temp + '</td>';
                });
                codeHTML += '</tr>';
            });

            codeHTML += '</tbody></table>';
            return codeHTML
        },
        /**
         * Créer le datatable dynamiquement à partir de l'objet envoyé
         * @author nadir
         * @param {object} data_dataTables l'object pour remplir le datatable
         */
        createDataTable: function (data_dataTables) {
            let table = null;
            let langue_index = sb.getLanguageIndex();
            let element = $("#" + data_dataTables.table);
            let activeTab = element.parents(".views").find("div.active");

            if (Tables[data_dataTables.table] !== undefined && Tables[data_dataTables.table] !== null) {
                table = Tables[data_dataTables.table];
                table.clear();
                table.search("").columns().search("");
                let loopFilters = activeTab.find("#" + data_dataTables.table + "_wrapper").find("select.filtre-column");
                for (const filter of loopFilters) {
                    $(filter).find("option:first").attr('selected', 'selected');
                    $(filter).hide();
                }

                table.rows.add(data_dataTables.data).draw();
                return false;
            }

            let buttonsData = {};
            if (data_dataTables.buttonVisibility === true) {
                buttonsTitle = [];
                buttonsTitle[0] = ["Ajouter", "Add", "إضافة"];
                buttonsTitle[1] = ["Modifier", "Edit", "تعديل"];
                buttonsTitle[2] = ["Effacer", "Delete", "حذف"];
                buttonsTitle[3] = ["Impression", "Print", "طباعة"];
                buttonsTitle[4] = ["Visibilité des colonnes", "Columns visibility", "رؤية الأعمدة"];
                buttonsTitle[5] = ["PDF", "PDF", "PDF"];
                buttonsTitle[6] = ["Excel", "Excel", "Excel"];
                buttonsTitle[7] = ["Copie", "Copy", "نسخ"];

                buttonsData = {
                    buttons: [
                        {
                            text: buttonsTitle[0][langue_index],
                            className: 'btn btn-default btn-edition btn-add',
                            action: data_dataTables.ajout
                        }
                        ,
                        {
                            text: buttonsTitle[1][langue_index],
                            extend: 'selected',
                            className: 'btn btn-default btn-edition btn-edit',
                            action: function (e, dt, node, config) {
                                let data = _.last(dt.row({selected: true}).data());
                                data_dataTables.modif(data)
                            }
                        }
                        ,
                        {
                            text: buttonsTitle[2][langue_index],
                            extend: 'selected',
                            className: 'btn btn-default btn-edition btn-delete',
                            action: function (e, dt, node, config) {
                                let data = _.last(dt.row({selected: true}).data());
                                data_dataTables.delete(data)
                            }
                        }
                        ,
                        {
                            text: buttonsTitle[3][langue_index],
                            extend: 'print',
                            className: 'btn btn-default'
                        }
                        ,
                        {
                            text: buttonsTitle[4][langue_index],
                            extend: 'colvis',
                            className: 'btn btn-default'
                        }
                        ,
                        {
                            text: buttonsTitle[5][langue_index],
                            extend: 'pdf',
                            className: 'btn btn-default'
                        }
                        ,
                        {
                            text: buttonsTitle[6][langue_index],
                            extend: 'excel',
                            className: 'btn btn-default'
                        }
                        ,
                        {
                            text: buttonsTitle[7][langue_index],
                            extend: 'copy',
                            className: 'btn btn-default'
                        }
                    ]
                };
            }

            table = element.DataTable({
                data: data_dataTables.data,
                dom: "Bfrtip",
                responsive: true,
                processing: true,
                keys: true,
                select: "single", //single multi os
                stateSave: false,
                info: data_dataTables.info,
                //altEditor: data_dataTables.edition,
                buttons: buttonsData,
                colReorder: data_dataTables.colReorder,
                scrollY: 380,
                scrollCollapse: true,
                scroller: true,
                autoWidth: data_dataTables.autoWidthSince,
                paging: data_dataTables.pagination,
                lengthChange: true,
                pageLength: data_dataTables.pageLength,
                bDestroy: true,
                searching: data_dataTables.searching,
                columns: data_dataTables.columns,
                order: data_dataTables.order,
                rowsGroup: data_dataTables.group,
                initComplete: function () {
                    let table = element.DataTable();
                    if (data_dataTables.buttonVisibility === true) {
                        activeTab.find(".btn-add").addClass("borderLeftSuccess").prepend('<i class="txt-color-green fa fa-plus fa-lg"></i> ');
                        activeTab.find(".btn-edit").addClass("borderLeftYellow").prepend('<i class="txt-color-yellow fa fa-pencil-square-o fa-lg"></i> ').css('margin-left', '3px');
                        activeTab.find(".btn-delete").addClass("borderLeftDanger").prepend('<i class="txt-color-red fa fa-trash-o fa-lg"></i> ').css('margin-left', '3px');
                        activeTab.find(".buttons-print").addClass("borderLeftDarken").prepend('<i class="txt-color-darken fa fa-print fa-lg"></i> ').css('margin-left', '3px');

                        activeTab.find(".buttons-colvis").removeClass('btn').removeClass('dt-button').prepend('<i class="txt-color-pink fa fa-low-vision fa-lg"></i> ');
                        activeTab.find(".buttons-pdf").removeClass('btn').removeClass('dt-button').prepend('<i class="txt-color-red fa fa-file-pdf-o fa-lg"></i> ');
                        activeTab.find(".buttons-excel").removeClass('btn').removeClass('dt-button').prepend('<i class="txt-color-green fa fa-file-excel-o fa-lg"></i> ');
                        activeTab.find(".buttons-copy").removeClass('btn').removeClass('dt-button').prepend('<i class="txt-color-blueLight fa fa-files-o fa-lg"></i> ');

                        activeTab.find(".ButtonPlus button").removeClass('disabled');
                        activeTab.find(".ButtonPlus .dropdown-menu").append("<li></li>");
                        activeTab.find(".buttons-colvis").detach().appendTo(activeTab.find(".ButtonPlus .dropdown-menu li:last-child"));
                        activeTab.find(".ButtonPlus .dropdown-menu").append("<li></li>");
                        activeTab.find(".buttons-pdf").detach().appendTo(activeTab.find(".ButtonPlus .dropdown-menu li:last-child"));
                        activeTab.find(".ButtonPlus .dropdown-menu").append("<li></li>");
                        activeTab.find(".buttons-excel").detach().appendTo(activeTab.find(".ButtonPlus .dropdown-menu li:last-child"));
                        activeTab.find(".ButtonPlus .dropdown-menu").append("<li></li>");
                        activeTab.find(".buttons-copy").detach().appendTo(activeTab.find(".ButtonPlus .dropdown-menu li:last-child"));

                        activeTab.find(".dataTables_filter").detach().appendTo(activeTab.find("#search_dataTable"));
                        activeTab.find(".dt-buttons").detach().appendTo(activeTab.find("#bntContainer"));

                        activeTab.find(".dt-button").removeClass("dt-button");
                        activeTab.find(".dt-buttons").addClass("pull-right");
                    } else {
                        activeTab.find(".dt-button").remove();
                        activeTab.find("#" + data_dataTables.table + "_filter").remove();
                    }

                    //filtre par colonne
                    if (data_dataTables.filtreColonne === true) {
                        activeTab.find("#" + data_dataTables.table + "_wrapper").find('TH').unbind();

                        this.api().columns().every(function () {
                            let column = this;
                            let indexColumn = column.index();
                            let order = _.filter(data_dataTables.order, function (col) {
                                return col[0] === indexColumn;
                            });
                            let widthColumn = parseInt($(column.header()).css("width")) - 23;
                            let select = $(`<select class="filtre-column" style="max-width:${widthColumn}px;margin-left: 9px;display: none; "><option value=""></option>`)
                                .appendTo($(column.header()))
                                .on('change', function (e) {
                                    let val = $.fn.dataTable.util.escapeRegex(
                                        $(this).val()
                                    );

                                    column
                                        .search(val ? '^' + val + '$' : '', true, false)
                                        .draw();
                                });

                            let sorterHTML = $(`<span class="sorter" style="float: right;margin-right: -10px;color: black;"><i class="fa fa-sort" aria-hidden="true"></i></span>`);
                            if (order.length > 0) {
                                if (order[0][1].toLowerCase() === "asc")
                                    sorterHTML = $(`<span class="sorter" style="float: right;margin-right: -10px;color: black;"><i class="fa fa-sort-asc" aria-hidden="true"></i></span>`);
                                if (order[0][1].toLowerCase() === "desc")
                                    sorterHTML = $(`<span class="sorter" style="float: right;margin-right: -10px;color: black;"><i class="fa fa-sort-desc" aria-hidden="true"></i></span>`);
                            }

                            let sorter = sorterHTML
                                .appendTo($(column.header()))
                                .on('click', function (e) {
                                    let spanSorting = $(column.header()).find("span.sorter i");
                                    let sorting = $(column.header()).attr("class");
                                    let newSort;
                                    if (sorting === "sorting") {
                                        newSort = "asc";
                                        activeTab.find("#" + data_dataTables.table + "_wrapper th span.sorter i").removeClass().addClass("fa fa-sort");
                                        spanSorting.removeClass().addClass("fa fa-sort-asc");
                                    }
                                    else if (sorting === "sorting_asc") {
                                        newSort = "desc";
                                        activeTab.find("#" + data_dataTables.table + "_wrapper th span.sorter i").removeClass().addClass("fa fa-sort");
                                        spanSorting.removeClass().addClass("fa fa-sort-desc");
                                    }
                                    else if (sorting === "sorting_desc") {
                                        newSort = "asc";
                                        activeTab.find("#" + data_dataTables.table + "_wrapper th span.sorter i").removeClass().addClass("fa fa-sort");
                                        spanSorting.removeClass().addClass("fa fa-sort-asc");
                                    }

                                    table.order([column.index(), newSort]).draw();
                                });

                            let filter = $(`<span class="filter" style="float: right;margin-right: -3px;color: black;"><i class="fa fa-filter" aria-hidden="true"></i></span>`)
                                .appendTo($(column.header()))
                                .on('click', function (e) {
                                    let selectFilter = $(column.header()).find("select.filtre-column");
                                    let selectFilterDisplay = selectFilter.css("display");
                                    if (selectFilterDisplay === "none")
                                        selectFilter.css("display", "inline");
                                    else
                                        selectFilter.css("display", "none");
                                });

                            let usedColumnsFilter = [];
                            column.data().unique().sort().each(function (d, j) {
                                let index = column.index();
                                let value = d;
                                let valueTxt = d;
                                if (d instanceof Object) {
                                    value = d[data_dataTables.columns[index].columnFiltre];
                                    valueTxt = value;
                                }

                                if (value !== null && value !== undefined && value.toString().toLowerCase() === "true") {
                                    if (langue_index === "0")
                                        valueTxt = "Oui";
                                    else if (langue_index === "1")
                                        valueTxt = "True";
                                    else if (langue_index === "2")
                                        valueTxt = "نعم";
                                } else if (value !== null && value !== undefined && value.toString().toLowerCase() === "false") {
                                    if (langue_index === "0")
                                        valueTxt = "Non";
                                    else if (langue_index === "1")
                                        valueTxt = "False";
                                    else if (langue_index === "2")
                                        valueTxt = "لا";
                                }

                                if (!_.contains(usedColumnsFilter, value)) {
                                    select.append('<option value="' + value + '">' + valueTxt + '</option>');
                                    usedColumnsFilter.push(value);
                                }
                            });
                        });
                    }

                    //Evenement de recherche
                    activeTab.find("#" + data_dataTables.table + "_filter").parent().off("keyup").on("keyup", function () {
                        let table = element.DataTable();
                        table.search(this.value).draw();
                    });

                    //Afficher détails ligne
                    if (data_dataTables.details_ligne === true) {
                        element.find("tbody").on("click", "td.details-control", function () {
                            let table = element.DataTable();
                            let tr = $(this).closest('tr');
                            let row = table.row(tr);

                            if (row.child.isShown()) {
                                row.child.hide();
                                tr.removeClass('shown');
                            } else {
                                row.child(dataTable_object.formatDetailsLigne(row.data(), data_dataTables.detailColumns)).show();
                                tr.addClass('shown');
                            }
                        });
                    }

                    // Making TD editable exept td with action button
                    $("body").find("#" + data_dataTables.table).on("dblclick", "td.contenteditable", function () {
                        $(this).attr("contenteditable", "true");
                        let el = $(this);
                        let range = document.createRange();
                        let sel = window.getSelection();
                        if (el[0].childNodes.length > 0) {
                            range.setStart(el[0].childNodes[0], 0);
                            range.setEnd(el[0].childNodes[0], el[0].childNodes[0].length);
                            sel.removeAllRanges();
                            sel.addRange(range);
                        }
                        el.focus();
                    });

                    element.DataTable()
                        .on('key', function (e, datatable, key, cell) {
                            if (key === 13)
                                element.DataTable().cell.blur();
                        }).on('key-focus', function (e, datatable, cell) {
                        // let node = $(cell.node());
                        // $(".focus").removeClass("focus");
                        // node.addClass("focus");
                        // node.css("outline","3px solid #3366FF").css("outline-offset","-1px");
                    }).on("key-blur", function (e, datatable, cell) {
                        let node = $(cell.node());
                        let initialValue = cell.data();
                        if (node.find(".checkbox").length === 0 && !node[0].classList.contains("details-control")) {
                            let modifiedData = $(cell.node()).html();
                            if (data_dataTables.columns[cell.index().column].test !== undefined) {
                                if (data_dataTables.columns[cell.index().column].test(modifiedData)) {
                                    cell.data(modifiedData).draw();
                                } else {
                                    sb.notify({
                                        type: "showMessage",
                                        data: {
                                            title: "Avertissement",
                                            numMsg: 3,
                                            typeMsg: "error",
                                            delai: 5000
                                        }
                                    });
                                    cell.data(initialValue).draw();
                                }
                            } else {
                                cell.data(modifiedData).draw();
                            }
                            $("[contenteditable=true]").attr("contenteditable", "false");
                        }
                    });

                    // element.on("mouseenter", "td", function () {
                    //     let table = element.DataTable();
                    //     let index = table.cell(this).index();
                    //     if (index !== undefined) {
                    //         let colIdx = index.column;
                    //         $(table.cells().nodes()).removeClass("highlight");
                    //         $(table.column(colIdx).nodes()).addClass("highlight");
                    //     }
                    // });
                },
                language: {
                    "url": "locales/" + dataTable_object.langue + "/" + dataTable_object.langue + "-dataTables.json"
                }
            });

            //Afficher processing message
            element.DataTable().on('processing.dt', function (e, settings, processing) {
                activeTab.find(".dataTables_processing").css("z-index", "9999").css('display', processing ? 'block' : 'none');
            });

            Tables[data_dataTables.table] = table;

            // if (data_dataTables.edition === true)
            //     activeTab.find(".btn-edition").show();
            // else
            //     activeTab.find(".btn-edition").hide();
        }
    };
});
