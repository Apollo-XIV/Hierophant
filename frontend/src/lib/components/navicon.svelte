<script>

    let popup;

</script>
<icon>
    <img style="height: 60px; cursor: pointer " src="/Logofaint.png" on:click={popup.style.setProperty("display", "flex")}/>
    <popup bind:this={popup} on:click={popup.style.setProperty("display", "none")}>
        <options>
            <a style="font-size: 40px" href="/" >HOME</a>
            <a href="/posts">ALL POSTS</a>
        </options>
    </popup>
</icon>

<style>

    img {
        transition: transform ease 100ms;
    }

    img:active {
        transform: scale(0.9);
    }

    options {
        width: 300px;
        height: auto;
        background-color: white;
        border-radius: 12px;
        padding: 10px;
    }

    options a {
        text-decoration: none;
        font-family: 'IBM Plex Sans';
        font-weight: bold;
        font-size: x-large;
        line-height: 40px;
        text-align: center;
        display: block;
        color: rgb(6, 0, 0);
        transition: transform ease 300ms;
    }

    options a:hover {
        transform: scale(1.1);
    }

    popup {
        display: none;
        overflow: hidden;
        position: fixed;
        inset: 0;
        background-color: rgba(2, 1, 7, 0.615);
        align-items: center;
        justify-content: center;
    }

    icon {
        display: flex;
        position: absolute;
        inset: 0;
        justify-content: center;
        align-items: center;
    }

    p {
        color: white;
        display: inline-block;
    }
</style>