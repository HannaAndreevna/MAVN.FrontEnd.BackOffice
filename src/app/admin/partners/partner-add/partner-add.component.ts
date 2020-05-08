import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {PartnersService} from '../partners.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {Partner} from '../models/partner.interface';
import {PartnerInfo} from '../models/partner-info.interface';
import {HeaderMenuService} from 'src/app/shared/services/header-menu.service';
import {PaymentProvidersService} from '../services/payment-providers.service';
import {Provider} from '../models/provider.interface';
@Component({
  selector: 'app-partner-add',
  templateUrl: './partner-add.component.html',
  styleUrls: ['./partner-add.component.scss'],
})
export class PartnerAddComponent implements OnInit {
  @ViewChild('subHeaderTemplate', {static: true}) private subHeaderTemplate: TemplateRef<any>;
  isFormDisabled = false;
  loading = false;
  partner: Partner;
  provider: Provider;
  partnerId: string;
  constructor(
    private partnersService: PartnersService,
    private paymentProvidersService: PaymentProvidersService,
    private snackBar: MatSnackBar,
    private router: Router,
    private headerMenuService: HeaderMenuService
  ) {}

  ngOnInit() {
    this.headerMenuService.headerMenuContent = {
      title: 'New Partner',
      subHeaderContent: this.subHeaderTemplate,
    };
  }

  onFormSubmit(partner: PartnerInfo) {
    const {partnerDetails, partnerProviderDetails} = partner;
    this.isFormDisabled = true;
    this.loading = true;
    this.partnersService.add(partnerDetails).subscribe((result: any) => {
      partnerProviderDetails.PartnerId = result.PartnerId;
      this.paymentProvidersService.create(partnerProviderDetails).subscribe(
        () => {
          this.snackBar.open('You have created partner successfully ', 'Close', {
            duration: 5000,
          });

          this.router.navigate(['/admin/platform/partners']);
        },
        () => {
          this.loading = false;
          this.isFormDisabled = false;
          this.snackBar.open('Something went wrong. Please try again', 'Close', {
            duration: 5000,
          });
        }
      );
    });
  }
}
