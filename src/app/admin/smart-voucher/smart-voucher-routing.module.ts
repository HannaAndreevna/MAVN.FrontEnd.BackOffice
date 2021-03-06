import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SmartVoucherListPageComponent} from './smart-voucher-list-page/smart-voucher-list-page.component';
import {SmartVoucherAddComponent} from './smart-voucher-add/smart-voucher-add.component';
import {SmartVoucherEditComponent} from './smart-voucher-edit/smart-voucher-edit.component';

const routes: Routes = [
  {
    path: '',
    component: SmartVoucherListPageComponent
  },
  {
    path: 'add-smart-voucher',
    component: SmartVoucherAddComponent
  },
  {
    path: `edit-smart-voucher/:id`,
    component: SmartVoucherEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmartVoucherRoutingModule {}
