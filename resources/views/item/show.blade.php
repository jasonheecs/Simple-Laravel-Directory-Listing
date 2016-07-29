<div class="grid-item" @if (!isset($jsTemplate))data-id="{{ $item->id }}" @endif>
    <ul class="grid-item__btns">
        <li class="grid-item__btn grid-item__btn--edit">
            <a href="#" class="js-edit-item" title="Edit this item">
                @include('svg.edit')
            </a>
        </li>
        <li class="grid-item__btn grid-item__btn--delete">
            <a href="#" class="js-delete-item" title="Delete this item">
                @include('svg.delete')
            </a>
        </li>
    </ul>
    <h2 class="grid-item__title">
        @if (!isset($jsTemplate))
            {{  $item->name }}
        @else
            <%= name %>
        @endif
    </h2>

    @if (!isset($jsTemplate))
        <a class="grid-item__link" href="{{ $item->link }}" target="_blank">{{ $item->link }}</a>
    @else
        <a class="grid-item__link" href="<%= link %>" target="_blank"><%= link %></a>
    @endif

    <p class="grid-item__desc">
        @if (!isset($jsTemplate))
            {{  $item->description }}
        @else
            <%= description %>
        @endif
    </p>
</div>