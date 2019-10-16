# SharePoint-Form-Workflow

## Structure
``` bash
└───web
│   ├───asset
│   └───icon
├───component
│   ├───Approval
│   ├───Attachment
│   ├───Btn_CreateForm.html
│   ├───Control_Icon
│   ├───File
│   ├───HistoryLog
│   ├───HomeMenu
│   ├───Log
│   ├───ModalTemplate
│   ├───NavBar
│   ├───Page
│   ├───RightNavMenu
│   └───Table
├───css
│   └───images
├───form
│   └───FormTemplate
├───js
├───lib
│   ├───bootstrap
│   │   ├───css
│   │   └───js
│   └───summernote
│       └───dist
│           ├───font
│           ├───lang
│           └───plugin
│               ├───databasic
│               ├───hello
│               └───specialchars
├───report
│   ├───css
│   ├───datatable
│   │   ├───Buttons-1.5.4
│   │   │   ├───css
│   │   │   ├───js
│   │   │   └───swf
│   │   ├───DataTables-1.10.18
│   │   │   ├───css
│   │   │   ├───images
│   │   │   └───js
│   │   ├───jQuery-3.3.1
│   │   └───Responsive-2.2.2
│   │       ├───css
│   │       └───js
│   ├───html_report
│   ├───img
│   └───js
└───terminal
    ├───img
    │   └───icon
    └───js
```
## Start


### Config.js -> Structure
   - SiteInfo
   - Log
   - Attachment
   - Page
   - List (Display Name & Internal Name)
   - Data Connection
   - CurrentUser Object
   - Form Master

### Config.js -> Data Connection

    Data Connection is query connection use frequently in many times. 
    You can re-use data connection by call function this below.
    
``` javascript

    var data = DataConnection(ConnectionID);
```
    So, you can set connection in config.js like this. If you want to add connection.
    You just copy this object and change connectionID.

``` javascript
    Connection_Obj[0] = { // 0 is ConnectionID
        Title:'Name of Connection',
        SiteUrl : SiteUrl,
        ListName: 'ListInternalName',
        Query: '?$select=*&$top=1000'
    };

```

### Config.js -> CurrentUser Object

``` javascript

    var CurrentUser = {
            ID: null,
            Name: null,
            Email: null,
            Permission:null, // ("Admin","Visitor")
            GroupTitle:[],
            GroupID:[],
            LoginName:null
    };

```

    You can use value of this object anytime after form loaded.
    For example.

``` javascript
        alert(CurrentUser.Name); 
```

### Config.js -> Form Master



``` javascript
        FormMaster[0] = { // 0 is FormID
            FormID :'0',  // Set string same with number in array.
            FormName :'Form', // Name of Form. When you create sitepages you must was to set name bring that name set in this variable.
            FileName :'FormTemplate', // Name of form method. /form/FormTemplate/FormTemplate.html
            Listname :'', // List name store of this form data . if you change name of list please set lastest name change to this variable
            ListInternalName:'',// List name store of this form data .  Please use internal name (list name in link url.)
            RunningNO:{  
                Enable:false,
                FormatRunningNO:'No-', // Format of running-no
            },
            FieldData:{
                 field1:{
                    ID:'Subject', // Use ID of element in form html
                    Title:'Subject of form', // title for understand meaning of field
                    TypeDom:'text', // Type of input 
                    TypeCol:'singleline', // type of column
                    Data:'', // default data if any
                    Col:'Subject' // Column name . Recommend use column name same field ID for easy to set.
                },            
            },
            Workflow:{
                name:'WFpprovalContract', // Set workflow name
                version:'2013' // Set version of workflow
            },
            FormStep:{
                'Create':{// Step name of workflow step
                    FormStatus:'Create', // Step name and form status should be save
                    FormView:'Create',
                    StatusAction:{
                        Submit:'Submit',
                        
                    },
                    Nav:{
                        TopNav:{
                            CloseForm:true,
                            Refresh:true,
                            Attachfile:false,
                            SaveDraft:true,
                        },
                        RightNav:{
                            CloseForm:true,
                            Attachfile:false,
                            SaveDraft:true,
                            RemoveItem:false,
                            Refresh:true
                        },
                    },
                    Validate:{
                         field1:{
                             Title:'Subject',
                             ID:'Subject',
                             Type:'text'
                         },                     
                         field2:{
                             Title:'Select option material',
                             ID:'OptionMaterial',
                             Type:'select'
                         },                     
                    },

                },
                'Save Draft':{
                    FormStatus:'Save Draft',
                    FormView:'Save Draft',
                    StatusAction:{
                        Submit:'Submit',
                    },
                    Nav:{
                        TopNav:{
                            CloseForm:true,
                            Refresh:true,
                            Attachfile:false,
                            SaveDraft:true,
                        },
                        RightNav:{
                            CloseForm:true,
                            Attachfile:false,
                            SaveDraft:true,
                            RemoveItem:false,
                            Refresh:true
                        },
                    },
                    Validate:{         
                        Validate:{
                         field1:{
                             Title:'Subject',
                             ID:'Subject',
                             Type:'text'
                         },                     
                         field2:{
                             Title:'Select option material',
                             ID:'OptionMaterial',
                             Type:'select'
                         },                     
                    },    
                    },

                },
                'In progress':{
                    FormStatus:'In progress',
                    FormView:'In progress',
                    StatusAction:{
                        Approve:'Approve',
                        Reject:'Reject',
                        Cancel:'Cancel',
                    },
                    Nav:{
                        TopNav:{
                            CloseForm:true,
                            Refresh:true,
                            Attachfile:false,
                            SaveDraft:false,
                        },
                        RightNav:{
                            CloseForm:true,
                            Attachfile:false,
                            SaveDraft:false,
                            RemoveItem:false,
                            Refresh:true
                        },
                    },
                    Validate:{         
                    },

                },
                'Complete':{
                    FormStatus:'Complete',
                    FormView:'Complete',
                    StatusAction:{
                        
                    },
                    Nav:{
                        TopNav:{
                            CloseForm:true,
                            Refresh:true,
                            Attachfile:false,
                            SaveDraft:false,
                        },
                        RightNav:{
                            CloseForm:true,
                            Attachfile:false,
                            SaveDraft:false,
                            RemoveItem:false,
                            Refresh:true
                        },
                    },
                    Validate:{         
                    },

                },
        
            }
};
```



