<header>
    <nav>
        <ul id=menu>
            <li style="font-family: 'Grozery', 'Monosphere Personal Use'; font-size: 20px; margin-right: 10px;" id="logo"><a href='/'>Hierophant</a></li>
            <li class="test"><a href='/'>About</a></li>
            <li class="test"><a href="/posts">Posts</a></li>
        </ul>
    </nav>
</header>

<style>

    @import url('https://fonts.cdnfonts.com/css/grozery');

    ul#menu {
        background-color: none;
        padding: 10px;
        margin:0;
        padding-left: 50px;
    }
    ul#menu li {
        display: inline;
        padding: 10px;
        height: 100%;
        vertical-align: middle;
    }

    ul#menu a {
        color: white;
        text-decoration: none;
        transition: ease-in-out 200ms;
    }

    ul#menu a:hover {
        opacity: 0.6;
    }

    ul#menu li:not(#logo) a {
        font-family: 'Monosphere Personal Use', sans-serif;
        font-size: large;
    }

    header {
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        height: 50px;
        width: 100%;
        overflow-x: scroll;
        -ms-overflow-style: none;
        scrollbar-width: none;
        background-image: url("/gradient.svg");
        background-repeat: no-repeat;
        background-size: cover;
    }

    header::-webkit-scrollbar {
        display: none;
    }

</style>