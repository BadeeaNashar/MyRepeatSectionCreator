// #region متغيرات إنشاء الريبيت سيكشن
var TBody_ClassName = null;
var Tr_ClassName = null;
var Tr_IDName = null;
var ControllerObjectName = null;
var MaxRows = null;
var NumberOfColumns = null;
var AddButtonName = null;
var DeleteButtonName = null;
var TableName = null;
var HTML_Main_Table_Tag = "";
var HTML_Main_Table_Tag_ToSend = "";
var HTML_RepeatSection_Table_Tag = "";
var All_JS_Source = "";
var NumberOfRows = 1;
// #endregion

$(document).ready(function () {

   
    $('#heading11').click(function () {
        var GetCalss = document.getElementById("CopyJS");

        if (GetCalss.className.includes("d-block")) {
            $('#CopyJS').removeClass("d-block");
            $('#CopyJS').addClass("d-none");
        }
        else {
            $('#CopyJS').removeClass("d-none");
            $('#CopyJS').addClass("d-block");
        }
        
    });

   
    $('#heading22').click(function () {

        var GetCalss = document.getElementById("CopyHTML");

        if (GetCalss.className.includes("d-block")) {
            $('#CopyHTML').removeClass("d-block");
            $('#CopyHTML').addClass("d-none");
        }
        else {
            $('#CopyHTML').removeClass("d-none");
            $('#CopyHTML').addClass("d-block");
        }

    });

        //#region  زر الإنشاء
    $('#RequestButton').click(function () {

        TBody_ClassName = $('#Tbody_ClassName').val();
        Tr_ClassName = $('#Tr_ClassName').val();
        Tr_IDName = $('#Tr_IDName').val();
        ControllerObjectName = $('#ClassObjectName').val();
        MaxRows = Number($('#MaximumRows').val());
        NumberOfColumns = Number($('#NumberOfColumns').val());
        AddButtonName = $('#AddButtonText').val();
        DeleteButtonName = $('#DeleteButtonText').val();
        TableName = $('#TableName').val();

        // تخزين كود الجدول لإظهار الجدول فقط بالخدمة

        HTML_Main_Table_Tag = '<div class="card show-card"> \n' +
            // '<div class="card-header" style="background-color: #1FAF9E;""> \n' +
            // '<h4 class="mb-0 text-white text-center">'+ TableName +'</h4> \n' +
            // '</div> \n' +
            '<div class="card-body"> \n' +
            '<div class="form-body"> \n' +
            '</div> \n' +
            '<div class="col-lg-12"> \n' +
            '<div class="table"> \n' +
            '<table class="table"> \n' +
            '<thead class="text-white bg-secondary"> \n' + //style="background-color: black;"
            '<tr> \n' +
            ColumnsCreating() +
            '</tr> \n' +
            '</thead> \n' +
            '<tbody class="border border-dark ' + TBody_ClassName + '"> \n' +
            '<tr class="' + Tr_ClassName + '" id="' + Tr_IDName + '"> \n' +
            MainRowCreating() +
            '</tr> \n' +
            '</tbody> \n' +
            '</table> \n' +
            '</div> \n' +
            '<div class="row" id="table-buttons"> \n' +
            '<div class="col-lg-3 py-2"> \n' +
            '<a name="" id="AddNewRow" class="btn btn-rounded btn-success text-white btn-block" role="button" onclick="AddRepeatSectionRow()" style="background-color:#2FB98D"> \n' +
             AddButtonName + ' \n' +
            '</a> \n' +
            '</div> \n' +
            '<div class="col-lg-3 m-y-2 py-2"> \n' +
            '<a name="" id="DelRow" class="btn btn-secondary btn-block text-white" role="button" onclick="DeleteRepeatSectionRow()"> \n' +
             DeleteButtonName + ' \n' +
            '</a> \n' +
            '</div> \n' +
            '</div> \n' +
            '</div> \n' +
            '</div> \n' +
            '</div> \n';


        // تخزين كود الجدول لإظهار السورس كود (الفرق هو زر الإضافة والحذف بدون استدعاء الفنكشات الخاصة بالخدمة الحالية)

        HTML_Main_Table_Tag_ToSend = '<div class="card card-outline-info"> \n' +
            '<div class="card-header" style="background-color: #00AA9E;"> \n' +
            '<h4 class="mb-0 text-white text-center">Write Your Title Here</h4> \n' +
            '</div> \n' +
            '<div class="card-body"> \n' +
            '<div class="form-body"> \n' +
            '</div> \n' +
            '<div class="col-lg-12"> \n' +
            '<div class="table"> \n' +
            '<table class="table"> \n' +
            '<thead class="bg-secondary text-white"> \n' +
            '<tr> \n' +
            ColumnsCreating() +
            '</tr> \n' +
            '</thead> \n' +
            '<tbody class="border border-dark ' + TBody_ClassName + '"> \n' +
            '<tr class="' + Tr_ClassName + '" id="' + Tr_IDName + '"> \n' +
            MainRowCreating() +
            '</tr> \n' +
            '</tbody> \n' +
            '</table> \n' +
            '</div> \n' +
            '</div> \n' +
            '<div class="row" id="table-buttons"> \n' +
            '<div class="col-lg-2 py-2"> \n' +
            '<a name="" id="AddNewRow" class="btn btn-success text-white btn-block" role="button"> \n' +
            '<i class="fas fa-plus-square"></i>' + AddButtonName + ' \n' +
            '</a> \n' +
            '</div> \n' +
            '<div class="col-lg-2 m-y-2 py-2"> \n' +
            '<a name="" id="DelRow" class="btn btn-secondary btn-block" role="button"> \n' +
            '<i class="fas fa-times-circle"></i>' + DeleteButtonName + ' \n' +
            '</a> \n' +
            '</div> \n' +
            '</div> \n' +
            '</div> \n' +
            '</div> \n';

        var htmlObject = $(HTML_Main_Table_Tag);
        var div = $('#HTML_FROM_JAVASCRIPT');
        div.append(htmlObject);

        // إذا لم يتم تحديد حد أعلى لإضافة الصفوف ,, ينشئ جافاسكربت لإضافة صفوف لانهائية
        if (MaxRows == 0) {

            All_JS_Source = '$(document).ready(function () { \n \n' +
                "// the count starts from 1 because it's already started from 0 in the table created \n" +
                "var NumberOfRows = 1; \n \n " +
                "// Click event when clicking on Add Button" + "\n" +
                "$('#AddNewRow').click(function () { \n \n " +
                "var div = $('." + TBody_ClassName + "').closest('tbody'); \n " +
                'div.append(' + "'" + ColumnsCreatingForJs() + "'" + '); \n ' +
                "NumberOfRows++; \n \n " +
                "}); \n \n \n " +
                "// Click event when clicking on Delete Button" + "\n" +
                "$('#DelRow').click(function () { \n \n " +
                "var childrens = $('." + TBody_ClassName + "').children('." + Tr_ClassName + "'); \n \n " +
                "if (childrens.length > 1) { \n " +
                "$(childrens.last()).remove(); \n " +
                "NumberOfRows--; \n " +
                '$("#AddNewRow").html(' + '"' + AddButtonName + '"' + '); \n ' +
                '$("#AddNewRow").removeClass("disabled"); \n \n' +
                "} \n " +
                "}); \n " +
                "}); \n ";

            $("#JS_Code").text(All_JS_Source);
            $("#HTML_Code").text(HTML_Main_Table_Tag_ToSend);
            $("#Repeat_Section_Source").removeClass('d-none');

        }
        // إذا تم تحديد حد أعلى لإضافة الصفوف ينشئ جافاسكربت بصفوف محدودة على حسب ماتم تحديده
        else {

            All_JS_Source = '$(document).ready(function () { \n \n' +
                "var NumberOfRows = 1; // NumberOfRows count starts from 1 because it's already started from 0 in the table created \n" +
                'var Wanted_Max_Rows = ' + MaxRows + '; \n' +
                'var MaxRows_Count = 1; \n \n' +
                "// Click event when clicking on Add Button" + "\n" +
                "$('#AddNewRow').click(function () { \n \n " +
                'if (MaxRows_Count < Wanted_Max_Rows) { \n' +
                "var div = $('." + TBody_ClassName + "').closest('tbody'); \n" +
                'div.append(' + "'" + ColumnsCreatingForJs() + "'" + '); \n' +
                "NumberOfRows++; \n" +
                "MaxRows_Count++; \n" +
                "} \n " +
                "else { \n" +
                '$("#AddNewRow").html("Max reached"); \n' +
                '$("#AddNewRow").addClass("disabled"); \n' +
                '} \n \n' +
                "}); \n \n \n " +
                "// Click event when clicking on Delete Button" + "\n" +
                "$('#DelRow').click(function () { \n \n " +
                "var childrens = $('." + TBody_ClassName + "').children('." + Tr_ClassName + "'); \n \n " +
                "if (childrens.length > 1) { \n " +
                "$(childrens.last()).remove(); \n " +
                "NumberOfRows--; \n " +
                "MaxRows_Count--; \n " +
                '$("#AddNewRow").html(' + '"' + AddButtonName + '"' + '); \n ' +
                '$("#AddNewRow").removeClass("disabled"); \n \n' +
                "} \n " +
                "}); \n " +
                "}); \n ";

            $("#JS_Code").text(All_JS_Source);
            $("#HTML_Code").text(HTML_Main_Table_Tag_ToSend);
            $("#Repeat_Section_Source").removeClass('d-none');

        }
    });
    //#endregion

});


