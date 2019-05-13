'use strict';

jQuery(document).ready(function () {

    // Check for FileReader API (HTML5) support.
    if (!window.FileReader) {
        alert('This browser does not support the FileReader API.');
    }
});

function CheckFileExist(){
    var FlagDup = false;
    var Title = $('input[type=file]').val().split('\\').pop();
       
    //var query = '?$select=*&$top=1&$filter=Name eq \''+name[0]+'\'';
    var query = '?$select=*&$top=1&$filter=Title eq \''+Title+'\' and ActiveStatus eq 1';
    var data = GetItemByRestAPI(Attachment,query);
    if(data){
        if(data.length > 0){
            FlagDup = true;
        }
    }
    return FlagDup;
}

function Removefile(ItemID){
    
    //var FlagDel = confirm('Do you want to remove this item?');
    var FlagDel = confirm('This action cannot be undone.\nAre you sure you want to delete this file ?');
    
    if(FlagDel == true){
        $.ajax({  
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + Attachment + "')/items(" + ItemID + ")",  
            type: "POST",  
            contentType: "application/json;odata=verbose",  
            headers: {  
                "Accept": "application/json;odata=verbose",  
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
                "IF-MATCH": "*",  
                "X-HTTP-Method": "DELETE",  
            },  
            success: function(data) {  
                Queryfile() 

            },  
            error: function(data) {  
                alert("Remove file error...");  
            }  
        });  
    }
   
}

function Queryfile(){

    var query = '?$select=*,Author/Title&$expand=Author&$top=100&$filter=FormID eq \''+FormID+'\'';
    var data = GetItemByRestAPI(Attachment,query);
    var Result = '';
    if(data){
        for(i=0;i<data.length;i++){
            Result+='<tr style="border-style:solid; border-width:1px; border-color:lightgray;">  ';
            Result+='    <td style="text-align:left;" colspan="1">'+(i+1)+'</td>  ';
            Result+='    <td style="text-align:left;" colspan="1">'+data[i].Title+'</td>  ';
            Result+='    <td style="text-align:left;" colspan="1">'+ConvertDate(data[i].Created)+'</td>  ';
            Result+='    <td style="text-align:left;" colspan="1">'+data[i].Author.Title+'</td>';
            Result+='    <td style="text-align:left;" colspan="1"><a type="button" class="btn btn btn-primary btn-md" style="background-color:rgb(138, 28, 28); border-color:rgb(138, 28, 28); color:white; font-weight:bold;"><i class="fa fa-remove"></i></a></td>';
            Result+='</tr>';
        }
        
    }
    $('#ResultFile').empty();
    $('#ResultFile').append(Result);
}

function UpdateFlagAttachment(){

    var query = '?$select=*&$top=100&$filter=FormID eq \''+FormID+'\'';
    var data = GetItemByRestAPI(Attachment,query);

    if(data){
        for(i=0;i<data.length;i++){
            UpdateItem(data[i].ID);
        }
    }

    function UpdateItem(ItemID){

        var ctx = new SP.ClientContext.get_current();
        var customList = ctx.get_web().get_lists().getByTitle(Attachment);
        var listItem = customList.getItemById(ItemID);

        /*Set the value and update*/
        listItem.set_item('ActiveStatus', 1);
        listItem.update();

        ctx.executeQueryAsync(function(){
            /*Need to change this to show on the page*/
            console.log('Update flag successful'); 
        },function(sender, args){
            alert('Request failed. '+args.get_message() + '\n' + args.get_stackTrace());
        });
    }
    
    
   
 
    
    

}

