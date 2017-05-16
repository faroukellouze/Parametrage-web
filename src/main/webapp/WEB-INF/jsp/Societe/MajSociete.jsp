<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@page contentType="text/html" pageEncoding="UTF-8" session="false" %>
<link href="css/files/MajSociete.css" rel="stylesheet" type="text/css"/>
<div class="header-aside">
    <a class="close-asidebar" href="#"><i class="fa fa-chevron-right fermer-aside"></i></a>
    <div class="right">
        <div>
            <h3 id="titleAside"></h3>
        </div>
        <div>
            <div class="action-icons">
                <a class="btn btn-default btn-valide" id="btnValiderSociete"><i
                        class="glyphicon glyphicon-ok"></i></a>
            </div>
        </div>
    </div>
</div>
<div class="body-aside">
    <form id="formSociete">
        <div class="flex-row-around">
            <fieldset class="flex-7">
                <h3 class="header-csys"><spring:message code="h3.addCompany"/></h3>
                <div class="flex-row-space">
                    <section  class="flex-row-space flex-4">
                        <label class="control-label flex-6"><spring:message code="label.companyCode"/></label>
                        <div class="control-input flex-6">
                            <input id="codeSaisie" name="codeSaisie" type="text" class="form-control-csys input-xs">
                        </div>
                    </section>
                    <section class="flex-row-space flex-6">
                        <label class="control-label  flex-4"><spring:message code="label.sectorOfWork"/></label>
                        <div class="control-input  flex-8" id="SelectSecteurActivite"></div>
                    </section>
                    <section class="flex-row-space flex-2">
                        <label class="control-label">
                            <input id="btnActif" name="actif" type="checkbox" checked class="checkbox">
                            <span><spring:message code="span.btnActif"/></span>
                        </label>
                    </section>
                </div>
                <div class="flex-row-space">
                    <section class="flex-row-space flex-12">
                        <label class="control-label flex-2"><spring:message
                                code="label.designation"/></label>
                        <div class="control-input flex-10">
                            <input type="text" id="designation" name="designation" class="form-control-csys input-xs">
                        </div>
                    </section>
                </div>
            </fieldset>
            <fieldset  class="flex-5">
                <h3 class="header-csys"><spring:message code="h3.contacts"/></h3>
                <div id="contact">
                    <div class="flex-row-space">
                        <a class="add-contact"><i class="fa fa-plus fa-lg-csys"></i><spring:message
                                code="i.addContact"/></a>
                    </div>
                </div>
            </fieldset>
        </div>
        <div class="flex-row-around">
            <fieldset class="flex-7">
                <h3 class="header-csys"><spring:message code="h3.financialStatements"/></h3>
                <div class="flex-row-space">
                    <section class="flex-row-space flex-6">
                        <label class="control-label flex-6"><spring:message
                                code="label.thresholdCredit"/></label>
                        <div class="control-input flex-6">
                            <input id="thresholdCredit" name="seuilCredit" type="number" value="0.000"
                                   class="form-control-csys input-xs">
                        </div>
                    </section>
                    <section class="flex-row-space flex-6">
                        <label class="control-label flex-6"><spring:message
                                code="label.thresholdCreditAlert"/></label>
                        <div class="control-input flex-6">
                            <input id="thresholdCreditAlert" name="seuilCreditAlerte" type="number" value="0.000"
                                   class="form-control-csys input-xs">
                        </div>
                    </section>
                </div>
                <div class="flex-row-around">
                    <section class="flex-row-space flex-6">
                        <label class="control-label flex-6"><spring:message
                                code="label.deadlinesBilling"/></label>
                        <div class="control-input flex-6">
                            <input id="deadlinesBilling" name="delaisFacturation" type="number" value="1"
                                   class="form-control-csys input-xs">
                        </div>
                    </section>
                    <section class="flex-row-space flex-6">
                        <label class="control-label flex-6"><spring:message
                                code="label.deadlinesPayment"/></label>
                        <div class="control-input flex-6">
                            <input id="deadlinesPayment" name="delaisReglement" type="number" value="1"
                                   class="form-control-csys input-xs">
                        </div>
                    </section>
                </div>
                <div class="flex-row-around">
                    <section id="priceDifferenceCalculation" class="flex-row-space flex-6">
                        <label class="control-label flex-6"><spring:message
                                code="label.priceDifferenceCalculation"/></label>
                        <label class="radio radio-inline no-margin flex-3">
                            <input type="radio" name="calculDifferencePrix" value="S" class="radiobox">
                            <span><spring:message code="span.side"/></span>
                        </label>

                        <label class="radio radio-inline flex-3">
                            <input type="radio" checked name="calculDifferencePrix" value="C" class="radiobox">
                            <span><spring:message code="span.monetary"/></span>
                        </label>
                    </section>
                    <section class="flex-row-space flex-6">
                        <label class="control-label">
                            <input id="timbre" name="timbre" type="checkbox" class="checkbox">
                            <span><spring:message code="span.timbre"/></span>
                        </label>
                    </section>
                </div>
                <div class="flex-row-start">
                    <section class="flex-row-space flex-6">
                        <label class="control-label flex-6"><spring:message
                                code="label.niveauBordereau"/></label>
                        <label class="radio radio-inline no-margin flex-3">
                            <input type="radio" checked name="niveauBordereau" value="S" class="radiobox">
                            <span><spring:message code="span.company"/></span>
                        </label>

                        <label class="radio radio-inline flex-3">
                            <input type="radio" name="niveauBordereau" value="C" class="radiobox">
                            <span><spring:message code="span.convention"/></span>
                        </label>
                    </section>
                </div>
            </fieldset>
            <fieldset class="flex-5">
                <h3 class="header-csys"><spring:message code="h3.settingsOfficialsHand"/></h3>
                <div id="responsable">
                    <div class="flex-row-space">
                        <a class="add-responsable"><i class="fa fa-plus fa-lg-csys"></i><spring:message
                                code="i.addResponsible"/></a>
                    </div>
                </div>
            </fieldset>
        </div>
        <div class="flex-row-around">
            <fieldset class="flex-3">
                <h3 class="header-csys"><spring:message code="h3.paymentData"/>
                </h3>
                <section class="flex-row-space">
                    <label class="control-label flex-4"><spring:message code="label.regulationMode"/></label>
                    <div class="control-input flex-8" id="SelectRegulationMode">
                    </div>
                </section>
                <section class="flex-row-space">
                    <label class="control-label flex-4"><spring:message code="label.bank"/></label>
                    <div class="control-input flex-8"id="SelectBank">
                    </div>
                </section>
                <section class="flex-row-space">
                    <label class="control-label flex-4"><spring:message code="label.ribBanking"/></label>
                    <div class="control-input flex-8">
                        <input name="rib" type="text" id="rib" class="form-control-csys input-xs">
                    </div>
                </section>
            </fieldset>
            <fieldset class="flex-4">
                <h3 class="header-csys"><spring:message code="h3.attachmentsRequiredPrepareClaims"/></h3>
                <div id="attachments">
                    <table id="attachmentsPiece"
                           class="table table-bordered table-striped table-editable no-margin table-hover sortable"></table>
                </div>
            </fieldset>
            <fieldset class="flex-5">
                <h3 class="header-csys"><spring:message code="h3.notes"/>
                </h3>
                <section class="flex-row-space">
                    <div class="control-input flex-12">
                        <textarea id="observation" class="form-control-csys" rows="4" name="observation"></textarea>
                    </div>
                </section>
            </fieldset>

        </div>
    </form>
</div>
<script src="js/files/MajSociete.js"></script>
