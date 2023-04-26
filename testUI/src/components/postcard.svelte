<svelte:head>
    <link rel="preload" as="style" href="https://fonts.cdnfonts.com/css/ibm-plex-sans" crossorigin>
    <link href="https://fonts.cdnfonts.com/css/ibm-plex-sans" rel="stylesheet" crossorigin>
    <link rel="preload" as="style" href="https://fonts.cdnfonts.com/css/ibm-plex-mono-3" crossorigin>
    <link href="https://fonts.cdnfonts.com/css/ibm-plex-mono-3" rel="stylesheet" crossorigin>
</svelte:head>
<div id="bag">
    <div id="test">
        <p>This is a test</p>
    </div>
</div>



<!-- 
<div id="boundary">
    <div id="bg">
    <h3>
        Making a Blog From Scratch With Sveltekit
    </h3>
    <h4>
        A simple tutorial on how to absdfgasdgasdngljasdnbgljgn sdljfg;sadfg  sample text :)
    </h4>
    </div>
</div> -->

<style>

    #bag {
        background-color: #31314945;
    }

    #test {
        color: #313149;
        padding: 10px;
        display: inline-block;
        margin: 75px 0;
        position: relative;
        z-index: 0;
    }

    #test::before {
        content: "";
        position: absolute;
        z-index: -1;
        inset: 0;
        padding: 5px;
        border-radius: 15px;
        background: linear-gradient(to right, red, green);
        -webkit-mask:
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
                mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
                mask-composite: exclude;
    }

    #bg {
        top: 0; right: 0; left: 0; bottom: 0;
        background: rgba(70, 62, 80, 0.35);
        border: 2px solid;
        border-image: linear-gradient(336deg, rgba(255,226,161,1) 0%, rgba(231,114,255,1) 54%, rgba(0,212,255,1) 100%) 1;
        padding: 1rem
    }

    #boundary {
        position: absolute;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        backdrop-filter: blur(2px);
        border-radius: 11px;
        overflow: hidden;
        height: fit-content;
        width: 800px;
    }

    #boundary h3 {
        color: white;
        font-family: 'IBM Plex Sans';
        font-weight: bold;
        font-size: xx-large;
        text-transform: uppercase;
        line-height: 30px;
        margin-bottom: -15px;
    }

    #boundary h4 {
        color: white;
        font-family: 'IBM Plex Mono';
        overflow: wrap;
        font-weight: normal;
        font-style: italic;
    }

</style>


<!-- /* Frame 1 */

position: absolute;
width: 897px;
height: 216px;
left: 112px;
top: 326px;

filter: drop-shadow(0px 0px 12px rgba(255, 255, 255, 0.25));
border-radius: 12px;


/* making a blog from scratch with sveltekit */

position: absolute;
width: 499px;
height: 70px;
left: 32px;
top: 28px;

font-family: 'IBM Plex Mono';
font-style: normal;
font-weight: 700;
font-size: 32px;
line-height: 35px;
/* or 109% */
text-transform: uppercase;

color: rgba(255, 255, 255, 0.4);



/* Rectangle 2 */

box-sizing: border-box;

position: absolute;
left: 0px;
right: 0px;
top: 1px;
bottom: 0px;

background: rgba(70, 62, 80, 0.35);
backdrop-filter: blur(2px);
/* Note: backdrop-filter has minimal browser support */
border-radius: 11px;


/* #webdev #svelte */

position: absolute;
width: 180px;
height: 35px;
left: 703px;
top: 169px;

font-family: 'IBM Plex Mono';
font-style: normal;
font-weight: 100;
font-size: 20px;
line-height: 35px;
/* identical to box height, or 175% */
text-transform: uppercase;

color: #FFFFFF;



/* making a blog from scratch with sveltekit */

position: absolute;
width: 499px;
height: 70px;
left: 32px;
top: 28px;

font-family: 'IBM Plex Mono';
font-style: normal;
font-weight: 700;
font-size: 32px;
line-height: 35px;
/* or 109% */
text-transform: uppercase;

color: #FFFFFF;



/* alex crease */

position: absolute;
width: 132px;
height: 35px;
left: 26px;
top: 169px;

font-family: 'IBM Plex Mono';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 35px;
/* identical to box height, or 175% */
text-transform: uppercase;

color: #FFFFFF;



/* An explanation of how I made this site & some of the challenges therein */

position: absolute;
width: 633px;
height: 47px;
left: 32px;
top: 108px;

font-family: 'IBM Plex Mono';
font-style: italic;
font-weight: 400;
font-size: 20px;
line-height: 24px;
/* or 118% */

color: #FFFFFF;
 -->
