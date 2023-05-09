<script>
    import PostListing from '$lib/components/postListing.svelte';
    import { onMount } from "svelte";

    export let data;
    let posts = data.summaries;
    let mainStatus;
    let header;
    let scrollPosition;
    let postbox;
    let selector;
    let innerHeight;
    let innerWidth;

    async function parseScroll() {
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
        let dispVar = 350 - scrollPosition;
        if (dispVar < 120) {
            postbox.style.setProperty('--displacement', "120px");
            return;
        }
        postbox.style.setProperty('--displacement', String(dispVar)+"px");
    }

    async function moveSelector(event) {
        let posValTop = event.detail.reference.getBoundingClientRect().top;
        let posValBtm = innerHeight - event.detail.reference.getBoundingClientRect().bottom;
        
        if (posValTop < 120) {
            posValTop = 120;
        }

        if (posValBtm < 50) {
            posValBtm = 52;
        }
        selector.style.setProperty('opacity', "1");
        selector.style.setProperty('top', String(posValTop)+"px");
        selector.style.setProperty('bottom', String(posValBtm)+"px");
    }

    async function hideSelector(event) {
        selector.style.setProperty('opacity', "0");
    }

    onMount(() => {
        parseScroll();
        //moveSelector();
    })

</script>
<svelte:window bind:innerWidth bind:innerHeight />

<h1>All Posts</h1>
<div bind:this={postbox} id="posts">
    {#each posts as post}
        <PostListing post={post} on:leave={hideSelector} on:hover={moveSelector}/>
    {/each}
</div>
<span bind:this={selector} id="selector"></span>


<style>

    h1 {
        color: white;
        font-family: 'IBM Plex Sans';
        margin-top: 200px ;
        text-transform: capitalize;
        font-weight: bold;
    }

    :global(body) {
        background-color: #1F1E20;
        background-image: url('/perlin.png');
        background-size: 50%;
        background-position-y: -80px;
        overflow-x: hidden;
        margin: 0;
    }

    #posts {
        --displacement: 350px;
        display: inline-block;
        max-width: 100%;
        width: max-content;
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
        transition: top ease;
    }

    #selector {
        width: 1px;
        background-image: linear-gradient(0deg, rgba(161,254,255,0) 0%, rgba(102,73,191,1) 50%, rgba(231,114,255,0) 100%);
        position: fixed;
        right: 210px;
        opacity: 0;
        transition: top ease 300ms, bottom ease 300ms, opacity ease 300ms;
    }

    @media screen and (orientation: portrait) {
        :global(body) {
            background-size: contain;
            overflow: hidden;
            height: 844px;
        }

        #posts::after {
            display: none;
        }

        #selector {
            display: none;
        }

        #posts {
            box-sizing: border-box;
            margin-top: 0px;
            padding-left: 10px;
            padding-right: 10px;
        }

    }

</style>