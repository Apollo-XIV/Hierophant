<script>
    export let data;
</script>

<div id="box" href='/{data.slug}'>
    <div id="cont">
        <p id="icon">{data.icon}</p>
        <h1>{data.title}</h1>
        <p>{data.abstract}</p>
    </div>
</div>

<style>
    @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");
    #box {
        width: 250px;
        height: 250px;
        border-radius: 30px;
        background-color: rgb(218, 218, 218);
    }
    #cont {
        margin: auto;
    }

    #icon {
        font-family: 'Bootstrap-icons';
        font-size: 150px;
        color: grey;
        text-align: center;
        margin-bottom: 0;
    }

    h1 {
        margin: 0;
        text-align: center;
    }
    p {
        text-align: center;
        margin: 0;
    }
</style>