import { ChangeDetectionStrategy, Component, effect, output, signal, WritableSignal } from '@angular/core';
import { RegionKV, regionsKV } from '../../interfaces/holidays';

@Component({
  selector: 'region-selector-adv',
  imports: [],
  templateUrl: './region-selector-adv.html'
})
export class RegionSelectorAdv {
  $selectChanged: WritableSignal<string | null> = signal(null);
  placeholder = '— Selecciona una región —';
  displayed: RegionKV[] = Object.entries(regionsKV).map(([key, value]) => ({ key, value }));
  value = output<string>();
  /**
   *
   */
  constructor() {
    effect(() => {
      console.log('Region selected:', this.$selectChanged());
    });
  }

  emitirValor(e: Event): void {
    const selectElement = e.target as HTMLSelectElement;
    this.$selectChanged.set(selectElement.value || null);
    this.value.emit(selectElement.value);
    //console.log('Valor seleccionado:', this.$selectChanged());
  }

 }
