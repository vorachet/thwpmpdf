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
exports.DocBT50 = void 0;
const pdf_lib_1 = require("pdf-lib");
const SystemType_1 = require("./SystemType");
const fontkit = __importStar(require("@pdf-lib/fontkit"));
const fs = __importStar(require("fs"));
class DocBT50 extends SystemType_1.IDoc {
    constructor() {
        super();
        this.templatePath = "./templates/bt50.pdf";
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
            console.log("building BT50Doc ...");
            const existingPDFfDoc = yield pdf_lib_1.PDFDocument.load(fs.readFileSync(this.templatePath).buffer);
            const pdfDoc = yield pdf_lib_1.PDFDocument.create();
            pdfDoc.registerFontkit(fontkit);
            this.font = (yield pdfDoc.embedFont(fs.readFileSync(this.fontPath).buffer));
            const [templatePage1] = yield pdfDoc.copyPages(existingPDFfDoc, [0]);
            const [templatePage2] = yield pdfDoc.copyPages(existingPDFfDoc, [1]);
            pdfDoc.addPage(templatePage1);
            pdfDoc.addPage(templatePage2);
            const pages = pdfDoc.getPages();
            yield this.implement(pages, employee, employer);
            yield this.save(pdfDoc, outDir, employee);
        });
    }
    save(pdfDoc, outDir, employee) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPDFfDocBytes = yield pdfDoc.save();
            const outputFilepath = `${outDir}/${employee.nameEng.replace(/\s/g, "")}_BT50.pdf`;
            fs.writeFileSync(outputFilepath, newPDFfDocBytes);
            console.log("file created at " + outputFilepath);
        });
    }
    implement(pages, employee, employer) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.drawText(pages[0], {
                text: employee.name,
                x: 200,
                y: 551,
            });
            yield this.drawText(pages[0], {
                text: employee.nationality,
                x: 120,
                y: 518,
            });
            yield this.drawText(pages[0], {
                text: employee.dob,
                x: 350,
                y: 518,
            });
            yield this.drawText(pages[0], {
                text: employee.age,
                x: 495,
                y: 518,
            });
            yield this.drawText(pages[0], {
                text: employee.passport.number,
                x: 100,
                y: 460,
            });
            yield this.drawText(pages[0], {
                text: employee.passport.issuedAt,
                x: 240,
                y: 460,
            });
            yield this.drawText(pages[0], {
                text: employee.passport.stayUntilDate,
                x: 230,
                y: 405,
            });
            yield this.drawText(pages[0], {
                text: employee.passport.dateApprovedToBeForeignerByCabinet,
                x: 490,
                y: 405,
            });
            yield this.drawText(pages[0], {
                text: employee.passport.country,
                x: 420,
                y: 460,
            });
            yield this.drawText(pages[0], {
                text: employee.passport.dateOfIssue,
                x: 160,
                y: 434,
            });
            yield this.drawText(pages[0], {
                text: employee.passport.validUntilDate,
                x: 340,
                y: 434,
            });
            yield this.drawText(pages[0], {
                text: employer.name + " (" + employer.business.name + ")",
                x: 130,
                y: 320,
            });
            yield this.drawText(pages[0], {
                text: employer.address.id,
                x: 110,
                y: 290,
            });
            yield this.drawText(pages[0], {
                text: employer.address.mooOrBuilding,
                x: 235,
                y: 290,
            });
            yield this.drawText(pages[0], {
                text: employer.address.soi,
                x: 405,
                y: 290,
            });
            yield this.drawText(pages[0], {
                text: employer.address.road,
                x: 100,
                y: 260,
            });
            yield this.drawText(pages[0], {
                text: employer.address.tambonOrKhang,
                x: 245,
                y: 260,
            });
            yield this.drawText(pages[0], {
                text: employer.address.aumphoeOrKate,
                x: 435,
                y: 260,
            });
            yield this.drawText(pages[0], {
                text: employer.address.province,
                x: 100,
                y: 228,
            });
            yield this.drawText(pages[0], {
                text: employer.address.post,
                x: 245,
                y: 228,
            });
            yield this.drawText(pages[0], {
                text: employer.tel,
                x: 330,
                y: 228,
            });
            yield this.drawText(pages[0], {
                text: employer.fax,
                x: 470,
                y: 228,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.job + "(" + employee.workPermit.natureOfJob + ")",
                x: 170,
                y: 138,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.duationYears,
                x: 200,
                y: 107,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.duationMonths,
                x: 310,
                y: 107,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.duationDays,
                x: 420,
                y: 107,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.fromDate,
                x: 180,
                y: 75,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.toDate,
                x: 400,
                y: 75,
            });
            // Page2
            yield this.drawText(pages[1], {
                text: employer.address.id,
                x: 200,
                y: 770,
            });
            yield this.drawText(pages[1], {
                text: employer.address.mooOrBuilding,
                x: 310,
                y: 770,
            });
            yield this.drawText(pages[1], {
                text: employer.address.soi,
                x: 470,
                y: 770,
            });
            yield this.drawText(pages[1], {
                text: employer.address.road,
                x: 100,
                y: 740,
            });
            yield this.drawText(pages[1], {
                text: employer.address.tambonOrKhang,
                x: 245,
                y: 740,
            });
            yield this.drawText(pages[1], {
                text: employer.address.aumphoeOrKate,
                x: 435,
                y: 740,
            });
            yield this.drawText(pages[1], {
                text: employer.address.province,
                x: 100,
                y: 710,
            });
            yield this.drawText(pages[1], {
                text: employer.address.post,
                x: 245,
                y: 710,
            });
            yield this.drawText(pages[1], {
                text: employer.tel,
                x: 330,
                y: 710,
            });
            yield this.drawText(pages[1], {
                text: employer.fax,
                x: 480,
                y: 710,
            });
            yield this.drawText(pages[1], {
                text: employee.name,
                x: 320,
                y: 459,
            });
            yield this.drawText(pages[1], {
                text: employee.workPermit.applicationDate.join(" "),
                x: 342,
                y: 443,
            });
        });
    }
}
exports.DocBT50 = DocBT50;
//# sourceMappingURL=DocBT50.js.map