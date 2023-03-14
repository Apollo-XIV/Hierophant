<script>
    export let slug;
    export let icon;
    export let title;
    export let abstract;
</script>

<div id="box" href='/{slug}'>
    <div id="cont">
        <p id="icon">{icon}</p>
        <h1>{title}</h1>
        <p>{abstract}</p>
    </div>
</div>

<style>
    @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");
    @import url('https://fonts.cdnfonts.com/css/futura-std-4');
    #box {
        width: 220px;
        height: 220px;
        border-radius: 30px;
        background-color: rgb(218, 218, 218);
        display: flex;
        align-items: center;
        justify-content: center;
        filter: drop-shadow(0px 0px 10px #0000007a);
        transition: 300ms ease;
    }

    #box:hover {
        filter: drop-shadow(0px 0px 15px #00000081)
    }

    #cont {
        margin: auto;
    }

    #icon {
        font-family: 'Bootstrap-icons';
        font-size: 100px;
        color: grey;
        text-align: center;
        margin-bottom: 0;
    }

    h1 {
        margin: 0;
        text-align: center;
        font-family: 'Futura Std';
        font-weight: 400;
    }
    p {
        text-align: center;
        margin: 0;
        font-family: 'Futura Std';
        max-width: 180px;
        overflow: wrap;
    }
</style>