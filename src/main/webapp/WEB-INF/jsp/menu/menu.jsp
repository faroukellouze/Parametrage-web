<%@page contentType="text/html" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html style="overflow: hidden!important;">
<head>
    <title>Demo</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <jsp:include page="../css_declare.jsp"/>
    <link href="Csys-Framework/listCsys.css" rel="stylesheet" type="text/css"/>
    <link href="Csys-Framework/styleCsys.css" rel="stylesheet" type="text/css"/>
    <link href="Csys-Framework/dataTable.css" rel="stylesheet" type="text/css"/>
    <link href="Csys-Framework/menuCsys.css" rel="stylesheet" type="text/css"/>
    <link href="css/files/menu.css" rel="stylesheet" type="text/css"/>
    <link href="Csys-Framework/tabs_Csys.css" rel="stylesheet" type="text/css"/>
</head>
<body id="mainMenu" class="fixed-header styleCsys">
<jsp:include page="../jsp_header.jsp"/>
<jsp:include page="../js_declare.jsp"/>
<div role="main" class="withNotTabs main">
    <div class="ribbon">
        <div class="right_col">
            <div class="royal_tab" data-position="top" data-alignment="left">
                <div class="tabs" id="tabs">
                    <ul class="ui-tabs-nav">
                    </ul>
                </div>
                <div class="views"></div>
            </div>
        </div>
    </div>
    <div class="content">
        <jsp:include page="./menuContent.jsp"/>
    </div>
</div>
<jsp:include page="./modals.jsp"/>
</body>
</html>
