<div id="gradient">
    <div id="bg">
        <a href="/posts">SEE ALL POSTS</a>
    </div>
</div>

<style>

    #gradient {
        background-image: linear-gradient(336deg, rgba(255,226,161,1) 0%, rgba(231,114,255,1) 54%, rgba(0,212,255,1) 100%);
        border-radius: 25px;
        position: relative;
        height: 50px;
        width: 200px;
    }

    #gradient::before {
        opacity: 0;
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
        background: linear-gradient(336deg, rgba(255,226,161,1) 0%, rgba(231,114,255,1) 54%, rgba(0,212,255,1) 100%);
        z-index: -2;
        filter: blur(40px);
        transition: opacity ease-in-out 200ms
    }

    #gradient:hover::before {
        opacity: 1;
    }

    #bg {
        position: absolute;
        top: 5px;bottom: 5px;left:5px;right:5px;
        background-color: white;
        color: black;
        border-radius: 25px;
        border: 5px solid transparent;
        mix-blend-mode: screen;
        text-decoration: none;
        font-size: large;
        line-height: normal;
        text-align: center;
    }

    #bg a {
        position: absolute;
        top: 0;bottom: 0;left:0;right:0;
        color: black;
        text-decoration: none;
        vertical-align: middle;
    }

    @media screen and (orientation: portrait) {
        #gradient {
            margin-left: 50px;
        }
    }
</style>