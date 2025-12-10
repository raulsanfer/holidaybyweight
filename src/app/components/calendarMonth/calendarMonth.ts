import { Component, ElementRef, ViewChild, AfterViewInit, inject, Signal, signal, effect, input} from '@angular/core';
import { HolidaysService } from '../../services/holidays.service';
import { Holiday, HolidayWeight, WeightColor } from '../../interfaces/holidays';

@Component({
  selector: 'calendar-month',
  imports: [],
  template: '<div #calendar class="calendar"></div>',
  styleUrls: ['./calendarMonth.css']  
})
export class CalendarMonth implements AfterViewInit{
@ViewChild('calendar', { static: true }) calendarRef!: ElementRef<HTMLDivElement>;
  
holidaysService = inject(HolidaysService);
Year = 2026;
$weightsSignal = input<HolidayWeight[]>([]);
$weightColors = input<WeightColor[]>();

vacationValues: { [key: string]: number } = {
   '1-2': 0.9,
    '1-3': 0.875,
    '1-7': 1,
    '1-8': 1,
    '1-9': 1,
    '1-10': 0.875,
    '1-13': 1,
    '1-14': 1,
    '1-15': 1,
    '1-16': 1,
    '1-17': 0.875,
    '1-20': 1,
    '1-21': 1,
    '1-22': 1,
    '1-23': 1,
    '1-24': 0.875,
    '1-27': 1,
    '1-28': 1,
    '1-29': 1,
    '1-30': 1,
    '1-31': 0.875,
    '2-3': 1,
    '2-4': 1,
    '2-5': 1,
    '2-6': 1,
    '2-7': 0.875,
    '2-10': 1,
    '2-11': 1,
    '2-12': 1,
    '2-13': 1,
    '2-14': 0.875,
    '2-17': 1,
    '2-18': 1,
    '2-19': 1,
    '2-20': 1,
    '2-21': 0.875,
    '2-24': 1,
    '2-25': 1,
    '2-26': 1,
    '2-27': 1,
    '2-28': 0.875,
    '3-3': 1,
    '3-4': 1,
    '3-5': 1,
    '3-6': 1,
    '3-7': 0.875,
    '3-10': 1,
    '3-11': 1,
    '3-12': 1,
    '3-13': 1,
    '3-14': 0.875,
    '3-17': 1,
    '3-18': 1,
    '3-19': 1,
    '3-20': 1,
    '3-21': 0.875,
    '3-24': 1,
    '3-25': 1,
    '3-26': 1,
    '3-27': 1,
    '3-28': 0.875,
    '3-31': 1,
    '4-1': 1,
    '4-2': 1,
    '4-3': 1,
    '4-4': 0.875,
    '4-7': 1,
    '4-8': 1,
    '4-9': 1,
    '4-10': 1,
    '4-11': 0.875,
    '4-14': 0.9,
    '4-15': 0.9,
    '4-16': 0.9,
    '4-21': 0.9,
    '4-22': 1,
    '4-23': 1,
    '4-24': 1,
    '4-25': 0.875,
    '4-28': 0.9,
    '4-29': 0.9,
    '4-30': 0.9,
    '5-5': 1,
    '5-6': 1,
    '5-7': 1,
    '5-8': 1,
    '5-9': 0.875,
    '5-12': 1,
    '5-13': 1,
    '5-14': 1,
    '5-16': 0.875,
    '5-19': 1,
    '5-20': 1,
    '5-21': 1,
    '5-22': 1,
    '5-23': 0.875,
    '5-26': 1,
    '5-27': 1,
    '5-28': 1,
    '5-29': 1,
    '5-30': 0.875,
    '6-2': 1,
    '6-3': 1,
    '6-4': 1,
    '6-5': 1,
    '6-6': 0.875,
    '6-9': 1,
    '6-10': 1,
    '6-11': 1,
    '6-12': 1,
    '6-13': 0.875,
    '6-16': 1,
    '6-17': 1,
    '6-18': 1,
    '6-19': 1,
    '6-20': 0.875,
    '6-23': 1,
    '6-24': 1,
    '6-25': 1,
    '6-26': 1,
    '6-27': 0.875,
    '6-30': 1,
    '7-1': 0.875,
    '7-2': 0.875,
    '7-3': 0.875,
    '7-4': 0.875,
    '7-7': 0.875,
    '7-8': 0.875,
    '7-9': 0.875,
    '7-10': 0.875,
    '7-11': 0.875,
    '7-14': 0.875,
    '7-15': 0.875,
    '7-16': 0.875,
    '7-17': 0.875,
    '7-18': 0.875,
    '7-21': 0.875,
    '7-22': 0.875,
    '7-23': 0.875,
    '7-24': 0.875,
    '7-28': 0.875,
    '7-29': 0.875,
    '7-30': 0.875,
    '7-31': 0.875,
    '8-1': 0.875,
    '8-4': 0.875,
    '8-5': 0.875,
    '8-6': 0.875,
    '8-7': 0.875,
    '8-8': 0.875,
    '8-11': 0.875,
    '8-12': 0.875,
    '8-13': 0.875,
    '8-14': 0.875,
    '8-18': 0.875,
    '8-19': 0.875,
    '8-20': 0.875,
    '8-21': 0.875,
    '8-22': 0.875,
    '8-25': 0.875,
    '8-26': 0.875,
    '8-27': 0.875,
    '8-28': 0.875,
    '8-29': 0.875,
    '9-1': 1,
    '9-2': 1,
    '9-3': 1,
    '9-4': 1,
    '9-5': 0.875,
    '9-8': 1,
    '9-9': 1,
    '9-10': 1,
    '9-11': 1,
    '9-12': 0.875,
    '9-15': 1,
    '9-16': 1,
    '9-17': 1,
    '9-18': 1,
    '9-19': 0.875,
    '9-22': 1,
    '9-23': 1,
    '9-24': 1,
    '9-25': 1,
    '9-26': 0.875,
    '9-29': 1,
    '9-30': 1,
    '10-1': 1,
    '10-2': 1,
    '10-3': 0.875,
    '10-6': 1,
    '10-7': 1,
    '10-8': 1,
    '10-9': 1,
    '10-10': 0.875,
    '10-13': 1,
    '10-14': 1,
    '10-15': 1,
    '10-16': 1,
    '10-17': 0.875,
    '10-20': 1,
    '10-21': 1,
    '10-22': 1,
    '10-23': 1,
    '10-24': 0.875,
    '10-27': 1,
    '10-28': 1,
    '10-29': 1,
    '10-30': 1,
    '10-31': 0.875,
    '11-3': 1,
    '11-4': 1,
    '11-5': 1,
    '11-6': 1,
    '11-7': 0.875,
    '11-11': 1,
    '11-12': 1,
    '11-13': 1,
    '11-14': 0.875,
    '11-17': 1,
    '11-18': 1,
    '11-19': 1,
    '11-20': 1,
    '11-21': 0.875,
    '11-24': 1,
    '11-25': 1,
    '11-26': 1,
    '11-27': 1,
    '11-28': 0.875,
    '12-1': 1,
    '12-2': 1,
    '12-3': 1,
    '12-4': 1,
    '12-5': 0.875,
    '12-9': 1,
    '12-10': 1,
    '12-11': 1,
    '12-12': 0.875,
    '12-15': 1,
    '12-16': 1,
    '12-17': 1,
    '12-18': 1,
    '12-19': 0.875,
    '12-22': 0.9,
    '12-23': 0.9,
    '12-24': 0.5,
    '12-26': 0.875,
    '12-29': 0.9,
    '12-30': 0.9,
    '12-31': 0.5
  };


constructor() {
     effect(() => {
          console.log('REGISTRADOS PESOS:', this.$weightsSignal().length);
          if(this.$weightsSignal().length > 0){
            this.generateCalendar(this.Year,'MD');
          }
          // const holidays = this.holidaysService.getHolidays();
          // holidays.forEach(element => {
          //   console.log('Holidays loaded:', element[this.query()]);
          //   console.log('Holidays nacionales:', element['NACIONALES']);
          // });
          
        });
}

private generateCalendar(year: number,state: string): void {
  
  const holidaysData = this.holidaysService.getHolidays();
  let nationalHolidays: Holiday[] = [];
  let stateHolidays: Holiday[] = [];
  holidaysData.forEach(element => {
    nationalHolidays = element['NACIONALES'];
    stateHolidays = element[state];
  });
  


  const holidays = [...nationalHolidays, ...stateHolidays];

  const calendar = this.calendarRef.nativeElement;

    for (let month = 0; month < 12; month++) {
      const monthContainer = document.createElement('div');
      monthContainer.classList.add('month');

      // Nombre del mes
      const monthName = document.createElement('div');
      monthName.classList.add('month-name');
      monthName.textContent = new Date(this.Year, month, 1).toLocaleString('default', { month: 'long' });
      monthContainer.appendChild(monthName);

      // Días de la semana
      const weekdaysContainer = document.createElement('div');
      weekdaysContainer.classList.add('weekdays');
      const weekdays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
      weekdays.forEach(day => {
        const cell = document.createElement('div');
        cell.textContent = day;
        weekdaysContainer.appendChild(cell);
      });
      monthContainer.appendChild(weekdaysContainer);

      // Contenedor de días
      const daysContainer = document.createElement('div');
      daysContainer.classList.add('days');

      const startColumn = this.getStartColumn(month, this.Year);

      // Espacios vacíos antes del primer día
      for (let i = 0; i < startColumn; i++) {
        const emptyCell = document.createElement('div');
        daysContainer.appendChild(emptyCell);
      }

      // Días del mes
      const totalDays = new Date(this.Year, month + 1, 0).getDate();
      for (let day = 1; day <= totalDays; day++) {
        const cell = document.createElement('div');
        cell.textContent = day.toString();
        cell.classList.add('day', 'noselect');

        const valueKey = `${month + 1}-${day}`;
        const currentDate = new Date(this.Year, month, day);
        const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
        const isHoliday = holidays.some(holiday => {
          const [holidayDay, holidayMonth] = holiday.day.split('-').map(Number);
          return holidayDay === day && holidayMonth === (month + 1);
        });
        const holidayName = isHoliday ? holidays.find(holiday => {
          const [holidayDay, holidayMonth] = holiday.day.split('-').map(Number);
          return holidayDay === day && holidayMonth === (month + 1);
        }) : null;
      
        const currentWeight = this.$weightsSignal().find(w => w.day.toLocaleDateString() === currentDate.toLocaleDateString());
        if (isWeekend || isHoliday) {
          cell.classList.add('disabled');
          cell.title = 'No se puede seleccionar este día';
        }else if (currentWeight === undefined)
        {
          //vale 1
          //console.log('DIA SIN PESO DEFINIDO:', currentDate);
          cell.addEventListener('click', () => this.toggleSelection(month + 1, day, '1'));
          cell.setAttribute('title', '1');
        }        
        else {

          //console.log('DIA CON PESO DEFINIDO:', currentWeight.day.toString(), currentWeight.weight.toString());
          cell.addEventListener('click', () => this.toggleSelection(month + 1, day, currentWeight.weight.toString()));
          cell.setAttribute('title', currentWeight.weight.toString());
        }

        cell.id = valueKey;
        daysContainer.appendChild(cell);
      }

      monthContainer.appendChild(daysContainer);
      calendar.appendChild(monthContainer);
    }
  }

  private getStartColumn(month: number, year: number): number {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Ajuste para que Lunes sea el primer día
  }

  private toggleSelection(month: number, day: number, value: string): void {
    console.log(`Seleccionado: ${month}-${day} (${value})`);
    // Aquí puedes implementar la lógica para marcar/desmarcar selección
  }

  ngAfterViewInit(): void {
    //this.generateCalendar(this.Year,'AN');
  } 

}
