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
    import PostLink from '$lib/components/postlink.svelte';
    export let data;
</script>


<div class="parallax">
    <div class="parallax-layer level" style="--depth: -5" >
        <img src="/devops.png" id="devops-logo" alt="devops logo" />
    </div>

    <img class="parallax-layer level" style="--depth: -2" src="/git.png" id="git-logo" alt="Git logo" />
    <img class="parallax-layer level" style="--depth: -3" src="/k8s.png" id="k8s-logo" alt="Kubernetes logo" />
    <div class="parallax-layer level" style="--depth: 0">
        <section id="mainpage">
            <div id="logo">
                <h1>Hierophant</h1>
            </div>
            <div id="first-copy">
                <p>Dev-Ops& CI/CD& Automation<span>& WebDev.</span></p>
            </div>
        </section>
        <section id="postlink">
            <div id="postcopy">
                <p>
                    Learn Dev-Ops <br><span>Easier</span>
                </p>
                <p class="postlinkdesc">Welcome to my blog! As an aspiring DevOps engineer and apprentice, I've encountered a lot of complexity in my learning journey. That's why I've created this blog with the goal of making DevOps concepts and practices more accessible and understandable to everyone.</p>
                <p class="postlinkdesc">I believe that simplicity is key to understanding, which is why I strive to explain even the most complex concepts in a clear and concise way. My articles are written with beginners in mind, but even experienced professionals may find some valuable insights.</p>
                <PostLink />
            </div>
        </section>
        <section id="cards">
            <h2>Recent Posts</h2>
            <div id="flexcards">
                {#each data.posts as post}
                    <PostCard post={post} enableTilt={false} />
                {/each}
            </div>
        </section>
    </div>
</div>



<style>

#logo {
        background-image: url("/Logofaint.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position-x: center;
        height: fit-content;
        width: min-content;
        max-width: 400px;
        margin: 0 auto;
        position: absolute;
        top: 0px;
        left: 0;
        right: 0;
        z-index: 1;
        align-self: center;
        filter: drop-shadow(0 0 50px #00000086);
        height: 500px;
        outline: magenta;
    }

    #logo h1 {
        color: white;
        font-family: 'Grozery', 'Palatino';
        font-size: 60px;
        position: relative;
        padding-top: 170px ;
        text-align: center;
        text-shadow: 0 0 50px #000000c1;
    }

    #first-copy {
        width: min-content;
        overflow-wrap: normal;
        color: white;
        font-family: 'IBM Plex Sans';
        font-weight: bold;
        font-size: 100px;
        line-height: 92px;
        position: absolute;
        bottom: 0;
        left: 100px;
        filter: drop-shadow(0px 0px 0.75rem rgba(54, 54, 54, 0.397));
    }

    #first-copy span {
        color: transparent;
        -webkit-text-stroke: 2px white;
    }

    #postcopy{
        width: fit-content;
        overflow-wrap: normal;
        color: white;
        font-family: 'IBM Plex Sans';
        font-weight: bold;
        text-align: right;
        font-size: 100px;
        line-height: 92px;
        position: absolute;
        top: 0;
        right: 100px;
        filter: drop-shadow(0px 0px 0.75rem rgba(54, 54, 54, 0.397));
    }

    #postcopy span {
        color: transparent;
        -webkit-text-stroke: 2px white;
        font-style: italic;
    }

    .postlinkdesc {
        color: white;
        font-family: 'IBM Plex Mono';
        font-weight: normal;
        font-size: large;
        max-width: 50vw;
        line-height: normal;
        text-align: left;
    }

    #cards h2 {
        font-family: 'IBM Plex Sans';
        color: white;
        text-align: center;
        font-size: 50px;
        text-transform: uppercase;
        filter: drop-shadow(0px 0px 0.75rem rgba(54, 54, 54, 0.397));
    }

    #cards {
        position: absolute;
        top: 200vh;
        height: 100vh;
        width: 100vw;
        overflow-y: hidden;
    }

    #flexcards {
        margin: 0 40px 0 40px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
    }

    #mainpage {
        height: 100vh;
        width: 100vw;
        position: absolute;
        top: 0;
        left: 0;
    }
    
    #postlink {
        position: absolute;
        top: 100vh;
        height: 60vh;
        width: 100vw;
    }

    #cards {
        position: absolute;
        top: 200vh;
        height: 100vh;
        width: 100vw;
        overflow-y: hidden;
    }

    #git-logo {
        position: absolute;
        top: 1100px;
        left: -100px;
        width: 400px;
        /* transform: scale(0.45); */
        filter: drop-shadow(0 0 40px rgba(0, 0, 0, 0.288));
    }

    #k8s-logo {
        position: absolute;
        top: 1200px;
        left: 100px;
        width: 400px;
        /* transform: scale(0.5); */
        filter: drop-shadow(0 0 40px rgba(0, 0, 0, 0.288));
    }

    #devops-logo {
        /* transform: scale(0.8); */
        position: absolute;
        inset: 0;
        top: -100px;
        left: 200px;
        width: 2000px;
    }

    .parallax {
        height: 100vh;

        overflow-x: hidden;
        overflow-y: auto;

        perspective: 5px;
        background-image: linear-gradient(156deg, rgba(255,226,161,1) 0%, rgba(231,114,255,1) 54%, rgba(0,212,255,1) 100%);
    }

    .parallax-layer {
        position: absolute;
        inset: 0;
    }

    .level {
        --scaleMod: calc(var(--depth)*-0.1 + 1);
        --translateMod: calc(var(--depth) * 1px);
        transform: translateZ(var(--translateMod)) scale(var(--scaleMod));
        background-size: 100%;
    }

    :global(body) {
        margin: 0;
    }

    @media screen and (orientation: portrait) {

        #k8s-logo, #git-logo {
            display: none;
        }

        #postcopy {
            right: 20px;
            left: 0;
        }

        .postlinkdesc {
            margin-right: 50px;
            max-width: 100vw;
            margin-left: 50px;
        }
        
        #first-copy {
            left: 5px;
            font-size: 90px;
        }

        #postlink {
            height: 100vh;
        }
    }

</style>