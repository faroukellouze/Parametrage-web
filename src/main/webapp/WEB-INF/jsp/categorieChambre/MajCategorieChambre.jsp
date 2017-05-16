<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@page contentType="text/html" pageEncoding="UTF-8" session="false" %>
<div class="header-aside">
    <a class="close-asidebar" href="#"><i class="fa fa-chevron-right fermer-aside"></i></a>
    <div class="right">
        <div>
            <h3 id="titleAside"></h3>
        </div>
        <div>
            <div class="action-icons">
                <a class="btn btn-default btn-valide" id="btnValiderCategorie"><i
                        class="glyphicon glyphicon-ok"></i></a>
            </div>
        </div>
    </div>
</div>
<div class="body-aside">
    <form id="formCategorie">
        <fieldset>
            <h3 class="header-csys"><spring:message code="label.informationCategorie"/></h3>

            <div class="flex-row-space">
                <section class="flex-row-space flex-11">
                    <label class="control-label flex-2"><spring:message
                            code="label.designationEn"/></label>
                    <div class="control-input flex-10">
                        <input type="text" id="designation" name="designation" class="form-control-csys input-xs"
                               required>
                    </div>
                </section>
            </div>
            <div class="flex-row-space">
                <section class="flex-row-space flex-11">
                    <label class="control-label flex-2"><spring:message
                            code="label.designationAr"/></label>
                    <div class="control-input flex-10">
                        <input type="text" id="designationAr" name="designationAr" class="form-control-csys input-xs"
                               required>
                    </div>
                </section>
            </div>

            <div class="flex-row-space flex-4">
                <section class="flex-row-space flex-1">
                    <label class="control-label">
                        <input id="isIcu" name="isIcu" type="checkbox" checked class="checkbox">
                        <span><spring:message code="span.icu"/></span>
                    </label>
                </section>
                <section class="flex-row-space flex-1">
                    <label class="control-label">
                        <input id="actif" name="actif" type="checkbox" checked class="checkbox">
                        <span><spring:message code="span.btnActif"/></span>
                    </label>
                </section>
            </div>
        </fieldset>
        <fieldset>
            <h3 class="header-csys"><spring:message code="h3.informationPrestationCategorie"/></h3>
            <div class="flex-row-space">
                <section class="flex-row-space flex-6">
                    <label class="control-label flex-4"><spring:message code="label.prestationSejour"/></label>
                    <div class="control-input flex-8" id="prestSejour">
                    </div>
                </section>
                <section class="flex-row-space flex-6">
                    <label class="control-label flex-4"><spring:message code="label.prestationAccompagnant"/></label>
                    <div class="control-input flex-8" id="prestAccompagnat">
                    </div>
                </section>
            </div>
            <div class="flex-row-space">
                <section class="flex-row-space flex-6">
                    <label class="control-label flex-4"><spring:message code="label.prestationSurveillance"/></label>
                    <div class="control-input flex-8" id="prestSurveillance">
                    </div>
                </section>
                <section class="flex-row-space flex-6">
                    <label class="control-label flex-4"><spring:message code="label.prestationSuivie"/></label>
                    <div class="control-input flex-8" id="prestSuivie">
                    </div>
                </section>
            </div>
        </fieldset>


    </form>
</div>
<script src="js/files/MajCategorieChambre.js"></script>
