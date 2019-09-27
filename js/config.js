var SiteUrl = 'https://scgchemicals.scg.com/lotusnotes/TPE_LAS';
var IncorrectMark = '<img style="width:20px; height:20px;" src="'+SiteUrl+'/SiteAssets/web/asset/icon/incorrect.png">';
var CorrectMark = '<img style="width:20px; height:20px;" src="'+SiteUrl+'/SiteAssets/web/asset/icon/correct.png">';
var SiteCollection = 'lotusnotes';
var SubSite = 'TPE_LAS';
var GroupAdminID = 2649; // group admin
var GroupMember = 2650; 


//Log
var Log_Access = 'Log_Access';


//Attachment
var Attachment = 'Attachment';
//var FileSupport = ['jpg','png','pdf','jpeg','gif','bmp','jpe','jfif','tiff','tif'];
var FileSupport = ['All'];

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
    Title:'Get area form master_Area',
    SiteUrl : SiteUrl,
    ListName: 'Master_Area',
    Query: '?$select=Area&$top=1000&$orderby=Area asc'
};

Connection_Obj[1] = {
    Title:'Get site form master_Site',
    SiteUrl : SiteUrl,
    ListName: 'Master_Site',
    Query: '?$select=Site&$top=1000&$orderby=Site asc'
};

Connection_Obj[2] = {
    Title:'Get RootCause form Master_RootCause',
    SiteUrl : SiteUrl,
    ListName: 'Master_RootCause',
    Query: '?$select=RootCause&$top=1000&$orderby=RootCause asc'
};

