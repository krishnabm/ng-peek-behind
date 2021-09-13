
  

# NgPeekBehind  

Utility directive to peek behind overlay panels and dialogs.

## Usage

  

	<div class="cdk-overlay-pane dialog">
		<!--Nested inside-->
		<button
			[libPeekBehind]="'cdk-overlay-pane'"
			[libPeekBehindTrigger]="showPanel"
		>
		</button>
	</div>

Setting `showPanel = false` will fade away the dialog and `showPanel = true` will fade it in.


## Inputs
|Input| Type|Value | Default
|--|--|--|--|
|libPeekBehind|`string`| Class to identify parent overlay dialog.|`'cdk-overlay-dialog'`|
|libPeekBehindTrigger|`boolean`| This input triggers the fade in/out transitions. <br />`true` will fade in the dialog. <br />`false` will fade out the dialog.|-|


## Fallback directive
`libPeekBehind` directive uses Angular's Animations and AnimationBuilder under the hood. In case you are not happy with the responsiveness, consider using `libPeekBehindListener` which relies on `@HostListener`s to do the job.

In `libPeekBehindListener`, the peeker will listen for `mousedown` event on the attached element to fade out and `document:mouseup` event to fade in, custom trigger cannot be configured -

### Inputs
|Input| Type|Value | Default
|--|--|--|--|
|libPeekBehindListener|`string`| Class to identify parent overlay dialog.|`'cdk-overlay-dialog'`|

### Usage
	<div class="cdk-overlay-pane dialog">
		<!--Nested inside-->
		<button
			[libPeekBehindListener]="'cdk-overlay-pane'"
		>
		</button>
	</div>

