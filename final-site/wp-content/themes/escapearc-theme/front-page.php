<?php
/**
 * Front page template.
 *
 * @package EscapeArc_Theme
 */

get_header();

$featured_query = new WP_Query(
	array(
		'post_type'      => 'expedition',
		'posts_per_page' => 6,
		'post_status'    => 'publish',
	)
);

$expeditions_url = get_post_type_archive_link('expedition') ? get_post_type_archive_link('expedition') : home_url('/expeditions/');
$stays_url       = get_post_type_archive_link('stay') ? get_post_type_archive_link('stay') : home_url('/stays/');
$contact_email   = escapearc_get_option_value('contact_email', 'escapearcofficial@gmail.com');
?>

<section class="hero">
	<div class="container hero-grid">
		<div>
			<div class="section-kicker"><?php echo esc_html(escapearc_get_option_value('hero_kicker', 'Adventure Travel Company · Founded 2017, Buldhana')); ?></div>
			<h1><?php echo wp_kses_post(escapearc_get_option_value('hero_heading', 'Ride beyond the<br><span class="accent">ordinary</span>')); ?></h1>
			<p><?php echo esc_html(escapearc_get_option_value('hero_copy', 'Motorcycle expeditions, group rides, and curated travel experiences across India and the world. Built to scale with better operations, cleaner content management, and rider-first detail.')); ?></p>
			<div class="hero-tags">
				<span class="chip"><b>2017</b> <?php esc_html_e('Founded', 'escapearc-theme'); ?></span>
				<span class="chip"><b>150+</b> <?php esc_html_e('Destinations', 'escapearc-theme'); ?></span>
				<span class="chip"><b>50+</b> <?php esc_html_e('Years combined experience', 'escapearc-theme'); ?></span>
				<span class="chip"><b><?php esc_html_e('Rider-first', 'escapearc-theme'); ?></b></span>
			</div>
			<div class="cta-row" style="margin-top:26px">
				<a class="btn btn-primary" href="<?php echo esc_url($expeditions_url); ?>"><?php esc_html_e('View Expeditions', 'escapearc-theme'); ?></a>
				<button class="btn btn-dark" type="button" data-open-booking data-source-cta="Front Page Hero"><?php esc_html_e('Book Expedition', 'escapearc-theme'); ?></button>
				<a class="btn btn-ghost" href="<?php echo esc_url(escapearc_whatsapp_url(escapearc_get_option_value('whatsapp_number', '+91 94228 81098'))); ?>" target="_blank" rel="noopener"><?php esc_html_e('WhatsApp Us', 'escapearc-theme'); ?></a>
			</div>
			<div class="stat-row">
				<div class="stat"><strong><?php esc_html_e('RAW', 'escapearc-theme'); ?></strong><span><?php esc_html_e('Route-first journeys', 'escapearc-theme'); ?></span></div>
				<div class="stat"><strong><?php esc_html_e('REMOTE', 'escapearc-theme'); ?></strong><span><?php esc_html_e('High-altitude exploration', 'escapearc-theme'); ?></span></div>
				<div class="stat"><strong><?php esc_html_e('REAL', 'escapearc-theme'); ?></strong><span><?php esc_html_e('Safe and operational', 'escapearc-theme'); ?></span></div>
				<div class="stat"><strong><?php esc_html_e('SCALABLE', 'escapearc-theme'); ?></strong><span><?php esc_html_e('Data-driven updates from WordPress', 'escapearc-theme'); ?></span></div>
			</div>
		</div>

		<aside class="hero-card">
			<div class="hero-image">
				<div class="playBadge"><?php esc_html_e('Expeditions built for growth', 'escapearc-theme'); ?></div>
			</div>
			<div class="hero-metrics">
				<div class="metric"><strong><?php esc_html_e('ACF', 'escapearc-theme'); ?></strong><span><?php esc_html_e('Field-driven content', 'escapearc-theme'); ?></span></div>
				<div class="metric"><strong><?php esc_html_e('CPT', 'escapearc-theme'); ?></strong><span><?php esc_html_e('Structured route data', 'escapearc-theme'); ?></span></div>
				<div class="metric"><strong><?php esc_html_e('CRM-ready', 'escapearc-theme'); ?></strong><span><?php esc_html_e('Inquiry capture model', 'escapearc-theme'); ?></span></div>
			</div>
		</aside>
	</div>
</section>

<div class="marquee" aria-hidden="true">
	<div class="marquee-track">
		<span><span class="dot"></span><?php esc_html_e('Ladakh Expeditions', 'escapearc-theme'); ?></span>
		<span><span class="dot"></span><?php esc_html_e('Spiti Valley', 'escapearc-theme'); ?></span>
		<span><span class="dot"></span><?php esc_html_e('Bhutan', 'escapearc-theme'); ?></span>
		<span><span class="dot"></span><?php esc_html_e('Kerala Routes', 'escapearc-theme'); ?></span>
		<span><span class="dot"></span><?php esc_html_e('Remote Stays', 'escapearc-theme'); ?></span>
		<span><span class="dot"></span><?php esc_html_e('WordPress + ACF', 'escapearc-theme'); ?></span>
		<span><span class="dot"></span><?php esc_html_e('Booking Inquiries', 'escapearc-theme'); ?></span>
		<span><span class="dot"></span><?php esc_html_e('Ladakh Expeditions', 'escapearc-theme'); ?></span>
		<span><span class="dot"></span><?php esc_html_e('Spiti Valley', 'escapearc-theme'); ?></span>
		<span><span class="dot"></span><?php esc_html_e('Bhutan', 'escapearc-theme'); ?></span>
	</div>
