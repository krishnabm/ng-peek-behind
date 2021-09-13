import {
  animate,
  AnimationBuilder,
  AnimationMetadata,
  AnimationPlayer,
  style
} from '@angular/animations';
import {
  Directive,
  ElementRef,
  Input
} from '@angular/core';

@Directive({
  selector: '[libPeekBehind]',
})
export class NgPeekBehindDirective {
  //#region properties
  private element: HTMLElement;
  private panelParentElement: HTMLElement;
  private peekPanelClass: string;
  private player: AnimationPlayer;
  //#endregion

  //#region Inputs
  @Input()
  public set libPeekBehind(val: string) {
    this.peekPanelClass = val;

    this.element = this.host.nativeElement;
    this.panelParentElement = this.element.closest(
      '.' + (this.peekPanelClass || 'cdk-overlay-pane')
    ) as HTMLElement;
  }

  @Input()
  public set libPeekBehindTrigger(show: boolean) {
    if (this.player) {
      this.player.destroy();
    }

    const metadata = show ? this.fadeIn() : this.fadeOut();
    const factory = this.builder.build(metadata);

    if (this.panelParentElement) {
      this.player = factory.create(this.panelParentElement);
      this.player.play();
    } else {
      throw new Error('NgPeekBehindDirective: Couldn\'t find parent panel');
    }
  }
  //#endregion

  constructor(private host: ElementRef, private builder: AnimationBuilder) {
  }

  //#region Lifecycle hooks
  //#endregion

  //#region methods
  private fadeIn(fullOpacity: number = 1): AnimationMetadata[] {
    return [
      style({ opacity: '*' }),
      animate('400ms ease-in', style({ opacity: fullOpacity })),
    ];
  }

  private fadeOut(fadeOpacity: number = 0): AnimationMetadata[] {
    return [
      style({ opacity: '*' }),
      animate('400ms ease-in', style({ opacity: fadeOpacity })),
    ];
  }
  //#endregion
}
