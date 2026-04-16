<?php
/**
 * Theme header.
 *
 * @package EscapeArc_Theme
 */

$expeditions_url = get_post_type_archive_link('expedition') ? get_post_type_archive_link('expedition') : home_url('/expeditions/');
$stays_url       = get_post_type_archive_link('stay') ? get_post_type_archive_link('stay') : home_url('/stays/');
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="loader">
	<div class="loader-logo">
		<img class="logo-gif" src="<?php echo esc_url(get_template_directory_uri() . '/assets/media/logo-loader.gif'); ?>" alt="<?php esc_attr_e('EscapeArc logo animation', 'escapearc-theme'); ?>">
	</div>
	<div id="loadingText"><?php esc_html_e('Loading route map...', 'escapearc-theme'); ?></div>
	<div class="loader-bar"><div class="loader-fill" id="loaderFill"></div></div>
</div>

<header class="nav" id="nav">
	<div class="container nav-inner">
		<a class="brand" href="<?php echo esc_url(home_url('/')); ?>">
			<div class="brand-logo">
				<img class="logo-gif" src="<?php echo esc_url(get_template_directory_uri() . '/assets/media/logo-loader.gif'); ?>" alt="<?php esc_attr_e('EscapeArc brand mark', 'escapearc-theme'); ?>">
			</div>
			<div class="brand-text">
				<strong><?php bloginfo('name'); ?></strong>
				<span><?php esc_html_e('RAW · REMOTE · REAL', 'escapearc-theme'); ?></span>
			</div>
		</a>

		<nav class="nav-links" aria-label="<?php esc_attr_e('Primary', 'escapearc-theme'); ?>">
			<a href="<?php echo esc_url(home_url('/')); ?>"><?php esc_html_e('Home', 'escapearc-theme'); ?></a>
			<a href="<?php echo esc_url($expeditions_url); ?>"><?php esc_html_e('Expeditions', 'escapearc-theme'); ?></a>
			<a href="<?php echo esc_url($stays_url); ?>"><?php esc_html_e('Hotels', 'escapearc-theme'); ?></a>
			<a href="<?php echo esc_url(home_url('/perfumes/')); ?>"><?php esc_html_e('Perfumes', 'escapearc-theme'); ?></a>
			<a href="<?php echo esc_url(home_url('/merch/')); ?>"><?php esc_html_e('Merch', 'escapearc-theme'); ?></a>
			<a href="<?php echo esc_url(escapearc_page_url('checklist')); ?>"><?php esc_html_e('Checklist', 'escapearc-theme'); ?></a>
			<a href="<?php echo esc_url(escapearc_page_url('policies')); ?>"><?php esc_html_e('Policies', 'escapearc-theme'); ?></a>
			<a href="<?php echo esc_url(escapearc_page_url('contact')); ?>"><?php esc_html_e('Contact', 'escapearc-theme'); ?></a>
		</nav>

		<div class="nav-actions">
			<a class="btn btn-dark" href="<?php echo esc_url($expeditions_url); ?>"><?php esc_html_e('View Routes', 'escapearc-theme'); ?></a>
			<button class="btn btn-primary" type="button" data-open-booking data-source-cta="Header Book Now"><?php esc_html_e('Book Now', 'escapearc-theme'); ?></button>
			<button class="menu-btn" id="menuBtn" aria-label="<?php esc_attr_e('Open menu', 'escapearc-theme'); ?>">☰</button>
		</div>
	</div>
</header>

<main id="main" class="content-shell hidden">
