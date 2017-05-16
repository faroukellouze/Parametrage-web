<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@page contentType="text/html" pageEncoding="UTF-8" session="false" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
        <link href="Csys-Framework/selectCSys.css" rel="stylesheet" type="text/css"/>
    </head>
    <body style=" overflow-x: hidden;">
        <section id="widget-grid" class="">
            <div class="row">
                <article class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="jarviswidget" id="" data-widget-editbutton="false"
                         data-widget-deletebutton="false">
                        <header class='screen'>
                            <div id="bntContainer"></div>
                        </header>
                        <div class="widget-body">
                            <div id="events">
                            </div>
                            <div class="well header-list">
                                <div class="zoneRecherche">
                                    <form id="search-form" class="smart-form client-form" novalidate="novalidate">
                                        <fieldset>
                                            <section>
                                                <label class="input">
                                                    <i class="icon-append fa fa-search"></i>
                                                    <spring:message code="input.recherche" var="search_dataTable"/>
                                                    <input id="search_dataTable" type="text"
                                                           placeholder="${search_dataTable}"></label>
                                            </section>
                                        </fieldset>
                                    </form>
                                </div>
                                <div class="zoneFiltre">
                                    <div class="groupeFiltre" id="blockEtat">
                                        <div class="btn-group" data-toggle="buttons">
                                            <label class="btn btn-default borderLeftPrimary active" name="btnTousActif">
                                                <input type="radio" value="all" data-bv-field="filtreDemo">
                                                <span><spring:message code="span.btnTousActif"/></span>
                                            </label>
                                            <label class="btn btn-default borderLeftSuccess" operation="1" name="btnActif">
                                                <input type="radio" value="true" data-bv-field="filtreDemo">
                                                <span><spring:message code="span.btnActif"/></span>
                                            </label>
                                            <label class="btn btn-default borderLeftDanger" operation="0" name="btnNonActif">
                                                <input type="radio" value="false" data-bv-field="filtreDemo">
                                                <span><spring:message code="span.btnNonActif"/></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="zoneButton">
                                    <div class="btn-group ButtonPlus">
                                        <button class="dropdown-toggle disabled" data-toggle="dropdown" aria-expanded="false">
                                            <i class="fa fa-gear fa-lg"></i> <i class="fa fa-caret-down"></i>
                                        </button>
                                        <ul class="dropdown-menu">

                                        </ul>
                                    </div>
                                    <button class="zoneRaffesh" table="sous-famille-prestations">
                                        <i class="fa fa-lg fa-refresh"></i>
                                    </button>
                                </div>

                            </div>
                            <div class="body-list well">
                                <table id="_grid_ListsousFamillePrestation"
                                       class="table table-bordered table-striped table-editable no-margin table-hover sortable"></table>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </section>

        <script src="js/files/sousFamillePrestation.js"></script>
    </body>
</html>
