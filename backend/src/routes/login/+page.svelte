<script>
    import { signIn } from '@auth/sveltekit/client';
</script>

<svelte:head>
    <title>Login | Hierophant</title>
</svelte:head>

<div id="wrapper">
    <div id="bg">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="" width="100vw" height="100vh"><defs><linearGradient gradientTransform="rotate(-208, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="gggrain-gradient2"><stop stop-color="hsla(178, 92%, 24%, 1.00)" stop-opacity="1" offset="-0%"></stop><stop stop-color="rgba(255,255,255,0)" stop-opacity="0" offset="100%"></stop></linearGradient><linearGradient gradientTransform="rotate(208, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="gggrain-gradient3"><stop stop-color="hsl(212, 72%, 59%)" stop-opacity="1"></stop><stop stop-color="rgba(255,255,255,0)" stop-opacity="0" offset="100%"></stop></linearGradient><filter id="gggrain-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.53" numOctaves="2" seed="325" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
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
            </filter></defs><g><rect width="100%" height="100%" fill="hsl(272, 100%, 50%)"></rect><rect width="100%" height="100%" fill="url(#gggrain-gradient3)"></rect><rect width="100%" height="100%" fill="url(#gggrain-gradient2)"></rect><rect width="100%" height="100%" fill="transparent" filter="url(#gggrain-filter)" opacity="0.45" style="mix-blend-mode: soft-light"></rect></g></svg>    </div>
    <div id="page">
        <h1>Hierophant Admin</h1>
        <p>This is the admin panel for Hierophant</p>
        <p>Please login via github to continue</p>
        <a on:click={() => signIn('github')} class="btn btn-block btn-social btn-github">
            <i class="fa fa-github"></i> Sign in with Github
        </a>
        <p>Not supposed to be here?</p>
        <a href="https://hierophant.dev">Go to Hierophant -></a> 
    </div>
</div>


<style>
    @import url('https://fonts.cdnfonts.com/css/futura-std-4');
    @import url('https://fonts.cdnfonts.com/css/grozery');
    @import url('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');
    @import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/bootstrap-social/4.12.0/bootstrap-social.min.css');

    svg {
        margin-right: 15px;
    }

    h1 {
        font-family: 'Grozery';
        color: white;
        overflow: wrap;
    }

    p {
        color: white;
        font-family: 'Futura Std';
        margin: 9px;
        line-height: 13px;
    }

    a {
        font-size: large;
    }

    #bg {
        z-index: -1;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
    }

    #page {
        background-color: rgb(44, 44, 44);
        height: 400px;
        width: 350px;
        display: flex;
        justify-content: center;
        flex-flow: column;
        padding: 20px;
        box-sizing: border-box;
        border-radius: 20px;
        filter: drop-shadow(0px 10px 0.75rem #000);
        text-align: center;
    }

    #wrapper {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;    
    }

    :global(body) {
        margin: 0;
        padding: 0;
    }
</style>
