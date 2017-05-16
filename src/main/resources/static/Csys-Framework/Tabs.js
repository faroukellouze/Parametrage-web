let tabs_api = null;

CORE.create_module("Tabs", function (sb) {
    let royalTab_object;
    let element;

    return {
        init: function () {
            royalTab_object = this;
            sb.listen({
                "initializeRoyaTabl": this.initializeRoyaTabl,
                "addPlusMenu": this.addPlusMenu,
                "addMenu": this.addMenu
            });
        },
        destroy: function () {

        },
        initializeRoyaTabl: function (div_royal) {
            element = div_royal;
            tabs_api = new Royal_Tab_Api($(element));
        },
        addPlusMenu: function () {
            let length = element.querySelectorAll("ul.ui-tabs-nav li").length;
            tabs_api.add(length, true, "+", '', false);

            let active = div_royal.querySelectorAll(".views div.active")[0];
            div_royal.querySelectorAll("#tabs li.active")[0].setAttribute("id", "menu");

            sb.notify({
                type: "charger_page",
                data: {
                    url: "templatesMenu",
                    element: active
                }
            });
        },
        addMenu: function (e) {
            let length = element.querySelectorAll("ul.ui-tabs-nav li").length;
            tabs_api.add(length - 1, true, e.innerText, '', false);

            let src = e.id;
            let active = div_royal.querySelectorAll(".views div.active")[0];
            div_royal.querySelectorAll("#tabs li.active")[0].setAttribute("id", e.id);

            sb.notify({
                type: "charger_page",
                data: {
                    url: src,
                    element: active
                }
            });

            document.getElementsByClassName("ui-tabs-nav")[0].querySelectorAll("li")[length - 1].innerHTML += "<span class='closeTab fa fa-times' id='close" + e.id + "'></span>";
            royalTab_object.addEventTabs("close" + e.id);
        },
        addEventTabs: function (id) {
            let element = document.getElementById(id);

            element.addEventListener("mouseenter", function (e) {
                element.classList.remove('fa-times');
                element.classList.add('fa-times-circle');
            });

            element.addEventListener("mouseleave", function (e) {
                element.classList.remove('fa-times-circle');
                element.classList.add('fa-times');
            });

            element.addEventListener("click", function (e) {
                let element = e.currentTarget;
                let tabs_nav = document.getElementsByClassName("ui-tabs-nav")[0];
                let main = document.getElementsByClassName("main")[0];

                let nodes = Array.prototype.slice.call(tabs_nav.children);
                let indx = nodes.indexOf(element.parentElement);
                let acive = element.parentElement.classList.contains("active");

                let activeDiv = element.parentElement.id;

                let tables = $(".views").find("[source=" + activeDiv + "]").find(".dataTables_wrapper");
                for (const table of tables) {
                    Tables[table.id.replace("_wrapper", "")] = null;
                }

                tabs_api.remove(indx);
                if (acive)
                    tabs_nav.getElementsByTagName("li")[indx].click();

                if (tabs_nav.getElementsByTagName("li").length === 1) {
                    main.classList.remove('withTabs');
                    main.classList.add('withNotTabs');
                    window.history.pushState(null, null, "menu");
                }

                e.stopPropagation();
            });

            element.parentElement.addEventListener("click", function (e) {
                window.history.pushState(null, null, this.id);
            });
        }
    };
});
