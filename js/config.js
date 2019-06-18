var SiteUrl = 'https://scgchemicals.scg.com/lotusnotes/TPE_StoreReservation';
var SiteUrl_TPE_Store_Section = 'https://scgchemicals.scg.com/lotusnotes/TPE_StoreSection';

var IncorrectMark = '<img style="width:20px; height:20px;" src="'+SiteUrl+'/SiteAssets/web/img/icon/incorrect.png">';
var CorrectMark = '<img style="width:20px; height:20px;" src="'+SiteUrl+'/SiteAssets/web/img/icon/correct.png">';
var SiteCollection = 'Lotusnotes';
var SubSite = 'TPE_StoreReservation';
var GroupAdminID = 2352; // group title is TPE Store Reservation Admin


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
var SummaryRequest = SiteUrl + '';

// List name (DisplayName Name)
var Disp_HistoryLog = 'HistoryLog';


//List name (Internal Name)
var Inter_HistoryLog = 'HistoryLog';


// Data Connection 
var Connection_Obj = [];
        Connection_Obj[0] = {
            Title:'Get Department from list department of site Lotusnote/TPE_StoreReservation',
            SiteUrl : 'https://scgchemicals.scg.com/lotusnotes/TPE_StoreReservation',
            ListName: 'Master_Department',
            Query: '?$select=Dept_Name,Dept_Mgr/Id,Dept_Mgr/Title,Section_Mgr/Id,Section_Mgr/Title,Division_Mgr/Id,Division_Mgr/Title,Committee_Mgr/Id,Committee_Mgr/Title,Dept_Code&$expand=Dept_Mgr,Section_Mgr,Division_Mgr,Committee_Mgr&$top=5000'
        };
        Connection_Obj[1] = {
            Title:'Get Material Group from list Material Group of site Lotusnote/TPE_StoreReservation',
            SiteUrl : 'https://scgchemicals.scg.com/lotusnotes/TPE_StoreReservation',
            ListName: 'Master_Material_Group',
            Query: '?$select=Material_Group,Code,No_Withdraw,No_Return,No_Lend,Year,Month&$top=5000'
        };
        Connection_Obj[2] = {
            Title:'Get Unit from Unit_Package of site Lotusnote/TPE_StoreReservation',
            SiteUrl : 'https://scgchemicals.scg.com/lotusnotes/TPE_StoreReservation',
            ListName: 'Master_Unit_Package',
            Query: '?$select=Unit&$top=5000&$orderby=Unit asc'
        };
        Connection_Obj[3] = {
            Title:'Get valuation class from list ValuationClass of site Lotusnote/TPE_StoreReservation',
            SiteUrl : 'https://scgchemicals.scg.com/lotusnotes/TPE_StoreReservation',
            ListName: 'ValuationClass',
            Query: '?$select=Valuation_Class,Expense_Account&$top=5000&$orderby=Valuation_Class asc'
        };
        Connection_Obj[4] = {
            Title:'Get company name from list Company of site Lotusnote/TPE_StoreReservation',
            SiteUrl : 'https://scgchemicals.scg.com/lotusnotes/TPE_StoreReservation',
            ListName: 'Master_Company',
            Query: '?$select=CompanyTH,CompanyENG&$top=5000&$orderby=CompanyENG asc'
        };
        Connection_Obj[5] = {
            Title:'Get Reviewer2',
            SiteUrl : 'https://scgchemicals.scg.com/lotusnotes/TPE_StoreReservation',
            ListName: 'Master_Reviewer',
            Query: '?$select=Role,User/Title,User/Id,Manager/Title,Manager/Id&$top=1&$expand=User,Manager&$filter=Role eq \'Reviewer Planning\''
        };
        Connection_Obj[6] = {
            Title:'Get User (Reviewer)',
            SiteUrl : 'https://scgchemicals.scg.com/lotusnotes/TPE_StoreReservation',
            ListName: 'Master_Reviewer',
            Query: '?$select=Role,User/Title,User/Id,Manager/Title,Manager/Id&$top=100&$expand=User,Manager&$filter=Role ne \'Reviewer Planning\''
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
        ส่งกลับหาผู้สร้างเอกสาร:{
            FormStatus:'ส่งกลับหาผู้สร้างเอกสาร',
            FormView:'ส่งกลับหาผู้สร้างเอกสาร',
            StatusAction:{
                แก้ไขเอกสารเสร็จสิ้น:'แก้ไขเอกสารเสร็จสิ้น',
            },
            Validate:{
                field1:{
                    Title:null,
                    ID:null,
                    Type:null
                },  
            },

        },
        สร้างเอกสาร:{
            FormStatus:'สร้างเอกสาร',
            FormView:'สร้างเอกสาร',
            StatusAction:{
                สร้างเอกสาร:'สร้างเอกสาร'
            },
            Validate:{
                field1:{
                    Title:'บริษัท',
                    ID:'Company',
                    Type:'select'
                },
                field2:{
                    Title:'หน่วยงานที่ขอ',
                    ID:'Dept_Name',
                    Type:'text'
                },
                field3:{
                    Title:'ชื่อพัสดุ',
                    ID:'Name_Package',
                    Type:'text'
                },
                field4:{
                    Title:'ประเภทสารเติมแต่ง',
                    ID:'Type_Additive',
                    Type:'text'
                },
                field5:{
                    Title:'สูตรเคมี',
                    ID:'Chem_Formula',
                    Type:'text'
                },
                field6:{
                    Title:'สัญลักษณ์ย่อสารเติมแต่ง',
                    ID:'Abbr_Additive',
                    Type:'text'
                },
                
              
                    
            },

        },
        รอตรวจสอบจากผู้จัดการแผนก:{
            FormStatus:'รอตรวจสอบจากผู้จัดการแผนก',
            FormView:'รอตรวจสอบจากผู้จัดการแผนก',
            StatusAction:{
                เห็นควร:'เห็นควร',
                ไม่เห็นควร:'ไม่เห็นควร (ส่งกลับหาผู้สร้างเอกสาร)'
            },
            Validate:{
                field1:{
                    Title:null,
                    ID:null,
                    Type:null
                },

            },
        },
        รออนุมัติจากผู้จัดการส่วน:{
            FormStatus:'รออนุมัติจากผู้จัดการส่วน',
            FormView:'รออนุมัติจากผู้จัดการส่วน',
            StatusAction:{
                อนุมัติ:'อนุมัติ',
                ไม่อนุมัติ:'ไม่อนุมัติ (ส่งกลับหาผู้สร้างเอกสาร)'
            },
            Validate:{
                field1:{
                    Title:null,
                    ID:null,
                    Type:null
                },
            },
        },
        รอตรวจสอบจากผู้ตรวจสอบ_Planning:{
            FormStatus:'รอตรวจสอบจากผู้ตรวจสอบ_Planning',
            FormView:'รอตรวจสอบจากผู้ตรวจสอบ_Planning',
            StatusAction:{
                เห็นควร:'เห็นควร',
                ไม่เห็นควร:'ไม่เห็นควร (ส่งกลับหาผู้สร้างเอกสาร)'
            },
            Validate:{
                    field1:{
                        Title:'ผู้ตรวจสอบ (ผจผ) วัสดุ',
                        ID:'Approver4',
                        Type:'people'
                    },
                    field2:{
                        Title:'ผู้ตรวจสอบ (ผจส) วัสดุ MM',
                        ID:'Approver5',
                        Type:'people'
                    },
                    field3:{
                        Title:'ผู้ดำเนินการ',
                        ID:'Approver6',
                        Type:'people'
                    },
                    field4:{
                        Title:'ผู้ตรวจสอบขั้นสุดท้าย',
                        ID:'Approver7',
                        Type:'people'
                    }
            },
        },
        รอตรวจสอบจากผู้ตรวจสอบวัสดุ:{
            FormStatus:'รอตรวจสอบจากผู้ตรวจสอบวัสดุ',
            FormView:'รอตรวจสอบจากผู้ตรวจสอบวัสดุ',
            StatusAction:{
                เห็นควร:'เห็นควร',
                ไม่เห็นควร:'ไม่เห็นควร (ส่งกลับหาผู้ตรวจสอบ Planning)'
            },
            Validate:{
                    field:{
                        Title:null,
                        ID:null,
                        Type:null
                    }
            },
        },
        รออนุมัติจากผู้ตรวจสอบวัสดุ_MM:{
            FormStatus:'รออนุมัติจากผู้ตรวจสอบวัสดุ_MM',
            FormView:'รออนุมัติจากผู้ตรวจสอบวัสดุ_MM',
            StatusAction:{
                อนุมัติ:'อนุมัติ',
                ไม่อนุมัติ:'ไม่อนุมัติ (ส่งกลับหาผู้ตรวจสอบ Planning)'
            },
            Validate:{
                    field:{
                        Title:null,
                        ID:null,
                        Type:null
                    }
            },
        },
        รอผู้ดำเนินการ:{
            FormStatus:'รอผู้ดำเนินการ',
            FormView:'รอผู้ดำเนินการ',
            StatusAction:{
                ดำเนินการแล้ว:'ดำเนินการแล้ว'
            },
            Validate:{
                    field:{
                        Title:null,
                        ID:null,
                        Type:null
                    }
            },
        },
        รออนุมัติจากผู้ตรวจสอบขั้นสุดท้าย:{
            FormStatus:'รออนุมัติจากผู้ตรวจสอบขั้นสุดท้าย',
            FormView:'รออนุมัติจากผู้ตรวจสอบขั้นสุดท้าย',
            StatusAction:{
                อนุมัติ:'อนุมัติ',
                ไม่อนุมัติ:'ไม่อนุมัติ (ส่งกลับหาผู้ดำเนินการ)'
            },
            Validate:{
                    field:{
                        Title:null,
                        ID:null,
                        Type:null
                    }
            },
        },
        ส่งกลับหาผู้ดำเนินการ:{
            FormStatus:'ส่งกลับหาผู้ดำเนินการ',
            FormView:'ส่งกลับหาผู้ดำเนินการ',
            StatusAction:{
                แก้ไขเอกสารเสร็จสิ้น:'แก้ไขเอกสารเสร็จสิ้น'
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




