import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelListComponent } from './panel-list/panel-list.component';
import { RouterModule } from '@angular/router';
import { ComponentModule } from '../../components/component.module';
import { SettingsComponent } from './settings/settings.component';
import { ContactsComponent } from './contacts/contacts.component';
import { PanelComponent } from './panel.component';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { PanelService } from './panel.service';
import { PanelLogsComponent } from './panel-logs/panel-logs.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScannerComponent } from './panel-list/scanner/scanner.component';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

@NgModule({
  declarations: [PanelListComponent, PanelComponent, SettingsComponent, ContactsComponent, PanelLogsComponent, ScannerComponent],
  imports: [
    ZXingScannerModule,
    ComponentModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: '',
        component: PanelComponent,
        children: [
          { path: 'list', component: PanelListComponent },
          { path: 'contacts/:panelId', component: ContactsComponent },
          { path: 'settings/:panelId', component: SettingsComponent },
          { path: 'logs/:panelId', component: PanelLogsComponent }
        ]
      }
    ]),
    MatSlideToggleModule,
    MatMenuModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTooltipModule
  ],
  providers: [PanelService]
})
export class PanelModule {}
