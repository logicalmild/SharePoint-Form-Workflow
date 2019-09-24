'use strict';


 var rndString = "";


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
                Init_Attach_Table();
                Queryfile();
               

            },  
            error: function(data) {  
                alert("Remove file error...");  
            }  
        });  
    }
   
}

// function Queryfile(){

    
//     var query = '?$select=*,Author/Title&$expand=Author&$top=100&$filter=FormID eq \''+FormID+'\'&$orderby=Created asc';
//     var data = GetItemByRestAPI(Attachment,query);
//     if(data){
//         for(i=0;i<data.length;i++){
//             var Result = '';
//             Result += '<td>'+data[i].GroupID+'</td>';
//             Result += '<td>'+$('#File'+(data[i].GroupID)+' td:nth-child(2)').text()+'</td>';
//             Result += '<td><a target="_blank" href="'+SiteUrl+'/Attachment/'+data[i].Title+'">'+data[i].Title+'</a></td>';
//             Result += '<td>'+data[i].Author.Title+'</td>';
//             Result += '<td>'+ConvertDateTime(data[i].Created)+'</td>';
//             Result += '<td><a onclick="Removefile(\''+data[i].ID+'\');" data-toggle="tooltip" title="Remove department" type="button" class="btn btn btn-primary btn-md btn-remove-file"><i class="fa fa-remove" style="color:white;"></i></a></td>';
//             $('#File'+data[i].GroupID).empty();
//             $('#File'+data[i].GroupID).append(Result);
//         }
        
//     }

// }

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
function uploadFile(GroupID,InputID,IconLoading,IconComplete) {
    
    // build a string with random characters

    rndString = GenGUID();

    try{
        $('#'+IconLoading).show();
        $('#'+IconComplete).hide();
        $('#FileLoading').css('visibility','visible');
    //var FlagDup =  CheckFileExist();
    var FlagDup = false;
    if(FlagDup == true){
        alert('File is already exist. Please select other file or change filename.');
        $('#FileLoading').css('visibility','hidden');
        return false;
    }



    // Define the folder path for this example.
    var serverRelativeUrlToFolder = '/' + SiteCollection + '/' + SubSite + '/' + Attachment;

    // Get test values from the file input and text input page controls.
    var fileInput = jQuery('#'+InputID);
    //var newName = jQuery('#displayName').val();
    var newName = $('#'+InputID).val().split('\\').pop();
    var FileType = newName.split('.');
   

    // check file support from config .js
    if(FileSupport[0] != 'All'){
        
        FileType = FileType[1];
        FileType = FileType.toLowerCase();
        if(FileSupport.indexOf(FileType) == -1){
    
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'File type is inconrrect.',
                footer: '<a href>File type is support by this below <br> '+FileSupport+'</a>'
              });
    
    
            $('#'+IconLoading).hide();
            return ;
        }
    }
    /////////////////////////////////////////////////////

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
                    $('#'+IconLoading).hide();
                    $('#'+IconComplete).show();
                    //$('#FileLoading').css('visibility','visible');
                    //$('#MainModal').modal('hide');
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
                serverUrl, serverRelativeUrlToFolder, rndString);
            

    


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


       
		
		

        var body = String.format("{{'__metadata':{{'type':'{0}'}},'FileLeafRef':'{1}','Title':'{2}','FormID':'{3}','ActiveStatus':'{4}','GroupID':'{5}'}}",
        itemMetadata.type, rndString, newName,FormID,false,GroupID);




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
    catch(err){
        alert('Please select file...');
        $('#FileLoading').css('visibility','hidden');
        $('#'+IconLoading).hide();
        $('#'+IconComplete).hide();
    }
}

// Display error messages. 
function onError(error) {
    alert(error.responseText);
}

