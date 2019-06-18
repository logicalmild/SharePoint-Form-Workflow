<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ Page Language="C#" %>
<%@ Register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" x-undefined="" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Installer</title>
<meta http-equiv="X-UA-Compatible" content="IE=10" />

<SharePoint:CssRegistration Name="default" runat="server" />
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery.terminal/js/jquery.terminal.min.js"></script>

    <link href="https://cdn.jsdelivr.net/npm/jquery.terminal/css/jquery.terminal.min.css" rel="stylesheet"/>

    <script src="https://unpkg.com/js-polyfills/keyboard.js"></script>
    <script src="https://cdn.terminal.jcubic.pl/wcwidth.js"></script>

    
</head>

<body>
    <form id="form1" runat="server">
    </form>
    
    <div style="min-height:400px;" id="term_demo"></div>
  


</body>
<script>



    $('#term_demo').terminal();




</script>


</html>
