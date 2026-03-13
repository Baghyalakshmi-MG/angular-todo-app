import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TDappComponent } from './tdapp/tdapp.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,TDappComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '';

}
