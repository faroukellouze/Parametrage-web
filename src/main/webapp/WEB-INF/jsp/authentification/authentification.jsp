<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@page contentType="text/html" pageEncoding="UTF-8" session="false" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title> Demo </title>
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <!-- #CSS Links -->
    <!-- Basic Styles -->
    <link rel="stylesheet" type="text/css" media="screen" href="css/libs/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" media="screen" href="css/libs/font-awesome.min.css">

    <link rel="stylesheet" type="text/css" media="screen" href="css/libs/smartadmin-production-plugins.min.css">
    <link rel="stylesheet" type="text/css" media="screen" href="css/libs/smartadmin-production.min.css">
    <link rel="stylesheet" type="text/css" media="screen" href="css/libs/smartadmin-skins.min.css">

    <!-- SmartAdmin RTL Support -->
    <link rel="stylesheet" type="text/css" media="screen" href="css/libs/smartadmin-rtl.min.css">

    <!-- #FAVICONS -->
    <link rel="shortcut icon" href="img/favicon/favicon.ico" type="image/x-icon">
    <link rel="icon" href="img/favicon/favicon.ico" type="image/x-icon">

    <!-- #GOOGLE FONT -->
    <!--link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700"-->

    <!-- #APP SCREEN / ICONS -->
    <!-- Specifying a Webpage Icon for Web Clip
             Ref: https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html -->
    <link rel="apple-touch-icon" href="img/splash/sptouch-icon-iphone.png">
    <link rel="apple-touch-icon" sizes="76x76" href="img/splash/touch-icon-ipad.png">
    <link rel="apple-touch-icon" sizes="120x120" href="img/splash/touch-icon-iphone-retina.png">
    <link rel="apple-touch-icon" sizes="152x152" href="img/splash/touch-icon-ipad-retina.png">

    <!-- iOS web-app metas : hides Safari UI Components and Changes Status Bar Appearance -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <!-- Startup image for web apps -->
    <link rel="apple-touch-startup-image" href="img/splash/ipad-landscape.png"
          media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape)">
    <link rel="apple-touch-startup-image" href="img/splash/ipad-portrait.png"
          media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait)">
    <link rel="apple-touch-startup-image" href="img/splash/iphone.png" media="screen and (max-device-width: 320px)">

    <link href="css/files/index.css" rel="stylesheet" type="text/css"/>
</head>
<body>
<div class="containerBody">
    <div style="">
        <div>
            <div id="authentification-box">
                <div class="authentHeader">
                    <h1 class="logoCsys">
                        <img src="img/CSYS_LOGO_2015.png" alt="me">
                    </h1>
                    <div class="choixLangue">
                        <!-- langue -->
                        <ul id="liste_choix_langue" class="header-dropdown-list hidden-xs">
                            <li class="">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                    <img id="langue_en_cours" src="img/blank.gif"> <span></span>
                                    <i class="fa fa-angle-down"></i>
                                </a>
                                <ul class="dropdown-menu pull-right" id="liste_langue">
                                    <li lang="fr">
                                        <a href="javascript:void(0);">
                                            <img src="img/blank.gif" class="flag flag-fr" alt="français" abr="fr">
                                            Français</a>
                                    </li>
                                    <li lang="en">
                                        <a href="javascript:void(0);">
                                            <img src="img/blank.gif" class="flag flag-gb" alt="anglais" abr="en">
                                            English</a>
                                    </li>
                                    <li lang="ar">
                                        <a href="javascript:void(0);">
                                            <img src="img/blank.gif" class="flag flag-sa" alt="arabe" abr="ar">العربية
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="authentBody">
                    <div class="logoClient">
                        <h1>
                            <img src="img/avatars/icon-68-128.png" alt="" width="128" height="128"/>
                        </h1>
                    </div>
                    <div class="formContainer">
                        <form id="login-form" class="smart-form client-form"
                              novalidate="novalidate">
                            <fieldset>
                                <section>
                                    <label class="input">
                                        <i class="icon-append fa fa-user"></i>
                                        <spring:message code="input.username" var="username_placeholder"/>
                                        <input id="username" placeholder="${username_placeholder}" type="text"
                                               name="email">
                                        <b class="tooltip tooltip-top-right">
                                            <i class="fa fa-user txt-color-teal"></i> Entrer votre nom d'utilisateur
                                        </b>
                                    </label>
                                </section>

                                <section>
                                    <label class="input">
                                        <i class="icon-append fa fa-lock"></i>
                                        <spring:message code="input.password" var="password_placeholder"/>
                                        <input id="password" placeholder="${password_placeholder}" type="password"
                                               name="password">
                                        <b class="tooltip tooltip-top-right"><i class="fa fa-lock txt-color-teal"></i>
                                            Entrer votre mot de passe</b> </label>
                                </section>

                                <section>
                                    <label class="checkbox">
                                        <input type="checkbox" name="remember">
                                        <i></i><spring:message code="checkbox.remember"/>
                                    </label>
                                </section>
                            </fieldset>
                        </form>
                    </div>
                </div>
                <div class="authentFooter">
                    <button id="submit" class="btn btn-primary pull-right">
                        <spring:message code="button.submit"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="js/libs/jquery/jquery.min.js"></script>
<script src="js/libs/bootbox.min.js" type="text/javascript"></script>
<script src="js/libs/bootstrap/bootstrap.min.js"></script>
<script src="js/libs/notification/SmartNotification.min.js"></script>
<script src="js/libs/plugin/bootstrap-plugin/bootstrap-checkbox.js" type="text/javascript"></script>
<script src="js/libs/jquery.jcryption-1.1.js"></script>

<script src="Csys-Framework/main.js"></script>
<script src="Csys-Framework/sandbox.js"></script>
<script src="js/files/messages.js"></script>
<script src="js/files/authentification.js"></script>
</body>
</html>