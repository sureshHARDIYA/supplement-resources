# This is built on the top of SupplementResources Package for some custom purpose. Anyone is welcome to use it.
# Supplement SupplementResources Tool

Provides SupplementResources Block for the [CodeX Editor](https://ifmo.su/editor). Block has title and message. It can be used, for example, for editorials notifications or appeals.

![](assets/2d7b7bc1-ac46-4020-89c9-390d1a7297e2.jpg)

## Installation

### Install via NPM

Get the package

```shell
npm i --save-dev sureshhardiya-resource
```

Include module at your application

```javascript
const SupplementResources = require('sureshhardiya-resource');
```

### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/bundle.js` file to your page.

### Load from CDN

You can load specific version of package from [jsDelivr CDN](https://www.jsdelivr.com/package/npm/sureshhardiya-resource).

`https://cdn.jsdelivr.net/npm/sureshhardiya-resource`

Then require this script on page with CodeX Editor.

```html
<script src="..."></script>
```