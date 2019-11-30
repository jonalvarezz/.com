---
title: Debugging React Applications
author: jonalvarezz
date: 2018-2-19 23:08
template: article.jade
---

> Debugging a React application might be very confusing.

If you are not familiar with bundlers, compilers, JSX and all that _modern JavaScript_ stuff, you might spend a lot of time trying to debug your application.

Let me introduce you three ways that might help you:

## 1. Use the `debugger` statement.

You just need to put the `debugger` statement in the line of code you want the browser to stop the JavaScript execution, as a breakpoint.

```javascript
// posible buggy line of code
const b = ...
debugger
```

> Do not forget to remove those debugger statements once you're done.

## 2. Add breakpoints from Chrome's DevTool.

<p class="text-center">![Javascript error in bundle.js](2-undefined-in-bundle-js.png)</p>

Getting those kind of errors are not very helpful, right? Even if you manage to open your bundle.js file without your Text editor to hang for some minutes, most probably is you won't be able to know where is that line coming from.

That's the reason why all bundlers will give you the option to produce source maps with your bundled files, allowing the browser to show you in which of your JavaScript files, the error occurred.

<p class="text-center">![JavaScript error in body.jsx](2-undefined-in-body-jsx.png)</p>

To add a breakpoint from Chrome's DevTools, open the **Source** tab, hit `CMD` + `p` keys (`CTRL` if you on Windows) to search for your file, and then click the line number you want the breakpoint to be added.

<p class="text-center">![Searching source maps from DevTools.jsx](2-browser-sourcemaps.png)</p>

There are some bugs adding breakpoints to source maps, like breakpoint been added in another line different to the clicked one, but it'll work most of the times.

## 3. Use React DevTools

There is a very useful Chrome's extension that allows you to search through your rendered React Components as a DOM tree, you can inspect them, see their props, ref, and state.

<p class="text-center">![Searching React components in the DOM tree.jsx](3-react-devtools-components.png)</p>

You can go to the [React DevTools official GitHub repository](https://github.com/facebook/react-devtools) to get more information and installation instructions.

## 4. `console.log`

Well, and if nothing works, just console.log all the things.

Is there any other handy way you use to debug React apps?
