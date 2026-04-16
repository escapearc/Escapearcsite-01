<?php
/**
 * Booking modal partial.
 *
 * @package EscapeArc_Theme
 */

$expeditions = get_posts(
	array(
		'post_type'      => 'expedition',
		'post_status'    => 'publish',
		'posts_per_page' => -1,
		'orderby'        => 'title',
		'order'          => 'ASC',
	)
);
?>

<div class="modal" id="bookingModal">
	<div class="modal-card">
		<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
			<div>
				<div class="section-kicker"><?php esc_html_e('Book your ride', 'escapearc-theme'); ?></div>
				<h3 style="margin:0"><?php esc_html_e('EscapeArc Expedition Booking', 'escapearc-theme'); ?></h3>
			</div>
			<button class="btn btn-ghost" type="button" style="padding:10px 14px" data-close-booking>✕</button>
		</div>

		<form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
			<input type="hidden" name="action" value="escapearc_booking_inquiry">
			<input type="hidden" name="status" value="new">
			<input type="hidden" name="source_page" id="bookingSourcePage" value="">
			<input type="hidden" name="source_cta" id="bookingSourceCta" value="site">
			<input type="hidden" name="expedition_label" id="bookingExpeditionLabel" value="">
			<?php wp_nonce_field('escapearc_booking_inquiry', 'escapearc_booking_nonce'); ?>

			<div class="booking-form-grid">
				<input class="field" id="bkName" name="name" placeholder="<?php esc_attr_e('Full name *', 'escapearc-theme'); ?>" required>
				<input class="field" id="bkPhone" name="phone" placeholder="<?php esc_attr_e('Phone number *', 'escapearc-theme'); ?>" required>
				<input class="field" id="bkEmail" name="email" type="email" placeholder="<?php esc_attr_e('Email address', 'escapearc-theme'); ?>">
				<select class="field" id="bkTour" name="expedition_id">
					<option value=""><?php esc_html_e('Select expedition', 'escapearc-theme'); ?></option>
					<?php foreach ($expeditions as $expedition) : ?>
						<option value="<?php echo esc_attr($expedition->ID); ?>"><?php echo esc_html($expedition->post_title); ?></option>
					<?php endforeach; ?>
				</select>
				<input class="field" id="bkMonth" name="travel_month" placeholder="<?php esc_attr_e('Travel month *', 'escapearc-theme'); ?>" required>
				<input class="field" id="bkGroup" name="group_size" type="number" min="1" max="40" value="1" placeholder="<?php esc_attr_e('Group size', 'escapearc-theme'); ?>">
			</div>

			<textarea class="field" id="bkNotes" name="notes" placeholder="<?php esc_attr_e('Any special requirements or questions?', 'escapearc-theme'); ?>" rows="3"></textarea>

			<div class="cta-row" style="margin-top:12px">
				<button class="btn btn-primary" type="submit"><?php esc_html_e('Submit Inquiry', 'escapearc-theme'); ?></button>
				<button class="btn btn-ghost" type="button" data-close-booking><?php esc_html_e('Cancel', 'escapearc-theme'); ?></button>
			</div>

			<p class="small" style="margin-top:12px;line-height:1.65">
				<strong style="color:var(--accent)"><?php esc_html_e('40% advance', 'escapearc-theme'); ?></strong>
				<?php esc_html_e('confirms a seat on fixed departures. This form stores the inquiry as structured content for sales follow-up and future CRM handoff.', 'escapearc-theme'); ?>
			</p>
		</form>
	</div>
</div>
