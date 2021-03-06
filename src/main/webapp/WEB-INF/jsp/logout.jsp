<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title> Achat </title>
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <!-- #CSS Links -->
    <!-- Basic Styles -->
    <link rel="stylesheet" type="text/css" media="screen" href="css/libs/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" media="screen" href="css/libs/font-awesome.min.css">

    <!-- SmartAdmin Styles : Caution! DO NOT change the order -->
    <link rel="stylesheet" type="text/css" media="screen" href="css/libs/smartadmin-production-plugins.min.css">
    <link rel="stylesheet" type="text/css" media="screen" href="css/libs/smartadmin-production.min.css">
    <link rel="stylesheet" type="text/css" media="screen" href="css/libs/smartadmin-skins.min.css">

    <!-- SmartAdmin RTL Support -->
    <link rel="stylesheet" type="text/css" media="screen" href="css/libs/smartadmin-rtl.min.css">

    <!-- We recommend you use "your_style.css" to override SmartAdmin
         specific styles this will also ensure you retrain your customization with each SmartAdmin update.
    <link rel="stylesheet" type="text/css" media="screen" href="css/your_style.css"> -->

    <!-- Demo purpose only: goes with demo.js, you can delete this css when designing your own WebApp -->
    <link rel="stylesheet" type="text/css" media="screen" href="css/libs/demo.min.css">

    <!-- page related CSS -->
    <link rel="stylesheet" type="text/css" media="screen" href="css/libs/lockscreen.min.css">

    <!-- #FAVICONS -->
    <link rel="shortcut icon" href="img/favicon/favicon.ico" type="image/x-icon">
    <link rel="icon" href="img/favicon/favicon.ico" type="image/x-icon">

    <!-- #GOOGLE FONT -->
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700">

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

</head>


<body>

<div style=" margin-left: 0px; ">

    <!-- MAIN CONTENT -->

    <div class="lockscreen animated flipInY">
        <div class="logo">
            <h1 class="semi-bold"><img src="img/logo-o.png" alt=""/> Achat </h1>
        </div>
        <div>
            <img src="img/avatars/icon-68-128.png" alt="" width="120" height="120"/>
            <div>
                <h1><i class="fa fa-user fa-3x text-muted air air-top-right hidden-mobile"></i>
                    <%
                        String User2 = (String) session.getAttribute("user");
                    %>
                    <%= User2 %>
                    <small><i class="fa fa-lock text-muted"></i> Utilisateur Connecté</small>
                </h1>

                <br>
                <a href="master_page/index.jsp">
                    <button id="back" class="btn btn-primary" style="margin-left: 15%; ">
                        Retour
                    </button>
                </a>
                <a href="/Parametrage">
                    <button id="submit" class="btn btn-danger" style="margin-left: 15%; ">
                        Déconnexion
                    </button>
                </a>
            </div>

        </div>
        <p class="font-xs margin-top-5">
            Copyright Computer Systems 2017.
        </p>
    </div>

</div>

<!-- BOOTSTRAP JS -->
<script src="js/libs/jquery/jquery.min.js"></script>
<script src="js/libs/jquery/jquery-ui.min.js"></script>
</body>

</html>
