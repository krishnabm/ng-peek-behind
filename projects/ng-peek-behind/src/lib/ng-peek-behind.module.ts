import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgPeekBehindListenerDirective } from './ng-peek-behind-listener.directive';
import { NgPeekBehindDirective } from './ng-peek-behind.directive';

@NgModule({
  imports: [],
  declarations: [NgPeekBehindDirective, NgPeekBehindListenerDirective],
  exports: [NgPeekBehindDirective, NgPeekBehindListenerDirective],
})
export class NgPeekBehindModule {
  /**
   * Use in AppModule.
   */
  public static forRoot(): ModuleWithProviders {
    return { ngModule: NgPeekBehindModule };
  }

  /**
   * Use in features modules with lazy loading.
   */
  public static forChild(): ModuleWithProviders {
    return { ngModule: NgPeekBehindModule };
  }
}
