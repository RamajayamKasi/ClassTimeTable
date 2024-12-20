<?php

namespace App\Http\Controllers;

use App\Models\ClassTimeTableModal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Mockery\Undefined;

class ClassTimeTableController extends Controller
{
    public function index()
    {
        return view('time_table');
    }

    public function store_class_time_table(Request $request)
    {
        $class_name = $request->class_name;
        $days = $request->days;
        $periods = $request->periods;
        $start_time = $request->start_time;
        $duration = $request->duration;
        $no_of_breaks = $request->no_of_breaks;
        $lunch = $request->lunch;
        $lunch_duration = $request->lunch_duration;
        $break_fields_value = $request->break_fields_value;
        $status = $request->status;
        $lunch_after_period = $request->lunch_after_period;

        $ctt_id = isset($request->ctt_id) ? $request->ctt_id : '';

        $request->validate([
            'class_name' => 'required|string|max:255',
            'days' => 'required|string',
            'periods' => 'required|integer',
            'start_time' => 'required|date_format:H:i',
            'duration' => 'required|integer|min:1',
        ], [
            'class_name.required' => 'Kindly enter the class name.',
            'days.required' => 'Kindly enter the days.',
            'periods.required' => 'Kindly enter the periods.',
            'periods.integer' => 'Periods must be a number.',
            'start_time.required' => 'Kindly enter the start time.',
            'start_time.date_format' => 'Start time must be in the format HH:MM.',
            'duration.required' => 'Kindly enter the duration.',
            'duration.integer' => 'Duration must be a number.',
            'duration.min' => 'Duration must be at least 1.',
        ]);

        if ($duration > 60) {
            return response()->json(['status' => 0, 'message' => 'The duration is not greater then 60.']);
        }

        if ($lunch == 'yes' && $lunch_duration == '') {
            return response()->json(['status' => 0, 'message' => 'Kindly enter the lunch duration.']);
        }
        if ($lunch == 'yes' && $lunch_after_period == '') {
            return response()->json(['status' => 0, 'message' => 'Kindly enter the lunch after period.']);
        }
        if ($lunch == 'yes' && $lunch_duration > 60) {
            return response()->json(['status' => 0, 'message' => 'The lunch duration is not greater then 60.']);
        }

        $data = array('user_id' => Auth::user()->id, 'class_name' => $class_name, 'days' => $days, 'periods' => $periods, 'start_time' => $start_time, 'duration' => $duration, 'break' => $no_of_breaks, 'break_data' => json_encode($break_fields_value), 'lunch' => $lunch, 'lunch_after_period' => $lunch_after_period, 'lunch_duration' => $lunch_duration, 'status' => $status);
        if ($ctt_id == '') {
            $inserted_id = ClassTimeTableModal::insertGetId($data);
            return response()->json(['status' => 1, 'message' => 'Class time table data added successfully.', 'id' => $inserted_id]);
        } else {
            ClassTimeTableModal::where('ctt_id', $ctt_id)->where('user_id', '=',Auth::user()->id)->update($data);
            return  response()->json(['status' => 1, 'message' => 'Class time table data update successfully.', 'id' => $ctt_id]);
        }
    }

    public function get_class_time_table(Request $request)
    {
        $ctt_id = isset($request->ctt_id) ? $request->ctt_id : '';
        if ($ctt_id == '') {
            return ClassTimeTableModal::where('user_id', '=',Auth::user()->id)->orderBy('ctt_id', 'ASC')->orderBy('status', 'ASC')->get();
        } else {
            return ClassTimeTableModal::where('ctt_id', '=', $ctt_id)->where('user_id', '=',Auth::user()->id)->get();
        }
    }

    public function delete_class_time_table(Request $request)
    {
        $ctt_id = isset($request->ctt_id) ? $request->ctt_id : '';
        if ($ctt_id != '') {
            $status = ClassTimeTableModal::where('ctt_id', '=', $ctt_id)->where('user_id', '=',Auth::user()->id)->update(['status' => 'inactive']);
            return response()->json(['status' => $status, 'message' => 'Class time table deleted successfully.']);
        } else {
            return response()->json(['status' => 0, 'message' => 'Class time table not deleted. Please contact admin.']);
        }
    }

    public function restore_class_time_table(Request $request)
    {
        $ctt_id = isset($request->ctt_id) ? $request->ctt_id : '';
        if ($ctt_id != '') {
            $status = ClassTimeTableModal::where('ctt_id', '=', $ctt_id)->where('user_id', '=',Auth::user()->id)->update(['status' => 'active']);
            return response()->json(['status' => $status, 'message' => 'Class time table restored successfully.']);
        } else {
            return response()->json(['status' => 0, 'message' => 'Class time table not restored. Please contact admin.']);
        }
    }

    public function save_subject_teacher(Request $request)
    {
        $ctt_id = isset($request->ctt_id) ? $request->ctt_id : '';
        $subjectTeacherName = isset($request->subjectTeacherName) ? json_encode($request->subjectTeacherName): '';

        if ($ctt_id != '' && $subjectTeacherName!='') {
            $status = ClassTimeTableModal::where('ctt_id', '=', $ctt_id)->where('user_id', '=',Auth::user()->id)->update(['subject_teacher_name' => $subjectTeacherName]);
            return response()->json(['status' => $status, 'message' => 'Class time table subject and teacher data added successfully.']);
        } else {
            return response()->json(['status' => 0, 'message' => 'Class time table subject and teacher data is not added. Please contact admin.']);
        }
    }
}