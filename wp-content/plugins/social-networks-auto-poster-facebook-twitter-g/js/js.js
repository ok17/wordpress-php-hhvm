jQuery(document).ready(function() { 
  if (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0) { //## Chrome Autofill is evil
    jQuery(window).load(function(){
        jQuery('input:-webkit-autofill').each(function(){ var text =jQuery(this).val(); var name = jQuery(this).attr('name'); jQuery(this).after(this.outerHTML).remove(); jQuery('input[name=' + name + ']').val(text);});
    });
  }  
  //jQuery( "input[onchange^='nxs_doShowWarning']" ).prop("indeterminate", true).css( "-webkit-appearance", "checkbox" );  
  //jQuery( "input[onchange^='nxs_doShowWarning']" ).prop("indeterminate", true).css("background", "#D0D0D0").css("border-color", "#999");    
  //## Submit Serialized Form - avoid Max.Vars limit.
  jQuery('#nsStFormMisc').submit(function() { var dataA = jQuery('#nsStForm').serialize(); jQuery('#nxsMainFromElementAccts').val(dataA); jQuery('#_wpnonce').val(jQuery('input#nxsSsPageWPN_wpnonce').val()); });
  jQuery('#nsStForm').submit(function() { jQuery('#nsStFormMisc').submit(); return false; });  
  var nxs_isPrevirew = false;   
  jQuery('#post-preview').click(function(event) { nxs_isPrevirew = true; });  
  jQuery('#post').submit(function(event) { if (nxs_isPrevirew == true) return;  jQuery('body').append('<form id="nxs_tempForm"></form>'); jQuery("#NXS_MetaFieldsIN").appendTo("#nxs_tempForm");  
      var nxsmf = jQuery('#nxs_tempForm').serialize();  jQuery( "#NXS_MetaFieldsIN" ).remove(); jQuery('#nxs_snapPostOptions').val(nxsmf); //alert(nxsmf);  alert(jQuery('#nxs_snapPostOptions').val()); return false; 
  });  
  
  jQuery('.nxs_postEditCtrl').on("change", function(e) { var psst = jQuery('#original_post_status').val(); if (psst=='auto-draft') return; var pid = jQuery('#post_ID').val();  var curr = jQuery(e.target); 
    jQuery.post(ajaxurl,{action: 'nxs_snap_aj',"nxsact":"svEdFlds", cname: curr.attr('name'), cval: curr.val(), pid: pid,  nxs_mqTest:"'", _wpnonce: jQuery('#nxsSsPageWPN_wpnonce').val()}, function(j){  
         console.log(j);          
    }, "html")
  });  
  jQuery('#nxs_ntType').ddslick({ width: 200, imagePosition: "left", selectText: "Select network", onSelected: function (data) {doShowFillBlockX(data.selectedData.value);}});  
});

(function($) {
  $(function() {
     jQuery('#nxs_snapAddNew').bind('click', function(e) { e.preventDefault(); jQuery('#nxs_spPopup').bPopup({ modalClose: false, appendTo: '#nsStForm', opacity: 0.6, follow: [false, false], position: [65, 50]}); });
     jQuery('#showLic').bind('click', function(e) { e.preventDefault(); jQuery('#showLicForm').bPopup({ modalClose: false, appendTo: '#nsStForm', opacity: 0.6, follow: [false, false]}); });                                 
     /* // Will move it here later for better compatibility
     jQuery('.button-primary[name="update_NS_SNAutoPoster_settings"]').bind('click', function(e) { var str = jQuery('input[name="post_category[]"]').serialize(); jQuery('div.categorydivInd').replaceWith('<input type="hidden" name="pcInd" value="" />'); 
       str = str.replace(/post_category/g, "pk"); jQuery('div.categorydiv').replaceWith('<input type="hidden" name="post_category" value="'+str+'" />');  
     });
     */
  });
})(jQuery);

function nxs_showNewPostFrom() { jQuery('#nxs_popupDiv').bPopup({ modalClose: false, speed: 450, transition: 'slideDown', contentContainer:'#nxs_popupDivCont', loadUrl: 'admin-ajax.php', 'loadData': { "action": "nxs_snap_aj", "nxsact":"getNewPostDlg", "_wpnonce":jQuery('input#nxsSsPageWPN_wpnonce').val() }, loadCallback: function(){ jQuery("#nxsNPLoader").hide();  }, onClose: function(){ jQuery("#nxsNPLoader").show(); }, opacity: 0.6, follow: [false, false]});  }

function nxs_doNP(){ jQuery("#nxsNPLoaderPost").show(); var mNts = []; jQuery('input[name=nxsNPNts]:checked').each(function(i){ mNts[i] = jQuery(this).val(); });
  jQuery.post(ajaxurl,{action: 'nxs_snap_aj',"nxsact":"doNewPost", mText: jQuery('#nxsNPText').val(), mTitle: jQuery('#nxsNPTitle').val(), mType: jQuery('input[name=nxsNPType]:checked').val(), mLink: jQuery('#nxsNPLink').val(), mImg: jQuery('#nxsNPImg').val(), mNts: mNts, nxs_mqTest:"'", _wpnonce: jQuery('#nxsSsPageWPN_wpnonce').val()}, function(j){  jQuery("#nxsNPResult").html(j); jQuery("#nxsNPLoaderPost").hide(); jQuery("#nxsNPCloseBt").val('Close'); }, "html")     
}

