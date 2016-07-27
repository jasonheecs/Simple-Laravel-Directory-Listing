<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class)->create([
            'name' => 'Demo User',
            'email' => 'demo@example.com',
            'password' => bcrypt('password')
        ]);
        factory(App\User::class, 3)->create();
    }
}
