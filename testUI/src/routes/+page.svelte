<script>
    import PostLink from '../components/postlink.svelte';
    import Header from "../components/header.svelte";
    import Postcard from "../components/postcard.svelte";
    import Post from "../components/postcard.svelte";
    import Postlink from '../components/postlink.svelte';
</script>
<svelte:head>
    <link rel="preload" as="style" href="https://fonts.cdnfonts.com/css/ibm-plex-sans" crossorigin>
    <link href="https://fonts.cdnfonts.com/css/ibm-plex-sans" rel="stylesheet" crossorigin>
    <link rel="preload" as="style" href="https://fonts.cdnfonts.com/css/ibm-plex-mono-3" crossorigin>
    <link href="https://fonts.cdnfonts.com/css/ibm-plex-mono-3" rel="stylesheet" crossorigin>
    <link rel="preload" as="style" href="https://fonts.cdnfonts.com/css/grozery" crossorigin>
    <link href="https://fonts.cdnfonts.com/css/grozery" rel="stylesheet" crossorigin>
</svelte:head>

<div id="main">
    <div id="mainpage">
        <div id="logo">
            <h1>Hierophant</h1>
        </div>
        <div id="first-copy">
            <p>Dev-Ops& CI/CD& Automation<span>& WebDev.</span></p>
        </div>
    </div>
    <div id="postlink">
        <div id="postcopy">
            <p>
                Learn Dev-Ops <br><span>Easier</span>
            </p>
            <p id="postlinkdesc">This is some descriptive text about what this site is about. This text is quite plain right now but I'll change it later to be better</p>
            <Postlink/>
        </div>
    </div>
    <div id="cards">
        <div id="flexcards">
            <Postcard/>
        </div>
    </div>
</div>

<style>

    #cards {
        position: absolute;
        top: 200vh;
        height: 100vh;
        width: 100vw;
        left: 400px;
    }

    #flexcards {
        display: flexbox;
    }

    #postlinkgrad {
        background-image: linear-gradient(336deg, rgba(255,226,161,1) 0%, rgba(231,114,255,1) 54%, rgba(0,212,255,1) 100%);
        width: fit-content;
        height: 50px;
        display: inline-block;
        border-radius: 25px;
    }

    #postlinkdesc {
        color: white;
        font-family: 'IBM Plex Mono';
        font-weight: normal;
        font-size: medium;
        max-width: 50vw;
        line-height: normal;
        text-align: left;
        
    }

    #postcopy a {
        background-color: white;
        border-radius: 25px;
        text-decoration: none;
        font-size: large;
        line-height: normal;
        color: black;
        display: inline-block;
        mix-blend-mode: screen;
        padding: 15px;
        width: 100%;
        position: relative;
        top: 0;
    }

    #mainpage {
        height: 100vh;
        width: 100vw;
        position: absolute;
        top: 0;
        left: 0;
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

    #main {
        background-image: url("/bg.png"), linear-gradient(336deg, rgba(255,226,161,1) 0%, rgba(231,114,255,1) 54%, rgba(0,212,255,1) 100%);
        background-size: cover;
        background-position: top;
        background-repeat: no-repeat;
        width: 100vw;
        height: 400vh;
    }

    #logo {
        background-image: url("/Logofaint.png");
        background-size: contain;
        background-repeat: no-repeat;
        height: fit-content;
        width: min-content;
        margin: 0 auto;
        position: absolute;
        top: 0px;
        left: 0;
        right: 0;
        z-index: 1;
        align-self: center;

        height: 500px;
    }

    #logo h1 {
        color: white;
        font-family: 'Grozery', 'Palatino';
        font-size: 100px;
        position: relative;
        padding-top: 170px ;
        text-align: center;
    }

    #postlink {
        position: absolute;
        top: 100vh;
        height: 100vh;
        width: 100vw;
    }
</style>