function nxs_updtRdBtn(idd){
    jQuery('#rbtn'+idd).attr('type', 'checkbox'); //alert('rbtn'+idd);
}

//## Functions
function nxs_doResetPostSettings(pid){    
  jQuery.post(ajaxurl,{action: 'nxs_delPostSettings', pid: pid, _wpnonce: jQuery('input#nxsSsPageWPN_wpnonce').val()}, function(j){  window.location = window.location.href.split("#")[0]; }, "html")     
}
function nxs_expSettings(){
  jQuery.generateFile({ filename: 'nx-snap-settings.txt', content: jQuery('input#nxsSsPageWPN_wpnonce').val(), script: 'admin-ajax.php'});
}
// AJAX Functions
function nxs_getPNBoards(u,p,ii){ jQuery("#pnLoadingImg"+ii).show();
  jQuery.post(ajaxurl,{u:u,p:p,ii:ii, nxs_mqTest:"'", action: 'getBoards', id: 0, _wpnonce: jQuery('input#nxsSsPageWPN_wpnonce').val()}, function(j){ 
    if (j.indexOf("option")<1) alert(j); else jQuery("select#apPNBoard"+ii).html(j); jQuery("#pnLoadingImg"+ii).hide();
  }, "html")
}
function getGPCats(u,p,ii,c){ jQuery("#gpLoadingImg"+ii).show();
  jQuery.post(ajaxurl,{u:u,p:p,c:c,ii:ii, nxs_mqTest:"'", action: 'getGPCats', id: 0, _wpnonce: jQuery('input#nxsSsPageWPN_wpnonce').val()}, function(j){ var options = '';
    jQuery("select#apGPCCats"+ii).html(j); jQuery("#gpLoadingImg"+ii).hide();
  }, "html")
}
function getWLBoards(u,p,ii){ jQuery("#wlLoadingImg"+ii).show();
  jQuery.post(ajaxurl,{u:u,p:p,ii:ii, nxs_mqTest:"'", action: 'getWLBoards', id: 0, _wpnonce: jQuery('input#nxsSsPageWPN_wpnonce').val()}, function(j){ var options = '';
    jQuery("select#apWLBoard"+ii).html(j); jQuery("#wlLoadingImg"+ii).hide();
  }, "html")
}
function nxs_getBrdsOrCats(u,p,ty,ii,fName){ jQuery("#"+ty+"LoadingImg"+ii).show();
  jQuery.post(ajaxurl,{u:u,p:p,ii:ii,ty:ty, nxs_mqTest:"'", action: 'nxs_getBrdsOrCats', id: 0, _wpnonce: jQuery('input#nxsSsPageWPN_wpnonce').val()}, function(j){ var options = '';
    jQuery("select#"+fName+ii).html(j); jQuery("#"+ty+"LoadingImg"+ii).hide();
  }, "html")
}


function nxs_setRpstAll(t,ed,ii){ jQuery("#nxsLoadingImg"+t+ii).show(); var lpid = jQuery('#'+t+ii+'SetLPID').val();
  jQuery.post(ajaxurl,{t:t,ed:ed,ii:ii, nxs_mqTest:"'", action: 'SetRpstAll', id: 0, lpid:lpid, _wpnonce: jQuery('input#nxsSsPageWPN_wpnonce').val()}, function(j){ var options = '';
    alert('OK. Done.'); jQuery("#nxsLoadingImg"+t+ii).hide();
  }, "html")
}

function nxs_fillTime(dd){ var d=new Date(dd); jQuery('#nxs_aa').val(d.getFullYear()); jQuery('#nxs_mm').val(d.getMonth()+1); jQuery('#nxs_jj').val(d.getDate()); jQuery('#nxs_hh').val(d.getHours()); jQuery('#nxs_mn').val(d.getMinutes()); }
function nxs_makeTimeTxt(){ var m=new Array();m[0]="January";m[1]="February";m[2]="March";m[3]="April";m[4]="May";m[5]="June";m[6]="July";m[7]="August";m[8]="September";m[9]="October";m[10]="November";m[11]="December";  
    return m[jQuery('#nxs_mm').val()-1]+', '+jQuery('#nxs_jj').val()+' '+jQuery('#nxs_aa').val()+' '+jQuery('#nxs_hh').val()+':'+jQuery('#nxs_mn').val()+':00'; 
}

//## Select/Unselect Categories
function nxs_chAllCatsL(ch, divID){ jQuery("#"+divID+" input:checkbox[name='post_category[]']").attr('checked', ch==1); }
function nxs_markCats(cats){ var catsA = cats.split(',');
  jQuery("#showCatSel input:checkbox[name='post_category[]']").each(function(index) { jQuery(this).attr('checked', jQuery.inArray(jQuery(this).val(), catsA)>-1);  });    
}
function nxs_doSetSelCats(nt, idNum){ var scc = ''; var sccA = []; 
  jQuery("#showCatSel input:checkbox[name='post_category[]']").each(function(index) {  if(jQuery(this).is(":checked")) sccA.push(jQuery(this).val()); });
  var sccL = sccA.length; if (sccL>0) scc = sccA.join(",");  jQuery('#nxs_SC_'+nt).val(scc); jQuery('#nxs_SCA_'+nt).html('Selected ['+sccL+']');
}

