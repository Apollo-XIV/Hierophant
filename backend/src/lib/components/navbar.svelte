<div id="navbar">
    <ul>
        <li><a href='/posts'>View All Posts</a></li>
        <li><a href='/posts/new'>Create New Post</a></li>
        <li><a href='/media'>Upload Media</a></li>
        <li><a href='/moderation'>Moderation</a></li>
        <li><a href='/metering'>Metering</a></li>
    </ul>
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
        background-color: rgb(43, 47, 51);
        position: fixed;
        left: 0;
        top: 50px;
    }
    ul li {
        list-style-type: none;
        padding: 10px;
        border-bottom: 1px solid rgb(22, 22, 23);
    }

    ul {
        padding-left: 0;
    }

    ul li a {
        text-decoration: none;
        color: white;
        font-family: 'Futura Std';
        font-size: larger;
        padding-left: 30px;
    }
</style>