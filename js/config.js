


// SiteInfo ////////////////////////////////////////////////////////////////////////
var SiteUrl = 'https://scgchemicals.scg.com/lotusnotes/TPE_LAS';
var IncorrectMark = '<img style="width:20px; height:20px;" src="'+SiteUrl+'/SiteAssets/web/asset/icon/incorrect.png">';
var CorrectMark = '<img style="width:20px; height:20px;" src="'+SiteUrl+'/SiteAssets/web/asset/icon/correct.png">';
var SiteCollection = 'lotusnotes';
var SubSite = 'TPE_LAS';
var GroupAdminID = 2649; // group admin
var GroupMember = 2650; 
////////////////////////////////////////////////////////////////////////////////////






// Log /////////////////////////////////////////////////////////////////////////////
var Log_Access = 'Log_Access'; // Name of list
var Disp_HistoryLog = 'HistoryLog'; // Display Name
var Inter_HistoryLog = 'HistoryLog'; // Internal Name
////////////////////////////////////////////////////////////////////////////////////






// Attachment //////////////////////////////////////////////////////////////////////
var Attachment = 'Attachment'; // Name of list
//var FileSupport = ['jpg','png','pdf','jpeg','gif','bmp','jpe','jfif','tiff','tif'];
var FileSupport = ['All'];
//End Attachment////////////////////////////////////////////////////////////////////






// Page ///////////////////////////////////////////////////////////////////////
var SummaryRequest = SiteUrl + '';
///////////////////////////////////////////////////////////////////////////////







// List name (DisplayName Name) ////////////////////////////////////////////////


//List name (Internal Name)

////////////////////////////////////////////////////////////////////////////////








// Data Connection /////////////////////////////////////////////////////////////
var Connection_Obj = [];
    Connection_Obj[0] = {
        Title:'Get area form master_Area',
        SiteUrl : SiteUrl,
        ListName: 'Master_Area',
        Query: '?$select=Area&$top=1000&$orderby=Area asc'
    };
////////////////////////////////////////////////////////////////////////////////
   




// CurrentUser object variable /////////////////////////////////////////////////
var CurrentUser = {
    ID: null,
    Name: null,
    Email: null,
    Permission:null,
    GroupTitle:[],
    GroupID:[],
    LoginName:null
};
////////////////////////////////////////////////////////////////////////////////


//Form Master////////////////////////////////////////////////////////////////////
var FormMaster = {};

FormMaster[0] = {
    FormID :'0',
    FormName :'Form',
    FileName :'',
    Listname :'',
    ListInternalName:'',
    RunningNO:{
        Enable:false,
        FormatRunningNO:'-',
    },
    FieldData:{
        // field1:{
        //     ID:'',
        //     Title:'',
        //     TypeDom:'',
        //     TypeCol:'',
        //     Data:'',
        //     Col:''
        // },              
    },
    Workflow:{
        name:'',
        version:'2013'
    },
    FormStep:{
        'Create':{
            FormStatus:'Create',
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
                // field1:{
                //     Title:'',
                //     ID:'',
                //     Type:''
                // },                     
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
                // field1:{
                //     Title:'',
                //     ID:'',
                //     Type:''
                // },           
                          
            },

        },
        'Close':{
            FormStatus:'Close',
            FormView:'Close',
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



