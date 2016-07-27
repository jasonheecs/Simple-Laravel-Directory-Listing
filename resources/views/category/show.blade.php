@extends('layouts.app')

@section('page-class', str_replace(' ', '-', trim(strtolower($category->name))))

@section('content')
    <header>
        <div class="logo">
            <img src="{{ url($category->logo_url) }}" width="200" height="45" />
        </div>

        <nav class="navbar">
            <ul class="nav">
                @foreach (App\Category::all() as $categoryItem)
                    @if ($categoryItem->id != $category->id)
                        <li class="nav__item">
                            <a href="{{ url('/category', $categoryItem->id) }}">{{ $categoryItem->icon_url }}</a>
                        </li>
                    @endif
                @endforeach
            </ul>
        </nav>
    </header>

    <main class="grid">
        @foreach ($category->items as $item)
            <div class="grid-item">
                <h2 class="grid-item__title">{{  $item->name }}</h2>
                <a href="grid-item__link">{{ $item->link }}</a>
                <p class="grid-item__desc">{{ $item->description }}</p>
            </div>
        @endforeach
    </main>
@stop