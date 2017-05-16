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
                <a class="btn btn-default btn-valide" id="btnValiderPrestation"><i
                        class="glyphicon glyphicon-ok"></i></a>
            </div>
        </div>
    </div>
</div>
<div class="body-aside">
    <form id="formPrestation">
        <fieldset>
            <h3 class="header-csys"><spring:message code="label.informationPrestation"/></h3>
            <div class="flex-row-space">
                <section class="flex-row-space flex-4" disabled>
                    <label class="control-label flex-6"><spring:message code="label.codePrestation"/></label>
                    <div class="control-input  flex-6" >
                        <input disabled="" id="codeSaisie" name="codeSaisie" type="text" class="form-control-csys input-xs"
                               required>
                    </div>
                </section>
                <section class="flex-row-space flex-6">
                    <label class="control-label flex-4"><spring:message code="label.typePrestation"/></label>
                    <div class="control-input flex-8" id="codeTypePrestation"></div>
                </section>
                <section class="flex-row-space flex-2">
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
            <div class="flex-row-space">
                <section class="flex-row-space flex-6">
                    <label class="control-label flex-4"><spring:message code="label.sousFamille"/></label>
                    <div class="control-input flex-8" id="codeSousFamille">
                    </div>
                </section>
                <section class="flex-row-space flex-6  disabled">
                    <label class="control-label flex-4"><spring:message code="label.famille"/></label>
                    <div class="control-input flex-8" >
                        <input id="famille" disabled="disabled" type="text" class="form-control-csys input-xs" required>
                    </div>
                </section>
            </div>
        </fieldset>
        <fieldset>
            <h3 class="header-csys"><spring:message code="h3.facturationPrestation"/></h3>
            <div class="flex-row-space">
                <section class="flex-row-space flex-2">
                    <label class="control-label flex-4"><spring:message code="label.tva"/> </label>
                    <div class="control-input flex-8" id="tva">
                    </div>
                </section>
                <section class="flex-row-space flex-6">
                    <label class="control-label flex-4"><spring:message code="label.familleFacturation"/></label>
                    <div class="control-input flex-8" id="codeFamilleFacturation">
                    </div>
                </section>
                <section class="flex-row-space flex-2">
                    <label class="control-label">
                        <input id="facturation" name="facturation" type="checkbox" checked class="checkbox">
                        <span><spring:message code="span.facturation"/></span>
                    </label>
                </section>
                <section class="flex-row-space flex-2">
                    <label class="control-label">
                        <input id="etage" name="etage" type="checkbox" checked class="checkbox">
                        <span><spring:message code="span.etage"/></span>
                    </label>
                </section>
            </div>
        </fieldset>
        <fieldset>
            <h3 class="header-csys"><spring:message code="h3.proprietesPrestation"/></h3>

            <div class="flex-row-space">

                <section class="flex-row-space flex-3">
                    <label class="control-label">
                        <input id="autorisModifierPrix" name="autorisModifierPrix" type="checkbox" checked class="checkbox">
                        <span><spring:message code="span.autoriserModificationPrix"/></span>
                    </label>
                </section>

                <section class="flex-row-space flex-3">
                    <label class="control-label">
                        <input id="demandeObligatoire" name="demandeObligatoire" type="checkbox" checked class="checkbox">
                        <span><spring:message code="span.demandeObligatoire"/></span>
                    </label>
                </section>

                <section class="flex-row-space flex-3">
                    <label class="control-label">
                        <input id="compteRendu" name="compteRendu" type="checkbox" checked class="checkbox">
                        <span><spring:message code="span.compteRendu"/></span>
                    </label>
                </section>
                <section class="flex-row-space flex-3">
                    <label class="control-label">
                        <input id="sousTraitance" name="sousTraitance" type="checkbox" checked class="checkbox">
                        <span><spring:message code="span.sousTraitance"/></span>
                    </label>
                </section>
            </div>

        </fieldset>

    </form>
</div>
<script src="js/files/MajPrestation.js"></script>
