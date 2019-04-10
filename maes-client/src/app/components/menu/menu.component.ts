import { Component, OnInit, Input } from '@angular/core';
import { Role } from 'src/app/models/role.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() role: Role;
  constructor() { }

  ngOnInit() {
  }

}
