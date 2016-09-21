<?php
/**
 * WordPress の基本設定
 *
 * このファイルは、インストール時に wp-config.php 作成ウィザードが利用します。
 * ウィザードを介さずにこのファイルを "wp-config.php" という名前でコピーして
 * 直接編集して値を入力してもかまいません。
 *
 * このファイルは、以下の設定を含みます。
 *
 * * MySQL 設定
 * * 秘密鍵
 * * データベーステーブル接頭辞
 * * ABSPATH
 *
 * @link http://wpdocs.sourceforge.jp/wp-config.php_%E3%81%AE%E7%B7%A8%E9%9B%86
 *
 * @package WordPress
 */

// 注意: 
// Windows の "メモ帳" でこのファイルを編集しないでください !
// 問題なく使えるテキストエディタ
// (http://wpdocs.sourceforge.jp/Codex:%E8%AB%87%E8%A9%B1%E5%AE%A4 参照)
// を使用し、必ず UTF-8 の BOM なし (UTF-8N) で保存してください。

// ** MySQL 設定 - この情報はホスティング先から入手してください。 ** //
/** WordPress のためのデータベース名 */
define('DB_NAME', $_ENV['JAFA_ENV_MYSQL_USER']);



/** MySQL データベースのユーザー名 */
define('DB_USER', $_ENV['JAFA_ENV_MYSQL_DATABASE']);

/** MySQL データベースのパスワード */
define('DB_PASSWORD', $_ENV['JAFA_ENV_MYSQL_PASSWORD']);

/** MySQL のホスト名 */
define('DB_HOST', $_ENV['JAFA_PORT_3306_TCP_ADDR']);

/** データベースのテーブルを作成する際のデータベースの文字セット */
define('DB_CHARSET', 'utf8');

/** データベースの照合順序 (ほとんどの場合変更する必要はありません) */
define('DB_COLLATE', '');

/**#@+
 * 認証用ユニークキー
 *
 * それぞれを異なるユニーク (一意) な文字列に変更してください。
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org の秘密鍵サービス} で自動生成することもできます。
 * 後でいつでも変更して、既存のすべての cookie を無効にできます。これにより、すべてのユーザーを強制的に再ログインさせることになります。
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'e%o+Hd!8eGT#;[;FuO3?JQj)?3/2[4w.+})]((*XjOo~Xpg@gZx9~-L>41NY]+ 5');
define('SECURE_AUTH_KEY',  'kQ`eU-` [CpRtmsgf~t||:|S,D7Zq XP5`vsW5S[xm}PZR7M,F#g]9JS$?~nVJMs');
define('LOGGED_IN_KEY',    'ELLYmd7T-{)IvhKbsla;em13rE{.R-cQe$+X|5a*|=q$y:=*X~.+Ur|Va[==zS*L');
define('NONCE_KEY',        'DLBZ*[wRf;zUWO_3^kL)--aC2dYs*=i-d& V_2-Ia0vQ6@ EMwx}4O.EKUd|/|dL');
define('AUTH_SALT',        'F#9[fG&6GQ:*s9CGk>iR<+nLG_:3172,t@ %J.UhmK3s+egf.F;?kbpvQ$-C$<_~');
define('SECURE_AUTH_SALT', '!!KDr&XCy.xh9NmVBuvi3E`v+dJai7{)v-Gc0[S_(gg=y?u7R@xj-/r?{!NKb.^h');
define('LOGGED_IN_SALT',   '<y/AR@REE-!|dK;M)MZ(r/O-M?tB|X;EKEoBS5nZPQS0WZ^rkZl!m^IzoS-|~k^3');
define('NONCE_SALT',       'Q`>]s(R<k.A[[17s5PD{PGKKsogiiRv]4ia%Cp=yu:HV7=BU$4%DbU#o4UFS,nzZ');

/**#@-*/

/**
 * WordPress データベーステーブルの接頭辞
 *
 * それぞれにユニーク (一意) な接頭辞を与えることで一つのデータベースに複数の WordPress を
 * インストールすることができます。半角英数字と下線のみを使用してください。
 */
$table_prefix  = 'jafa_';

/**
 * 開発者へ: WordPress デバッグモード
 *
 * この値を true にすると、開発中に注意 (notice) を表示します。
 * テーマおよびプラグインの開発者には、その開発環境においてこの WP_DEBUG を使用することを強く推奨します。
 *
 * その他のデバッグに利用できる定数については Codex をご覧ください。
 *
 * @link http://wpdocs.osdn.jp/WordPress%E3%81%A7%E3%81%AE%E3%83%87%E3%83%90%E3%83%83%E3%82%B0
 */
define('WP_DEBUG', false);

/* 編集が必要なのはここまでです ! WordPress でブログをお楽しみください。 */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
