import {
  animate,
  AnimationBuilder,
  AnimationMetadata,
  AnimationPlayer,
  style,
} from '@angular/animations';
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[libPeekBehind]',
})
export class NgPeekBehindDirective implements OnChanges {
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
  public libPeekBehindTrigger: boolean;
  //#endregion

  constructor(private host: ElementRef, private builder: AnimationBuilder) {}

  //#region Lifecycle hooks
  ngOnChanges(changes: SimpleChanges) {
    if (
      changes &&
      changes.libPeekBehindTrigger &&
      !changes.libPeekBehindTrigger.isFirstChange()
    ) {
      const show = changes.libPeekBehindTrigger.currentValue;

      if (this.player) {
        this.player.destroy();
      }

      const metadata = show ? this.fadeIn() : this.fadeOut();
      const factory = this.builder.build(metadata);

      if (this.panelParentElement) {
        this.player = factory.create(this.panelParentElement);
        this.player.play();
      } else {
        throw new Error("NgPeekBehindDirective: Couldn't find parent panel");
      }
    }
  }
  //#endregion

  //#region Listeners
  // @HostListener('document:mouseup', ['$event']) showPanel(_) {
  //   if (this.host) {
  //     this.element = this.host.nativeElement;
  //     this.panelParentElement = this.element.closest(
  //       '.' + (this.peekPanelClass || 'cdk-overlay-pane')
  //     ) as HTMLElement;
  //     const animation = this.panelParentElement.animate([{ opacity: '100%' }], {
  //       duration: 400,
  //       fill: 'forwards',
  //     });
  //     animation.play();
  //   }
  // }

  // @HostListener('mousedown', ['$event']) hidePanel(_) {
  //   if (this.host) {
  //     this.element = this.host.nativeElement;
  //     this.panelParentElement = this.element.closest(
  //       '.' + (this.peekPanelClass || 'cdk-overlay-pane')
  //     ) as HTMLElement;
  //     const animation = this.panelParentElement.animate([{ opacity: '0%' }], {
  //       duration: 400,
  //       fill: 'forwards',
  //     });
  //     animation.play();
  //   }
  // }
  //#endregion

  //#region methods
  private fadeIn(fullOpacity: number = 1): AnimationMetadata[] {
    return [
      style({ opacity: 0 }),
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
