import { Component, output } from '@angular/core';
import { read, utils } from 'xlsx';
import { HolidayWeight } from '../../interfaces/holidays';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'upload-holidayweight',
  imports: [],
  templateUrl: './upload-holidayweight.html'
})
export class UploadHolidayweight { 

items: HolidayWeight[] = [];
weights = output<HolidayWeight[]>();

  onFileSelected(event: any) {
    const file: File = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e: any) => {
      const buffer = e.target.result as ArrayBuffer;

      // ⭐ IMPORTANTE: read() y type: 'array'
      const workbook = read(buffer, { type: 'array' });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = utils.sheet_to_json(sheet, { header: 1 }) as any[];

      // Saltamos cabecera
      
      this.items = rows.slice(1).map((r: any[]) => ({
        day: this.excelDateToJSDate(r[0]),
        weight: Number(r[1])
      }));
      this.items.forEach(element => {
        console.log('Fila leída:', element.day);
      });
      console.log(this.items.length);
      this.weights.emit(this.items);
    };

    reader.readAsArrayBuffer(file);
  }

  excelDateToJSDate(serial: number): Date {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30)); // Epoch de Excel
  const days = Math.floor(serial);
  const ms = days * 24 * 60 * 60 * 1000;
  return new Date(excelEpoch.getTime() + ms);
    //return new Date((serial - 25569) * 86400 * 1000);
  }

  // onFileSelected(event: any): void {
  //   const file: File = event.target.files[0];
  //   if (!file) return;

  //   const reader: FileReader = new FileReader();

  //   reader.onload = (e: any) => {
  //   const binary = e.target.result;

  //     const workbook = XLSX.read(binary, { type: 'binary' });

  //     // 📌 Tomamos la primera hoja del libro
  //     const sheetName = workbook.SheetNames[0];
  //     const sheet = workbook.Sheets[sheetName];

  //     // 📌 Convertir hoja a JSON pero sin cabeceras
  //     const raw: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  //     // raw es un array de filas: [ [fecha, peso], [fecha, peso], ...]

  //     // Saltamos cabecera si la tiene
  //     const rows = raw.filter(r => r.length >= 2);

  //     this.items = rows.map(r => {
  //       const day = XLSX.SSF.parse_date_code(r[0]); // si viene como número Excel
  //       let date: Date;

  //       if (typeof r[0] === 'number') {
  //         // Convertir fecha numérica Excel a Date
  //         date = new Date(Date.UTC(day.y, day.m - 1, day.d));
  //       } else {
  //         // O si viene como string directamente
  //         date = new Date(r[0]);
  //       }

  //       return {
  //         day: date,
  //         weight: Number(r[1])
  //       } as HolidayWeight;
  //     });

  //     this.weights.emit(this.items);
  //   };

  //   reader.readAsBinaryString(file);
  // }
}