(TypeDom) (Type support)          
  - text               
  - date              
  - label              
  - textarea          
  - select            
  - people
  - people_multiple
  - radio
  - checkbox
  - object
  - var
  - summernote

(TypeCol) (Type support)
  - singleline
  - multipleline
  - date
  - people
  - people_multiple
  - radio
  - checkbox

Validate field data (Type support)
  - text 
  - date
  - people
  - select
  - radio
  - summernote

### Function SPGuide.js
 - Section1: Query Data<br/><br/>
            - GetCurrentPageName()[return string];<br/>
            - GetParameterByName(name)[return string];<br/>
            - Include(ElementID,Url);<br/>
            - IncludeComponent(ElementID,Component);<br/>
            - GetItemFromOtherSite(Site,Listname,Query)[data]<br/>
            - GetItemByRestAPI(Listname,Query)[data]<br/>

 - Section2: Date Time<br/><br/>
            - GetCurrentTime()[return time]<br/>
            - ConvertDateTime(DateTime)[return date]<br/>
            - ConvertDateOnly[return date]<br/>
            - ConvertDate(DateTime)[return date]<br/>
            - GetCurrentYear()[string]<br/>
            - GetCurrentDate()[date]<br/>
            - GetCurrentTime()[date]<br/>
            - SetTime(time)[date]<br/>
            - SetDateTime()[date]<br/>

 - Section3: Operation String<br/><br/>

 - Section4:  Generate<br/><br/>
            - GenGUID()[return string];<br/>
            - generateUID()[return string]<br/>

 - Section5: User and permission<br/><br/>
            - AddCurrentUserToGroup(GroupID)[];<br/>
            - addUsersToGroup(usernames, GroupID)[];<br/>
            - CheckUserInGroupID(GroupID)[return bool];<br/>
            - GetAllUserFromGroupID(GroupID)[return object people];<br/>
            - removeUserFromGroup(userLoginName,GroupID,success,error)[];<br/>

 - Section6: Validate data<br/><br/>
            - SetRequireField(FieldID,TypeDom)[];<br/>





### Input people picker html

    BrowsePeople(DOMInputID)<br/>
    browse people in organize via sharepoint put in button onclick.<br/>
    Return title="UserID" and value="UserTitle" to dom input<br/>


``` html

    <input id="Manager" onclick="BrowsePeople('#Manager');" type="text" autocomplete="off" readonly="">

``` 



### Input people picker multiple selection in page

    HTML Page

    ``` html

    <div class="col-md-12" style="background-color:lightgray; min-height:100px;">
        <ul id="CC_Email" class="form-inline tag-person"></ul>
        <button onclick="SetPeople.modal('field45');" style="position:absolute; right:15px; bottom:15px;" type="button" class="btn btn btn-primary btn-sm">Browse</button>
    </div>

    ``` 

    Config.js

    ``` javascript
    
    'field45':{
            ID:'CC_Email',
            Title:'CC Email',
            TypeDom:'people_multiple',
            TypeCol:'people_multiple',
            Data:{},
            Col:'CC_Email'
        },  


    ``` 

    Properties

    ``` javascript

        var FieldIndex = 'field45';

        SetPeople.modal(FieldIndex); // Show modal display

        SetPeople.add(FieldIndex); // add people to TempData

        SetPeople.del(FieldIndex); // del people from TempData
 
        SetPeople.show(FieldIndex); // show people of TempData

        SetPeople.data(FieldIndex); // Return data for insert people field (multiple)

      

    ``` 