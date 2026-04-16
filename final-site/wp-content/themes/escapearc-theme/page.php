<?php
/**
 * Standard page template.
 *
 * @package EscapeArc_Theme
 */

get_header();
?>

<section class="section" style="padding-top:140px">
	<div class="container">
		<?php while (have_posts()) : the_post(); ?>
			<div class="section-kicker"><?php esc_html_e('Page', 'escapearc-theme'); ?></div>
			<h1 class="section-title"><?php the_title(); ?></h1>
			<div class="panel">
				<div class="panel-body content-copy">
					<?php the_content(); ?>
				</div>
			</div>
		<?php endwhile; ?>
	</div>
</section>

<?php
get_footer();
