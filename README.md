# SharePoint-Form-Workflow
Form &amp; Workflow

## Lib Form
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
Start project with insert file install InstallSiteStruct.aspx and run in browser under current site
1) Open page in url SiteUrl/Sitepages/web/Installer/Installer.aspx


First Setting in /js/config.js
1) SiteUrl (Root) or Current site in SharePoint
2) All workflow internal name
3) Display name & internal name of List , Library
4) FormMaster

New form with FormTemplate.html
1) 
2) 
3) 


``` javascript
 var TempCurrentData = {
  field1:{
    ID:'ID DOM HTML',
    Title:'Name or title of each field',
    TypeDom:'Type of element',
    TypeCol:'type of list column',
    Data:'set initial data to field',
    Col:'List Column Name'
  },
}; 
```


  (TypeDom)           
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

  (TypeCol)
  - singleline
  - multipleline
  - date
  - people
  - radio

