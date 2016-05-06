var eejs = require('ep_etherpad-lite/node/eejs/');

function eejsBlock_editbarMenuLeft(hook_name,args,cb){
	args.content += eejs.require('ep_export_cp_html_image/templates/ep_export_cp_html_image.ejs');
	return cb();

}

function eejsBlock_styles (hook_name, args, cb) {
  args.content = args.content + eejs.require("ep_export_cp_html_image/templates/styles.html", {}, module);
  return cb();
}


exports.eejsBlock_editbarMenuLeft = eejsBlock_editbarMenuLeft;
exports.eejsBlock_styles = eejsBlock_styles;