<script>
    import Markdown from 'svelte-exmarkdown';
    export let data;
    let md = data.content;
</script>
<svelte:head>
	<title>{data.res.title} | Hierophant</title> 
</svelte:head>

<div id="abstract">{data.res.abstract}</div>
<div class="content-styling">
    {@html md}
</div>



<style>
    @import url('https://fonts.cdnfonts.com/css/futura-std-4');
    @import url('https://fonts.cdnfonts.com/css/ibm-plex-sans-kr');
    @import url('https://fonts.cdnfonts.com/css/monosphere-personal-use');
    @import url('https://fonts.cdnfonts.com/css/redaction');

    #abstract {
        font-family: 'Redaction 70', 'Courier New', Courier, monospace;
        font-size: 250px;
        position: absolute;
        top: 30px;
        right: 10px;
        color: white;
        z-index: -1;
        margin: 0;
        overflow-x: visible wrap;
        overflow-y: hidden;
        width: 60vw;
        text-align: right;
        max-height: 100%;
        opacity: 0.4;
        margin: 0;
        line-height: 200px;
    }

    .content-styling {
        color: white;
        padding-left: 300px;
        padding-right: 300px;
        margin-bottom: 100px;
    }

    .content-styling :global(p) {
        font-family: 'Futura Std';
        box-shadow: 5px 5px 86px 20px #000;
        background-color: #00000077;
    }

    .content-styling :global(h1) {
        font-family: 'Monosphere Personal Use';
        text-align: center;
        padding-top: 100px;
        box-shadow: 5px 5px 86px 20px #000;
        background-color: #00000077;
    }

    .content-styling :global(h2),:global(h3),:global(h4) {
        font-family: 'IBM Plex Sans Kr';
        box-shadow: 5px 5px 86px 20px #000;
        background-color: #00000077;
    }

    .content-styling :global(img) {
        max-width: 100%;
        max-height: 50vh;
        margin-left: auto;
        margin-right: auto;
        align-self: center;
        display: block;
        border-radius: 30px;
        box-shadow: 5px 5px 86px 20px #000;
    }

</style>