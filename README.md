### codenames

[![Netlify Status](https://api.netlify.com/api/v1/badges/3c689ead-a11b-49bc-a3df-1ee8e390c78f/deploy-status)](https://codenames-pwa.netlify.com)

A small test app (PWA) implementing a codenames-like game steered by AI/NLP (Word2Vec, but using pretrained datasets from GloVe).

#### try

[https://codenames-pwa.netlify.com](https://codenames-pwa.netlify.com)

Hint: As this is a progressive web app, you can install it to your home screen and use it like any other app. Android will automatically suggest that and in iOS you need to check your Safari export menu when you're on the page.

#### background

The codenames game has quite an interesting positive effect on speed of thoughts and association if played under time pressure.
I wanted to try and see if it can be implemented as a solo version, playing with an AI as spymaster (and yes, it's been done before).
For convenience, the goal was to have a web-frontend only version, installable as a PWA.

For inspiration, especially the data preparation and rating parts, I mainly read through [Pbatch/Codenames](https://github.com/Pbatch/Codenames) and [thomasahle/codenames](https://github.com/thomasahle/codenames).

The NLP part is based on [ml5](https://ml5js.org) - although only for examples of integrating TensorFlow.js. The rest is simple vector arithmetics.

#### run

```
> git clone ... && cd ...
> npm install
> npm start
```

#### is it any good?

Bien sûr.
