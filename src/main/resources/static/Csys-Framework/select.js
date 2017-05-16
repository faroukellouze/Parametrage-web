CORE.create_module("select", function (sb) {
    let select_object;
    SelectedData = [];
    SelectedRowData = [];

    return {
        init: function () {
            select_object = this;

            sb.listen({
                "createSelect": this.createSelect,
                "selectRowByObject": this.selectRowByObject
            });

            SelectedData = [];
            SelectedRowData = [];
        },
        destroy: function () {
            select_object = null;
            SelectedData = [];
            SelectedRowData = [];
        },
        /**
         * Filtrer les données par le mot à rechercher
         * @author nadir
         * @param {array} data les données à filtrer
         * @param {string} search le mot à chercher
         * @returns {array} liste des données filtrées
         */
        filterDataSelect: function (data, search) {
            let searchTxt = search.toLowerCase();
            if (search.length === 0)
                return data;

            return out = _.filter(data, function (obj) {
                return sb.iterateObject(obj, searchTxt);
            });
        },
        /**
         * Préparer le code HTML pour le tableau du SelectCsys
         * @author nadir
         * @param {array} data les données à afficher
         * @param {array} champs les colonnes à afficher au tableau
         * @returns {string} le code HTML qui sert à dessiner le tableau
         */
        prepareHtmlTable: function (data, champs) {
            let codeHTML = "";
            data.forEach(function (item, index) {
                codeHTML += "<tr numero='" + index + "' >";
                champs.forEach(function (itemChamps) {
                    temp = item;
                    width = itemChamps.width;
                    attr = itemChamps.title.split(".");
                    attr.forEach(function (itemAttr) {
                        temp = temp[itemAttr];
                    });
                    codeHTML += "<td style='width:" + width + "'>" + temp + "</td>";
                });
                codeHTML += "</tr>";
            });

            return codeHTML;
        },
        /**
         * Créer SelectCsys dynamiquement à partir de l'objet envoyé
         * @author nadir
         * @param {object} dataSelect l'object pour remplir SelectCsys
         */
        createSelect: function (dataSelect) {
            let langue_index = sb.getLanguageIndex();
            let placeholder = "";
            let codeHTML = "";
            if (langue_index === "0")
                placeholder = "Recherche";
            else if (langue_index === "1")
                placeholder = "Search";
            else if (langue_index === "2")
                placeholder = "بحث";

            let elementSelect = dataSelect.element;
            let data = dataSelect.response;
            let columns = dataSelect.columns;
            let champs = dataSelect.champs;
            let multiSelect = dataSelect.multSelect;
            let widthDropdown = dataSelect.width;
            let boutonAjoutRapide = dataSelect.boutonAjoutRapide;
            let champsSelection = dataSelect.champsSelection;
            let searchVisibility = dataSelect.searchVisibility;
            let elementSelected = dataSelect.elementSelected;

            let searchVisibilityStyle = "";
            if (searchVisibility === false)
                searchVisibilityStyle = " style='display:none;'";

            if (widthDropdown === undefined || widthDropdown === "auto")
                widthDropdown = '100%';

            if (multiSelect) {
                codeHTML = '<div class="selectCSys selectCSys-multiple-container">';
                codeHTML += '	<div class="selectCSys-selection-collection-container">';
                codeHTML += '		<ul class="selectCSys-selection-collection">';
                codeHTML += '		</ul>';
                codeHTML += '	</div>';
                codeHTML += '	<div class="selectCSys-multiple-dropdowncontainer">';
            } else {
                codeHTML = '<div class="selectCSys-container" style="width: calc(100% - 20px);">';
                codeHTML += '<div id="input_' + elementSelect + '1" class="select-choice">';
                codeHTML += '<span class="select-chosen"> </span>';
                codeHTML += '<span class="select-arrow">';
                codeHTML += '<b></b>';
                codeHTML += '</span>';
                codeHTML += '</div>';
            }

            codeHTML += '<div id="dropDown' + elementSelect + '" class="dropdownCsys" style="width: ' + widthDropdown + '">';
            codeHTML += "<div class='searchSelect smart-form'" + searchVisibilityStyle + ">";
            codeHTML += '<form class="smart-form">';
            codeHTML += '<fieldset>';
            codeHTML += '<section>';
            codeHTML += '<label class="input">';
            codeHTML += '<i class="icon-append fa fa-search"></i>';
            codeHTML += '<input id="input_' + elementSelect + '2" type="text" placeholder="' + placeholder + '"></label>';
            codeHTML += '</section>';
            codeHTML += '</fieldset>';
            codeHTML += '</form>';
            codeHTML += '</div>';
            codeHTML += "<div class='table bodySelect'>";
            codeHTML += "<table id='tableSelect_" + elementSelect + "'>"
                    + "<thead>";

            if (columns !== null) {
                columns.forEach(function (column) {
                    codeHTML += "<th style='width:" + column.width + "'>" + column.title + "</th>";
                });
            }

            codeHTML += "</thead>"
                    + "<tbody>";

            codeHTML += select_object.prepareHtmlTable(data, champs);
            codeHTML += "</tbody>"
                    + "</table>";

            codeHTML += "</div>";

            if (boutonAjoutRapide) {
                let label_button = "";
                if (langue_index === "0")
                    label_button = "Ajouter rapide";
                else if (langue_index === "1")
                    label_button = "Quick Add";
                else if (langue_index === "2")
                    label_button = "إضافة سريعة";

                codeHTML += "<div class='boutons'>"
                        + "<button type='button' id='" + elementSelect + "_ajoutRapide' class='btn btn-info pull-right' style='margin-right: 8px;'>"
                        + label_button
                        + "</button>"
                        + "</div>";
            }

            codeHTML += '</div>';
            if (multiSelect)
                codeHTML += '</div>';

            document.getElementById(elementSelect).innerHTML = codeHTML;

            if (boutonAjoutRapide) {
                let func = function () {
                    dataSelect.ajoutRapide();
                };

                document.getElementById(elementSelect + "_ajoutRapide").addEventListener("click", func, true);
            }

            SelectedData[elementSelect] = [];
            SelectedRowData[elementSelect] = data;

            if (multiSelect)
                select_object.click_event(elementSelect, multiSelect);
            else
                select_object.click_event(elementSelect, multiSelect);

            select_object.keyup_event(elementSelect, data, champs);
            select_object.selectRowTable(elementSelect, multiSelect, champsSelection, elementSelected);
        },
        click_event: function (elementSelect, multiSelect) {
            if (multiSelect) {
                document.querySelectorAll("#" + elementSelect + " .selectCSys-selection-collection-container")[0].addEventListener("click", function () {
                    element = document.querySelectorAll("#" + elementSelect + " .selectCSys-multiple-container")[0];
                    if (element.classList.contains("openSelect")) {
                        element.classList.remove("openSelect");
                    } else {
                        document.getElementsByClassName('selectCSys-container').classList.remove("openSelect");
                        element.classList.add("openSelect");
                        //focus
                        document.getElementById("input_" + elementSelect + "2").value = "";
                        document.getElementById("input_" + elementSelect + "2").focus();
                    }
                });
            } else {
                document.querySelectorAll("#input_" + elementSelect + "1")[0].addEventListener("click", function () {
                    element = document.querySelectorAll("#" + elementSelect + " .selectCSys-container")[0];
                    if (element.classList.contains("openSelect")) {
                        element.classList.remove("openSelect");
                    } else {
                        let selectOpen = document.getElementsByClassName('openSelect');
                        if (selectOpen.length > 0) {
                            selectOpen[0].classList.remove("openSelect");
                        }
                        element.classList.add("openSelect");
                        select_object.setPositionDropDown(elementSelect);
                        //focus
                        document.getElementById("input_" + elementSelect + "2").value = "";
                        document.getElementById("input_" + elementSelect + "2").focus();
                    }

                });
            }
        },
        keyup_event: function (elementSelect, data, champs) {
            document.getElementById("input_" + elementSelect + "2").addEventListener("keyup", function () {
                let search = document.getElementById("input_" + elementSelect + "2").value;
                let filtredData = select_object.filterDataSelect(data, search);
                let codeHTMLFiltred = select_object.prepareHtmlTable(filtredData, champs);
                document.querySelectorAll("#" + elementSelect + " tbody")[0].innerHTML = codeHTMLFiltred;
                select_object.setPositionDropDown(elementSelect);
            });
        },
        selectRowByObject: function (data) {
            let options = SelectedRowData[data.elementSelect];
            for (let i = 0; i < options.length; i++) {
                if (_.isEqual(options[i], data.object)) {
                    document.querySelectorAll("#tableSelect_" + data.elementSelect + " tr[numero='" + i + "']")[0].click();
                    break;
                }
            }
        },
        selectRowTable: function (elementSelect, multiSelect, champsSelection, elementSelected) {
            document.getElementById("tableSelect_" + elementSelect).addEventListener("click", function (e) {
                if (e.target.tagName.toLowerCase() === "tr" || e.target.tagName.toLowerCase() === "td") {
                    let item = e.target;
                    if (e.target.tagName.toLowerCase() === "td")
                        item = e.target.parentElement;
                    let index = item.getAttribute("numero");
                    let selectedRow = SelectedRowData[elementSelect][index];
                    elementSelected(selectedRow);
                    let element = document.querySelectorAll("#" + elementSelect + " .selectCSys-container")[0];
                    if (multiSelect === false) {
                        SelectedData[elementSelect] = [];
                        SelectedData[elementSelect].push(selectedRow);
                        document.getElementById(elementSelect).getElementsByClassName("select-chosen")[0].textContent = selectedRow[champsSelection];
                        document.getElementById("input_" + elementSelect + "2").value = selectedRow[champsSelection];
                        element.classList.remove("openSelect");
                    } else if (multiSelect === true) {
                        let check = sb.checkObjectInArray(selectedRow, SelectedData[elementSelect]);
                        if (check) {
                            sb.notify({
                                type: "showMessage",
                                data: {
                                    title: "Avertissement",
                                    numMsg: 5,
                                    typeMsg: "error",
                                    delai: 5000
                                }
                            });
                        } else {
                            SelectedData[elementSelect].push(selectedRow);
                            codeHTML = '<li class="selectCSys-selection-choice" title="SelectCSys 1">'
                                    + '<span class="selectCSys-selection-choice-remove">×</span>'
                                    + selectedRow[champsSelection]
                                    + '</li>';
                            document.getElementById(elementSelect).getElementsByClassName("selectCSys-selection-collection")[0].innerHTML += codeHTML;
                        }
                    }
                }
            });
        },
        getPositionSelectChoice: function (el) {
            let xPos = 0;
            let yPos = 0;

            while (el) {
                if (el.tagName.toLowerCase() === "body") {
                    let xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                    let yScroll = el.scrollTop || document.documentElement.scrollTop;
                    xPos += (el.offsetLeft - xScroll + el.clientLeft);
                    yPos += (el.offsetTop - yScroll + el.clientTop);
                } else {
                    xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                    yPos += (el.offsetTop - el.scrollTop + el.clientTop);
                }

                el = el.offsetParent;
            }
            return {
                x: xPos,
                y: yPos
            };
        },
        setPositionDropDown: function (elementSelect) {
            let $dropDown = $('#dropDown' + elementSelect);
            let el = document.getElementById('input_' + elementSelect + '1');
            let $window = $(window);
            let h = $window.height();
            let w = $window.width();
            let p = select_object.getPositionSelectChoice(el);
            if (h - p.y < $dropDown.height()) {
                let top = '-238px';
                $dropDown.css('bottom', '23px').css('top', 'inherit').closest('.selectCSys-container').addClass('openSelectOnTop');
            } else {
                $dropDown.css('bottom', 'inherit').css('top', '23px').closest('.selectCSys-container').removeClass('openSelectOnTop');
            }
            if (w - p.x < $dropDown.width()) {
                let right = '0px';
                $dropDown.css('right', right);
            }
        }
    };
});