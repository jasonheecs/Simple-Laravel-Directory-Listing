{{-- HTML template to be inserted into the DOM via JS to allow user to add new item --}}
<script type="text/template" id="create-item-template">
    <form>
        <input type="text" name="name" />
        <input type="url" name="url" value="http://"/>
        <textarea name="description"></textarea>
        <button type="submit">Save</button>
        <input type="hidden" name="categoryId" value="{{ $category->id }}">
    </form>
</script>