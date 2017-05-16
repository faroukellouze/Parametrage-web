$(function () {
    ouvrirOnglet('Acceuil', "../body_page/Acceuil.jsp", false, 'parent', '', 'Acceuil');
    var trait = getTraitement();
    $.ajax({
        url: "../Menu?destination=index&trait=" + trait,
        type: 'POST',
        async: false,
        error: function (jqXHR, textStatus, errorThrown) {
        },
        complete: function (jqXHR, textStatus) {

        },
        success: function (data, textStatus, jqXHR) {
            var list = eval('(' + data + ')');
            $('.minifyme').click()
            $('.minifyme').remove();
            $('#hide-menu').remove();
            $('#menuUser').html(list[0]);
            $('#main').append(list[1]);
            $('.minifyme').click();
            window.parent.$(".breadcrumb").html("<li>" + trait.toUpperCase() + "</li><li>ACCEUIL</li>");
            $("#logout").unbind("click");
            $("#logout").bind("click", function (e) {
                $('#disconnectConfirm').modal('show');
            });
            $('.achat').bind('click', function (e) {
                if ($('#menuAchat').hasClass('actif')) {
                    $('#menuAchat').removeClass('slideInLeft');
                    $('#menuAchat').addClass('slideOutLeft');
                    $('#menuAchat').removeClass('actif');
                    $('#menuUser li').removeClass('active');
                    $('.menuActive').addClass("active");
                } else {
                    $('.actif').removeClass('slideInLeft');
                    $('.actif').addClass('slideOutLeft');
                    $('.actif').removeClass('actif');
                    $('#menuAchat').removeClass('slideOutLeft');
                    $('#menuAchat').addClass('slideInLeft');
                    $('#menuAchat').addClass('actif');
                    $('#menuAchat').show();
                    $("nav li").removeClass("active");
                    $('.menuActive').addClass("active");
                    $('.achat').parents("li").addClass("active");
                }
            });
            $('.prelev').bind('click', function (e) {
                if ($('#menuPrelev').hasClass('actif')) {
                    $('#menuPrelev').removeClass('slideInLeft');
                    $('#menuPrelev').addClass('slideOutLeft');
                    $('#menuPrelev').removeClass('actif');
                    $('#menuUser li').removeClass('active');
                    $('.menuActive').addClass("active");
                } else {
                    $('.actif').removeClass('slideInLeft');
                    $('.actif').addClass('slideOutLeft');
                    $('.actif').removeClass('actif');
                    $('#menuPrelev').removeClass('slideOutLeft');
                    $('#menuPrelev').addClass('slideInLeft');
                    $('#menuPrelev').addClass('actif');
                    $('#menuPrelev').show();
                    $("nav li").removeClass("active");
                    $('.menuActive').addClass("active");
                    $('.prelev').parents("li").addClass("active");
                }
            });
            $('.edit').bind('click', function (e) {
                if ($('#menuEdit').hasClass('actif')) {
                    $('#menuEdit').removeClass('slideInLeft');
                    $('#menuEdit').addClass('slideOutLeft');
                    $('#menuEdit').removeClass('actif');
                    $('#menuUser li').removeClass('active');
                    $('.menuActive').addClass("active");
                } else {
                    $('.actif').removeClass('slideInLeft');
                    $('.actif').addClass('slideOutLeft');
                    $('.actif').removeClass('actif');
                    $('#menuEdit').removeClass('slideOutLeft');
                    $('#menuEdit').addClass('slideInLeft');
                    $('#menuEdit').addClass('actif');
                    $('#menuEdit').show();
                    $("nav li").removeClass("active");
                    $('.menuActive').addClass("active");
                    $('.edit').parents("li").addClass("active");
                }
            });
            $('.admin').bind('click', function (e) {
                if ($('#menuAdmin').hasClass('actif')) {
                    $('#menuAdmin').removeClass('slideInLeft');
                    $('#menuAdmin').addClass('slideOutLeft');
                    $('#menuAdmin').removeClass('actif');
                    $('#menuUser li').removeClass('active');
                    $('.menuActive').addClass("active");
                } else {
                    $('.actif').removeClass('slideInLeft');
                    $('.actif').addClass('slideOutLeft');
                    $('.actif').removeClass('actif');
                    $('#menuAdmin').removeClass('slideOutLeft');
                    $('#menuAdmin').addClass('slideInLeft');
                    $('#menuAdmin').addClass('actif');
                    $('#menuAdmin').show();
                    $("nav li").removeClass("active");
                    $('.menuActive').addClass("active");
                    $('.admin').parents("li").addClass("active");
                }
            });
            $("#index").bind("click", function (e) {
                $('.actif').removeClass('slideInLeft');
                $('.actif').addClass('slideOutLeft');
                $('.actif').removeClass('actif');
                $('.menuActive').removeClass('menuActive');
                window.parent.$(".breadcrumb").html("<li>" + trait.toUpperCase() + "</li><li>ACCEUIL</li>");
                ouvrirOnglet('Acceuil', "../body_page/Acceuil.jsp", false, 'parent', '', 'Acceuil');
            });
            $(".index").bind("click", function (e) {
                $("nav li").removeClass("active");
                $('.actif').removeClass('slideInLeft');
                $('.actif').addClass('slideOutLeft');
                $('.actif').removeClass('actif');
                $('.menuActive').removeClass('menuActive');
                $(this).parents("li").addClass("active");
                $(this).parents("li").addClass("menuActive");
                window.parent.$(".breadcrumb").html("<li>" + trait.toUpperCase() + "</li><li>ACCEUIL</li>");
                ouvrirOnglet('Acceuil', "../body_page/Acceuil.jsp", false, 'parent', '', 'Acceuil');
            });
            $(".param").bind("click", function (e) {
                $('.actif').removeClass('slideInLeft');
                $('.actif').addClass('slideOutLeft');
                $('.actif').removeClass('actif');
                $('.menuActive').removeClass('menuActive');
                $("nav li").removeClass("active");
                $('.admin').parents("li").addClass("active");
                $('.admin').parents("li").addClass("menuActive");
                ouvrirOnglet('Paramétrage', "../body_page/param.jsp", false, 'parent', '', 'param');
            });
            $(".listebonCmdIntern").bind("click", function (e) {
                $('.actif').removeClass('slideInLeft');
                $('.actif').addClass('slideOutLeft');
                $('.actif').removeClass('actif');
                $('.menuActive').removeClass('menuActive');
                $("nav li").removeClass("active");
                $('.prelev').parents("li").addClass("active");
                $('.prelev').parents("li").addClass("menuActive");
                ouvrirOnglet('Bon de commande interne', "../body_page/listebonCmdIntern.jsp", false, 'parent', '', 'listebonCmdIntern');
            });
            $(".listddeAchat").bind("click", function (e) {
                $('.actif').removeClass('slideInLeft');
                $('.actif').addClass('slideOutLeft');
                $('.actif').removeClass('actif');
                $('.menuActive').removeClass('menuActive');
                $("nav li").removeClass("active");
                $('.achat').parents("li").addClass("active");
                $('.achat').parents("li").addClass("menuActive");
                ouvrirOnglet('Demande d\'achat', "../body_page/listeddeAchat.jsp", false, 'parent', '', 'listeddeAchat');
            });
            $(".listbc").bind("click", function (e) {
                $('.actif').removeClass('slideInLeft');
                $('.actif').addClass('slideOutLeft');
                $('.actif').removeClass('actif');
                $('.menuActive').removeClass('menuActive');
                $("nav li").removeClass("active");
                $('.achat').parents("li").addClass("active");
                $('.achat').parents("li").addClass("menuActive");
                ouvrirOnglet('Bon de commande', "../body_page/listeboncommande.jsp", false, 'parent', '', 'listeboncommande');
            });
            $(".listavoirsf").bind("click", function (e) {
                $('.actif').removeClass('slideInLeft');
                $('.actif').addClass('slideOutLeft');
                $('.actif').removeClass('actif');
                $('.menuActive').removeClass('menuActive');
                $("nav li").removeClass("active");
                $('.achat').parents("li").addClass("active");
                $('.achat').parents("li").addClass("menuActive");
                ouvrirOnglet('Avoir financier', "../body_page/listAvoirs.jsp", false, 'parent', '?typeA=AAF', 'listAvoirsf');
            });
            $(".listbr").bind("click", function (e) {
                $('.actif').removeClass('slideInLeft');
                $('.actif').addClass('slideOutLeft');
                $('.actif').removeClass('actif');
                $('.menuActive').removeClass('menuActive');
                $("nav li").removeClass("active");
                $('.achat').parents("li").addClass("active");
                $('.achat').parents("li").addClass("menuActive");
                ouvrirOnglet('Bon de réception', "../body_page/listebonreception.jsp", false, 'parent', '', 'listebonreception');
            });
            $(".listBonPrelev").bind("click", function (e) {
                $('.actif').removeClass('slideInLeft');
                $('.actif').addClass('slideOutLeft');
                $('.actif').removeClass('actif');
                $("nav li").removeClass("active");
                $('.menuActive').removeClass('menuActive');
                $('.prelev').parents("li").addClass("active");
                $('.prelev').parents("li").addClass("menuActive");
                ouvrirOnglet('Bon de prélèvement', "../body_page/listebonprelevement.jsp", false, 'parent', '', 'listebonprelevement');
            });
            $(".listBonRetour").bind("click", function (e) {
                $('.actif').removeClass('slideInLeft');
                $('.actif').addClass('slideOutLeft');
                $('.actif').removeClass('actif');
                $("nav li").removeClass("active");
                $('.prelev').parents("li").addClass("active");
                $('.prelev').parents("li").addClass("menuActive");
                ouvrirOnglet('Bon de retour', "../body_page/listebonretour.jsp", false, 'parent', '', 'listebonretour');
            });
            $(".listBonRetourFrs").bind("click", function (e) {
                $('.actif').removeClass('slideInLeft');
                $('.actif').addClass('slideOutLeft');
                $('.actif').removeClass('actif');
                $("nav li").removeClass("active");
                $('.menuActive').removeClass('menuActive');
                $('.prelev').parents("li").addClass("active");
                $('.prelev').parents("li").addClass("menuActive");
                ouvrirOnglet('Bon de retour Fournisseur', "../body_page/listebonretourFrs.jsp", false, 'parent', '', 'listebonretourFrs');
            });
            $(".editStat").bind("click", function (e) {
                $('.actif').removeClass('slideInLeft');
                $('.actif').addClass('slideOutLeft');
                $('.actif').removeClass('actif');
                $('.menuActive').removeClass('menuActive');
                $("nav li").removeClass("active");
                $('.edit').parents("li").addClass("active");
                $('.edit').parents("li").addClass("menuActive");
//                $(".breadcrumb").html('Edition & statistique');
                ouvrirOnglet('Edition et statistique', "../body_page/edition.jsp", false, 'parent', '', 'edition');
            });
            $(".facDirect").bind("click", function (e) {
                $('.actif').removeClass('slideInLeft');
                $('.actif').addClass('slideOutLeft');
                $('.actif').removeClass('actif');
                $("nav li").removeClass("active");
                $('.menuActive').removeClass('menuActive');
                $('.achat').parent('li').addClass("active");
                $('.achat').parent('li').addClass("menuActive");
                ouvrirOnglet('Facture', "../body_page/listefacture.jsp", false, 'parent', '?typeF=ff', 'listefactureff');
            });
            $(".facRecep").bind("click", function (e) {
                $('.actif').removeClass('slideInLeft');
                $('.actif').addClass('slideOutLeft');
                $('.actif').removeClass('actif');
                $("nav li").removeClass("active");
                $('.menuActive').removeClass('menuActive');
                $('.achat').parent('li').addClass("active");
                $('.achat').parent('li').addClass("menuActive");
                ouvrirOnglet('Facture de réception', "../body_page/listefacture.jsp", false, 'parent', '?typeF=fl', 'listefacturefl');
            });
            $(".avoir").bind("click", function (e) {
                $('.actif').removeClass('slideInLeft');
                $('.actif').addClass('slideOutLeft');
                $('.actif').removeClass('actif');
                $("nav li").removeClass("active");
                $('.menuActive').removeClass('menuActive');
                $('.achat').parent('li').addClass("active");
                $('.achat').parent('li').addClass("menuActive");
                ouvrirOnglet('Avoir', "../body_page/listAvoirs.jsp", false, 'parent', '?typeA=AA', 'listAvoirs');
            });
            $(".bonentre").bind("click", function (e) {
                $('.actif').removeClass('slideInLeft');
                $('.actif').addClass('slideOutLeft');
                $('.actif').removeClass('actif');
                $("nav li").removeClass("active");
                $('.menuActive').removeClass('menuActive');
                $('.achat').parent('li').addClass("active");
                $('.achat').parent('li').addClass("menuActive");
                ouvrirOnglet('Bon d\'entré', "../body_page/listebonentre.jsp", false, 'parent', '', 'listbonentre');
            });
            $(".bonRedress").bind("click", function (e) {
                $('.actif').removeClass('slideInLeft');
                $('.actif').addClass('slideOutLeft');
                $('.actif').removeClass('actif');
                $("nav li").removeClass("active");
                $('.menuActive').removeClass('menuActive');
                $('.achat').parent('li').addClass("active");
                $('.achat').parent('li').addClass("menuActive");
                ouvrirOnglet('Bon de redressement', "../body_page/listebonRedressement.jsp", false, 'parent', '', 'listbonRedress');
            });
        }
    });

});