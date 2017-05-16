function accoladeFormatter(text) {
    return "{ " + text + " }";
}

function parantheseFormatter(text) {
    return "( " + text + " )";
}

function crocheFormatter(text) {
    return "[ " + text + " ]";
}

function getSeparator() {
    return "    |    ";
}

function getSeparator2() {
    return "    -    ";
}

function convertToChar(etat_prest) {

    return String.fromCharCode(etat_prest);
}

function dateFormatter(date, timeformat) {
    var day;
    var month;
    var year;
    var fulldate;

    if (date == undefined || "")
        return ""
    day = (date.day.toString().length === 2) ? date.day : "0" + date.day;
    month = (date.month.toString().length === 2) ? date.month : "0" + date.month;
    year = date.year;

    fulldate = day + "/" + month + "/" + year;

    if (timeformat == "hh:mm") {
        var hour = (date.hour.toString().length === 2) ? date.hour : "0" + date.hour;
        var minute = (date.minute.toString().length === 2) ? date.minute : "0" + date.minute;
        fulldate += " " + hour + ":" + minute;
    }
    if (timeformat == "hh:mm:ss") {
        var hour = (date.hour.toString().length === 2) ? date.hour : "0" + date.hour;
        var minute = (date.minute.toString().length === 2) ? date.minute : "0" + date.minute;
        var second = (date.second.toString().length === 2) ? date.second : "0" + date.second;
        fulldate += " " + hour + ":" + minute + ":" + second;
    }


    return fulldate;


}


function getformatterdate(date) {
    var d = date.split('/');
    return d[2] + "-" + d[1] + "-" + d[0];


}

function timeFormatter(date, timeformat) {

    var time;

    if (timeformat == "hh:mm") {
        var hour = (date.hour.toString().length === 2) ? date.hour : "0" + date.hour;
        var minute = (date.minute.toString().length === 2) ? date.minute : "0" + date.minute;
        time = hour + ":" + minute;
    }
    else if (timeformat == "hh:mm:ss") {
        var hour = (date.hour.toString().length === 2) ? date.hour : "0" + date.hour;
        var minute = (date.minute.toString().length === 2) ? date.minute : "0" + date.minute;
        var second = (date.second.toString().length === 2) ? date.second : "0" + date.second;
        time = hour + ":" + minute + ":" + second;
    }
    else {
        var hour = (date.hour.toString().length === 2) ? date.hour : "0" + date.hour;
        var minute = (date.minute.toString().length === 2) ? date.minute : "0" + date.minute;
        time = hour + ":" + minute;
    }

    return time;

}

function getTimeNow(dateFormat) {
    var current = new Date();

    var hour;
    var minute;
    var second;

    hour = (current.getHours().toString().length === 2) ? current.getHours() : "0" + current.getHours();
    minute = (current.getMinutes().toString().length === 2) ? current.getMinutes() : "0" + current.getMinutes();
    second = (current.getSeconds().toString().length === 2) ? current.getSeconds() : "0" + current.getSeconds();

    if (dateFormat === "hh:mm") {
        return hour + ":" + minute;
    } else if (dateFormat === "hh:mm:ss") {
        return hour + ":" + minute + ":" + second;
    } else {
        return hour + ":" + minute + ":" + second;
    }
}

function getDateAfterDays(nbrDays) {
    var today = new Date();
    var dateResult = new Date();
    dateResult.setDate(today.getDate() + nbrDays);
    var day = (dateResult.getDate().toString().length === 2) ? dateResult.getDate() : "0" + dateResult.getDate();
    var month = (dateResult.getMonth().toString().length === 2) ? dateResult.getMonth() + 1 : "0" + (dateResult.getMonth() + 1);
    var year = dateResult.getFullYear();
    return day + '/' + month + '/' + year;
}

function getDateNow() {
    var current = new Date();
    var day, hour, min;
    var month;
    var year;

    day = (current.getDate().toString().length === 2) ? current.getDate() : "0" + current.getDate();
    month = ((current.getMonth() + 1).toString().length === 2) ? (current.getMonth() + 1) : "0" + (current.getMonth() + 1);
    year = current.getFullYear();
    hour = (current.getHours().toString().length === 2) ? current.getHours() : "0" + current.getHours();
    min = (current.getMinutes().toString().length === 2) ? current.getMinutes() : "0" + current.getMinutes();


    return day + "/" + month + "/" + year;// + " " + hour + ":" + min
}

function getDateTimeNow(timeFormat) {
    return getDateNow() + " " + getTimeNow(timeFormat);
}

