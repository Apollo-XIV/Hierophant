<header>
    <nav>
        <ul id=menu>
            <li style="font-family: 'Grozery', 'D050000L'; font-size: 20px; margin-right: 10px;" id="logo"><a href='/'>Hierophant</a></li>
            <li><a href='/'>About</a></li>
            <li><a href="/posts">Posts</a></li>
        </ul>
    </nav>
</header>

<style>

    @import url('https://fonts.cdnfonts.com/css/grozery');
    @import url('https://fonts.cdnfonts.com/css/monosphere-personal-use');

    ul#menu {
        background-color: black;
        padding: 10px;
        margin:0;
        padding-left: 50px;
    }
    ul#menu li {
        display: inline;
        padding: 10px;
        height: 100%;
    }

    ul#menu a {
        color: white;
        text-decoration: none;
        transition: ease-in-out 200ms;
    }

    ul#menu a:hover {
        opacity: 0.6;
        transform: translate(300px, 0);
    }


    ul#menu li:not(#logo) a {
        font-family: 'Monosphere Personal Use', sans-serif;
        font-size: large;
        transform: translate(-50px 50px);
    }

    header {
        position: fixed;
        top: 0;
        width: 100%;
    }

</style>