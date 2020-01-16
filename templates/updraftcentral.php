<?php
/**
 * Output slide content for single slide.
 *
 * @package   Block_for_UpdraftCentral
 */

add_filter( 'show_admin_bar', '__return_false' );
?>
<?php
/**
 * The template for displaying the header.
 *
 * @package Block_for_UpdraftCentral
 */
?>
<!DOCTYPE html>
<html lang="en" style="margin: 0 !important;">
<head>
	<meta charset="utf-8">
	<meta name="apple-mobile-web-app-capable" content="yes"/>
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<?php
	wp_head();
	?>
</head>
<body>
<div class="updraftcentral">
	<?php
	if ( have_posts() ) {
		while ( have_posts() ) {
			the_post();
			the_content();
		}
	}
	?>
</div>
<?php
wp_footer();
?>
</body>
</html>
