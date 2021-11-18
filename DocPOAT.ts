import { PDFDocument, PDFPage, rgb, Color } from "pdf-lib";
import {
  IDoc,
  IEmployee,
  IEmployer,
} from "./SystemType";
import * as fontkit from "@pdf-lib/fontkit";
import * as fs from "fs";

export class DocPOAT extends IDoc {
  templatePath = "./templates/poat.pdf";
  fontPath = "./fonts/THSarabunBold.ttf";
  font: any;
  color: Color;
  constructor() {
    super();
    this.color = rgb(0, 0, 1);
    console.log("loaded");
  }

  getTextSize() {
    return 14;
  }
  getFont() {
    return this.font;
  }
  getTextColor() {
    return this.color;
  }

  async build(outDir: string, employee: IEmployee, employer: IEmployer) {
    console.log("building BT46Doc ...");
    const existingPDFfDoc = await PDFDocument.load(
      fs.readFileSync(this.templatePath).buffer
    );
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    this.font = (await pdfDoc.embedFont(
      fs.readFileSync(this.fontPath).buffer
    )) as unknown as ArrayBuffer;

    const [templatePage1] = await pdfDoc.copyPages(existingPDFfDoc, [0]);
    pdfDoc.addPage(templatePage1);
    const pages: PDFPage[] = pdfDoc.getPages();
    await this.implement(pages, employee, employer);
    await this.save(pdfDoc, outDir, employee);
  }

  private async save(pdfDoc: PDFDocument, outDir: string, employee: IEmployee) {
    const newPDFfDocBytes = await pdfDoc.save();
    const outputFilepath = `${outDir}/${employee.nameEng.replace(
      /\s/g,
      ""
    )}_POAT.pdf`;
    fs.writeFileSync(outputFilepath, newPDFfDocBytes);
    console.log("file created at " + outputFilepath);
  }

  private async implement(
    pages: PDFPage[],
    employee: IEmployee,
    employer: IEmployer
  ) {
    await this.drawText(pages[0], {
      text: employer.business.name,
      x: 380,
      y: 630,
    });

    await this.drawText(pages[0], {
      text: employee.workPermit.applicationDate[0],
      x: 307,
      y: 607,
    });

    await this.drawText(pages[0], {
      text: employee.workPermit.applicationDate[1],
      x: 370,
      y: 607,
    });

    await this.drawText(pages[0], {
      text: employee.workPermit.applicationDate[2],
      x: 467,
      y: 607,
    });

    await this.drawText(pages[0], {
      text: employee.name,
      x: 300,
      y: 570,
    });

    await this.drawText(pages[0], {
      text: employee.nationality,
      x: 120,
      y: 550,
    });

    await this.drawText(pages[0], {
      text: employee.foreignerCardId[0] + "",
      x: 303,
      y: 550,
    });

    await this.drawText(pages[0], {
      text: employee.foreignerCardId[1] + "",
      x: 325,
      y: 550,
    });

    await this.drawText(pages[0], {
      text: employee.foreignerCardId[2] + "",
      x: 339,
      y: 550,
    });

    await this.drawText(pages[0], {
      text: employee.foreignerCardId[3] + "",
      x: 352,
      y: 550,
    });

    await this.drawText(pages[0], {
      text: employee.foreignerCardId[4] + "",
      x: 365,
      y: 550,
    });

    await this.drawText(pages[0], {
      text: employee.foreignerCardId[5] + "",
      x: 388,
      y: 550,
    });

    await this.drawText(pages[0], {
      text: employee.foreignerCardId[6] + "",
      x: 401,
      y: 550,
    });

    await this.drawText(pages[0], {
      text: employee.foreignerCardId[7] + "",
      x: 414,
      y: 550,
    });

    await this.drawText(pages[0], {
      text: employee.foreignerCardId[8] + "",
      x: 426,
      y: 550,
    });

    await this.drawText(pages[0], {
      text: employee.foreignerCardId[9] + "",
      x: 439,
      y: 550,
    });

    await this.drawText(pages[0], {
      text: employee.foreignerCardId[10] + "",
      x: 463,
      y: 550,
    });

    await this.drawText(pages[0], {
      text: employee.foreignerCardId[11] + "",
      x: 476,
      y: 550,
    });

    await this.drawText(pages[0], {
      text: employee.foreignerCardId[12] + "",
      x: 498,
      y: 550,
    });

    await this.drawText(pages[0], {
      text: employer.poatReason,
      x: 150,
      y: 495,
    });

    await this.drawText(pages[0], {
      text: employer.poatPersonName,
      x: 260,
      y: 400,
    });

    await this.drawText(pages[0], {
      text: employer.address.id,
      x: 130,
      y: 382,
    });

    await this.drawText(pages[0], {
      text: employer.address.mooOrBuilding,
      x: 200,
      y: 382,
    });

    await this.drawText(pages[0], {
      text: employer.address.soi,
      x: 270,
      y: 382,
    });

    await this.drawText(pages[0], {
      text: employer.address.road,
      x: 420,
      y: 382,
    });

    await this.drawText(pages[0], {
      text: employer.address.tambonOrKhang,
      x: 130,
      y: 364,
    });

    await this.drawText(pages[0], {
      text: employer.address.aumphoeOrKate,
      x: 250,
      y: 364,
    });

    await this.drawText(pages[0], {
      text: employer.address.province,
      x: 420,
      y: 364,
    });

    await this.drawText(pages[0], {
      text: employer.poatPersonName,
      x: 210,
      y: 310,
    });

    await this.drawText(pages[0], {
      text: employee.name,
      x: 270,
      y: 230,
    });

    await this.drawText(pages[0], {
      text: employer.poatPersonName,
      x: 270,
      y: 175,
    });
  }
}
