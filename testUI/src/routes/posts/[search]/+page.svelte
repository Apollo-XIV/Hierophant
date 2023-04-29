<script>
    import PostListing from './postListing.svelte';
    import { onMount } from "svelte";

    let numbers = [...Array(10).keys()]
    let mainStatus;
    let header;
    let scrollPosition;
    let postbox;

    function parseScroll() {
        scrollPosition = mainStatus.scrollTop;
        handleFade();
        transitionBar();
    }

    async function handleFade() {
        if (scrollPosition < 100) {
            header.style.setProperty('--opacity', "0");
        } else {
            header.style.setProperty('--opacity', "1");
        }
    }

    async function transitionBar() {
        
    }

    onMount(() => parseScroll())

</script>

<header bind:this={header}></header>
<main bind:this={mainStatus} on:scroll={parseScroll}>
    <h1>All Posts</h1>
    <div bind:this={postbox} id="posts">
        {#each numbers as number}
            <PostListing/>
        {/each}
    </div>

</main>

<style>

    header {
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        height: 80px;
        max-height: 80px;
        background: #1F1E20;
        background-image: url('/perlin.png');
        background-size: 50%;
        background-position-y: -80px;
        --opacity: 0
    }

    header::before {
        transition: opacity ease-in 300ms;
        content: ''; 
        position: absolute;
        z-index: -1;
        display: block;
        top: 25px;
        left: 40px;
        right: 40px;
        border-radius: 50%;
        height: 100px;
        background: rgb(0, 0, 0);
        opacity: var(--opacity);
        filter: blur(10px);
        transform: scale(1, 0.2);
    }

    main {
        max-height: calc(100vh - 80px);
        overflow: scroll;
    }

    main h1 {
        color: white;
        font-family: 'IBM Plex Sans';
        text-transform: uppercase;
        margin-left: 300px;
        margin-top: 200px;
        font-size: 40px;
    }

    :global(body) {
        background-color: #1F1E20;
        background-image: url('/perlin.png');
        background-size: 50%;
        background-position-y: -80px;
    }

    #posts {
        position: relative;
        margin: 100px;
        margin-top: 0;
        margin-left: 300px;
        --displacement: 350px;
    }

    #posts::after {
        content: '';
        position: fixed;
        right: 200px;
        top: var(--displacement);
        bottom: 50px;
        width: 10px;
        background: rgb(13, 12, 14);
        border-radius: 20px;
    }

</style>