var royal_tab_api = null;

function addEventMouse(btn, cont) {
    cont.$(btn).bind("mouseenter", function (e) {
        $(this).removeClass('fa-times');
        $(this).addClass('fa-times-circle');
        $(this).css('color', '#DC7070');
    });
    cont.$(btn).bind("mouseleave", function (e) {
        $(this).removeClass('fa-times-circle');
        $(this).addClass('fa-times');
        $(this).removeAttr('style');
        $(this).css('margin-left', '5px');
    });
}
function ouvrirOnglet(titre, src, repetee, container, param, namePage, annulReserv) {
    var test = false;
    if (container === 'parent') {
        var cont = window;
    } else {
        cont = window.parent;
    }
    if (royal_tab_api === null) {
        royal_tab_api = new Royal_Tab_Api(cont.$('div.royal_tab'));
    }
    if (param === undefined) {
        param = '';
    }
    var nb = cont.$('#main').find('iframe[namePage=' + namePage + ']').length;
    var annulRuserv = '';
    if (annulReserv && annulReserv !== undefined)
        annulRuserv = ' annul="true" ';
    if (!repetee) {
        if (nb === 0 || namePage === 'listebonCmdIntern') {
            if (namePage === 'listebonCmdIntern') {
                var index = cont.$('iframe[namePage=' + namePage + ']').parent('div').parent('div').index();
                royal_tab_api.remove(index);
            }
            royal_tab_api.add(0, true, titre, '<iframe ' + annulRuserv + ' namePage="' + namePage + '" src="' + src + param + '" width="100%" height="3000" frameborder="0" style="display:none;" onload="this.style.display = \'block\';"/>');
            test = true;
            cont.$('.ui-tabs-nav').find('li').eq(0).append("<span class='fa fa-times closeRad' style='margin-left: 5px;'></span>");
            addEventMouse(".closeRad", cont);
            cont.$(".closeRad").unbind('click').bind('click', function () {
                var typBon = cont.$('div iframe[namePage=' + namePage + ']').contents().find('#typeBon').text();
                if ((typBon === 'BS' || typBon === 'AA' || typBon === 'BP' || typBon === 'BF'))
                    annulerReserv(false, namePage);
                var indx = $(this).parents('li').index();
                royal_tab_api.remove(indx);
                cont.$(".ui-tabs-nav").find('li').eq(indx).click();
            });
        } else {
            index = cont.$('iframe[namePage=' + namePage + ']').parent('div').parent('div').index();
            royal_tab_api.open(index);
            if (cont.$('div iframe[namePage=' + namePage + ']').contents().find('#rafresh').length === 1)
                cont.$('div iframe[namePage=' + namePage + ']').contents().find('#rafresh').trigger("click");
            test = false;
        }
    } else {
        royal_tab_api.add(0, true, titre, '<iframe ' + annulRuserv + ' namePage="' + namePage + '" src="' + src + param + '" width="100%" height="3000" frameborder="0" style="display:none;" onload="this.style.display = \'block\';"/>');
        test = true;
        cont.$('.ui-tabs-nav').find('li').eq(0).append("<span class='fa fa-times closeRad' style='margin-left: 5px;'></span>");
        addEventMouse(".closeRad", cont);
        cont.$(".closeRad").unbind('click').bind('click', function () {
            var typBon = cont.$('div iframe[namePage=' + namePage + ']').contents().find('#typeBon').text();
            if ((typBon === 'BS' || typBon === 'AA' || typBon === 'BP' || typBon === 'BF'))
                annulerReserv(false, namePage);
            var indx = $(this).parents('li').index();
            royal_tab_api.remove(indx);
            cont.$(".ui-tabs-nav").find('li').eq(indx).click();
        });
    }
    titre = titre.toUpperCase();
    cont.$(".breadcrumb").find('li').eq(1).html(titre);
    cont.$(".ui-tabs-nav, .dropdown_menu").find('li').unbind('click').bind("click", function (event) {
        var title = $(this).text().toUpperCase();
        cont.$(".breadcrumb").find('li').eq(1).html(title);
    });

    return test;
}
function fermerOngletActif(container, indx) {
    if (container === 'parent') {
        var cont = window;
    } else {
        cont = window.parent;
    }
    if (royal_tab_api === null) {
        royal_tab_api = new Royal_Tab_Api(cont.$('div.royal_tab'));
    }
//    var indx = cont.$('.ui-tabs-nav').find('li.active').index();
    royal_tab_api.remove(indx);
}