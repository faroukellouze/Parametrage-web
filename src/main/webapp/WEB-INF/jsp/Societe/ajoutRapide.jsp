<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@page contentType="text/html" pageEncoding="UTF-8" session="false" %>
<form>
    <div style="display: flex;flex-direction: row;justify-content: space-between;">
        <section style="flex:1;display: flex;flex-direction: row;justify-content: space-between;">
            <label class="control-label" style="flex:1;"><spring:message code="label.designation"/></label>
            <div class="control-input" style="flex:5;">
                <input type="text" class="form-control-csys input-xs">
            </div>
        </section>
    </div>
</form>