// Guide.js for SharePoint 
// -------index------
// Section1: Query Data
    // - GetItemByRestAPI(Listname,Query) [Return]
    // - InsertToList(Listname,Data)
    // - GetParameterByName(name) [Return]
    // - GetCurrentPageName() [Return]
// Section2: Date Time
    // - ConvertDate(DateTime) [Return]
    // - SetDateTime() [Return]
// Section3: Operation Word
// Section4: Inspect function
    // - CheckTiming(FunctionName,status) output: consolelog
// Section5: Generate
    // - NewGuid() [Return]
    // - generateUID() [Return]
// Section6: Group permission
    // - addUsersToGroup (usernames, groupName)
    // - removeUserFromGroup(userLoginName,groupName,success,error)
    // - getCurrentGroupsUser()
// Section7: Other
    // - ScrollPage(section)


var CurrentUser = {
    ID: null,
    Name: null,
    Email: null
};






// Section1: Query Data
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



function UpdateListItem(ItemID,Listname,data){

 
    var clientContext = new SP.ClientContext(SiteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle(Listname);
    this.oListItem = oList.getItemById(ItemID);

    for(i=0;i<data.length;i++){

        oListItem.set_item(data.ColTitle[i],data.ColVal[i]);

    }
    oListItem.update();	
    clientContext.executeQueryAsync(function(){

        console.log('UpdateListItem complete...');

    },function(){

        console.log('UpdateListItem error...');

    });

}
function InsertListItem(Listname,data){
    
        var clientContext = new SP.ClientContext(SiteUrl);
        var oList = clientContext.get_web().get_lists().getByTitle(Listname);
        var itemCreateInfo = new SP.ListItemCreationInformation();
        this.oListItem = oList.addItem(itemCreateInfo);

        for(i=0;i<data.length;i++){

            oListItem.set_item(data.ColTitle[i],data.ColVal[i]);
        }

        
        oListItem.update();	
        clientContext.executeQueryAsync(function(){

            console.log('InsertListItem complete...');

        },function(){

            console.log('InsertListItem error...');

        });
}
function DeleteListItem(ItmeID,Listname){

        var clientContext = new SP.ClientContext(SiteUrl);
        var oList = clientContext.get_web().get_lists().getByTitle(Listname);
        this.oListItem = oList.getItemById(ItemID);
        oListItem.deleteObject();
        clientContext.executeQueryAsync(function(){

            console.log('DeleteListItem Complete..');

        },function(){

            console.log('DeleteListItem Error...');

        });
}
function GetParameterByName(name) { 
    
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function GetCurrentPageName(){
	
	var CurrentPageUrl = $(location).attr('href');
	var arr_CurrentPageUrl = CurrentPageUrl.split('/');	
	var last_arr = arr_CurrentPageUrl[arr_CurrentPageUrl.length-1];
	
	var CurrentPage = last_arr.split('.');
	var str_CurrentPage = CurrentPage[0];
	
	return str_CurrentPage;
	
	}





    // Section2: Date Time
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
    today = mm + '/' + dd + '/' + yyyy;    

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
	today = dd + '/' + mm + '/' + yyyy + '; ' + hour + ":" + min;
    

    return today;
}





// Section3: Operation Word




// Section4: Inspect function
function CheckTiming(FunctionName,status){

	var time = performance.now();
	
	if(status=='start'){
		CheckPointA = time;
	}
	else if(status=='end'){
		CheckPointB = time;
		console.log('Function '+FunctionName +' take '+(CheckPointB - CheckPointA) +' ms.');
	}
	else{

		console.log("You didn't input status");
	}
	
	
}



// Section5: Generate
function NewGuid() { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
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


// Section6: Group permission
function addUsersToGroup (usernames, groupName){
    //Get the web
    var clientContext = SP.ClientContext.get_current();
    var web = clientContext.get_web();

    //Get the group from the web
    var group = web.get_siteGroups().getByName(groupName);

    for (var i = usernames.length - 1; i >= 0; i--) {
        //Use 'ensureUser()' to get an SP_User object
        group.get_users().addUser(web.ensureUser(usernames[i]));
    };

    group.update();

    //Load the group to the client context and execute
    clientContext.load(group);
    clientContext.executeQueryAsync(function(){console.log('Add User to group success');}, function(){console.log('Add User to group failed');});
}
function removeUserFromGroup(userLoginName,groupName,success,error){
    
    var ctx = SP.ClientContext.get_current()
    var web = ctx.get_web();
    var group = web.get_siteGroups().getByName(groupName);
    group.get_users().removeByLoginName(userLoginName); 
    ctx.executeQueryAsync( 
       function(){
           success();
       },
       error);

}
function getCurrentGroupsUser(){
	
	var clientContext = new SP.ClientContext.get_current();
	var oWeb  =clientContext.get_web();
	currentUser = oWeb.get_currentUser();
	allGroups = currentUser.get_groups();
	clientContext.load(allGroups);
	clientContext.load(currentUser);
	clientContext.executeQueryAsync(function(){
            
        var grpsEnumerator = allGroups.getEnumerator();
        var Group_arr_ID = [];
        var Group_arr_Title = [];
        while(grpsEnumerator.moveNext()){
            
            var group = grpsEnumerator.get_current();
            var grpID = group.get_id();
            var grpTitle = group.get_title();
            Group_arr_ID.push(grpID);
            Group_arr_Title.push(grpTitle);
        }

    }, function(sender , args){

        console.log(args.get_message());

    });
	
    }
    
function GetCurrentUser(){

    var userid= _spPageContextInfo.userId;
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
        //alert(loginName);
    }

    function onError(error) {
        alert("error");
    }

}


    // Section7: Other
function ScrollPage(section){
    var id="#"+section;
    
        $('#s4-workspace').animate({
                scrollTop: $(id).position().top},
            'slow');
            
        
    }


