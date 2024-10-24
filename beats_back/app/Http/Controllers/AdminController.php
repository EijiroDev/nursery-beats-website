<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Kreait\Firebase\Contract\Database;
use Kreait\Laravel\Firebase\Facades\Firebase;

class AdminController extends Controller
{
    protected $database;
    protected $auth;
    protected $storage;

    protected $femaleTeacherDefaultImage = "https://storage.googleapis.com/nursery-beats-web.appspot.com/profiles/teacher.png?GoogleAccessId=firebase-adminsdk-fjia5%40nursery-beats-web.iam.gserviceaccount.com&Expires=32503680000&Signature=t3OQ3TVOqHKmOlXE2X94CkZmH7P6vyd7LlqRwdsfQbrQ0nLPYn5wRN9VlKjAvJQvwtVSG8LZacDyCVqFzoHb2Y312PbJyxwJvVw53j2BhRfGR2yifW5d0eJFWCf8zxs7iT%2FBNhgmXw14ZfwUxA8ki0VS8I2AL1AIrUvlQB%2BuGox3eYLPLvatR3RqBJVHvC7P4XDioOKKZEg%2F3M04J%2B6kRjb8a8Xpx9RSnq7APVvoNogz4c6jFxmUS%2B9byFVlFjbJSkAFcduZG8C9SOReRgNW3TSVDZhh1GmwhEBmmq5uUp59xA409UgeQ12mCdKcFdY%2B4SSs7obctXLB%2FKE7gjzgLA%3D%3D";

    protected $maleTeacherDefaultImage = "https://storage.googleapis.com/nursery-beats-web.appspot.com/profiles/male_teacher.png?GoogleAccessId=firebase-adminsdk-fjia5%40nursery-beats-web.iam.gserviceaccount.com&Expires=32503680000&Signature=TWkj3avOpTrWlyUF4H8Jt9DaV5ATKYvHQMj%2Bb14XzVBnP4j87uQPDEFgFSAP4ZTP78aGRqUlUSlRF8GYbPrQMrwOBMEwzfMV2g4NVOxIm1%2FtbwJshCB1TWN3Bx%2BjldtPFVeAKKY8qet2H8R%2BdkIEO%2FH227PwiQeuHqNK5cG2LnOwbGA0%2BdokLnf96yL4%2FUBFfnJmhPqtxorFBbGmyGtM2ivhE0ScJ%2BUtbQTllKRaKqQdJHa3skeQCjeWg%2F7qEkRxN%2B%2BnZwCZepnQNDQK%2FTZxLRrhaPoh3OKrgW%2FBaoTNel39e0xqFQ0XwfTC23%2ByaFgzPKVYCxFvta8MZy2QpN82Xw%3D%3D";

    protected $defaultAdminImage = "https://storage.googleapis.com/nursery-beats-web.appspot.com/profiles/admin.png?GoogleAccessId=firebase-adminsdk-fjia5%40nursery-beats-web.iam.gserviceaccount.com&Expires=32503680000&Signature=fhOQwm0MzhApjroWqrQSJFJUQT90vvB52MXiojBNjjX53Q67Y%2Fbud5cQWsKJvvzqisJcyCs9IDB9eVaJvZ5wWyRhafQbOujD%2BDKwYEBL1pU1qDBHG2Jxksor7DKz8QtByMbnkiui8x7T6iogxjrt1oyDdrnzBw1rYg8rBKjf6kMdBGbk4qeKyC7OBEYPWyafuRAKgDkw8EvryYZ0BTSdouTWEq%2Bm6aAzi%2BvVGrB8mtozmU3QWMqduKmtJW%2BK54X7m0hQgpDyLjsnE6qRQX9wQnGC5fQBL5HhdluLgCeZNFsFuI%2F0Z%2BfFwy7vwWiP6izt0oMJ%2ByCJpUHSUg4UlHfxPQ%3D%3D";

    public function __construct(Database $database)
    {
        $this->database = $database;
        $this->auth = Firebase::auth();
        $this->storage = Firebase::storage();
    }

    public function fetchAdminInfo($uid)
    {
        try {

            $adminData = [];
            foreach($this->database->getReference('users')->getSnapshot()->getValue() as $adminID => $adminInfo) {
                if($uid === $adminID && $adminInfo['role'] === 'admin') {
                    $adminData[] = [
                        'adminID' => $adminID,
                        'adminInfo' => $adminInfo
                    ];
                }
            }

            return response()->json($adminData);

        }catch(\Exception $e) {
            return response($e->getMessage());
        }
    }

