<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Resources Directory Listing - @yield('title')</title>

    <!-- Fonts -->
    <link href='//fonts.googleapis.com/css?family=Roboto:400,500,400italic,700,900,300' rel='stylesheet' type='text/css'>

    <!-- Styles -->
    <link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/normalize/4.1.1/normalize.min.css">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    {{-- <link href="{{ elixir('css/app.css') }}" rel="stylesheet"> --}}
</head>
<body id="js-app" class="@yield('page-class')">

    @yield('content')

    <!-- JavaScripts -->
    <script src="//code.jquery.com/jquery-3.1.0.min.js"></script>
    {{-- <script src="{{ elixir('js/app.js') }}"></script> --}}
</body>
</html>
