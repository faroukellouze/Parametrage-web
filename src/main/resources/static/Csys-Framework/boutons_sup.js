CORE.create_module("bntContainer", function (sb) {
    var btnPrint, delMotif, consultMotif, edidMotif, addMotif;

    return {
        object: null,
        init: function () {
            object = this;

            // btnPrint = document.getElementById("btnPrint");
            // delMotif = document.getElementById("delMotif");
            // consultMotif = document.getElementById("consultMotif");
            // edidMotif = document.getElementById("edidMotif");
            // addMotif = document.getElementById("addMotif");

            // btnPrint.addEventListener("click", this.btnPrint, false);
            // delMotif.addEventListener("click", this.delMotif, false);
            // consultMotif.addEventListener("click", this.consultMotif, false);
            // edidMotif.addEventListener("click", this.edidMotif, false);
            // addMotif.addEventListener("click", this.addMotif, false);
        },
        destroy: function () {
            btnPrint = delMotif = consultMotif = edidMotif = addMotif = null;
        },
        btnPrint: function () {
            window.print();
        },
        delMotif: function () {
            alert("delMotif");
        },
        consultMotif: function () {
            alert("consultMotif");
        },
        edidMotif: function () {
            alert("edidMotif");
        },
        addMotif: function () {
            alert("addMotif");
        }
    };
});