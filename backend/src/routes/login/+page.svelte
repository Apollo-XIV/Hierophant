<script>
    import { signIn, signOut } from '@auth/sveltekit/client';
    import { page } from '$app/stores';
    import GitHub from '@auth/core/providers/github';
</script>
<div id="wrapper">
    <div id="page">
        <h1>Hierophant Admin</h1>
        <button on:click={() => signIn('github')}><!--<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
        </svg>--> Sign in with GitHub</button>    
    </div>
</div>


<style>
    @import url('https://cdnjs.cloudflare.com/ajax/libs/bootstrap-social/4.9.2/bootstrap-social.min.css');
    @import url('https://fonts.cdnfonts.com/css/futura-std-4');
    @import url('https://fonts.cdnfonts.com/css/grozery');

    button {
        border: none;
        background-color: black;
        color: white;
        border-radius: 15px;
        font-size: x-large;
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        padding: 20px;
        font-family: 'Futura Std';
        height: fit-content;
    }
    svg {
        margin-right: 15px;
    }

    h1 {
        font-family: 'Grozery';
        color: white;
        overflow: wrap;
    }

    #page {
        background-color: rgb(54, 54, 54);
        height: 400px;
        width: 350px;
        display: flex;
        justify-content: center;
        flex-flow: column;
        padding: 20px;
        border-radius: 20px;
        filter: drop-shadow(0px 10px 0.75rem #000);
    }

    #wrapper {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: blueviolet;
    }

    :global(body) {
        margin: 0;
        padding: 0;
    }
</style>
