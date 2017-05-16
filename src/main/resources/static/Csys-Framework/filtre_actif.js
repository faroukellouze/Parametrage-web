CORE.create_module("filtre_actif", function (sb) {
    let tous, actif, non_actif, refresh;
    let filtre_actif_object;

    return {
        init: function () {
            filtre_actif_object = this;

            sb.listen({
                "hide-filters": this.hideFilters,
                "trigger-refresh": this.refresh
            });

            tous = document.querySelectorAll(".views div.active [name=btnTousActif]")[0];
            actif = document.querySelectorAll(".views div.active [name=btnActif]")[0];
            non_actif = document.querySelectorAll(".views div.active [name=btnNonActif]")[0];
            refresh = document.querySelectorAll(".views div.active .zoneRaffesh")[0];

            if (tous !== undefined)
                tous.addEventListener("click", this.filter, false);

            if (actif !== undefined)
                actif.addEventListener("click", this.filter, false);

            if (non_actif !== undefined)
                non_actif.addEventListener("click", this.filter, false);

            if (refresh !== undefined)
                refresh.addEventListener("click", this.refresh, false);
        },
        destroy: function () {
            tous = actif = non_actif = null;
        },
        hideFilters: function (e) {
            tous.style.display = "none";
            actif.style.display = "none";
            non_actif.style.display = "none";
        },
        filter: function (e) {
            let element = e.currentTarget;

            tous.classList.remove("active");
            actif.classList.remove("active");
            non_actif.classList.remove("active");
            element.classList.add("active");

            let type = element.getAttribute("name");
            if (type === "btnTousActif")
                type = "false,true";
            else if (type === "btnActif")
                type = "true";
            else if (type === "btnNonActif")
                type = "false";

            sb.notify({
                type: "filter-actif-" + refresh.getAttribute("table"),
                data: {
                    type: type,
                    mode: "refresh"
                }
            });
        },
        refresh: function (data) {
            let labelActive = document.querySelector(".views div.active #blockEtat label.active");
            let type = "";
            if (labelActive !== null)
                type = labelActive.getAttribute("name");

            if (type === "btnTousActif")
                type = "false,true";
            else if (type === "btnActif")
                type = "true";
            else if (type === "btnNonActif")
                type = "false";

            if (data instanceof Event)
                data = refresh.getAttribute("table");

            sb.notify({
                type: "refresh-datatables-" + data,
                data: {
                    type: type,
                    mode: "refresh"
                }
            });
        }
    };
});