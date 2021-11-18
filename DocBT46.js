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
exports.DocBT46 = void 0;
const pdf_lib_1 = require("pdf-lib");
const SystemType_1 = require("./SystemType");
const fontkit = __importStar(require("@pdf-lib/fontkit"));
const fs = __importStar(require("fs"));
class DocBT46 extends SystemType_1.IDoc {
    constructor() {
        super();
        this.templatePath = "./templates/bt46.pdf";
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
            pdfDoc.addPage(templatePage1);
            const pages = pdfDoc.getPages();
            yield this.implement(pages, employee, employer);
            yield this.save(pdfDoc, outDir, employee);
        });
    }
    save(pdfDoc, outDir, employee) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPDFfDocBytes = yield pdfDoc.save();
            const outputFilepath = `${outDir}/${employee.nameEng.replace(/\s/g, "")}_BT46.pdf`;
            fs.writeFileSync(outputFilepath, newPDFfDocBytes);
            console.log("file created at " + outputFilepath);
        });
    }
    implement(pages, employee, employer) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.drawText(pages[0], {
                text: employer.name + " (" + employer.business.name + ")",
                x: 260,
                y: 668,
            });
            yield this.drawText(pages[0], {
                text: employer.address.full,
                x: 80,
                y: 640,
            });
            yield this.drawText(pages[0], {
                text: employer.business.type,
                x: 190,
                y: 624,
            });
            if (employer.business.juristic.type == SystemType_1.IEmployerJuristicType.NATURAL_PERSON) {
                yield this.drawText(pages[0], {
                    text: "/",
                    x: 82,
                    y: 695,
                });
                yield this.drawText(pages[0], {
                    text: employer.business.juristic.number || "-",
                    x: 270,
                    y: 695,
                });
                yield this.drawText(pages[0], {
                    text: employer.business.juristic.workPermitNo || "-",
                    x: 485,
                    y: 695,
                });
            }
            if (employer.business.juristic.type ==
                SystemType_1.IEmployerJuristicType.THAI_JURISTIC_PERSON) {
                yield this.drawText(pages[0], {
                    text: "/",
                    x: 82,
                    y: 750,
                });
                yield this.drawText(pages[0], {
                    text: employer.business.juristic.registeredDate || "-",
                    x: 214,
                    y: 750,
                });
                yield this.drawText(pages[0], {
                    text: employer.business.juristic.number || "-",
                    x: 320,
                    y: 755,
                });
                yield this.drawText(pages[0], {
                    text: employer.business.juristic.paidUpCapitalThaiBaht || "-",
                    x: 470,
                    y: 755,
                });
            }
            if (employer.business.juristic.type ==
                SystemType_1.IEmployerJuristicType.FOREIGN_JURISTIC_PERSON) {
                yield this.drawText(pages[0], {
                    text: "/",
                    x: 82,
                    y: 723,
                });
                yield this.drawText(pages[0], {
                    text: employer.business.juristic.registeredDate || "-",
                    x: 226,
                    y: 723,
                });
                yield this.drawText(pages[0], {
                    text: employer.business.juristic.paidUpCapitalThaiBaht || "-",
                    x: 456,
                    y: 723,
                });
            }
            yield this.drawText(pages[0], {
                text: employee.name,
                x: 345,
                y: 416,
            });
            yield this.drawText(pages[0], {
                text: employee.nationality,
                x: 140,
                y: 400,
            });
            yield this.drawText(pages[0], {
                text: employee.bloodType || "-",
                x: 400,
                y: 400,
            });
            yield this.drawText(pages[0], {
                text: employer.address.full,
                x: 225,
                y: 384,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.job,
                x: 175,
                y: 369,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.natureOfJob,
                x: 175,
                y: 355,
            });
            yield this.drawText(pages[0], {
                text: employer.address.full,
                x: 300,
                y: 325,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.duationYears,
                x: 150,
                y: 310,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.duationMonths,
                x: 200,
                y: 310,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.duationDays,
                x: 280,
                y: 310,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.toDate,
                x: 420,
                y: 310,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.income,
                x: 207,
                y: 282,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.reasonToHire,
                x: 70,
                y: 210,
            });
            yield this.drawText(pages[0], {
                text: employer.name,
                x: 315,
                y: 105,
            });
            yield this.drawText(pages[0], {
                text: employer.position,
                x: 326,
                y: 89,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.applicationDate.join(" "),
                x: 326,
                y: 73,
            });
        });
    }
}
exports.DocBT46 = DocBT46;
//# sourceMappingURL=DocBT46.js.map