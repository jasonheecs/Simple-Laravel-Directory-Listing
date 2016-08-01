<?php

abstract class TestCase extends Illuminate\Foundation\Testing\TestCase
{
    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://localhost';
    protected $nestedViewData = [];

    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        $app = require __DIR__.'/../bootstrap/app.php';

        $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

        return $app;
    }

    /**
     * http://stackoverflow.com/questions/16607310/laravel-controller-layout-testing
     */
    public function registerNestedView($view)
    {
      View::composer($view, function($view){
        $this->nestedViewsData[$view->getName()] = $view->getData();
      }); 
    }

    /**
     * Assert that the given view has a given piece of bound data.
     *
     * @param  string|array  $key
     * @param  mixed  $value
     * @return void
     */
    public function assertNestedViewHas($view, $key, $value = null)
    {
        if (is_array($key)) return $this->assertNestedViewHasAll($view, $key);

        if (!isset($this->nestedViewsData[$view]))
        {
            return $this->assertTrue(false, 'The view was not called.');
        }

        $data = $this->nestedViewsData[$view];

        if (is_null($value))
        {
            $this->assertArrayHasKey($key, $data);
        }
        else
        {
            if(isset($data[$key]))
              $this->assertEquals($value, $data[$key]);
            else 
              return $this->assertTrue(false, 'The View has no bound data with this key.');            
        }
    }

    /**
     * Assert that the view has a given list of bound data.
     *
     * @param  array  $bindings
     * @return void
     */
    public function assertNestedViewHasAll($view, array $bindings)
    {
        foreach ($bindings as $key => $value)
        {
            if (is_int($key))
            {
                $this->assertNestedViewHas($view, $value);
            }
            else
            {
                $this->assertNestedViewHas($view, $key, $value);
            }
        }
    }

    public function assertNestedView($view)
    {
      $this->assertArrayHasKey($view, $this->nestedViewsData);
    }

    /**
     * Get response data array from view data
     * @param  Illuminate\Http\Response $response
     * @param  string $key
     * @return array
     */
    protected function getResponseData($response, $key){
        $content = $response->getOriginalContent();
        $content = $content->getData();
        return $content[$key]->all();
    }
}
