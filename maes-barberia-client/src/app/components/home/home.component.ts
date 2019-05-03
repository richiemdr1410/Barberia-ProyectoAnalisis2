import { Component, OnInit } from '@angular/core';
import { CarouselService } from 'src/app/services/carousel.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imageSources: Array<any> = [];
  public  email =  '';
  public  password = '';
  images: any;

  constructor(
    public service: CarouselService,
    public seriveA: AlertService
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
        const image = images.data;
        image.forEach(element => {
          this.imageSources.push('http://127.0.0.1:8000/api/image/carousel/' + element.image);
        });
      }
    );
  }
}
