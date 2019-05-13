var SiteUrl = 'https://scgchemicals.scg.com/lotusnotes/TPE_StoreReservation';
var SiteUrl_TPE_Store_Section = 'https://scgchemicals.scg.com/lotusnotes/TPE_StoreSection';

var IncorrectMark = '<img style="width:20px; height:20px;" src="'+SiteUrl+'/SiteAssets/web/img/icon/incorrect.png">';
var CorrectMark = '<img style="width:20px; height:20px;" src="'+SiteUrl+'/SiteAssets/web/img/icon/correct.png">';
var SiteCollection = 'Lotusnotes';
var SubSite = 'TPE_StoreReservation';


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
var WorkflowInternalName = 'TestRequ0';


//Attachment
var Attachment = 'Attachment';

// Page
var SummaryRequest = SiteUrl + '/Lists/Test_Request';

// List name (DisplayName Name)
var Disp_HistoryLog = 'HistoryLog';


//List name (Internal Name)
var Inter_HistoryLog = 'HistoryLog';


// Data Connection 
var Connection_Obj = [];
        Connection_Obj[0] = {
            Title:'Get Department from list department of site Lotusnote/TPE_StoreSection',
            SiteUrl : 'https://scgchemicals.scg.com/lotusnotes/TPE_StoreSection',
            ListName: 'Department',
            Query: '?$select=Dept_Name,Dept_Mgr/Id,Dept_Mgr/Title,Section_Mgr/Id,Section_Mgr/Title,Division_Mgr/Id,Division_Mgr/Title,Committee_Mgr/Id,Committee_Mgr/Title,Dept_Code&$expand=Dept_Mgr,Section_Mgr,Division_Mgr,Committee_Mgr&$top=5000'
        };
        Connection_Obj[1] = {
            Title:'Get Material Group from list Material Group of site Lotusnote/TPE_StoreSection',
            SiteUrl : 'https://scgchemicals.scg.com/lotusnotes/TPE_StoreSection',
            ListName: 'Material_Group',
            Query: '?$select=Material_Group,Code,No_Withdraw,No_Return,No_Lend,Year,Month&$top=5000'
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
// Requestor , Approver , Technician , Everyone

var FormMaster = {
    FormID :null,
    FormName :null,
    FileName :null
};
FormMaster[0] = {
    FormID :'1',
    FormName :'Store Reservation',
    FileName :'S_Reservation.html',
    FormStep:{
        SaveDraft:{
            FormStatus:'Save Draft',
            StatusAction:{
                Create:'Create',
                
            },
            Validate:{
                    field:{
                        ID:null,
                        Col:null
                    }
            },
            GroupPermission:{
                    GroupTitle:['Everyone'],
                    Edit:[true]
            }
        },
        Create:{
            FormStatus:'Create',
            StatusAction:{
                Create:'Submit'
            },
            Validate:{
                    field1:{
                        Title:'วัตถุประสงค์การใช้งาน',
                        ID:'F1_3',
                        Type:'text'
                    },
                    field2:{
                        Title:'วันที่กำหนดเสร็จ',
                        ID:'F1_4',
                        Type:'Date'
                    },
                    field3:{
                        Title:'ที่มาและความสำคัญ',
                        ID:'F1_5',
                        Type:'text'
                    },
                    field4:{
                        Title:'ผลลัพธ์ ที่ต้องการ',
                        ID:'F1_6',
                        Type:'text'
                    },
                    field5:{
                        Title:'Approver',
                        ID:'F1_7',
                        Type:'select'
                    },
                    
            },

        },
        WaitForApproval:{
            FormStatus:'Wait for approval',
            StatusAction:{
                Approve:'Approve',
                Return:'Return to requestor',
                Reject:'Reject'
            },
            Validate:{
                    field1:{
                        Title:'Approval Status',
                        ID:'F5_1',
                        Type:'select'
                    },
                    field2:{
                        Title:'Group Respond Team',
                        ID:'F5_2',
                        Type:'select'
                    }
            },
        },
        WaitForTechnician:{
            FormStatus:'Wait for technician',
            StatusAction:{
                Accept:'Technician accept',
            },
            Validate:{
                    field1:{
                        Title:'Technician Support',
                        ID:'F6_1',
                        Type:'people'
                    },
                    field2:{
                        Title:'Target Finish Date',
                        ID:'F6_2',
                        Type:'Date'
                    }
            },
        },
        Inprogress:{
            FormStatus:'In progress',
            StatusAction:{
                Submit:'Technician Submit'
            },
            Validate:{
                    field:{
                        Title:null,
                        ID:null,
                        Type:null
                    }
            },
        },
        WaitForEvaluation:{
            FormStatus:'Wait for evaluation',
            StatusAction:{
                Accept:'Accept',
                NotAccept:'Not Accept'
            },
            Validate:{
                    field1:{
                        Title:'ประเมินผลการปฏิบัติงาน',
                        ID:'F7_1',
                        Type:'select'
                    },
                    field2:{
                        Title:'ความถูกต้อง',
                        ID:'F7_3',
                        Type:'select'
                    },
                    field3:{
                        Title:'ความตรงต่อเวลา',
                        ID:'F7_5',
                        Type:'select'
                    }
            },
        },
        ReturnToRequestor:{
            FormStatus:'Return to requestor',
            StatusAction:{
                Submit:'Submit'   
            },
            Validate:{
                field1:{
                    Title:'วัตถุประสงค์การใช้งาน',
                    ID:'F1_3',
                    Type:'text'
                },
                field2:{
                    Title:'วันที่กำหนดเสร็จ',
                    ID:'F1_4',
                    Type:'Date'
                },
                field3:{
                    Title:'ที่มาและความสำคัญ',
                    ID:'F1_5',
                    Type:'text'
                },
                field4:{
                    Title:'ผลลัพธ์ ที่ต้องการ',
                    ID:'F1_6',
                    Type:'text'
                },
                field5:{
                    Title:'Approver',
                    ID:'F1_7',
                    Type:'select'
                },
            },
        },
        Reject:{
            FormStatus:'Reject',
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




