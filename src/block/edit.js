const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;

const {
	PanelBody,
	Placeholder,
	QueryControls,
	RangeControl,
	SelectControl,
	Spinner,
	TextControl,
	TextareaControl,
	ToggleControl,
	Toolbar,
} = wp.components;

const {
	MediaUpload,
	InspectorControls,
	BlockAlignmentToolbar,
	BlockControls,
	PanelColorSettings,
} = wp.blockEditor;



class Block_For_UpdaftCentral extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const { attributes, setAttributes } = this.props;
		const { theme } = attributes;

		const themes = [
			{ value: 'none', label: __( 'Regular', 'block-for-updraftcentral' ) },
			{ value: 'dark', label: __( 'Dark', 'block-for-updraftcentral' ) },
			{ value: 'light', label: __( 'Regular', 'block-for-updraftcentral' ) },
		];
		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={ __( 'UpdraftCentral Settings', 'block-for-updraftcentral' ) }>

					<SelectControl
							label={ __( 'Theme', 'post-type-archive-mapping' ) }
							options={themes}
							value={ theme }
							onChange={ ( value ) => { this.props.setAttributes( { theme: value } ); } }
					/>
				</PanelBody>
			</InspectorControls>
		);
		return (
			<Fragment>
				{ inspectorControls }
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
