
# NgPeekBehind

  

Utility directive to peek behind overlay panels and dialogs.

  

## Usage

	<div class="cdk-overlay-pane dialog">
	<!--Nested inside-->
		<button>
			[libPeekBehind]="'cdk-overlay-pane'"
			[libPeekBehindTrigger]="showPanel">
		</button>
	</div>
Setting `showPanel = false` will fade away the dialog and `showPanel = true` will fade it in.
