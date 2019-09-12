(function StartEngine(){
 
    var AppRegister;
    var CurrentPage = GetCurrentPageName();
    try{
        AppRegister = AppPath;
    }catch(err){
        alert('Get AppPath error.');
    }
    
    if(AppRegister){
        for(index in AppRegister){
            var type = AppRegister[index];
            if(index == CurrentPage){
                for(j in type){
                    switch(j){
                        case 'style':
                                        var stylesheet = type[j];
                                        for(k in stylesheet){
                                            var app = stylesheet[k];
                                            var head = document.head;
                                            var link = document.createElement("link");
                                            link.type = "text/css";
                                            link.rel = "stylesheet";
                                            link.href = app;
    
                                            head.appendChild(link);
                                        }                                      
                                        break;
                        case 'script':
                                        var Link = type[j];
                                        for(k in Link){
                                              var app = Link[k];
                                              var newScript = document.createElement('script');
                                              newScript.type = 'text/javascript';
                                              newScript.src = app;
                                              document.getElementsByTagName('head')[0].appendChild(newScript);
                                        }     
                                        break;
                    }
                }  
            }          
        }
    }

})();




function GetCurrentPageName(){
    var CurrentPageUrl = window.location.pathname;
    var arr_CurrentPageUrl = CurrentPageUrl.split('/');	
    var last_arr = arr_CurrentPageUrl[arr_CurrentPageUrl.length-1];
    var CurrentPage = last_arr.split('.');
    var str_CurrentPage = CurrentPage[0];
    
    return str_CurrentPage;

}