    public function fetchUsers()
    {
        try{

            $userData = [];
            foreach($this->database->getReference('users')->getSnapshot()->getValue() as $userID => $userInfo) {
                if ($userInfo['role'] != 'admin') {
                    $userData[] = [
                        'userID' => $userID,
                        'userInfo' => $userInfo
                    ];
                }
            }

            return response()->json($userData);

        }catch(\Exception $e) {
            return response($e->getMessage());
        }
    }

    public function updateUser(Request $request, $userID)
{
    try {
        // Retrieve user reference from Firebase
        $userRef = $this->database->getReference('users/' . $userID);

        if ($userRef->getSnapshot()->exists()) {
            // Update user data
            $userRef->update([
                'firstName' => $request->firstName,
                'lastName'  => $request->lastName,
                'email'     => $request->email,
            ]);

            return response()->json(['message' => 'User updated successfully'], 200);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    } catch (\Exception $e) {
        return response()->json(['message' => $e->getMessage()], 500);
    }
}

public function removeUser($id)
{
    try {
        // Retrieve the user reference from Firebase Realtime Database
        $userRef = $this->database->getReference('users/' . $id);

        // Check if the user exists in Firebase Database
        if ($userRef->getSnapshot()->exists()) {
            // Remove the user data from Firebase Database
            $userRef->remove();

            // Check if the user exists in Firebase Authentication
            try {
                $this->auth->deleteUser($id);
            } catch (\Kreait\Firebase\Exception\Auth\UserNotFound $e) {
                // Handle the case where the user was not found in Firebase Authentication
                return response()->json(['message' => 'User removed from Database, but not found in Firebase Authentication'], 200);
            }

            return response()->json(['message' => 'User removed successfully from both Database and Firebase Authentication'], 200);
        } else {
            return response()->json(['message' => 'User not found in Firebase Database'], 404);
        }
    } catch (\Exception $e) {
        return response()->json(['message' => $e->getMessage()], 500);
    }
}



    public function addTeacherAccount(Request $request)
    {
        try {

            $message = '';
            $teacherData = [];
            $isEmailExist = false;

            if ($this->database->getReference('users')->getSnapshot()->exists()) {
                foreach ($this->database->getReference('users')->getSnapshot()->getValue() as $teacherID => $teacherInfo) {

                    if ($request->email === $teacherInfo['email']) {
                        $message = "A teacher with the same email exists!";
                        $isEmailExist = true;
                        break;
                    }
                }

                if (!$isEmailExist) {

                    $teacher = $this->auth->createUserWithEmailAndPassword($request->email, $request->password);
                    $this->auth->sendEmailVerificationLink($request->email);

                    $teacherData = [

                        'firstName' => $request->firstName,
                        'lastName' => $request->lastName,
                        'password' => bcrypt($request->password),
                        'email' => $request->email,
                        'dateAdded' => Carbon::now()->toDateString(),
                        'defaultProfile' => $request->gender === 'male' ? $this->maleTeacherDefaultImage : $this->femaleTeacherDefaultImage ,
                        'gender' => $request->gender === 'male' ? 'Male' : 'Female',
                        'role' => 'teacher',
                        'uid' => $teacher->uid
                    ];

                    $message = "Teacher Added Successfully! Make sure he/she verifies his/her email";
                }
            }

            $this->database->getReference('users')->push($teacherData);

            return response(compact('message'));
        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }

    //temp
    public function addAdmin(Request $request)
    {
        try{

            $admin = $this->auth->createUserWithEmailAndPassword($request->email, $request->password);
            $this->auth->sendEmailVerificationLink($request->email);

            $adminData = [

                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'password' => bcrypt($request->password),
                'email' => $request->email,
                'defaultProfile' => $this->defaultAdminImage,
                'gender' => $request->gender === 'Male' ? 'Male' : 'Female',
                'role' => 'admin',
                'uid' => $admin->uid
            ];

            $this->database->getReference('users')->push($adminData);

            return response('ADMIN ADDED');

        }catch(\Exception $e) {
            return response($e->getMessage());
        }

    }


}
