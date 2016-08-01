<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class LoginTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * A basic test example.
     * 
     * @return void
     */
    public function testLoginSuccessExample()
    {
        $password = 'password123';
        $user = factory(App\User::class)->create([
            'password' => bcrypt($password)
        ]);

        if (\App\Category::count()) {
            $this->visit('/login')
                ->type($user->email, 'email')
                ->type($password, 'password')
                ->press('Login')
                ->seePageIs('/');
        }
    }

    public function testLoginFailureExample()
    {
        if (\App\Category::count()) {
            $this->visit('/login')
                ->type('nonense@rubb.ish', 'email')
                ->type('123456', 'password')
                ->press('Login')
                ->seePageIs('/login');
        }
    }
}
