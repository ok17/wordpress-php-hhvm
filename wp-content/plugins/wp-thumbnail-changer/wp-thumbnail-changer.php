<?php
/*
Plugin Name: WP Thumbnail Changer
Plugin URI: http://wg.drive.ne.jp/miura/archives/2853
Description: 投稿用アイキャッチ画像の一括変更プラグイン
Version: 1.0
Author: miura
Author URI: http://wg.drive.ne.jp/miura/
*/

if ( is_admin() ) {

	if ( ! defined( 'wptc_pulugin_dir' ) ) {
		define( 'wptc_pulugin_dir', dirname( __FILE__ ) );
	}

	if ( ! defined( 'wptc_pulugin_url' ) ) {
		define( 'wptc_pulugin_url', plugin_dir_url( __FILE__ ) );
	}

	require_once( wptc_pulugin_dir . '/includes/admin.php' );
	require_once( wptc_pulugin_dir . '/includes/wptc-enqueue.php' );
	require_once( wptc_pulugin_dir . '/includes/wptc-functions.php' );

	/* admin page */
	new wp_thumbnail_changer_setting;

	/* install */
	function wptc_activation_plugin() {

		if ( ! get_option( 'wptc_nonce_key' ) ) {
			$key =  md5( uniqid( rand(), 1 ) );
			update_option( 'wptc_nonce_key', $key );
		}

	}
	register_activation_hook( __FILE__, 'wptc_activation_plugin' );

	/* stop or uninstall */
	function wptc_uninstall_plugin() {

		if ( get_option( 'wptc_nonce_key' ) ) {
			delete_option( 'wptc_nonce_key' );
		}

	}
	register_deactivation_hook( __FILE__, 'wptc_uninstall_plugin' );
	register_uninstall_hook( __FILE__, 'wptc_uninstall_plugin' );

}

?>
