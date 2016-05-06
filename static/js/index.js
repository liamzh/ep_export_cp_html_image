

function postAceInit(hook,context){

  var eh = $('#export_html');
  var css = [];

  eh.on('click', function(){
    context.ace.callWithAce(function(ace){
        var doc = ace.ace_getDocument();
        var html = $(doc).find('#innerdocbody').html();
      for (var sheeti= 0; sheeti<document.styleSheets.length; sheeti++) {
          var sheet= document.styleSheets[sheeti];
          var rules= ('cssRules' in sheet)? sheet.cssRules : sheet.rules;
          for (var rulei= 0; rulei<rules.length; rulei++) {
              var rule= rules[rulei];
              if ('cssText' in rule)
                  css.push(rule.cssText);
              else
                  css.push(rule.selectorText+' {\n'+rule.style.cssText+'\n}\n');
          }
      }

      css.join('\n'); 
      var jsonCss = JSON.stringify(css);
      // console.log(jsonCss);
      // console.log(html);

      var arrToString = '';
      for(var i in jsonCss) {
        arrToString += jsonCss[i];
      }

      var head = '<!DOCTYPE html><html><head><style>' + arrToString.replace(/"/g,'') + '</style></head>';
      var body = '<body>' + html + '</body></html>';
      var full = head + body;
      //console.log(full);

      var a         = document.createElement('a');
      a.href        = 'data:attachment;,' + encodeURIComponent(full);
      a.target      = '_blank';
      a.download    = 'exportedPad.html';

      document.body.appendChild(a);
      a.click();

      //var newLocation = document.location + 'data:text/attachment;,' + head + body;
      //window.open( newLocation + '.html','_blank');
        // $.post('http://127.0.0.1/testPHP/parser.php',{html:head + body},function(response) {
        //   console.log(response);
        // })
      });
    });

}


exports.postAceInit = postAceInit;