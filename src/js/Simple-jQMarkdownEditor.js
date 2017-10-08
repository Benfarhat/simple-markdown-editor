(function ( $ ) { // Immediately Invoked Function Expression :)
 
    $.fn.mardownEditor = function( options ) {
        // @see: http://spec.commonmark.org/
        // @see: https://tools.ietf.org/html/rfc7763
        // @see: https://tools.ietf.org/html/rfc7764
        // @see: https://help.github.com/articles/basic-writing-and-formatting-syntax/
        var opt = $.extend({
            // These are the defaults.
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
                last: '\n',
                hotkey: '6',
                rule: 'block',
                tooltip: 'Completed task.' 
              },
              uncompletedTask: {
                title: '<i class="fa fa-square-o"></i>',
                class: 'btn',
                first: '- [ ] ',
                last: '\n',
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
        }, options );
        
        var editor = this;
        var id = $(this).attr("id");
      
        // Add buttons
        var toolbar = [], button;
        $.each( opt.buttons, function( key, val ) {
          button = '<button class="' + opt.actionClass + ' ' + val.class + '" data-action="' + key + '" data-target="' + id + '" title="' + val.tooltip + '">' + val.title + '</i></button>';
          toolbar.push( button );
        });
        var divToolbar = $( '<div class="' + opt.toolbarClass + '"></div>' ).prepend( toolbar );
        this.before( divToolbar );
        
        // Save selection or cursor position
        // if we click somewhere else, textarea lost focus and selection so we need to save the start and end point inside custom textarea attributes
        // when we double click on a word to select it, the word is select with the space that follows it.
        // note that if opt.strictSelection == true > prevent this selection
        this.on("select focusout", function(){
          $(this).attr("data-start", this.selectionStart);
          if( opt.strictSelection && $(this).val().substring(this.selectionStart, this.selectionEnd).slice(-1) == " " ){
            $(this).attr("data-end", this.selectionEnd - 1);
          } else {
            $(this).attr("data-end", this.selectionEnd);
          }
        });
        
        // On toolbar click     
        $( '.' + opt.actionClass ).unbind("click").click(function() {
        
          var target = $(this).attr('data-target');
          var editor = $('#' + target);
          var content = editor.val();
          var start = editor.attr('data-start');
          var end = editor.attr('data-end');
          var sel = editor.val().substring(start, end);
          
          var action = $(this).attr('data-action');
          var first = opt.buttons[action].first;
          var last = opt.buttons[action].last;
          var check = editor.val().substring(eval(start - parseInt(first.length)), eval(parseInt(start) + parseInt(sel.length) + parseInt(last.length)));
          
          var rule = opt.buttons[action].rule;
          var newLine = new RegExp(/(\r\n|\r|\n)/, "g");
          
          switch(rule) {
          
              case 'inline':
                    // if the tag (first fragment) is already present then we delete it
                    if ( check === first + sel + last ) {
                      var result = editor.val().substring(0, eval(start - first.length)) + sel + editor.val().substring(eval(parseInt(end) + parseInt(last.length)));
                    } else {
                      var result = editor.val().substring(0, start) + first + sel + last + editor.val().substring(end);
                    }
                  break;
          
              case 'inline-reversible':
                    // if the tage is already present then we delete it
                    if ( check === first + sel + last ) {
                      var result = editor.val().substring(0, eval(start - first.length)) + sel + editor.val().substring(eval(parseInt(end) + parseInt(last.length)));
                    } else {
                      var result = editor.val().substring(0, start) + first + sel + last + editor.val().substring(end);
                    }
                  break;
                  
              case 'block':
                  // When using block, we start the selection from the begining of the current line
                  for( i = start ; i >= 0; i-- ){
                      if( ( content.substring( i, i + 1 ) === '\n' ) || ( i === 0 ) ) {
                        start = ( i == 0 ) ? 0 : i + 1 ;
                        sel = editor.val().substring(start, end);
                        // If the first line start with the tag (first fragment) we reverse the function
                        regex = new RegExp('^' + first.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&'));
                        var reverse = regex.test(sel);

                        if( reverse ) var firstsel = sel.replace(regex, '');
                        break;
                      }
                  }
                  if( reverse) {
                    regex = new RegExp('(\r\n|\r|\n)' + first.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&'), 'g');
                    var selblock = firstsel.replace(regex, '$1');
                    var result = editor.val().substring(0, start) + selblock + editor.val().substring(end);
                  } else {
                    var selblock = sel.replace(newLine, '$1' + first);
                    var result = editor.val().substring(0, start) + first + selblock + last + editor.val().substring(end);
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
                  var selblock = sel.replace(newLine, function() {
                      number++;
                      return "\n" + number + ". ";
                  })
                  var result = editor.val().substring(0, start) + first + selblock + last + editor.val().substring(end);
                  break;
                  
              case 'back':
                  for( i = start ; i >= 0; i-- ){
                      if( ( content.substring( i, i + 1 ) === '\n' ) || ( i === 0 ) ) {
                        start = ( i == 0 ) ? 0 : i + 1 ;
                        sel = editor.val().substring(start, end);
                        var regex = new RegExp('^' + first.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&'), 'g');
                        var firstsel = sel.replace(regex, '');

                        break;
                      }
                  }
                  regex = new RegExp('(\r\n|\r|\n)' + first.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&'), 'g');
                  var selblock = firstsel.replace(regex, '$1');
                  var result = editor.val().substring(0, start) + selblock + editor.val().substring(end);
                  break;
                  
              case 'table':
                  var rows = parseInt(prompt(opt.buttons[action].promptRows));
                  var cols = parseInt(prompt(opt.buttons[action].promptCols));
                  if ( isNaN(rows) || isNaN(cols) ) {
                      alert(opt.buttons[action].error);
                      var result = editor.val();
                  } else {
                      rows = rows > opt.buttons[action].promptRows ? opt.buttons[action].promptRows : rows;
                      cols = cols > opt.buttons[action].promptCols ? opt.buttons[action].promptCols : cols;
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
                      var result = editor.val().substring(0, start) + first + table + last + editor.val().substring(start);
                  }    
                  break;
                  
              case 'url':
                  var url = prompt(opt.buttons[action].prompt, opt.buttons[action].placeholder);
                  if ( url == null || url == "" ) {
                      alert(opt.buttons[action].error);
                      var result = editor.val();
                  } else {
                      var result = editor.val().substring(0, start) + first + editor.val().substring(start, end) + last + '(' + url + ')' + editor.val().substring(end);
                  }    
                  break;
          } 
          
          /*
          @todo 


          les retours
          
          
          
          
          
          
          
          */
          
          editor.val(result);
          editor.focus();
          editor.selectionStart = start;
          editor.selectionEnd = end;
          console.log(start);
          console.log(end);
          
          /*
          console.log(editor);
          console.log(sel);
          console.log(action);
          */

        });
        /*
        return this.css({
            color: opt.color,
            backgroundColor: opt.backgroundColor
        });
        */
 
    };
 
}( jQuery ));