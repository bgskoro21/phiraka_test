<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('user/user-list', [
            'users' => User::paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('user/user-create');
    }

    public function show(User $user)
    {
        return Inertia::render('user/user-edit', compact('user'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'username' => 'required|max:128|unique:users,username',
            'password' => 'required|string|min:8'
        ]);
        
        User::create($validated);
        
        return redirect()->route('users.index')->with('success', 'User added successfully.');
    }
    
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'username' => 'required|string|max:128',
            'password' => 'nullable|string|min:8'
        ]);

        if (empty($validated['password'])) 
        {
            unset($validated['password']);
        } else {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return redirect()->route('users.index')->with('success', 'User updated successfully');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted');
    }
}