function nxs_showPopUpInfo(pid, e){ if (!jQuery('div#'+pid).is(":visible")) jQuery('div#'+pid).show().css('top', e.pageY+5).css('left', e.pageX+25).appendTo('body'); }
function nxs_hidePopUpInfo(pid){ jQuery('div#'+pid).hide(); }

function showPopShAtt(imid, e){ if (!jQuery('div#popShAtt'+imid).is(":visible")) jQuery('div#popShAtt'+imid).show().css('top', e.pageY+5).css('left', e.pageX+25).appendTo('body'); }
function hidePopShAtt(imid){ jQuery('div#popShAtt'+imid).hide(); }
function doSwitchShAtt(att, idNum){
  if (att==1) { if (jQuery('#apFBAttch'+idNum).is(":checked")) {jQuery('#apFBAttchShare'+idNum).prop('checked', false);}} else {if( jQuery('#apFBAttchShare'+idNum).is(":checked")) jQuery('#apFBAttch'+idNum).prop('checked', false);}
}      
      
function doShowHideAltFormat(){ if (jQuery('#NS_SNAutoPosterAttachPost').is(':checked')) { 
  jQuery('#altFormat').css('margin-left', '20px'); jQuery('#altFormatText').html('Post Announce Text:'); } else {jQuery('#altFormat').css('margin-left', '0px'); jQuery('#altFormatText').html('Post Text Format:');}
}
function nxs_doShowWarning(blID, num, bl, ii){ var idnum = bl+ii; 
  if (blID.is(':checked')) { var cnf =  confirm("You have active filters. You have "+num+" categories or tags selected. \n\r This will reset all filters. \n\r Would you like to continue?");   
  if (cnf==true) { if (jQuery('#catSelA'+idnum).length) jQuery('#catSelA'+idnum).prop('checked', true); else {
      jQuery('#nsStForm').append('<input type="hidden" id="catSelA'+idnum+'" name="'+bl.toLowerCase()+'['+ii+'][catSel]" value="X" />');
  } } else { blID.prop('checked', false); }
}}
function doShowHideBlocks(blID){ /* alert('#do'+blID+'Div'); */ if (jQuery('#apDo'+blID).is(':checked')) jQuery('#do'+blID+'Div').show(); else jQuery('#do'+blID+'Div').hide();}
function doShowHideBlocks1(blID, shhd){ if (shhd==1) jQuery('#do'+blID+'Div').show(); else jQuery('#do'+blID+'Div').hide();}            
function doShowHideBlocks2(blID){ if (jQuery('#apDoS'+blID).val()=='0') { jQuery('#do'+blID+'Div').show(); jQuery('#do'+blID+'A').text('[Hide Settings]'); jQuery('#apDoS'+blID).val('1'); } 
  else { jQuery('#do'+blID+'Div').hide(); jQuery('#do'+blID+'A').text('[Show Settings]'); jQuery('#apDoS'+blID).val('0'); }
}

function doGetHideNTBlock(bl,ii){ if (jQuery('#apDoS'+bl+ii).length<1 || jQuery('#apDoS'+bl+ii).val()=='0') { 
    if (jQuery('#do'+bl+ii+'Div').length<1) {  jQuery("#"+bl+ii+"LoadingImg").show();
      jQuery.post(ajaxurl,{nxsact:'getNTset',nt:bl,ii:ii,action:'nxs_snap_aj', _wpnonce: jQuery('input#nxsSsPageWPN_wpnonce').val()}, function(j){ var options = '';
        //## check is filters were reset
        //var filtersReset = jQuery('#catSelA'+bl+ii).length && jQuery('#catSelA'+bl+ii).val() == 'X'; if (filtersReset) jQuery('#catSelA'+bl+ii).remove();
        //## Show data
        jQuery('#nxsNTSetDiv'+bl+ii).html(j); nxs_doTabsInd('#nxsNTSetDiv'+bl+ii); jQuery("#"+bl+ii+"LoadingImg").hide(); jQuery('#do'+bl+ii+'Div').show(); jQuery('#do'+bl+ii+'AG').text('[Hide Settings]'); jQuery('#apDoS'+bl+ii).val('1');        
        if (jQuery('#rbtn'+bl.toLowerCase()+ii).attr('type') != 'checkbox') jQuery('#rbtn'+bl.toLowerCase()+ii).attr('type', 'checkbox');          
        // if (filtersReset) jQuery('#catSelA'+bl+ii).prop('checked', true);
      }, "html")
    } else { jQuery('#do'+bl+ii+'Div').show(); jQuery('#do'+bl+ii+'AG').text('[Hide Settings]'); jQuery('#apDoS'+bl+ii).val('1'); }
  } else { jQuery('#do'+bl+ii+'Div').hide(); jQuery('#do'+bl+ii+'AG').text('[Show Settings]'); jQuery('#apDoS'+bl+ii).val('0'); }
}

