<!-- // POSTCARD COMPONENT                                                                                                                                                   -->
<!-- // USAGE:     <PostCard on:hover={hoverTest} on:leave={hoverTest} post={{title: "Default Title thats quite long", abstract: "test", author: "test", tags: ["test"]}} /> -->
<!-- // OBJ FORMAT: {title: "", abstract: "", author: "", tags:[""]} -->

<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import VanillaTilt from 'vanilla-tilt';
    export let post = {
        title: "test",
        abstract: "test",
        author: "test",
        slug: "url",
        //tags: ["#test", "#test"],
    };
    export let enableTilt = true;
    //let tiltval = enableTilt ? 1 : 0;
    const dispatch = createEventDispatcher();
    let component;

    function hover() {
        dispatch('hover', {target: component});
    }

    function leave() {
        dispatch('leave');
    }

    onMount(() => {VanillaTilt.init(component, {max: (enableTilt ? 1 : 0), gyroscope: false, speed: 600,})});

</script>

<svelte:head>
    <link rel="preload" as="style" href="https://fonts.cdnfonts.com/css/ibm-plex-sans" crossorigin>
    <link href="https://fonts.cdnfonts.com/css/ibm-plex-sans" rel="stylesheet" crossorigin>
    <link rel="preload" as="style" href="https://fonts.cdnfonts.com/css/ibm-plex-mono-3" crossorigin>
    <link href="https://fonts.cdnfonts.com/css/ibm-plex-mono-3" rel="stylesheet" crossorigin>
    <link rel="preload" as="style" href="https://fonts.cdnfonts.com/css/grozery" crossorigin>
    <link href="https://fonts.cdnfonts.com/css/grozery" rel="stylesheet" crossorigin>
</svelte:head>

<a data-sveltekit-preload-code="off" bind:this={component} on:focus={hover} on:mouseover={hover} on:mouseleave={leave} on:focusout={leave} id="frame" href="/posts/{post.slug}" >
    <glow-effect />
    <gradient-border />
    <h3 id="post-title">{post.title}</h3>
    <p id="post-abstract">{post.abstract}</p>
    <p id="post-author" class="meta">{post.author}</p>
    <divider/>
    <!-- {#each post.tags as tag}
    <p id="post-tags" class="meta">{tag}</p>
    {/each} -->
</a>

<style>
    #frame {
        position: relative;
        background-color: #11112436;
        backdrop-filter: blur(5px);
        border-radius: 12px;
        box-sizing: border-box;
        padding: 20px;
        display: inline-flex;
        flex-flow: row wrap;
        align-items: stretch;
        max-width: 800px;
        min-width: fit-content;
        width: 100%;
        flex-basis: 800px;
        gap: 5px;
    }

    #post-title {
        display: block;
        width: 100%;
        font-family: 'IBM Plex Sans';
        font-variant: small-caps;
        font-weight: bold;
        font-size: xx-large;
        color: white;
        line-height: 30px;
        margin: 0;
        text-align: left;

    }
    
    #post-abstract {
        display: block;
        width: 100%;
        font-family: 'IBM Plex Mono';
        font-size: large;
        font-style: italic;
        color: white;
        margin: 0;
        text-align: left;

    }

    #post-author {
        display: inline;
    }

    #post-tags {
        display: content;
    }

    divider {
        flex-grow: 1;
    }

    .meta {
        margin: 0;
        color: white;
        font-family: 'IBM Plex Sans';
        font-weight: lighter;
        font-size: larger;
        text-transform: uppercase;
    }

    gradient-border {
        position: absolute;
        inset: 0;
        padding: 2px;
        border-radius: 12px;
        background: linear-gradient(336deg, rgba(255,226,161,1) 0%, rgba(231,114,255,1) 54%, rgba(0,212,255,1) 100%);
        -webkit-mask:
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
                mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
                mask-composite: exclude;
    }

    glow-effect {
        pointer-events: none;
        opacity: 1;
        position: absolute;
        inset: -150px;
        border: 150px solid #0000;
        border-radius: 165px;
        transform: translateZ(-1px);
        -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
        mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
                mask-composite: exclude;
    }

    glow-effect::before {
        content: "";
        position: absolute;
        inset: -5px;
        border-radius: 12px;
        background: linear-gradient(336deg, rgba(255,226,161,1) 0%, rgba(231,114,255,1) 54%, rgba(0,212,255,1) 100%);
        filter: blur(10px);
        opacity: 0;
        transition: opacity ease-out 0.5s;
        pointer-events: none;
    }

    #frame:hover glow-effect::before {
        opacity: 1;
    }

</style>