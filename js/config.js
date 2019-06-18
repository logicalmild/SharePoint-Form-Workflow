var SiteUrl = '';
var IncorrectMark = '<img style="width:20px; height:20px;" src="'+SiteUrl+'/SiteAssets/web/asset/icon/incorrect.png">';
var CorrectMark = '<img style="width:20px; height:20px;" src="'+SiteUrl+'/SiteAssets/web/asset/icon/correct.png">';
var SiteCollection = '';
var SubSite = '';
var GroupAdminID = ''; // group admin


/* 
Workflow
Workflow internal name default first 8 characters and add '0' in digit 9 
Status of workflow detail following this below
0 - Starting
1 - Failed on Start
2 - In progress
3 - Error Occurred
4 - Cancelled
5 - Completed
6 - Failed on start (Retrying)
7 - Error Occurred (Retrying)
*/
var WorkflowInternalName = '';


//Attachment
var Attachment = 'Attachment';

// Page
var SummaryRequest = SiteUrl + '';

// List name (DisplayName Name)
var Disp_HistoryLog = 'HistoryLog';


//List name (Internal Name)
var Inter_HistoryLog = 'HistoryLog';


// Data Connection 
var Connection_Obj = [];
        Connection_Obj[0] = {
            Title:'',
            SiteUrl : '',
            ListName: '',
            Query: ''
        };



// CurrentUser object variable
var CurrentUser = {
    ID: null,
    Name: null,
    Email: null,
    Permission:null,
    GroupTitle:null,
    GroupID:null,
};



//Form Master///////////////////////////////////////////////////////////////////////////////////
// Group Involve

var FormMaster = {};

FormMaster[0] = {
    FormID :'1',
    FormName :'',
    FileName :'',
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
        WaitForApprove:{
            FormStatus:'Wait for approve',
            FormView:'Wait for Approve',
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
};




