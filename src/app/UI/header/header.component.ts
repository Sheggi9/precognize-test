import { Component, OnInit } from '@angular/core';
import {UserStoreService} from "@services";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentProfileId: number | undefined;
  constructor(private userStoreService: UserStoreService) {}

  ngOnInit(): void {
    this.currentProfileId = this.userStoreService.user?.id
  }

}
