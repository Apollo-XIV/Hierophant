<div id="navbar">
<div id="context">
    <ul>
        <li><a class="hover-underline" href='/posts'>View All Posts</a></li>
        <li><a class="hover-underline" href='/posts/new'>Create New Post</a></li>
        <li><a class="hover-underline" href='/media'>Upload Media</a></li>
        <li><a class="hover-underline" href='/moderation'>Moderation</a></li>
        <li><a class="hover-underline" href='/metering'>Metering</a></li>
    </ul>
</div>
</div>


<style>

    @import url('https://fonts.cdnfonts.com/css/futura-std-4');

    :global(body) {
        margin: 0;
        padding: 0;
    }
    #navbar {
        width: 300px;
        height: 100%;
        position: fixed;
        background-image: url('/city.png');
        left: 0;
        top: 50px;
    }

    #context {
        height: 100%;
        width: 300px;
        backdrop-filter: blur(10px);
        background-color: transparent;
        position: fixed;
        top: 50px;
        left: 0;
    }
    ul li {
        list-style-type: none;
        padding: 10px;
        overflow: hidden;
    }

    ul {
        padding-left: 0;
    }

    ul li a.hover-underline {
        display: inline-block;
        position: relative;
        width: 100%;
        text-decoration: none;
        color: white;
        font-family: 'Futura Std';
        font-size: larger;
        margin-left: 30px;
    }

    ul li a.hover-underline::after {
        content: '';
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: white;
        transform-origin: bottom right;
        transition: transform 300ms ease-out;
    }

    ul li a.hover-underline:hover::after {
        transform: scaleX(1);
        transform-origin: bottom right;
    }
</style>