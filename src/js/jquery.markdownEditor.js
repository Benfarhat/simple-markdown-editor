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

      this.targetContainer = this.$elem.data( "target" );
    };


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
      buttonTag: "button",
      buttonClass: "markdowneditor",
      toolbarContainer: null, // wrapping div
      toolbarClass: "toolbar", // wrapping div
      strictSelection: true // delete/split space from the end
    },

    init: function() {
      this.validateSelector();
      
      this.config = $.extend({}, this.defaults, this.options,
      this.metadata);
      this.configs = $.extend(true, {}, this.defaults, this.options,
      this.metadata);

      this.createToolbar(this);
      this.trackSelection();
      this.trackToolbarClick();
      return this;
    },
    
    validateSelector: function() {

      if( this.$elem.prop('tagName') != 'TEXTAREA' ) {
      
        throw new Error(
          'Can\'t init MarkdownEditor on ' + 
          this.$elem.prop('tagName').toLowerCase() + 
          ' > choose a textarea element.' +
          ' Usage example: $(\'.classtextarea\').simpleMarkdownEditor()');
          
      }      
    },
    
    // Create toolbar
    // @todo: let the user choose the position (before or after)
    // @todo: let the user choose the target (not necessary before textarea)
    createToolbar: function(textarea) {
    
      var config = this.config,
          toolbar = [], 
          button,
          element = this.$elem[0],
          $textarea = textarea.$elem;
          
      $.each( config.buttons, function( key, val ) {

        button = '<' + config.buttonTag + ' class="' + config.buttonClass + ' ' + 
          val.class + '" data-action="' + key + '" data-target="' + 
          $textarea.attr("id") + '" title="' + val.tooltip + '">' + 
          val.title + '</i></' + config.buttonTag + '>';
          
        toolbar.push( button );
      });
      
      if(config.toolbarContainer) {
        $(config.toolbarContainer).prepend( toolbar );
      } else {
        var divToolbar = $( '<div class="' + config.toolbarClass + '"></div>' ).prepend( toolbar );
        
        element.before( divToolbar[0] );   
      }
    },
    
    
    trackSelection: function() {
    
      var config = this.config;
          
      this.$elem.unbind("keydown click focus").on('keydown click focus', function(){

        var el = $(this).get(0);
        var pos = 0;
        if('selectionStart' in el) {
            pos = el.selectionStart;
            
            $(this).attr("data-start", pos);
            // $(this).attr("data-end", el.selectionEnd);
            if( config.strictSelection && $(this).val().
              substring( pos,  el.selectionEnd).slice(-1) == " " ){
              $(this).attr("data-end",  this.selectionEnd - 1);
              el.selectionEnd = this.selectionEnd - 1;
            } else {
              $(this).attr("data-end",  el.selectionEnd);
            }            
        } else if('selection' in document) {
            el.focus();
            var Sel = document.selection.createRange();
            var SelLength = document.selection.createRange().text.length;
            Sel.moveStart('character', -el.value.length);
            pos = Sel.text.length - SelLength;
            $(this).attr("data-start", pos);
            
            $(this).attr("data-end", parseInt(pos) + parseInt(SelLength));
        }
      
      });
      
      this.$elem.on("select", function(){
        $(this).attr("data-start",  this.selectionStart);
        
        if( config.strictSelection && $(this).val().
          substring( this.selectionStart,  this.selectionEnd).slice(-1) == " " ){
          $(this).attr("data-end",  this.selectionEnd - 1);
          this.selectionEnd = this.selectionEnd - 1;
        } else {
          $(this).attr("data-end",  this.selectionEnd);
        }
      });
    }, 
    
    trackToolbarClick: function() {
    
      var config = this.configs;

   
        $( '.' + config.buttonClass ).unbind("click").click(function() {

          var target = $(this).attr('data-target');
          var editor = $('#' + target);
          var content = editor.val();
          var start = editor.attr('data-start');
          var end = editor.attr('data-end');
          var sel = editor.val().substring(start, end);
          

          var action = $(this).attr('data-action');
          var first = config.buttons[action].first;
          var last = config.buttons[action].last;
          var check = editor.val().substring(start - parseInt(first.length),
            parseInt(start) + parseInt(sel.length) + parseInt(last.length));
          
          var rule = config.buttons[action].rule;
          var newLine = new RegExp(/(\r\n|\r|\n)/, "g");
          var result, selblock, i, j, reverse, regex, firstsel, count; 
          switch(rule) {
          
              case 'inline':
                    // if the tag (first fragment) is already present then we delete it
                    if ( check === first + sel + last ) {
                      result = editor.val().substring(0, start - first.length) + 
                        sel + editor.val().substring(parseInt(end) + parseInt(last.length));
                        
                      start = parseInt(start) - parseInt(first.length);
                      end = parseInt(end) - parseInt(first.length);
                    } else {
                      result = editor.val().substring(0, start) + first + sel + last + 
                        editor.val().substring(end);
                      
                      start = parseInt(start) + parseInt(first.length);
                      end = parseInt(end) + parseInt(first.length);
                    }
                    
                  break;

                  
              case 'block':
                  start = content.lastIndexOf("\n", start) + 1;
                  end = content.indexOf("\n", end);
                  sel = editor.val().substring(start, end);

                  regex = new RegExp('^' + first.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, 
                    '\\$&'));
                  reverse = regex.test(sel);

                  if( reverse) { 
                    firstsel = sel.replace(regex, '');
                    regex = new RegExp('(\r\n|\r|\n)' + first
                      .replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&'), 'g');
                    selblock = firstsel.replace(regex, '$1');
                    
                    count = (firstsel.match(regex) != null) ? (firstsel.match(regex)).length : 0;
                    
                    result = editor.val().substring(0, start) + selblock + 
                      editor.val().substring(end);
                      
                    end = parseInt(end) - parseInt(first.length * parseInt(count + 1));
                  } else {
                    selblock = sel.replace(newLine, '$1' + first);
                    count = (sel.match(newLine) != null) ? (sel.match(newLine)).length : 0;
                    
                    result = editor.val().substring(0, start) + first + selblock + last + 
                      editor.val().substring(end);
                    end = parseInt(end) + parseInt(first.length * parseInt(count + 1));
                  }
                    
                  break;
                  
              case 'ordered':
                  for( i = start ; i >= 0; i-- ){
                      if( ( content.substring( i, i + 1 ) === '\n' ) || ( i === 0 ) ) {
                        start = ( i == 0 ) ? 0 : i + 1 ;
                        sel = editor.val().substring(start, end);
                        break;
                      }
                  }
                  var number = 2;
                  selblock = sel.replace(newLine, function() {
                      number++;
                      return "\n" + number + ". ";
                  });
                  result = editor.val().substring(0, start) + first + selblock + last + 
                    editor.val().substring(end);
                  break;
                  
              case 'back':
              
                  start = content.lastIndexOf("\n", start) + 1;
                  end = content.indexOf("\n", end);
                  sel = editor.val().substring(start, end);
 
                  regex = new RegExp('(^|\r\n|\r|\n)' + first
                          .replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&'), 'g');  
                          
                  
                  selblock = sel.replace(regex, '$1');
                  result = editor.val().substring(0, start) + selblock + 
                    editor.val().substring(end);
                    
                  reverse = regex.test(sel);
                  if(reverse) {
                    
                    count = (sel.match(regex) != null) ? (sel.match(regex)).length : 0;
                    end = parseInt(end) - parseInt(first.length * count);
                  }
                  

                  break;
                  
              case 'table':
                  var rows = parseInt(prompt(config.buttons[action].promptRows));
                  var cols = parseInt(prompt(config.buttons[action].promptCols));
                  if ( isNaN(rows) || isNaN(cols) ) {
                      alert(config.buttons[action].error);
                      result = editor.val();
                  } else {
                      rows = rows > config.buttons[action].promptRows ? config.buttons[action].promptRows : rows;
                      cols = cols > config.buttons[action].promptCols ? config.buttons[action].promptCols : cols;
                      var table = '';
                      // headers
                      for ( j = 1; j <= rows; j++ ) { 
                        table += '| &nbsp;Header ' + j + ' ';
                        
                        switch ( j ) {
                          case 1 : table += ' - Left-aligned &nbsp; '; 
                            break;
                          case rows : table += ' Right-aligned &nbsp; '; 
                            break; 
                          default : table += ' Center-aligned &nbsp; ';                    
                          }
                        if ( j == rows )
                          table += '|\n';
                      }
                      for ( j = 1; j <= rows; j++ ) {
                        switch ( j ) {
                          case 1 : table += '|:--- '; 
                            break;
                          case rows : table += '| ---:'; 
                            break;
                          default : table += '|:---:';                    
                          }
                        if ( j == rows )
                          table += '|\n';
                      }
                      // table
                      for ( i = 1; i <= cols; i++ ) { 
                        for ( j = 1; j <= rows; j++ ) { 
                          table += '| Col'+ i + '-Row' + j + ' ';
                          if ( j == rows )
                            table += '|\n';
                        }
                      
                      }
                      result = editor.val().substring(0, start) + first + table + last + 
                        editor.val().substring(start);
                  }    
                  break;
                  
              case 'url':
                  var url = prompt(config.buttons[action].prompt, 
                    config.buttons[action].placeholder);
                  if ( url == null || url == "" ) {
                      alert(config.buttons[action].error);
                      result = editor.val();
                  } else {
                      result = editor.val().substring(0, start) + first + 
                        editor.val().substring(start, end) + last + '(' + url + ')' + 
                          editor.val().substring(end);
                      start = parseInt(start) + parseInt(first.length);
                      end = parseInt(end) + parseInt(first.length);
                  }    
                  break;
          } 

          editor.val(result);
          editor[0].selectionStart = start;
          editor[0].selectionEnd = end;
          editor.focus();

        });	
    },
  };

  Plugin.defaults = Plugin.prototype.defaults;

  $.fn.simpleMarkdownEditor = function(options) {
    return this.each(function() {
      new Plugin(this, options).init();
    });
  };

  //optional: window.Plugin = Plugin;

})( jQuery, window , document );