function nxs_showHideBlock(iid, iclass){jQuery('.'+iclass).hide(); jQuery('#'+iid).show();}
            
function doShowFillBlock(blIDTo, blIDFrm){ jQuery('#'+blIDTo).html(jQuery('#do'+blIDFrm+'Div').html());}
function doCleanFillBlock(blIDFrm){ jQuery('#do'+blIDFrm+'Div').html('');}
            
function doShowFillBlockX(blIDFrm){ jQuery('.clNewNTSets').hide(); jQuery('#do'+blIDFrm+'Div').show(); }
            
function doDelAcct(nt, blID, blName){  var answer = confirm("Remove "+blName+" account?");
  if (answer){ var data = { action: 'nsDN', id: 0, nt: nt, id: blID, _wpnonce: jQuery('input#nxsSsPageWPN_wpnonce').val()}; 
    jQuery.post(ajaxurl, data, function(response) {  window.location = window.location.href.split("#")[0];  });
  }           
}      

function callAjSNAP(data, label) { 
  var style = "position: fixed; display: none; z-index: 1000; top: 50%; left: 50%; background-color: #E8E8E8; border: 1px solid #555; padding: 15px; width: 350px; min-height: 80px; margin-left: -175px; margin-top: -40px; text-align: center; vertical-align: middle;";
  jQuery('body').append("<div id='test_results' style='" + style + "'></div>");
  jQuery('#test_results').html("<p>Sending update to "+label+"</p>" + "<p><img src='http://gtln.us/img/misc/ajax-loader-med.gif' /></p>");
  jQuery('#test_results').show();            
  jQuery.post(ajaxurl, data, function(response) { if (response=='') response = 'Message Posted';
    jQuery('#test_results').html('<p> ' + response + '</p>' +'<input type="button" class="button" name="results_ok_button" id="results_ok_button" value="OK" />');
    jQuery('#results_ok_button').click(remove_results);
  });            
}
function remove_results() { jQuery("#results_ok_button").unbind("click");jQuery("#test_results").remove();
  if (typeof document.body.style.maxHeight == "undefined") { jQuery("body","html").css({height: "auto", width: "auto"}); jQuery("html").css("overflow","");}
  document.onkeydown = "";document.onkeyup = "";  return false;
}

function mxs_showHideFrmtInfo(hid){
  if(!jQuery('#'+hid+'Hint').is(':visible')) mxs_showFrmtInfo(hid); else {jQuery('#'+hid+'Hint').hide(); jQuery('#'+hid+'HintInfo').html('Show format info');}
}
function mxs_showFrmtInfo(hid){
  jQuery('#'+hid+'Hint').show(); jQuery('#'+hid+'HintInfo').html('Hide format info'); 
}
function nxs_clLog(){
  jQuery.post(ajaxurl,{action: 'nxs_clLgo', id: 0, _wpnonce: jQuery('input#nxsSsPageWPN_wpnonce').val()}, function(j){ var options = '';                    
    jQuery("#nxslogDiv").html('');
  }, "html")
}
function nxs_rfLog(){
  jQuery.post(ajaxurl,{action: 'nxs_rfLgo', id: 0, _wpnonce: jQuery('input#nxsSsPageWPN_wpnonce').val()}, function(j){ var options = '';                    
    jQuery("#nxslogDiv").html(j);
  }, "html")
}
function nxs_prxTest(){  jQuery('#nxs_pchAjax').show();
  jQuery.post(ajaxurl,{action: 'nxs_prxTest', id: 0, _wpnonce: jQuery('input#nxsSsPageWPN_wpnonce').val()}, function(j){ var options = '';                    
    jQuery('#nxs_pchAjax').hide(); jQuery("#prxList").html(j);  
  }, "html")
}
function nxs_prxGet(){  jQuery('#nxs_pchAjax').show();
  jQuery.post(ajaxurl,{action: 'nxs_prxGet', id: 0, _wpnonce: jQuery('input#nxsSsPageWPN_wpnonce').val()}, function(j){ var options = '';                    
    jQuery('#nxs_pchAjax').hide(); jQuery("#prxList").html(j);  
  }, "html")
}
function nxs_TRSetEnable(ptype, ii){
  if (ptype=='I'){ jQuery('#apTRMsgTFrmt'+ii).attr('disabled', 'disabled'); jQuery('#apTRDefImg'+ii).removeAttr('disabled'); } 
    else { jQuery('#apTRDefImg'+ii).attr('disabled', 'disabled');  jQuery('#apTRMsgTFrmt'+ii).removeAttr('disabled'); }                
}
function nxsTRURLVal(ii){ var val = jQuery('#apTRURL'+ii).val(); var srch = val.toLowerCase().indexOf('http://www.tumblr.com/blog/');
  if (srch>-1) { jQuery('#apTRURL'+ii).css({"background-color":"#FFC0C0"}); jQuery('#apTRURLerr'+ii).html('<br/>Incorrect URL: Please note that URL of your Tumblr Blog should be your public URL. (i.e. like http://nextscripts.tumblr.com/, not http://www.tumblr.com/blog/nextscripts'); } else { jQuery('#apTRURL'+ii).css({"background-color":"#ffffff"}); jQuery('#apTRURLerr'+ii).text(''); }            
}

