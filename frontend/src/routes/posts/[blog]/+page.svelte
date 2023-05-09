<script>
    export let data;
    let md = data.content;
</script>
<svelte:head>
	<title>{data.res.title} | Hierophant</title> 
    <link rel="preload" as="style" href="https://fonts.cdnfonts.com/css/ibm-plex-sans" crossorigin>
    <link href="https://fonts.cdnfonts.com/css/ibm-plex-sans" rel="stylesheet" crossorigin>
    <link rel="preload" as="style" href="https://fonts.cdnfonts.com/css/ibm-plex-mono-3" crossorigin>
    <link href="https://fonts.cdnfonts.com/css/ibm-plex-mono-3" rel="stylesheet" crossorigin>
    <link rel="preload" as="style" href="https://fonts.cdnfonts.com/css/grozery" crossorigin>
    <link href="https://fonts.cdnfonts.com/css/grozery" rel="stylesheet" crossorigin>
</svelte:head>

<div id="main">
    <div class="content-styling">
        <p><a href="/posts">&lt- Return to Posts</a></p>
        {@html md}
    </div>
</div>


<style>
    @import url('https://fonts.cdnfonts.com/css/futura-std-4');
    @import url('https://fonts.cdnfonts.com/css/ibm-plex-sans-kr');
    @import url('https://fonts.cdnfonts.com/css/monosphere-personal-use');
    @import url('https://fonts.cdnfonts.com/css/redaction');

    .content-styling {
        color: white;
        max-width: 1200px;
        width: auto;
        margin: auto;
        padding-left: 20px;
        padding-top: 100px;
        padding-right: 20px;
        margin-bottom: 100px;
    }

    .content-styling :global(a) {
        font-family: 'IBM Plex Mono';
        color: white;
        font-style: italic;
        font-size: larger;
        text-align: justify;
        text-decoration: none;
    }

    .content-styling :global(p) {
        text-align: justify;
    }

    .content-styling :global(p),:global(li) {
        font-family: 'IBM Plex Sans';
    }

    .content-styling :global(h1) {
        font-family: 'IBM Plex Sans';
        font-weight: bolder;
        text-transform: uppercase;
        text-align: center;
        padding-top: 30px;
    }

    .content-styling :global(ul li:before) {
        content: '\2014';
        position: relative;
        margin-right: 10px;
    }

    .content-styling :global(ul),:global(li) {
        list-style-type: none;
        text-align: left;
    }

    .content-styling :global(h2),:global(h3),:global(h4) {
        font-family: 'IBM Plex Sans';
        text-align: left;
    }

    .content-styling :global(img) {
        max-width: 100%;
        max-height: 65vh;
        width: auto;
        height: auto;
        margin-left: auto;
        margin-right: auto;
        align-self: center;
        display: block;
        border-radius: 30px;
        box-shadow: 5px 5px 86px 20px #00000051;
        margin-top: 50px;
        margin-bottom: 10px;
    }

</style>