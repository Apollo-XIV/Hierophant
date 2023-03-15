<script>
    import Header from '$lib/components/header.svelte';
    import Nav from '$lib/components/navbar.svelte';
    import Footer from '$lib/components/footer.svelte';
</script>

<svelte:head>
    <title>Admin | Hierophant</title>
</svelte:head>
<div id="header">
    <Header />
</div>

<div id="nav">
    <Nav />
</div>

<main>
    <div id="content">
        <slot />
    </div>
    
    <Footer />
</main>


<style>
    :global(body) {
        margin: 0;
        padding: 0;
    }
    main {
        position: absolute;
        top: 50px;
        left: 300px;
        right: 0px;
        bottom: 0px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        scrollbar-width: thin;
        scrollbar-color: grey transparent;
    }

    #content {
        flex: 1;
    }

</style>