{{-- HTML template to be inserted into the DOM via JS to allow user to add new item --}}
<script type="text/template" id="create-item-template">
    <h2 class="grid-item__title grid-item__title--add">Enter new item details</h2>
    <form class="form form--add-item">
        <div class="input">
            <input type="text" id="name" name="name" class="input__field" autofocus required/>
            <label class="input__label" for="name">
                <svg class="input__svg" width="100%" height="100%" viewBox="0 0 404 77" preserveAspectRatio="none">
                    <path d="m0,0l404,0l0,77l-404,0l0,-77z"></path>
                </svg>
                <span class="input__label-content">Name</span>
            </label>
        </div>

        <div class="input">
            <input type="url" id="url" name="url" placeholder="http://" class="input__field" required />
            <label class="input__label" for="url">
                <svg class="input__svg" width="100%" height="100%" viewBox="0 0 404 77" preserveAspectRatio="none">
                    <path d="m0,0l404,0l0,77l-404,0l0,-77z"></path>
                </svg>
                <span class="input__label-content">URL Link</span>
            </label>
        </div>

        <div class="input">
            <textarea id="description" name="description" class="input__field input__field--textarea" required></textarea>
            <label class="input__label" for="description">
                <span class="input__label-content">Description</span>
            </label>
        </div>

        <button type="submit" class="btn btn--default">Save</button>
        <input type="hidden" name="categoryId" value="{{ $category->id }}">
    </form>
</script>