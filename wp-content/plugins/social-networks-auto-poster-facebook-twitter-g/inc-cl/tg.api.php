<?php

//## NextScripts FriendFeed Connection Class
$nxs_snapAPINts[] = array('code'=>'TG', 'lcode'=>'tg', 'name'=>'Pinterest');

if (!class_exists("nxs_class_SNAP_TG")) { class nxs_class_SNAP_TG {
	
	var $ntCode = 'TG';
	var $ntLCode = 'tg';     
	
	function doPost($options, $message){ if (!is_array($options)) return false; $out = array();
	  foreach ($options as $ii=>$ntOpts) $out[$ii] = $this->doPostToNT($ntOpts, $message);
	  return $out;
	}    
	function nxs_getHeaders($ref, $post=false){ $hdrsArr = array(); 
	  $hdrsArr['X-Requested-With']='XMLHttpRequest'; $hdrsArr['Connection']='keep-alive'; $hdrsArr['Referer']=$ref;
	  $hdrsArr['User-Agent']='Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.22 Safari/537.11';
	  if($post) $hdrsArr['Content-Type']='application/x-www-form-urlencoded'; $hdrsArr['Accept']='application/json, text/javascript, */*; q=0.01'; 
	  $hdrsArr['Accept-Encoding']='gzip,deflate,sdch'; $hdrsArr['Accept-Language']='en-US,en;q=0.8'; $hdrsArr['Accept-Charset']='ISO-8859-1,utf-8;q=0.7,*;q=0.3'; return $hdrsArr;
	}
	function doPostToNT($options, $message){ global $nxs_gCookiesArr; $badOut = array('pgID'=>'', 'isPosted'=>0, 'pDate'=>date('Y-m-d H:i:s'), 'Error'=>'');
	  //## Check settings
	  if (!is_array($options)) { $badOut['Error'] = 'No Options'; return $badOut; } if (empty($options['botTkn'])) { $badOut['Error'] = 'Not Configured'; return $badOut; }
	  //## Format
	  if (!empty($message['pText'])) $msg = $message['pText']; else $msg = nxs_doFormatMsg($options['msgFormat'], $message);     
	  if (isset($message['imageURL'])) $imgURL = trim(nxs_getImgfrOpt($message['imageURL'], $options['imgSize'])); else $imgURL = ''; 
	  $urlToGo = (!empty($message['url']))?$message['url']:'';
	  
	  //$fields = array( 'chat_id' => $chatter,'photo' =>'@'. $photo. ';filename=' . $photo, 'caption' => $caption );
	  //$url = 'https://api.telegram.org/bot'.$token.'/sendPhoto';
	  
	  $msg = nsTrnc($msg , 3000); $url = 'https://api.telegram.org/bot'.$options['botTkn'].'/sendMessage';
	  $flds = array('chat_id' => $options['whToPost'], 'text' => $msg, 'parse_mode' => 'Markdown', 'disable_web_page_preview' => false); $hdrsArr = $this->nxs_getHeaders('https://api.telegram.org', true);
	  $advSet = nxs_mkRemOptsArr($hdrsArr, '', $flds); $ret = wp_remote_post( $url, $advSet); if (is_nxs_error($ret)) {  $badOut = print_r($ret, true)." - ERROR"; return $badOut; }       
	  $contents = $ret['body']; $resp = json_decode($contents, true);	//  prr($resp);
	  if (is_array($resp) && !empty($resp['ok']) && $resp['ok'] == 1 ) return array('postID'=>$resp['result']['message_id'], 'isPosted'=>1, 'postURL'=>'http://telegram.me/'.$resp['result']['chat']['username'], 'pDate'=>date('Y-m-d H:i:s'));  
		else $badOut['Error'] .= 'Something went wrong - '.print_r($ret, true); 
	  return $badOut;      
   }    
}}

?>