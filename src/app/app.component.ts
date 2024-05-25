import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { TokenService } from './servicios/token.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Unilocal';
  isLogged=false;
  email: string='';
  footer= 'Universidad del Quindio 2024-1'

  constructor(private tokenService: TokenService){}

  ngOnInit():void{
    this.isLogged=this.tokenService.isLogged();
    if(this.isLogged){
      this.email=this.tokenService.getEmail();
    }
  }

  public logOut(){
    this.tokenService.logOut();
  }
}