// Upload the file.
// You can upload files up to 2 GB with the REST API.
function uploadFile() {
    $('#attachloading').show();
    var FlagDup =  CheckFileExist();
    if(FlagDup == true){
        alert('File is already exist. Please select other file or change filename.');
        $('#attachloading').hide();
        return false;
    }
    // Define the folder path for this example.
    var serverRelativeUrlToFolder = '/' + SiteCollection + '/' + SubSite + '/' + Attachment;

    // Get test values from the file input and text input page controls.
    var fileInput = jQuery('#getFile');
    //var newName = jQuery('#displayName').val();
    var newName = $('input[type=file]').val().split('\\').pop();
    // Get the server URL.
    var serverUrl = _spPageContextInfo.webAbsoluteUrl;
    // Initiate method calls using jQuery promises.
    // Get the local file as an array buffer.
    var getFile = getFileBuffer();
    getFile.done(function (arrayBuffer) {

        // Add the file to the SharePoint folder.
        var addFile = addFileToFolder(arrayBuffer);
        addFile.done(function (file, status, xhr) {

            // Get the list item that corresponds to the uploaded file.
            var getItem = getListItem(file.d.ListItemAllFields.__deferred.uri);
            getItem.done(function (listItem, status, xhr) {

                // Change the display name and title of the list item.
                var changeItem = updateListItem(listItem.d.__metadata);
                changeItem.done(function (data, status, xhr) {
                    //alert('file upload successful');
                    Queryfile();
                    $('#attachloading').hide();
                });
                changeItem.fail(onError);
            });
            getItem.fail(onError);
        });
        addFile.fail(onError);
    });
    getFile.fail(onError);

    // Get the local file as an array buffer.
    function getFileBuffer() {
        var deferred = jQuery.Deferred();
        var reader = new FileReader();
        reader.onloadend = function (e) {
            deferred.resolve(e.target.result);
        }
        reader.onerror = function (e) {
            deferred.reject(e.target.error);
        }
        reader.readAsArrayBuffer(fileInput[0].files[0]);
        return deferred.promise();
    }

    // Add the file to the file collection in the Shared Documents folder.
    function addFileToFolder(arrayBuffer) {

        // Get the file name from the file input control on the page.
        var parts = fileInput[0].value.split('\\');
        var fileName = parts[parts.length - 1];

        // Construct the endpoint.
        var fileCollectionEndpoint = String.format(
                "{0}/_api/web/getfolderbyserverrelativeurl('{1}')/files" +
                "/add(overwrite=true, url='{2}')",
                serverUrl, serverRelativeUrlToFolder, fileName);
            

    


        // Send the request and return the response.
        // This call returns the SharePoint file.
        return jQuery.ajax({
            url: fileCollectionEndpoint,
            type: "POST",
            data: arrayBuffer,
            processData: false,
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
                "content-length": arrayBuffer.byteLength
            }
        });
    }

    // Get the list item that corresponds to the file by calling the file's ListItemAllFields property.
    function getListItem(fileListItemUri) {

        // Send the request and return the response.
        return jQuery.ajax({
            url: fileListItemUri,
            type: "GET",
            headers: { "accept": "application/json;odata=verbose" }
        });
    }

    // Change the display name and title of the list item.
    function updateListItem(itemMetadata) {

        // Define the list item changes. Use the FileLeafRef property to change the display name. 
        // For simplicity, also use the name as the title. 
        // The example gets the list item type from the item's metadata, but you can also get it from the
        // ListItemEntityTypeFullName property of the list.
        /*var body = String.format("{{'__metadata':{{'type':'{0}'}},'FileLeafRef':'{1}','Title':'{2}'}}",
            itemMetadata.type, newName, newName);
        */
        var body = String.format("{{'__metadata':{{'type':'{0}'}},'FileLeafRef':'{1}','Title':'{2}','FormID':'{3}','ActiveStatus':'{4}'}}",
        itemMetadata.type, newName, newName,FormID,true);




        // Send the request and return the promise.
        // This call does not return response content from the server.
        return jQuery.ajax({
            url: itemMetadata.uri,
            type: "POST",
            data: body,
            headers: {
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
                "content-type": "application/json;odata=verbose",
                "content-length": body.length,
                "IF-MATCH": itemMetadata.etag,
                "X-HTTP-Method": "MERGE"
            }
        });
    }
}

// Display error messages. 
function onError(error) {
    alert(error.responseText);
}