<?php

function wptc_taxonomy_form() {

	$cat_args = array(
		'show_count'      => true,
		'echo'            => false,
		'id'              => 'category',
		'name'            => 'cat',
		'orderby'         => 'count',
		'order'           => 'DESC',
		'taxonomy'        => 'category',
		'show_option_all' => 'すべてのカテゴリ'
	);

	$tag_args = array(
		'orderby'         => 'count',
		'order'           => 'DESC'
	);

	$tags = get_tags( $tag_args );

	$form  = "<div id='wptc-taxonomy-form'>\n";

	$form .= wp_dropdown_categories( $cat_args ) . "\n";

	$form .= "<select id='post_tag' name='tag'>\n";
	$form .= "<option value='0'>すべてのタグ</option>\n";
	foreach ( $tags as $value ) {

		$opt_val = esc_attr( $value->slug );
		$opt_str = esc_attr( $value->name . " (" . $value->count . ")" );

		$form .= "<option value='$opt_val'>$opt_str</option>\n";

	}

	$form .= "</select>\n";
	$form .= "</div>\n";

	return $form;

}

function wptc_taxonomy() {

	$json = array(
		'status' => 'NG',
		'term'   => array()
	);

	$nonce_key = get_option( 'wptc_nonce_key' );

	header( 'Content-Type: application/json; charset=UTF-8' );

	if ( wp_verify_nonce( $_POST['token'], $nonce_key ) && isset( $_POST['term_id'] ) ) {

		if ( $_POST['term_id'] === 'all' ) {

			$tag_args = array(
				'orderby' => 'count',
				'order'   => 'DESC'
			);

			$tags = get_tags( $tag_args );

			foreach ( $tags as $value ) {

				if ( ! isset( $json['taxonomy'] ) ) { 
					$json['taxonomy'] = $value->taxonomy;
				}

				$term_info = array(
					'id'    => $value->term_id,
					'name'  => $value->name,
					'slug'  => $value->slug,
					'count' => $value->count
				);

				array_push( $json['term'], $term_info );
			}


		} else {

			$json = wptc_get_relation_taxonomy( $_POST['term_id'] );

		}

		if ( $json['taxonomy'] ) {

			$json['status'] = 'OK';

		}

	}

	echo json_encode( $json );

	die();

}
add_action( 'wp_ajax_wptc_taxonomy', 'wptc_taxonomy' );

function wptc_postlist() {

	$json = array(
		'status' => 'NG',
		'count'  => 0
	);

	$nonce_key = get_option( 'wptc_nonce_key' );

	header( 'Content-Type: application/json; charset=UTF-8' );

	if ( wp_verify_nonce( $_POST['token'], $nonce_key ) ) {

		$cat       = $_POST['cat'];
		$tag       = $_POST['tag'];
		$force     = $_POST['force'];
		$thumbnail = $_POST['thumbnail'];

		$args = array(
			'nopaging'            => 1,
			'ignore_sticky_posts' => 1,
			'orderby'             => 'ASK',
		);


		if ( $cat && $tag ) {

			$args['tax_query'] = array(
				'relation' => 'AND',
				array(
					'taxonomy' => 'category',
					'terms'    => $cat,
					'field'    => 'id',
					'operator' => 'AND'
				),
				array(
					'taxonomy' => 'post_tag',
					'terms'    => $tag,
					'field'    => 'id',
					'operator' => 'AND'
				)
			);

		} else if ( $cat && ! $tag ) {

			$args['tax_query'] = array(
				'relation' => 'AND',
				array(
					'taxonomy' => 'category',
					'terms'    => $cat,
					'field'    => 'id',
					'operator' => 'AND'
				)
			);

		} else if ( ! $cat && $tag ) {

			$tax_query = array(
				'relation' => 'AND',
				array(
					'taxonomy' => 'post_tag',
					'terms'    => $tag,
					'field'    => 'id',
					'operator' => 'AND'
				)
			);

		}

		$my_query = new WP_Query( $args );

		if( $my_query->have_posts() ) {

			while ( $my_query->have_posts() ) : $my_query->the_post();

				global $post;

				if ( ! $force && ! has_post_thumbnail() || $force ) {

					update_post_meta( $post->ID, '_thumbnail_id', $thumbnail );
					$json['count']++;

				}

			endwhile;

			wp_reset_query();

		}

		if ( 0 < $json['count'] ) {
			$json['status'] = 'OK';
		}
	}

	echo json_encode( $json );

	die();

}
add_action( 'wp_ajax_wptc_postlist', 'wptc_postlist' );

function wptc_get_relation_taxonomy( $term_id = false ) {

	$term_ids = array(
		'term'     => array(),
		'taxonomy' => false
	);

	if ( $term_id === false ) {
		return $term_ids;
	}

	$taxonomy = get_terms(
			array(
				'category',
				'post_tag'
			),
			array(
				'hide_empty' => true,
				'include'    => $term_id
			)
	);

	$taxonomy = $taxonomy[0]->taxonomy;

	if ( ! is_null( $taxonomy ) ) {

		$args = array(
			'nopaging'            => 1,
			'ignore_sticky_posts' => 1,
			'order'               => 'ASK',
			'tax_query'           => array( 
				array(
					'taxonomy' => $taxonomy,
					'terms'    => $term_id,
					'field'    => 'id',
					'operator' => 'AND'
				 )
			)
		);

		$my_query = new WP_Query( $args );

		if( $my_query->have_posts() ) {

			if ( $taxonomy === 'category' ) {
				$taxonomy = 'post_tag';
			} else {
				$taxonomy = 'category';
			}

			while ( $my_query->have_posts() ) : $my_query->the_post();

				$term = get_the_terms( get_the_ID(), $taxonomy );

				if ( $term ) {

					foreach ( $term as $value ) {

						if ( ! isset( $term_ids['term'][$value->term_id] ) ) {

							$term_info = array(
								'id'   => $value->term_id,
								'name' => $value->name,
								'slug' => $value->slug,
							);

							$term_ids['term'][$value->term_id] = $term_info;

						}

						$term_ids['term'][$value->term_id]['count'] += 1;

					}

				}

			endwhile;

			wp_reset_query();

		}

		if ( $term_ids['term'] ) {

			$term_ids['term'] = array_merge( $term_ids['term'] );

			foreach ( $term_ids['term'] as $key => $value ) {
				$key_id[$key] = $value['count'];
			}
			array_multisort( $key_id, SORT_DESC, $term_ids['term'] );

			$term_ids['taxonomy'] = $taxonomy;

		}

	}

	return $term_ids;

}
?>
