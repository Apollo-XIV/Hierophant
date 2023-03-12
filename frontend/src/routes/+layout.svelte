<script>
    import Header from '$lib/components/header.svelte';
    import Footer from '$lib/components/footer.svelte';
</script>
<Header />

<main>
    <slot />
</main>
<Footer />

<style>
    :global(body) {
        margin: 0;
        margin-top: 50px;
        padding: 0;
    }
</style>