function nxs_hideTip(id){  
  jQuery.post(ajaxurl,{action: 'nxs_hideTip', id: id, _wpnonce: jQuery('input#nxsSsPageWPN_wpnonce').val()}, function(j){ var options = '';                    
     jQuery('#'+id).hide(); 
  }, "html")
}

function nxs_actDeActTurnOff(objId){ if (jQuery('#'+objId).val()!='1') jQuery('#'+objId+'xd').show(); else jQuery('#'+objId+'xd').hide();}

//## V4 Port
function nxs_svSetAdv(nt,ii,divIn,divOut,loc,isModal){ jQuery(':focus').blur();
    //## jQuery clone fix for empty textareas
    (function (original) { jQuery.fn.clone = function () { var result = original.apply(this, arguments),
      my_textareas = this.find('textarea').add(this.filter('textarea')), result_textareas = result.find('textarea').add(result.filter('textarea')), 
      my_selects = this.find('select').add(this.filter('select')), result_selects = result.find('select').add(result.filter('select'));
      for (var i = 0, l = my_textareas.length; i < l; ++i) jQuery(result_textareas[i]).val( jQuery(my_textareas[i]).val() );    
      for (var i = 0, l = my_selects.length; i < l; ++i) for (var j = 0, m = my_selects[i].options.length; j < m; ++j) if (my_selects[i].options[j].selected === true) result_selects[i].options[j].selected = true;    
      return result;
    }; }) (jQuery.fn.clone); 
    //## /END jQuery clone fix for empty textareas
    if (isModal=='1') { jQuery("#"+divIn).addClass("loading");  jQuery("#nxsSaveLoadingImg"+nt+ii).show(); } else { jQuery("#"+nt+ii+"ldImg").show(); jQuery("#"+nt+ii+"rfrshImg").hide();   }
    if (divIn=='nxsAllAccntsDiv' && jQuery("#nxsAllAccntsDiv").length && jQuery("#nxsSettingsDiv").length) jQuery("#nxsSettingsDiv").appendTo("#nxsAllAccntsDiv");
    
    var isOut=''; if (typeof(divOut)!='undefined' && divOut!='') isOut = '<input type="hidden" name="isOut" value="1" />';
    
    frmTxt = '<div id="nxs_tmpDiv_'+nt+ii+'" style="display:none;"><form id="nxs_tmpFrm_'+nt+ii+'"><input name="action" value="nxs_snap_aj" type="hidden" /><input name="nxsact" value="setNTset" type="hidden" /><input name="nxs_mqTest" value="\'" type="hidden" /><input type="hidden" name="_wp_http_referer" value="'+jQuery("input[name='_wp_http_referer']").val()+'" /><input type="hidden" name="_wpnonce" value="'+jQuery('#nxsSsPageWPN_wpnonce').val()+'" />'+isOut+'</form></div>';
    jQuery("body").append(frmTxt); jQuery("#"+divIn).clone(true).appendTo("#nxs_tmpFrm_"+nt+ii); var serTxt = jQuery("#nxs_tmpFrm_"+nt+ii).serialize(); jQuery("#nxs_tmpDiv_"+nt+ii).remove();// alert(serTxt);
    jQuery.ajax({ type: "POST", url: ajaxurl, data: serTxt, 
      success: function(data){ if (isModal=='1') jQuery("#nxsAllAccntsDiv").removeClass("loading"); else {  jQuery("#"+nt+ii+"rfrshImg").show(); jQuery("#"+nt+ii+"ldImg").hide(); }
      if(typeof(divOut)!='undefined' && divOut!='') jQuery('#'+divOut).html(data); 
      if (isModal=='1') {  jQuery("#nxsSaveLoadingImg"+nt+ii).hide(); jQuery("#doneMsg"+nt+ii).show(); jQuery("#doneMsg"+nt+ii).delay(600).fadeOut(3200); }
        if (loc!='') { if (loc!='r') window.location = loc; else window.location = jQuery(location).attr('href'); } 
      }
    });
    
}

function nxs_showHideFrmtInfo(hid){
  if(!jQuery('#'+hid+'Hint').is(':visible')) nxs_showFrmtInfo(hid); else {jQuery('#'+hid+'Hint').hide(); jQuery('#'+hid+'HintInfo').html('Show format info');}
}
function nxs_showFrmtInfo(hid){
  jQuery('#'+hid+'Hint').show(); jQuery('#'+hid+'HintInfo').html('Hide format info'); 
}
//## /V4 Port

//## Export File
(function(jQuery){ jQuery.generateFile = function(options){ options = options || {};
        if(!options.script || !options.filename || !options.content){
            throw new Error("Please enter all the required config options!");
        }
        var iframe = jQuery('<iframe>',{ width:1, height:1, frameborder:0, css:{ display:'none' } }).appendTo('body');
        var formHTML = '<form action="" method="post"><input type="hidden" name="filename" /><input type="hidden" name="_wpnonce" /><input type="hidden" name="action" value="nxs_getExpSettings" /></form>';
        setTimeout(function(){
            var body = (iframe.prop('contentDocument') !== undefined) ? iframe.prop('contentDocument').body : iframe.prop('document').body;    // IE
            body = jQuery(body); body.html(formHTML); var form = body.find('form');
            form.attr('action',options.script);
            form.find('input[name=filename]').val(options.filename);            
            form.find('input[name=_wpnonce]').val(options.content);
            form.submit();
        },50);
    };
})(jQuery);

