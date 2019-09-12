

// SPGuide.js for SharePoint 
// -------index------
// Section1: Query Data
            //GetCurrentPageName()[return string];
            //GetParameterByName(name)[return string];
            //Include(ElementID,Url);
            //IncludeComponent(ElementID,Component);
            //GetItemFromOtherSite(Site,Listname,Query)[data]
            //GetItemByRestAPI(Listname,Query)[data]
// Section2: Date Time
            //GetCurrentTime()[return time]
            //ConvertDateTime(DateTime)[return date]
            //ConvertDateOnly[return date]
            //ConvertDate(DateTime)[return date]
            //GetCurrentYear()[string]
            //GetCurrentDate()[date]
            //GetCurrentTime()[date]
            //SetTime(time)[date]
            //SetDateTime()[date]
// Section3: Operation String
// Section4: Generate
            //GenGUID()[return string];
            //generateUID()[return string]
// Section5: User and permission
            //AddCurrentUserToGroup(GroupID)[];
            //addUsersToGroup(usernames, GroupID)[];
            //CheckUserInGroupID(GroupID)[return bool];
            //GetAllUserFromGroupID(GroupID)[return object people];
            //removeUserFromGroup(userLoginName,GroupID,success,error)[];
// Section6: Validate data
            //SetRequireField(FieldID,TypeDom)[];

