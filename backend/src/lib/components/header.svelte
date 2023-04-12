<script>
    import { signOut } from "@auth/sveltekit/client";
    import { page } from "$app/stores";
</script>

<header>
    <nav>
        <ul id=menu>
            <li style="font-family: 'Grozery', 'D050000L'; font-size: 20px; margin-right: 10px; float: left; padding: 10px 0px 10px 0px" id="logo"><a href='/'>Hierophant | Admin</a></li>
            <li style="" id="identity"><span style="">Logged in as {$page.data.session.user?.name} </span><img alt="profile" id="pp" style="" src={$page.data.session.user?.image}/> | <a style="cursor: pointer" on:click={() => signOut()}>Sign Out</a></li>
        </ul>
    </nav>
</header>


<style>
    @import url('https://fonts.cdnfonts.com/css/grozery');
    @import url('https://fonts.cdnfonts.com/css/monosphere-personal-use');
    @import url('https://fonts.cdnfonts.com/css/futura-std-4');


    header { 
        background-color: black;
        width: 100vw;
        height: 50px;
        position: fixed;
        top: 0;
        left: 0;
        filter: drop-shadow(0 0 0.5rem #000);
    }

    #identity {
        color: white;
        font-family: 'Futura Std';
        float: right;
    }

    #pp {
        width: 35px;
        border-radius: 10px;
        margin-left: 10px;
        margin-right: 10px;
        transform: translate(0px,8px);
    }

    ul#menu {
        padding: 0;
        margin:0;
        list-style-type: none;
        overflow: hidden;
        padding-left: 30px;
    }
    ul#menu li {
        margin: 0;
        padding: 0 20px 0 0;
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