// فنشكن لإنشاء أعمدة الجدول html
function ColumnsCreating() {
    var Columns_HTML = "";

    for (let i = 0; i < NumberOfColumns; i++) {
        Columns_HTML = Columns_HTML + '<th class="text-center text-white bg-secondary">Your Column Name</th> \n';
    }

    return Columns_HTML
}

// فنكشن لإنشاء الصف كامل (ينشئ عمود جنب عمود) 
function MainRowCreating() {
    var MainRow_HTML = "";

    for (let i = 0; i < NumberOfColumns; i++) {
        MainRow_HTML = MainRow_HTML + '<td class="text-center">' +
            '<input type="text" id="YourColumnName0" name="' + ControllerObjectName + '[0].YouClumnName" class="form-control text-center"/> \n' +
            '</td>';
    }

    return MainRow_HTML
}

// فنشكن لإنشاء الصفوف عند ضغط (إضافة) وتخزينها في متغير إظهار سورس كود الجافاسكربت فقط
function ColumnsCreatingForJs() {

    var Td_Columns_HTML_For_Showing_Js = "";
    var Full_Tr_Columns_HTML_For_Showing_Js = "";

    for (let i = 0; i < NumberOfColumns; i++) {
        Td_Columns_HTML_For_Showing_Js = Td_Columns_HTML_For_Showing_Js + '<td class="text-center"><input type="text" id="YourColumnName' + `' + ${'NumberOfRows'} + '` +'" name="' + ControllerObjectName + '[' + `' + ${'NumberOfRows'} + '` +'].YouClumnName" class="form-control text-center" /></td>';
    }

    Full_Tr_Columns_HTML_For_Showing_Js = '<tr class="' + Tr_ClassName + '" id = "' + Tr_IDName + '" >' + Td_Columns_HTML_For_Showing_Js + '</tr>';

    return Full_Tr_Columns_HTML_For_Showing_Js
}

