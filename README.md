# SmoothScroller.js
Smooth Scrolling in vanilla JS

<h3>What is SmoothScroller.js?</h3>
SmoothScroller.js is a lightweight smooth scrolling implementation written in vanilla JS. No extra libraries, no extra code, just an ultralight < 2kb minified file and the original if needed.

<h3>Why not jQuery?</h3>
The uncompressed file size of SmoothScroller.js is around 5kb. The compressed size is less than 2kb. If you're using jQuery or another third party library to implement SmoothScrolling exclusively you're adding quite a few extra bytes. Third party libraries are great, but if you're using jQuery for nothing but smooth scrolling you're adding it for a cost of roughly 86kb, <i>compressed</i>.

<h3>Why SmoothScroller.js</h3>
It's good to go, no extra overhead, just add the SmoothScroller-min.js file and you're ready to go with less than a 2kb overhead. You can also alter your scrolling rate, achieving the desired feel for your scrolling implementation.

It's free to use and free to modify. SmoothScroller.js is covered by the MIT open source license, meaning you can hack away to your heart's content to achieve your ideal scrolling behavior.

<h3>Usage</h3>
Just add SmoothScroller.js to your head (we recommend you use the minified version)
```html
<script src="js/SmoothScroller-min.js"></script>
```
and call it with the id of the element you want to scroll to.
```javascript
SmoothScroller.scrollToId("contact-us");
```

You can easily trigger smooth scrolling by adding a call in the onclick event.
```html
<input type='button' value='Contact Us!' onclick='SmoothScroller.scrollToId("contact-us")'>
```

<h3>How can I alter the scroll rate?</h3>
You can call ```scrollToId``` with an extra parameter, indicating a rate which you wish to scroll at.
```javascript
// Snail's pace
SmoothScroller.scrollToId("contact-us", 0.10);

// Fast!
SmoothScroller.scrollToId("contact-us", 0.99);
```

If you <i>really</i> want to alter the scrolling behavior further you can crack open SmoothScroller.js and alter it yourself, its just about 200 lines in its entirety.

<h3>Contributing</h3>
We are open to PRs with detailed explanations. If you have a suggestion for a feature or enhancement be sure to thoroughly explain your rationale. If you have an issue please detail it thoroughly as well, we would love to make SmoothScroller.js even better.

<h3>Compressing/Minifying</h3>
If you've modified SmoothScroller.js and want to create your own minified variant we recommend you use Google's <a href='https://developers.google.com/closure/compiler/'>Closure Compiler</a>. We personally use this to generate SmoothScroller-min.js.

<h3>Questions?</h3>
You can reach out to <a>ben@axolsoft.com</a> with any questions regarding SmoothScroller.js. However we prefer if you open a PR or issue if you wish to discuss something related to SmoothScroller.js specifically.