// Section1: Query Data
    function GetCurrentPageName(){
        var CurrentPageUrl = $(location).attr('href');
        var arr_CurrentPageUrl = CurrentPageUrl.split('/');	
        var last_arr = arr_CurrentPageUrl[arr_CurrentPageUrl.length-1];
        
        var CurrentPage = last_arr.split('.');
        var str_CurrentPage = CurrentPage[0];
        
        return str_CurrentPage;
	
    }
    function Include(ElementID,Url){
        
        var response;
            $.ajax({ type: "GET",   
                url: Url,   
                async: false,
                success : function(text)
                {
                    response = text;
                
                },
        
            });
    
        $('#'+ElementID).append(response);
    } 
    function IncludeComponent(ElementID,Component){
       
        var response;
            $.ajax({ type: "GET",   
                url: SiteUrl + "/SitePages/web/component/" + Component + "/"+ Component+".html",   
                async: false,
                success : function(text)
                {
                    response = text;
                
                },
        
            });
      
        $('#'+ElementID).append(response);
    }
    function GetParameterByName(name) { 
    
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    function GetItemFromOtherSite(Site,Listname,Query){

        var requestUri = Site + "/_api/web/lists/getByTitle('"+Listname+"')/items" + Query;
        var requestHeaders = {
        "accept": "application/json;odata=verbose"
        }
        var extr_Data;
    
        $.ajax({
            url: requestUri,
            type: 'GET',
            dataType: 'json',
            async: false,
            headers: requestHeaders,
            success: function (data) 
            {      
                data = data.d.results; 
                extr_Data = data;
                
            },
            error: function ajaxError(response) {
                console.log(response.status + ' ' + response.statusText);
            }
        });
    
        return extr_Data;
    
    }
    function GetItemByRestAPI(Listname,Query){ 
    
        var requestUri = SiteUrl + "/_api/web/lists/getByTitle('"+Listname+"')/items" + Query;
        var requestHeaders = {
        "accept": "application/json;odata=verbose"
        }
        var extr_Data;
    
        $.ajax({
            url: requestUri,
            type: 'GET',
            dataType: 'json',
            async: false,
            headers: requestHeaders,
            success: function (data) 
            {      
                data = data.d.results; 
                extr_Data = data;
                
            },
            error: function ajaxError(response) {
                console.log(response.status + ' ' + response.statusText);
            }
        });
    
        return extr_Data;
    }
// Section2: Date Time
    function GetCurrentTime(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var hour = today.getHours();
        var min = today.getMinutes();
        var sec = today.getSeconds();

        if(dd<10) {
            dd = '0'+dd;
        } 

        if(mm<10) {
            mm = '0'+mm;
        } 
        if(min<10){
            min = '0'+min;

        }
        
        //today = mm + '/' + dd + '/' + yyyy + '; ' + hour + ":" + min + ":" + sec;
        today = mm + '/' + dd + '/' + yyyy + ', ' + hour + ":" + min;
        

        return today;
    }
    function ConvertDateTime(DateTime){
    
        var today = new Date(DateTime);
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var hour = today.getHours();
        var min = today.getMinutes();
        var sec = today.getSeconds();
    
        if(dd<10) {
            dd = '0'+dd;
        } 
    
        if(mm<10) {
            mm = '0'+mm;
        } 
        today = dd + '/' + mm + '/' + yyyy + '; ' + hour + ":" + min;
    
        return today;
    }
    function ConvertDateOnly(DateTime){
    
        var today = new Date(DateTime);
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var hour = today.getHours();
        var min = today.getMinutes();
        var sec = today.getSeconds();
    
        if(dd<10) {
            dd = '0'+dd;
        } 
    
        if(mm<10) {
            mm = '0'+mm;
        } 
        today = mm + '/' + dd + '/' + yyyy;    
    
        return today;
    }
    function ConvertDate(DateTime){
    
        var today = new Date(DateTime);
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var hour = today.getHours();
        var min = today.getMinutes();
        var sec = today.getSeconds();
    
        if(dd<10) {
            dd = '0'+dd;
        } 
    
        if(mm<10) {
            mm = '0'+mm;
        } 
        today = mm + '/' + dd + '/' + yyyy + ', ' + hour + ':' + min;    
    
        return today;
    }
    function GetCurrentYear(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var hour = today.getHours();
        var min = today.getMinutes();
        var sec = today.getSeconds();
    
        if(dd<10) {
            dd = '0'+dd;
        } 
    
        if(mm<10) {
            mm = '0'+mm;
        } 
        if(min<10){
            min = '0'+min;
    
        }
        
        //today = mm + '/' + dd + '/' + yyyy + '; ' + hour + ":" + min + ":" + sec;
        today = dd + '/' + mm + '/' + yyyy;
        
    
        return yyyy;  
    }
    function GetCurrentDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var hour = today.getHours();
        var min = today.getMinutes();
        var sec = today.getSeconds();
    
        if(dd<10) {
            dd = '0'+dd;
        } 
    
        if(mm<10) {
            mm = '0'+mm;
        } 
        if(min<10){
            min = '0'+min;
    
        }
        
        //today = mm + '/' + dd + '/' + yyyy + '; ' + hour + ":" + min + ":" + sec;
        today = mm + '/' + dd + '/' + yyyy;
        
    
        return today;
    }
    function GetCurrentTime(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var hour = today.getHours();
        var min = today.getMinutes();
        var sec = today.getSeconds();
    
        if(dd<10) {
            dd = '0'+dd;
        } 
    
        if(mm<10) {
            mm = '0'+mm;
        } 
        if(min<10){
            min = '0'+min;
    
        }
        
        //today = mm + '/' + dd + '/' + yyyy + '; ' + hour + ":" + min + ":" + sec;
        today = mm + '/' + dd + '/' + yyyy + ', ' + hour + ":" + min;
        
    
        return today;
    }
    function SetTime(time){
        var today = new Date(time);
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var hour = today.getHours();
        var min = today.getMinutes();
        var sec = today.getSeconds();
    
        if(dd<10) {
            dd = '0'+dd;
        } 
    
        if(mm<10) {
            mm = '0'+mm;
        } 
        if(min<10){
            min = '0'+min;
    
        }
        
        //today = mm + '/' + dd + '/' + yyyy + '; ' + hour + ":" + min + ":" + sec;
        today = mm + '/' + dd + '/' + yyyy + '; ' + hour + ":" + min;
        
    
        return today;
    }
    function SetDateTime(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var hour = today.getHours();
        var min = today.getMinutes();
        var sec = today.getSeconds();
    
        if(dd<10) {
            dd = '0'+dd;
        } 
    
        if(mm<10) {
            mm = '0'+mm;
        } 
        if(min<10){
            min = '0'+min;
    
        }
        
        //today = mm + '/' + dd + '/' + yyyy + '; ' + hour + ":" + min + ":" + sec;
        today = mm + '/' + dd + '/' + yyyy;// + '; ' + hour + ":" + min;
        
    
        return today;
    }
