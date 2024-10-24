<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase\Contract\Database;
use Kreait\Laravel\Firebase\Facades\Firebase;

class TeacherController extends Controller
{
    protected $database;
    protected $auth;
    protected $storage;

    protected $femaleTeacherDefaultImage = "https://storage.googleapis.com/nursery-beats-web.appspot.com/profiles/teacher.png?GoogleAccessId=firebase-adminsdk-fjia5%40nursery-beats-web.iam.gserviceaccount.com&Expires=32503680000&Signature=t3OQ3TVOqHKmOlXE2X94CkZmH7P6vyd7LlqRwdsfQbrQ0nLPYn5wRN9VlKjAvJQvwtVSG8LZacDyCVqFzoHb2Y312PbJyxwJvVw53j2BhRfGR2yifW5d0eJFWCf8zxs7iT%2FBNhgmXw14ZfwUxA8ki0VS8I2AL1AIrUvlQB%2BuGox3eYLPLvatR3RqBJVHvC7P4XDioOKKZEg%2F3M04J%2B6kRjb8a8Xpx9RSnq7APVvoNogz4c6jFxmUS%2B9byFVlFjbJSkAFcduZG8C9SOReRgNW3TSVDZhh1GmwhEBmmq5uUp59xA409UgeQ12mCdKcFdY%2B4SSs7obctXLB%2FKE7gjzgLA%3D%3D";

    protected $maleTeacherDefaultImage = "https://storage.googleapis.com/nursery-beats-web.appspot.com/profiles/male_teacher.png?GoogleAccessId=firebase-adminsdk-fjia5%40nursery-beats-web.iam.gserviceaccount.com&Expires=32503680000&Signature=TWkj3avOpTrWlyUF4H8Jt9DaV5ATKYvHQMj%2Bb14XzVBnP4j87uQPDEFgFSAP4ZTP78aGRqUlUSlRF8GYbPrQMrwOBMEwzfMV2g4NVOxIm1%2FtbwJshCB1TWN3Bx%2BjldtPFVeAKKY8qet2H8R%2BdkIEO%2FH227PwiQeuHqNK5cG2LnOwbGA0%2BdokLnf96yL4%2FUBFfnJmhPqtxorFBbGmyGtM2ivhE0ScJ%2BUtbQTllKRaKqQdJHa3skeQCjeWg%2F7qEkRxN%2B%2BnZwCZepnQNDQK%2FTZxLRrhaPoh3OKrgW%2FBaoTNel39e0xqFQ0XwfTC23%2ByaFgzPKVYCxFvta8MZy2QpN82Xw%3D%3D";

    public function __construct(Database $database)
    {
        $this->database = $database;
        $this->auth = Firebase::auth();
        $this->storage = Firebase::storage();
    }

    public function fetchTeacherAccountDetails($uid)
    {
        try {
            $teacherData = [];
            foreach ($this->database->getReference('users')->getSnapshot()->getValue() as $teacherID => $teacherInfo) {
                if ($uid === $teacherID && $teacherInfo['role'] === 'teacher') {
                    $teacherData[] = [
                        'teacherID' => $teacherID,
                        'teacherInfo' => $teacherInfo
                    ];
                }
            }
            return response()->json($teacherData);
        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }

    public function fetchAllStudentsProgress()
    {
        try {
            $allStudentsData = [];
            $students = $this->database->getReference('users')->getSnapshot()->getValue();

            foreach ($students as $studentID => $studentInfo) {
                // Check if the role is student before adding to the response
                if (isset($studentInfo['role']) && $studentInfo['role'] === 'student') {
                    $allStudentsData[] = [
                        'userID' => $studentID,  // Changed from studentID to userID
                        'studentInfo' => [
                            'userName' => $studentInfo['userName'] ?? 'N/A',
                            'firstName' => $studentInfo['firstName'],
                            'lastName' => $studentInfo['lastName'],
                            'email' => $studentInfo['email'], // Add the student's email
                            'shapesProgress' => $studentInfo['shapesProgress'] ?? 0,
                            'lettersProgress' => $studentInfo['lettersProgress'] ?? 0,
                            'numbersProgress' => $studentInfo['numbersProgress'] ?? 0,
                        ],
                    ];
                }
            }

            return response()->json($allStudentsData);
        } catch (\Exception $e) {
            return response($e->getMessage(), 500);
        }
    }

    public function fetchStudents()
    {
        try {
            $studentData = [];
            foreach ($this->database->getReference('users')->getSnapshot()->getValue() as $studentID => $studentInfo) {
                if ($studentInfo['role'] === 'student') {
                    $studentData[] = [
                        'userID' => $studentID,  // Changed from studentID to userID
                        'studentInfo' => $studentInfo
                    ];
                }
            }

            return response()->json($studentData);

        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }

    public function updateMyProfile(Request $request)
    {
        try {
            foreach ($this->database->getReference('users')->getSnapshot()->getValue() as $studentID => $studentInfo) {
                if ($request->uid === $studentID) {
                    $updateStudentInfo = [
                        'firstName' => $request->firstName,
                        'lastName' => $request->lastName,
                        'gender' => $request->gender === 'male' ? 'Male' : 'Female',
                        'defaultProfile' => $request->gender === 'male' ? $this->maleTeacherDefaultImage : $this->femaleTeacherDefaultImage,
                    ];

                    $this->database->getReference('users/' . $studentID)->update($updateStudentInfo);
                }
            }

            $message = 'Updated Successfully!';
            return response(compact('message'));
        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }

    public function removeStudent($studentID)
{
    try {
        // Check if the student exists in the database
        $studentRef = $this->database->getReference('users/' . $studentID);
        $studentSnapshot = $studentRef->getSnapshot();

        if (!$studentSnapshot->exists()) {
            return response()->json(['message' => 'Student not found.'], 404);
        }

        // Remove the student from the Firebase database
        $studentRef->remove();

        // Return success message
        $message = 'Student removed successfully!';
        return response()->json(compact('message'), 200);

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}


}