Connection_Obj[3] = {
    Title:'Get Section Manager from list Master_Area',
    SiteUrl : SiteUrl,
    ListName: 'Master_Area',
    Query: '?$select=SectionManager/Title,SectionManager/Id&$expand=SectionManager&$top=1000&$orderby=SectionManager/Title asc'
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
var FormMaster = {};

FormMaster[0] = {
    FormID :'0',
    FormName :'Form',
    FileName :'Abnormality',
    Listname :'Abnormality',
    ListInternalName:'Abnormality',
    RunningNO:{
        Enable:false,
        FormatRunningNO:'-',
    },
    FieldData:{
        field1:{
            ID:'ProblemTitle',
            Title:'Program Title',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'ProblemTitle'
        },    
        field2:{
            ID:'Type',
            Title:'Type',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'TypeProblem'
        },      
        field3:{
            ID:'Area',
            Title:'Area',
            TypeDom:'select',
            TypeCol:'singleline',
            Data:'',
            Col:'Area'
        },    
        field4:{
            ID:'Reporter',
            Title:'ผู้รายงาน',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Reporter'
        },    
        field5:{
            ID:'Company',
            Title:'บริษัท',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Company'
        },    
        field6:{
            ID:'Department',
            Title:'หน่วยงาน',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Department'
        },    
        field7:{
            ID:'Site',
            Title:'Site',
            TypeDom:'select',
            TypeCol:'singleline',
            Data:'',
            Col:'Site'
        },    
        field8:{
            ID:'ProblemCategory',
            Title:'Problem Category',
            TypeDom:'radio',
            TypeCol:'singleline',
            Data:'',
            Col:'ProblemCategory'
        },       
        field9:{
            ID:'summernote1',
            Title:'ปัญหาและอาการของความเสียหายที่เกิดขึ้น',
            TypeDom:'summernote',
            TypeCol:'multipleline',
            Data:'',
            Col:'ProblemDamage'
        },    
        field10:{
            ID:'summernote2',
            Title:'การดำเนินการเฉพาะหน้า',
            TypeDom:'summernote',
            TypeCol:'multipleline',
            Data:'',
            Col:'Solution'
        },       
        field11:{
            ID:'Responsible',
            Title:'Response by',
            TypeDom:'people',
            TypeCol:'people',
            Data:'',
            Col:'Responsible'
        },    
        field12:{
            ID:'Foreman',
            Title:'Foreman',
            TypeDom:'people',
            TypeCol:'people',
            Data:'',
            Col:'Foreman'
        },    
        field13:{
            ID:'summernote3',
            Title:'Remark',
            TypeDom:'summernote',
            TypeCol:'multipleline',
            Data:'',
            Col:'Remark'
        },    
        field14:{
            ID:'summernote4',
            Title:'Root Cause',
            TypeDom:'summernote',
            TypeCol:'multipleline',
            Data:'',
            Col:'RootCause'
        },    
        field15:{
            ID:'Factor1',
            Title:'Factor1',
            TypeDom:'select',
            TypeCol:'singleline',
            Data:'',
            Col:'Factor1'
        },    
        field16:{
            ID:'Desc1',
            Title:'Desc1',
            TypeDom:'textarea',
            TypeCol:'multipleline',
            Data:'',
            Col:'Desc1'
        },    
        field17:{
            ID:'Factor2',
            Title:'Factor2',
            TypeDom:'select',
            TypeCol:'singleline',
            Data:'',
            Col:'Factor2'
        },    
        field18:{
            ID:'Desc2',
            Title:'Desc2',
            TypeDom:'textarea',
            TypeCol:'multipleline',
            Data:'',
            Col:'Desc2'
        },    
        field19:{
            ID:'Factor3',
            Title:'Factor3',
            TypeDom:'select',
            TypeCol:'singleline',
            Data:'',
            Col:'Factor3'
        },    
        field20:{
            ID:'Desc3',
            Title:'Desc3',
            TypeDom:'textarea',
            TypeCol:'multipleline',
            Data:'',
            Col:'Desc3'
        },  
        field21:{
            ID:'Factor4',
            Title:'Factor4',
            TypeDom:'select',
            TypeCol:'singleline',
            Data:'',
            Col:'Factor4'
        },    
        field22:{
            ID:'Desc4',
            Title:'Desc4',
            TypeDom:'textarea',
            TypeCol:'multipleline',
            Data:'',
            Col:'Desc4'
        },    
        field23:{
            ID:'DueDate1',
            Title:'',
            TypeDom:'date',
            TypeCol:'date',
            Data:'',
            Col:'DueDate1'
        },    
        field24:{
            ID:'PreFactor1',
            Title:'PreFactor1',
            TypeDom:'select',
            TypeCol:'singleline',
            Data:'',
            Col:'PreFactor1'
        },    
        field25:{
            ID:'PreDesc1',
            Title:'PreDesc1',
            TypeDom:'textarea',
            TypeCol:'multipleline',
            Data:'',
            Col:'PreDesc1'
        },  
        field26:{
            ID:'PreFactor2',
            Title:'PreFactor2',
            TypeDom:'select',
            TypeCol:'singleline',
            Data:'',
            Col:'PreFactor2'
        },    
        field27:{
            ID:'PreDesc2',
            Title:'PreDesc2',
            TypeDom:'textarea',
            TypeCol:'multipleline',
            Data:'',
            Col:'PreDesc2'
        },  
        field28:{
            ID:'PreFactor3',
            Title:'PreFactor3',
            TypeDom:'select',
            TypeCol:'singleline',
            Data:'',
            Col:'PreFactor3'
        },    
        field29:{
            ID:'PreDesc3',
            Title:'PreDesc3',
            TypeDom:'textarea',
            TypeCol:'multipleline',
            Data:'',
            Col:'PreDesc3'
        },  
        field30:{
            ID:'PreFactor4',
            Title:'PreFactor4',
            TypeDom:'select',
            TypeCol:'singleline',
            Data:'',
            Col:'PreFactor4'
        },    
        field31:{
            ID:'PreDesc4',
            Title:'PreDesc4',
            TypeDom:'textarea',
            TypeCol:'multipleline',
            Data:'',
            Col:'PreDesc4'
        },  
        field32:{
            ID:'DueDate2',
            Title:'DueDate2',
            TypeDom:'date',
            TypeCol:'date',
            Data:'',
            Col:'DueDate2'
        },     
    },
    Workflow:{
        name:'Abnormality',
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
                field1:{
                    Title:'Problem Title',
                    ID:'ProblemTitle',
                    Type:'text'
                },           
                field2:{
                    Title:'Type',
                    ID:'Type',
                    Type:'text'
                },           
                field3:{
                    Title:'Area',
                    ID:'Area',
                    Type:'select'
                },           
                field4:{
                    Title:'Reporter',
                    ID:'Reporter',
                    Type:'text'
                },           
                field5:{
                    Title:'บริษัท',
                    ID:'Company',
                    Type:'text'
                },           
                field6:{
                    Title:'หน่วยงาน',
                    ID:'Department',
                    Type:'text'
                },           
                field7:{
                    Title:'Site',
                    ID:'Site',
                    Type:'select'
                },           
                field8:{
                    Title:'Problem Category',
                    ID:'ProblemCategory',
                    Type:'radio'
                },           
                field9:{
                    Title:'Section Manager',
                    ID:'SectionManager',
                    Type:'people'
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
                field1:{
                    Title:'Problem Title',
                    ID:'ProblemTitle',
                    Type:'text'
                },           
                field2:{
                    Title:'Type',
                    ID:'Type',
                    Type:'text'
                },           
                field3:{
                    Title:'Area',
                    ID:'Area',
                    Type:'select'
                },           
                field4:{
                    Title:'Reporter',
                    ID:'Reporter',
                    Type:'text'
                },           
                field5:{
                    Title:'บริษัท',
                    ID:'Company',
                    Type:'text'
                },           
                field6:{
                    Title:'หน่วยงาน',
                    ID:'Department',
                    Type:'text'
                },           
                field7:{
                    Title:'Site',
                    ID:'Site',
                    Type:'select'
                },           
                field8:{
                    Title:'Problem Category',
                    ID:'ProblemCategory',
                    Type:'radio'
                },           
            },

        },
        'Wait for section manager approve':{
            FormStatus:'Wait for section manager approve',
            FormView:'Wait for section manager approve',
            StatusAction:{
                Submit:'Submit',
                Reject:'Reject',
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
                field0:{
                    Title:'Response by',
                    ID:'Responsible',
                    Type:'people'
                },           
                field1:{
                    Title:'Foreman',
                    ID:'Foreman',
                    Type:'people'
                },           
                // field1:{
                //     Title:'Problem Title',
                //     ID:'ProblemTitle',
                //     Type:'text'
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





FormMaster[2] = {
    FormID :'2',
    FormName :'Form',
    FileName :'GoodsReturn',
    Listname :'GoodsReturn',
    ListInternalName:'GoodsReturn',
    FormatRunningNO:'GR-',
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
