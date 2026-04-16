<?php
/**
 * Fallback template.
 *
 * @package EscapeArc_Theme
 */

get_header();
?>

<section class="section" style="padding-top:140px">
	<div class="container">
		<?php if (have_posts()) : ?>
			<?php while (have_posts()) : the_post(); ?>
				<div class="section-kicker"><?php echo esc_html(get_post_type_object(get_post_type())->labels->singular_name ?? __('Content', 'escapearc-theme')); ?></div>
				<h1 class="section-title"><?php the_title(); ?></h1>
				<div class="panel">
					<div class="panel-body content-copy">
						<?php the_content(); ?>
					</div>
				</div>
			<?php endwhile; ?>
		<?php else : ?>
			<div class="empty-state">
				<?php esc_html_e('Nothing has been published here yet.', 'escapearc-theme'); ?>
			</div>
		<?php endif; ?>
	</div>
</section>

<?php
get_footer();
