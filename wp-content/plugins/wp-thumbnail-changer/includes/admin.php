<?php

//class wptc_setting {
class wp_thumbnail_changer_setting {

	function __construct() {

		add_action( 'admin_menu', array( $this, 'add_pages' ) );
	}

	function add_pages() {

		add_menu_page(

			'画像一括変更',
			'画像一括変更',
			'level_8',
			__FILE__,
			array( $this, 'wptc_option_page' ),
			''
		);

	}

	function wptc_option_page() {

		?>
		<div class="wrap">
		<div id="icon-options-general" class="icon32"></div>
		<h2>WP Thumbnail Changer</h2>
		<h3>アイキャッチ画像の一括更新プラグイン</h3>
		<form id="wptc-form" action="" method="post">

		<table class="form-table">
			<tr valign="top">
				<th scope="row">
					<label for="inputtext">更新記事の範囲指定</label>
				</th>
				<td>
					<?php echo wptc_taxonomy_form(); ?>
					<p>* 投稿に設定されたカテゴリ、またはタグから範囲指定</p>
				</td>
			</tr>
			<tr valign="top">
				<th scope="row">
					<label for="inputtext">設定済みの画像の処理</label>
				</th>
				<td>
					<input type="radio" name="force" value="0" checked /> 上書きしない
					<input type="radio" name="force" value="1" /> 上書きする
				</td>
			</tr>
			<tr valign="top">
				<th scope="row">
					<label for="inputtext">アイキャッチ画像の選択</label>
				</th>
				<td>
					<input name="thumbnail" type="text" value="" readonly/>
					<input class="button-primary" type="button" name="wptc-select" value="選択" />
					<input class="button-primary" type="button" name="wptc-clear" value="クリア" />
					<div id="wptc-preview">
					<?php if ( $media ) { echo wp_get_attachment_image( $media, 'thumbnail' ); } ?>
					</div>
				</td>
			</tr>
			<tr valign="top">
				<th scope="row">
					<label for="inputtext">処理結果</label>
				</th>
				<td>
					<span class="info" style="font-weight:bold;">ここに処理結果が表示されます</span>
				</td>
			</tr>
		</table>

		<p class="submit">
			<input type="button" name="wptc-update" class="button-primary" value="一括更新" />
		</p>
		</form>
		</div><!-- .wrap -->

	<?php
	}
}

?>
