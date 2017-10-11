/*
 * jquery Markdown Editor
 * Author: @benfarhat
 * Licensed under the MIT license
 */


;(function( $, window, document, undefined ){

  // our plugin constructor
  var Plugin = function( elem, options ){
      this.elem = elem;
      this.$elem = $(elem);
      this.options = options;

      // This next line takes advantage of HTML5 data attributes
      // to support customization of the plugin on a per-element
      // basis. For example,
      // <div class=item' data-plugin-options='{"message":"Goodbye World!"}'></div>
      this.metadata = this.$elem.data( "plugin-options" );
    };

  // the plugin prototype
  Plugin.prototype = {
    defaults: {
      buttons: {
        // Inline rule - generally wrapped by characters (first and last)
        bold: { 
          title: '<i class="fa fa-bold"></i>',  
          class: 'btn btn-info', 
          first: '**', // First fragment > opening tag
          last: '**', // Last fragment > closing tag
          hotkey: 'b', // @todo
          rule: 'inline',
          tooltip: 'Strong.'
        },
        italic: {
          title: '<i class="fa fa-italic"></i>',
          class: 'btn btn-info',
          first: '*',
          last: '*',
          hotkey: 'i',
          rule: 'inline',
          tooltip: 'Emphasis.'
        },
        underline: {
          title: '<i class="fa fa-underline"></i>',
          class: 'btn btn-info',
          first: '<u>',
          last: '</u>',
          hotkey: 'i',
          rule: 'inline',
          tooltip: 'Underline.'
        },
        strikeThrough : {
          title: '<i class="fa fa-strikethrough "></i>',
          class: 'btn btn-info',
          first: '~~',
          last: '~~',
          hotkey: 'i',
          rule: 'inline',
          tooltip: 'Strikethrough.'
        },
        superscript : {
          title: '<i class="fa fa-superscript "></i>',
          class: 'btn btn-info',
          first: '<sup>',
          last: '</sup>',
          hotkey: 'i',
          rule: 'inline',
          tooltip: 'superscript.'
        },
        subscript : {
          title: '<i class="fa fa-subscript "></i>',
          class: 'btn btn-info',
          first: '<sub>',
          last: '</sub>',
          hotkey: 'i',
          rule: 'inline',
          tooltip: 'subscript.'
        },
        inlineCode: {
          title: '<i class="fa fa-terminal"></i>',
          class: 'btn btn-warning',
          first: '`',
          last: '`',
          hotkey: 'i',
          rule: 'inline',
          tooltip: 'Inline Code.' 
        },
        codeBlock: {
          title: '<i class="fa fa-code"></i>',
          class: 'btn btn-warning',
          first: '\n```\n',
          last: '\n```\n',
          hotkey: 'i',
          rule: 'inline',
          tooltip: 'Code block.' 
        },
        // Block rule - Generaly the first 
        NumberedList: {
          title: '<i class="fa fa-list-ol"></i>',
          class: 'btn btn-danger',
          first: '1. ',
          last: '\n',
          hotkey: 'i',
          rule: 'ordered',
          tooltip: 'Ordered list.' 
        },
        BullettedList: {
          title: '<i class="fa fa-list-ul"></i>',
          class: 'btn btn-danger',
          first: '* ',
          last: '\n',
          hotkey: 'i',
          rule: 'block',
          tooltip: 'Unordered list.' 
        },
        indent: {
          title: '<i class="fa fa-indent"></i>',
          class: 'btn btn-danger',
          first: '\t',
          last: '',
          hotkey: 'i',
          rule: 'block',
          tooltip: 'indent.' 
        },
        outdent: {
          title: '<i class="fa fa-outdent"></i>',
          class: 'btn btn-danger',
          first: '\t',
          last: '',
          hotkey: 'i',
          rule: 'back',
          tooltip: 'outdent.' 
        },
        h1: {
          title: 'H1', 
          class: 'btn btn-primary',
          first: '# ',
          last: '',
          hotkey: '1',
          rule: 'block', // @todo special rule for alternative headers ===
          tooltip: 'Header lvl 1.' 
        },
        h2: {
          title: 'H2',
          class: 'btn btn-primary',
          first: '## ',
          last: '',
          hotkey: '2',
          rule: 'block', // @todo special rule for alternative headers ---
          tooltip: 'Header lvl 2.' 
        },
        h3: {
          title: 'H3',
          class: 'btn btn-primary',
          first: '### ',
          last: '',
          hotkey: '3',
          rule: 'block',
          tooltip: 'Header lvl 3.' 
        },
        h4: {
          title: 'H4',
          class: 'btn btn-primary',
          first: '#### ',
          last: '',
          hotkey: '4',
          rule: 'block',
          tooltip: 'Header lvl 4.' 
        },
        h5: {
          title: 'H5',
          class: 'btn btn-primary',
          first: '##### ',
          last: '',
          hotkey: '5',
          rule: 'block',
          tooltip: 'Header lvl 5.' 
        },
        h6: {
          title: 'H6',
          class: 'btn btn-primary',
          first: '###### ',
          last: '',
          hotkey: '6',
          rule: 'block',
          tooltip: 'Header lvl 6.' 
        },
        hr: {
          title: '<i class="fa fa-minus"></i>',
          class: 'btn',
          first: '\n___\n',
          last: '',
          hotkey: '6',
          rule: 'inline',
          tooltip: 'Horizontal rule.' 
        },
        blockquotes: {
          title: '<i class="fa fa-quote-right"></i>',
          class: 'btn',
          first: '> ',
          last: '',
          hotkey: '6',
          rule: 'block',
          tooltip: 'Blockquotes.' 
        },
        completedTask: {
          title: '<i class="fa fa-check-square-o"></i>',
          class: 'btn',
          first: '- [x] ',
          last: '',
          hotkey: '6',
          rule: 'block',
          tooltip: 'Completed task.' 
        },
        uncompletedTask: {
          title: '<i class="fa fa-square-o"></i>',
          class: 'btn',
          first: '- [ ] ',
          last: '',
          hotkey: '6',
          rule: 'block',
          tooltip: 'Uncompleted task.' 
        },
        table: {
          title: '<i class="fa fa-table"></i>',
          class: 'btn btn-success',
          first: '\n',
          last: '\n',
          hotkey: '6',
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
          hotkey: '6',
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
          hotkey: '6',
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
    },

    init: function() {
      // Introduce defaults that can be extended either
      // globally or using an object literal.
      this.config = $.extend({}, this.defaults, this.options,
      this.metadata);

      // Sample usage:
      // Set the message per instance:
      // $('#elem').plugin({ message: 'Goodbye World!'});
      // or
      // var p = new Plugin(document.getElementById('elem'),
      // { message: 'Goodbye World!'}).init()
      // or, set the global default message:
      // Plugin.defaults.message = 'Goodbye World!'

      this.createToolbar(this);
      return this;
    },

    createToolbar: function(el) {
      // eg. show the currently configured message
      var config = this.config;

      var toolbar = [], button;
      $.each( config.buttons, function( key, val ) {
        button = '<button class="' + config.actionClass + ' ' + val.class + '" data-action="' + key + '" data-target="' + $(this).attr("id") + '" title="' + val.tooltip + '">' + val.title + '</i></button>';
        toolbar.push( button );
      });
      var divToolbar = $( '<div class="' + config.toolbarClass + '"></div>' ).prepend( toolbar );
      console.table(el);
      console.table(el.$elem[0]);
      console.log(divToolbar);
      el.$elem[0].before( divToolbar[0] );      
    }
  }

  Plugin.defaults = Plugin.prototype.defaults;

  $.fn.simpleMarkdownEditor = function(options) {
    return this.each(function() {
      new Plugin(this, options).init();
     
    });
  };

  //optional: window.Plugin = Plugin;

})( jQuery, window , document );
