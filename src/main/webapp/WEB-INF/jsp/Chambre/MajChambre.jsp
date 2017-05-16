<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@page contentType="text/html" pageEncoding="UTF-8" session="false" %>
<style>
    #litCollection .dataTables_scrollBody{
        max-height: 200px!important;
    }
</style>
<div class="header-aside">
    <a class="close-asidebar" href="#"><i class="fa fa-chevron-right fermer-aside"></i></a>
    <div class="right">
        <div>
            <h3 id="titleAside"></h3>
        </div>
        <div>
            <div class="action-icons">
                <a class="btn btn-default btn-valide" id="btnValiderChambre"><i
                        class="glyphicon glyphicon-ok"></i></a>
            </div>
        </div>
    </div>
</div>
<div class="body-aside">
    <form id="formChambre">
        <fieldset>
            <h3 class="header-csys"><spring:message code="label.informationChambre"/></h3>
            <div class="flex-row-space">
                <section class="flex-row-space flex-6" disabled>
                    <label class="control-label flex-4"><spring:message code="label.numeroChambre"/></label>
                    <div class="control-input  flex-8" >
                        <input id="numeroChambre" name="numeroChambre" type="text" class="form-control-csys input-xs" required>
                    </div>
                </section>
                <section class="flex-row-space flex-6">
                    <label class="control-label flex-4"><spring:message code="label.categorie"/></label>
                    <div class="control-input flex-8" id="codeCathegorie"></div>
                </section>
            </div>


            <div class="flex-row-space">
                <section class="flex-row-space flex-6">
                    <label class="control-label flex-4"><spring:message code="label.etage"/></label>
                    <div class="control-input flex-8" id="codeEtage">
                    </div>
                </section>
                <section class="flex-row-space flex-6">
                    <label class="control-label flex-4"><spring:message code="label.service"/></label>
                    <div class="control-input flex-8" id="codeService">
                    </div>
                </section>
            </div>

            <div class="flex-row-space">
                <section class="flex-row-space flex-6">
                    <label class="control-label flex-4"><spring:message code="label.etat"/></label>
                    <div class="control-input flex-8" id="etatChambre">
                    </div>
                </section>
                <section class="flex-row-start flex-6">
                    <label class="control-label flex-4"><spring:message code="label.nbreLit"/></label>
                    <div class="control-input flex-2" >
                        <input id="nbrLit" disabled="" name="nbrLit" type="number" class="form-control-csys input-xs" step="1" value="0" min="1" max="30" required>
                    </div>
                </section>
            </div>
            <div class="flex-row-start flex-9">
                <section class="flex-row-space flex-5">
                    <label class="control-label">
                        <input id="autorisAccompagant" name="autorisAccompagant" type="checkbox" checked class="checkbox">
                        <span><spring:message code="span.autoriserAccompagnant"/></span>
                    </label>
                </section>

                <section class="flex-row-space flex-3">
                    <label class="control-label">
                        <input id="virtuelle" name="virtuelle" type="checkbox" checked class="checkbox">
                        <span><spring:message code="span.virtuelle"/></span>
                    </label>
                </section>
                <section class="flex-row-space flex-4">
                    <label class="control-label">
                        <input id="actif" name="actif" type="checkbox" checked class="checkbox">
                        <span><spring:message code="span.btnActif"/></span>
                    </label>
                </section>
            </div>
        </fieldset>
        <fieldset>
            <h3 class="header-csys"><spring:message code="h3.Lits"/></h3>
            <div id="litCollection">
                <table id="lit"
                       class="table table-bordered table-striped table-editable no-margin table-hover sortable"></table>
            </div>
        </fieldset>



    </form>
</div>
<script src="js/files/MajChambre.js"></script>
