<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ Page Language="C#" %>
<%@ Register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" x-undefined="" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>SP Terminal</title>
<meta http-equiv="X-UA-Compatible" content="IE=10" />
<link rel="shortcut icon" href="./img/icon/cmd.png">
<SharePoint:CssRegistration Name="default" runat="server" />
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery.terminal/js/jquery.terminal.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/jquery.terminal/css/jquery.terminal.min.css" rel="stylesheet"/>
    <script src="https://unpkg.com/js-polyfills/keyboard.js"></script>
    <script type="text/javascript" src="//ajax.aspnetcdn.com/ajax/4.0/1/MicrosoftAjax.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>

    
    
</head>

<style>
body {
  min-height: 100vh;
  color: var(--color, #aaa);
  background-color: var(--background, #000);
  padding: 10px;
  box-sizing: border-box;
  --color: lime;
}
</style>
    
<body>
    <form id="form1" runat="server">
        <SharePoint:FormDigest runat="server"></SharePoint:FormDigest>
    </form>
    
    <div id="term_demo"></div>
  


</body>
<script>
 
    $('#term_demo').terminal(function(command) {
       
        switch(command){
            case 'help':
                        var text = GetHelp();
                        this.echo(text);
                        break;
            case 'Get list':
                        var text = GetAllListData();
                        this.echo(text);
                        break;
            case 'Get site info':
                        var text = GetSiteInfo();
                        this.echo(text);
                        break;
            default:
                        var text = 'This command is not match.\n';
                        this.echo(text);
                        break;
        }
   
    }, { 
            greetings: 'This terminal for SharePoint via browser interface [Version 1.0.0.0] \nCreated by Saranchai Anunthananaruporn. All rights reserved\n',
            name: 'SPTerminal',
            prompt: 'SP> ', 
            name: 'test' ,
  
            
        });

    

    function GetHelp(){
        
        var text = '\n';
        var HelpMessage = {
            'help          ':'Show command and informations',
            'Get list      ':'Show All list data of current site',
            'Get site info ':'Show All information of curren site',
        };
        
        for(i in HelpMessage){
            text += i + '\t'+ HelpMessage[i] + '\n';
        }
        return text;
    }

    function GetAllListData(){

        var siteUrl = '/sites/MySiteCollection';
        var clientContext = new SP.ClientContext(siteUrl);
        var oWebsite = clientContext.get_web();
        this.collList = oWebsite.get_lists();
        clientContext.load(collList);
        clientContext.executeQueryAsync(function(){},function(){});


        return text;
    }
    
    function GetSiteInfo(){
        
        var text = '';
    
        for(i in _spPageContextInfo){
            
            text+= i + '\t' + _spPageContextInfo[i] + '\n';
        }

        // var SiteUrl =  window.location.protocol + "//" + window.location.host + _spPageContextInfo.siteServerRelativeUrl;
        // var SiteCollection = _spPageContextInfo.siteServerRelativeUrl;
        // var SubSite = '';

        // text += '\tSiteUrl : ' + SiteUrl + '\n';
        // text += '\tSiteCollection : ' + SiteCollection + '\n';
        // console.log(_spPageContextInfo);
        debugger;

        return text;
    }
    

</script>
</html>
