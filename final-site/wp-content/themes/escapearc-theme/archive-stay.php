<?php
/**
 * Stay archive template.
 *
 * @package EscapeArc_Theme
 */

get_header();

$selected_location = isset($_GET['stay_location']) ? sanitize_text_field(wp_unslash($_GET['stay_location'])) : '';
$selected_type     = isset($_GET['stay_type']) ? sanitize_text_field(wp_unslash($_GET['stay_type'])) : '';
$locations         = escapearc_collect_meta_values('stay', 'location');
$types             = escapearc_collect_meta_values('stay', 'stay_type');
?>

<section class="section" style="padding-top:140px">
	<div class="container">
		<div class="archive-intro">
			<div class="section-kicker"><?php esc_html_e('Stay Archive', 'escapearc-theme'); ?></div>
			<h1 class="section-title"><?php esc_html_e('Searchable route accommodation database', 'escapearc-theme'); ?></h1>
			<p class="section-lead"><?php esc_html_e('This archive is wired for location and stay-type filtering so EscapeArc can manage route accommodation without hardcoding a hotel database into the homepage.', 'escapearc-theme'); ?></p>
		</div>

		<form method="get" action="<?php echo esc_url(get_post_type_archive_link('stay')); ?>" class="panel" style="margin-top:24px">
			<div class="panel-body stay-filter-grid">
				<input class="field" type="search" name="s" value="<?php echo esc_attr(get_search_query()); ?>" placeholder="<?php esc_attr_e('Search stay name or notes...', 'escapearc-theme'); ?>">
				<select class="field" name="stay_location">
					<option value=""><?php esc_html_e('All locations', 'escapearc-theme'); ?></option>
					<?php foreach ($locations as $location) : ?>
						<option value="<?php echo esc_attr($location); ?>" <?php selected($selected_location, $location); ?>><?php echo esc_html($location); ?></option>
					<?php endforeach; ?>
				</select>
				<select class="field" name="stay_type">
					<option value=""><?php esc_html_e('All stay types', 'escapearc-theme'); ?></option>
					<?php foreach ($types as $type) : ?>
						<option value="<?php echo esc_attr($type); ?>" <?php selected($selected_type, $type); ?>><?php echo esc_html($type); ?></option>
					<?php endforeach; ?>
				</select>
				<div class="cta-row">
					<button class="btn btn-primary" type="submit"><?php esc_html_e('Filter Stays', 'escapearc-theme'); ?></button>
					<a class="btn btn-ghost" href="<?php echo esc_url(get_post_type_archive_link('stay')); ?>"><?php esc_html_e('Reset', 'escapearc-theme'); ?></a>
				</div>
			</div>
		</form>

		<?php if (have_posts()) : ?>
			<div class="archive-grid" style="margin-top:28px">
				<?php while (have_posts()) : the_post(); ?>
					<?php
					$location = escapearc_get_value('location');
					$type     = escapearc_get_value('stay_type');
					$address  = escapearc_get_value('address');
					$rating   = escapearc_get_value('rating');
					$contact  = escapearc_get_value('contact_info');
					$map_url  = escapearc_get_value('map_url');
					$notes    = escapearc_get_value('notes', get_the_ID(), get_the_excerpt());
					?>
					<article class="hotel-card">
						<div class="hotel-name"><?php the_title(); ?></div>
						<?php if ($address) : ?><div class="hotel-addr">📍 <?php echo esc_html($address); ?></div><?php endif; ?>
						<div class="hotel-meta">
							<?php if ($location) : ?><span class="hotel-chip"><?php echo esc_html($location); ?></span><?php endif; ?>
							<?php if ($type) : ?><span class="hotel-chip"><?php echo esc_html($type); ?></span><?php endif; ?>
							<?php if ($rating) : ?><span class="hotel-chip">★ <?php echo esc_html($rating); ?></span><?php endif; ?>
						</div>
						<?php if ($notes) : ?><p style="margin-top:10px;color:var(--muted);line-height:1.65;font-size:.9rem"><?php echo esc_html(wp_trim_words(wp_strip_all_tags($notes), 24)); ?></p><?php endif; ?>
						<div class="cta-row" style="margin-top:12px">
							<?php if ($contact) : ?><span class="hotel-chip"><?php echo esc_html($contact); ?></span><?php endif; ?>
							<?php if ($map_url) : ?><a class="btn btn-dark" style="padding:9px 14px;font-size:.82rem" href="<?php echo esc_url($map_url); ?>" target="_blank" rel="noopener"><?php esc_html_e('Open Map', 'escapearc-theme'); ?></a><?php endif; ?>
						</div>
					</article>
				<?php endwhile; ?>
			</div>

			<div style="margin-top:28px">
				<?php the_posts_pagination(); ?>
			</div>
		<?php else : ?>
			<div class="empty-state" style="margin-top:28px">
				<?php esc_html_e('No stays matched the current filters. Add Stay posts with location and stay_type fields to populate this archive.', 'escapearc-theme'); ?>
			</div>
		<?php endif; ?>
	</div>
</section>

<?php
get_footer();
