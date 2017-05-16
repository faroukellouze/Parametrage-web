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
                <a class="btn btn-default btn-valide" id="btnValiderEtatChambre"><i
                        class="glyphicon glyphicon-ok"></i></a>
            </div>
        </div>
    </div>
</div>
<div class="body-aside">
    <form id="formEtatChambre">
        <fieldset>
            <h3 class="header-csys">Information état chambre</h3>
            <div class="flex-row-space">
                <section class="flex-row-space flex-12">
                    <label class="control-label flex-2"><spring:message
                            code="label.designationEn"/></label>
                    <div class="control-input flex-10">
                        <input type="text" id="designation" name="designation" class="form-control-csys input-xs"
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
                <section class="flex-row-space flex-4">
                    <label class="control-label">
                        <input id="etat" name="etat" type="checkbox" checked class="checkbox">
                        <span>Visible lors ajout chambre</span>
                    </label>
                </section>
                <section class="flex-row-space flex-2">
                    <label class="control-label">
                        <input id="actif" name="actif" type="checkbox" checked class="checkbox">
                        <span><spring:message code="span.btnActif"/></span>
                    </label>
                </section>
                <section class="flex-row-space flex-6">
                    <label class="control-label flex-2">Couleur</label>
                    <div class="control-input flex-10">
                        <input type="color" id="coleur" name="coleur"
                               required>
                    </div>
                </section>
            </div>
        </fieldset>
    </form>
</div>
<script src="js/files/MajEtatChambre.js"></script>
