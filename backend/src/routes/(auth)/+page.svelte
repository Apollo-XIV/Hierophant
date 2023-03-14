<script>
    import Featurebox from '$lib/components/featurebox.svelte';

    let data = {
        title: "test",
        slug: "test",
        abstract: "test",
        icon: "\uF4CA"
    }
</script>


<div id="wrapper">
    <h1 id="top-section">Admin Home</h1>
    <p>This is the admin page for Hierophant. Here you can manage posts, create new ones, upload images and files, and more</p>
</div>

<Featurebox {data}/>


<style>
    @import url('https://fonts.cdnfonts.com/css/monosphere-personal-use');
    @import url('https://fonts.cdnfonts.com/css/futura-std-4');


    #wrapper {
        margin: 100px 300px 100px 300px;
    }

    h1 {
        text-align: center;
        font-family: 'Monosphere Personal Use';
    }

    p {
        font-family: 'Futura Std';
    }
</style>