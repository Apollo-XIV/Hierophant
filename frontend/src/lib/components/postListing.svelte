<script>
    import PostCard from "$lib/components/postcard.svelte";
    export let post;
</script>

<div id="post">
    <PostCard post={post} on:hover on:leave/>
    <span id="divider"></span>
    <p id="date">1/2/34</p>
</div>

<style>

    #divider {
        flex-grow: 1;
        border-bottom: 1px dashed rgba(255, 255, 255, 0.375);
        margin: 20px;
        display: flex;
        min-width: 50px;
    }

    #post {
        display: flex;
        align-items:baseline;
    }

    #date {
        color: white;
        font-family: 'IBM Plex Sans';
        font-size: x-large;
        font-weight: lighter;
        line-height: 0px;
    }

    #post {
        position: relative;
        margin-top: 10px;
        
    }

    @media screen and (orientation: portrait) {
        #divider {
            display: none;
        }
        
        #date {
            display: none;
        }

        #post {
            margin-right: 0px;
        }

    }

</style>

