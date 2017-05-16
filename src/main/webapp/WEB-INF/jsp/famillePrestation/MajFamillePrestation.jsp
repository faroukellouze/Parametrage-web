<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@page contentType="text/html" pageEncoding="UTF-8" session="false" %>
<style>
</style>
<div class="header-aside">
    <a class="close-asidebar" href="#"><i class="fa fa-chevron-right fermer-aside"></i></a>
    <div class="right">
        <div>
            <h3 id="titleAside"></h3>
        </div>
        <div>
            <div class="action-icons">
                <a class="btn btn-default btn-valide" id="btnValiderFamillePrestation"><i
                        class="glyphicon glyphicon-ok"></i></a>
            </div>
        </div>
    </div>
</div>
<div class="body-aside">
    <form enctype='application/json' id="formFamillePrestation" method="POST" action=" http://localhost:9000/api/societes" target="_blank">
        <fieldset>
            <h3 class="header-csys"><spring:message code="h3.InformationFamillePrestation"/></h3>
            <div class="flex-row-start">
                <section class="flex-row-space flex-6">
                    <label class="control-label flex-4"><spring:message code="label.typePrestation"/></label>
                    <div class="control-input flex-8" id="codeTypePrestation">
                    </div>
                </section>
                <section class="flex-row-space flex-1">
                    <label class="control-label">
                        <input id="actif" name="actif" type="checkbox" checked class="checkbox">
                        <span><spring:message code="span.btnActif"/></span>
                    </label>
                </section>
            </div>
            <div class="flex-row-space">
                <section class="flex-row-space flex-12">
                    <label class="control-label flex-2"><spring:message
                            code="label.designationEn"/></label>
                    <div class="control-input flex-10">
                        <input type="text" id="designationEn" name="designationEn" class="form-control-csys input-xs"
                               required>
                    </div>
                </section>
            </div>

            <div class="flex-row-space">
                <section class="flex-row-space flex-12">
                    <label class="control-label flex-2"><spring:message
                            code="label.designationAr"/></label>
                    <div class="control-input flex-10">
                        <input type="text" id="designationAr" name="designationAr" class="form-control-csys input-xs"
                               required>
                    </div>
                </section>
            </div>

        </fieldset>



    </form>
</div>
<script src="js/files/MajFamillePrestation.js"></script>
