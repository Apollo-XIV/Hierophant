<script>
    import Header from "../components/header.svelte";
</script>
<svelte:head>
    <link rel="preload" as="style" href="https://fonts.cdnfonts.com/css/ibm-plex-sans" crossorigin>
    <link href="https://fonts.cdnfonts.com/css/ibm-plex-sans" rel="stylesheet" crossorigin>
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
        </div>
        
    </div>
</div>

<style>
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
        top: 20px;
        left: 0;
        right: 0;
        z-index: 1;
        align-self: center;

        height: 1000px;
    }

    #logo h1 {
        color: white;
        font-family: 'Grozery', 'Palatino';
        font-size: 100px;
        position: relative;
        padding-top: 170px ;
    }

    #postlink {
        position: absolute;
        top: 100vh;
        height: 100vh;
        width: 100vw;
    }
</style>