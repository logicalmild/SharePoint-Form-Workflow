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

### Data

1) GetItemByRestAPI(Listname,Query)<br/>
    retrieve list data from current site (sync).<br/>
    Return json object data.<br/>

2) GetItemFromOtherSite(Site,Listname,Query)<br/>
    retrieve list data from another site (sync).<br/>
    Return  json object data.<br/>

3)  GetParameterByName(name)<br/>
    retrieve value of parameter from url.<br/>
    Return string.<br/>

4)  generateUID()<br/>
    Generate short GUID 4 digits.<br/>
    Return string.<br/>

5)  BrowsePeople(DOMInputID)<br/>
    browse people in organize via sharepoint put in button onclick.<br/>
    Return title="UserID" and value="UserTitle" to dom input<br/>

6)  DataConnection(ConnectionID)<br/>
    Get data by data connection be create in config.js<br/>
    Return json object data.<br/>

### Datetime

1)  SetDateTime()<br/>
    generate current date only to sharepoint format mm/dd/yy<br/>
    Return string<br/>

2)  SetTime(time)<br/>
    Convert time to sharepoint date and time format mm/dd/yy; hour:min<br/>
    Return string<br/>

3)  GetCurrentTime()<br/>
    Get Current time format mm/dd/yy; hour:min<br/>
    Return string<br/>

4)  GetCurrentYear()<br/>
    Get current year<br/>
    Return string<br/>

5)  ConvertDate(DateTime)<br/>
    Convert date time from sharepoint format to mm/dd/yy; hour:min<br/>
    Return string<br/>

6)  ConvertDateTime(DateTime)<br/>
    Convert date time from sharepoint format to dd/mm/yy; hour:min<br/>
    Return string<br/>



### Interface

1) AddLoading()<br/>
   open modal and show loading.<br/>

2) RoutingPage('Filename.html')<br/>
   Replace current page with new page not redirect<br/>

3) IncludeComponent(ElementID,Component)<br/>
   Include component into div component<br/>