// Section3: Operation String
// Section4: Generate
    function GenGUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
        });
    }
    function generateUID() {
        // I generate the UID from two parts here 
        // to ensure the random number provide enough bits.
        var firstPart = (Math.random() * 46656) | 0;
        var secondPart = (Math.random() * 46656) | 0;
        firstPart = ("000" + firstPart.toString(36)).slice(-3);
        secondPart = ("000" + secondPart.toString(36)).slice(-3);
        return firstPart + secondPart;
    }
// Section5: User and permission

    function AddCurrentUserToGroup(GroupID){

        var clientContext = new SP.ClientContext(SiteUrl);
        var collGroup = clientContext.get_web().get_siteGroups();
        var oGroup = collGroup.getById(GroupID);
        var userCreationInfo = new SP.UserCreationInformation();
        userCreationInfo.set_email(CurrentUser.Email);
        userCreationInfo.set_loginName(CurrentUser.LoginName);
        userCreationInfo.set_title(CurrentUser.Name);
        this.oUser = oGroup.get_users().add(userCreationInfo);
    
        clientContext.load(oUser);
        clientContext.executeQueryAsync(function(){}, function(){});

    }

    function addUsersToGroup(usernames, GroupID){
        //Get the web
        var clientContext = SP.ClientContext.get_current();
        var web = clientContext.get_web();
    
        //Get the group from the web
        var group = web.get_siteGroups().getById(GroupID);
    
        for (var i = usernames.length - 1; i >= 0; i--) {
            //Use 'ensureUser()' to get an SP_User object
            group.get_users().addUser(web.ensureUser(usernames[i]));
        };
    
        group.update();
    
        //Load the group to the client context and execute
        clientContext.load(group);
        clientContext.executeQueryAsync(function(){console.log('Add User to group success');}, function(){console.log('Add User to group failed');});
    }

    function CheckUserInGroupID(GroupID){
        var TempArrUsers = [];
        var Users = GetAllUserFromGroupID(GroupID);
        for(index in Users){
            var user = Users[index];
            TempArrUsers.push(user.Title);
        }
        
        if(TempArrUsers.indexOf(CurrentUser.Name) > -1){
            return true;
        }else{
            return false;
        }
    }

    function GetAllUserFromGroupID(GroupID){
        var requestUri = _spPageContextInfo.webAbsoluteUrl + '/_api/web/sitegroups/getbyid(\''+GroupID+'\')/users';
        var requestHeaders = {
        "accept": "application/json;odata=verbose"
        }
        var Ex_Data;
        $.ajax({
            url: requestUri,
            type: 'GET',
            dataType: 'json',
            async: false,
            headers: requestHeaders,
            success: function (data) 
            {      
                data = data.d.results; 
                Ex_Data = data;
                
            },
            error: function ajaxError(response) {
                console.log(response.status + ' ' + response.statusText);
            }
        });
    
        return Ex_Data;
    }

    function removeUserFromGroup(userLoginName,GroupID,success,error){
    
        var ctx = SP.ClientContext.get_current()
        var web = ctx.get_web();
        var group = web.get_siteGroups().getById(GroupID);
        group.get_users().removeByLoginName(userLoginName); 
        ctx.executeQueryAsync( 
           function(){
               success();
           },
           error);
    
    }

    function GetCurrentUser(){

        var UserID = GetParameterByName('UserID');
        var userid;
    
        if(UserID){
            userid = UserID;  
        }
        else{
            userid = _spPageContextInfo.userId;
        }
    
            var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + userid + ")";
            var requestHeaders = { "accept" : "application/json;odata=verbose" };
            $.ajax({
                url : requestUri,
                contentType : "application/json;odata=verbose",
                headers : requestHeaders,
                async:false,
                success : onSuccess,
                error : onError
            });
    
            function onSuccess(data, request){
                data = data.d;
                CurrentUser.ID = data.Id;
                CurrentUser.Name = data.Title;
                CurrentUser.Email = data.Email;
                CurrentUser.LoginName = data.LoginName;
                
            }
    
            function onError(error) {
                alert("error");
            }
    
    }



// Section5: Validate data
    