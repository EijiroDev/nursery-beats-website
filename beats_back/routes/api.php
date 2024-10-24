<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//AUTH CONTROLLER => FOR LOGIN IN, SIGN UP, IMAGE UPLOAD, ETC DONT PUT ANYTHING ELSE HERE ASIDE FROM THAT
Route::prefix('auth')->as('auth')->controller(AuthController::class)->group(function () {

    Route::post('/loginAccount', 'loginAccount');
    Route::post('/registerAccount', 'registerAccount');
    Route::post('/forgotPassword', 'forgotPassword');

    Route::post('/uploadProfile', 'uploadProfile');
    Route::post('/getDownloadURL', 'getDownloadURL');

});

//ADMIN CONTROLLER => FOR ALL ADMIN CAPABILITIES NO OTHER ROLES HERE ASIDE FROM ADMIN
Route::prefix('admin')->as('admin')->controller(AdminController::class)->group(function () {

    Route::get('/fetchAdminInfo/{uid}', 'fetchAdminInfo');
    Route::get('/fetchUsers', 'fetchUsers');

    Route::post('/editUserAccount', 'editUserAccount');
    Route::post('/addTeacherAccount', 'addTeacherAccount');
    Route::delete('/removeUser/{id}', 'removeUser');
    Route::put('/updateUser/{userID}', 'updateUser');

    //temporary
    Route::post('/addAdmin', 'addAdmin');

});

//TEACHER CONTROLELR => FOR ALL TEACHER CAPABILITIES NO OTHER ROLES HERE ASIDE FROM TEACHER
Route::prefix('teacher')->as('teacher')->controller(TeacherController::class)->group(function () {

    //fetching the current logged in user details
    Route::get('/fetchTeacherAccountDetails/{uid}', 'fetchTeacherAccountDetails');
    Route::get('/fetchStudents', 'fetchStudents');
    Route::get('/fetchAllStudentsProgress', 'fetchAllStudentsProgress');
    Route::delete('/removeStudent/{studentID}', 'removeStudent');

    Route::post('/updateMyProfile', 'updateMyProfile');


});

//STUDEN CONTROLLER => FOR ALL STUDENT  STUFF
Route::prefix('student')->as('student')->controller(StudentController::class)->group(function () {

    Route::get('/fetchMyDetails/{uid}', 'fetchMyDetails');

    Route::post('/updateMyProfile', 'updateMyProfile');

});
