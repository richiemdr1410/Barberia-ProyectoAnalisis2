import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { CarouselService } from 'src/app/services/carousel.service';
import { CarouselDataSource } from 'src/app/datasources/carousel.datasource';
import { AddCarouselComponent } from './add-carousel/add-carousel.component';
import { EditCarouselComponent } from './edit-carousel/edit-carousel.component';
import { DeleteCarouselComponent } from './delete-carousel/delete-carousel.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  public user: any;
  public role: any;

  carouseltData: CarouselDataSource | null;
  displayedColumns: Array<string> = ['name', 'description', 'enable', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private carouselService: CarouselService,
  ) { }

  ngOnInit() {
    this.auth.profile().then((response) => {
      this.user = response.user;
      this.role = response.role;
    }, (err) => {
      console.error(err);
    });

    this.carouseltData = new CarouselDataSource(this.carouselService, this.paginator);
    const params = {
      orderBy: 'name',
      sortedBy: 'asc',
      searchJoin: 'and',
      page: '1',
      page_size: '10'
    };
    this.carouseltData.get(params);
  }

  add(carousel: any): void {
    const dialogRef = this.dialog.open(AddCarouselComponent, {
      width: '250px',
      data: carousel
    });

    dialogRef.afterClosed().subscribe(result => {
      const params = {
        orderBy: 'name',
        sortedBy: 'asc',
        searchJoin: 'and',
        page: '1',
        page_size: '10'
      };
      this.carouseltData.get(params);
    });
  }

  edit(carousel: any): void {
    const dialogRef = this.dialog.open(EditCarouselComponent, {
      width: '250px',
      data: carousel
    });

    dialogRef.afterClosed().subscribe(result => {
      const params = {
        orderBy: 'name',
        sortedBy: 'asc',
        searchJoin: 'and',
        page: '1',
        page_size: '10'
      };
      this.carouseltData.get(params);
    });
  }

  public delete(carousel: any) {
    const dialogRef = this.dialog.open(DeleteCarouselComponent, {
      width: '250px',
      data: carousel
    });

    dialogRef.afterClosed().subscribe(result => {
      const params = {
        orderBy: 'name',
        sortedBy: 'asc',
        searchJoin: 'and',
        page: '1',
        page_size: '10'
      };
      this.carouseltData.get(params);
    });
  }

}