/*================================================================================
 * @name: bPopup * @author: (c)Bjoern Klinggaard (twitter@bklinggaard) * @version: 0.11.0.min
 ================================================================================*/
  (function(c){c.fn.bPopup=function(A,E){function L(){a.contentContainer=c(a.contentContainer||b);switch(a.content){case "iframe":var d=c('<iframe class="b-iframe" '+a.iframeAttr+"></iframe>");d.appendTo(a.contentContainer);t=b.outerHeight(!0);u=b.outerWidth(!0);B();d.attr("src",a.loadUrl);l(a.loadCallback);break;case "image":B();c("<img />").load(function(){l(a.loadCallback);F(c(this))}).attr("src",a.loadUrl).hide().appendTo(a.contentContainer);break;default:B(),c('<div class="b-ajax-wrapper"></div>').load(a.loadUrl,a.loadData,function(d,b,e){l(a.loadCallback,b);F(c(this))}).hide().appendTo(a.contentContainer)}}function B(){a.modal&&c('<div class="b-modal '+e+'"></div>').css({backgroundColor:a.modalColor,position:"fixed",top:0,right:0,bottom:0,left:0,opacity:0,zIndex:a.zIndex+v}).appendTo(a.appendTo).fadeTo(a.speed,a.opacity);C();b.data("bPopup",a).data("id",e).css({left:"slideIn"==a.transition||"slideBack"==a.transition?"slideBack"==a.transition?f.scrollLeft()+w:-1*(x+u):m(!(!a.follow[0]&&n||g)),position:a.positionStyle||"absolute",top:"slideDown"==a.transition||"slideUp"==a.transition?"slideUp"==a.transition?f.scrollTop()+y:z+-1*t:p(!(!a.follow[1]&&q||g)),"z-index":a.zIndex+v+1}).each(function(){a.appending&&c(this).appendTo(a.appendTo)});G(!0)}function r(){a.modal&&c(".b-modal."+b.data("id")).fadeTo(a.speed,0,function(){c(this).remove()});a.scrollBar||c("html").css("overflow","auto");c(".b-modal."+e).unbind("click");f.unbind("keydown."+e);k.unbind("."+e).data("bPopup",0<k.data("bPopup")-1?k.data("bPopup")-1:null);b.undelegate(".bClose, ."+a.closeClass,"click."+e,r).data("bPopup",null);clearTimeout(H);G();return!1}function I(d){y=k.height();w=k.width();h=D();if(h.x||h.y)clearTimeout(J),J=setTimeout(function(){C();d=d||a.followSpeed;var e={};h.x&&(e.left=a.follow[0]?m(!0):"auto");h.y&&(e.top=a.follow[1]?p(!0):"auto");b.dequeue().each(function(){g?c(this).css({left:x,top:z}):c(this).animate(e,d,a.followEasing)})},50)}function F(d){var c=d.width(),e=d.height(),f={};a.contentContainer.css({height:e,width:c});e>=b.height()&&(f.height=b.height());c>=b.width()&&(f.width=b.width());t=b.outerHeight(!0);u=b.outerWidth(!0);C();a.contentContainer.css({height:"auto",width:"auto"});f.left=m(!(!a.follow[0]&&n||g));f.top=p(!(!a.follow[1]&&q||g));b.animate(f,250,function(){d.show();h=D()})}function M(){k.data("bPopup",v);b.delegate(".bClose, ."+a.closeClass,"click."+e,r);a.modalClose&&c(".b-modal."+e).css("cursor","pointer").bind("click",r);N||!a.follow[0]&&!a.follow[1]||k.bind("scroll."+e,function(){if(h.x||h.y){var d={};h.x&&(d.left=a.follow[0]?m(!g):"auto");h.y&&(d.top=a.follow[1]?p(!g):"auto");b.dequeue().animate(d,a.followSpeed,a.followEasing)}}).bind("resize."+e,function(){I()});a.escClose&&f.bind("keydown."+e,function(a){27==a.which&&r()})}function G(d){function c(e){b.css({display:"block",opacity:1}).animate(e,a.speed,a.easing,function(){K(d)})}switch(d?a.transition:a.transitionClose||a.transition){case "slideIn":c({left:d?m(!(!a.follow[0]&&n||g)):f.scrollLeft()-(u||b.outerWidth(!0))-200});break;case "slideBack":c({left:d?m(!(!a.follow[0]&&n||g)):f.scrollLeft()+w+200});break;case "slideDown":c({top:d?p(!(!a.follow[1]&&q||g)):f.scrollTop()-(t||b.outerHeight(!0))-200});break;case "slideUp":c({top:d?p(!(!a.follow[1]&&q||g)):f.scrollTop()+y+200});break;default:b.stop().fadeTo(a.speed,d?1:0,function(){K(d)})}}function K(d){d?(M(),l(E),a.autoClose&&(H=setTimeout(r,a.autoClose))):(b.hide(),l(a.onClose),a.loadUrl&&(a.contentContainer.empty(),b.css({height:"auto",width:"auto"})))}function m(a){return a?x+f.scrollLeft():x}function p(a){return a?z+f.scrollTop():z}function l(a,e){c.isFunction(a)&&a.call(b,e)}function C(){z=q?a.position[1]:Math.max(0,(y-b.outerHeight(!0))/2-a.amsl);x=n?a.position[0]:(w-b.outerWidth(!0))/2;h=D()}function D(){return{x:w>b.outerWidth(!0),y:y>b.outerHeight(!0)}}c.isFunction(A)&&(E=A,A=null);var a=c.extend({},c.fn.bPopup.defaults,A);a.scrollBar||c("html").css("overflow","hidden");var b=this,f=c(document),k=c(window),y=k.height(),w=k.width(),N=/OS 6(_\d)+/i.test(navigator.userAgent),v=0,e,h,q,n,g,z,x,t,u,J,H;b.close=function(){r()};b.reposition=function(a){I(a)};return b.each(function(){c(this).data("bPopup")||(l(a.onOpen),v=(k.data("bPopup")||0)+1,e="__b-popup"+v+"__",q="auto"!==a.position[1],n="auto"!==a.position[0],g="fixed"===a.positionStyle,t=b.outerHeight(!0),u=b.outerWidth(!0),a.loadUrl?L():B())})};c.fn.bPopup.defaults={amsl:50,appending:!0,appendTo:"body",autoClose:!1,closeClass:"b-close",content:"ajax",contentContainer:!1,easing:"swing",escClose:!0,follow:[!0,!0],followEasing:"swing",followSpeed:500,iframeAttr:'scrolling="no" frameborder="0"',loadCallback:!1,loadData:!1,loadUrl:!1,modal:!0,modalClose:!0,modalColor:"#000",onClose:!1,onOpen:!1,opacity:.7,position:["auto","auto"],positionStyle:"absolute",scrollBar:!0,speed:250,transition:"fadeIn",transitionClose:!1,zIndex:9997}})(jQuery);
  
  /*! ddslick v2 http://designwithpc.com/Plugins/ddSlick, MIT Licensed */
