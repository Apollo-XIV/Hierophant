<script>
    import Postcard from "../../../components/postcard.svelte";
</script>

<div id="post">
    <Postcard/>
    <span id="divider"></span>
    <p id="date">1/2/34</p>
</div>

<style>

    #divider {
        flex-grow: 1;
        border-bottom: 1px dashed white;
        margin: 20px;
    }

    #post {
        display: flex;
        align-items:baseline;
        margin-right: 200px;
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

</style>

