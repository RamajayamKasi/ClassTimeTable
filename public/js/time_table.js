// Open Modal
$(document).on("click", "#AddTimeTableData", function (e) {
    openTimeTableModal("Add Time Table", "Save");
});

// Change the modal text and title
function openTimeTableModal(title, buttontext) {
    $("#classTimeTableTitle").text(title);
    if (title.toLowerCase().includes("teacher")) {
        $(
            "#view_final_time_table,#create_time_table_fields,#add_subject_teacher_name"
        ).hide();
        $("#add_subject_teacher_fields").show();
    } else if (buttontext == "hidden") {
        $(
            "#save_update_time_table,#create_time_table_fields,#add_subject_teacher_fields"
        ).hide();
        $("#view_final_time_table,#add_subject_teacher_name").show();
        $("#adjustModalWidth").removeClass("modal-lg").addClass(" modal-xl");
    } else {
        $(".all_action_time_table").attr("id", "save_update_time_table");
        $(
            "#view_final_time_table,#add_subject_teacher_fields,#add_subject_teacher_name"
        ).hide();
        $("#adjustModalWidth").removeClass("modal-xl").addClass(" modal-lg");
        $("#save_update_time_table,#create_time_table_fields").show();
        $("#save_update_time_table").text(buttontext);
    }

    $("#classTimeTableModal").modal("show");
}

// No of breaks selection
$(document).on("change", "#no_of_breaks", function (e) {
    let value = $(this).val();
    if (value > 0) {
        prepareBreakContent(value);
    } else {
        $("#display_break_fields").html("");
    }
});

// render the break field;
function prepareBreakContent(breakNo) {
    let row = $(".break_fields").length + 1;
    let content = "";
    if (row > 3) {
        swal.fire({
            icon: "error",
            text: "The break is minimum three, so more the three not able to add row.",
            allowOutsideClick: false,
        });
        return false;
    }
    content += `<div class="row">
        <div class="col-6 mt-2">
            <p>Break after the period:</p>
        </div>
        <div class="col-6 mt-2">
            <p>Duration of this break(in mins):</p>
        </div>
    </div>`;
    for (i = 0; i < breakNo; i++) {
        content += `<div class="row break_fields">
            <div class="col-6 mt-2">
                <input type="number" id="break_after_period_${i}" class="break_after_period form-control rounded w-100" name="break_after_period" placeholder="Enter the break after period.">
            </div>
            <div class="col-6 mt-2">
                <input type="number" id="break_duration_${i}" class="break_duration form-control rounded w-100" name="break_duration" placeholder="Enter the break duration.">
            </div>
        </div>`;
    }

    $("#display_break_fields").html(content);
}

