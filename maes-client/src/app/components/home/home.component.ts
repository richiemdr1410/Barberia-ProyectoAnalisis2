import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CarouselService } from 'src/app/services/carousel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public images: any;
  public  email =  '';
  public  password = '';

  constructor(
    private  dialog:  MatDialog,
    private  router:  Router,
    public service: CarouselService
    ) { }

  ngOnInit() {
    this.getImages();
  }

  getImages(): any {
    const params = {
      orderBy: 'name',
      sortedBy: 'asc',
      searchJoin: 'and',
      page: '1',
      page_size: '100'
    };
    this.service.getCarousel(params).subscribe(
      (images) => {
        this.images = images.data;
      }
    );
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(LoginComponent, dialogConfig);
}

}
