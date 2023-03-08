# Planning for Hierophant
First thing I want to develop is a simple blog that runs in a docker container

## Svelte
My plan for this is to use Sveltekit and Svelte frontend.


# Oracle storage and db
I want to use oracle and their generous always free services to host my database and blog and image files.

# Routing & Reverse Proxying
Nginx will be used to reverse proxy my two sites so that they are both accessible over the same server

# User site - blog.hierophant.com
A simple site that delivers blog content with simple commenting and in the future perhaps even an account & auth system

# Admin site - admin.hierophant.com
This is a backend panel that will allow me to write and upload blog posts in markdown format, as well as including an image and file upload system.