// Save the time table
$(document).on("click", "#save_update_time_table", function (e) {
    let class_name = $("#class_name").val().trim();
    let days = $("#days option:selected").val();
    let periods = $("#periods").val().trim();
    let start_time = $("#start_time").val().replaceAll(":00", "").trim();
    let duration = $("#duration").val().trim();
    let no_of_breaks = $("#no_of_breaks  option:selected").val();
    let lunch = $("#lunch").val();
    let lunch_after_period = $("#lunch_after_period").val().trim();
    let lunch_duration = $("#lunch_duration").val().trim();
    let status = $("#status option:selected").val();
    let ctt_id = $(this).attr("ctt_id");

    let break_after_period_validation = [],
        break_duration_validation = [],
        break_fields_period = [];
    let break_fields_value = [];
    if (no_of_breaks > 0) {
        break_after_period_validation = $(".break_fields")
            .map(function () {
                if ($(this).find(".break_after_period").val() == "") {
                    return $(this).find(".break_after_period").attr("id");
                }
            })
            .get();
        break_duration_validation = $(".break_fields")
            .map(function () {
                if ($(this).find(".break_duration").val() == "") {
                    return (duration = $(this)
                        .find(".break_duration")
                        .attr("id"));
                }
            })
            .get();

        break_fields_period = $(".break_fields")
            .map(function () {
                if (
                    parseInt($("#periods").val()) <
                    parseInt($(this).find(".break_after_period").val())
                ) {
                    return $(this).find(".break_after_period").attr("id");
                }
            })
            .get();

        if ($(".break_fields").length != 0) {
            for (i = 0; i < $(".break_fields").length; i++) {
                break_fields_value.push({
                    key: i,
                    period: $("#break_after_period_" + i)
                        .val()
                        .trim(),
                    duration: $("#break_duration_" + i)
                        .val()
                        .trim(),
                });
            }
        }
        break_enum = "yes";
    }

    if (class_name == "") {
        swal.fire({
            icon: "error",
            text: "Kindly enter the class name.",
            didClose: () => {
                $("#class_name").focus();
            },
            allowOutsideClick: false,
        });
    } else if (days == "") {
        swal.fire({
            icon: "error",
            text: "Kindly enter the days.",
            didClose: () => {
                $("#days").focus();
            },
            allowOutsideClick: false,
        });
    } else if (periods == "") {
        swal.fire({
            icon: "error",
            text: "Kindly enter the periods.",
            didClose: () => {
                $("#days").focus();
            },
            allowOutsideClick: false,
        });
        $("#periods").focus();
    } else if (start_time == "") {
        swal.fire({
            icon: "error",
            text: "Kindly enter the start time.",
            didClose: () => {
                $("#start_time").focus();
            },
            allowOutsideClick: false,
        });
    } else if (duration == "") {
        swal.fire({
            icon: "error",
            text: "Kindly enter the duration.",
            didClose: () => {
                $("#duration").focus();
            },
            allowOutsideClick: false,
        });
    } else if (duration > 60) {
        swal.fire({
            icon: "error",
            text: "The duration is not greater then 60.",
            didClose: () => {
                $("#duration").focus();
            },
            allowOutsideClick: false,
        });
    } else if (no_of_breaks > 0 && break_after_period_validation.length != 0) {
        swal.fire({
            icon: "error",
            text:
                "Kindly enter the " +
                break_after_period_validation[0].replaceAll("_", " ") +
                ".",
            didClose: () => {
                $("#" + break_after_period_validation[0]).focus();
            },
            allowOutsideClick: false,
        });
    } else if (no_of_breaks > 0 && break_duration_validation.length != 0) {
        swal.fire({
            icon: "error",
            text:
                "Kindly enter the " +
                break_duration_validation[0].replaceAll("_", " ") +
                ".",
            didClose: () => {
                $("#" + break_duration_validation[0]).focus();
            },
            allowOutsideClick: false,
        });
    } else if (no_of_breaks > 0 && break_fields_period.length != 0) {
        swal.fire({
            icon: "error",
            text: "Break after period is not greater then periods.",
            didClose: () => {
                $("#" + break_fields_period[0]).focus();
            },
            allowOutsideClick: false,
        });
    } else if (lunch == "yes" && lunch_after_period == "") {
        swal.fire({
            icon: "error",
            text: "Kindly enter the lunch after period.",
            didClose: () => {
                $("#lunch_after_period").focus();
            },
            allowOutsideClick: false,
        });
    } else if (lunch == "yes" && lunch_duration == "") {
        swal.fire({
            icon: "error",
            text: "Kindly enter the lunch duration.",
            didClose: () => {
                $("#lunch_duration").focus();
            },
            allowOutsideClick: false,
        });
    } else if (lunch_duration > 60) {
        swal.fire({
            icon: "error",
            text: "The lunch duration is not greater then 60.",
            didClose: () => {
                $("#lunch_duration").focus();
            },
            allowOutsideClick: false,
        });
    } else {
        $(".layeout").show();
        $.ajax({
            type: "post",
            url: "store_class_time_table",
            data: {
                class_name,
                days,
                periods,
                start_time,
                duration,
                lunch,
                lunch_duration,
                break_fields_value,
                no_of_breaks,
                status,
                ctt_id,
                lunch_after_period,
            },
            success: function (response) {
                if (response["status"] == 1) {
                    swal.fire({
                        icon: "success",
                        text: response["message"],
                        allowOutsideClick: false,
                    });
                    let content = displayTimeTableDetails(
                        response["data"],
                        response["type"],
                    );
                    if(response["type"]=='add'){
                        if ($(".class_time_table_cards_view").length == 0) {
                            $("#TimeTableView").html(content);
                        } else {
                            $("#TimeTableView").append(content);
                        }
                    }else{
                        $("#class_tima_table_"+ctt_id).html(content);
                    }

                    $("#classTimeTableModal").modal("hide");
                    resetTimeTableFields();
                    $(".layeout").hide();
                } else {
                    swal.fire({
                        icon: "error",
                        text: response["message"],
                        allowOutsideClick: false,
                    });
                }
            },
        });
    }
});

