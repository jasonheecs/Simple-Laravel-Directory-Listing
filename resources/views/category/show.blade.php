@extends('layouts.app')

@section('page-class', 'page--' . str_replace(' ', '-', trim(strtolower($category->name))))

@section('content')
    <h1 class="page-title">{{ $category->name }}</h1>

    <header class="header">
        <div class="logo">
            <img src="{{ url($category->logo_url) }}" width="200" height="45" />
        </div>

        <nav class="navbar">
            <ul class="nav">
                @foreach (App\Category::all() as $categoryItem)
                    @if ($categoryItem->id != $category->id)
                        <li class="nav__item">
                            <a href="{{ url('/category', $categoryItem->id) }}">
                                <img src="{{ url($categoryItem->icon_url) }}" />
                            </a>
                            <span class="nav__title">{{ $categoryItem->name }}</span>
                        </li>
                    @endif
                @endforeach
            </ul>
        </nav>
    </header>

    <main id="js-grid" class="grid">
        @foreach ($category->items as $item)
           @include('item.show')
        @endforeach
            <div id="add-grid-item" class="grid-item grid-item--add">
                @include('item.add')
            </div>
    </main>

    @include('item.create')
    <script type="text/template" id="show-item-template">
        @include('item.show', ['jsTemplate' => true])
    </script>
    <script type="text/template" id="add-item-template">
        @include('item.add')
    </script>
@stop