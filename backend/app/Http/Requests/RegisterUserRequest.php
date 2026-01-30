<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'username' => 'required|alpha_num|unique:users,username',
            'password' => 'required|min:8|confirmed',
            'participation_type' => 'required|in:buyer,exhibitor,visitor',

            'company_name' => 'required|string|max:255',
            'address_line' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'region' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'year_established' => 'required|digits:4|integer|max:' . date('Y'),
            'website' => 'nullable|url',
            'brochure' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
        ];
    }
}
