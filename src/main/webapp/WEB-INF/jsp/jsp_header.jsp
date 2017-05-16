<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@page contentType="text/html" pageEncoding="UTF-8" session="false" %>
<header class="header">
    <div style="padding-left: 7px; padding-right: 7px;">
        <h1 style=" text-align: right; color: white; font-size: 25px;">
            <small style=" color: white;font-size:20px;">CliniSys<span style=" color: rgb(215, 214, 214);">Erp</span>
            </small>
        </h1>
    </div>
    <div class="nameModule hidden-xs" style=" width: 47vw;">
        <h1 style=" text-align: right; color: white; margin-top: 5px; display: inline-block;">
            <small style=" color: white;"><spring:message code="title.module"/></small>
        </h1>
    </div>
    <div class="pull-right">
        <div id="logout" class="btn-header transparent pull-right">
            <span> <a data-action="logout" title="Déconnexion" href="logout"><i class="fa fa-power-off"></i></a> </span>
        </div>
        <div id="fullscreen" class="btn-header transparent pull-right">
            <span> <a href="javascript:void(0);" data-action="launchFullscreen" title="Plein écran"><i
                    class="fa fa-arrows-alt"></i></a> </span>
        </div>
        <div id="userAffiche" class="btn-header transparent pull-right">
            <span name="_user" class="" style="margin-top: 8px;color: white;display: inline-block;">
                <div style="font-size: 17px; font-family: serif;">
                    <i class="fa fa-user"></i>
                    <span id="userName">Nadir Louati</span>
                </div>
            </span>

        </div>

        <div id="logo-group" class="btn-header transparent pull-right txt-color-white"></div>

    </div>
</header>