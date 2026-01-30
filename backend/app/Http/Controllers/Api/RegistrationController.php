<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\RegisterUserRequest;
use App\Models\User;
use App\Models\Company;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class RegistrationController extends Controller
{
    public function store(RegisterUserRequest $request)
    {
        DB::transaction(function () use ($request) {

            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'username' => $request->username,
                'password' => Hash::make($request->password),
                'participation_type' => $request->participation_type,
            ]);

            $brochurePath = null;

            if ($request->hasFile('brochure')) {
                $brochurePath = $request->file('brochure')->store('brochures');
            }

            Company::create([
                'user_id' => $user->id,
                'company_name' => $request->company_name,
                'address_line' => $request->address_line,
                'city' => $request->city,
                'region' => $request->region,
                'country' => $request->country,
                'year_established' => $request->year_established,
                'website' => $request->website,
                'brochure_path' => $brochurePath,
            ]);
        });

        return response()->json([
            'success' => true,
            'message' => 'Registration completed successfully'
        ], 201);
    }

    public function countries()
    {
        return response()->json([
            ['code' => 'PH', 'name' => 'Philippines'],
            ['code' => 'US', 'name' => 'United States'],
            ['code' => 'JP', 'name' => 'Japan'],
            ['code' => 'DE', 'name' => 'Germany'],
            ['code' => 'FR', 'name' => 'France'],
        ]);
    }

}
