import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  constructor(public authService: AuthService) { }
  
  ngOnInit(): void {
  // this.authService.getProfile()
  // .subscribe( (data) => {
  //   this.user = data; 
  //   });
  
  this.authService.user$
  .subscribe( (data) => {
    this.user = data; 
    });

  }
}
