<script>
    import Header from '$lib/components/header.svelte';
    import Footer from '$lib/components/footer.svelte';
</script>
<div id="all">
    <Header />

    <main>
        <slot />
    </main>
    <Footer />
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
    }
    #all {
        display:flex;
        flex-direction: column;
        min-height: 100vh;
    }
    main {
        flex: 1;
        margin-top: 50px;
    }
</style>