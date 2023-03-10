<script>
    import Markdown from 'svelte-exmarkdown';
    import md from '$lib/assets/demoblog.md';
</script>

<Markdown {md} />

<h1>testing</h1>

<style>
    h1, h2, h3, p, li {
        color: white;
        text-align: center;
    }
    * {
        background-color: white;
    }
</style>