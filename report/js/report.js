

   $(document).ready(function() {

        SetInitialReport();

       var query ='';
       var data = GetItemByRestAPI('RequestFix',query);


       
       
   } );

  



   function SetInitialReport(){
    
            SetNavbar();
            GetContentSearch();
            $('#loading').hide();
   }

   function GetContentSearch(){
        var pagename = GetParameterByName('name');
        if(pagename.length <= 1){
            pagename = 'AllReport';
        }
        var response;
        $.ajax({ type: "GET",   
            url: SiteUrl + '/SitePages/web/report/html_report/'+pagename+'.html',   
            async: false,
            success : function(text)
            {
                response= text;
            }
        });

        $('#Content').append(response);
   }
   function SetNavbar()
   {
       var NavbarID = 'Navbar';
       var str='';
       str+='<ul class="ul_report">';
       str+='<li class="li_report"><a href="'+navbar.title.link+'">'+navbar.title.name+'</a></li>';
        for(i=0;i<report.length;i++){
               str+='<li class="li_report"><a href="'+report[i].link+'">'+report[i].title+'</a></li>';
        }
       str+='</ul>';
       $('#'+NavbarID).empty();
       $('#'+NavbarID).append(str);
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

   function RenderReport(data,column){
        debugger;
        var str='';
        str+='<div style="width:90%; margin-left:auto; margin-right:auto;">';
        str+='<table id="datatable" class="display responsive no-wrap" width="100%">';
        str+='<thead>';
        str+='<tr>';
        
                for(i=0;i<column.length;i++){
                    str+='<th>'+column_title[i]+'</th>';
                }
        str+='</tr>';
        str+='</thead>';
        str+='<tbody>';
        for(i=0;i<data.length;i++){
            str+='<tr>';
            for(j=0;j<column.length;j++){
                var temp_column = column[j];
                if(temp_column != ''){
                    str+='<td>'+data[i][temp_column]+'</td>';
                }
                else{
                    str+='<td>No data</td>';
                }
                
            }
            str+='</tr>';

        }
        str+='</tbody>';
        str+='<tfoot>';
        for(i=0;i<column.length;i++){
            str+='<th>'+column_title[i]+'</th>';
        }
        str+='</tfoot>';
        str+='</table>';
        str+='</div>';
        $('#Result').empty();
        $('#Result').append(str);

        $('#datatable').DataTable( {
            responsive: true,
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        } );
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
    today = mm + '/' + dd + '/' + yyyy;    

    return today;
}
function GetParameterByName(name) { 
    
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}