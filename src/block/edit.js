import axios from 'axios';
const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;
const { getCurrentPostId } = wp.data.select("core/editor");
const post_id = getCurrentPostId();
const {
	PanelBody,
	Placeholder,
	RangeControl,
	SelectControl,
	ToggleControl,
} = wp.components;

const {
	InspectorControls,
} = wp.blockEditor;



class Block_For_UpdaftCentral extends Component {
	constructor() {
		super( ...arguments );
	}

	saveMeta = ( value ) => {
		axios.post(block_for_uc.rest_url + `updraftcentral/v1/save_block_meta_template`, {post_id: getCurrentPostId(), meta_value: value }, { 'headers': { 'X-WP-Nonce': block_for_uc.rest_nonce } } ).then( ( response ) => {
		} );
	}

	render() {
		const { template } = this.props.attributes;
		// Register select item.
		const updraftCentralSelect = [
			{ value: 'none', label: __( 'None', 'block-for-updraftcentral' ) },
			{ value: 'full', label: __( 'Full-width', 'block-for-updraftcentral' ) },
		];

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'UpdraftCentral Options', 'block-for-updraftcentral' ) }>
						<SelectControl
								label={ __( 'Select a Layout', 'wp-presenter-pro' ) }
								value={template}
								options={ updraftCentralSelect }
								onChange={ ( value ) => {
									this.props.setAttributes( { template: value } );
									this.saveMeta( value );
								} }
						/>
					</PanelBody>
				</InspectorControls>
				<Placeholder>
					<div className="updraftcentral-block-image">
						<img src={block_for_uc.pluginDirUrl + '/src/updraftcentral.png'} alt={ __( 'UpdraftCentral', 'block-for-updraftcentral' ) } />
					</div>
				</Placeholder>
			</Fragment>
		);
	}
}

export default Block_For_UpdaftCentral;
