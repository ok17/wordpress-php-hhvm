(function ($) {

	/* Click */
	$("input:button[name=wptc-update]").click(function(){

		var Data = $("#wptc-form").serializeArray();
		var result = 0;

		for (i=0; i<Data.length; i++) {

			if (Data[i].name === "cat") {
				wptcSearch.cat = Data[i].value;
			} else if (Data[i].name === "tag") {
				wptcSearch.tag = Data[i].value;
			} else if (Data[i].name === "force") {
				wptcSearch.force = Data[i].value;
			} else if (Data[i].name === "thumbnail") {
				wptcSearch.thumbnail = Data[i].value;
			}

		}

		if (wptcSearch.thumbnail === "") {
			$("input:text[name=thumbnail]").css("border", "2px solid #ff6347");
			wptcResultMsg('画像を選択してください', 'red');
		} else {
			$("input:text[name=thumbnail]").css("border", "");
			wptcResultMsg('');

			if (wptcConfirmDialog(wptcSearch)) {

				result = wptcUpdateRequest(wptcSearch);
				console.log(result);

			} else {
				wptcResultMsg('処理は中断されました', 'red');
				return false;
			}

			if (result.count > 0) {
				wptcResultMsg(result.count + ' 件更新しました');
			} else {
				wptcResultMsg('対象記事はありませんでした');
			}

		}

	});

	$("input:button[name=wptc-select]").click(function(e) {

		var custom_uploader;

		e.preventDefault();

		if (custom_uploader) {

			custom_uploader.open();
			return;

		}

		custom_uploader = wp.media({
			title: "画像を選択",
			library: {
				type: "image"
			},

			button: {
				text: "決定"
			},

			multiple: false

		});

		custom_uploader.on("select", function() {

			var images = custom_uploader.state().get("selection");

			images.each(function(file){

				$("input:text[name=thumbnail]").val("");
				$("#wptc-preview").empty();

				$("input:text[name=thumbnail]").val(file.id);
				$("#wptc-preview").append('<img src="'+file.attributes.sizes.thumbnail.url+'" />');

			});
		});

		custom_uploader.open();


	});

	$("input:button[name=wptc-clear]").click(function() {
		$("input:text[name=thumbnail]").val("");
		$("#wptc-preview").empty();
	});


	/* Select Box */
	$("#wptc-taxonomy-form select#category").change(function(){

		var term_id  = $(this).val();
		wptcSearch.term_id = term_id;

		var result = wptcAjaxRequest(wptcSearch);

		if (result !== false) {
			wptcDrawList(result);
		} else {
			wptcEmptyList();
		}

		return;

	});

	function wptcDrawList(result) {

		var id = '#' + result.taxonomy;

		$(id).empty();
		$(id).append($('<option>').html('すべてのタグ').val(''));

		for (i = 0; i < result.term.length; i++) {
			var str = result.term[i].name + '  (' + result.term[i].count + ')';
			$(id).append($('<option>').html(str).val(result.term[i].id));
		}

		return;

	}

	function wptcEmptyList() {

		$("#post_tag").empty();
		$("#post_tag").append($('<option>').html('すべてのタグ').val(''));

		return;

	}

	/* Ajax */
	function wptcAjaxRequest(param) {

		var result = false;

		$.ajax({
			type    : "POST",
			url     : param.url,
			dataType: "json",
			async   : false,
			data    : {
					action  : param.action1,
					token   : param.token,
					term_id : param.term_id
			},

		}).done(function(callback){

			if ( callback != null && callback.status == 'OK' ) {
				result = callback;
			}

		}).fail(function(XMLHttpRequest, textStatus, errorThrown){

				console.log(XMLHttpRequest);
				console.log(textStatus);
				console.log(errorThrown);

		});

		return result;

	}

	function wptcUpdateRequest(param) {

		var result = false;

		$.ajax({
			type    : "POST",
			url     : param.url,
			dataType: "json",
			async   : false,
			data    : {
					action    : param.action2,
					token     : param.token,
					cat       : param.cat,
					tag       : param.tag,
					force     : param.force,
					thumbnail : param.thumbnail
			},

		}).done(function(callback){

			if ( callback != null && callback.status == 'OK' ) {
				result = callback;
			}

		}).fail(function(XMLHttpRequest, textStatus, errorThrown){

				console.log(XMLHttpRequest);
				console.log(textStatus);
				console.log(errorThrown);

		});

		return result;

	}

	function wptcConfirmDialog(param) {

		var result = true;

		if (param.cat == 0 && param.tag == 0 && param.force == 1) {
			if (!confirm("全投稿のアイキャッチ画像を強制更新します。よろしいですか？")) {
				result = false;
			}
		} else if (param.cat == 0 && param.tag == 0) {
			if (!confirm("アイキャッチ画像が未設定の全投稿を更新します。よろしいですか？")) {
				result = false;
			}
		}

		return result;

	}

	function wptcResultMsg(msg, color) {

		if (typeof color === "undefined") {
			color = "green";
		}

		$("span.info").empty();
		$("span.info").append(msg).css("color", color);

		return;

	}

})(jQuery);