</div>

<section class="section" style="padding-top:60px">
	<div class="container">
		<div id="bookingFeedback" class="booking-feedback" hidden></div>

		<div class="section-kicker"><?php esc_html_e('Featured Routes', 'escapearc-theme'); ?></div>
		<h2 class="section-title"><?php esc_html_e('Homepage cards now pull from real expedition content', 'escapearc-theme'); ?></h2>
		<p class="section-lead"><?php esc_html_e('Create or edit an expedition in WordPress and the homepage updates without touching code. Price, duration, difficulty, destination, and the route summary all come from structured content fields.', 'escapearc-theme'); ?></p>

		<?php if ($featured_query->have_posts()) : ?>
			<div class="featured-grid" style="margin-top:28px">
				<?php while ($featured_query->have_posts()) : $featured_query->the_post(); ?>
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
							<h3 style="margin:10px 0 6px;font-size:1rem"><?php the_title(); ?></h3>
							<p><?php echo esc_html(get_the_excerpt() ? get_the_excerpt() : wp_trim_words(wp_strip_all_tags(get_the_content()), 20)); ?></p>
							<div class="meta-row" style="margin-top:10px">
								<?php if ($duration) : ?><span class="meta-chip"><?php echo esc_html($duration); ?></span><?php endif; ?>
								<?php if ($difficulty) : ?><span class="meta-chip"><?php echo esc_html($difficulty); ?></span><?php endif; ?>
								<span class="meta-chip price"><?php echo esc_html(escapearc_format_price($price)); ?></span>
							</div>
							<div class="cta-row" style="margin-top:12px">
								<a class="btn btn-primary" style="font-size:.82rem;padding:9px 14px" href="<?php the_permalink(); ?>"><?php esc_html_e('View Details', 'escapearc-theme'); ?></a>
								<button class="btn btn-dark" style="font-size:.82rem;padding:9px 14px" type="button" data-open-booking data-expedition-id="<?php echo esc_attr(get_the_ID()); ?>" data-expedition-label="<?php echo esc_attr(get_the_title()); ?>" data-source-cta="Front Page Card"><?php esc_html_e('Book Now', 'escapearc-theme'); ?></button>
							</div>
						</div>
					</article>
				<?php endwhile; ?>
			</div>
			<?php wp_reset_postdata(); ?>
		<?php else : ?>
			<div class="empty-state" style="margin-top:28px">
				<?php esc_html_e('No expeditions have been published yet. Add your first Expedition post and it will appear here automatically.', 'escapearc-theme'); ?>
			</div>
		<?php endif; ?>
	</div>
</section>

<section class="section">
	<div class="container">
		<div class="split">
			<div class="panel">
				<div class="panel-body section-stack">
					<div class="section-kicker"><?php esc_html_e('Operations Blueprint', 'escapearc-theme'); ?></div>
					<h2 class="section-title" style="font-size:clamp(2rem,3vw,3.4rem)"><?php esc_html_e('Content is normalized for scale, not hidden behind one giant HTML file', 'escapearc-theme'); ?></h2>
					<p><?php esc_html_e('Expeditions belong in their own post type. Stay data belongs in a searchable archive. Policies and contact details belong on standard pages. Booking inquiries are captured as records that can later feed a CRM or invoicing workflow.', 'escapearc-theme'); ?></p>
					<div class="check-grid">
						<div class="check-item"><?php esc_html_e('Expedition CPT with ACF fields', 'escapearc-theme'); ?></div>
						<div class="check-item"><?php esc_html_e('Repeater-based itineraries', 'escapearc-theme'); ?></div>
						<div class="check-item"><?php esc_html_e('Stay archive with filters', 'escapearc-theme'); ?></div>
						<div class="check-item"><?php esc_html_e('Booking inquiry capture', 'escapearc-theme'); ?></div>
					</div>
				</div>
			</div>

			<div class="panel">
				<div class="panel-body section-stack">
					<div class="section-kicker"><?php esc_html_e('Conversion Path', 'escapearc-theme'); ?></div>
					<h2 class="section-title" style="font-size:clamp(2rem,3vw,3.4rem)"><?php esc_html_e('The public site is now aligned with the future backend', 'escapearc-theme'); ?></h2>
					<p><?php esc_html_e('This scaffold keeps the EscapeArc look intact while separating concerns properly. Front-page content stays focused on the brand story and featured routes, while the deeper operational content moves to archives, single templates, and standard pages.', 'escapearc-theme'); ?></p>
					<div class="footer-cta-grid">
						<a class="btn btn-dark" href="<?php echo esc_url($stays_url); ?>"><?php esc_html_e('Browse Stay Archive', 'escapearc-theme'); ?></a>
						<a class="btn btn-ghost" href="<?php echo esc_url('mailto:' . antispambot($contact_email)); ?>"><?php esc_html_e('Email the Team', 'escapearc-theme'); ?></a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<?php
get_footer();
