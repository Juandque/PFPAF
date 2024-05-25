import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { GestionNegociosComponent } from './componentes/gestion-negocios/gestion-negocios.component';
import { CrearNegocioComponent } from './componentes/crear-negocio/crear-negocio.component';
import { DetalleNegocioPropietarioComponent } from './componentes/detalle-negocio-propietario/detalle-negocio-propietario.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { FavoritosComponent } from './componentes/favoritos/favoritos.component';
import { ExplorarNegociosComponent } from './componentes/explorar-negocios/explorar-negocios.component';
import { DetalleNegocioComponent } from './componentes/detalle-negocio/detalle-negocio.component';
import { ComentariosNegocioComponent } from './componentes/comentarios-negocio/comentarios-negocio.component';
import { InformacionNegocioComponent } from './componentes/informacion-negocio/informacion-negocio.component';
import { LoginGuard } from './servicios/permiso.service';
import { ActualizarNegocioPropioComponent } from './componentes/actualizar-negocio-propio/actualizar-negocio-propio.component';
import { ComentariosNegocioPropioComponent } from './componentes/comentarios-negocio-propio/comentarios-negocio-propio.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';
export const routes: Routes = [
{ path: '', component: InicioComponent },
{ path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
{ path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
{ path: "busqueda/:texto", component: BusquedaComponent },
{ path: "gestion-negocios", component: GestionNegociosComponent },
{ path: "explorar-negocios", component: ExplorarNegociosComponent},
{ path: "favoritos", component: FavoritosComponent},
{ path: "detalle-negocio/:codigo", component: DetalleNegocioComponent},
{ path: "crear-negocio", component: CrearNegocioComponent },
{ path: "actualizar-negocio-propio/:codigo", component: ActualizarNegocioPropioComponent},
{ path: "comentarios-negocio/:codigo", component: ComentariosNegocioComponent},
{ path: "comentarios-negocio-propio/:codigo", component: ComentariosNegocioPropioComponent},
{ path: "informacion-negocio/:codigo", component: InformacionNegocioComponent},
{ path: "detalle-negocio-propietario/:codigo", component: DetalleNegocioPropietarioComponent },
{ path: "perfil/:codigo", component: PerfilComponent},
{ path: "**", pathMatch: "full", redirectTo: "" }
];