(function (a) { function g(a, b) { var c = a.data("ddslick"); var d = a.find(".dd-selected"), e = d.siblings(".dd-selected-value"), f = a.find(".dd-options"), g = d.siblings(".dd-pointer"), h = a.find(".dd-option").eq(b), k = h.closest("li"), l = c.settings, m = c.settings.data[b]; a.find(".dd-option").removeClass("dd-option-selected"); h.addClass("dd-option-selected"); c.selectedIndex = b; c.selectedItem = k; c.selectedData = m; if (l.showSelectedHTML) { d.html((m.imageSrc ? '<img class="dd-selected-image' + (l.imagePosition == "right" ? " dd-image-right" : "") + '" src="' + m.imageSrc + '" />' : "") + (m.text ? '<label class="dd-selected-text">' + m.text + "</label>" : "") + (m.description ? '<small class="dd-selected-description dd-desc' + (l.truncateDescription ? " dd-selected-description-truncated" : "") + '" >' + m.description + "</small>" : "")) } else d.html(m.text); e.val(m.value); c.original.val(m.value); a.data("ddslick", c); i(a); /* j(a); */ if (typeof l.onSelected == "function") { l.onSelected.call(this, c) } } function h(b) { var c = b.find(".dd-select"), d = c.siblings(".dd-options"), e = c.find(".dd-pointer"), f = d.is(":visible"); a(".dd-click-off-close").not(d).slideUp(50); a(".dd-pointer").removeClass("dd-pointer-up"); if (f) { d.slideUp("fast"); e.removeClass("dd-pointer-up") } else { d.slideDown("fast"); e.addClass("dd-pointer-up") } k(b) } function i(a) { a.find(".dd-options").slideUp(50); a.find(".dd-pointer").removeClass("dd-pointer-up").removeClass("dd-pointer-up") } function j(a) { var b = a.find(".dd-select").css("height"); var c = a.find(".dd-selected-description"); var d = a.find(".dd-selected-image"); if (c.length <= 0 && d.length > 0) { a.find(".dd-selected-text").css("lineHeight", b) } } function k(b) { b.find(".dd-option").each(function () { var c = a(this); var d = c.css("height"); var e = c.find(".dd-option-description"); var f = b.find(".dd-option-image"); if (e.length <= 0 && f.length > 0) { c.find(".dd-option-text").css("lineHeight", d) } }) } a.fn.ddslick = function (c) { if (b[c]) { return b[c].apply(this, Array.prototype.slice.call(arguments, 1)) } else if (typeof c === "object" || !c) { return b.init.apply(this, arguments) } else { a.error("Method " + c + " does not exists.") } }; var b = {}, c = { data: [], keepJSONItemsOnTop: false, width: 260, height: null, background: "#eee", selectText: "", defaultSelectedIndex: null, truncateDescription: true, imagePosition: "left", showSelectedHTML: true, clickOffToClose: true, onSelected: function () { } }, d = '<div class="dd-select"><input class="dd-selected-value" type="hidden" /><a class="dd-selected"></a><span class="dd-pointer dd-pointer-down"></span></div>', e = '<ul class="dd-options"></ul>', f = '<style id="css-ddslick" type="text/css">' + ".dd-select{ border-radius:2px; border:solid 1px #ccc; position:relative; cursor:pointer;}" + ".dd-desc { color:#aaa; display:block; overflow: hidden; font-weight:normal; line-height: 1.4em; }" + ".dd-selected{ overflow:hidden; display:block; padding:5px; font-weight:bold;}" + ".dd-pointer{ width:0; height:0; position:absolute; right:10px; top:50%; margin-top:-3px;}" + ".dd-pointer-down{ border:solid 5px transparent; border-top:solid 5px #000; }" + ".dd-pointer-up{border:solid 5px transparent !important; border-bottom:solid 5px #000 !important; margin-top:-8px;}" + ".dd-options{ border:solid 1px #ccc; border-top:none; list-style:none; box-shadow:0px 1px 5px #ddd; display:none; position:absolute; z-index:2000; margin:0; padding:0;background:#fff; overflow:auto;}" + ".dd-option{ padding:5px; display:block; border-bottom:solid 1px #ddd; overflow:hidden; text-decoration:none; color:#333; cursor:pointer;-webkit-transition: all 0.25s ease-in-out; -moz-transition: all 0.25s ease-in-out;-o-transition: all 0.25s ease-in-out;-ms-transition: all 0.25s ease-in-out; }" + ".dd-options > li:last-child > .dd-option{ border-bottom:none;}" + ".dd-option:hover{ background:#f3f3f3; color:#000;}" + ".dd-selected-description-truncated { text-overflow: ellipsis; white-space:nowrap; }" + ".dd-option-selected { background:#f6f6f6; }" + ".dd-option-image, .dd-selected-image { vertical-align:middle; float:left; margin-right:5px; max-width:64px;}" + ".dd-image-right { float:right; margin-right:15px; margin-left:5px;}" + ".dd-container{ position:relative;}​ .dd-selected-text { font-weight:bold}​</style>"; if (a("#css-ddslick").length <= 0) { a(f).appendTo("head") } b.init = function (b) { var b = a.extend({}, c, b); return this.each(function () { var c = a(this), f = c.data("ddslick"); if (!f) { var i = [], j = b.data; c.find("option").each(function () { var b = a(this), c = b.data(); i.push({ text: a.trim(b.text()), value: b.val(), selected: b.is(":selected"), description: c.description, imageSrc: c.imagesrc }) }); if (b.keepJSONItemsOnTop) a.merge(b.data, i); else b.data = a.merge(i, b.data); var k = c, l = a('<div id="' + c.attr("id") + '"></div>'); c.replaceWith(l); c = l; c.addClass("dd-container").append(d).append(e); var i = c.find(".dd-select"), m = c.find(".dd-options"); m.css({ width: b.width }); i.css({ width: b.width, background: b.background }); c.css({ width: b.width }); if (b.height != null) m.css({ height: b.height, overflow: "auto" }); a.each(b.data, function (a, c) { if (c.selected) b.defaultSelectedIndex = a; m.append("<li>" + '<a class="dd-option">' + (c.value ? ' <input class="dd-option-value" type="hidden" value="' + c.value + '" />' : "") + (c.imageSrc ? ' <img class="dd-option-image' + (b.imagePosition == "right" ? " dd-image-right" : "") + '" src="' + c.imageSrc + '" />' : "") + (c.text ? ' <label class="dd-option-text">' + c.text + "</label>" : "") + (c.description ? ' <small class="dd-option-description dd-desc">' + c.description + "</small>" : "") + "</a>" + "</li>") }); var n = { settings: b, original: k, selectedIndex: -1, selectedItem: null, selectedData: null }; c.data("ddslick", n); if (b.selectText.length > 0 && b.defaultSelectedIndex == null) { c.find(".dd-selected").html(b.selectText) } else { var o = b.defaultSelectedIndex != null && b.defaultSelectedIndex >= 0 && b.defaultSelectedIndex < b.data.length ? b.defaultSelectedIndex : 0; g(c, o) } c.find(".dd-select").on("click.ddslick", function () { h(c) }); c.find(".dd-option").on("click.ddslick", function () { g(c, a(this).closest("li").index()) }); if (b.clickOffToClose) { m.addClass("dd-click-off-close"); c.on("click.ddslick", function (a) { a.stopPropagation() }); a("body").on("click", function () { a(".dd-click-off-close").slideUp(50).siblings(".dd-select").find(".dd-pointer").removeClass("dd-pointer-up") }) } } }) }; b.select = function (b) { return this.each(function () { if (b.index) g(a(this), b.index) }) }; b.open = function () { return this.each(function () { var b = a(this), c = b.data("ddslick"); if (c) h(b) }) }; b.close = function () { return this.each(function () { var b = a(this), c = b.data("ddslick"); if (c) i(b) }) }; b.destroy = function () { return this.each(function () { var b = a(this), c = b.data("ddslick"); if (c) { var d = c.original; b.removeData("ddslick").unbind(".ddslick").replaceWith(d) } }) } })(jQuery)