import { PDFDocument, PDFPage, rgb, Color } from "pdf-lib";
import {
  IDoc,
  IEmployee,
  IEmployer,
} from "./SystemType";
import * as fontkit from "@pdf-lib/fontkit";
import * as fs from "fs";

export class DocMMR extends IDoc {
  templatePath = "./templates/mmrc.pdf";
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
    const [templatePage2] = await pdfDoc.copyPages(existingPDFfDoc, [1]);
    const [templatePage3] = await pdfDoc.copyPages(existingPDFfDoc, [2]);
    const [templatePage4] = await pdfDoc.copyPages(existingPDFfDoc, [3]);
    const [templatePage5] = await pdfDoc.copyPages(existingPDFfDoc, [4]);
    pdfDoc.addPage(templatePage1);
    pdfDoc.addPage(templatePage2);
    pdfDoc.addPage(templatePage3);
    pdfDoc.addPage(templatePage4);
    pdfDoc.addPage(templatePage5);
    const pages: PDFPage[] = pdfDoc.getPages();
    await this.implement(pages, employee, employer);
    await this.save(pdfDoc, outDir, employee);
  }

  private async save(pdfDoc: PDFDocument, outDir: string, employee: IEmployee) {
    const newPDFfDocBytes = await pdfDoc.save();
    const outputFilepath = `${outDir}/${employee.nameEng.replace(
      /\s/g,
      ""
    )}_MMRC.pdf`;
    fs.writeFileSync(outputFilepath, newPDFfDocBytes);
    console.log("file created at " + outputFilepath);
  }

  private async implement(
    pages: PDFPage[],
    employee: IEmployee,
    employer: IEmployer
  ) {
    await this.drawText(pages[0], {
      text: employee.workPermit.applicationDate.join(" "),
      x: 245,
      y: 695,
    });

    await this.drawText(pages[0], {
      text: employer.business.name,
      x: 80,
      y: 675,
    });

    await this.drawText(pages[0], {
      text: employee.name,
      x: 80,
      y: 650,
    });

    await this.drawText(pages[0], {
      text: employer.address.full,
      x: 60,
      y: 605,
    });

    await this.drawText(pages[0], {
      text: employer.address.full,
      x: 60,
      y: 510,
    });

    await this.drawText(pages[0], {
      text: employee.workPermit.job,
      x: 230,
      y: 375,
    });

    await this.drawText(pages[0], {
      text: employee.workPermit.income,
      x: 130,
      y: 350,
    });

    await this.drawText(pages[0], {
      text: employee.workPermit.periodOfPay,
      x: 190,
      y: 327,
    });

    await this.drawText(pages[0], {
      text: employee.workPermit.durationFull,
      x: 230,
      y: 260,
    });

    await this.drawText(pages[0], {
      text: employer.address.full,
      x: 60,
      y: 190,
    });

    await this.drawText(pages[0], {
      text: employee.workPermit.applicationDateEng.join(" "),
      x: 455,
      y: 692,
    });
    await this.drawText(pages[0], {
      text: employer.business.nameEng,
      x: 326,
      y: 680,
    });
    await this.drawText(pages[0], {
      text: employee.nameEng,
      x: 330,
      y: 667,
    });
    await this.drawText(pages[0], {
      text: employer.address.fullEng,
      x: 320,
      y: 645,
    });
    await this.drawText(pages[0], {
      text: employee.workPermit.applicationDateEng.join(" "),
      x: 445,
      y: 610,
    });
    await this.drawText(pages[0], {
      text: employer.business.nameEng,
      x: 345,
      y: 597,
    });
    await this.drawText(pages[0], {
      text: employee.nameEng,
      x: 330,
      y: 579,
    });
    await this.drawText(pages[0], {
      text: employer.address.fullEng,
      x: 330,
      y: 556,
    });
    await this.drawText(pages[0], {
      text: employer.address.fullEng,
      x: 320,
      y: 510,
    });

    await this.drawText(pages[0], {
      text: employee.workPermit.jobEng,
      x: 330,
      y: 355,
    });

    await this.drawText(pages[0], {
      text: employee.workPermit.incomeEng,
      x: 330,
      y: 343,
    });

    await this.drawText(pages[0], {
      text: employee.workPermit.periodOfPay,
      x: 414,
      y: 332,
    });

    await this.drawText(pages[0], {
      text: employee.workPermit.durationFullEng,
      x: 490,
      y: 215,
    });

    await this.drawText(pages[0], {
      text: employer.address.fullEng,
      x: 320,
      y: 179,
    });

    await this.drawText(pages[1], {
      text: "8",
      x: 220,
      y: 765,
    });
    await this.drawText(pages[1], {
      text: "8",
      x: 490,
      y: 768,
    });

    await this.drawText(pages[1], {
      text: "6",
      x: 220,
      y: 740,
    });
    await this.drawText(pages[1], {
      text: "6",
      x: 350,
      y: 758,
    });

    await this.drawText(pages[1], {
      text: "1",
      x: 240,
      y: 650,
    });
    await this.drawText(pages[1], {
      text: "1",
      x: 330,
      y: 670,
    });

    await this.drawText(pages[1], {
      text: "13",
      x: 240,
      y: 605,
    });
    await this.drawText(pages[1], {
      text: "13",
      x: 330,
      y: 620,
    });

    await this.drawText(pages[1], {
      text: "ตามกฎหมายคุ้มครองแรงงาน",
      x: 90,
      y: 520,
    });

    await this.drawText(pages[1], {
      text: "The Labor Protection Law",
      x: 410,
      y: 570,
    });

    await this.drawText(pages[1], {
      text: "ตามกฎหมายคุ้มครองแรงงาน",
      x: 90,
      y: 420,
    });

    await this.drawText(pages[1], {
      text: "The Labor Protection Law",
      x: 460,
      y: 428,
    });

    await this.drawText(pages[1], {
      text: "ตามกฎหมายคุ้มครองแรงงาน",
      x: 90,
      y: 330,
    });

     await this.drawText(pages[4], {
       text: employer.name,
       x: 120,
       y: 425,
     });

     await this.drawText(pages[4], {
       text: employer.nameEng,
       x: 375,
       y: 490,
     });

      await this.drawText(pages[4], {
        text: employee.nameEng,
        x: 115,
        y: 365,
      });

      await this.drawText(pages[4], {
        text: employee.nameEng,
        x: 385,
        y: 400,
      });

      await this.drawText(pages[4], {
        text: employer.witness1Name,
        x: 130,
        y: 305,
      });

      await this.drawText(pages[4], {
        text: employer.witness1EngName,
        x: 370,
        y: 310,
      });

      await this.drawText(pages[4], {
        text: employer.witness2Name,
        x: 130,
        y: 245,
      });

      await this.drawText(pages[4], {
        text: employer.witness2EngName,
        x: 370,
        y: 220,
      });
  }
}
