<svelte:head>
	<title>Test | Hierophant</title> 
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
    let numbers = [1, 2, 3, 4];
</script>

<div class="parallax">
    <div class="parallax-layer" id="background" style="--depth: -10px">
        <img src="/devops.png" id="devops-logo" alt="devops logo" />
    </div>

    <img class="parallax-layer" style="--depth: -10px" src="/git.png" id="git-logo" alt="Git logo" />
    <img class="parallax-layer" style="--depth: -10px" src="/k8s.png" id="k8s-logo" alt="Kubernetes logo" />

    <div  class="parallax-layer" style="--depth: 0px" id="mainpage">
        <div id="logo">
            <h1>Hierophant</h1>
        </div>
        <div id="first-copy">
            <p>Dev-Ops& CI/CD& Automation<span>& WebDev.</span></p>
        </div>
    </div>
    <div class="parallax-layer" style="--depth: 0px" id="postlink">
        <div id="postcopy">
            <p>
                Learn Dev-Ops <br><span>Easier</span>
            </p>
            <p class="postlinkdesc">Welcome to my blog! As an aspiring DevOps engineer and apprentice, I've encountered a lot of complexity in my learning journey. That's why I've created this blog with the goal of making DevOps concepts and practices more accessible and understandable to everyone.</p>
            <p class="postlinkdesc">I believe that simplicity is key to understanding, which is why I strive to explain even the most complex concepts in a clear and concise way. My articles are written with beginners in mind, but even experienced professionals may find some valuable insights.</p>
            <!-- <Postlink /> -->
        </div>
    </div>
    <div class="parallax-layer" style="--depth: 0px" id="cards">
        <h2>Recent Posts</h2>
        <div id="flexcards">
            {#each numbers as number}
                <div class="flexwrapper">
                <PostCard/>
                </div>
            {/each}
        </div>
    </div>
</div>



<style>

    #git-logo {
        top: 1200px;
        left: -100px;
        transform: scale(0.45);
        filter: drop-shadow(0 0 40px rgba(0, 0, 0, 0.288));
    }

    #k8s-logo {
        top: 1000px;
        left: 200px;
        transform: scale(0.5);
        filter: drop-shadow(0 0 40px rgba(0, 0, 0, 0.288));
    }

    #devops-logo {
        transform: scale(0.8);
        position: absolute;
        inset: 0;
    }

    .parallax {
        height: 100vh;

        overflow-x: hidden;
        overflow-y: auto;

        perspective: 1px;
        background-image: linear-gradient(336deg, rgba(255,226,161,1) 0%, rgba(231,114,255,1) 54%, rgba(0,212,255,1) 100%);
    }

    .parallax-layer {
        position: absolute;
        inset: 0;
        transform: translateZ(var(--depth));
    }

    :global(body) {
        margin: 0;
    }

</style>