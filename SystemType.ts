import { PDFPage, Color } from "pdf-lib";

export interface IDrawJob {
  text: string;
  x: number;
  y: number;
  size?: number;
  font?: any;
  color?: Color;
}

export enum IEmployerJuristicType {
  NATURAL_PERSON = "NATURAL_PERSON",
  THAI_JURISTIC_PERSON = "THAI_JURISTIC_PERSON",
  FOREIGN_JURISTIC_PERSON = "FOREIGN_JURISTIC_PERSON",
}
export interface IEmployer {
  name: string;
  nameEng: string;
  position: string;
  witness1Name: string;
  witness1EngName: string;
  witness2Name: string;
  witness2EngName: string;
  poatPersonName: string;
  poatReason: string;
  business: {
    name: string;
    nameEng: string;
    type: string;
    juristic: {
      type: IEmployerJuristicType;
      number: string;
      registeredDate?: string;
      paidUpCapitalThaiBaht?: string;
      workPermitNo?: string;
    };
  };
  address: {
    full: string;
    fullEng: string;
    id: string;
    mooOrBuilding: string;
    soi: string;
    road: string;
    tambonOrKhang: string;
    aumphoeOrKate: string;
    province: string;
    post: string;
  };

  tel: string;
  fax: string;
}

export interface IEmployee {
  name: string;
  nameEng: string;
  nationality: string;
  foreignerCardId: number[];
  dob: string;
  age: string;
  bloodType?: string;
  passport: {
    number: string;
    issuedAt: string;
    stayUntilDate: string;
    country: string;
    dateApprovedToBeForeignerByCabinet: string;
    dateOfIssue: string;
    validUntilDate: string;
  };
  workPermit: {
    applicationDate: string[];
    applicationDateEng: string[];
    job: string;
    jobEng: string;
    natureOfJob: string;
    durationFull: string;
    durationFullEng: string;
    duationYears: string;
    duationMonths: string;
    duationDays: string;
    fromDate: string;
    toDate: string;
    periodOfPay: string;
    income: string;
    incomeEng: string;
    reasonToHire: string;
  };
}

export interface IJob {
  outDir: string;
  employees: IEmployee[];
  employer: IEmployer;
}

export interface IDocJob {
  outDir: string;
  employee: IEmployee,
  employer: IEmployer;
}

export abstract class IDoc {
  protected async drawText(page: PDFPage, job: IDrawJob) {
    await page.drawText(job.text, {
      x: job.x,
      y: job.y,
      size: this.getTextSize(),
      font: this.getFont(),
      color: this.getTextColor(),
    });
  }
  abstract getTextSize(): number;
  abstract getFont(): any;
  abstract getTextColor(): Color;
  abstract build(outDir: string, employee: IEmployee, employer: IEmployer);
}
