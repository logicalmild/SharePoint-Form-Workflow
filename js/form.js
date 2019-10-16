
var Form = {
    FormID:null,
    FormName:null,
    FileName:null,
    FormNew:null,
    FormView:null,
    FormEdit:null,
    FormApproval:null,
    FormStatus:null,
    FormStep:null,
    StatusAction:null,
    FlagSubmit:false
}
var MasterFormID = GetParameterByName('FormMaster'); // Select form and set value in config.js
var FormID = GetParameterByName('FormID');
var FormType = 'FormView';
// Map FieldData & workflow according to FieldData & workflow in config.js
var workflow =  FormMaster[MasterFormID].Workflow;
var TempCurrentData = FormMaster[MasterFormID].FieldData;
var ListData = FormMaster[MasterFormID].Listname;
var ListInternalName = FormMaster[MasterFormID].ListInternalName;
var IsRunningNOEnabled = FormMaster[MasterFormID].RunningNO.Enable;
var FormatRunningNO = FormMaster[MasterFormID].RunningNO.FormatRunningNO;
var SummaryPage = SiteUrl + '/Lists/' + ListInternalName;// dashboard after submit form




$(document).ready(function(){
    
    //$('#s4-ribbonrow').hide();
    //$('#suiteBarDelta').hide();
    GetCurrentUser();
    GetCurrentGroupsUser();
    var InGroupMember = CheckUserInGroupID(GroupMember);  
    if(InGroupMember == false){
        
        AddCurrentUserToGroup(GroupMember);
    }

    StartSummernote();
});

// Place For trigger for DOM 
$('#CloseForm , #CloseForm2').click(function(){
    CloseForm(0); 
});

$('input').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        event.preventDefault();
        return false;
    }
});

$( "input" ).change(function() {
            
    var str = $(this).val();
    if (str.indexOf(';') > -1 || str.indexOf('[') > -1 || str.indexOf(']') > -1 || str.indexOf('|') > -1)
    {
        $(this).css("background-color","red");
        $(this).css("color","white");
        alert('Don\'t input "; [ ] |" ');  
    }
    else{
        $(this).css("color","black");
        $(this).css("background-color","white");
        
    }

});