// فنشكن زر إضافة صف جديد لإختبار الريبيت سيكشن المنشأ والظاهر بالصفحة فقط
function AddRepeatSectionRow() {

    // شرط إذا تم تحديد عدد الصفوف ،، يدخل في شرط عمليات الريبيت سيكشن لإضافة الصفوف المحدودة بحد أعلى
    if (MaxRows != 0) {
        if (NumberOfRows < MaxRows) {
            var HTML_REPEAT_MAX = "";

            for (let j = 0; j < NumberOfColumns; j++) {
                var div = $('.' + TBody_ClassName + '').closest('tbody');
                HTML_REPEAT_MAX = HTML_REPEAT_MAX + '<td class="text-center"><input type="text" id="YourColumnName' + NumberOfRows + '" name="' + ControllerObjectName + '[' + NumberOfRows + '].YouClumnName" class="form-control text-center"/></td>';
            }
            div.append('<tr class="' + Tr_ClassName + '" id="' + Tr_IDName + '">' + HTML_REPEAT_MAX + '</tr>');
            NumberOfRows++;
            HTML_REPEAT_MAX = "";
        }

        else {
            $("#AddNewRow").html("Max reached");
            $("#AddNewRow").addClass("disabled");
        }
    }

    //  إذا لم يتم تحديد صفوف ،، يدخل في شرط عمليات الريبيت سيكشن لإضافة الصفوف الغير محدودة بحد أعلى 
    else {

        var HTML_REPEAT = "";
        for (let j = 0; j < NumberOfColumns; j++) {
            var div = $('.' + TBody_ClassName + '').closest('tbody');
            HTML_REPEAT = HTML_REPEAT + '<td class="text-center"><input type="text" id="YourColumnName' + NumberOfRows + '" name="' + ControllerObjectName + '[' + NumberOfRows + '].YouClumnName" class="form-control text-center"/></td>';
        }
        div.append('<tr class="' + Tr_ClassName + '" id="' + Tr_IDName + '">' + HTML_REPEAT + '</tr>');

    }

}

// فنشكن لزر حذف الصف لإختبار الريبيت سيكشن المنشأ والظاهر بالصفحة فقط
function DeleteRepeatSectionRow() {

    var childrens = $('.' + TBody_ClassName + '').children("." + Tr_ClassName + "");

    if (childrens.length > 1) {
        $(childrens.last()).remove();
        NumberOfRows--;
        $("#AddNewRow").html(AddButtonName);
        $("#AddNewRow").removeClass("disabled");
    }

}

// فنكشن لنسخ أكواد الجافاسكربت
function CopyJSToClipboard() {

    var copyText = document.getElementById("JS_Code").textContent;
    var textArea = document.createElement('textarea');
    textArea.textContent = copyText;
    document.body.append(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.classList.add("d-none");

}

// فنكشن لنسخ أكواد الجدول HTML
function CopyHTMLToClipboard() {

    var copyText = document.getElementById("HTML_Code").textContent;
    var textArea = document.createElement('textarea');
    textArea.textContent = copyText;
    document.body.append(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.classList.add("d-none");

}