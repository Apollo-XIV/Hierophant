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
    import Tempcomp from '$lib/components/tempcomp.svelte';

</script>

<div class="parallax">
    <div class="parallax-layer level" style="--depth: -5px" >
        <img src="/devops.png" id="devops-logo" alt="devops logo" />
    </div>
    <img class="parallax-layer level" style="--depth: 0px" src="/git.png" id="git-logo" alt="Git logo" />
    <img class="parallax-layer level" style="--depth: -3px" src="/k8s.png" id="k8s-logo" alt="Kubernetes logo" />

    <div class="parallax-layer level" style="--depth: -1px" id="foreground">
        <Tempcomp/>
    </div>
</div>



<style>

    #git-logo {
        position: absolute;
        top: 1000px;
        left: -100px;
        /* transform: scale(0.45); */
        filter: drop-shadow(0 0 40px rgba(0, 0, 0, 0.288));
    }

    #k8s-logo {
        position: absolute;
        top: 1000px;
        left: 200px;
        /* transform: scale(0.5); */
        filter: drop-shadow(0 0 40px rgba(0, 0, 0, 0.288));
    }

    #devops-logo {
        /* transform: scale(0.8); */
        position: absolute;
        inset: 0;
    }

    .parallax {
        height: 100vh;

        overflow-x: hidden;
        overflow-y: auto;

        perspective: 5px;
        background-image: linear-gradient(336deg, rgba(255,226,161,1) 0%, rgba(231,114,255,1) 54%, rgba(0,212,255,1) 100%);
    }

    .parallax-layer {
        position: absolute;
        inset: 0;
    }

    .level {
        --scaleMod: calc(var(--depth)*0.1);
        transform: translateZ(var(--depth)) scale(var(--scaleMod));
        background-size: 100%;
    }

    #background {
        transform: translateZ(-3px) scale(1.5);
        height: 400vh;
        background-size: 100%;
    }

    #middleground {
        transform: translateZ(-1px);
    }

    #foreground {
        /* transform: translateZ(0px); */
        background-size: 100%;
    }

    :global(body) {
        margin: 0;
    }

</style>