<x-app-layout>
    <link rel="stylesheet" href="{{asset('css/time_table.css')}}">



    <div class="py-1">
        <div class="max-w-7xl mx-auto p-2">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <div class="row" id="TimeTableView">
                    </div>            
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="classTimeTableModal" tabindex="-1">
        <div class="modal-dialog modal-lg" id="adjustModalWidth" role="document">
            <div class="modal-content">
            <div class="modal-header p-1 ps-3 pe-3">
                <h5 class="modal-title" id="classTimeTableTitle">Add Time Table</h5>
                <button type="button" class="close h3" data-bs-dismiss="modal">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" style="overflow: auto;max-height: 400px;">
                <div class="row" id="create_time_table_fields">
                    <div class="col-6 mt-2">
                        <label for="class_name">Class Name: </label>
                        <input id="class_name" class="form-control rounded w-100" type="text" name="class_name" placeholder="Enter the class name">
                    </div>
                    <div class="col-6 mt-2">
                        <label for="days">Days: </label>
                        <select name="days" id="days" class=" rounded w-100">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>
                    </div>
                    <div class="col-6 mt-2">
                        <label for="periods">Period: </label>
                        <input id="periods" class="form-control rounded w-100" type="number" name="periods" placeholder="Enter the periods.">
                    </div>
                    <div class="col-6 mt-2">
                        <label for="start_time">Time: </label>
                        <input id="start_time" class="form-control rounded w-100" type="time" name="start_time" placeholder="Enter the start time">
                    </div>
                    <div class="col-6 mt-2">
                        <label for="duration">Duration: </label>
                        <input id="duration" class="form-control rounded w-100" type="number" name="duration" placeholder="Enter the start time">
                    </div>
                    <div class="col-6 mt-2">
                        <label for="no_of_breaks">No of Breaks : </label>
                        <select name="no_of_breaks" id="no_of_breaks" class=" rounded w-100">
                            <option value="">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div class="col-12" id="display_break_fields">
                    </div>
                    <div class="col-6 mt-2">
                        <label for="lunch">Lunch: </label>
                        <select name="lunch" id="lunch" class=" rounded w-100">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div class="col-6 mt-2">
                        <label for="lunch_after_period">Lunch after the period: </label>
                        <input id="lunch_after_period" class="form-control rounded w-100" type="number" name="lunch_after_period" placeholder="Enter the lunch after period.">
                    </div>
                    <div class="col-6 mt-2">
                        <label for="lunch_duration">Lunch Duration: </label>
                        <input id="lunch_duration" class="form-control rounded w-100" type="number" name="lunch_duration" placeholder="Enter the lunch duration.">
                    </div>
                    <div class="col-6 mt-2">
                        <label for="status">Status: </label>
                        <select name="status" id="status" class="rounded w-100">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
                <div class="row" id="view_final_time_table" style="zoom:.8;overflow: auto;width: 101.7%;"></div>
                <div class="row" id="add_subject_teacher_fields">
                    <div class="col-6 mt-2">
                        <label for="subject">Subject Name: </label>
                        <input id="subject" class="form-control rounded w-100" type="text" name="subject" placeholder="Enter the subject name.">
                    </div>
                    <div class="col-6 mt-2">
                        <label for="teacher_name">Teacher Name: </label>
                        <input id="teacher_name" class="form-control rounded w-100" type="text" name="teacher_name" placeholder="Enter the teacher name">
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="add_subject_teacher_name">Add Subject &amp; Teacher</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary all_action_time_table" id="save_update_time_table">Save</button>
            </div>
            </div>
        </div>
    </div>


    <script src="{{asset('js/time_table.js')}}"></script>

</x-app-layout>
