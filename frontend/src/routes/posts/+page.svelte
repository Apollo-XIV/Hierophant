<script>
    export let data;
</script>
<svelte:head>
	<title>Posts | Hierophant</title> 
</svelte:head>
<div id="content">
</div>
<h1>Posts</h1>
    <div class="posts">
        {#each data.summaries as {slug, title, abstract}}
        <a href="posts/{slug}"><div class="post">
            <h2>{title}  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
            </svg></h2>
            <p>{abstract}</p>
        </div></a>
        {/each}
    </div>
<style>
    @import url('https://fonts.cdnfonts.com/css/futura-std-4');
    @import url('https://fonts.cdnfonts.com/css/ibm-plex-sans-kr');
    @import url('https://fonts.cdnfonts.com/css/monosphere-personal-use');
    :global(body) {
        color: white;
        
        
    }

    #content {
        background-image: url('/jester.png');
        background-size: 60vw;
        background-repeat: no-repeat;
        background-position:bottom 100px right 0px;
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: -1;
    }

    .posts {
        max-width: 1200px;
        width: auto;
        margin: auto;
        padding-bottom: 100px;
        padding-top: 100px;
        height: max-content;
    }

    .post {
        background-color: transparent;
        padding: 10px;
        padding-left: 20px;
    }
    

    h1 {
        text-align: center;
        font-family: 'Monosphere Personal Use';
        padding-top: 50px;
    }

    .post h2,a {
        font-family: 'IBM Plex Sans Kr';
        text-decoration: none;
        color: white;
    }

    .post:hover {
        background-color: rgba(255, 255, 255, 0.073);
        border-radius: 10px;
    }

    p {
        font-family: 'Futura Std';
        margin-top: -20px;
    }
</style>