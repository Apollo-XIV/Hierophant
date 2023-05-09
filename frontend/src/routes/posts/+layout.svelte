<script>
    import { onMount } from "svelte";

    let mainStatus;
    let header;
    let scrollPosition;
    let innerHeight;
    let innerWidth;

    async function parseScroll() {
        scrollPosition = mainStatus.scrollTop;
        handleFade();
    }

    async function handleFade() {
        if (scrollPosition < 100) {
            header.style.setProperty('--opacity', "0");
        } else {
            header.style.setProperty('--opacity', "1");
        }
    }

    onMount(() => {
        parseScroll();
        //moveSelector();
    })

</script>
<svelte:window bind:innerWidth bind:innerHeight />

<header bind:this={header}></header>
<main bind:this={mainStatus} on:scroll={parseScroll}>
    <slot />
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
        overflow-y: scroll;
        text-align: center;
        overflow-x: hidden;
    }

    :global(body) {
        background-color: #1F1E20;
        background-image: url('/perlin.png');
        background-size: 50%;
        background-position-y: -80px;
        overflow-x: hidden;
        margin: 0;
    }

    @media screen and (orientation: portrait) {
        :global(body) {
            background-size: contain;
            overflow: hidden;
            height: 844px;
        }

        header {
            background-size: cover;
            transition: filter ease 300ms;
            filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, calc(var(--opacity)*0.874)));
            z-index: 6;
        }

        header::before {
            opacity: 0;
        }

        header::before {
            left: -20px;
            right: -20px;
        }
    }

</style>