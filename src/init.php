<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package Block for Updraft Central
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function block_for_updraftcentral_cgb_block_assets() { // phpcs:ignore

	register_meta(
		'post',
		'updraftCentral_metafield',
		array(
			'show_in_rest' => true,
			'type'         => 'string',
			'single'       => true,
		)
	);

	// Register block styles for both frontend + backend.
	wp_register_style(
		'block_for_updraftcentral-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-editor' ), // Dependency to include the CSS after it.
		BLOCK_FOR_UPDRAFT_CENTRAL_VERSION // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Register block editor script for backend.
	wp_register_script(
		'block_for_updraftcentral-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-plugins', 'wp-edit-post', 'wp-data' ), // Dependencies, defined above.
		BLOCK_FOR_UPDRAFT_CENTRAL_VERSION, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);
	wp_set_script_translations( 'block_for_updraftcentral-cgb-block-js', 'block-for-updraftcentral' );

	// Register block editor styles for backend.
	wp_register_style(
		'block_for_updraftcentral-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		BLOCK_FOR_UPDRAFT_CENTRAL_VERSION // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
	wp_localize_script(
		'block_for_updraftcentral-cgb-block-js',
		'block_for_uc', // Array containing dynamic data for a JS Global.
		array(
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
		)
	);

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
		'mediaron/block-for-updraftcentral',
		array(
			'attributes'      => array(
				'theme'          => array(
					'type'    => 'string',
					'default' => 'none',
				),
				'fullScreenMode' => array(
					'type'    => 'boolean',
					'default' => true,
				),
			),
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'           => 'block_for_updraftcentral-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script'   => 'block_for_updraftcentral-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'    => 'block_for_updraftcentral-cgb-block-editor-css',
			'render_callback' => 'block_for_updraft_central_render',
		)
	);
}

/**
 * Render the shortcode on the front-end.
 *
 * @param array $attributes Block attributes.
 *
 * @return string Shortcode contents.
 */
function block_for_updraft_central_render( $attributes ) {
	ob_start();
	echo do_shortcode( '[updraft_central]' );
	?>
	<script>
		jQuery( document ).ready( function() {
			setTimeout( function() {
				UpdraftCentral_Library.toggle_fullscreen();
			}, 5000 );
		});
	</script>
	<?php
	return ob_get_clean();
}

// Hook: Block assets.
add_action( 'init', 'block_for_updraftcentral_cgb_block_assets' );
