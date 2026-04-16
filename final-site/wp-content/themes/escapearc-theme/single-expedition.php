<?php
/**
 * Single expedition template.
 *
 * @package EscapeArc_Theme
 */

get_header();

while (have_posts()) :
	the_post();

	$summary            = escapearc_get_value('summary', get_the_ID(), get_the_excerpt() ? get_the_excerpt() : wp_strip_all_tags(get_the_content()));
	$destination        = escapearc_get_value('destination');
	$difficulty         = escapearc_get_value('difficulty');
	$price              = escapearc_get_value('price');
	$days               = escapearc_get_value('duration_days');
	$nights             = escapearc_get_value('duration_nights');
	$season             = escapearc_get_value('season_months');
	$duration           = trim(($nights ? $nights . ' Nights' : '') . ($days ? ' / ' . $days . ' Days' : ''), ' /');
	$inclusions         = escapearc_normalize_list(escapearc_get_value('inclusions'));
	$exclusions         = escapearc_normalize_list(escapearc_get_value('exclusions'));
	$rider_requirements = escapearc_normalize_list(escapearc_get_value('rider_requirements'));
	$gallery            = function_exists('get_field') ? get_field('gallery') : array();
	$visual_background  = escapearc_card_thumb_background(get_the_ID());
	?>

	<section class="section" style="padding-top:140px">
		<div class="container single-hero">
			<div class="single-intro">
				<div class="section-kicker"><?php echo esc_html($destination ? $destination : __('Expedition', 'escapearc-theme')); ?></div>
				<h1 class="section-title"><?php the_title(); ?></h1>
				<p class="section-lead"><?php echo esc_html($summary); ?></p>
				<div class="meta-row" style="margin-top:20px">
					<?php if ($duration) : ?><span class="chip"><?php echo esc_html($duration); ?></span><?php endif; ?>
					<?php if ($difficulty) : ?><span class="chip"><?php echo esc_html($difficulty); ?></span><?php endif; ?>
					<?php if ($season) : ?><span class="chip"><?php echo esc_html(is_array($season) ? implode(', ', $season) : $season); ?></span><?php endif; ?>
				</div>
				<div class="cta-row" style="margin-top:24px">
					<button class="btn btn-primary" type="button" data-open-booking data-expedition-id="<?php echo esc_attr(get_the_ID()); ?>" data-expedition-label="<?php echo esc_attr(get_the_title()); ?>" data-source-cta="Single Expedition Hero"><?php esc_html_e('Book This Expedition', 'escapearc-theme'); ?></button>
					<a class="btn btn-dark" href="<?php echo esc_url(escapearc_whatsapp_url(escapearc_get_option_value('whatsapp_number', '+91 94228 81098'))); ?>" target="_blank" rel="noopener"><?php esc_html_e('WhatsApp Inquiry', 'escapearc-theme'); ?></a>
				</div>
			</div>

			<div class="single-visual" style="background-image:<?php echo esc_attr($visual_background); ?>"></div>
		</div>
	</section>

	<section class="section" style="padding-top:0">
		<div class="container detail-grid">
			<div class="panel">
				<div class="panel-head"><h2><?php esc_html_e('Expedition overview', 'escapearc-theme'); ?></h2></div>
				<div class="panel-body content-copy">
					<?php the_content(); ?>
				</div>
			</div>

			<div class="panel">
				<div class="panel-head"><h2><?php esc_html_e('Route facts', 'escapearc-theme'); ?></h2></div>
				<div class="panel-body section-stack">
					<div class="metric" style="text-align:left;padding:16px 20px"><strong><?php echo esc_html(escapearc_format_price($price)); ?></strong><span><?php esc_html_e('Pricing', 'escapearc-theme'); ?></span></div>
					<?php if ($duration) : ?><div class="metric" style="text-align:left;padding:16px 20px"><strong><?php echo esc_html($duration); ?></strong><span><?php esc_html_e('Duration', 'escapearc-theme'); ?></span></div><?php endif; ?>
					<?php if ($difficulty) : ?><div class="metric" style="text-align:left;padding:16px 20px"><strong><?php echo esc_html($difficulty); ?></strong><span><?php esc_html_e('Difficulty', 'escapearc-theme'); ?></span></div><?php endif; ?>
					<?php if ($destination) : ?><div class="metric" style="text-align:left;padding:16px 20px"><strong><?php echo esc_html($destination); ?></strong><span><?php esc_html_e('Destination', 'escapearc-theme'); ?></span></div><?php endif; ?>
				</div>
			</div>
		</div>
	</section>

	<section class="section" style="padding-top:0">
		<div class="container itinerary-grid">
			<div class="panel">
				<div class="panel-head"><h2><?php esc_html_e('Inclusions', 'escapearc-theme'); ?></h2></div>
				<div class="panel-body">
					<?php if ($inclusions) : ?>
						<div class="check-grid">
							<?php foreach ($inclusions as $item) : ?>
								<div class="check-item"><?php echo esc_html($item); ?></div>
							<?php endforeach; ?>
						</div>
					<?php else : ?>
						<p class="small"><?php esc_html_e('Populate the ACF inclusions field to list what is covered in the route cost.', 'escapearc-theme'); ?></p>
					<?php endif; ?>
				</div>
			</div>

			<div class="panel">
				<div class="panel-head"><h2><?php esc_html_e('Exclusions', 'escapearc-theme'); ?></h2></div>
				<div class="panel-body">
					<?php if ($exclusions) : ?>
						<div class="check-grid">
							<?php foreach ($exclusions as $item) : ?>
								<div class="check-item warn"><?php echo esc_html($item); ?></div>
							<?php endforeach; ?>
						</div>
					<?php else : ?>
						<p class="small"><?php esc_html_e('Populate the ACF exclusions field to clarify what riders need to handle separately.', 'escapearc-theme'); ?></p>
					<?php endif; ?>
				</div>
			</div>
		</div>
	</section>

	<section class="section" style="padding-top:0">
		<div class="container">
			<div class="section-kicker"><?php esc_html_e('Itinerary', 'escapearc-theme'); ?></div>
			<h2 class="section-title"><?php esc_html_e('Day-by-day route plan', 'escapearc-theme'); ?></h2>
			<?php if (function_exists('have_rows') && have_rows('itinerary_days')) : ?>
				<div class="itinerary-grid" style="margin-top:28px">
					<?php while (have_rows('itinerary_days')) : the_row(); ?>
						<?php
						$day_number  = get_sub_field('day_number');
						$title       = get_sub_field('title');
						$route       = get_sub_field('route');
						$distance    = get_sub_field('distance');
						$elevation   = get_sub_field('elevation');
						$stay        = get_sub_field('stay');
						$description = get_sub_field('description');
						?>
						<div class="day-card">
							<div class="day-label"><?php echo esc_html($day_number ? sprintf(__('Day %s', 'escapearc-theme'), $day_number) : __('Route Day', 'escapearc-theme')); ?></div>
							<div class="day-title"><?php echo esc_html($title ? $title : $route); ?></div>
							<div class="day-meta">
								<?php if ($route) : ?><span class="meta-chip"><?php echo esc_html($route); ?></span><?php endif; ?>
								<?php if ($distance) : ?><span class="meta-chip"><?php echo esc_html($distance); ?></span><?php endif; ?>
								<?php if ($elevation) : ?><span class="meta-chip"><?php echo esc_html($elevation); ?></span><?php endif; ?>
								<?php if ($stay) : ?><span class="meta-chip"><?php echo esc_html($stay); ?></span><?php endif; ?>
							</div>
							<?php if ($description) : ?><div class="day-desc"><?php echo esc_html($description); ?></div><?php endif; ?>
						</div>
					<?php endwhile; ?>
				</div>
			<?php else : ?>
				<div class="empty-state" style="margin-top:28px">
					<?php esc_html_e('No itinerary rows have been added yet. Create the ACF repeater named itinerary_days to render the route plan here.', 'escapearc-theme'); ?>
				</div>
			<?php endif; ?>
		</div>
	</section>

	<section class="section" style="padding-top:0">
		<div class="container detail-grid">
			<div class="panel">
				<div class="panel-head"><h2><?php esc_html_e('Rider requirements', 'escapearc-theme'); ?></h2></div>
				<div class="panel-body">
					<?php if ($rider_requirements) : ?>
						<div class="check-grid">
							<?php foreach ($rider_requirements as $item) : ?>
								<div class="check-item warn"><?php echo esc_html($item); ?></div>
							<?php endforeach; ?>
						</div>
					<?php else : ?>
						<p class="small"><?php esc_html_e('Use the rider_requirements field for medical, gear, document, and bike-readiness rules.', 'escapearc-theme'); ?></p>
					<?php endif; ?>
				</div>
			</div>

			<div class="panel">
				<div class="panel-head"><h2><?php esc_html_e('Gallery', 'escapearc-theme'); ?></h2></div>
				<div class="panel-body">
					<?php if (! empty($gallery) && is_array($gallery)) : ?>
						<div class="gallery-grid">
							<?php foreach ($gallery as $item) : ?>
								<?php
								$image_id = is_array($item) && isset($item['ID']) ? $item['ID'] : $item;
								$image    = wp_get_attachment_image($image_id, 'large');
								if (! $image) {
									continue;
								}
								?>
								<?php echo $image; ?>
							<?php endforeach; ?>
						</div>
					<?php else : ?>
						<p class="small"><?php esc_html_e('Attach gallery images through ACF to create a visual story for each expedition.', 'escapearc-theme'); ?></p>
					<?php endif; ?>
				</div>
			</div>
		</div>
	</section>
<?php endwhile; ?>

<?php
get_footer();
