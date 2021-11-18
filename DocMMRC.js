"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocMMR = void 0;
const pdf_lib_1 = require("pdf-lib");
const SystemType_1 = require("./SystemType");
const fontkit = __importStar(require("@pdf-lib/fontkit"));
const fs = __importStar(require("fs"));
class DocMMR extends SystemType_1.IDoc {
    constructor() {
        super();
        this.templatePath = "./templates/mmrc.pdf";
        this.fontPath = "./fonts/THSarabunBold.ttf";
        this.color = pdf_lib_1.rgb(0, 0, 1);
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
    build(outDir, employee, employer) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("building BT46Doc ...");
            const existingPDFfDoc = yield pdf_lib_1.PDFDocument.load(fs.readFileSync(this.templatePath).buffer);
            const pdfDoc = yield pdf_lib_1.PDFDocument.create();
            pdfDoc.registerFontkit(fontkit);
            this.font = (yield pdfDoc.embedFont(fs.readFileSync(this.fontPath).buffer));
            const [templatePage1] = yield pdfDoc.copyPages(existingPDFfDoc, [0]);
            const [templatePage2] = yield pdfDoc.copyPages(existingPDFfDoc, [1]);
            const [templatePage3] = yield pdfDoc.copyPages(existingPDFfDoc, [2]);
            const [templatePage4] = yield pdfDoc.copyPages(existingPDFfDoc, [3]);
            const [templatePage5] = yield pdfDoc.copyPages(existingPDFfDoc, [4]);
            pdfDoc.addPage(templatePage1);
            pdfDoc.addPage(templatePage2);
            pdfDoc.addPage(templatePage3);
            pdfDoc.addPage(templatePage4);
            pdfDoc.addPage(templatePage5);
            const pages = pdfDoc.getPages();
            yield this.implement(pages, employee, employer);
            yield this.save(pdfDoc, outDir, employee);
        });
    }
    save(pdfDoc, outDir, employee) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPDFfDocBytes = yield pdfDoc.save();
            const outputFilepath = `${outDir}/${employee.nameEng.replace(/\s/g, "")}_MMRC.pdf`;
            fs.writeFileSync(outputFilepath, newPDFfDocBytes);
            console.log("file created at " + outputFilepath);
        });
    }
    implement(pages, employee, employer) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.drawText(pages[0], {
                text: employee.workPermit.applicationDate.join(" "),
                x: 245,
                y: 695,
            });
            yield this.drawText(pages[0], {
                text: employer.business.name,
                x: 80,
                y: 675,
            });
            yield this.drawText(pages[0], {
                text: employee.name,
                x: 80,
                y: 650,
            });
            yield this.drawText(pages[0], {
                text: employer.address.full,
                x: 60,
                y: 605,
            });
            yield this.drawText(pages[0], {
                text: employer.address.full,
                x: 60,
                y: 510,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.job,
                x: 230,
                y: 375,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.income,
                x: 130,
                y: 350,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.periodOfPay,
                x: 190,
                y: 327,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.durationFull,
                x: 230,
                y: 260,
            });
            yield this.drawText(pages[0], {
                text: employer.address.full,
                x: 60,
                y: 190,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.applicationDateEng.join(" "),
                x: 455,
                y: 692,
            });
            yield this.drawText(pages[0], {
                text: employer.business.nameEng,
                x: 326,
                y: 680,
            });
            yield this.drawText(pages[0], {
                text: employee.nameEng,
                x: 330,
                y: 667,
            });
            yield this.drawText(pages[0], {
                text: employer.address.fullEng,
                x: 320,
                y: 645,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.applicationDateEng.join(" "),
                x: 445,
                y: 610,
            });
            yield this.drawText(pages[0], {
                text: employer.business.nameEng,
                x: 345,
                y: 597,
            });
            yield this.drawText(pages[0], {
                text: employee.nameEng,
                x: 330,
                y: 579,
            });
            yield this.drawText(pages[0], {
                text: employer.address.fullEng,
                x: 330,
                y: 556,
            });
            yield this.drawText(pages[0], {
                text: employer.address.fullEng,
                x: 320,
                y: 510,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.jobEng,
                x: 330,
                y: 355,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.incomeEng,
                x: 330,
                y: 343,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.periodOfPay,
                x: 414,
                y: 332,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.durationFullEng,
                x: 490,
                y: 215,
            });
            yield this.drawText(pages[0], {
                text: employer.address.fullEng,
                x: 320,
                y: 179,
            });
            yield this.drawText(pages[1], {
                text: "8",
                x: 220,
                y: 765,
            });
            yield this.drawText(pages[1], {
                text: "8",
                x: 490,
                y: 768,
            });
            yield this.drawText(pages[1], {
                text: "6",
                x: 220,
                y: 740,
            });
            yield this.drawText(pages[1], {
                text: "6",
                x: 350,
                y: 758,
            });
            yield this.drawText(pages[1], {
                text: "1",
                x: 240,
                y: 650,
            });
            yield this.drawText(pages[1], {
                text: "1",
                x: 330,
                y: 670,
            });
            yield this.drawText(pages[1], {
                text: "13",
                x: 240,
                y: 605,
            });
            yield this.drawText(pages[1], {
                text: "13",
                x: 330,
                y: 620,
            });
            yield this.drawText(pages[1], {
                text: "ตามกฎหมายคุ้มครองแรงงาน",
                x: 90,
                y: 520,
            });
            yield this.drawText(pages[1], {
                text: "The Labor Protection Law",
                x: 410,
                y: 570,
            });
            yield this.drawText(pages[1], {
                text: "ตามกฎหมายคุ้มครองแรงงาน",
                x: 90,
                y: 420,
            });
            yield this.drawText(pages[1], {
                text: "The Labor Protection Law",
                x: 460,
                y: 428,
            });
            yield this.drawText(pages[1], {
                text: "ตามกฎหมายคุ้มครองแรงงาน",
                x: 90,
                y: 330,
            });
            yield this.drawText(pages[4], {
                text: employer.name,
                x: 120,
                y: 425,
            });
            yield this.drawText(pages[4], {
                text: employer.nameEng,
                x: 375,
                y: 490,
            });
            yield this.drawText(pages[4], {
                text: employee.nameEng,
                x: 115,
                y: 365,
            });
            yield this.drawText(pages[4], {
                text: employee.nameEng,
                x: 385,
                y: 400,
            });
            yield this.drawText(pages[4], {
                text: employer.witness1Name,
                x: 130,
                y: 305,
            });
            yield this.drawText(pages[4], {
                text: employer.witness1EngName,
                x: 370,
                y: 310,
            });
            yield this.drawText(pages[4], {
                text: employer.witness2Name,
                x: 130,
                y: 245,
            });
            yield this.drawText(pages[4], {
                text: employer.witness2EngName,
                x: 370,
                y: 220,
            });
        });
    }
}
exports.DocMMR = DocMMR;
//# sourceMappingURL=DocMMRC.js.map