/*export interface Holiday {
  date: string
  start: string
  end: string
  name: string
  type: string
  rule: string
}*/
export interface RegionKV {
  key: string;
  value: string;
}
export interface HolidayWeight{
  day: Date;   // formato dd-mm
  weight: number;  // Valor del peso del festivo
}
export interface WeightColor{
  weight: number;  // Valor del peso del festivo
  color: string;   // Color asociado al peso
}
export interface Holiday {
    day: string;   // formato dd-mm
    name: string;  // Nombre del festivo
}
export const regionsKV: {[key: string]: string} = {
  "AN": "Andalucía",
  "AR": "Aragón",
  "AS": "Asturias",
  "CB": "Cantabria",
  "CE": "Ciudad de Ceuta",
  "CL": "Castilla y León",
  "CM": "Castile-La Mancha",
  "CN": "Islas Canarias",
  "CT": "Cataluña",
  "EX": "Extremadura",
  "GA": "Galicia",
  "IB": "Illes Balears",
  "MC": "Murcia Region",
  "MD": "Comunidad de Madrid",
  "ML": "Ciudad de Melilla",
  "NC": "Comunidad Foral de Navarra",
  "PV": "País Vasco",
  "RI": "La Rioja",
  "VC": "Comunitat Valenciana"
};