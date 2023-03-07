# me-fizzy

This canvas demo is a new implementation of [Fizzy Sparks](https://codepen.io/waisbren89/pen/gwvVpP) by [Bennett Waisbren](https://codepen.io/waisbren89).

This re-implementation is to show a cleaner javcascript. 

It is in no way an indictment of the original code; that was just a sample demo created in codepen.

Rather, I chose this because it has a lot of the same issues and idioms I encounter in javascript code, and I wanted to show what a cleaner codebase would look like by comparison.

- Some general rules I follow:
- Use proper Javascript classes
- Put class variables in the constructor
- Put event handler hooks in the constructor where feasable
- Prefer class methods to anonymous functions
- Don't use libraries with little to no use
- Use decent identifier names
- Avoid use of nested functions where feasable
- Avoid nested variable scoping (mostly in nested functions)
- Prefer requestAnimationFrame over setInterval
- Base animation rate on time, not refresh interval
- The idea is to make code as easily understandable and maintainable as you can

Also removed the following libs: TimelineMax, TweenMax, browser.min.js, jquery.imagesloaded

original code - http://craig/toys/fizzy/original/fizzy.js
new code - https://craig-fitzgerald.com/toys/fizzy/fizzy.js

