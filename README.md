# SharePoint-Form-Workflow
Form &amp; Workflow

Lib Form
``` bash
web
 ├── /Lib
 │    ├── /summernote
 │    └── /bootstrap
 ├── /css
 │    ├── ChangeStyleTable.css
 │    ├── ColorPromoteLink.css
 │    ├── font-awesome.min.css
 │    ├── form.css
 │    ├── hidden_left_menu.css
 │    └── jquery-ui.css     
 ├── /form
 │    ├── FormTemplate.html
 │    └── New your forms 
 ├── /component
 │    ├── Approval.html
 │    ├── Attachment.html
 │    ├── Btn_CreateForm.html
 │    ├── Control_Icon.html
 │    ├── HistoryLog.html
 │    ├── ModalTemplate.html
 │    ├── NavBar.html
 │    ├── PageFailedOnStart.html
 │    ├── PageNotFound.html
 │    ├── PageWorkflowCancelled.html
 │    ├── PageWorkflowErrorOccurred.html
 │    ├── PageWorkflowErrorOccurredRetry.html
 │    ├── PageWorkflowFailedOnStartRetry.html
 │    └──PageWorkflowInprogress.html
 ├── /img
 ├── /js
 │     ├── attachment.js
 │     ├── config.js
 │     ├── form.js
 │     ├── guide.js
 │     ├── jquery-ui.js
 │     ├── jquery.min.js
 │     ├── MicrosoftAjax.js
 │     ├── peoplepicker_jquery.js
 │     ├── peoplepicker_sharepointplus.js
 │     ├── PeoplePickerData.js
 │     └── popper.min.js
 │     
 ├── /report
 │     ├── /css
 │     │     └── report.css
 │     ├── /datatable
 │     ├── /html_report
 │     │     ├── AllReport.html
 │     │     └── Add your new report
 │     ├── /img
 │     ├── /js
 │     │     ├── config.js
 │     │     └── report.js
 │     └── Report.aspx
 └── form.html
```
Start project with insert file install InstallSiteStruct.html and run in browser under current site
1) New page in Site Page
2) Copy path url file InstallSiteStruct.html to your page
3) save edit and refresh page

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

  (TypeCol)
  - singleline
  - multipleline
  - date
  - people
  - radio

