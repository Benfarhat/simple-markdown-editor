# simple-markdown-editor

Just a simmple markdown editor, You can turn any textarea into a customizable Markdown Editor.
This Readme.md was edited with this script

Initially created to have a local markdown editor.

## Installation

You just need to add jQMardownEditor script with jQuery


```
<!-- jQuery -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script></script>
<!-- Simple jQuery Markdown Editor -->
<script src="src/js/Simple-jQMarkdownEditor.js"></script>
```

If you want to render your mardown text i suggest you to use [Showdown](https://github.com/showdownjs/showdown):
`<script src="https://cdn.rawgit.com/showdownjs/showdown/1.7.3/dist/showdown.min.js"></script>`


## Demo

[Demo](https://benfarhat.github.io/simple-markdown-editor/)
## Usage


```
<script type="text/javascript">
  $(document).ready(function () {
    $('#myEditor1').mardownEditor({
    });

    $('#myEditor2').mardownEditor({
    });

  });
</script>
```


## Options

### Accepted options

* `buttons` : (array) a list of buttons to use in your markdown editor toolbar.
the initial state of the managed object. If not call the default initial state is NULL
* `actionClass`: common classname for all your buttons (default to `markdowneditor`),
* `toolbarClass`: classname for your toolbar (default to `toolbar`),
* `strictSelection`: (boolean) if true it delete/split space from the end or your selection


### Buttons options

* `title`: title for the button - you can use an [awesome font icon](http://fontawesome.io/icons/),  
* `class`: class for the button - for example you can use [bootstrap](https://v4-alpha.getbootstrap.com/components/buttons/) or [foundation](https://foundation.zurb.com/sites/docs/button.html) button class, 
* `first`: opening tag (First fragment)
* `last`: closing tag (Last fragment)
* `rule`: rule to use (inline / inline-reversible / block / ordered / back / table / url)
* `tooltip`: text to use as tooltip message (title attribute)

### Other specific options
for table rule:

* `promptRows`: default to 'Number of rows?',
* `promptCols`: default to'Number of columns?',
* `limitRows`: default to 10,
* `limitCols`: default to 10,


for url rule:

* `prompt`: prompt message,
* `error`: Message if user cancel the prompt, default to 'User cancelled the prompt.',
* `placeholder`: a custom placeholder


### Create your own button:
if you need for example a preformatted button, just add this button this:

```
preformatted: {
  title: 'PRE',
  class: 'btn',
  first: '<pre>',
  last: '</pre>',
  rule: 'inline',
  tooltip: 'preformatted text.'
},
```



### Full options

           buttons: {
              // Inline rule - generally wrapped by characters (first and last)
              bold: { 
                title: '<i class="fa fa-bold"></i>',  
                class: 'btn btn-info', 
                first: '**', // First fragment > opening tag
                last: '**', // Last fragment > closing tag
                rule: 'inline',
                tooltip: 'Strong.'
              },
              italic: {
                title: '<i class="fa fa-italic"></i>',
                class: 'btn btn-info',
                first: '*',
                last: '*',
                rule: 'inline',
                tooltip: 'Emphasis.'
              },
              strikeThrough : {
                title: '<i class="fa fa-strikethrough "></i>',
                class: 'btn btn-info',
                first: '~~',
                last: '~~',
                rule: 'inline',
                tooltip: 'Strikethrough.'
              },
              superscript : {
                title: '<i class="fa fa-superscript "></i>',
                class: 'btn btn-info',
                first: '<sup>',
                last: '</sup>',
                rule: 'inline',
                tooltip: 'superscript.'
              },
              subscript : {
                title: '<i class="fa fa-subscript "></i>',
                class: 'btn btn-info',
                first: '<sub>',
                last: '</sub>',
                rule: 'inline',
                tooltip: 'subscript.'
              },
              inlineCode: {
                title: '<i class="fa fa-terminal"></i>',
                class: 'btn btn-warning',
                first: '`',
                last: '`',
                rule: 'inline',
                tooltip: 'Inline Code.' 
              },
              codeBlock: {
                title: '<i class="fa fa-code"></i>',
                class: 'btn btn-warning',
                first: '\n```\n',
                last: '\n```\n',
                rule: 'inline',
                tooltip: 'Code block.' 
              },
              // Block rule - Generaly the first 
              NumberedList: {
                title: '<i class="fa fa-list-ol"></i>',
                class: 'btn btn-danger',
                first: '1. ',
                last: '\n',
                rule: 'ordered',
                tooltip: 'Ordered list.' 
              },
              BullettedList: {
                title: '<i class="fa fa-list-ul"></i>',
                class: 'btn btn-danger',
                first: '* ',
                last: '\n',
                rule: 'block',
                tooltip: 'Unordered list.' 
              },
              indent: {
                title: '<i class="fa fa-indent"></i>',
                class: 'btn btn-danger',
                first: '\t',
                last: '',
                rule: 'block',
                tooltip: 'indent.' 
              },
              outdent: {
                title: '<i class="fa fa-outdent"></i>',
                class: 'btn btn-danger',
                first: '\t',
                last: '',
                rule: 'back',
                tooltip: 'outdent.' 
              },
              h1: {
                title: 'H1', 
                class: 'btn btn-primary',
                first: '# ',
                last: '',
                rule: 'block', // @todo special rule for alternative headers ===
                tooltip: 'Header lvl 1.' 
              },
              h2: {
                title: 'H2',
                class: 'btn btn-primary',
                first: '## ',
                last: '',
                rule: 'block', // @todo special rule for alternative headers ---
                tooltip: 'Header lvl 2.' 
              },
              h3: {
                title: 'H3',
                class: 'btn btn-primary',
                first: '### ',
                last: '',
                rule: 'block',
                tooltip: 'Header lvl 3.' 
              },
              h4: {
                title: 'H4',
                class: 'btn btn-primary',
                first: '#### ',
                last: '',
                rule: 'block',
                tooltip: 'Header lvl 4.' 
              },
              h5: {
                title: 'H5',
                class: 'btn btn-primary',
                first: '##### ',
                last: '',
                rule: 'block',
                tooltip: 'Header lvl 5.' 
              },
              h6: {
                title: 'H6',
                class: 'btn btn-primary',
                first: '###### ',
                last: '',
                rule: 'block',
                tooltip: 'Header lvl 6.' 
              },
              hr: {
                title: '<i class="fa fa-minus"></i>',
                class: 'btn',
                first: '\n___\n',
                last: '',
                rule: 'inline',
                tooltip: 'Horizontal rule.' 
              },
              blockquotes: {
                title: '<i class="fa fa-quote-right"></i>',
                class: 'btn',
                first: '> ',
                last: '',
                rule: 'block',
                tooltip: 'Blockquotes.' 
              },
              completedTask: {
                title: '<i class="fa fa-check-square-o"></i>',
                class: 'btn',
                first: '- [x] ',
                last: '\n',
                rule: 'block',
                tooltip: 'Completed task.' 
              },
              uncompletedTask: {
                title: '<i class="fa fa-square-o"></i>',
                class: 'btn',
                first: '- [ ] ',
                last: '\n',
                rule: 'block',
                tooltip: 'Uncompleted task.' 
              },
              table: {
                title: '<i class="fa fa-table"></i>',
                class: 'btn btn-success',
                first: '\n',
                last: '\n',
                rule: 'table',
                tooltip: 'Insert table.',
                promptRows: 'Number of rows?',
                promptCols: 'Number of columns?',
                limitRows: 10,
                limitCols: 10,
                error: 'User cancelled the prompt.',
              },
              links: {
                title: '<i class="fa fa-link"></i>',
                class: 'btn btn-success',
                first: '[',
                last: ']',
                rule: 'url',
                tooltip: 'Insert link.',
                prompt: 'Please enter a url.',
                error: 'User cancelled the prompt.',
                placeholder: 'http://'
              },
              picture: {
                title: '<i class="fa fa-picture-o"></i>',
                class: 'btn btn-success',
                first: '![',
                last: ']',
                rule: 'url',
                tooltip: 'Insert image',
                prompt: 'Please enter an image url.',
                error: 'User cancelled the prompt.',
                placeholder: 'https://raw.githubusercontent.com/indievox-inc/iNDIEVOX-Web-Profile/master/image/github-logo.jpg'
              },
            },
            actionClass: "markdowneditor",
            toolbarClass: "toolbar", // wrapping div
            strictSelection: true // delete/split space from the end

2017 🖥 Benfarhat Elyes
