<div id="main">
    <div id="logo"><h1>Hierophant</h1></div>
    <div id="copy">
        <h2>About Hierophant</h2>
        <p>Welcome to Hierophant, my personal blog where I explore the world of DevOps and technology as a learning apprentice. Here, I share my personal experiences, insights, and projects related to the latest trends and practices in the field.</p>
        <p><a href="/posts">Check out posts -></a></p>
        <h3>Who am I</h3>
        <p>I am a passionate technology enthusiast with a keen interest in DevOps and automation. I am currently an apprentice who loves to tinker with technology and explore new tools and practices. Sharing the things I know and making the field more accessible is incredibly important for me, so as I learn more things and develop my personal skills, I plan to post here and share any tips or tricks I found along the way.</p>
        <h3>What I do</h3>
        <p>With Hierophant, I share my personal experiences and projects related to DevOps and technology. I cover a wide range of topics, including:</p>
        <ul>
            <li>Automation and scripting</li>
            <li>Containerization and virtualization</li>
            <li>Cloud computing and serverless architecture</li>
            <li>Infrastructure as code (IaC)</li>
            <li>CI/CD pipelines and tools</li>
            <li>Monitoring and logging</li>
        </ul>     
        <p>My goal is to share my personal experiences and insights with other learners and hobbyists who are also passionate about exploring the latest trends and practices in the field.</p>
        <h3>Why I do it</h3>
        <p>I believe that technology is a powerful tool that can be used to solve complex problems and make the world a better place. As a hobbyist, I enjoy exploring new tools and practices and sharing my experiences with others.</p>
        <p>Thank you for visiting Hierophant, and I hope you find my content informative and useful. </p>
    </div>
    <div id="buffer" />
</div>

<style>
    @import url('https://fonts.cdnfonts.com/css/futura-std-4');
    @import url('https://fonts.cdnfonts.com/css/ibm-plex-sans-kr');
    @import url('https://fonts.cdnfonts.com/css/monosphere-personal-use');
    div#main {
        background-color: black;
        background-image: url('/bgimage.png');
        background-repeat: no-repeat;
        background-size: 40vw;
    }
    
    div#copy {
        padding-left: 300px;
        padding-right: 300px;
    }

    div#logo {
        background-image: url('/Logofaint.png');
        background-size: 300px;
        background-repeat: no-repeat;
        background-position: center;
        padding: 50px;
        width: fit-content;
        align-self: center;
        margin: auto;
        padding-top: 100px;
        
    }

    h1, h2, h3, p, li {
        color: white;
        box-shadow: 5px 5px 86px 20px #000;
        background-color: #00000077;
    }

    h1 {
        font-family: 'Monosphere Personal Use';
        text-align: center;
        /*background-color: rgb(219, 175, 30);*/
        height: min-content;
        background-color: #0000008f;
        
    }

    h2, h3 {
        font-family: 'IBM Plex Sans Kr';
    }
    p, a {
        font-family: 'Futura Std';
        color: white;
    }

    ul {
        list-style-type: none;
        font-family: 'Futura Std';
    }

    ul li:before {
        content: '\2014';
        position: absolute;
        margin-left: -20px;
    }
    div#buffer {
        height: 100px;
    }
</style>