//  fetch the time table data
function FetchTimeTableDetails() {
    $(".layeout").show();
    $.ajax({
        type: "post",
        url: "get_class_time_table",
        success: function (response) {
            $(".layeout").hide();
            if (response.length != 0) {
                $("#TimeTableView").html("");
                response.forEach((data, index) => {
                    $("#TimeTableView").append(displayTimeTableDetails(data));
                });
            } else {
                $("#TimeTableView").html(
                    '<div class="col-12">No class time table is found.</div>'
                );
            }
        },
    });
}

FetchTimeTableDetails();

// Display the time table details

function displayTimeTableDetails(data, type = "add") {
    let break_content = data.break > 0 ? ", with 2 breaks and a" : "";
    let lunch_content =
        data.lunch == "yes" ? " 30-minute lunch after the 4th period" : "";
    let content = "";
    if (type == "add") {
        content += `<div class="col-3 class_time_table_cards_view" id="class_tima_table_${data.ctt_id}">`;
    }
    content += `<div class="card">
            <div class="card-header" style="font-weight: bolder;">Class Name : ${
                data.class_name
            }</div>
            <div class="card-body">
            <p class="card-text" style="text-align: justify;">
                Class ${data.class_name} has ${data.days} days, ${
        data.periods
    } periods per day, starting at ${data.start_time.replaceAll(
        ":00",
        ""
    )}. Each period is ${
        data.duration
    } minutes ${break_content} ${lunch_content}.
            </p><hr class="mt-2 pt-2 pb-2">`;
    if (data.status == "active") {
        content += `<div class="action_group d-flex gap-4 justify-content-center">
                                <button ctt_id="${data.ctt_id}" class="edit_class_time_table btn btn-success"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button ctt_id="${data.ctt_id}" class="view_class_time_table btn btn-info text-white"><i class="fa-solid fa-eye"></i></button>
                                <button ctt_id="${data.ctt_id}" class="delete_class_time_table btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                            </div>`;
    } else {
        content += `<div class="action_group d-flex gap-4 justify-content-center  mt-2 pt-2 pb-2">
                                <button ctt_id="${data.ctt_id}" class="restore_class_time_table btn btn-success"><i class="fa-solid fa-trash-can-arrow-up"></i></button>
                            </div>`;
    }
    content += `</div> 
                    </div>
                </div>
            </div>`;
    if (type == "add") {
        content += `</div>`;
    }
    return content;
}

// Delete the class time table
$(document).on("click", ".delete_class_time_table", function (e) {
    let ctt_id = $(this).attr("ctt_id");
    $(".layeout").show();
    $.ajax({
        type: "post",
        url: "delete_class_time_table",
        data: { ctt_id },
        success: function (response) {
            $(".layeout").hide();
            if (response["status"] == 1) {
                swal.fire({
                    icon: "success",
                    text: response["message"],
                    allowOutsideClick: false,
                });
                FetchTimeTableDetails();
            } else {
                swal.fire({
                    icon: "error",
                    text: response["message"],
                    allowOutsideClick: false,
                });
            }
        },
    });
});

