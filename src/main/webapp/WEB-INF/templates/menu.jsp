<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@page contentType="text/html" pageEncoding="UTF-8" session="false" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<div class="modulesContainer">
    <ul>
        <%--<sec:authorize access="hasAuthority('Parametrage')">--%>
            <li class="tile turquoise w2 h1">
                <a id="Societe" class="link" href="#">
                    <i class="fa fa-file-text-o"></i>
                    <p class="title"><spring:message code="menu.Societe"/></p>
                </a>
            </li>
        <%--</sec:authorize>--%>
        <li class="tile green w2 h1">
            <a id="Prestation" data-scroll="scrollto" href="#" class="link">
                <i class="fa fa-pencil-square-o"></i>
                <p class="title"><spring:message code="menu.Prestation"/></p>
            </a>
        </li>
        <li class="tile blue w2 h1">
            <a id="famillePrestation" class="link" data-scroll="scrollto" href="#">
                <i class="fa fa-truck"></i>
                <p class="title"><spring:message code="menu.FamillePrestation"/></p>
            </a>
        </li>
        <li class="tile purple w2 h1">
            <a id="sousFamillePrestation" class="link" data-scroll="scrollto" href="#">
                <i class="fa fa-plus"></i>
                <p class="title"><spring:message code="menu.SousFamillePrestation"/></p>
            </a>
        </li>
        <li class="tile brown w2 h1">
            <a id="Chambre" class="link" data-scroll="scrollto" href="#">
                <i class="fa fa-plus"></i>
                <p class="title"><spring:message code="menu.Chambre"/></p>
            </a>
        </li>
        <li  class="tile yellow w2 h1">
            <a id="categorieChambre" class="link" data-scroll="scrollto" href="#">
                <i class="fa fa-credit-card"></i>
                <p class="title"><spring:message code="menu.CategorieChambre"/></p>
            </a>
        </li>
        <li class="tile orange w2 h1">
            <a id="etatChambre" class="link" href="#">
                <i class="fa fa-credit-card"></i>
                <p class="title"><spring:message code="menu.EtatChambre"/></p>
            </a>
        </li>
        <li class="tile red w2 h1">
            <a id="Service" class="link" data-scroll="scrollto" href="#">
                <i class="fa fa-reply"></i>
                <p class="title"><spring:message code="menu.Service"/></p>
            </a>
        </li>
        <li class="tile white w2 h1">
            <a class="link" data-scroll="scrollto" href="#">
                <i class="fa fa-reply"></i>
                <p class="title">Bon d'avoir </p>
            </a>
        </li>
        <li class="tile gray w2 h1">
            <a class="link" data-scroll="scrollto" href="#">
                <i class="fa fa-reply"></i>
                <p class="title">Bon de retour </p>
            </a>
        </li>
    </ul>
</div>