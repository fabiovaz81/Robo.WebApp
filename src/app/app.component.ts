import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ControleRoboComponent } from './components/controle-robo/controle-robo.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MovimentoRoboService } from './services/movimento-robo.service';
import { ControleRoboService } from './services/controle-robo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ControleRoboComponent, HttpClientModule, FormsModule],
  providers: [MovimentoRoboService, ControleRoboService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'R.O.B.O.';
}
