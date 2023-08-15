# This is built on the top of Resource Package for some custom purpose. Anyone is welcome to use it.
# Supplement Resource Tool

Provides Resource Block for the [CodeX Editor](https://ifmo.su/editor). Block has title and message. It can be used, for example, for editorials notifications or appeals.

![](assets/2d7b7bc1-ac46-4020-89c9-390d1a7297e2.jpg)

## Installation

### Install via NPM

Get the package

```shell
npm i --save-dev editorjs-resources-skm
```

Include module at your application

```javascript
const Resource = require('editorjs-resources-skm');
```

### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/bundle.js` file to your page.

### Load from CDN

You can load specific version of package from [jsDelivr CDN](https://www.jsdelivr.com/package/npm/@editorjs/Resource).

`https://cdn.jsdelivr.net/npm/@editorjs/Resource@latest`

Then require this script on page with CodeX Editor.

```html
<script src="..."></script>
```

## Usage

Add a new Tool to the `tools` property of the CodeX Editor initial config.

```javascript
var editor = CodexEditor({
  ...
  
  tools: {
    ...
    Resource: Resource,
  },
  
  ...
});
```

Or init Resource Tool with additional settings

```javascript
var editor = CodexEditor({
  ...
  
  tools: {
    ...
    Resource: {
      class: Resource,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+W',
      config: {
        titlePlaceholder: 'Title',
        messagePlaceholder: 'Message',
      },
    },
  },
  
  ...
});
```

## Config Params

| Field              | Type     | Description                       |
| ------------------ | -------- | ----------------------------------|
| titlePlaceholder   | `string` | Resource Tool's title placeholder  |
| messagePlaceholder | `string` | Resource Tool's message placeholder|

## Output data

| Field     | Type     | Description      |
| --------- | -------- | -----------------|
| title     | `string` | Resource's title  |
| message   | `string` | Resource's message|

```json
{
    "type" : "Resource",
    "data" : {
        "title" : "Note:",
        "message" : "Avoid using this method just for lulz. It can be very dangerous opposite your daily fun stuff."
    }
}
```
