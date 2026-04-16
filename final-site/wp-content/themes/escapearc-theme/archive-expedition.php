<?php
/**
 * Expedition archive template.
 *
 * @package EscapeArc_Theme
 */

get_header();
?>

<section class="section" style="padding-top:140px">
	<div class="container">
		<div class="archive-intro">
			<div class="section-kicker"><?php esc_html_e('Expedition Archive', 'escapearc-theme'); ?></div>
			<h1 class="section-title"><?php esc_html_e('Scalable route inventory for EscapeArc', 'escapearc-theme'); ?></h1>
			<p class="section-lead"><?php esc_html_e('Each expedition can manage price, duration, difficulty, destination, inclusions, exclusions, rider requirements, gallery, and itinerary days directly from WordPress.', 'escapearc-theme'); ?></p>
		</div>

		<form method="get" action="<?php echo esc_url(get_post_type_archive_link('expedition')); ?>" class="panel" style="margin-top:24px">
			<div class="panel-body stay-filter-grid">
				<input class="field" type="search" name="s" value="<?php echo esc_attr(get_search_query()); ?>" placeholder="<?php esc_attr_e('Search expeditions...', 'escapearc-theme'); ?>">
				<div class="cta-row">
					<button class="btn btn-primary" type="submit"><?php esc_html_e('Search', 'escapearc-theme'); ?></button>
					<button class="btn btn-ghost" type="button" data-open-booking data-source-cta="Expedition Archive"><?php esc_html_e('Book by Inquiry', 'escapearc-theme'); ?></button>
				</div>
			</div>
		</form>

		<?php if (have_posts()) : ?>
			<div class="archive-grid" style="margin-top:28px">
				<?php while (have_posts()) : the_post(); ?>
					<?php
					$destination = escapearc_get_value('destination');
					$difficulty  = escapearc_get_value('difficulty');
					$price       = escapearc_get_value('price');
					$days        = escapearc_get_value('duration_days');
					$nights      = escapearc_get_value('duration_nights');
					$duration    = trim(($nights ? $nights . 'N' : '') . ($days ? ' / ' . $days . 'D' : ''), ' /');
					?>
					<article class="card" style="min-height:300px">
						<div class="thumb" style="background-image:<?php echo esc_attr(escapearc_card_thumb_background(get_the_ID())); ?>"></div>
						<div class="content">
							<?php if ($destination) : ?>
								<span class="badge"><?php echo esc_html($destination); ?></span>
							<?php endif; ?>
							<h2 style="margin:10px 0 6px;font-size:1.1rem"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
							<p><?php echo esc_html(get_the_excerpt() ? get_the_excerpt() : wp_trim_words(wp_strip_all_tags(get_the_content()), 20)); ?></p>
							<div class="meta-row" style="margin-top:10px">
								<?php if ($duration) : ?><span class="meta-chip"><?php echo esc_html($duration); ?></span><?php endif; ?>
								<?php if ($difficulty) : ?><span class="meta-chip"><?php echo esc_html($difficulty); ?></span><?php endif; ?>
								<span class="meta-chip price"><?php echo esc_html(escapearc_format_price($price)); ?></span>
							</div>
							<div class="cta-row" style="margin-top:12px">
								<a class="btn btn-primary" style="font-size:.82rem;padding:9px 14px" href="<?php the_permalink(); ?>"><?php esc_html_e('View Expedition', 'escapearc-theme'); ?></a>
								<button class="btn btn-dark" style="font-size:.82rem;padding:9px 14px" type="button" data-open-booking data-expedition-id="<?php echo esc_attr(get_the_ID()); ?>" data-expedition-label="<?php echo esc_attr(get_the_title()); ?>" data-source-cta="Expedition Archive Card"><?php esc_html_e('Book', 'escapearc-theme'); ?></button>
							</div>
						</div>
					</article>
				<?php endwhile; ?>
			</div>

			<div style="margin-top:28px">
				<?php the_posts_pagination(); ?>
			</div>
		<?php else : ?>
			<div class="empty-state" style="margin-top:28px">
				<?php esc_html_e('No expeditions match your current search. Publish Expedition posts or adjust the query and they will show up here.', 'escapearc-theme'); ?>
			</div>
		<?php endif; ?>
	</div>
</section>

<?php
get_footer();
