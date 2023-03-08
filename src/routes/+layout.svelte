<script>
    import Header from '$lib/components/header.svelte';
</script>
<Header />

<main>
    <slot />
</main>

<footer>
    <p>This is a footer</p>
</footer>

<style>
    
    @import url('https://fonts.cdnfonts.com/css/tiro-devanagari-marathi');   
    @import url('https://fonts.cdnfonts.com/css/grozery');
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: 'Tiro Devanagari Marathi', sans-serif;
    }

    

    
    footer {
        background-color: rgb(235, 234, 234);
        align-content: center;
        justify-items: center;
    }

    footer p {
        text-align: center;
        padding: 10px;
    }


</style>