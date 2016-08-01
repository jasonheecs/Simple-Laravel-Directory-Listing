<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();
        factory(User::class)->create([
            'name' => 'Demo User',
            'email' => 'demo@example.com',
            'password' => bcrypt('password')
        ]);
        factory(User::class, 3)->create();
    }
}
