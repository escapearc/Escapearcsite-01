<?php
/**
 * EscapeArc theme bootstrap.
 *
 * @package EscapeArc_Theme
 */

if (! defined('ESCAPEARC_THEME_VERSION')) {
	define('ESCAPEARC_THEME_VERSION', '1.0.0');
}

function escapearc_asset_version($relative_path) {
	$file_path = get_template_directory() . $relative_path;

	return file_exists($file_path) ? (string) filemtime($file_path) : ESCAPEARC_THEME_VERSION;
}

function escapearc_setup_theme() {
	add_theme_support('title-tag');
	add_theme_support('post-thumbnails');
	add_theme_support(
		'html5',
		array(
			'search-form',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	register_nav_menus(
		array(
			'primary' => __('Primary Navigation', 'escapearc-theme'),
			'footer'  => __('Footer Navigation', 'escapearc-theme'),
		)
	);
}
add_action('after_setup_theme', 'escapearc_setup_theme');

function escapearc_enqueue_assets() {
	wp_enqueue_style(
		'escapearc-site',
		get_template_directory_uri() . '/assets/css/site.css',
		array(),
		escapearc_asset_version('/assets/css/site.css')
	);

	wp_enqueue_style(
		'escapearc-theme',
		get_stylesheet_uri(),
		array('escapearc-site'),
		escapearc_asset_version('/style.css')
	);

	wp_enqueue_script(
		'escapearc-theme',
		get_template_directory_uri() . '/assets/js/theme.js',
		array(),
		escapearc_asset_version('/assets/js/theme.js'),
		true
	);

	wp_localize_script(
		'escapearc-theme',
		'escapearcTheme',
		array(
			'bookingStatus' => isset($_GET['booking']) ? sanitize_key(wp_unslash($_GET['booking'])) : '',
			'labels'        => array(
				'success' => __('Booking inquiry received. The EscapeArc team will reach out shortly.', 'escapearc-theme'),
				'missing' => __('Please fill in your name, phone number, and preferred travel month.', 'escapearc-theme'),
				'error'   => __('We could not submit your booking inquiry right now. Please try again.', 'escapearc-theme'),
			),
		)
	);
}
add_action('wp_enqueue_scripts', 'escapearc_enqueue_assets');

function escapearc_register_post_types() {
	register_post_type(
		'expedition',
		array(
			'labels'       => array(
				'name'          => __('Expeditions', 'escapearc-theme'),
				'singular_name' => __('Expedition', 'escapearc-theme'),
				'add_new_item'  => __('Add Expedition', 'escapearc-theme'),
				'edit_item'     => __('Edit Expedition', 'escapearc-theme'),
			),
			'public'       => true,
			'show_in_rest' => true,
			'has_archive'  => true,
			'rewrite'      => array('slug' => 'expeditions'),
			'menu_icon'    => 'dashicons-location-alt',
			'supports'     => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'),
		)
	);

	register_post_type(
		'stay',
		array(
			'labels'       => array(
				'name'          => __('Stays', 'escapearc-theme'),
				'singular_name' => __('Stay', 'escapearc-theme'),
				'add_new_item'  => __('Add Stay', 'escapearc-theme'),
				'edit_item'     => __('Edit Stay', 'escapearc-theme'),
			),
			'public'       => true,
			'show_in_rest' => true,
			'has_archive'  => true,
			'rewrite'      => array('slug' => 'stays'),
			'menu_icon'    => 'dashicons-admin-home',
			'supports'     => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'),
		)
	);

	register_post_type(
		'booking_inquiry',
		array(
			'labels'              => array(
				'name'          => __('Booking Inquiries', 'escapearc-theme'),
				'singular_name' => __('Booking Inquiry', 'escapearc-theme'),
				'add_new_item'  => __('Add Booking Inquiry', 'escapearc-theme'),
				'edit_item'     => __('Edit Booking Inquiry', 'escapearc-theme'),
			),
			'public'              => false,
			'publicly_queryable'  => false,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'show_in_rest'        => true,
			'exclude_from_search' => true,
			'menu_icon'           => 'dashicons-clipboard',
			'supports'            => array('title', 'custom-fields'),
		)
	);
}
add_action('init', 'escapearc_register_post_types');

function escapearc_register_options_page() {
	if (! function_exists('acf_add_options_page')) {
		return;
	}

	acf_add_options_page(
		array(
			'page_title' => __('EscapeArc Options', 'escapearc-theme'),
			'menu_title' => __('EscapeArc Options', 'escapearc-theme'),
			'menu_slug'  => 'escapearc-options',
			'capability' => 'edit_posts',
			'redirect'   => false,
		)
	);
}
add_action('acf/init', 'escapearc_register_options_page');

function escapearc_get_value($field, $post_id = 0, $default = '') {
	$post_id = $post_id ?: get_the_ID();

	if (function_exists('get_field')) {
		$value = get_field($field, $post_id);
		if ($value !== null && $value !== '' && $value !== array()) {
			return $value;
		}
	}

	$value = get_post_meta($post_id, $field, true);

	return ($value !== '' && $value !== null) ? $value : $default;
}

function escapearc_get_option_value($field, $default = '') {
	if (function_exists('get_field')) {
		$value = get_field($field, 'option');
		if ($value !== null && $value !== '' && $value !== array()) {
			return $value;
		}
	}

	return $default;
}

function escapearc_normalize_list($value) {
	if (is_array($value)) {
		return array_values(array_filter(array_map('trim', $value)));
	}

	if (! is_string($value) || '' === trim($value)) {
		return array();
	}

	$lines = preg_split('/\r\n|\r|\n|,/', $value);

	return array_values(array_filter(array_map('trim', $lines)));
}

function escapearc_collect_meta_values($post_type, $field) {
	$post_ids = get_posts(
		array(
			'post_type'      => $post_type,
			'posts_per_page' => -1,
			'fields'         => 'ids',
			'post_status'    => 'publish',
			'no_found_rows'  => true,
		)
	);

	$values = array();

	foreach ($post_ids as $post_id) {
		foreach (escapearc_normalize_list(escapearc_get_value($field, $post_id)) as $item) {
			$values[] = $item;
		}
	}

	$values = array_values(array_unique($values));
	natcasesort($values);

	return array_values($values);
}

function escapearc_format_price($price) {
	if ($price === '' || $price === null) {
		return __('Price on request', 'escapearc-theme');
	}

	if (is_numeric($price)) {
		return sprintf(
			/* translators: %s is a formatted Indian Rupee amount. */
			__('Rs %s', 'escapearc-theme'),
			number_format_i18n((float) $price)
		);
	}

	return (string) $price;
}

function escapearc_page_url($slug) {
	$page = get_page_by_path($slug);

	return $page ? get_permalink($page) : home_url('/' . trim($slug, '/') . '/');
}

function escapearc_whatsapp_url($number) {
	$digits = preg_replace('/\D+/', '', (string) $number);

	return $digits ? 'https://wa.me/' . $digits : home_url('/');
}

function escapearc_card_thumb_background($post_id = 0) {
	$post_id = $post_id ?: get_the_ID();
	$image   = get_the_post_thumbnail_url($post_id, 'large');
	$base    = "linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.58)),radial-gradient(circle at 30% 20%,rgba(244,193,74,.18),transparent 25%),linear-gradient(135deg,#18231c,#0c110d)";

	if (! $image) {
		return $base;
	}

	return $base . ",url('" . esc_url_raw($image) . "')";
}

function escapearc_filter_stay_archive($query) {
	if (is_admin() || ! $query->is_main_query() || ! $query->is_post_type_archive('stay')) {
		return;
	}

	$meta_query = array();

	if (! empty($_GET['stay_location'])) {
		$meta_query[] = array(
			'key'     => 'location',
			'value'   => sanitize_text_field(wp_unslash($_GET['stay_location'])),
			'compare' => 'LIKE',
		);
	}

	if (! empty($_GET['stay_type'])) {
		$meta_query[] = array(
			'key'     => 'stay_type',
			'value'   => sanitize_text_field(wp_unslash($_GET['stay_type'])),
			'compare' => 'LIKE',
		);
	}

	if ($meta_query) {
		$query->set('meta_query', $meta_query);
	}
}
add_action('pre_get_posts', 'escapearc_filter_stay_archive');

function escapearc_handle_booking_inquiry() {
	$redirect = wp_get_referer() ? wp_get_referer() : home_url('/');

	if (
		empty($_POST['escapearc_booking_nonce']) ||
		! wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['escapearc_booking_nonce'])), 'escapearc_booking_inquiry')
	) {
		wp_safe_redirect(add_query_arg('booking', 'error', remove_query_arg('booking', $redirect)));
		exit;
	}

	$name            = sanitize_text_field(wp_unslash($_POST['name'] ?? ''));
	$phone           = sanitize_text_field(wp_unslash($_POST['phone'] ?? ''));
	$email           = sanitize_email(wp_unslash($_POST['email'] ?? ''));
	$expedition_id   = absint($_POST['expedition_id'] ?? 0);
	$travel_month    = sanitize_text_field(wp_unslash($_POST['travel_month'] ?? ''));
	$group_size      = max(1, absint($_POST['group_size'] ?? 1));
	$notes           = sanitize_textarea_field(wp_unslash($_POST['notes'] ?? ''));
	$source_page     = sanitize_text_field(wp_unslash($_POST['source_page'] ?? ''));
	$source_cta      = sanitize_text_field(wp_unslash($_POST['source_cta'] ?? 'site'));
	$status          = sanitize_text_field(wp_unslash($_POST['status'] ?? 'new'));
	$expedition_name = $expedition_id ? get_the_title($expedition_id) : sanitize_text_field(wp_unslash($_POST['expedition_label'] ?? ''));

	if (! $name || ! $phone || ! $travel_month) {
		wp_safe_redirect(add_query_arg('booking', 'missing', remove_query_arg('booking', $redirect)));
		exit;
	}

	$post_id = wp_insert_post(
		array(
			'post_type'   => 'booking_inquiry',
			'post_status' => 'private',
			'post_title'  => sprintf(
				/* translators: 1: customer name, 2: expedition label. */
				__('%1$s - %2$s', 'escapearc-theme'),
				$name,
				$expedition_name ? $expedition_name : __('General inquiry', 'escapearc-theme')
			),
		),
		true
	);

	if (is_wp_error($post_id)) {
		wp_safe_redirect(add_query_arg('booking', 'error', remove_query_arg('booking', $redirect)));
		exit;
	}

	$meta = array(
		'name'           => $name,
		'phone'          => $phone,
		'email'          => $email,
		'expedition'     => $expedition_name,
		'expedition_id'  => $expedition_id,
		'travel_month'   => $travel_month,
		'group_size'     => $group_size,
		'notes'          => $notes,
		'source_page'    => $source_page,
		'source_cta'     => $source_cta,
		'status'         => $status ? $status : 'new',
		'submitted_from' => $redirect,
	);

	foreach ($meta as $key => $value) {
		update_post_meta($post_id, $key, $value);
	}

	wp_safe_redirect(add_query_arg('booking', 'success', remove_query_arg('booking', $redirect)));
	exit;
}
add_action('admin_post_nopriv_escapearc_booking_inquiry', 'escapearc_handle_booking_inquiry');
add_action('admin_post_escapearc_booking_inquiry', 'escapearc_handle_booking_inquiry');

/* ── MERCH / STREETWEAR CPT ── */
add_action('init', function() {
    register_post_type('merch_item', [
        'labels'      => ['name' => 'Merch Items', 'singular_name' => 'Merch Item'],
        'public'      => true,
        'has_archive' => true,
        'menu_icon'   => 'dashicons-store',
        'supports'    => ['title', 'editor', 'thumbnail', 'custom-fields'],
        'rewrite'     => ['slug' => 'merch'],
    ]);
});

