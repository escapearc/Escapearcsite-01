<?php
/**
 * Theme footer.
 *
 * @package EscapeArc_Theme
 */

$contact_email = escapearc_get_option_value('contact_email', 'escapearcofficial@gmail.com');
$whatsapp      = escapearc_get_option_value('whatsapp_number', '+91 94228 81098');
$office        = escapearc_get_option_value('office_address', 'Near Renuka Typing, Bhadech Layout, Buldhana, Maharashtra');
$expeditions   = get_post_type_archive_link('expedition') ? get_post_type_archive_link('expedition') : home_url('/expeditions/');
$stays         = get_post_type_archive_link('stay') ? get_post_type_archive_link('stay') : home_url('/stays/');
?>

</main>

<div class="sticky-book">
	<button class="floating" type="button" title="<?php esc_attr_e('Book now', 'escapearc-theme'); ?>" data-open-booking data-source-cta="Sticky Book">➜</button>
	<button class="floating alt" type="button" title="<?php esc_attr_e('Back to top', 'escapearc-theme'); ?>" data-scroll-top>↑</button>
</div>

<?php get_template_part('template-parts/booking', 'modal'); ?>

<div class="ai-bot" id="aiBot">
	<div class="ai-head">
		<div>
			<strong><?php esc_html_e('EscapeArc Assistant', 'escapearc-theme'); ?></strong>
			<div class="small" style="margin-top:2px"><?php esc_html_e('Ask about routes, gear, or booking.', 'escapearc-theme'); ?></div>
		</div>
		<button class="btn btn-ghost" type="button" style="padding:8px 10px" data-bot-close>✕</button>
	</div>
	<div class="ai-body">
		<div class="ai-msgs" id="aiMsgs">
			<div class="ai-msg"><?php esc_html_e('Welcome to EscapeArc. Tell me where you want to ride and I will point you in the right direction.', 'escapearc-theme'); ?></div>
		</div>
		<div class="ai-actions">
			<button class="btn btn-dark" type="button" data-bot-prompt="Spiti Valley"><?php esc_html_e('Spiti', 'escapearc-theme'); ?></button>
			<button class="btn btn-dark" type="button" data-bot-prompt="Ladakh"><?php esc_html_e('Ladakh', 'escapearc-theme'); ?></button>
			<button class="btn btn-dark" type="button" data-bot-prompt="Bhutan"><?php esc_html_e('Bhutan', 'escapearc-theme'); ?></button>
			<button class="btn btn-dark" type="button" data-bot-prompt="International tours"><?php esc_html_e('International', 'escapearc-theme'); ?></button>
		</div>
		<div class="ai-actions">
			<button class="btn btn-dark" type="button" data-bot-prompt="What gear do I need?"><?php esc_html_e('Gear', 'escapearc-theme'); ?></button>
			<button class="btn btn-dark" type="button" data-bot-prompt="How do I book?"><?php esc_html_e('Booking', 'escapearc-theme'); ?></button>
			<button class="btn btn-dark" type="button" data-bot-prompt="Show me the cancellation policy"><?php esc_html_e('Cancellation', 'escapearc-theme'); ?></button>
		</div>
		<div class="ai-input-row">
			<input class="ai-input" id="aiInput" placeholder="<?php esc_attr_e('Type your question...', 'escapearc-theme'); ?>">
			<button class="ai-send" type="button" data-bot-send>→</button>
		</div>
	</div>
</div>
<button class="bot-toggle" id="botToggle" type="button" title="<?php esc_attr_e('Chat with EscapeArc assistant', 'escapearc-theme'); ?>" hidden>🏍️</button>

<footer class="footer site-footer">
	<div class="container footer-grid">
		<div>
			<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
				<div style="width:44px;height:44px;border-radius:10px;overflow:hidden;background:#000;flex:0 0 auto">
					<img src="<?php echo esc_url(get_template_directory_uri() . '/assets/media/brand-mark.png'); ?>" alt="<?php esc_attr_e('EscapeArc logo', 'escapearc-theme'); ?>" style="width:100%;height:100%;object-fit:contain">
				</div>
				<div>
					<strong style="color:var(--text);font-size:1.1rem"><?php bloginfo('name'); ?></strong><br>
					<span class="small"><?php esc_html_e('RAW · REMOTE · REAL', 'escapearc-theme'); ?></span>
				</div>
			</div>
			<p class="small" style="line-height:1.7"><?php echo esc_html(escapearc_get_option_value('brand_story', 'Adventure travel company for motorcycle expeditions, group rides, and curated experiences across India and the world. Founded in 2017, Buldhana, Maharashtra.')); ?></p>
			<p class="small" style="margin-top:10px">📍 <?php echo esc_html($office); ?></p>
		</div>

		<div>
			<strong style="color:var(--text)"><?php esc_html_e('Explore', 'escapearc-theme'); ?></strong>
			<div class="footer-links">
				<a href="<?php echo esc_url($expeditions); ?>"><?php esc_html_e('Expeditions', 'escapearc-theme'); ?></a>
				<a href="<?php echo esc_url($stays); ?>"><?php esc_html_e('Stay Database', 'escapearc-theme'); ?></a>
				<a href="<?php echo esc_url(escapearc_page_url('checklist')); ?>"><?php esc_html_e('Packing Checklist', 'escapearc-theme'); ?></a>
			</div>
		</div>

		<div>
			<strong style="color:var(--text)"><?php esc_html_e('Company', 'escapearc-theme'); ?></strong>
			<div class="footer-links">
				<a href="<?php echo esc_url(escapearc_page_url('about')); ?>"><?php esc_html_e('About Us', 'escapearc-theme'); ?></a>
				<a href="<?php echo esc_url(escapearc_page_url('policies')); ?>"><?php esc_html_e('Policies', 'escapearc-theme'); ?></a>
				<a href="<?php echo esc_url(escapearc_page_url('contact')); ?>"><?php esc_html_e('Contact', 'escapearc-theme'); ?></a>
			</div>
		</div>

		<div>
			<strong style="color:var(--text)"><?php esc_html_e('Contact', 'escapearc-theme'); ?></strong>
			<div class="footer-links">
				<a href="<?php echo esc_url('mailto:' . antispambot($contact_email)); ?>"><?php echo esc_html($contact_email); ?></a>
				<a href="<?php echo esc_url(escapearc_whatsapp_url($whatsapp)); ?>" target="_blank" rel="noopener"><?php echo esc_html($whatsapp); ?></a>
				<a href="<?php echo esc_url(home_url('/')); ?>"><?php echo esc_html(wp_parse_url(home_url('/'), PHP_URL_HOST)); ?></a>
			</div>
		</div>
	</div>

	<div class="container" style="margin-top:32px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;border-top:1px solid rgba(255,255,255,.08);padding-top:24px">
		<span class="small"><?php echo esc_html(date_i18n('Y')); ?> <?php bloginfo('name'); ?> · <?php esc_html_e('All rights reserved', 'escapearc-theme'); ?></span>
		<span class="small"><a href="<?php echo esc_url(escapearc_page_url('policies')); ?>" style="color:var(--muted)"><?php esc_html_e('Privacy Policy', 'escapearc-theme'); ?></a> · <a href="<?php echo esc_url(escapearc_page_url('policies')); ?>" style="color:var(--muted)"><?php esc_html_e('Terms & Conditions', 'escapearc-theme'); ?></a></span>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
