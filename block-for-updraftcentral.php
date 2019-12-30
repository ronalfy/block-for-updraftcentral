<?php
/**
 * Plugin Name: Block for UpdraftCentral
 * Plugin URI: https://mediaron.com/updraftcentral
 * Description: A block for inserting UpdraftCentral using Gutenberg.
 * Author: Ronald Huereca
 * Author URI: https://mediaron.com
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package Block for UpdraftCentral.
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'BLOCK_FOR_UPDRAFT_CENTRAL_VERSION', '1.0.0' );

add_filter( 'template_include', 'block_for_updraftcentral_single_override', 99 );

/**
 * Overrides UpdraftPlus
 *
 * @param string $template The template file to override.
 *
 * @return string updated template file.
 */
function block_for_updraftcentral_single_override( $template ) {
	$id = absint( get_queried_object_id() );
	if ( 'full' === get_post_meta( $id, 'updraftCentral_metafield', true ) ) {
		return plugin_dir_path( __FILE__ ) . '/templates/updraftcentral.php';
	}
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