// Restore the class time table
$(document).on("click", ".restore_class_time_table", function (e) {
    let ctt_id = $(this).attr("ctt_id");
    $(".layeout").show();
    $.ajax({
        type: "post",
        url: "restore_class_time_table",
        data: { ctt_id },
        success: function (response) {
            $(".layeout").hide();
            if (response["status"] == 1) {
                swal.fire({
                    icon: "success",
                    text: response["message"],
                    allowOutsideClick: false,
                });
                FetchTimeTableDetails();
            } else {
                swal.fire({
                    icon: "error",
                    text: response["message"],
                    allowOutsideClick: false,
                });
            }
        },
    });
});

// Edit the class time table
$(document).on("click", ".edit_class_time_table", function (e) {
    let ctt_id = $(this).attr("ctt_id");
    $.ajax({
        type: "post",
        url: "get_class_time_table",
        data: { ctt_id },
        success: function (response) {
            resetTimeTableFields();
            let res = response[0];
            $("#class_name").val(res.class_name);
            $("#days").val(res.days).trigger("change");
            $("#periods").val(res.periods);
            $("#start_time").val(res.start_time);
            $("#duration").val(res.duration);
            $("#no_of_breaks").val(res.break).trigger("change");
            $("#lunch").val("yes").trigger("change");
            $("#lunch_after_period").val(res.lunch_after_period);
            $("#lunch_duration").val(res.lunch_duration);
            $("#status").val("active");
            $(".all_action_time_table").attr("ctt_id", res.ctt_id);
            let break_data = [];
            if (res.break > 0) {
                try {
                    break_data = JSON.parse(res.break_data);
                    break_data.forEach((data, index) => {
                        $("#break_after_period_" + data.key).val(data.period);
                        $("#break_duration_" + data.key).val(data.duration);
                    });
                } catch (error) {
                    console.log(error);
                }
            }
            openTimeTableModal("Update Time Tabel", "Update");
        },
    });
});

// Restore the class time table
$(document).on("click", ".view_class_time_table", function (e) {
    let ctt_id = $(this).attr("ctt_id");
    $(".layeout").show();
    $.ajax({
        type: "post",
        url: "get_class_time_table",
        data: { ctt_id },
        success: function (response) {
            $(".layeout").hide();
            openTimeTableModal("View Time Table", "hidden");
            $("#view_final_time_table").html(
                '<h3 class="text-center h3">Class Name '+response[0].class_name+'</h3>'+
                '<div class="col-12">' +
                    prepareTimeTable(response[0]) +
                    "</div>"
            );
            let subject_teacher_name = response[0].subject_teacher_name;
            if (
                subject_teacher_name != "" &&
                subject_teacher_name != null &&
                subject_teacher_name != undefined
            ) {
                try {
                    subject_teacher_name = JSON.parse(subject_teacher_name);
                    subject_teacher_name.forEach((data, index) => {
                        if (data.value != "") {
                            $("#" + data.id).text(data.value);
                        }
                    });
                } catch (erro) {
                    console.log(error);
                }
            }
            $(".all_action_time_table").attr("ctt_id", ctt_id);
            $("#time_table_list_view").DataTable({
                dom: "B", // Define where the buttons will appear
                buttons: [
                    "copy", // Copy to clipboard
                    "csv", // Export as CSV
                    "excel", // Export as Excel
                    "pdf", // Export as PDF
                    "print", // Print table
                ],
                autoWidth: false,
                paging: false, // Enable pagination (optional)
                searching: false, // Enable search (optional)
                ordering: false,
                rowCallback: function (row, data, index) {
                    $(row).find(".setRowSpan").attr("rowspan", 2);
                    const $cells = $(row).find("td");
                    if (index % 2 != 0) {
                        // Remove the last <td> for rows with an odd number (1-based index)
                        $cells.last().remove();
                    }
                },
            });
        },
    });
});

