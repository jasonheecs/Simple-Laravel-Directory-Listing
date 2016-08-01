<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Category;

class ViewComposerServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        view()->composer('category.show', function($view) {
            $viewdata = $view->getData();
            
            $category = isset($viewdata['category']) ? $viewdata['category'] : Category::first();
            $category->load(['items' => function($query) {
                $query->orderBy('order', 'asc');
            }]);

            $view->with('category', $category);
            $view->with('categories', Category::all());
        });
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