function StartSummernote(selector){
    $(selector).summernote({
    
        toolbar: [
            // [groupName, [list of button]]
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['picture'],
            ['para', ['paragraph']],
            ['table', ['table']],

        ],
        popover: {
                    image: [
                        ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
                        ['float', ['floatLeft', 'floatRight', 'floatNone']],
                        ['remove', ['removeMedia']]
                    ],
                    link: [
                        ['link', ['linkDialogShow', 'unlink']]
                    ],
                    air: [
                        ['color', ['color']],
                        ['font', ['bold', 'underline', 'clear']],
                        ['para', ['ul', 'paragraph']],
                        ['table', ['table']],
                        ['insert', ['link', 'picture']]
                    ]
                }


        });   

        $('.note-popover , .popover').hide();
}
function GetData(query){ // FormMethodTemplate
            
    //var query = '?$select=*&$filter=FormID eq \''+FormID+'\'';
    var data = GetItemByRestAPI(ListData,query);
 
    if(data){
        if(data.length > 0){
            
            data = data[0];
            
            Form.FormStatus = data.FormStatus;

            if(data[workflow.name]){
                var name = data[workflow.name];
                CheckStatusWorkflow(name , workflow.version);  // FormMethodTemplate
            }
            for(var i in TempCurrentData){
                
                
                    var item = TempCurrentData[i];
                    var TempData = data[item.Col];
                    
                        // Get and set data in element by item data
                        SetElementByItemData(i,item,TempData);   
            }
        }
        else{

            RoutingPage('PageItemNotFound.html'); // FormMethodTemplate
            return;
        }
        return data;
    }
}
function RefreshPage(){

    var body = '';
    body+='<center><div style="margin-top:15%; margin-bottom:15%;" class="loader"></div></center>';
    body+='<div id="Navbar"></div>';
    body+='<div id="Content"></div>';
    body+='<div id="Approval"></div>';
    body+='<div id="HistoryLog"></div>';
    $('#PageBody').empty();
    $('#PageBody').append(body);
         
    GetCurrentUser();
    GetCurrentGroupsUser();
}
function StateForm(){
    if(!MasterFormID){
        RoutingPage('PageNotFound.html');
    }
    else{
        MainForm();
        FormBody();
    }
    
    ///////////////////////////////////////////



    $( function() {
        $( ".DatePicker" ).datepicker({
            dateFormat: "mm/dd/yy"
        });
    } );



    $('.loader').remove();

    // Check btn Submit action be clicked
    $('#SubmitAction').click(function(){
        

            SubmitAction();

      
        
    });


    $('[data-toggle="tooltip"]').tooltip(); 


    $('#summernote').summernote({
        placeholder: 'Write message here..',
        tabsize: 1,
        height: 150,
        focus: false,
        dialogsFade: true,
        
    });
}
function MainForm(){
    try{
        Form.FormName = FormMaster[MasterFormID].FormName; 
    }
    catch(error){
        RoutingPage('PageNotFound.html');
    }
    
 
    Form.FormStatus = GetParameterByName('FormStatus');
    if(!Form.FormStatus.length){
            Form.FormStatus = 'Create';
    }
    GetMasterForm();
    GenerateTemplate();
    GenerateForm();
}
/////////////////////////////////////////////////////////////////////
function FormBody(){  // called by form.js // FormMethodTemplate
        
    if(FormID.length < 1){
        FormID = generateUID(); 
        FormType = 'FormNew';
    }
    FormLoad();
}
function FormLoad(){
       
    SetInitialForm();
    $('#Title_ActionBy').text(CurrentUser.Name);
    HistoryLog('get'); // FormMethodTemplate
    switch(FormType){ // FormMethodTemplate
        // customize your view
        case 'FormNew':
                        FormNew();
                        break;
        case 'FormView':
                        FormView();
                        break;

    }
    SetRequireField(); // FormMethodTemplate
}
function GetMasterForm(){

        Form.FormID = FormMaster[MasterFormID].FormID;
        Form.FormName = FormMaster[MasterFormID].FormName;
        Form.FileName = FormMaster[MasterFormID].FileName;
   
}
function GenerateTemplate(){

    GenerateNavBar();
    GenerateApproval();
    GenerateHistoryLog();
}
function GenerateForm(){
    
    $('title').text(Form.FormName);
    var response;
        $.ajax({ type: "GET",   
            url: SiteUrl + "/SitePages/web/form/"+Form.FileName+"/"+Form.FileName+".html",   
            async: false,
            success : function(text)
            {
                response= text;
              
            },
      
        });
      
        $('#Content').append(response);

        $('.loader').remove();
    

}
function GenerateNavBar(){

        IncludeComponent('Navbar','NavBar');

        var response;
        $.ajax({ type: "GET",   
            url: SiteUrl + "/SitePages/web/component/RightNavMenu/RightNavMenu.html",   
            async: false,
            success : function(text)
            {
                response= text;
            }
        });

        $('body').append(response);

    var response;
        $.ajax({ type: "GET",   
            url: SiteUrl + "/SitePages/web/component/ModalTemplate/ModalTemplate.html",   
            async: false,
            success : function(text)
            {
                response= text;
            }
        });

        $('body').prepend(response);

}
function GenerateApproval(){

    var response;
        $.ajax({ type: "GET",   
            url: SiteUrl + "/SitePages/web/component/Approval/Approval.html",   
            async: false,
            success : function(text)
            {
                response= text;
            }
        });

        $('#Approval').prepend(response);


}
function GenerateHistoryLog(){
   
    var response;
        $.ajax({ type: "GET",   
            url: SiteUrl + "/SitePages/web/component/HistoryLog/HistoryLog.html",   
            async: false,
            success : function(text)
            {
                response= text;
            }
        });

        $('#HistoryLog').append(response);
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
function GetCurrentGroupsUser(){ 			
	var clientContext = new SP.ClientContext.get_current();
    var oWeb = clientContext.get_web();
	currentUser = oWeb.get_currentUser();
	allGroups = currentUser.get_groups();
    clientContext.load(allGroups);
	clientContext.executeQueryAsync(function(){

        var grpsEnumerator = allGroups.getEnumerator();
        while(grpsEnumerator.moveNext())
        {
            var group = grpsEnumerator.get_current();
            var grpId = group.get_id();
            var grpTitle = group.get_title();
            CurrentUser.GroupTitle.push(grpTitle);
            CurrentUser.GroupID.push(grpId);
        }		 
        
        // Set CurrentUser Permission to admin if groupid contain group admin
        var GroupID = CurrentUser.GroupID;
        var GroupTitle = CurrentUser.GroupTitle;
        var num = GroupID.indexOf(GroupAdminID); 
        if(num > -1){
            CurrentUser.Permission = 'Admin';
        }else{
            CurrentUser.Permission = 'Visitor';
        }


        StateForm();
        

    }, function(){console.log('Get CurrentGroupUser Failed');});
}
function AddLoading(){
    
    $('#ModalBody').empty();
    $('#TitleModal').text('Loading...');
    var loading ='<center><div class="loader" style="margin-top:15%; margin-bottom:15%;"></div></center>';
    $('#ModalBody').append(loading);
}
function CloseForm(flagclose){
    var LinkPage = SummaryPage;
    if(flagclose == 1){
        window.location.href = LinkPage;
    }
    else{
        var flag = confirm('Do you want to exit this form ?');
        if(flag == true){
            window.location.href = LinkPage;
        } 
    }
}
function HistoryLog(Status){

    if(Status == 'add'){
        
        var data = [{
                ColumnName:null,
                value:null,
            }];

        var comment = $('#CommentApproval').val();
        if(comment.length == 0){
            comment = '-';
        }

            data[0] = { ColumnName:'Role',          Value:$('#Permission').text()};
            data[1] = { ColumnName:'Action',        Value:$('#Approval_Select option:selected').text()};
            data[2] = { ColumnName:'Action_by',     Value:CurrentUser.Name};
            data[3] = { ColumnName:'DateTime',      Value:GetCurrentTime()};
            data[4] = { ColumnName:'Comment',       Value:comment};
            data[5] = { ColumnName:'FormID',        Value:FormID};
            
            var clientContext = new SP.ClientContext(SiteUrl);
            var oList = clientContext.get_web().get_lists().getByTitle(Disp_HistoryLog);
            var itemCreateInfo = new SP.ListItemCreationInformation();
            this.oListItem = oList.addItem(itemCreateInfo);
            var length = data.length;
            for(i=0;i<length;i++){
        
                oListItem.set_item(data[i].ColumnName,data[i].Value);
            }            
            oListItem.update();	
            clientContext.executeQueryAsync(
            function(){
                
                console.log('Add log completed..');
                
            },
            function(){

                alert('add log error..');
            });
    }
    else if('get'){
        var query = '?$select=Action,Action_by,DateTime,Comment,FormID,Role&$top=100&$filter=FormID eq \''+FormID+'\'&$orderby=Created asc';
        var data = GetItemByRestAPI(Disp_HistoryLog,query);
        if(data){
            $('#HistoryRow').empty();
            var str='';
            for(i=0;i<data.length;i++){
                str+='<tr style="border-style:solid; border-width:1px; border-color:lightgray;">';
                str+='  <td style="text-align:left;" colspan="1">'+data[i].Role+'</td>';
                str+='  <td style="text-align:left;" colspan="1">'+data[i].Action+'</td>';
                str+='  <td style="text-align:left;" colspan="1">'+data[i].Action_by+'</td>';
                str+='  <td style="text-align:left;" colspan="1">'+data[i].DateTime+'</td>';
                str+='  <td style="text-align:left;" colspan="1">'+data[i].Comment+'</td>';
                str+='</tr>';

            }
            $('#HistoryRow').append(str);
        }
    }   
    else{

        console.log('History log status error...');
    }

}
function BrowsePeople(ID){
    $('.modal-dialog').css('max-width','500px');
    var str='';
    str+='';
    str+='<div class="form-inline col-md-12" style="margin-bottom:30px; margin-left:auto; margin-right:auto;">';
    str+='    <div id="peoplePickerDiv"></div>';
    str+='    <button onclick="RetreiveInfoPerson(\''+ID+'\');" style="margin-left:10px;" type="button" class="btn btn btn-primary btn-sm">Select</button>';
    str+='</div>';
    $('#ModalBody').empty();
    $('#ModalBody').append(str);
    initializePeoplePicker('peoplePickerDiv');
    registerPPOnChangeEvent($('#peoplePickerDiv'));
    $('#TitleModal').text('Search people..');
    $('#MainModal').modal('show');

}
function RetreiveInfoPerson(ID){
    var EmpID;
    var EmpName;

    var SetData_Approver = $('#peoplePickerDiv_TopSpan_HiddenInput').val();
    if(SetData_Approver){
        var appset = JSON.parse(SetData_Approver);
        var arr = appset[0].Key;
            EmpName = appset[0].DisplayText;
        var LoginName = arr.split('|');
        var LoginName = LoginName[1];
        var clientContext = SP.ClientContext.get_current();
        var website = clientContext.get_web();
        currentUser = website.ensureUser(LoginName);
        clientContext.load(website);
        clientContext.load(currentUser);
        clientContext.executeQueryAsync(onRequestSucceeded, onRequestFailed);

        function onRequestSucceeded() {
        //ApproverID =  currentUser.get_id();
        EmpID = currentUser.get_id();;
        $(ID).attr('title',EmpID);
        $(ID).val(EmpName);
    
        }

        function onRequestFailed(sender, args) {
            //error handling
            alert('Error: ' + args.get_message());
        }
    }
    
    $('#MainModal').modal('hide');
}
function SetApproval(arr){

    var str='<option value="0">Please select...</option>';
    for(i=0;i<arr.length;i++){
        var index = arr[i];
        str+='<option value="'+Approval_Option[index].value+'">'+Approval_Option[index].title+'</option>';

    }
    $('#Approval_Select').empty();
    $('#Approval_Select').append(str);
}
function GenDocNo(Type){ // DocNO,Year

    var DocNo = '';
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
    //DocNo = yyyy;// + '; ' + hour + ":" + min;
    var length = 0;
    var value;
    //var query = '?$select=DocNo,ID&$top=5000&$filter=Year eq \''+yyyy+'\'';
    var query = '?$select=RunningNO,ID&$top=1&$filter=Year eq \''+yyyy+'\'&$orderby=ID desc';
    var data = GetItemByRestAPI(ListData,query);
    if(data){
        if(data.length>0){
            var Temp_DocNo = data[0].RunningNO;
            var arr_t1 = Temp_DocNo.split('/');
            var t1 = arr_t1[1];
            length = parseInt(t1);
        }
    }
    
    switch(Type){
        case 'DocNo': 
                        if(IsRunningNOEnabled == true){
                            length = length + 1;
                            value = FormatRunningNO + yyyy+'/'+length;
                        }else{
                            value = '';
                        }
                        break;

        case 'Year':    value = yyyy;
                        break;
        case 'Month':
                        var ArrMonth = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                        value = ArrMonth[mm-1];
                        break;

    }
    return value;
}
function CheckUpdateOrCreate(List){

    var query ='?$select=FormID&$top=1&$filter=FormID eq \''+FormID+'\'';
    var data = GetItemByRestAPI(List,query);
    var status = '';
    if(data){
        if(data.length>0){
            status = 'Update';
        }
        else{
            status = 'Create';
        }
    }
    else{
        status = 'Create';
    }

    return status;
}
function SetFormatData(dataset,oListItem){
    for(var i in dataset){
        var item = dataset[i];
        var Column = item.Col;
        var Value = item.Data;
        switch(item.TypeCol){
            case 'singleline':
                                Value = Value;
                                break;
            case 'multipleline':
                                
                            
                                Value = Value;
                                
                                
                                break;
            case 'date':
                                if(Value){
                                    Value = Value;
                                }
                                else{
                                    Value = null; 
                                }
                                
                                
                                break;
            case 'people':
                                if(Value){
                                    
                                    Value = Value.ID;
                                }
                                
                                break;
            case 'people_multiple':
                                if(Value){
                                    
                                    Value = Value;
                                }
                                
                                break;
            case 'radio':
                                if(Value){
                                    Value = Value;
                                }
                                break;
            case 'checkbox':
                                if(Value){
                                    Value = Value;
                                }else{
                                    Value = false;
                                }
                                
                                break;
            
        
        }
        oListItem.set_item(Column,Value);      
    }
 
}
function ValidateData(){ // return Pass
    
    var FormIndex = GetParameterByName('FormMaster');
    var FormConfig = FormMaster[FormIndex];
    var Setting = FormConfig['FormStep'];

    var texterror = '';
    var FlagPass = true;
    for(var i in Setting){
        if(Setting[i].FormStatus == Form.FormStatus){
            for(var j in Setting[i].Validate){
                    var FieldValidate = Setting[i].Validate[j];
                    var require;
                    if(FieldValidate.Type == 'radio'){
                        if(!$("input[name='"+FieldValidate.ID+"']").is(':checked')) { 
                            // checked an item
                            texterror += FieldValidate.Title + '<br>';
                            FlagPass = false;
                            $("input[name="+FieldValidate.ID+"]:radio").parent().attr('style','color:red; margin-left:10px;');
                            // $("input[name='"+FieldValidate.ID+"']").attr('style','border-color:red;');
                        }
                    }else{
                         require = $('#'+FieldValidate.ID).attr('require');
                    }
                    
                    if(require == 'true'){
                        switch(FieldValidate.Type){
                            case 'text':
                                    var data = $('#'+FieldValidate.ID).val();
                                    if(!data){
                                        texterror += FieldValidate.Title + '<br>';
                                        FlagPass = false;
                                        $('#'+FieldValidate.ID).attr('style','border-color:red;');
                                        
                                    }
                                    
                                    break;
                            case 'date':
                                    var data = $('#'+FieldValidate.ID).val();
                                    if(!data){
                                        texterror += FieldValidate.Title + '<br>';
                                        FlagPass = false;
                                      
                            
                                        $('#'+FieldValidate.ID).attr('style','border-color:red;text-align:center;');
                                    }
                                    break;
                            case 'people':
                                    var data = $('#'+FieldValidate.ID).attr('title');
                                    if(!data){
                                        texterror += FieldValidate.Title + '<br>';
                                        FlagPass = false;
                              
                                        $('#'+FieldValidate.ID).attr('style','border-color:red;text-align:center;');
                                    }
                                    break;
                            case 'select':
                                    var data = $('#'+FieldValidate.ID).val();
                                    if(data == '-' || data == 'Please select...' || data == 'Please Select...'){
                                        texterror += FieldValidate.Title + '<br>';
                                        FlagPass = false;
                                        $('#'+FieldValidate.ID).attr('style','border-color:red;');
                                        
                                    }
                                    break;

                        }
     
                    }        
            }
            
        }
        
    }


    if(FlagPass == false){
        var str='';
        str = '<div style="color:red;">' + texterror + '</div>';
        $('#MainModal').modal('show');
        $('#TitleModal').text('Please insert data to require field.');
        $('#ModalBody').empty();
        $('#ModalBody').append(str);
        $('#SubmitAction').prop('disabled',false);
    }
    return FlagPass;

}
function Attachfile(){
    

        
    $('#MainModal').modal();
    $(".modal-dialog").css("max-width", "800px");
    AddLoading();
    $('#TitleModal').text('Attachfile');

    // Init modal attachfile
    var Dom = '';
    Dom+='';
    Dom+='<center>';
    Dom+='<div id="area_attachfile" class="form-group form-inline">';
    Dom+='    <input type="file" class="form-control-file col-md-9" style="border-color:gray; border-width:1px; border-style:solid;" id="getFile" aria-describedby="fileHelp">';
    Dom+='    <button onclick="uploadFile();" style="margin-left:10px;" type="button" class="btn btn btn-primary btn-sm col-md-2">Upload</button>';
    Dom+='<div style="display: none;" id="attachloading" class="lds-ring"><div></div><div></div><div></div><div></div></div>';
    Dom+='</div>';
    Dom+='</center>';
    $('#ModalBody').empty();
    $('#ModalBody').append(Dom);
    Loadfile();
    
    function Loadfile(){

    var query = '?$select=*,Author/Title&$expand=Author&$top=100&$filter=FormID eq \''+FormID+'\'';
    var data = GetItemByRestAPI(Attachment,query);
    var Result = '';
    if(data){
        for(i=0;i<data.length;i++){
            Result+='<tr style="border-style:solid; border-width:1px; border-color:lightgray;">  ';
            Result+='    <td style="text-align:left;" colspan="1">'+(i+1)+'</td>  ';
            Result+='    <td style="text-align:left;" colspan="1"><a target="_blank" href="https://scgchemicals.scg.com/lotusnotes/TPE_Roto/Attachment/'+data[i].Title+'">'+data[i].Title+'</a></td>  ';
            Result+='    <td style="text-align:left;" colspan="1">'+ConvertDate(data[i].Created)+'</td>  ';
            Result+='    <td style="text-align:left;" colspan="1">'+data[i].Author.Title+'</td>';
            if(Form.FormStatus == 'Complete' || Form.FormStatus == 'Reject'){
                Result+='    <td style="text-align:left;" colspan="1"></td>';
                $('#area_attachfile').hide();
                
            }
            else{
                Result+='    <td style="text-align:left;" colspan="1"><a onclick="Removefile(\''+data[i].ID+'\');" type="button" class="btn btn btn-primary btn-md" style="background-color:rgb(138, 28, 28); border-color:rgb(138, 28, 28); color:white; font-weight:bold;"><i class="fa fa-remove"></i></a></td>';
            }
            Result+='</tr>';
        }
        
    }


    var Table = '';
        Table+='';
        Table+='    <table class="table shadow ">';
        Table+='        <thead style="background-color:lightgray; color:black; border-color:lightgray;">';
        Table+='            <tr>';
        Table+='                <th scope="col"><p style="font-weight:normal; margin-bottom:0px;">No</p></th>';
        Table+='                <th scope="col"><p style="font-weight:normal; margin-bottom:0px;">File name</p></th>';
        Table+='                <th scope="col"><p style="font-weight:normal; margin-bottom:0px;">Upload</p></th>';
        Table+='                <th scope="col"><p style="font-weight:normal; margin-bottom:0px;">Upload by</p></th>';
        Table+='                <th scope="col"><p style="font-weight:normal; margin-bottom:0px;">Remove</p></th>';
        Table+='            </tr>';
        Table+='        </thead>';
        Table+='        <tbody id="ResultFile">';
        Table+= Result;
        Table+='        </tbody>';
        Table+='    </table>';

        $('#ModalBody').prepend(Table);


    }


}
function CreateListItem(ListName,Object){

    var dataset = {};
    dataset = Object;
    var clientContext = new SP.ClientContext(SiteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle(ListName);
    var itemCreateInfo = new SP.ListItemCreationInformation();
    this.oListItem = oList.addItem(itemCreateInfo);
    SetPropertiesForm(oListItem,'Create');
    SetFormatData(dataset,oListItem); // set item all object by this action
    oListItem.update();	
    clientContext.executeQueryAsync(
    function(){

        $('#MainModal').modal('hide');

        Swal.fire(
            'Submit Successfully',
            'Click for continue',
            'success',
            {
                timer: 1500
            }
        ).then((result) => {

            if(result.value){
                SubmitActionFinalFlag(true);
            }

        });
        
        

        // $('#ModalBody').empty();
        // $('#ModalBody').append('<p style="text-align:center;">Successfully...<p>');
        
    },
    function(sender, args){

        $('#MainModal').modal('hide');

        Swal.fire({
            type: 'error',
            title: 'Oops... <br> Something went wrong!',
            footer: 'Please contact your site admin for support.',
           
            
        });

        SubmitActionFinalFlag(false);
        // $('#ModalBody').empty();
        // $('#ModalBody').append('<p style="text-align:center; color:red;">Create list item error...<p>');
        // alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
       
    }

    );

}
function SaveByCreateListItem(ListName,Object){

    var dataset = {};
    dataset = Object;
    var clientContext = new SP.ClientContext(SiteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle(ListName);
    var itemCreateInfo = new SP.ListItemCreationInformation();
    this.oListItem = oList.addItem(itemCreateInfo);
    SetPropertiesForm(oListItem,'Create');
    oListItem.set_item('FormStatus','Save Draft');
    oListItem.set_item('RunningNO','Draft');
    oListItem.set_item('FlagSubmit',false);
    SetFormatData(dataset,oListItem); // set item all object by this action
    oListItem.update();	
    clientContext.executeQueryAsync(
    function(){

        $('#MainModal').modal('hide');

        Swal.fire(
            'Save as draft completely',
            'Click for continue',
            'success',
            {
                timer: 1500
            }
        ).then((result) => {

            if(result.value){
                SubmitActionFinalFlag('SaveDraft');
            }

        });
        
        

        // $('#ModalBody').empty();
        // $('#ModalBody').append('<p style="text-align:center;">Successfully...<p>');
        
    },
    function(sender, args){

        $('#MainModal').modal('hide');

        Swal.fire({
            type: 'error',
            title: 'Oops... <br>Something went wrong! can not save as draft',
            footer: 'Please contact your site admin for support.',
           
            
        });

        SubmitActionFinalFlag(false);
        // $('#ModalBody').empty();
        // $('#ModalBody').append('<p style="text-align:center; color:red;">Create list item error...<p>');
        // alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
       
    }

    );

}
function UpdateListItem(ListName,Object){

    var dataset = Object ;
    var ItemID;
    var query = '?$select=ID&$filter=FormID eq \''+FormID+'\'';
    var data = GetItemByRestAPI(ListName,query);
    if(data){
        ItemID = data[0].ID;
    }

    var clientContext = new SP.ClientContext(SiteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle(ListName);
    this.oListItem = oList.getItemById(ItemID);
    SetPropertiesForm(oListItem,'Update');
    SetFormatData(dataset,oListItem); // set item all object by this action
    oListItem.update();	
    clientContext.executeQueryAsync(function(){

        
        // $('#ModalBody').empty();
        // $('#ModalBody').append('<p style="text-align:center;">Save Successfully...<p>');
        $('#MainModal').modal('hide');
        Swal.fire(
            'Submit Successfully',
            'Click for continue',
            'success',
            {
                timer: 1500
            }
        ).then((result) => {

            if(result.value){
                SubmitActionFinalFlag(true);
            }

        });

    }, function(){

        $('#MainModal').modal('hide');

        Swal.fire({
            type: 'error',
            title: 'Oops... <br> Something went wrong!',
            footer: 'Please contact your site admin for support.',
            
            
        });

        SubmitActionFinalFlag(false);

    });

}
function SaveByUpdateListItem(ListName,Object){

    var dataset = Object ;
    var ItemID;
    var query = '?$select=ID&$filter=FormID eq \''+FormID+'\'';
    var data = GetItemByRestAPI(ListName,query);
    if(data){
        ItemID = data[0].ID;
    }

    var clientContext = new SP.ClientContext(SiteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle(ListName);
    this.oListItem = oList.getItemById(ItemID);
    SetPropertiesForm(oListItem,'Update');
    oListItem.set_item('FormStatus','Save Draft');
    oListItem.set_item('RunningNO','Draft');
    oListItem.set_item('FlagSubmit',false);
    SetFormatData(dataset,oListItem); // set item all object by this action

    oListItem.update();	
    clientContext.executeQueryAsync(function(){

        
        // $('#ModalBody').empty();
        // $('#ModalBody').append('<p style="text-align:center;">Save Successfully...<p>');
        // $('#MainModal').modal('hide');
        Swal.fire(
            'Save as draft completely',
            'Click for continue',
            'success',
            {
                timer: 1500
            }
        ).then((result) => {

            if(result.value){
                SubmitActionFinalFlag('SaveDraft');
            }

        });

    }, function(){

        $('#MainModal').modal('hide');

        Swal.fire({
            type: 'error',
            title: 'Oops... <br>Something went wrong! can not save as draft',
            footer: 'Please contact your site admin for support.',
            
            
        });

        SubmitActionFinalFlag(false);

    });

}
function RemoveListItem(ListName,ItemID){

    var status = false;
    var flag = confirm('Do you want to delete this item ?');
    if(flag == true){
            var clientContext = new SP.ClientContext(SiteUrl);
            var oList = clientContext.get_web().get_lists().getByTitle(ListName);
            this.oListItem = oList.getItemById(ItemID);
            oListItem.deleteObject();
            clientContext.executeQueryAsync(function(){
               alert('Remove complete');
                status = true;
                window.location.href = SiteUrl;
            
               
            },function(){
                console.log('Remove Item Error');
           
            });
         
    }
    
    
}
function SetFormAction(){

    var index = GetParameterByName('FormMaster');
    for(var i in FormMaster[index]){
        switch(i){
            case 'FormStep':
                            var item = FormMaster[index][i];
                           
                            for(var j in item){
                                if(Form.FormStatus == item[j].FormStatus){
                                    
                                    var Record = item[j];
                                    
                                    var StatusAction = Record.StatusAction;
                                    
                                    var str='<option value="0">Please select...</option>';
                                    for(var k in StatusAction){
                                      
                                        str+='<option value="'+k+'">'+StatusAction[k]+'</option>';

                                    }
                                    $('#Approval_Select').empty();
                                    $('#Approval_Select').append(str);
                              
                                }
                            }
                            break;
        }
    }
}
function SetPropertiesForm(oListItem,Status){
    switch(Status){
        case 'Create':
                        var index = GetParameterByName('FormMaster');
                        // var LinkForm = SiteUrl + '/SitePages/'+FormMaster[index].FormName+'.aspx?FormMaster='+ index +'&FormID=' + FormID;
                        var LinkForm = SiteUrl + '/SitePages/web/'+FormMaster[index].FormName+'.aspx?FormMaster='+ index +'&FormID=' + FormID;
                        var TagLink = '<a target="_blank" href="'+LinkForm+'">View</a>';

                        oListItem.set_item('View',TagLink);
                        oListItem.set_item('FormID',FormID);
                        oListItem.set_item('RunningNO',GenDocNo('DocNo'));
                        oListItem.set_item('Year',GenDocNo('Year'));
                        oListItem.set_item('Month',GenDocNo('Month'));
                        
                        
                        break;
        case 'Update': 
                        
                        break;


    }
    oListItem.set_item('StatusAction',Form.StatusAction);
    oListItem.set_item('FormStatus',Form.FormStatus);
    oListItem.set_item('FlagSubmit',Form.FlagSubmit);
  
}
function SetRequireField(){
    
    $('.MarkRequired').remove();

    var FormIndex = GetParameterByName('FormMaster');
    var FormConfig = FormMaster[FormIndex];
    var Setting = FormConfig['FormStep'];
    for(var i in Setting){
 
        if(Setting[i].FormStatus == Form.FormStatus){
           
            for(var j in Setting[i].Validate){
                    var FieldValidate = Setting[i].Validate[j];
                    var str = '<p class="MarkRequired">*</p>';
                    $('#' + FieldValidate.ID).before(str);
                    $('#' + FieldValidate.ID).attr('require', true);
                    
                    
            }
           
        }
       
    }
}
function SetRequireFieldByAction(ActionID,FieldID,TypeDom,Title,Condition){
    var data = $('#' + ActionID).val();
    if(data){
        if(data == Condition){
            var FormIndex = GetParameterByName('FormMaster');
            var FormConfig = FormMaster[FormIndex];
            var Setting = FormConfig['FormStep'];
            for(var i in Setting){
         
                if(Setting[i].FormStatus == Form.FormStatus){
                   var ObjField = Setting[i].Validate;
                        Objlength = Object.keys(ObjField).length;
                        ObjField['field' + (Objlength + 1)] = {
                            Title:Title,
                            ID:FieldID,
                            Type:TypeDom
                        };      
                }
            }    
            SetRequireField();
        }else{

            var FormIndex = GetParameterByName('FormMaster');
            var FormConfig = FormMaster[FormIndex];
            var Setting = FormConfig['FormStep'];
            for(var i in Setting){
         
                if(Setting[i].FormStatus == Form.FormStatus){
                    var ObjField = Setting[i].Validate;
                    for(var j in Setting[i].Validate){
                        var FieldValidate = Setting[i].Validate[j];

                        if(FieldValidate.ID == FieldID){
                            
                            delete ObjField[j];
                            
                        }
                    }
                }
            }    


            SetRequireField();
        }
    }

}
function RoutingPage(Page){

    $('title').text(Form.FormName);
    $('#PageBody').empty();
    var response;
        $.ajax({ type: "GET",   
            url: SiteUrl + "/SitePages/web/component/Page/"+Page,   
            async: false,
            success : function(text)
            {
                response= text;
            }
        });
      
    $('#PageBody').append(response);

    $('.loader').remove();
}
function CheckStatusWorkflow(value,version){

    if(version == '2013'){
        if(value.Description != 'Complete'){
            pagename = 'PageWorkflowInprogress.html';
            RoutingPage(pagename);
        }
    }
    else{
        if(value != '5'){
            var pagename = 'PageWorkflowInprogress.html';
            switch(value){
                case '1':
                            pagename = 'PageWorkflowFailedOnStart.html';
                            break;
                case '2':
                            pagename = 'PageWorkflowInprogress.html';
                            break;
                case '3':   
                            pagename = 'PageWorkflowErrorOccurred.html';
                            break;
                case '4':
                            pagename = 'PageWorkflowCancelled.html';
                            break;
                case '6':
                            pagename = 'PageWorkflowFailedOnStartRetry.html';
                            break;
                case '7':
                            pagename = 'PageWorkflowErrorOccurredRetry.html';
                            break;
                
                
            }
                RoutingPage(pagename);
    }
    
        
    }
    return;
}
function SetElementByItemData(title,item,TempData){

 
    try{
        switch(item.TypeDom){
                        
            case 'text':
                        $('#'+item.ID).val(TempData);
                        break;
            case 'date':
                        if(TempData){
                            $('#'+item.ID).val(ConvertDateOnly(TempData));
                        }
                        
                        break;
            case 'label':
                        if(TempData){
                            $('#'+item.ID).text(TempData);
                        }
                        
                        break;
            case 'textarea':
                        $('#'+item.ID).val(TempData);
                        break;
            case 'select':
                        if(item.TypeCol == 'people'){
                            
                            $('#'+item.ID).val(TempData.Id);
                        }
                        else{
    
                            $('#'+item.ID).val(TempData);   
                        }
                        break;
    
            case 'summernote':
                        $('#'+item.ID).summernote('code', TempData);
    
                        break;
            case 'people':
                        //
                        item.Data;
                        if(TempData){
                          
                            $('#'+item.ID).attr("title",TempData.Id);
                            $('#'+item.ID).val(TempData.Title);
                            
                        }
                        break;
            case 'people_multiple':
                        title;
                        item;
                        TempData;
                
                        
                        if(TempData){
                            
                            TempData = TempData.results;
                            var ObjField = FormMaster[MasterFormID];
                            ObjField = ObjField.FieldData[title];
                            ObjField.Data = TempData;
                            SetPeople.show(title);
                            debugger;
                        }
                        
                        
                       
                        // var Temp = {
          
                        //     [EmpName]: {
                        //       Title: EmpName,
                        //       ID: EmpID
                        //     }
                      
                        // };
                        
                        // ObjField = Object.assign(ObjField,Temp);
                        // debugger;
                        // SetPeople.show(title);


                        
                        
                        break;
    
            case 'radio':
                        if(TempData){
    
                            $('input[name='+item.ID+'][value="'+TempData+'"]').prop("checked",true);
    
                        }
                        //
                        break;
            case 'checkbox':
                        if(TempData == true){
                            $('#'+item.ID).prop('checked', true);
                            var Str_Part = item.ID;
                            Str_Part = Str_Part.substring(1,Str_Part.length);
                            var Section = 'Part' + Str_Part;
                            
                            TriggerBar(Section);
                        }
                        break;
            case 'object':
                
                        if(TempData){
                            var TempData = TempData;
                            var arr_data =  TempData.split(';');
                            var arr_data_length = arr_data.length;
                            if(arr_data_length > 1){
                                arr_data_length = arr_data_length - 1 ;
                            }
                            for(l=0;l<arr_data_length;l++){
                            
                                var TempArr = arr_data[l];
                                var str_arr = TempArr.substring(1,TempArr.length-1);
                                var obitem = str_arr.split('|');
                                var ID = obitem[0];
                                var value = obitem[1];
                                if(value == 'true'){
                                    
                                    $('#'+ID).prop("checked", true );
                                }
                                else if(value == 'false'){
                                
                                    $('#'+ID).prop("checked", false );
                                }
                                else{
                                    $('#'+ID).val(value);
                                }
                                
                            }
    
                        }
                        break;
        }
    }
    catch(err){
        console.log(err);
    }



    
}
function DataConnection(ConnectionID){
    var SiteUrl = Connection_Obj[ConnectionID].SiteUrl;
    var ListName = Connection_Obj[ConnectionID].ListName;
    var Query = Connection_Obj[ConnectionID].Query;

    var requestUri = SiteUrl + "/_api/web/lists/getByTitle('"+ListName+"')/items" + Query;
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
// when user click submit action will take action in this function      
function SubmitAction(){ // FormMethodTemplate
    // disable submit button
    $('#SubmitAction').prop('disabled',true);


    var ActionTitle = $("#Approval_Select option:selected").text();
    Form.StatusAction = $('#Approval_Select').val();
    Form.FlagSubmit = true;
    if(Form.StatusAction != 0){
        // $('#MainModal').modal('show');
        // AddLoading();
        // $('#TitleModal').text(ActionTitle);

        TriggerTempData();

        // Validate 
        var FlagValidatePass = ValidateData(); // FormMethodTemplate
        
        if(FlagValidatePass == false){
            return;
        }
    
        var StatusCreate = CheckUpdateOrCreate(ListData); // FormMethodTemplate
        // $('#MainModal').modal('hide');
        try{

            switch(StatusCreate){   // FormMethodTemplate
                case 'Create':
                    
                    
                            CreateListItem(ListData,TempCurrentData); // FormMethodTemplate
                        
                            
                        
                        break;
                case 'Update':
                        
                            UpdateListItem(ListData,TempCurrentData); // FormMethodTemplate
                        
                        break;
            }

        }catch(err){
            
            

            Swal.fire({
                type: 'error',
                title: 'Oops... <br> Something went wrong!',
                footer: 'Please contact your site admin for support.<br> error: \''+err+'\'',
                
                
            });

            $('#SubmitAction').prop('disabled',false);
        }
        
    }
    else{
        alert('Please select any action..');
        
        // enable submit button
        $('#SubmitAction').prop('disabled',false);
    }

}
function SubmitActionFinalFlag(Flag){
    

    if(Flag == true){

        UpdateFlagAttachment(); // FormMethodTemplate
        HistoryLog('add'); // FormMethodTemplate
        CloseForm(1); // FormMethodTemplate

    }else if(Flag == 'SaveDraft'){
        UpdateFlagAttachment(); // FormMethodTemplate
        // enable submit button
        $('#SubmitAction').prop('disabled',false);
    }else{

        // enable submit button
        $('#SubmitAction').prop('disabled',false);

    }
}
function TriggerTempData(){

    for(var i in TempCurrentData){

                var field = TempCurrentData[i];
            
                    switch(field.TypeDom){
                        case 'text':
                                        field.Data = $('#'+field.ID).val();
                                        break;
                        case 'textarea':
                                        field.Data = $('#'+field.ID).val();
                                        break;
                        case 'date':
                                        var tempdata = $('#'+field.ID).val();

                                        if(tempdata){
                                            field.Data = $('#'+field.ID).val();
                                        }
                                        else{
                                            field.Data = '';
                                        }
                                        
                                    
                                        break;

                        case 'label':
                                        field.Data = $('#'+field.ID).text();
                                    
                                    
                                        break;
                        case 'select':
                                        
                                        if(field.TypeCol == 'people'){  // in case select query from people 
                                            if($('#'+field.ID).val() != '-'){
                                                field.Data = {
                                                    //ID: $('#'+field.ID).val(),
                                                    ID: $('#'+field.ID + ' option').eq($('#'+field.ID).prop("selectedIndex")).val(),
                                                    Title: $('#'+field.ID+' option:selected').text()
                                                }
                                            }
                                        
                                        }
                                        else{ // in case select query from normal text
                                            field.Data = $('#'+field.ID).val();
                                        }
                                        break;
                        case 'people':  
                                    
                                        field.Data = {
                                            ID: $('#'+field.ID).attr('title'),
                                            Title: $('#'+field.ID).val()
                                        }
                                        

                                        break;
                        case 'people_multiple':  
                                        
                        debugger;
                                        field.Data = SetPeople.data(field.Data);
                                       
                                        
                                      
                                        break;

                                        
                        case 'checkbox':
                                        if ($('#'+field.ID).is(":checked"))
                                        {
                                            field.Data = true;
                                        }
                                        else{
                                            field.Data = false;
                                        }
                                        break;
                        case 'var':
                                        field.Data = field.Data;
                        
                                        break;
                        case 'radio':
                                        field.Data = $('input[name='+field.ID+']:checked').val();
                                        if(!field.Data){
                                            field.Data = '';
                                        }
                        
                                        break;
                        case 'array':
                                        var tempdata = field.Data;
                                        field.Data = tempdata.toString();
                        
                                        break;

                        case 'summernote':

                                        field.Data = $('#'+field.ID).summernote('code');

                                        break;

                        case 'object':  
                                        var index = field.ID;
                                        var sum_str = '';
                                        if(index == 'T41' || index == 'T42' || index == 'T43' || index == 'T44' || index == 'T45'){
                                            for(loop=1;loop<=10 ;loop++){
                                                var TempID = index + '_Col' + loop;
                                                var type = $("#"+TempID).attr("type");
                                                var TempCheck;
                                                switch(type){
                                                    case 'checkbox':

                                                                    if ($('#'+TempID).is(":checked"))
                                                                    {
                                                                        TempCheck = 'true';
                                                                    }
                                                                    else{
                                                                        TempCheck = 'false';
                                                                    }
                                                                    
                                                                    sum_str += '['+TempID+'|'+TempCheck+'];';
                                                                    
                                                                    break;
                                                    case 'text':
                                                                    var TempData = $('#'+TempID).val();
                                                                    sum_str += '['+TempID+'|'+TempData+'];';
                                                                    

                                                                    break;

                                                }
                                                
                                            }
                                            field.Data = sum_str;
                                        }
                                        else{
                                            for(loop=1;loop<=100;loop++){
                                                var TempID = index + '_Col' + loop;
                                                var TempData = $('#'+TempID).val();
                                                if(!TempData){
                                                
                                                }
                                                else{
                                                    sum_str += '['+TempID+'|'+TempData+'];';
                                                }     
                                            }
                                            
                                            field.Data = sum_str;
                                        }
                                        
                                        break;
                    
                    } 
            }      
}
function SaveDraft(){
    
        TriggerTempData();
        var StatusCreate = CheckUpdateOrCreate(ListData);
        switch(StatusCreate){   
            case 'Create':
                    
                        SaveByCreateListItem(ListData,TempCurrentData);
                        UpdateFlagAttachment(); 
                    break;
            case 'Update':
                    
                        SaveByUpdateListItem(ListData,TempCurrentData);
                        UpdateFlagAttachment(); 
                    break;
        }
        
        
        
}
function RemoveCurrentForm(){
    // Get ID Form by FormID
    var query = '?$select=ID&$top=1&$filter=FormID eq \''+FormID+'\'';
    var data = GetItemByRestAPI(ListData, query);
    if(data){
        RemoveListItem(ListData,data[0].ID);
    }
    
}
function CheckMemberGroup(GroupID){

    var clientContext = new SP.ClientContext(SiteUrl);
    var collGroup = clientContext.get_web().get_siteGroups();
    var oGroup = collGroup.getById(GroupID);
    this.collUser = oGroup.get_users();
    clientContext.load(collUser);


    clientContext.executeQueryAsync(function(){

        var userInfo = '';
        var userEnumerator = collUser.getEnumerator();
        var CountUser = collUser.get_count();
    
        var TempUserIDArr = [];
        while (userEnumerator.moveNext()) {
            var oUser = userEnumerator.get_current();
            userInfo += '\nUser: ' + oUser.get_title() + 
                '\nID: ' + oUser.get_id() + 
                '\nEmail: ' + oUser.get_email() + 
                '\nLogin Name: ' + oUser.get_loginName();
                
                TempUserIDArr.push(oUser.get_id());

        }

        if(TempUserIDArr.indexOf(CurrentUser.ID) == -1){
            AddCurrentUserToGroup(GroupMember);
        }else{
           // alert('User is in group');
        }

    

    }, function(){


        alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());

    });
    
}


function CurrentRole(Role,TitleRole){
                   
               
    if(TitleRole == 'Visitor'){
        
        Disable_Panel('All');
        $('#Permission').text('Visitor');
        //hide button remove right nav
        $('#RemoveCurrentForm , #btnSaveDraft').hide();
        
    }
    else{

        $('#Permission').text(TitleRole);
    }
}

function Disable_Panel(PartID){
    
    if(PartID == 'All'){

        $('#Permission').text('Visitor');
        $('body *').attr('readonly', true);
        $('body *').css('cursor', 'no-drop');
        $('body *').on('mousedown', function(e) {
                e.preventDefault();
                this.blur();
                window.focus();
        });
        $('body').removeAttr('onclick');
        $('#Approval').hide();

    }else{
        
        $('#'+PartID+' *').attr('readonly', true);
        $('#'+PartID+' *').css('cursor', 'no-drop');
        $('#'+PartID+' *').on('mousedown', function(e) {
                e.preventDefault();
                this.blur();
                window.focus();
        });
        $('#'+PartID+' *').removeAttr('onclick');

    }    
}

function RenderView(data){
    if(data){

        if(CurrentUser.Permission == 'Admin'){

        }else{
            $('.ms-cui-tts,#RibbonContainer-TabRowRight,#O365_MainLink_Settings,#O365_MainLink_Help,#Sites_BrandBar').slideUp(2000);
        }

       
        SetFormAction(); // FormMethodTemplate
            
        // Set top right info
        $('#DocNO').text(data.RunningNO);
        $('#CreateDate').text(ConvertDate(data.Created)); 
        $('#FormStatus').text(data.FormStatus);
        $('#CreatedBy').text(data.Author.Title);

        // Map Current view according to FormView in config.js
        // Form.FormView = FormMaster[MasterFormID].FormStep[Form.FormStatus].FormView;
        Form.FormStatus = data.FormStatus;
        Form.FormView = FormMaster[MasterFormID].FormStep[Form.FormStatus].FormView;
  
        if(Form.FormView){
            SwitchViewTo(Form.FormView,data);
        }
        else{
            Disable_Panel('All');
        }

    }
}

function RenderFormNew(){
    // set panel status 
    if(CurrentUser.Permission == 'Admin'){

    }else{
        
        $('.ms-cui-tts,#RibbonContainer-TabRowRight,#O365_MainLink_Settings,#O365_MainLink_Help,#Sites_BrandBar').slideUp(2000);
    
    }
    
    $('#DocNO').text('-');
    $('#CreateDate , #RequestDate').text(SetDateTime()); 
    $('#FormStatus').text('Create');
    $('#CreatedBy').text(CurrentUser.Name);
    
    SetFormAction(); // FormMethodTemplate

    // Set Panel People end of section 1
    $('#Requestor').val(CurrentUser.Name);
    $('#Requestor').attr('title',CurrentUser.ID);
    // End Set Panel People end of section 1

    // Disable part 2 exclude admin 
    if(CurrentUser.Permission == 'Admin'){
        $('#Permission').text('Admin'); 
    }
    else{ // not admin
        $('#Permission').text('Requestor');
      
    }  
}


function GoToTop(){
   
    $('#s4-workspace').animate({scrollTop:0}, 'slow');

    // var w = document.getElementById("s4-workspace");
    // w.scrollTop({behavior: "smooth"});
}

function SetFieldFormMaster(ConnectionID,DomID,TypeDom){
    switch(TypeDom){
        case 'select':
                        var data = DataConnection(ConnectionID);
                        var str='';
                        if(data){

                            var value = data[0].Value;
                            value = value.split(',');
                            if(value){
                                str+='<option value="-">Please Select...</option>';
                                for(i=0;i<value.length;i++){
                                    str+='<option value="'+value[i]+'">'+value[i]+'</option>';
                                } 
                                $('#' + DomID).empty();
                                $('#' + DomID).append(str);  
                            }
                            
                        }
                        break;
    }
    
}




var SetPeople = {
  
    modal:function(FieldIndex){
        
        var str='';
        str+='<div class="form-inline col-md-12" style="margin-bottom:30px; margin-left:auto; margin-right:auto;">';
        str+='    <div id="peoplePickerDiv"></div>';
        str+='    <button onclick="SetPeople.add(\''+FieldIndex+'\');" style="margin-left:10px;" type="button" class="btn btn btn-primary btn-sm">Select</button>';
        str+='</div>';
        $('#ModalBody').empty();
        $('#ModalBody').append(str);
        
        initializePeoplePicker('peoplePickerDiv');
        registerPPOnChangeEvent($('#peoplePickerDiv'));
        $('#TitleModal').text('Search people..');
        $('#MainModal').modal('show');
        $('#ModalBody').css('max-height','500px');
        $('.modal-dialog').css('max-width','500px');
        $('.modal-dialog').css('max-height','500px');
    },
    add:function(FieldIndex) {
    
        var ObjField = FormMaster[MasterFormID].FieldData[FieldIndex].Data;

        var EmpID;
        var EmpName;
        var SetData_Approver = $('#peoplePickerDiv_TopSpan_HiddenInput').val();
        if(SetData_Approver){
            var appset = JSON.parse(SetData_Approver);
           
            var arr = appset[0].Key;
                EmpName = appset[0].DisplayText;
            var LoginName = arr.split('|');
            var LoginName = LoginName[1];
            var clientContext = SP.ClientContext.get_current();
            var website = clientContext.get_web();
            currentUser = website.ensureUser(LoginName);
            clientContext.load(website);
            clientContext.load(currentUser);
            clientContext.executeQueryAsync(onRequestSucceeded, onRequestFailed);
    
            function onRequestSucceeded() {
    
                EmpID = currentUser.get_id();
                var length = Object.keys(ObjField).length;
               
                var Temp = {
          
                    [length]: {
                      Title: EmpName,
                      Id: EmpID
                    }
              
                };
                
                
                ObjField = Object.assign(ObjField,Temp);

               
                SetPeople.show(FieldIndex);
                
            }
    
            function onRequestFailed(sender, args) {
        
                alert('Error: ' + args.get_message());
            }
        }
        
        $('#MainModal').modal('hide');





    } ,
    del:function(FieldIndex,Key){
        debugger;
        var ObjField = FormMaster[MasterFormID].FieldData[FieldIndex].Data;
        delete ObjField[Key];
        SetPeople.show(FieldIndex);
    } ,
    show:function(FieldIndex){

        var ObjField = FormMaster[MasterFormID].FieldData[FieldIndex].Data;
        var DomID = FormMaster[MasterFormID].FieldData[FieldIndex].ID;
        var str= '';
        for(i in ObjField){
            str+='';
            str+='<li>';
            str+='  <div class="form-inline">';
            str+='    <p style="margin-bottom:0px;">'+ObjField[i].Title+'</p>';
            str+='    <a style="cursor: pointer;" onclick="SetPeople.del(\''+FieldIndex+'\',\''+i+'\');" type="button">x</a>';
            str+='  </div>';
            str+='</li>';
        }
        
        $('#'+DomID).empty();
        $('#'+DomID).append(str);
    },
    data:function(ObjField){
        var str = '';
        for(i in ObjField){

            str += ObjField[i].Id + ';#' + ObjField[i].Title +';#';
        }        

        return str;
    }


};
