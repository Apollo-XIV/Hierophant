<script>
    import Markdown from 'svelte-exmarkdown';
    export let data;
    let md = data.content;
</script>
<svelte:head>
	<title>{data.res.title} | Hierophant</title> 
    <link rel="preload" href="https://fonts.cdnfonts.com/css/futura-std-4" as="font" type="font/woff2" crossorigin/>
    <link rel="preload" href="https://fonts.cdnfonts.com/css/ibm-plex-sans-kr" as="font" type="font/woff2" crossorigin/>
    <link rel="preload" href="https://fonts.cdnfonts.com/css/monosphere-personal-use" as="font" type="font/woff2" crossorigin/>
    <link rel="preload" href="https://fonts.cdnfonts.com/css/redaction"as="font" type="font/woff2" crossorigin/>
</svelte:head>
<div id="main">
    <div class="content-styling">
        <a href="/posts">&lt- Return to Posts</a>
        {@html md}
    </div>
</div>

<style>
    @import url('https://fonts.cdnfonts.com/css/futura-std-4');
    @import url('https://fonts.cdnfonts.com/css/ibm-plex-sans-kr');
    @import url('https://fonts.cdnfonts.com/css/monosphere-personal-use');
    @import url('https://fonts.cdnfonts.com/css/redaction');

    #main {
        position: absolute;
        inset: 0;
        background: #1F1E20;
        background-image: url('/perlin.png');
        background-size: 50%;
        background-position-y: -80px;
    }

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

    .content-styling a {
        font-family: 'Futura Std';
        color: white;
        font-size: larger;
    }

    .content-styling p {
        text-align: justify;
    }

    .content-styling p,li {
        font-family: 'Futura Std';
        box-shadow: 5px 5px 86px 20px #000;
        background-color: #00000077;
    }

    .content-styling h1 {
        font-family: 'Monosphere Personal Use';
        text-align: center;
        padding-top: 30px;
        box-shadow: 5px 5px 86px 20px #000;
        background-color: #00000077;
    }

    .content-styling ul li:before {
        content: '\2014';
        position: absolute;
        margin-left: -20px;
    }

    .content-styling ul,li {
        list-style-type: none;
    }

    .content-styling h2,h3,h4 {
        font-family: 'IBM Plex Sans Kr';
        box-shadow: 5px 5px 86px 20px #000;
        background-color: #00000077;
    }

    .content-styling img {
        max-width: 100%;
        max-height: 65vh;
        width: auto;
        height: auto;
        margin-left: auto;
        margin-right: auto;
        align-self: center;
        display: block;
        border-radius: 30px;
        box-shadow: 5px 5px 86px 20px #000;
        margin-top: 50px;
        margin-bottom: 10px;
        -webkit-box-shadow: 0px 0px 65px 4px rgba(168,168,168,0.29);
        -moz-box-shadow: 0px 0px 65px 4px rgba(168,168,168,0.29);
        box-shadow: 0px 0px 65px 4px rgba(168,168,168,0.29);
    }

</style>