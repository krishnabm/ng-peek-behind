import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgPeekBehindDirective } from './ng-peek-behind.directive';

@NgModule({
  imports: [],
  declarations: [NgPeekBehindDirective],
  exports: [NgPeekBehindDirective],
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
