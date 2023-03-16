<script>
    import {page} from "$app/stores";
    let path;
    $: path = $page.url.pathname
    $: console.log(path)
</script>

<div id="navbar">
    <div id="gradient">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 700 700" width="700" height="700"><defs><linearGradient gradientTransform="rotate(-192, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="gggrain-gradient2"><stop stop-color="hsla(194, 83%, 49%, 0.00)" stop-opacity="1" offset="-0%"></stop><stop stop-color="rgba(255,255,255,0)" stop-opacity="0" offset="100%"></stop></linearGradient><linearGradient gradientTransform="rotate(192, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="gggrain-gradient3"><stop stop-color="hsl(144, 100%, 16%)" stop-opacity="1"></stop><stop stop-color="rgba(255,255,255,0)" stop-opacity="0" offset="100%"></stop></linearGradient><filter id="gggrain-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.71" numOctaves="2" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
            <feColorMatrix type="saturate" values="0" x="0%" y="0%" width="100%" height="100%" in="turbulence" result="colormatrix"></feColorMatrix>
            <feComponentTransfer x="0%" y="0%" width="100%" height="100%" in="colormatrix" result="componentTransfer">
              <feFuncR type="linear" slope="3"></feFuncR>
              <feFuncG type="linear" slope="3"></feFuncG>
              <feFuncB type="linear" slope="3"></feFuncB>
            </feComponentTransfer>
            <feColorMatrix x="0%" y="0%" width="100%" height="100%" in="componentTransfer" result="colormatrix2" type="matrix" values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 18 -10"></feColorMatrix>
        </filter></defs><g><rect width="100%" height="100%" fill="hsl(287, 97%, 32%)"></rect><rect width="100%" height="100%" fill="url(#gggrain-gradient3)"></rect><rect width="100%" height="100%" fill="url(#gggrain-gradient2)"></rect><rect width="100%" height="100%" fill="transparent" filter="url(#gggrain-filter)" opacity="0.43" style="mix-blend-mode: soft-light"></rect></g></svg>
    
    </div>
    <ul>
        <li><a class="hover-underline" class:is-active={path.includes("/posts") && path != "/posts/new"} href='/posts'>View All Posts</a></li>
        <li><a class="hover-underline" class:is-active={path === "/posts/new"} href='/posts/new'>Create New Post</a></li>
        <li><a class="hover-underline" class:is-active={path === "/media"} href='/media'>Upload Media</a></li>
        <li><a class="hover-underline" class:is-active={path === "/moderation"} href='/moderation'>Moderation</a></li>
        <li><a class="hover-underline" class:is-active={path === "/metering"} href='/metering'>Metering</a></li>
    </ul>
</div>


<style>

    @import url('https://fonts.cdnfonts.com/css/futura-std-4');

    :global(body) {
        margin: 0;
        padding: 0;
    }

    #gradient {
        width: 300px;
        height: 100%;
        overflow: hidden;
        position: fixed;
        top: 50px;
        left: 0px;
        z-index: -1;
        opacity: 1;
        background-color: #581274;
    }

    #gradient svg {
        opacity: 0.6;
        transform: scaleY(1.7) scaleX(01);
    }

    #navbar {
        width: 300px;
        height: 100%;
        position: fixed;
        left: 0;
        top: 50px;
        background: #25013300;
    }

    ul li {
        list-style-type: none;
        padding: 10px;
        overflow: hidden;
        width: 100%;
        box-sizing: border-box;
        overflow: visible;
    }

    ul {
        padding-left: 0;
    }

    ul li a {
        text-decoration: none;
        color: white;
        width: 90%;
        display: inline-block;
        font-family: 'Futura Std';
        font-size: large;
        padding: 10px;
        text-align: right;
        transition: 300ms ease;
    }


    .is-active {
        border-radius: 10px;
        background: linear-gradient(225deg, #74378c86, #8a41a7);
        box-shadow:  -17px 17px 31px #67317d,
             17px -17px 31px #9b49bb;
    }

    ul li a:hover {
        border-radius: 12px;
        background: linear-gradient(225deg, #74378c86, #8a41a7);
        box-shadow:  -11px 11px 23px #7c3b96,
             11px -11px 23px #863fa2;
    }
</style>