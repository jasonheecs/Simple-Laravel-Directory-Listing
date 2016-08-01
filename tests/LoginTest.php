<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Item;
use App\Category;
use App\User;

class LoginTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * A basic test example.
     * 
     * @return void
     */
    public function testLoginSuccess()
    {
        $password = 'password123';
        $user = factory(App\User::class)->create([
            'password' => bcrypt($password)
        ]);

        if (Category::count()) {
            $this->visit('/login')
                ->type($user->email, 'email')
                ->type($password, 'password')
                ->press('Login')
                ->seePageIs('/');
        }
    }

    public function testLoginFailure()
    {
        if (Category::count()) {
            $this->visit('/login')
                ->type('nonense@rubb.ish', 'email')
                ->type('123456', 'password')
                ->press('Login')
                ->seePageIs('/login');
        }
    }

    public function testLoginAccessToItemsListing()
    {
        $user = factory(User::class)->create();
        $category = Category::first();

        $this->actingAs($user)
            ->visit('/')
            ->assertResponseOk()
            ->assertViewHas('category');
    }

    public function testGuestAccessToItemsListing()
    {
        $this->visit('/')
            ->seePageIs('/login');
    }
}
