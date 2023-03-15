<script>
    import Featurebox from '$lib/components/featurebox.svelte';

    let features = [
        {title: "New Post", slug: "/posts/new", abstract: "Create a new blog post", icon: "\uF4CA" },
        {title: "View Posts", slug: "/posts", abstract: "Manage blog posts", icon: "\uF605" },
        {title: "Upload", slug: "/media", abstract: "Upload media to static storage", icon: "\uF297" },
        ];
</script>


<div id="wrapper">
    <h1 id="top-section">Admin Home</h1>
    <p>This is the admin page for Hierophant. Here you can manage posts, create new ones, upload images and files, and more</p>
    <div id="features">
        {#each features as feature}
            <Featurebox {...feature}/>
        {/each}
    </div>
    
</div>




<style>
    @import url('https://fonts.cdnfonts.com/css/monosphere-personal-use');
    @import url('https://fonts.cdnfonts.com/css/futura-std-4');

    #wrapper {
        margin: 100px 200px 100px 200px;
    }

    #features {
        margin-top: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 30px;
    }

    h1 {
        text-align: center;
        font-family: 'Monosphere Personal Use';
    }

    p {
        font-family: 'Futura Std';
    }
</style>