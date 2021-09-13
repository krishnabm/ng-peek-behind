import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[libPeekBehindListener]',
})
export class NgPeekBehindListenerDirective implements OnDestroy {
  //#region properties
  private element: HTMLElement;
  private panelParentElement: HTMLElement;
  private peekPanelClass: string;
  //#endregion

  //#region Inputs
  @Input()
  public set libPeekBehindListener(val: string) {
    this.peekPanelClass = val;

    this.element = this.host.nativeElement;
    this.panelParentElement = this.element.closest(
      '.' + (this.peekPanelClass || 'cdk-overlay-pane')
    ) as HTMLElement;
  }
  //#endregion

  constructor(private host: ElementRef) {
    this.showPanelListener = this.showPanel;
    this.hidePanelListener = this.hidePanel;
  }

  //#region Lifecycle hooks
  ngOnDestroy() {
    this.showPanelListener = () => {};
    this.hidePanelListener = () => {};
  }
  //#endregion

  //#region Listeners
  @HostListener('document:mouseup', ['$event']) showPanelListener(_) {}

  @HostListener('mousedown', ['$event']) hidePanelListener(_) {}
  //#endregion

  //#region methods
  private showPanel(_) {
    if (this.host) {
      this.element = this.host.nativeElement;
      this.panelParentElement = this.element.closest(
        '.' + (this.peekPanelClass || 'cdk-overlay-pane')
      ) as HTMLElement;
      const animation = this.panelParentElement.animate([{ opacity: '100%' }], {
        duration: 400,
        fill: 'forwards',
      });
      animation.play();
    }
  }

  private hidePanel(_) {
    if (this.host) {
      this.element = this.host.nativeElement;
      this.panelParentElement = this.element.closest(
        '.' + (this.peekPanelClass || 'cdk-overlay-pane')
      ) as HTMLElement;
      const animation = this.panelParentElement.animate([{ opacity: '0%' }], {
        duration: 400,
        fill: 'forwards',
      });
      animation.play();
    }
  }
  //#endregion
}
