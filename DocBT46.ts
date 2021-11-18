import { PDFDocument, PDFPage, rgb, Color } from "pdf-lib";
import {
  IDoc,
  IEmployee,
  IEmployer,
  IEmployerJuristicType,
} from "./SystemType";
import * as fontkit from "@pdf-lib/fontkit";
import * as fs from "fs";

export class DocBT46 extends IDoc {
  templatePath = "./templates/bt46.pdf";
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
    )}_BT46.pdf`;
    fs.writeFileSync(outputFilepath, newPDFfDocBytes);
    console.log("file created at " + outputFilepath);
  }

  private async implement(
    pages: PDFPage[],
    employee: IEmployee,
    employer: IEmployer
  ) {
    await this.drawText(pages[0], {
      text: employer.name + " (" + employer.business.name + ")",
      x: 260,
      y: 668,
    });

    await this.drawText(pages[0], {
      text: employer.address.full,
      x: 80,
      y: 640,
    });

    await this.drawText(pages[0], {
      text: employer.business.type,
      x: 190,
      y: 624,
    });

    if (
      employer.business.juristic.type == IEmployerJuristicType.NATURAL_PERSON
    ) {
      await this.drawText(pages[0], {
        text: "/",
        x: 82,
        y: 695,
      });
      await this.drawText(pages[0], {
        text: employer.business.juristic.number || "-",
        x: 270,
        y: 695,
      });
      await this.drawText(pages[0], {
        text: employer.business.juristic.workPermitNo || "-",
        x: 485,
        y: 695,
      });
    }

    if (
      employer.business.juristic.type ==
      IEmployerJuristicType.THAI_JURISTIC_PERSON
    ) {
      await this.drawText(pages[0], {
        text: "/",
        x: 82,
        y: 750,
      });
      await this.drawText(pages[0], {
        text: employer.business.juristic.registeredDate || "-",
        x: 214,
        y: 750,
      });
      await this.drawText(pages[0], {
        text: employer.business.juristic.number || "-",
        x: 320,
        y: 755,
      });
      await this.drawText(pages[0], {
        text: employer.business.juristic.paidUpCapitalThaiBaht || "-",
        x: 470,
        y: 755,
      });
    }

    if (
      employer.business.juristic.type ==
      IEmployerJuristicType.FOREIGN_JURISTIC_PERSON
    ) {
      await this.drawText(pages[0], {
        text: "/",
        x: 82,
        y: 723,
      });
      await this.drawText(pages[0], {
        text: employer.business.juristic.registeredDate || "-",
        x: 226,
        y: 723,
      });
      await this.drawText(pages[0], {
        text: employer.business.juristic.paidUpCapitalThaiBaht || "-",
        x: 456,
        y: 723,
      });
    }

    await this.drawText(pages[0], {
      text: employee.name,
      x: 345,
      y: 416,
    });

    await this.drawText(pages[0], {
      text: employee.nationality,
      x: 140,
      y: 400,
    });

    await this.drawText(pages[0], {
      text: employee.bloodType || "-",
      x: 400,
      y: 400,
    });

    await this.drawText(pages[0], {
      text: employer.address.full,
      x: 225,
      y: 384,
    });

    await this.drawText(pages[0], {
      text: employee.workPermit.job,
      x: 175,
      y: 369,
    });

    await this.drawText(pages[0], {
      text: employee.workPermit.natureOfJob,
      x: 175,
      y: 355,
    });

    await this.drawText(pages[0], {
      text: employer.address.full,
      x: 300,
      y: 325,
    });

    await this.drawText(pages[0], {
      text: employee.workPermit.duationYears,
      x: 150,
      y: 310,
    });

    await this.drawText(pages[0], {
      text: employee.workPermit.duationMonths,
      x: 200,
      y: 310,
    });

    await this.drawText(pages[0], {
      text: employee.workPermit.duationDays,
      x: 280,
      y: 310,
    });
    await this.drawText(pages[0], {
      text: employee.workPermit.toDate,
      x: 420,
      y: 310,
    });
    await this.drawText(pages[0], {
      text: employee.workPermit.income,
      x: 207,
      y: 282,
    });
    await this.drawText(pages[0], {
      text: employee.workPermit.reasonToHire,
      x: 70,
      y: 210,
    });
    await this.drawText(pages[0], {
      text: employer.name,
      x: 315,
      y: 105,
    });
    await this.drawText(pages[0], {
      text: employer.position,
      x: 326,
      y: 89,
    });
    await this.drawText(pages[0], {
      text: employee.workPermit.applicationDate.join(" "),
      x: 326,
      y: 73,
    });
  }
}
