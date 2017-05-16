<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@page contentType="text/html" pageEncoding="UTF-8" session="false" %>
<div class="modal fade" id="modalAjout" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true"
     data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">×</span></button>
                <h4 class="modal-title">SelectCsys</h4></div>
            <div class="modal-body">
                <h1>
                    <small>Single select boxes</small>
                </h1>
                <div id="testSelect" style="width: 300px;"></div>
                <h1>
                    <small>Multiple select boxes</small>
                </h1>
                <div id="Selectcsys"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalAjoutRapide" tabindex="-1" role="dialog" style="display: none;"
     aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">×</span></button>
                <h4 class="modal-title"><spring:message code="h4.quickAdd"/></h4></div>
            <div class="modal-body">

            </div>
            <div class="modal-footer">
                <button type="button"  class="btn btn-default" data-dismiss="modal"><spring:message code="button.close"/></button>
                <button type="button" id="saveAjoutRapide" class="btn btn-primary"><spring:message code="button.save"/></button>
            </div>
        </div>
    </div>
</div>