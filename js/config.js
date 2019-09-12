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
    Title:'Get TypeContract from Master_TypeContract',
    SiteUrl : 'https://scgchemicals.scg.com/lotusnotes/TPCQA',
    ListName: 'Master_TypeContract',
    Query: '?$select=TypeContract&$top=5000&$orderby=TypeContract asc'
};
Connection_Obj[1] = {
    Title:'Get Inspector from Master_Inspector',
    SiteUrl : 'https://scgchemicals.scg.com/lotusnotes/TPCQA',
    ListName: 'Master_Inspector',
    Query: '?$select=User/Title,User/Id&$expand=User&$top=5000&$orderby=User/Title asc'
};
Connection_Obj[2] = {
    Title:'Get Frequency from Master_Frequency',
    SiteUrl : 'https://scgchemicals.scg.com/lotusnotes/TPCQA',
    ListName: 'Master_Frequency',
    Query: '?$select=Frequency&$top=100&$orderby=Frequency asc'
};
Connection_Obj[3] = {
    Title:'Get Department from Master_Department',
    SiteUrl : 'https://scgchemicals.scg.com/lotusnotes/TPCQA',
    ListName: 'Master_Department',
    Query: '?$select=Department&$top=100&$orderby=Department asc'
};
Connection_Obj[4] = {
    Title:'Get Department from Master_Analyst',
    SiteUrl : 'https://scgchemicals.scg.com/lotusnotes/TPCQA',
    ListName: 'Master_Analyst',
    Query: '?$select=Title,User/Id,User/Title&$expand=User&$top=100&$orderby=User/Title asc'
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
        field2:{
            ID:'TypeContract',
            Title:'ประเภทปัญหา',
            TypeDom:'select',
            TypeCol:'singleline',
            Data:'',
            Col:'TypeContract'
        },
        field3:{
            ID:'StartDate',
            Title:'Date',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'StartDate'
        },
        field4:{
            ID:'StartTime',
            Title:'StartTime',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'StartTime'
        },
        field5:{
            ID:'Description',
            Title:'Description',
            TypeDom:'textarea',
            TypeCol:'multipleline',
            Data:'',
            Col:'Description'
        },
        field6:{
            ID:'Activity1',
            Title:'Activity1',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Activity1'
        },
        field7:{
            ID:'Activity2',
            Title:'Activity2',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Activity2'
        },
        field8:{
            ID:'Activity3',
            Title:'Activity3',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Activity3'
        },
        field9:{
            ID:'DueDate1',
            Title:'DueDate1',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'DueDate1'
        },
        field10:{
            ID:'DueDate2',
            Title:'DueDate2',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'DueDate2'
        },
        field11:{
            ID:'DueDate3',
            Title:'DueDate3',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'DueDate3'
        },
        field12:{
            ID:'Response1',
            Title:'Response1',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Response1'
        },
        field13:{
            ID:'Response2',
            Title:'Response2',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Response2'
        },
        field14:{
            ID:'Response3',
            Title:'Response3',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Response3'
        },
        field15:{
            ID:'Activity4',
            Title:'Activity4',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Activity4'
        },
        field16:{
            ID:'Activity5',
            Title:'Activity5',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Activity5'
        },
        field17:{
            ID:'Activity6',
            Title:'Activity6',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Activity6'
        },
        field18:{
            ID:'DueDate4',
            Title:'DueDate4',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'DueDate4'
        },
        field19:{
            ID:'DueDate5',
            Title:'DueDate5',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'DueDate5'
        },
        field20:{
            ID:'DueDate6',
            Title:'DueDate6',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'DueDate6'
        },
        field21:{
            ID:'Response4',
            Title:'Response4',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Response4'
        },
        field22:{
            ID:'Response5',
            Title:'Response5',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Response5'
        },
        field23:{
            ID:'Response6',
            Title:'Response6',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Response6'
        },
        field24:{
            ID:'ModifyStatus',
            Title:'ModifyStatus',
            TypeDom:'select',
            TypeCol:'singleline',
            Data:'',
            Col:'ModifyStatus'
        },
        field25:{
            ID:'NoteQA',
            Title:'NoteQA',
            TypeDom:'textarea',
            TypeCol:'multipleline',
            Data:'',
            Col:'NoteQA'
        },
        field26:{
            ID:'PreventStatus',
            Title:'PreventStatus',
            TypeDom:'select',
            TypeCol:'singleline',
            Data:'',
            Col:'PreventStatus'
        },
        field27:{
            ID:'NoteQA2',
            Title:'NoteQA2',
            TypeDom:'textarea',
            TypeCol:'multipleline',
            Data:'',
            Col:'NoteQA2'
        },
        field28:{
            ID:'summernote1',
            Title:'Cause Description',
            TypeDom:'summernote',
            TypeCol:'multipleline',
            Data:'',
            Col:'CauseDesc'
        },
        field29:{
            ID:'ActModify1',
            Title:'ActModify1',
            TypeDom:'textarea',
            TypeCol:'singleline',
            Data:'',
            Col:'ActModify1'
        },
        field30:{
            ID:'DueDate7',
            Title:'DueDate7',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'DueDate7'
        },
        field31:{
            ID:'Response7',
            Title:'Response7',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Response7'
        },
        field32:{
            ID:'RecordReview1',
            Title:'RecordReview1',
            TypeDom:'text',
            TypeCol:'multipleline',
            Data:'',
            Col:'RecordReview1'
        },
        field33:{
            ID:'DateReview1',
            Title:'DateReview1',
            TypeDom:'date',
            TypeCol:'singleline	',
            Data:'',
            Col:'DateReview1'
        },
        field34:{
            ID:'ActModify2',
            Title:'ActModify2',
            TypeDom:'textarea',
            TypeCol:'singleline',
            Data:'',
            Col:'ActModify2'
        },
        field35:{
            ID:'DueDate8',
            Title:'DueDate8',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'DueDate8'
        },
        field36:{
            ID:'Response8',
            Title:'Response8',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Response8'
        },
        field37:{
            ID:'RecordReview2',
            Title:'RecordReview2',
            TypeDom:'text',
            TypeCol:'multipleline',
            Data:'',
            Col:'RecordReview2'
        },
        field38:{
            ID:'DateReview2',
            Title:'DateReview2',
            TypeDom:'date',
            TypeCol:'singleline	',
            Data:'',
            Col:'DateReview2'
        },
        field39:{
            ID:'ActModify3',
            Title:'ActModify3',
            TypeDom:'textarea',
            TypeCol:'singleline',
            Data:'',
            Col:'ActModify3'
        },
        field40:{
            ID:'DueDate9',
            Title:'DueDate9',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'DueDate9'
        },
        field41:{
            ID:'Response9',
            Title:'Response9',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Response9'
        },
        field42:{
            ID:'RecordReview3',
            Title:'RecordReview3',
            TypeDom:'text',
            TypeCol:'multipleline',
            Data:'',
            Col:'RecordReview3'
        },
        field43:{
            ID:'DateReview3',
            Title:'DateReview3',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'DateReview3'
        },
        field61:{
            ID:'ActPreventive1',
            Title:'ActPreventive1',
            TypeDom:'textarea',
            TypeCol:'singleline',
            Data:'',
            Col:'ActPreventive1'
        },
        field62:{
            ID:'DueDate13',
            Title:'DueDate13',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'DueDate13'
        },
        field63:{
            ID:'Response13',
            Title:'Response13',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Response13'
        },
        field64:{
            ID:'RecordReview7',
            Title:'RecordReview7',
            TypeDom:'text',
            TypeCol:'multipleline',
            Data:'',
            Col:'RecordReview7'
        },
        field65:{
            ID:'ActPreventive2',
            Title:'ActPreventive2',
            TypeDom:'textarea',
            TypeCol:'singleline',
            Data:'',
            Col:'ActPreventive2'
        },
        field66:{
            ID:'DueDate14',
            Title:'DueDate14',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'DueDate14'
        },
        field67:{
            ID:'Response14',
            Title:'Response14',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Response14'
        },
        field68:{
            ID:'RecordReview8',
            Title:'RecordReview8',
            TypeDom:'text',
            TypeCol:'multipleline',
            Data:'',
            Col:'RecordReview8'
        },
        field69:{
            ID:'ActPreventive3',
            Title:'ActPreventive3',
            TypeDom:'textarea',
            TypeCol:'singleline',
            Data:'',
            Col:'ActPreventive3'
        },
        field70:{
            ID:'DueDate15',
            Title:'DueDate15',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'DueDate15'
        },
        field71:{
            ID:'Response15',
            Title:'Response15',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Response15'
        },
        field72:{
            ID:'RecordReview9',
            Title:'RecordReview9',
            TypeDom:'text',
            TypeCol:'multipleline',
            Data:'',
            Col:'RecordReview9'
        },
        field73:{
            ID:'DateReview9',
            Title:'DateReview9',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'DateReview9'
        },
        field74:{
            ID:'UserFollower1',
            Title:'UserFollower1',
            TypeDom:'people',
            TypeCol:'people',
            Data:'',
            Col:'UserFollower1'
        },
        field91:{
            ID:'StatusReview',
            Title:'StatusReview',
            TypeDom:'select',
            TypeCol:'singleline',
            Data:'',
            Col:'StatusReview'
        },
        field92:{
            ID:'FinalReviewDate',
            Title:'FinalReviewDate',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'FinalReviewDate'
        },
        field93:{
            ID:'QAManager',
            Title:'QAManager',
            TypeDom:'people',
            TypeCol:'people',
            Data:'',
            Col:'QAManager'
        },
        field94:{
            ID:'DateReview7',
            Title:'DateReview7',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'DateReview7'
        },
        field95:{
            ID:'DateReview8',
            Title:'DateReview8',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'DateReview8'
        },
        field96:{
            ID:'AssignToFollower1',
            Title:'มอบหมายการตรวจติดตาม',
            TypeDom:'select',
            TypeCol:'people',
            Data:'',
            Col:'AssignToFollower1'
        },
        field98:{
            ID:'ManagerApproveStatus',
            Title:'การอนุมัติ',
            TypeDom:'select',
            TypeCol:'singleline',
            Data:'',
            Col:'ManagerApproveStatus'
        },
        field99:{
            ID:'ActionBy',
            Title:'มอบหมายงานให้กับ',
            TypeDom:'people',
            TypeCol:'people',
            Data:'',
            Col:'ActionBy'
        },
        field100:{
            ID:'Status1',
            Title:'Status',
            TypeDom:'select',
            TypeCol:'singleline',
            Data:'',
            Col:'Status1'
        },
        field101:{
            ID:'Status2',
            Title:'Status',
            TypeDom:'select',
            TypeCol:'singleline',
            Data:'',
            Col:'Status2'
        },
        field102:{
            ID:'Status3',
            Title:'Status',
            TypeDom:'select',
            TypeCol:'singleline',
            Data:'',
            Col:'Status3'
        },
        field103:{
            ID:'Status4',
            Title:'Status',
            TypeDom:'select',
            TypeCol:'singleline',
            Data:'',
            Col:'Status4'
        },
        field104:{
            ID:'Status5',
            Title:'Status',
            TypeDom:'select',
            TypeCol:'singleline',
            Data:'',
            Col:'Status5'
        },
        field105:{
            ID:'Status6',
            Title:'Status',
            TypeDom:'select',
            TypeCol:'singleline',
            Data:'',
            Col:'Status6'
        },
        field106:{
            ID:'NextReviewDate1',
            Title:'NextReviewDate1',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'NextReviewDate1'
        },
        field107:{
            ID:'NextReviewDate2',
            Title:'NextReviewDate2',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'NextReviewDate2'
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
                    Title:'ชื่อเรื่อง',
                    ID:'Subject',
                    Type:'text'
                },        
                field2:{
                    Title:'ประเภทปัญหา',
                    ID:'TypeContract',
                    Type:'select'
                },        
                field3:{
                    Title:'Date',
                    ID:'StartDate',
                    Type:'date'
                },        
            },

        },
        'ส่งกลับหาผู้สร้างเอกสาร':{
            FormStatus:'ส่งกลับหาผู้สร้างเอกสาร',
            FormView:'ส่งกลับหาผู้สร้างเอกสาร',
            StatusAction:{
                Submit:'Submit',
            },
            Validate:{
                // field1:{
                //     Title:'หน่วยงานที่ขอ',
                //     ID:'Department',
                //     Type:'text'
                // },        
            },

        },
        'รอ QA Manager อนุมัติงาน':{
            FormStatus:'รอ QA Manager อนุมัติงาน',
            FormView:'รอ QA Manager อนุมัติงาน',
            StatusAction:{
                Submit:'Submit',
            },
            Validate:{
                field1:{
                    Title:'การอนุมัติ',
                    ID:'ManagerApproveStatus',
                    Type:'select'
                },        
            },

        },
        'รอดำเนินการ':{
            FormStatus:'รอดำเนินการ',
            FormView:'รอดำเนินการ',
            StatusAction:{
                Submit:'Submit',
            },
            Validate:{
                // field1:{
                //     Title:'การอนุมัติ',
                //     ID:'ManagerApproveStatus',
                //     Type:'select'
                // },        
            },

        },
        'อยู่ระหว่างการพิจารณาอนุมัติการแก้ไข':{
            FormStatus:'อยู่ระหว่างการพิจารณาอนุมัติการแก้ไข',
            FormView:'อยู่ระหว่างการพิจารณาอนุมัติการแก้ไข',
            StatusAction:{
                    'Submit':'Submit',
                // 'ส่งกลับหาผู้สร้างเอกสาร':'ส่งกลับหาผู้สร้างเอกสาร',
                // 'ส่งหาผู้ตรวจติดตาม':'ส่งหาผู้ตรวจติดตาม',
                // 'ยกเลิกเอกสารฉบับนี้':'ยกเลิกเอกสารฉบับนี้',


            },
            Validate:{
                    field1:{
                        Title:'สถานะการพิจารณาการอนุมัติการแก้ไข',
                        ID:'ModifyStatus',
                        Type:'select'
                    },
                    // field2:{
                    //     Title:'มอบหมายการตรวจติดตามแก้ไข',
                    //     ID:'AssignToFollower1',
                    //     Type:'select'
                    // },
                    field2:{
                        Title:'สถานะการพิจารณาการอนุมัติการป้องกัน',
                        ID:'PreventStatus',
                        Type:'select'
                    },

            },
        },
        'อนุมัติวิธีดำเนินการ อยู่ระหว่างการตรวจติดตาม':{
            FormStatus:'อนุมัติวิธีดำเนินการ อยู่ระหว่างการตรวจติดตาม',
            FormView:'อนุมัติวิธีดำเนินการ อยู่ระหว่างการตรวจติดตาม',
            StatusAction:{
                'บันทึกการตรวจติดตาม':'บันทึกการตรวจติดตาม',
                'ตรวจติดตามเพิ่มเติม':'ตรวจติดตามเพิ่มเติม',
            },
            Validate:{
                    // field1:{
                    //     Title:'กิจกรรมการแก้ไข',
                    //     ID:'ActModify1',
                    //     Type:'text'
                    // },
                    // field2:{
                    //     Title:'กำหนดเสร็จ กิจกรรมการแก้ไข',
                    //     ID:'DueDate7',
                    //     Type:'date'
                    // },
                    // field3:{
                    //     Title:'ผู้รับผิดชอบ กิจกรรมการแก้ไข',
                    //     ID:'Response7',
                    //     Type:'people'
                    // },
                    // field4:{
                    //     Title:'บันทึกการตรวจติดตาม กิจกรรมการแก้ไข',
                    //     ID:'RecordReview1',
                    //     Type:'text'
                    // },
                    // field5:{
                    //     Title:'วันที่ตรวจติดตาม กิจกรรมการแก้ไข',
                    //     ID:'DateReview1',
                    //     Type:'date'
                    // },
                    // field6:{
                    //     Title:'กิจกรรมการป้องกัน',
                    //     ID:'ActPreventive1',
                    //     Type:'text'
                    // },
                    // field7:{
                    //     Title:'กำหนดเสร็จ กิจกรรมการป้องกัน',
                    //     ID:'DueDate13',
                    //     Type:'date'
                    // },
                    // field8:{
                    //     Title:'ผู้รับผิดชอบ กิจกรรมการป้องกัน',
                    //     ID:'Response13',
                    //     Type:'people'
                    // },
                    // field9:{
                    //     Title:'บันทึกการตรวจติดตาม กิจกรรมการป้องกัน',
                    //     ID:'RecordReview7',
                    //     Type:'text'
                    // },
                    // field10:{
                    //     Title:'วันที่ตรวจติดตาม กิจกรรมการป้องกัน',
                    //     ID:'DateReview7',
                    //     Type:'date'
                    // }
            },
        },
        'รอ QA Manager พิจารณาอนุมัติ':{
            FormStatus:'รอ QA Manager พิจารณาอนุมัติ',
            FormView:'รอ QA Manager พิจารณาอนุมัติ',
            StatusAction:{
                'เห็นควรปิด':'เห็นควรปิด',
                'ส่งกลับหาผู้ตรวจติดตาม':'ส่งกลับหาผู้ตรวจติดตาม',
                
            },
            Validate:{
                    field1:{
                        Title:'ผลการพิจารณา',
                        ID:'StatusReview',
                        Type:'select'
                    },
            },
        },
        Closed:{
            FormStatus:'Closed',
            FormView:'Closed',
            StatusAction:{
                
            },
            Validate:{
                    field:{
                        Title:null,
                        ID:null,
                        Type:null
                    }
            },
        },
        Cancelled:{
            FormStatus:'Cancelled',
            FormView:'Cancelled',
            StatusAction:{
                
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
FormMaster[1] = {
    FormID :'2',
    FormName :'Form',
    FileName :'SpecialRequest',
    Listname :'Special Request',
    ListInternalName:'SpecialRequest',
    FormatRunningNO:'QA-SR-',
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
            ID:'Requestor1',
            Title:'ผู้แจ้ง Requestor',
            TypeDom:'people',
            TypeCol:'people',
            Data:'',
            Col:'Requestor1'
        },
        field2:{
            ID:'DateNoti',
            Title:'วันที่แจ้ง',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'DateNoti'
        },
        field3:{
            ID:'CC_Manager',
            Title:'CC Manager / Engineer',
            TypeDom:'people',
            TypeCol:'people',
            Data:'',
            Col:'CC_Manager'
        },
        field4:{
            ID:'Subject',
            Title:'ชื่องาน',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Subject'
        },
        field5:{
            ID:'Department',
            Title:'หน่วยงาน',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Department'
        },
        field6:{
            ID:'TypeWork',
            Title:'ประเภทงาน',
            TypeDom:'radio',
            TypeCol:'singleline',
            Data:'',
            Col:'TypeWork'
        },
        field7:{
            ID:'DateFrom',
            Title:'ระหว่างวันที่',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'DateFrom'
        },
        field8:{
            ID:'DateTo',
            Title:'ถึงวันที่',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'DateTo'
        },
        field9:{
            ID:'DateResult',
            Title:'วันที่ต้องการผลวิเคราะห์',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'DateResult'
        },
        field10:{
            ID:'TimeKeep',
            Title:'เวลาเก็บตัวอย่าง',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'TimeKeep'
        },
        field11:{
            ID:'Frequency',
            Title:'ความถี่ในการวิเคราะห์',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Frequency'
        },
        field12:{
            ID:'NameEx',
            Title:'ชื่อตัวอย่าง',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'NameEx'
        },
        field13:{
            ID:'PointKeepEx',
            Title:'จุดเก็บตัวอย่าง',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'PointKeepEx'
        },
        field14:{
            ID:'AmountEx',
            Title:'จำนวนตัวอย่าง',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'AmountEx'
        },
        field15:{
            ID:'Physical',
            Title:'ลักษณะทางกายภาพ',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Physical'
        },
        field16:{
            ID:'Temp',
            Title:'อุณหภูมิ',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Temp'
        },
        field17:{
            ID:'Pressure',
            Title:'ความดัน',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Pressure'
        },
        field18:{
            ID:'ListAnalyze',
            Title:'รายการที่ต้องการวิเคราะห์',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'ListAnalyze'
        },
        field19:{
            ID:'HowToAnalyze',
            Title:'วิธีวิเคราะห์ (ถ้ามี)',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'HowToAnalyze'
        },
        field20:{
            ID:'Coordinator',
            Title:'ชื่อผู้ประสานงานเก็บตัวอย่าง',
            TypeDom:'people',
            TypeCol:'people',
            Data:'',
            Col:'Coordinator'
        },
        field21:{
            ID:'UserManager',
            Title:'เลือก Manager',
            TypeDom:'people',
            TypeCol:'people',
            Data:'',
            Col:'UserManager'
        },
        field22:{
            ID:'ReasonService',
            Title:'เหตุผลการขอใช้บริการโปรดระบุ',
            TypeDom:'textarea',
            TypeCol:'multipleline',
            Data:'',
            Col:'ReasonService'
        },
        field23:{
            ID:'Location',
            Title:'เลือก Location ที่ขอใช้บริการ เพื่อส่งพิจารณาการให้บริการ',
            TypeDom:'radio',
            TypeCol:'singleline',
            Data:'',
            Col:'Location'
        },
        field24:{
            ID:'ResultApprove',
            Title:'ผลการพิจารณา',
            TypeDom:'radio',
            TypeCol:'singleline',
            Data:'',
            Col:'ResultApprove'
        },
        field25:{
            ID:'ApproveBy',
            Title:'พิจารณาโดย',
            TypeDom:'people',
            TypeCol:'people',
            Data:'',
            Col:'ApproveBy'
        },
        field26:{
            ID:'DateApprove',
            Title:'วันที่',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'DateApprove'
        },
        field27:{
            ID:'AssignTo',
            Title:'มอบหมายงานให้ QA Sup',
            TypeDom:'select',
            TypeCol:'people',
            Data:'',
            Col:'AssignTo'
        },
        field28:{
            ID:'ResultNotice',
            Title:'แจ้งผลการพิจารณา ได้',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'ResultNotice'
        },
        field29:{
            ID:'Analyzer',
            Title:'ผู้วิเคราะห์',
            TypeDom:'select',
            TypeCol:'people',
            Data:'',
            Col:'Analyzer'
        },
        field30:{
            ID:'TimeAnalyze',
            Title:'เวลาที่ใช้วิเคราะห์ (นาที)',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'TimeAnalyze'
        },
        field31:{
            ID:'Supervisor',
            Title:'Supervisor',
            TypeDom:'people',
            TypeCol:'people',
            Data:'',
            Col:'Supervisor'
        },
        field32:{
            ID:'ApproveByChemist',
            Title:'Approved by Chemist',
            TypeDom:'select',
            TypeCol:'singleline',
            Data:'',
            Col:'ApproveByChemist'
        },
        field33:{
            ID:'DateApproveChemist',
            Title:'วันที่',
            TypeDom:'date',
            TypeCol:'singleline',
            Data:'',
            Col:'DateApproveChemist'
        },
        field34:{
            ID:'ChemistName',
            Title:'Chemist Name',
            TypeDom:'people',
            TypeCol:'people',
            Data:'',
            Col:'ChemistName'
        },
        field35:{
            ID:'CommentByChemist',
            Title:'Comment by Chemist',
            TypeDom:'textarea',
            TypeCol:'multipleline',
            Data:'',
            Col:'CommentByChemist'
        },
    },
    Workflow:{
        name:'Speical_x0020_Request_x0020_Work',
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
                    Title:'ผู้แจ้ง Requestor',
                    ID:'Requestor1',
                    Type:'people'
                },        
                field2:{
                    Title:'วันที่แจ้ง',
                    ID:'DateNoti',
                    Type:'date'
                },        
                field3:{
                    Title:'ชื่องาน',
                    ID:'Subject',
                    Type:'text'
                },        
                field4:{
                    Title:'หน่วยงาน',
                    ID:'Department',
                    Type:'select'
                },        
                field5:{
                    Title:'ชื่อตัวอย่าง',
                    ID:'NameEx',
                    Type:'text'
                },        
                field6:{
                    Title:'ชื่อผู้ประสานงานเก็บตัวอย่าง',
                    ID:'Coordinator',
                    Type:'people'
                },        
                field6:{
                    Title:'เลือก Manager',
                    ID:'UserManager',
                    Type:'people'
                },        
                // field7:{
                //     Title:'ประเภทงาน',
                //     ID:'TypeWork',
                //     Type:'radio'
                // },        
                // field6:{
                //     Title:'',
                //     ID:'',
                //     Type:''
                // },        
            },

        },
        'Wait for manager approve':{
            FormStatus:'Wait for manager approve',
            FormView:'Wait for manager approve',
            StatusAction:{
                Approve:'Approve',
                Reject:'Reject',
              
            },
            Validate:{
                    // field:{
                    //     Title:null,
                    //     ID:null,
                    //     Type:null
                    // }
            },
        },
        'Wait for shift supervisor action':{
            FormStatus:'Wait for shift supervisor action',
            FormView:'Wait for shift supervisor action',
            StatusAction:{
                Submit:'Submit',
              
            },
            Validate:{
                    field1:{
                        Title:'ผลการพิจารณา',
                        ID:'ResultApprove',
                        Type:'radio'
                    },
                    field2:{
                        Title:'พิจารณาโดย',
                        ID:'ApproveBy',
                        Type:'people'
                    },
                    field3:{
                        Title:'วันที่',
                        ID:'DateApprove',
                        Type:'date'
                    },
                    // field4:{
                    //     Title:'มอบหมายงานให้ QA Sup',
                    //     ID:'AssignTo',
                    //     Type:'select'
                    // }
            },
        },
        'Wait for assigned person action':{
            FormStatus:'Wait for assigned person action',
            FormView:'Wait for assigned person action',
            StatusAction:{
                Submit:'Submit',
              
            },
            Validate:{
                    field1:{
                        Title:'ผู้วิเคราะห์',
                        ID:'Analyzer',
                        Type:'select'
                    },
                    field2:{
                        Title:'เวลาที่ใช้วิเคราะห์ (นาที)',
                        ID:'TimeAnalyze',
                        Type:'text'
                    },
                    field3:{
                        Title:'Supervisor',
                        ID:'Supervisor',
                        Type:'people'
                    }
            },
        },
        'Wait for shift supervisor submit':{
            FormStatus:'Wait for shift supervisor submit',
            FormView:'Wait for shift supervisor submit',
            StatusAction:{
                Submit:'Submit',
              
            },
            Validate:{
                    // field:{
                    //     Title:null,
                    //     ID:null,
                    //     Type:null
                    // }
            },
        },
        'Wait for chemist consider':{
            FormStatus:'Wait for chemist consider',
            FormView:'Wait for chemist consider',
            StatusAction:{
                Submit:'Submit',
              
            },
            Validate:{
                    // field:{
                    //     Title:null,
                    //     ID:null,
                    //     Type:null
                    // }
            },
        },
        
        'Wait for chemist approve':{
            FormStatus:'Wait for chemist approve',
            FormView:'Wait for chemist approve',
            StatusAction:{
                Submit:'Submit',
              
            },
            Validate:{
                    field1:{
                        Title:'Approved by Chemist',
                        ID:'ApproveByChemist',
                        Type:'select'
                    },
                    field2:{
                        Title:'วันที่',
                        ID:'DateApproveChemist',
                        Type:'date'
                    },
                    field3:{
                        Title:'Chemist Name',
                        ID:'ChemistName',
                        Type:'people'
                    }
            },
        },
        'Closed':{
            FormStatus:'Closed',
            FormView:'Closed',
            StatusAction:{
            
              
            },
            Validate:{
                    // field:{
                    //     Title:null,
                    //     ID:null,
                    //     Type:null
                    // }
            },
        },
        'Cancel Request':{
            FormStatus:'Cancel Request',
            FormView:'Cancel Request',
            StatusAction:{
            
              
            },
            Validate:{
                    // field:{
                    //     Title:null,
                    //     ID:null,
                    //     Type:null
                    // }
            },
        },
        'Item has been rejected':{
            FormStatus:'Item has been rejected',
            FormView:'Item has been rejected',
            StatusAction:{
            
              
            },
            Validate:{
                    // field:{
                    //     Title:null,
                    //     ID:null,
                    //     Type:null
                    // }
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

