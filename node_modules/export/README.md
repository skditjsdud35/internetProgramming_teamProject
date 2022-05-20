ExportJS
========
[![NPM version](https://badge.fury.io/js/export.png)](http://badge.fury.io/js/export)

ExportJS is a tool that helps you publish and export your JavaScripts to other environments, like the browser, by wrapping your code with either a plain old **immediately-invoked function expression** (IIFE or *iffy* for short), a **Universal Module Definition** (UMD for short) or any other template of your choosing.

But hang on a second! This is just the first release and it comes only with the IIFE template out of the box.

A set of templates and commands for UMD on their way.  
If you think of another wrapper or capability that ExportJS should support, I'm all ears at [andri@dot.ee](mailto:andri@dot.ee) and [@theml](https://twitter.com/theml).


Using the ExportJS
------------------
Install with:
```
npm install --global export
```

Run it with `exportjs` and see the full help with `exportjs --help`.

### Wrap a file in an IIFE (*iffy*)
```
exportjs iffy precious.js
```


License
-------
ExportJS is released under a *Lesser GNU Affero General Public License*, which in summary means:

- You **can** use this program for **no cost**.
- You **can** use this program for **both personal and commercial reasons**.
- You **do not have to share your own program's code** which uses this program.
- You **have to share modifications** (e.g bug-fixes) you've made to this program.

For more convoluted language, see the `LICENSE` file.


About
-----
**[Andri Möll](http://themoll.com)** typed this and the code.  
[Monday Calendar](http://mondayapp.com) supported the engineering work.

If you find ExportJS needs improving, please don't hesitate to type to me now at [andri@dot.ee](mailto:andri@dot.ee) or [create an issue online](https://github.com/moll/export/issues).
