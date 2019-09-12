var SiteUrl = 'https://scgchemicals.scg.com/lotusnotes/TPCQA';
var IncorrectMark = '<img style="width:20px; height:20px;" src="'+SiteUrl+'/SiteAssets/web/asset/icon/incorrect.png">';
var CorrectMark = '<img style="width:20px; height:20px;" src="'+SiteUrl+'/SiteAssets/web/asset/icon/correct.png">';
var SiteCollection = 'lotusnotes';
var SubSite = 'TPCQA';
var GroupAdminID = 2511; // group admin
var GroupQAManagerID = 2550;
var GroupMember = 2595; 
var GroupQASupervisorID = 2604;
var GroupChemist = 2605;




//Script///////////////////////////////////////////////////////////////////
var Script_Jquery = SiteUrl + '/SitePages/web/js/jquery.min.js';
var Script_SPRuntime = '/_layouts/15/sp.runtime.js';
var Script_SP = '/_layouts/15/sp.js';
var Script_SPGuide = SiteUrl + '/SitePages/web/js/SPGuide.js';
var Script_Log = SiteUrl + '/SitePages/web/js/Log.js';
//Style///////////////////////////////////////////////////////////////////
var Lib_Fontawesome = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';


var AppPath = {
    'Homepage':{
        'style':{
            1:Lib_Fontawesome
        },
        'script':{
            1:Script_Jquery,
            2:Script_SPRuntime,
            3:Script_SP,
            4:Script_SPGuide,
            5:Script_Log
        }
    },
};

/*///Workflow///////////////////////////////////////////////////////////////////
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

//Log
var Log_Access = 'Log_Access';


//Attachment
var Attachment = 'Attachment';
var FileSupport = ['jpg','png','pdf','jpeg','gif','bmp','jpe','jfif','tiff','tif'];
//var FileSupport = ['All'];

/////////////////////////////

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
    Query: '?$select=*&$top=5000'
};

       

// CurrentUser object variable
var CurrentUser = {
    ID: null,
    Name: null,
    Email: null,
    Permission:null,
    GroupTitle:[],
    GroupID:[],
    LoginName:null
};



//Form Master///////////////////////////////////////////////////////////////////////////////////
// Group Involve

var FormMaster = {};

FormMaster[0] = {
    FormID :'1',
    FormName :'Form',
    FileName :'ProblemReport',
    Listname :'Problem Report',
    ListInternalName:'ProblemReport',
    FormatRunningNO:'QA-PB-',
    Nav:{
        TopNav:{
            CloseForm:true,
            Refresh:true,
            Attachfile:false,
        },
        RightNav:{
            CloseForm:true,
            Attachfile:false,
            SaveDraft:false,
            RemoveItem:false,
            Refresh:true
        },
    },
    FieldData:{
        field1:{
            ID:'Subject',
            Title:'ชื่อเรื่อง',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Subject'
        },    
    },
    Workflow:{
        name:'Problem_x0020_Report_x0020_Workf',
        version:'2013'
    },
    FormStep:{
        Create:{
            FormStatus:'Create',
            FormView:'Create',
            StatusAction:{
                Submit:'Submit',
            },
            Validate:{
                field1:{
                    Title:'',
                    ID:'',
                    Type:''
                },           
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
