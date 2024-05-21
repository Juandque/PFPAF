import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isLogged=false;
  email: string='';
  id: string='';

  constructor(private tokenService: TokenService){
    this.getid();
  }
  
  ngOnInit():void{
    this.isLogged=this.tokenService.isLogged();
    if(this.isLogged){
      this.email=this.tokenService.getEmail();
    }
  }

  public logOut(){
    this.tokenService.logOut();
  }

  public getid(){
    this.id= this.tokenService.getId();
  }
}
