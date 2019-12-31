/**
 * BLOCK: block-for-updraftplus
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

// Import JS
import edit from './edit';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { registerPlugin } = wp.plugins;
const { PluginSidebar, PluginSidebarMoreMenuItem, PluginDocumentSettingPanel } = wp.editPost;
const { Component, Fragment } = wp.element;
const { PanelBody, TextControl, SelectControl } = wp.components;
const { withSelect, withDispatch } = wp.data;

// Register select item.
const updraftCentralSelect = [
	{ value: 'none', label: __( 'None', 'block-for-updraftcentral' ) },
	{ value: 'full', label: __( 'Full-width', 'block-for-updraftcentral' ) },
];

// Register a sidebar plugin.
let PluginMetaFields = (props) => {
	return (
		<SelectControl
			label={ __( 'UpdraftCentral Display', 'block-for-updraftcentral' ) }
			options={updraftCentralSelect}
			value={wp.data.select('core/editor').getEditedPostAttribute('meta')['updraftCentral_metafield']}
			onChange={(value) => props.onMetaFieldChange(value)}
		/>
	)
  }
  PluginMetaFields = withSelect(
	(select) => {
	  return {
		text_metafield: select('core/editor').getEditedPostAttribute('meta')['updraftCentral_metafield']
	  }
	}
  )(PluginMetaFields);
  PluginMetaFields = withDispatch(
	(dispatch) => {
	  return {
		onMetaFieldChange: (value) => {
		  dispatch('core/editor').editPost({meta: {updraftCentral_metafield	: value}})
		}
	  }
	}
  )(PluginMetaFields);
registerPlugin( 'updraftcentral', {
	icon: 'welcome-view-site',
	render: () => {
	return (
		<Fragment>
		<PluginDocumentSettingPanel
			title={__('UpdraftCentral Template', 'block-for-updraftcentral')}
		>
			<PluginMetaFields />
		</PluginDocumentSettingPanel>
		</Fragment>
	)
	}
}
);

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'mediaron/block-for-updraftcentral', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'UpdraftCentral', 'block-for-updraft-central' ), // Block title.
	category: 'widgets', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'updraft', 'block-for-updraft-central' ),
		__( 'central', 'block-for-updraft-central' ),
	],
	icon: 'admin-tools',

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: edit,

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	// Render via PHP
	save() {
		return null;
	},
} );
