# SharePoint-Form-Workflow
Form &amp; Workflow

## Structure
``` bash
└───web
    ├───asset
    │   └───icon
    ├───component
    │   ├───Approval
    │   ├───Attachment
    │   ├───Btn_CreateForm.html
    │   ├───Control_Icon
    │   ├───HistoryLog
    │   ├───ModalTemplate
    │   ├───NavBar
    │   └───Page
    ├───css
    │   └───images
    ├───form
    │   ├───FormTemplate
    │   └───S_Reservation
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
    └───report
        ├───css
        ├───datatable
        │   ├───Buttons-1.5.4
        │   │   ├───css
        │   │   ├───js
        │   │   └───swf
        │   ├───DataTables-1.10.18
        │   │   ├───css
        │   │   ├───images
        │   │   └───js
        │   ├───jQuery-3.3.1
        │   └───Responsive-2.2.2
        │       ├───css
        │       └───js
        ├───html_report
        ├───img
        └───js
```
## Start
Start project with insert file install InstallSiteStruct.aspx and run in browser under current site
1) Open page in url SiteUrl/Sitepages/web/Installer/Installer.aspx

## Settings
First Setting in ./js/config.js
1) SiteUrl (Root) or Current site in SharePoint
2) Display name & internal name of List , Library
3) FormMaster

Config.js -> FieldData

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

Config.js -> FormStep

``` javascript

FormStep:{
        Create:{
            FormStatus:'Create',
            FormView:'Create',
            StatusAction:{
                Create:'Create',
                SaveDraft:'Save Draft',
                Cancel:'Cancel',
            },
            Validate:{
                field1:{
                    Title:'Title of field',
                    ID:'Dom input ID',
                    Type:'text'
                },        
            },

        },
        Inprogress:{
            FormStatus:'Inprogress',
            FormView:'Inprogress',
            StatusAction:{
                Submit:'Submit',
            },
            Validate:{
                    field:{
                        Title:null,
                        ID:null,
                        Type:null
                    }
            },
        },
        Complete:{
            FormStatus:'Complete',
            FormView:'Complete',
            StatusAction:{
                
            },
            Validate:{
                    field:{
                        Title:null,
                        ID:null,
                        Type:null
                    }
            },
        }   
    }
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

## Function 

### Data

1) GetItemByRestAPI(Listname,Query);
    retrieve list data from current site (sync).
    Return json object data.

2) GetItemFromOtherSite(Site,Listname,Query);
    retrieve list data from another site (sync).
    Return  json object data.

3)  GetParameterByName(name);
    retrieve value of parameter from url.
    Return string.

4)  generateUID();
    Generate short GUID 4 digits.
    Return string.

5)  BrowsePeople(DOMInputID);
    browse people in organize via sharepoint put in button onclick.
    Return title="UserID" and value="UserTitle" to dom input

6)  DataConnection(ConnectionID);
    Get data by data connection be create in config.js
    Return json object data.

### Datetime

1)  SetDateTime();<br/>>
    generate current date only to sharepoint format mm/dd/yy<br/>>
    Return string<br/>>

2)  SetTime(time);
    Convert time to sharepoint date and time format mm/dd/yy; hour:min
    Return string

3)  GetCurrentTime();
    Get Current time format mm/dd/yy; hour:min
    Return string

4)  GetCurrentYear();
    Get current year
    Return string

5)  ConvertDate(DateTime);
    Convert date time from sharepoint format to mm/dd/yy; hour:min
    Return string

6)  ConvertDateTime(DateTime);
    Convert date time from sharepoint format to dd/mm/yy; hour:min
    Return string



### Interface

1) AddLoading();
   open modal and show loading.

2) RoutingPage('Filename.html');
   Replace current page with new page not redirect

3) IncludeComponent(ElementID,Component);
   Include component into div component