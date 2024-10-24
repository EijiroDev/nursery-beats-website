<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase\Contract\Database;
use Kreait\Laravel\Firebase\Facades\Firebase;

class StudentController extends Controller
{
    protected $database;
    protected $auth;
    protected $storage;

    protected $maleDefaultImage = "https://storage.googleapis.com/nursery-beats-web.appspot.com/profiles/male.png?GoogleAccessId=firebase-adminsdk-fjia5%40nursery-beats-web.iam.gserviceaccount.com&Expires=32503680000&Signature=KYsmh8hSkvvKi%2B%2BqMFMZgfgJG1fccAyglKQB8XpSWgS0V8dCEtva2PHL1pcAoFHbBdPOJUt4YtBHxzKEwZEMiUbxlHR%2Fr90UIiJJC4H6haEuygLsSSnX2ewTAtRLNCSqT03dECHh0i%2B5D90Kanva9qagD1V11lmgmsuUXBKDQ%2BZ5bBIarmubobGDAjBR%2BlXuvKy8XOUTVMeW0judGYNgmUF8H%2B5%2BerxdsjSUjF8t%2BJb%2B5Ij%2BK1TwfwwWE5X83Vwpxc%2F%2FU9EeYUOHFpwF3alD0VAIv5Z28HpzfGCo0CVCtKvvVGPfZeClOGOB8KdSSxgDO7rf3%2F0XnjOt42jCcbpwLw%3D%3D";

    protected $femaleDefaultImage = "https://storage.googleapis.com/nursery-beats-web.appspot.com/profiles/female.png?GoogleAccessId=firebase-adminsdk-fjia5%40nursery-beats-web.iam.gserviceaccount.com&Expires=32503680000&Signature=nZRsTZOzVqV2JGfdH%2F2XwcnT5S28H0%2BrVd6aXgFicMWF2lfseWJ7FIt3uPmPJFJ5ypbMi2utpqPApaHbEULI0EA8DUdPzo9mtqMjz3ags4A%2BBQzW6N49eOopdq8hvtrQ6L8bEF5PpwToh6TYsTagYMHHGC4yPxwHv%2BVxoJg77IUUhQSgUOIgbqS16tovj3KqHJktfVjXKKS5kv0n1d38JZgZAj%2F2qL4mMncqUyFRDhRkO1kRe21LYkFhk8049SPY77OE0eYYnkMSFo1u7bSkdMG%2BhcO0g1Ma5XK9Sc1WLs8F1TMi07G9OpBhSSVCAKULOU%2BMZdh1ccEch8j0lCBOgw%3D%3D";

    public function __construct(Database $database)
    {
        $this->database = $database;
        $this->auth = Firebase::auth();
        $this->storage = Firebase::storage();
    }

    public function fetchMyDetails($uid)
    {
        try {

            $studentData = [];
            foreach ($this->database->getReference('users')->getSnapshot()->getValue() as $studentID => $stundentInfo) {
                if ($uid === $studentID) {
                    $studentData[] = [
                        'studentID' => $studentID,
                        'studentInfo' => $stundentInfo
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
                        'defaultProfile' => $request->gender === 'male' ? $this->maleDefaultImage : $this->femaleDefaultImage,
                        'userName' => $request->userName
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
}
