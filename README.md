# SharePoint-Form-Workflow
Form &amp; Workflow

## Lib Form
``` bash
───web
    │   form.html
    │   README.md
    │
    ├───bootstrap
    │   ├───css
    │   │       bootstrap.min.css
    │   │
    │   └───js
    │           bootstrap.min.js
    │
    ├───css
    │   │   ChangeStyleTable.css
    │   │   ColorPromoteLink.css
    │   │   font-awesome.min.css
    │   │   form.css
    │   │   hidden_left_menu.css
    │   │   ihover.css
    │   │   jquery-ui.css
    │   │   padding.css
    │   │
    │   └───images
    │           ui-icons_444444_256x240.png
    │
    ├───form
    │       FormTemplate.html
    │       S_Reservation.html
    │
    ├───html
    │   │   Approval.html
    │   │   Attachment.html
    │   │   Btn_CreateForm.html
    │   │   Control_Icon.html
    │   │   HistoryLog.html
    │   │   ModalTemplate.html
    │   │   NavBar.html
    │   │   PageContainAnError.html
    │   │   PageFailedOnStart.html
    │   │   PageItemNotFound.html
    │   │   PageNotFound.html
    │   │   PageWorkflowCancelled.html
    │   │   PageWorkflowErrorOccurred.html
    │   │   PageWorkflowErrorOccurredRetry.html
    │   │   PageWorkflowFailedOnStartRetry.html
    │   │   PageWorkflowInprogress.html
    │   │
    │   └───component
    │           Btn_AddDeptTarget.html
    │           Btn_GetDeptInfo.html
    │           Btn_GetMaterialGroup.html
    │           Btn_GetReviewerMaterial.html
    │           Btn_GetValuationClass.html
    │
    ├───img
    │   └───icon
    │           correct.png
    │           incorrect.png
    │           store_icon.png
    │
    ├───js
    │       attachment.js
    │       config.js
    │       form.js
    │       guide.js
    │       jquery-ui.js
    │       jquery.min.js
    │       MicrosoftAjax.js
    │       PeoplePickerData.js
    │       peoplepicker_jquery.js
    │       peoplepicker_sharepointplus.js
    │       popper.min.js
    │
    ├───report
    │   │   Report.aspx
    │   │   Report_Hardware.aspx
    │   │   Report_Serial.aspx
    │   │
    │   ├───css
    │   │       report.css
    │   │
    │   ├───datatable
    │   │   │   datatables.css
    │   │   │   datatables.js
    │   │   │   datatables.min.css
    │   │   │   datatables.min.js
    │   │   │
    │   │   ├───Buttons-1.5.4
    │   │   │   ├───css
    │   │   │   │       buttons.bootstrap.css
    │   │   │   │       buttons.bootstrap.min.css
    │   │   │   │       buttons.bootstrap4.css
    │   │   │   │       buttons.bootstrap4.min.css
    │   │   │   │       buttons.dataTables.css
    │   │   │   │       buttons.dataTables.min.css
    │   │   │   │       buttons.foundation.css
    │   │   │   │       buttons.foundation.min.css
    │   │   │   │       buttons.jqueryui.css
    │   │   │   │       buttons.jqueryui.min.css
    │   │   │   │       buttons.semanticui.css
    │   │   │   │       buttons.semanticui.min.css
    │   │   │   │       common.scss
    │   │   │   │       mixins.scss
    │   │   │   │
    │   │   │   ├───js
    │   │   │   │       buttons.bootstrap.js
    │   │   │   │       buttons.bootstrap.min.js
    │   │   │   │       buttons.bootstrap4.js
    │   │   │   │       buttons.bootstrap4.min.js
    │   │   │   │       buttons.colVis.js
    │   │   │   │       buttons.colVis.min.js
    │   │   │   │       buttons.flash.js
    │   │   │   │       buttons.flash.min.js
    │   │   │   │       buttons.foundation.js
    │   │   │   │       buttons.foundation.min.js
    │   │   │   │       buttons.html5.js
    │   │   │   │       buttons.html5.min.js
    │   │   │   │       buttons.jqueryui.js
    │   │   │   │       buttons.jqueryui.min.js
    │   │   │   │       buttons.print.js
    │   │   │   │       buttons.print.min.js
    │   │   │   │       buttons.semanticui.js
    │   │   │   │       buttons.semanticui.min.js
    │   │   │   │       dataTables.buttons.js
    │   │   │   │       dataTables.buttons.min.js
    │   │   │   │
    │   │   │   └───swf
    │   │   │           flashExport.swf
    │   │   │
    │   │   ├───DataTables-1.10.18
    │   │   │   ├───css
    │   │   │   │       dataTables.bootstrap.css
    │   │   │   │       dataTables.bootstrap.min.css
    │   │   │   │       dataTables.bootstrap4.css
    │   │   │   │       dataTables.bootstrap4.min.css
    │   │   │   │       dataTables.foundation.css
    │   │   │   │       dataTables.foundation.min.css
    │   │   │   │       dataTables.jqueryui.css
    │   │   │   │       dataTables.jqueryui.min.css
    │   │   │   │       dataTables.semanticui.css
    │   │   │   │       dataTables.semanticui.min.css
    │   │   │   │       jquery.dataTables.css
    │   │   │   │       jquery.dataTables.min.css
    │   │   │   │
    │   │   │   ├───images
    │   │   │   │       sort_asc.png
    │   │   │   │       sort_asc_disabled.png
    │   │   │   │       sort_both.png
    │   │   │   │       sort_desc.png
    │   │   │   │       sort_desc_disabled.png
    │   │   │   │
    │   │   │   └───js
    │   │   │           dataTables.bootstrap.js
    │   │   │           dataTables.bootstrap.min.js
    │   │   │           dataTables.bootstrap4.js
    │   │   │           dataTables.bootstrap4.min.js
    │   │   │           dataTables.foundation.js
    │   │   │           dataTables.foundation.min.js
    │   │   │           dataTables.jqueryui.js
    │   │   │           dataTables.jqueryui.min.js
    │   │   │           dataTables.semanticui.js
    │   │   │           dataTables.semanticui.min.js
    │   │   │           jquery.dataTables.js
    │   │   │           jquery.dataTables.min.js
    │   │   │
    │   │   ├───jQuery-3.3.1
    │   │   │       jquery-3.3.1.js
    │   │   │       jquery-3.3.1.min.js
    │   │   │
    │   │   └───Responsive-2.2.2
    │   │       ├───css
    │   │       │       responsive.bootstrap.css
    │   │       │       responsive.bootstrap.min.css
    │   │       │       responsive.bootstrap4.css
    │   │       │       responsive.bootstrap4.min.css
    │   │       │       responsive.dataTables.css
    │   │       │       responsive.dataTables.min.css
    │   │       │       responsive.foundation.css
    │   │       │       responsive.foundation.min.css
    │   │       │       responsive.jqueryui.css
    │   │       │       responsive.jqueryui.min.css
    │   │       │       responsive.semanticui.css
    │   │       │       responsive.semanticui.min.css
    │   │       │
    │   │       └───js
    │   │               dataTables.responsive.js
    │   │               dataTables.responsive.min.js
    │   │               responsive.bootstrap.js
    │   │               responsive.bootstrap.min.js
    │   │               responsive.bootstrap4.js
    │   │               responsive.bootstrap4.min.js
    │   │               responsive.foundation.js
    │   │               responsive.foundation.min.js
    │   │               responsive.jqueryui.js
    │   │               responsive.jqueryui.min.js
    │   │               responsive.semanticui.js
    │   │               responsive.semanticui.min.js
    │   │
    │   ├───html_report
    │   │       AllReport.html
    │   │       Hardware.html
    │   │       Serial_NO.html
    │   │
    │   ├───img
    │   │       report.jpg
    │   │
    │   └───js
    │           config.js
    │           report.js
    │
    └───summernote
        └───dist
            │   summernote-bs4.css
            │   summernote-bs4.js
            │   summernote-bs4.min.js
            │   summernote-lite.css
            │   summernote-lite.js
            │   summernote-lite.min.js
            │   summernote.css
            │   summernote.js
            │   summernote.min.js
            │
            ├───font
            │       summernote.eot
            │       summernote.ttf
            │       summernote.woff
            │
            ├───lang
            │       summernote-ar-AR.js
            │       summernote-bg-BG.js
            │       summernote-ca-ES.js
            │       summernote-cs-CZ.js
            │       summernote-da-DK.js
            │       summernote-de-DE.js
            │       summernote-el-GR.js
            │       summernote-es-ES.js
            │       summernote-es-EU.js
            │       summernote-fa-IR.js
            │       summernote-fi-FI.js
            │       summernote-fr-FR.js
            │       summernote-gl-ES.js
            │       summernote-he-IL.js
            │       summernote-hr-HR.js
            │       summernote-hu-HU.js
            │       summernote-id-ID.js
            │       summernote-it-IT.js
            │       summernote-ja-JP.js
            │       summernote-ko-KR.js
            │       summernote-lt-LT.js
            │       summernote-lt-LV.js
            │       summernote-mn-MN.js
            │       summernote-nb-NO.js
            │       summernote-nl-NL.js
            │       summernote-pl-PL.js
            │       summernote-pt-BR.js
            │       summernote-pt-PT.js
            │       summernote-ro-RO.js
            │       summernote-ru-RU.js
            │       summernote-sk-SK.js
            │       summernote-sl-SI.js
            │       summernote-sr-RS-Latin.js
            │       summernote-sr-RS.js
            │       summernote-sv-SE.js
            │       summernote-ta-IN.js
            │       summernote-th-TH.js
            │       summernote-tr-TR.js
            │       summernote-uk-UA.js
            │       summernote-uz-UZ.js
            │       summernote-vi-VN.js
            │       summernote-zh-CN.js
            │       summernote-zh-TW.js
            │
            └───plugin
                ├───databasic
                │       summernote-ext-databasic.css
                │       summernote-ext-databasic.js
                │
                ├───hello
                │       summernote-ext-hello.js
                │
                └───specialchars
                        summernote-ext-specialchars.js
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
  - var

  (TypeCol)
  - singleline
  - multipleline
  - date
  - people
  - radio

