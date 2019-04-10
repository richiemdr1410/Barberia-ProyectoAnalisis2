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
  MatChipsModule, MatButtonToggleModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

const MATERIAL_MODULES = [
  MatButtonModule, MatMenuModule, MatCheckboxModule, MatInputModule,
  MatSidenavModule, MatSnackBarModule, MatTooltipModule, MatOptionModule,
  MatProgressBarModule, MatSliderModule, MatProgressSpinnerModule, MatTabsModule,
  MatDialogModule, MatGridListModule, MatIconModule, MatSelectModule,
  MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatTableModule,
  MatPaginatorModule, MatSortModule, MatExpansionModule, MatSlideToggleModule,
  MatCardModule, MatToolbarModule, MatListModule, MatRadioModule,
  MatStepperModule, MatFormFieldModule, MatChipsModule, MatButtonToggleModule
];

@NgModule({
  imports: [MATERIAL_MODULES],
  exports: [MATERIAL_MODULES]
})
export class MaterialModule { }
