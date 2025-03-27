import { Routes } from '@angular/router';
import { LabFinalComponent } from './lab-final';
import { LabUiAComponent } from './pages/uiA';
import { DiceStore } from './services/dice.store';
export const LAB_FINAL_ROUTES: Routes = [
  {
    path: '',
    component: LabFinalComponent,
    providers: [DiceStore],
    children: [
      {
        path: 'uiA',
        component: LabUiAComponent
      }
    ]
  },
]
