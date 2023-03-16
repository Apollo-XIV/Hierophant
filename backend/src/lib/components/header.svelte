<header>
    <nav>
        <ul id=menu>
            <li style="font-family: 'Grozery', 'D050000L'; font-size: 20px; margin-right: 10px;" id="logo"><a href='/'>Hierophant | Admin</a></li>
        </ul>
    </nav>
</header>


<style>
    @import url('https://fonts.cdnfonts.com/css/grozery');
    @import url('https://fonts.cdnfonts.com/css/monosphere-personal-use');

    header { 
        background-color: black;
        width: 100vw;
        height: 50px;
        position: fixed;
        top: 0;
        left: 0;
        filter: drop-shadow(0 0 0.5rem #000);
    }

    ul#menu {
        padding: 10px;
        margin:0;
        padding-left: 30px;
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

</style>