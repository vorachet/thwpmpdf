import { PDFDocument, PDFPage, rgb, Color } from "pdf-lib";
import { IDoc, IEmployee, IEmployer } from "./SystemType";
import * as fontkit from "@pdf-lib/fontkit";
import * as fs from "fs";

export class DocBT50 extends IDoc {
  templatePath = "./templates/bt50.pdf";
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
    console.log("building BT50Doc ...");
    const existingPDFfDoc = await PDFDocument.load(
      fs.readFileSync(this.templatePath).buffer
    );
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    this.font = (await pdfDoc.embedFont(
      fs.readFileSync(this.fontPath).buffer
    )) as unknown as ArrayBuffer;

    const [templatePage1] = await pdfDoc.copyPages(existingPDFfDoc, [0]);
    const [templatePage2] = await pdfDoc.copyPages(existingPDFfDoc, [1]);
    pdfDoc.addPage(templatePage1);
    pdfDoc.addPage(templatePage2);
    const pages: PDFPage[] = pdfDoc.getPages();
    await this.implement(pages, employee, employer);
    await this.save(pdfDoc, outDir, employee);
  }

  private async save(pdfDoc: PDFDocument, outDir: string, employee: IEmployee) {
    const newPDFfDocBytes = await pdfDoc.save();
    const outputFilepath = `${outDir}/${employee.nameEng.replace(
      /\s/g,
      ""
    )}_BT50.pdf`;
    fs.writeFileSync(outputFilepath, newPDFfDocBytes);
    console.log("file created at " + outputFilepath);
  }

  private async implement(
    pages: PDFPage[],
    employee: IEmployee,
    employer: IEmployer
  ) {
    await this.drawText(pages[0], {
      text: employee.name,
      x: 200,
      y: 551,
    });
    await this.drawText(pages[0], {
      text: employee.nationality,
      x: 120,
      y: 518,
    });

    await this.drawText(pages[0], {
      text: employee.dob,
      x: 350,
      y: 518,
    });

    await this.drawText(pages[0], {
      text: employee.age,
      x: 495,
      y: 518,
    });

    await this.drawText(pages[0], {
      text: employee.passport.number,
      x: 100,
      y: 460,
    });

    await this.drawText(pages[0], {
      text: employee.passport.issuedAt,
      x: 240,
      y: 460,
    });

    await this.drawText(pages[0], {
      text: employee.passport.stayUntilDate,
      x: 230,
      y: 405,
    });

    await this.drawText(pages[0], {
      text: employee.passport.dateApprovedToBeForeignerByCabinet,
      x: 490,
      y: 405,
    });

    await this.drawText(pages[0], {
      text: employee.passport.country,
      x: 420,
      y: 460,
    });

    await this.drawText(pages[0], {
      text: employee.passport.dateOfIssue,
      x: 160,
      y: 434,
    });

    await this.drawText(pages[0], {
      text: employee.passport.validUntilDate,
      x: 340,
      y: 434,
    });

    await this.drawText(pages[0], {
      text: employer.name + " (" + employer.business.name + ")",
      x: 130,
      y: 320,
    });

    await this.drawText(pages[0], {
      text: employer.address.id,
      x: 110,
      y: 290,
    });

    await this.drawText(pages[0], {
      text: employer.address.mooOrBuilding,
      x: 235,
      y: 290,
    });

    await this.drawText(pages[0], {
      text: employer.address.soi,
      x: 405,
      y: 290,
    });

    await this.drawText(pages[0], {
      text: employer.address.road,
      x: 100,
      y: 260,
    });
    await this.drawText(pages[0], {
      text: employer.address.tambonOrKhang,
      x: 245,
      y: 260,
    });
    await this.drawText(pages[0], {
      text: employer.address.aumphoeOrKate,
      x: 435,
      y: 260,
    });

    await this.drawText(pages[0], {
      text: employer.address.province,
      x: 100,
      y: 228,
    });

    await this.drawText(pages[0], {
      text: employer.address.post,
      x: 245,
      y: 228,
    });

    await this.drawText(pages[0], {
      text: employer.tel,
      x: 330,
      y: 228,
    });

    await this.drawText(pages[0], {
      text: employer.fax,
      x: 470,
      y: 228,
    });

    await this.drawText(pages[0], {
      text:
        employee.workPermit.job + "(" + employee.workPermit.natureOfJob + ")",
      x: 170,
      y: 138,
    });

    await this.drawText(pages[0], {
      text: employee.workPermit.duationYears,
      x: 200,
      y: 107,
    });

    await this.drawText(pages[0], {
      text: employee.workPermit.duationMonths,
      x: 310,
      y: 107,
    });

    await this.drawText(pages[0], {
      text: employee.workPermit.duationDays,
      x: 420,
      y: 107,
    });

    await this.drawText(pages[0], {
      text: employee.workPermit.fromDate,
      x: 180,
      y: 75,
    });

    await this.drawText(pages[0], {
      text: employee.workPermit.toDate,
      x: 400,
      y: 75,
    });

    // Page2
    await this.drawText(pages[1], {
      text: employer.address.id,
      x: 200,
      y: 770,
    });

    await this.drawText(pages[1], {
      text: employer.address.mooOrBuilding,
      x: 310,
      y: 770,
    });

    await this.drawText(pages[1], {
      text: employer.address.soi,
      x: 470,
      y: 770,
    });

    await this.drawText(pages[1], {
      text: employer.address.road,
      x: 100,
      y: 740,
    });
    await this.drawText(pages[1], {
      text: employer.address.tambonOrKhang,
      x: 245,
      y: 740,
    });
    await this.drawText(pages[1], {
      text: employer.address.aumphoeOrKate,
      x: 435,
      y: 740,
    });

    await this.drawText(pages[1], {
      text: employer.address.province,
      x: 100,
      y: 710,
    });

    await this.drawText(pages[1], {
      text: employer.address.post,
      x: 245,
      y: 710,
    });

    await this.drawText(pages[1], {
      text: employer.tel,
      x: 330,
      y: 710,
    });

    await this.drawText(pages[1], {
      text: employer.fax,
      x: 480,
      y: 710,
    });

    await this.drawText(pages[1], {
      text: employee.name,
      x: 320,
      y: 459,
    });

    await this.drawText(pages[1], {
      text: employee.workPermit.applicationDate.join(" "),
      x: 342,
      y: 443,
    });
  }
}
