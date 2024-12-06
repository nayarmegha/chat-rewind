
#  chat-rewind

<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a  id="readme-top"></a>

<!--

*** Thanks for checking out the Best-README-Template. If you have a suggestion

*** that would make this better, please fork the repo and create a pull request

*** or simply open an issue with the tag "enhancement".

*** Don't forget to give the project a star!

*** Thanks again! Now go create something AMAZING! :D

-->

  
  
  

<!-- PROJECT SHIELDS -->

<!--

*** I'm using markdown "reference style" links for readability.

*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).

*** See the bottom of this document for the declaration of the reference variables

*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.

*** https://www.markdownguide.org/basic-syntax/#reference-style-links

-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

  

<!-- PROJECT LOGO -->

<br  />

<div  align="center">
<p  align="center">

chat-rewind is a Spotify-like wrapped for all your chats where your data never leaves your browser.
</div>
<br  />
  

<!-- TABLE OF CONTENTS -->

<details>

<summary>Table of Contents</summary>

<ol>

<li>

<a  href="#about-the-project">About The Project</a>

<ul>

<li><a  href="#built-with">Built With</a></li>

</ul>

</li>

<li>

<a  href="#getting-started">Getting Started</a>

<ul>

<li><a  href="#prerequisites">Prerequisites</a></li>

<li><a  href="#installation">Installation</a></li>

</ul>

</li>

<li><a  href="#acknowledgments">Acknowledgments</a></li>

</ol>

</details>

  
  
  

<!-- ABOUT THE PROJECT -->

##  About The Project

  

[![product screenshot](https://github.com/user-attachments/assets/0e982a5d-2ca3-457a-b3c1-96f981d068ac)](https://r3wind.chat/)

  

chat-rewind is a privacy-focused application that provides you a Spotify like wrapped of your Chat Archives, implemented all in your own browser. You can upload your .zip archives and rewind generates a whole set of cards with different statistical and data analysis as well as visualizations for your individual chats as well as group chats!

  

Key Features include:

* Different Data Vizualization and Analysis like who texts the most, word cloud, how often do you text each other, time series etc.

* In-browser AI Summarizer of your Chats (currently limited in GPU capacity)

* All scripts and cards loaded in browser where your data is secure since it's purely frontend

In browser AI Summarizer was an experimental feature we tried to work on and found some interesting results within the in browser LLM space and our own successes as well as limitations. More information on this can be found [here](https://docs.google.com/document/d/1K1A53-LPi7SbWrDTLjdy9eu0pzfS0EKE6kVRq_fn8WY/edit?usp=sharing).
  

<p  align="right">(<a  href="#readme-top">back to top</a>)</p>


###  Built With

*  ![image](https://img.shields.io/badge/Astro-0C1222?style=for-the-badge&logo=astro&logoColor=FDFDFE)

*  [![React][React.js]][React-url]

*  ![image](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

*  ![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

*  ![image](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

*  ![image](  https://img.shields.io/badge/-HuggingFace-FDEE21?style=for-the-badge&logo=HuggingFace&logoColor=black)

  
  

<p  align="right">(<a  href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

##  Getting Started
All pages are written in [Astro](https://astro.build/), a JavaScript web framework optimized for building fast, content-driven websites. and all data cards and scripts are written in [React](https://react.dev/), a library for web and native user interfaces. The AI Summarizer component was built using [WebLLM](https://webllm.mlc.ai/) for in browser inference and the Model in particular is [Qwen](https://huggingface.co/Qwen).
  

###  Prerequisites

Need to have npm installed


###  Installation

  

1. Clone the repo

```sh

git clone https://github.com/nayarmegha/chat-rewind.git

```

2. Install NPM packages

```sh

npm install

```

3. To start application on localhost

```js

npm run dev

```

<p  align="right">(<a  href="#readme-top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->

##  Acknowledgments

*  [Megha Nayar](https://meghanayar.com/)

*  [Kevin Cordero](https://olympicene.dev/)

*  [Nandana Sheri](https://nandana.dev/)


<p  align="right">(<a  href="#readme-top">back to top</a>)</p>

  
<!-- MARKDOWN LINKS & IMAGES -->

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]:  https://img.shields.io/github/contributors/nayarmegha/chat-rewind.svg?style=for-the-badge

[contributors-url]:  https://github.com/nayarmegha/chat-rewind/graphs/contributors

[forks-shield]:  https://img.shields.io/github/forks/nayarmegha/chat-rewind.svg?style=for-the-badge

[forks-url]:  https://github.com/nayarmegha/chat-rewind/network/members

[stars-shield]:  https://img.shields.io/github/stars/nayarmegha/chat-rewind.svg?style=for-the-badge

[stars-url]:  https://github.com/nayarmegha/chat-rewind/stargazers

[issues-shield]:  https://img.shields.io/github/issues/nayarmegha/chat-rewind.svg?style=for-the-badge

[issues-url]:  https://github.com/nayarmegha/chat-rewind/issues

[license-shield]:  https://img.shields.io/github/license/nayarmegha/chat-rewind.svg?style=for-the-badge

[license-url]:  https://github.com/nayarmegha/chat-rewind/blob/master/LICENSE.txt

[linkedin-shield]:  https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555

[linkedin-url]:  https://linkedin.com/in/linkedin_username

[product-screenshot]:  images/screenshot.png

[Next.js]:  https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white

[Next-url]:  https://nextjs.org/

[React.js]:  https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB

[React-url]:  https://reactjs.org/

[Vue.js]:  https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D

[Vue-url]:  https://vuejs.org/

[Angular.io]:  https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white

[Angular-url]:  https://angular.io/

[Svelte.dev]:  https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00

[Svelte-url]:  https://svelte.dev/

[Laravel.com]:  https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white

[Laravel-url]:  https://laravel.com

[Bootstrap.com]:  https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white

[Bootstrap-url]:  https://getbootstrap.com

[JQuery.com]:  https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white

[JQuery-url]:  https://jquery.com