// Prepare time table
var period_start = "";
function prepareTimeTable(time_table_data) {
    period_start = time_table_data.start_time.replaceAll(":00", "");
    let daysName = [
        "Days",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thirsday",
        "Friday",
        "Saturday",
        "Sunday",
    ];
    let daysSet = 0,
        index = 0,
        setId = "subject";
    let lunch_count = time_table_data.lunch == "yes" ? 1 : 0;
    let no_of_breaks = time_table_data.break;
    let break_data = [],
        breakPeriodsData = [],
        breakPeriodsDurationDat = {};
    if (no_of_breaks > 0) {
        try {
            break_data = JSON.parse(time_table_data.break_data);
            break_data.forEach((data, index) => {
                breakPeriodsData.push(parseInt(data.period));
                breakPeriodsDurationDat[data.period] = data.duration;
            });
        } catch (error) {
            console.log(error);
        }
    }
    let timeTableContent =
        "<table id='time_table_list_view' class='mt-3 table table-striped table-bordered table-hover'>";
    for (d = 0; d < time_table_data.days + time_table_data.days; d++) {
        if (d == 0) {
            timeTableContent += "<thead>";
        }
        if (d == 1) {
            timeTableContent += "<tbody>";
        }
        timeTableContent += "<tr>";
        for (
            p = 0;
            p < time_table_data.periods + lunch_count + no_of_breaks;
            p++
        ) {
            if (p == 0 && daysSet == 0) {
                if (d > 0) {
                    timeTableContent +=
                        "<td class='setRowSpan'>" + daysName[index] + "</td>";
                } else {
                    timeTableContent +=
                        "<td class='text-center' style='line-height: 4;'>1" +
                        daysName[index] +
                        "</td>";
                }
            }
            if (p == 0 && daysSet == 1) {
                timeTableContent += `<td></td>`;
            }
            if (d == 0) {
                if (
                    breakPeriodsData.length != 0 &&
                    breakPeriodsData.includes(p)
                ) {
                    timeTableContent += `<td  class='text-center'>Break ${
                        p + 1
                    } <br> ${period_start} to ${FindPeriodTime(
                        period_start,
                        breakPeriodsDurationDat[p]
                    )}</td>`;
                } else if (
                    lunch_count == 1 &&
                    time_table_data.lunch_after_period == p
                ) {
                    timeTableContent += `<td  class='text-center'>Lunch ${
                        p + 1
                    } <br> ${period_start} to ${FindPeriodTime(
                        period_start,
                        time_table_data.lunch_duration
                    )}</td>`;
                } else {
                    timeTableContent += `<td  class='text-center'>Period ${
                        p + 1
                    } <br> ${period_start} to ${FindPeriodTime(
                        period_start,
                        time_table_data.duration
                    )}</td>`;
                }
            } else {
                if (
                    lunch_count == 1 &&
                    time_table_data.lunch_after_period == p
                ) {
                    timeTableContent += `<td></td>`;
                } else if (
                    breakPeriodsData.length != 0 &&
                    breakPeriodsData.includes(p)
                ) {
                    timeTableContent += `<td></td>`;
                } else {
                    timeTableContent += `<td class='SetSubjectAndTeacher' id='${setId}_${
                        d + "_" + p
                    }'></td>`;
                }
            }
        }
        if (d > 0) {
            daysSet++;
        }
        if (daysSet == 2) {
            daysSet = 0;
            index++;
        }
        if (d == 0) {
            index++;
        }
        if (setId == "teacher") {
            setId = "subject";
        } else if (setId == "subject") {
            setId = "teacher";
        }

        timeTableContent += "</tr>";
        if (d == 0) {
            timeTableContent += "</thead>";
        }
    }
    timeTableContent += "</body></table>";

    return timeTableContent;
}

