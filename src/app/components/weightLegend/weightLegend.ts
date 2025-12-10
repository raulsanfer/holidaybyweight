import { CommonModule } from '@angular/common';
import { HolidayWeight, WeightColor } from './../../interfaces/holidays';
import { Component, effect, input, output } from '@angular/core';

@Component({
  selector: 'weight-legend',
  imports: [CommonModule],
  templateUrl: './weightLegend.html'
})
export class WeightLegend {
  items = input<HolidayWeight[]>();
  distinctDays: HolidayWeight[] = [];
  colors : WeightColor[] = [];
  distinctColors = output<WeightColor[]>();

  constructor() {
  effect(() => {
    this.distinctDays = [
    ...new Map((this.items() ?? []).map(e => [e.weight, e])).values()];
    this.colors = this.distinctDays.map(dw => {
      let color = this.valueToRGB(dw.weight);
      return { weight: dw.weight, color: color };    
    });
    this.distinctColors.emit(this.colors);
  });
 }
 
 valueToRGB(value: number): string {
  const v = Math.max(0, Math.min(1, value)) ; // clamp 0–1

  const r = Math.round(v * 255);        // rojo crece
  const g = 0;                          // verde fijo
  const b = Math.round((1 - v) * 255);  // azul decrece

  return `rgb(${r}, ${g}, ${b})`;
}
}
