<script>
    export let data;
    export let form;
    import Editor from '@tinymce/tinymce-svelte';
    let id = data.res.id;
    console.log(id)
    let content = data.content;
    let title = data.res.title;
    let abstract = data.res.abstract;
    let conf = {
        selector: '#Editor',
        promotion: false,
        placeholder: 'Write your post here',
        menubar: false,
        statusbar: false,
    }

    function slugged(title) {
        title = title.replace(/[^\w\s]/gi, '');
        console.log(title);
        return(title.replace(/\s+/g, '-').toLowerCase());
        
    }

    $: slug = slugged(title);
</script>

<div id="wrapper">
    {#if data.res.id === "new"}
        <h1>Create Post</h1>
    {:else}
        <h1>Edit Post</h1>
    {/if}
    <form method="POST" action="?/update" id="update">
        <p class="slug">/posts/<input name="slug" type="text" class="" value="{slug}" readonly /></p>
        <input name="title" type="text" class="valInput" id="title" bind:value={title} placeholder="Enter a title..."/>
        <input name="abstract" type="text" class="valInput" id="abstract" bind:value={abstract} placeholder="Enter a brief description for your post..."/>
        <Editor bind:value={content} id="Editor" {conf} scriptSrc="../../node_modules/tinymce/tinymce.min.js"/>
        <input name="content" type="hidden" value={content} />
        <input name="id" type="hidden" value={id} />
        <input id="submit" type="submit" value="Save Post"/>
    </form>
    
</div>


<style>

    @import url('https://fonts.cdnfonts.com/css/monosphere-personal-use');

    #wrapper {
        margin: 100px 100px 100px 100px;
    }

    #submit { 
        border: none;
        background-color: rgb(116, 69, 128);
        font-family: 'Courier New', Courier, monospace;
        border-radius: 5px;
        color: white;
        padding: 10px;
        font-size: medium;
        margin-top: 5px;
        float: right;
    }

    .valInput {
        position: inherit;
        width: 100%;
        resize: none;
        padding: 15px;
        border: none;
        border-radius: 10px;
        filter: drop-shadow(0px 0px 0.1rem #6969696b);
        margin-bottom: 4px;
        box-sizing: border-box;
    }

    .valInput:focus {
        outline: none;
    }

    .valInput#title {
        font-size: larger;
    }

    .valInput#abstract {
        font-size: 16px;
    }

    .slug {
        opacity: 0.4;
        margin-bottom: 3px;
        font-family:'Courier New', Courier, monospace;
        font-size: small;
        border: none;
        width:fit-content;
        overflow-x: visible;
    }

    .slug input {
        border: none;
        font-family: 'Courier New', Courier, monospace;
        font-size: small;
        width: 1000px;
        overflow-x: visible;
        
    }

    h1 {
        font-family: 'Monosphere Personal Use';
    }
</style>