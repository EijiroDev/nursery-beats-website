<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Kreait\Firebase\Contract\Database;
use Kreait\Firebase\Exception\Auth\InvalidPassword;
use Kreait\Firebase\Exception\Auth\UserNotFound;
use Kreait\Laravel\Firebase\Facades\Firebase;

class AuthController extends Controller
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

    public function loginAccount(Request $request)
    {
        try {

            //SIGN IN THE USER USING FIREBASE AUTH
            $user = $this->auth->signInWithEmailAndPassword($request->email, $request->password);
            $userData = $this->auth->getUser($user->firebaseUserId());
            $userToken = null;

            //CHECK IF THE EMAIL BEING USED IS VERIFIED OR NOT
            if ($userData->emailVerified) {
                $userToken = $user->idToken();

                //CHECK FIRST IF THE COLLECTION IS EXISTING TO PREVENT SME ERRS
                if ($this->database->getReference('users')->getSnapshot()->exists()) {
                    //LOOP THROUGH THE USERS COLLECTION AND CHECK IF THE REQUEST EMAIL EXISTS
                    foreach ($this->database->getReference('users')->getSnapshot()->getValue() as $userID => $userInfo) {
                        if ($request->email === $userInfo['email']) {
                            $userRole = $userInfo['role'];
                            return response(compact('userInfo', 'userToken', 'userID', 'userRole'));
                            break;
                        }
                    }
                }
            }else {
                $errMessage = 'Verify Your Email First!';
            }

            return response(compact('errMessage'));

        } catch (InvalidPassword $e) {
            $errMessage = $e->getMessage();
            return response(compact('errMessage'));
        } catch (\Exception $e) {
            $errMessage = $e->getMessage();
            return response(compact('errMessage'));
        }
    }

    //THIS IS THE REGISTER ACCOUNT STRICTLY FOR STUDENTS ONLI
    public function registerAccount(Request $request)
    {
        try{

            $user = $this->auth->createUserWithEmailAndPassword($request->email, $request->password);
            $this->auth->sendEmailVerificationLink($request->email);

            $studentData = [
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'userName' => $request->userName,
                'role' => 'student',
                'gender' => $request->gender === 'male' ? 'Male' : 'Female',
                'defaultProfile' => $request->gender === 'male' ? $this->maleDefaultImage : $this->femaleDefaultImage,
                'uid' => $user->uid,
                'accountStatus' => 'active',
                'registeredDate' => Carbon::now()->toDateString(),

                'shapeScore' => 0,
                'numberScore' => 0,
                'letteScore' => 0,
                'shapesProgress' => 0,
                'shapesHighScore' => 0,
                'lettersProgress' => 0,
                'lettersHighScore' => 0,
                'numbersProgress' => 0,
                'numbersHighScore' => 0,
                'isLittleEinstein' => false
            ];

            //INSERT THE DATA INTO DB
            $this->database->getReference('users')->push($studentData);

            $succMessage = "Registered Successfully! Kindly verify your email it " . $request->email ;

            return response(compact('succMessage'));

        }catch(\Exception $e) {
            return response($e->getMessage());
        }
    }

    public function forgotPassword(Request $request)
    {
        try{

            $user = $this->auth->getUserByEmail($request->email);
            $this->auth->sendPasswordResetLink($request->email);

            $message = 'Password reset link sent to ' . $request->email;

            return response(compact('message'));

        }catch (UserNotFound $e) {
            $message = 'Email does not exists!';
            return response(compact('message'));
        }
        catch(\Exception $e) {
            $message = $e->getMessage();
            return response(compact('message'));
        }
    }

    // IMAGE SHIT
    public function uploadProfile(Request $request)
    {
        try {

            $file = $request->file('file');
            $filename = 'profiles/' . '' . $file->getClientOriginalName();

            $this->storage->getBucket()->upload($file->getContent(), [
                'name' => $filename
            ]);

            return response()->json([
                'message' => 'File Uploaded'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getDownloadURL(Request $request)
    {

        try {

            $path = 'profiles/' . '' . $request->imageName;

            $expiration = new \DateTime('now', new \DateTimeZone('UTC'));
            $expiration->modify('+1 hour');

            $downloadURL = $this->storage->getBucket()->object($path)->signedUrl(new \DateTime('3000-01-01T00:00:00Z'));

            return response()->json([
                'downloadURL' => $downloadURL
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ]);
        }
    }


}
