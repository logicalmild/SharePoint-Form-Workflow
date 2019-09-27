# SharePoint-Form-Workflow
Form &amp; Workflow

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


##Config.js -> Structure
   - SiteInfo
   - Log
   - Attachment
   - Page
   - List (Display Name & Internal Name)
   - Data Connection
   - CurrentUser Object
   - Form Master

### Data Connection

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

### CurrentUser Object

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

### Form Master




``` javascript

  field1:{
    ID:'ID DOM HTML',
    Title:'Name or title of each field',
    TypeDom:'Type of element',
    TypeCol:'type of list column',
    Data:'set initial data to field',
    Col:'List Column Name'
  },

```



(TypeDom) (Type support)          
  - text               
  - date              
  - label              
  - textarea          
  - select            
  - people
  - radio
  - check
  - object
  - var
  - summernote

(TypeCol) (Type support)
  - singleline
  - multipleline
  - date
  - people
  - radio

Validate field data (Type support)
  - text 
  - date
  - people
  - select
  - radio
  - summernote

## Function 

### SPGuide.js
 Section1: Query Data
            GetCurrentPageName()[return string];
            GetParameterByName(name)[return string];
            Include(ElementID,Url);
            IncludeComponent(ElementID,Component);
            GetItemFromOtherSite(Site,Listname,Query)[data]
            GetItemByRestAPI(Listname,Query)[data]

 Section2: Date Time
            GetCurrentTime()[return time]
            ConvertDateTime(DateTime)[return date]
            ConvertDateOnly[return date]
            ConvertDate(DateTime)[return date]
            GetCurrentYear()[string]
            GetCurrentDate()[date]
            GetCurrentTime()[date]
            SetTime(time)[date]
            SetDateTime()[date]

 Section3: Operation String

 Section4:  Generate
            GenGUID()[return string];
            generateUID()[return string]

 Section5: User and permission
            AddCurrentUserToGroup(GroupID)[];
            addUsersToGroup(usernames, GroupID)[];
            CheckUserInGroupID(GroupID)[return bool];
            GetAllUserFromGroupID(GroupID)[return object people];
            removeUserFromGroup(userLoginName,GroupID,success,error)[];

 Section6: Validate data
            SetRequireField(FieldID,TypeDom)[];





### Input people picker html

    BrowsePeople(DOMInputID)<br/>
    browse people in organize via sharepoint put in button onclick.<br/>
    Return title="UserID" and value="UserTitle" to dom input<br/>


### Interface

1) AddLoading()<br/>
   open modal and show loading.<br/>

2) RoutingPage('Filename.html')<br/>
   Replace current page with new page not redirect<br/>

3) IncludeComponent(ElementID,Component)<br/>
   Include component into div component<br/>