<?php

function wptc_admin_enqueue( $hook_suffix ) {

	$hook_page = 'toplevel_page_wp-thumbnail-changer/includes/admin';

	if ( $hook_page === $hook_suffix ) {

		$handle = 'wptc-function';
		$nonce_key = get_option( 'wptc_nonce_key' );

		wp_register_script(
			$handle,
			wptc_pulugin_url . 'js/function.js',
			array( 'jquery' ),
			'1.0',
			true
		);

		wp_localize_script(
			$handle,
			'wptcSearch',
			array(
				'url'    => admin_url( 'admin-ajax.php' ),
				'action1' => 'wptc_taxonomy',
				'action2' => 'wptc_postlist',
				'token'  => wp_create_nonce( $nonce_key )
			)
		);

		wp_enqueue_script( 'wptc-function' );
		wp_enqueue_media();

	}

}
add_action( 'admin_enqueue_scripts', 'wptc_admin_enqueue' );

?>