// Calculate time
function FindPeriodTime(time, duration) {
    let [hour, min] = time.split(":").map(Number);
    let minCalculate = parseInt(min) + parseInt(duration);
    if (minCalculate >= 60) {
        hour++;
        min = minCalculate - 60;
    } else {
        min = minCalculate;
    }
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    hour = hour > 23 ? "00" : hour;
    period_start = hour + ":" + min;
    return period_start;
}

// Set subject and teacher name
// $(document).on("click", ".SetSubjectAndTeacher", function (e) {
//     let id =
//         $(this).attr("id") != undefined && $(this).attr("id") != ""
//             ? $(this).attr("id")
//             : "";
//     if (id != "") {
//         Swal.fire({
//             title:'Add subject And Teacher',
//             html: `<div class="text-start">
//                 <label for="subject_name" class="mt-2">Subject Name: </label>
//                 <input id="subject_name" class="form-control rounded w-100" type="text" name="subject_name" placeholder="Enter the subject name.">
//                 <label for="teacher_name" class="mt-2">Teacher Name: </label>
//                 <input id="teacher_name" class="form-control rounded w-100" type="text" name="teacher_name" placeholder="Enter the teacher name.">
//             </div>
//             `,
//             allowOutsideClick: false,
//             preConfirm: () => {
//                 const subjectName = document.getElementById('subject_name').value;
//                 const teacherName = document.getElementById('teacher_name').value;

//                 if (!subjectName || !teacherName) {
//                     Swal.showValidationMessage('Please fill out both fields!');
//                     return false;
//                 }

//                 return { subjectName, teacherName };
//             },
//             width:'40%',
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 console.log('User Input:', result.value);
//             }
//         });
//     }
// });

$(document).on("click", "#add_subject_teacher_name", function (e) {
    swal.fire({
        icon: "info",
        text: "In the timetable view, subjects and teacher names can be directly entered.",
        allowOutsideClick: false,
    });
    $(".SetSubjectAndTeacher").attr("contenteditable", true);
    $(this).hide();
    $(".all_action_time_table").attr("id", "save_subject_teacher");
    $(".all_action_time_table").show();
});

// Save the subject and teacher name
$(document).on("click", "#save_subject_teacher", function (e) {
    let subjectTeacherName = $(".SetSubjectAndTeacher")
        .map(function (items) {
            if ($(this).text().trim() != "") {
                return [{ id: $(this).attr("id"), value: $(this).text() }];
            }
        })
        .get();
    let ctt_id = $(this).attr("ctt_id");
    $(".layeout").show();
    $.ajax({
        type: "post",
        url: "save_subject_teacher",
        data: { ctt_id, subjectTeacherName },
        success: function (response) {
            $(".layeout").hide();
            if (response["status"] == 1) {
                swal.fire({
                    icon: "success",
                    text: response["message"],
                    allowOutsideClick: false,
                });
                $(".all_action_time_table").attr(
                    "id",
                    "save_update_time_table"
                );
                $(".all_action_time_table").hide();
                $(".SetSubjectAndTeacher").attr("contenteditable", false);
                $("#add_subject_teacher_name").show();
            } else {
                swal.fire({
                    icon: "error",
                    text: response["message"],
                    allowOutsideClick: false,
                });
            }
        },
    });
});

// Reset the time table fields
function resetTimeTableFields() {
    $("#class_name").val("");
    $("#days").val("1");
    $("#periods").val("");
    $("#start_time").val("");
    $("#duration").val("");
    $("#no_of_breaks").val("0");
    $("#lunch").val("yes");
    $("#lunch_after_period").val("");
    $("#lunch_duration").val("");
    $("#status").val("active");
    $("#display_break_fields").html("");
    $(".all_action_time_table").removeAttr("ctt_id");
}

$(".layeout").hide();
