<svelte:head>
	<title>About | Hierophant</title> 
    <link rel="preload" as="style" href="https://fonts.cdnfonts.com/css/ibm-plex-sans" crossorigin>
    <link href="https://fonts.cdnfonts.com/css/ibm-plex-sans" rel="stylesheet" crossorigin>
    <link rel="preload" as="style" href="https://fonts.cdnfonts.com/css/ibm-plex-mono-3" crossorigin>
    <link href="https://fonts.cdnfonts.com/css/ibm-plex-mono-3" rel="stylesheet" crossorigin>
    <link rel="preload" as="style" href="https://fonts.cdnfonts.com/css/grozery" crossorigin>
    <link href="https://fonts.cdnfonts.com/css/grozery" rel="stylesheet" crossorigin>
</svelte:head>


<script>
    import PostCard from '$lib/components/postcard.svelte';
    import { onMount } from 'svelte';

</script>

<div class="parallax">
    <div class="parallax-layer" id="background"></div>


    <div class="parallax-layer" id="middleground"></div>


    <div class="parallax-layer" id="foreground">
        <p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p><p>test</p>
    </div>
</div>



<style>
    .parallax {
        height: 100vh;

        overflow-x: hidden;
        overflow-y: auto;

        perspective: 1px;
    }

    .parallax-layer {
        position: absolute;
        inset: 0;
    }

    #background {
        transform: translateZ(-2px);
        top:50px;
        background: red;
    }

    #middleground {
        transform: translateZ(-1px);
        top: 60px;
        background-color: green;
    }

    #foreground {
        transform: translateZ(0px);
        top: 60px
    }

    :global(body) {
        margin: 0;
    }

</style>