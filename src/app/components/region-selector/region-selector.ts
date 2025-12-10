
import { Component, EventEmitter, forwardRef, Input, OnChanges, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RegionKV, regionsKV } from '../../interfaces/holidays';



@Component({
  selector: 'region-selector',
  templateUrl: './region-selector.html',  
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RegionSelectorComponent),
      multi: true
    }
  ]
})
export class RegionSelectorComponent implements ControlValueAccessor, OnChanges {
  @Input() regions: RegionKV[] = Object.entries(regionsKV).map(([key, value]) => ({ key, value }));
  @Input() placeholder = '— Selecciona una región —';
  @Input() enableFilter = true;
  @Input() sort = true;

  @Output() changed = new EventEmitter<string | null>();

  displayed: RegionKV[] = Object.entries(regionsKV).map(([key, value]) => ({ key, value }));
  filter = '';
  value: string | null = null;
  disabled = false;

  ngOnChanges() {
    this.refresh();
  }

  private sortByValue(data: RegionKV[]): RegionKV[] {
    return [...data].sort((a, b) => a.value.localeCompare(b.value, 'es'));
  }

  private refresh() {
    const base = this.sort ? this.sortByValue(this.regions) : [...this.regions];
    const q = this.filter.trim().toLowerCase();
    this.displayed = q ? base.filter(r => r.value.toLowerCase().includes(q)) : base;
  }

  onFilterChange(q: string) {
    this.filter = q;
    this.refresh();
  }

  onSelectChange(code: string) {
    this.value = code || null;
    this.onChange(this.value);
    this.changed.emit(this.value);
  }

  // ControlValueAccessor
  onChange: (val: string | null) => void = () => {
    console.log(this.value)
    
  };
  onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.value = value;
  }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState?(isDisabled: boolean): void { this.disabled = isDisabled; }
}