function getDiffDayDate(dateSupp, dateInf, byYear) {
    var DSupp;
    if (dateSupp === "") {
        var dateNow = getDateNow().split("/");
        DSupp = new Date(dateNow[2], dateNow[1], dateNow[0]);
    } else {
        DSupp = new Date(dateSupp.year, dateSupp.month, dateSupp.day);
    }
    var DInf = new Date(dateInf.year, dateInf.month, dateInf.day);
    if (byYear === undefined)
        return parseInt(DSupp.getTime() / (24 * 60 * 60 * 1000)) - parseInt(DInf.getTime() / (24 * 60 * 60 * 1000));
    else
        return parseInt((DSupp.getTime() - parseInt(DInf.getTime())) / (24 * 60 * 60 * 1000 * 365));

}

function getListYear(infyear, suppyear) {

    var years = [];
    var nbrY = suppyear - infyear;
    for (var i = 0; i <= nbrY; i++) {
        var year = {};
        year["id"] = i.toString();
        year["text"] = (infyear + i).toString();
        years.push(year);
    }
    return years;


}

function moneyFormatter(money) {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
function moneyFormatterToFixed(money, fixed) {
    if (fixed === undefined)
        fixed = 3;
    var moneyFixed = money.toFixed(fixed);
    return moneyFixed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace(".", ",");
}

function tableFormatter(index, tableId, nbr_Cols) {
    var rows;
    var nbrCols;
    if (index !== "")
        rows = index.$("#" + tableId).find('tr');
    else
        rows = $("#" + tableId).find('tr');

    if (nbr_Cols === "all")
        nbrCols = $(rows).find('td').length / rows.length;
    else
        nbrCols = nbr_Cols;

    var arrayPos = [];
    var arrayNbrToFusion = [];
    for (var i = 0; i < nbrCols; i++) {
        var col = [];
        for (var j = 0; j < rows.length; j++) {
            var td = $($(rows[j]).find('td')[i]).text();
            col.push(td);

        }
        var compt = 1;
        var isPushed = false;
        for (var k = 0; k < col.length; k++) {
            var str1 = col[k] === undefined ? "" : col[k].trim();
            var str2 = col[k + 1] === undefined ? "" : col[k + 1].trim();
            if (str1 === str2 && !isPushed) {
                compt++;
                arrayPos.push(k);
                arrayNbrToFusion.push(compt);
                isPushed = true;

            } else if (str1 === str2 && isPushed) {
                compt++;
                arrayNbrToFusion[arrayNbrToFusion.length - 1] = compt;

            } else {
                compt = 1;
                isPushed = false;
            }
        }

        /////////////////////////////////////
        /////Traitement de fusion ICI//////////

        for (var p = 0; p < arrayPos.length; p++) {
            $($(rows[arrayPos[p]]).find('td')[i]).attr("rowspan", arrayNbrToFusion[p]);
            var limit = arrayNbrToFusion[p] + arrayPos[p];
            for (var c = arrayPos[p] + 1; c < limit; c++) {
                $($(rows[c]).find('td')[i]).attr("class", "todel" + i);
            }
        }

        //////////////////////////////////////

//        
//        console.log(arrayPos);
//        console.log(arrayNbrToFusion);

        arrayPos = [];
        arrayNbrToFusion = [];


    }

    for (var i = 0; i < nbrCols; i++) {
        index.$("#" + tableId).find('.todel' + i).remove();
    }


}

function CountEachMergedRow(table_body, nbCols, keyColToCount) {
//    var tmpnbCol = 0;
    var listOfCell = $(table_body).find('tr').find('td');
    var cell = $(listOfCell[keyColToCount]);
//    $(cell).append('<i class="label label-danger mynotification">-' + $(cell).prop("rowspan") + ' </i>');

    for (var i = 0; i < listOfCell.length; i++) {
        cell = $(listOfCell[i]);
        if ($(cell).siblings().length > 1) {

            $(listOfCell[i + keyColToCount]).append('<i class="label label-danger mynotification" >-' + $(listOfCell[i + keyColToCount]).prop("rowspan") + ' </i>');
            i += nbCols - 1;
        } else {
            $(cell).append('<i class="label label-danger mynotification" >-' + $(cell).prop("rowspan") + ' </i>');
        }
    }
}


function formIsValide(index, formId) {
    var $inputs = index.$("#" + formId).find('input:required');
    var isValide = true;
    $inputs.each(function () {
        if ($(this).val() === "") {
            isValide = false;
        }
    });

    return isValide;


}


function getDateReferToNow(y) {
    var current = new Date();
    var day;
    var month;
    var year;

    day = (current.getDate().toString().length === 2) ? current.getDate() : "0" + current.getDate();
    month = ((current.getMonth() + 1).toString().length === 2) ? (current.getMonth() + 1) : "0" + (current.getMonth() + 1);
    year = current.getFullYear();

    if (y !== undefined)
        year = (parseInt(year) - y).toString();


    return day + "/" + month + "/" + year;
}


function showLoadingDialog() {
//    setTimeout(function() {
    window.parent.$("#loading_modal").modal("show");
//    }, 50);

}

function dismessLoadingDialog() {
//    setTimeout(function() {
    window.parent.$("#loading_modal").modal("hide");
//    }, 50);
}


function compareTwoDate(firstDateTime, secondDateTime, dateSeparator, timeSeparator) {
    var frstDate = firstDateTime.split(" ")[0];
    var frstTime = firstDateTime.split(" ")[1];
    var secDate = secondDateTime.split(" ")[0];
    var secTime = secondDateTime.split(" ")[1];

    var arrayFrstDate = frstDate.split(dateSeparator);
    var arrayFrstTime = frstTime.split(timeSeparator);
    var arraySecDate = secDate.split(dateSeparator);
    var arraySecTime = secTime.split(timeSeparator);

    var firstDateTimeObj = new Date(arrayFrstDate[2], arrayFrstDate[1], arrayFrstDate[0], arrayFrstTime[0], arrayFrstTime[1]);
    var SecondDateTimeObj = new Date(arraySecDate[2], arraySecDate[1], arraySecDate[0], arraySecTime[0], arraySecTime[1]);
    var arrayScalarDate = [];
    var diffMunites = SecondDateTimeObj.getTime() / (60 * 1000) - firstDateTimeObj.getTime() / (60 * 1000);
    if (firstDateTimeObj - SecondDateTimeObj < 0) {
        arrayScalarDate.push(parseInt(diffMunites / (60 * 24)));
        arrayScalarDate.push(parseInt((diffMunites % (60 * 24)) / 60));
        arrayScalarDate.push(parseInt((diffMunites % (60 * 24)) % 60));
    }

    return arrayScalarDate;

}

function TexttdIsSelected(tableId, codB) {
    var exist = false;
    var rows = $("#" + tableId).find("table").find('tr');
    var cols = $($("#" + tableId).find('thead').find('tr')[0]).find('th');
    for (var i = 1; i < rows.length; i++) {
        for (var j = 0; j < cols.length; j++) {
            var codeBoite = $($(rows[i]).find('td')[0]).text();
            if (codeBoite.toUpperCase() === codB.toUpperCase()) {
                exist = true;
                break;
            }
        }

    }

    return exist;
}

function TexttdIsSelected2(tableId, codB) {
    var exist = false;
    var rows = $("#" + tableId).find('tr');
    var cols = $($("#" + tableId).find('tr')[0]).find('td');
    for (var i = 1; i < rows.length; i++) {
        for (var j = 0; j < cols.length; j++) {
            var codeBoite = $($(rows[i]).find('td')[0]).text();
            if ($.trim(codeBoite.toUpperCase()) === $.trim(codB.toUpperCase())) {
                exist = true;
                break;
            }
        }

    }

    return exist;
}
function TexttdIsSelectedRea(tableId, codB) {
    var exist = false;
    var rows = $("#" + tableId).find('tr');
    var cols = $($("#" + tableId).find('tr')[0]).find('td');
    for (var i = 1; i < rows.length; i++) {
        for (var j = 0; j < cols.length; j++) {
            var codeBoite = $($(rows[i]).find('td')[0]).text();
            var indice = codeBoite.lastIndexOf("(");
            if (indice !== -1)
                codeBoite = codeBoite.substring(0, indice);
            if ($.trim(codeBoite.toUpperCase()) === $.trim(codB.toUpperCase())) {
                exist = true;
                break;
            }
        }

    }

    return exist;
}

function getTimeBaseHourMinut(hour, minut) {
    var timeRes = "";
    if (minut === "") {
        return hour;
    } else {

        if (hour.length === 1)
            hour = "0" + hour;
        if (minut.length === 1)
            minut = "0" + minut;

        return hour + ":" + minut;

    }
}


function isBetween(number, min, max) {
    if (number >= min && number <= max)
        return true;
    else
        return false;
}


function evalData(data) {
    data = $.trim(data);
    return data.replace(new RegExp(/["]/g), "");
}


function getDateFormatString(stringDate) {
    var arrayDate = stringDate.split("/");
    var day = (arrayDate[0].length === 2) ? arrayDate[0] : "0" + arrayDate[0];
    var month = (arrayDate[1].length === 2) ? arrayDate[1] + 1 : "0" + arrayDate[1];
    var year = arrayDate[2];
    return day + '/' + month + '/' + year;
}