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
                <ul class="grid-item__btns">
                    <li class="grid-item__btn grid-item__btn--edit">
                        <a href="javascript:void(0)" class="js-edit-item" title="Edit this item">
                            @include('svg.edit')
                        </a>
                    </li>
                    <li class="grid-item__btn grid-item__btn--delete">
                        <a href="javascript:void(0)" class="js-delete-item" title="Delete this item">
                            @include('svg.delete')
                        </a>
                    </li>
                </ul>
                <h2 class="grid-item__title">{{  $item->name }}</h2>
                <a class="grid-item__link" href="{{ $item->link }}" target="_blank">{{ $item->link }}</a>
                <p class="grid-item__desc">{{ $item->description }}</p>
            </div>
        @endforeach
            <div id="add-grid-item" class="grid-item grid-item--add">
                <div class="grid-add-item">
                    @include('svg.plus')
                </div>
            </div>
    </main>

    @include('category.create')
@stop