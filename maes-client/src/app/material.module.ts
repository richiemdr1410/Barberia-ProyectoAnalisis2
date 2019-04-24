import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatMenuModule,
  MatCheckboxModule, MatInputModule,
  MatSidenavModule, MatSnackBarModule,
  MatTooltipModule, MatOptionModule,
  MatProgressBarModule, MatSliderModule,
  MatProgressSpinnerModule, MatTabsModule,
  MatDialogModule, MatGridListModule,
  MatIconModule, MatSelectModule,
  MatAutocompleteModule, MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule, MatPaginatorModule,
  MatSortModule, MatExpansionModule, MatSlideToggleModule,
  MatCardModule, MatToolbarModule,
  MatListModule, MatRadioModule,
  MatStepperModule, MatFormFieldModule,
  MatChipsModule, MatButtonToggleModule,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  DateAdapter
} from '@angular/material';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { CdkTableModule } from '@angular/cdk/table';


const MATERIAL_MODULES = [
  MatButtonModule, MatMenuModule, MatCheckboxModule, MatInputModule,
  MatSidenavModule, MatSnackBarModule, MatTooltipModule, MatOptionModule,
  MatProgressBarModule, MatSliderModule, MatProgressSpinnerModule, MatTabsModule,
  MatDialogModule, MatGridListModule, MatIconModule, MatSelectModule,
  MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatTableModule,
  MatPaginatorModule, MatSortModule, MatExpansionModule, MatSlideToggleModule,
  MatCardModule, MatToolbarModule, MatListModule, MatRadioModule,
  MatStepperModule, MatFormFieldModule, MatChipsModule, MatButtonToggleModule,
  MaterialFileInputModule
];

@NgModule({
  imports: [MATERIAL_MODULES],
  exports: [MATERIAL_MODULES],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-CL' },
]
})
export class MaterialModule { }
