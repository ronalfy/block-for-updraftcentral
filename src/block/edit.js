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
		return (
			<Fragment>
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
