---
layout: post
title:  "Sample article!"
date:   2015-11-17 16:16:01 -0600
images:
  - url: /img/mountains.jpg
    alt: Cypripedium Calceolum
    title: Cypripedium Calceolum
categories: jekyll update
---
Intro here yo ! <-- THIS IS THE EXCERPT

You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `bundle exec jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

{% assign image = page.images[0] %} <-- first element of the array is zero
{% include image.html image=image %}

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.
