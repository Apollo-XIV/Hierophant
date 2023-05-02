<script>
    //import tilt from '$lib/modules/tilt.js'
    import { onMount } from 'svelte';
    import VanillaTilt from 'vanilla-tilt';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    let tilting;

    let unit;

    // function hover() {
    //     dispatch('hover', {reference: unit});
    // }

    // function absence() {
    //     dispatch('absence');
    // }

    onMount(()=>{
        VanillaTilt.init(tilting, {
            max: 1,
            gyroscope: false,
            speed: 600,
            reverse: true,
            perspective: 1000,
        })
    });
    
    let title = "A Sample Title Thats Too Long For The Box Or Maybe Not I Guess I'll Keep Typing";
    let slug = "post";

</script>


<svelte:head>
    <link rel="preload" as="style" href="https://fonts.cdnfonts.com/css/ibm-plex-sans" crossorigin>
    <link href="https://fonts.cdnfonts.com/css/ibm-plex-sans" rel="stylesheet" crossorigin>
    <link rel="preload" as="style" href="https://fonts.cdnfonts.com/css/ibm-plex-mono-3" crossorigin>
    <link href="https://fonts.cdnfonts.com/css/ibm-plex-mono-3" rel="stylesheet" crossorigin>
</svelte:head>


<!-- <a id="link" bind:this={unit} href="posts/{slug}" on:mouseleave={absence} on:focus={hover} on:mouseover={hover}> -->
<a id="link" href="test">
    <div bind:this="{tilting}" id="bg" data-tilt>
    <glow-effect></glow-effect>
    <div id="main">
        <div id="text">
            <h3 id="title" data-value="{title}">{title}</h3>
            <p id="abstract">a sample description</p>
            <div id="meta-info">
                <p id="author" class="meta"><a href="/author/all">Alex Crease</a></p>
                <p id="tags" class="meta">#WebDev #Svelte</p>
            </div>
        </div>
    </div>
</div>
</a>

<style>

    /* Border CSS */

    #link {
        display: inline-block;
        backdrop-filter: blur(5px);
    }

    #bg {
        max-width: 800px;
        --r: 12px
        position: relative;
        background-color: #11112436;
        height: min-content;
        width: fit-content;
        border-radius: 12px;
        z-index: 1;
        
        
    }

    h3,p {
        text-align: left;
    }

    #bg glow-effect::before {
        content: "";
        position: absolute;
        inset: -5px;
        border-radius: var(--r);
        background: linear-gradient(336deg, rgba(255,226,161,1) 0%, rgba(231,114,255,1) 54%, rgba(0,212,255,1) 100%);
        filter: blur(10px);
        opacity: 0;
        transition: opacity ease-out 0.5s;
        pointer-events: none;
    }

    #bg glow-effect {
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

    #bg:hover glow-effect::before {
        opacity: 1;
    }

    #main {
        color: #313149;
        padding: 10px;
        width: inherit;
        height: auto;
        display: inline-block;
        margin: 0 0;
        position: relative;
        z-index: 0;
    }

    #main::before {
        content: "";
        position: absolute;
        z-index: -1;
        inset: 0;
        padding: 1px;
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

    #text {
        margin: 0 15px 0 15px;
    }

    /* Text Styling */

    h3 {
        font-family: 'IBM Plex Sans';
        font-variant: small-caps;
        font-weight: bold;
        font-size: xx-large;
        color: white;
        line-height: 35px;
        margin-top: 15px;
        position: relative;
    }

    h3::before {
        position: absolute;
        width: 100%;
        font-size: xx-large;
        content: attr(data-value);
        filter: blur(5px);
        color: rgba(255, 255, 255, 0.295);
    }

    #abstract {
        font-family: 'IBM Plex Mono';
        font-size: large;
        font-style: italic;
        color: white;
        margin-top: -25px;
    }

    #meta-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: -15px;
        margin-top: -25px;
    }

    .meta {
        color: white;
        font-family: 'IBM Plex Sans';
        font-weight: lighter;
        font-size: larger;
        text-transform: uppercase;
    }

    #author {
        display: inline;
    }

    #author a {
        text-decoration: none;
        color: white;
        position: relative;
    }
    
    #author a::after {
        content: '';
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 1px;
        bottom: 0;
        left: 0;
        background-color: #ffffff;
        transform-origin: bottom left;
        transition: transform 150ms ease-in-out;
    }

    #author a:hover::after {
        transform: scaleX(1);
    }

    #tags {
        display: inline;
        text-align: right;
    }

</style>

