<script>
    import Markdown from 'svelte-exmarkdown';
    export let data;
    let md = data.content;
</script>
<svelte:head>
	<title>{data.title} | Hierophant</title> 
</svelte:head>
<div class="content-styling">
    <Markdown {md} />
</div>

<style>
    @import url('https://fonts.cdnfonts.com/css/futura-std-4');
    @import url('https://fonts.cdnfonts.com/css/ibm-plex-sans-kr');
    @import url('https://fonts.cdnfonts.com/css/monosphere-personal-use');

    .content-styling {
        color: white;
        padding-left: 300px;
        padding-right: 300px;
    }

    .content-styling :global(p) {
        font-family: 'Futura Std';
    }

    .content-styling :global(h1) {
        font-family: 'Monosphere Personal Use';
        text-align: center;
        padding-top: 100px;
    }

    .content-styling :global(h2),:global(h3),:global(h4) {
        font-family: 'IBM Plex Sans Kr';
    }

    .content-styling :global(img) {
        max-width: 100%;
        max-height: 50vh;
        margin-left: auto;
        margin-right: auto;
        align-self: center;
        display: block;
        border-radius: 30px;
    }

</style>