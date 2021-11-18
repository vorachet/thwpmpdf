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
exports.DocPOAT = void 0;
const pdf_lib_1 = require("pdf-lib");
const SystemType_1 = require("./SystemType");
const fontkit = __importStar(require("@pdf-lib/fontkit"));
const fs = __importStar(require("fs"));
class DocPOAT extends SystemType_1.IDoc {
    constructor() {
        super();
        this.templatePath = "./templates/poat.pdf";
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
            const outputFilepath = `${outDir}/${employee.nameEng.replace(/\s/g, "")}_POAT.pdf`;
            fs.writeFileSync(outputFilepath, newPDFfDocBytes);
            console.log("file created at " + outputFilepath);
        });
    }
    implement(pages, employee, employer) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.drawText(pages[0], {
                text: employer.business.name,
                x: 380,
                y: 630,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.applicationDate[0],
                x: 307,
                y: 607,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.applicationDate[1],
                x: 370,
                y: 607,
            });
            yield this.drawText(pages[0], {
                text: employee.workPermit.applicationDate[2],
                x: 467,
                y: 607,
            });
            yield this.drawText(pages[0], {
                text: employee.name,
                x: 300,
                y: 570,
            });
            yield this.drawText(pages[0], {
                text: employee.nationality,
                x: 120,
                y: 550,
            });
            yield this.drawText(pages[0], {
                text: employee.foreignerCardId[0] + "",
                x: 303,
                y: 550,
            });
            yield this.drawText(pages[0], {
                text: employee.foreignerCardId[1] + "",
                x: 325,
                y: 550,
            });
            yield this.drawText(pages[0], {
                text: employee.foreignerCardId[2] + "",
                x: 339,
                y: 550,
            });
            yield this.drawText(pages[0], {
                text: employee.foreignerCardId[3] + "",
                x: 352,
                y: 550,
            });
            yield this.drawText(pages[0], {
                text: employee.foreignerCardId[4] + "",
                x: 365,
                y: 550,
            });
            yield this.drawText(pages[0], {
                text: employee.foreignerCardId[5] + "",
                x: 388,
                y: 550,
            });
            yield this.drawText(pages[0], {
                text: employee.foreignerCardId[6] + "",
                x: 401,
                y: 550,
            });
            yield this.drawText(pages[0], {
                text: employee.foreignerCardId[7] + "",
                x: 414,
                y: 550,
            });
            yield this.drawText(pages[0], {
                text: employee.foreignerCardId[8] + "",
                x: 426,
                y: 550,
            });
            yield this.drawText(pages[0], {
                text: employee.foreignerCardId[9] + "",
                x: 439,
                y: 550,
            });
            yield this.drawText(pages[0], {
                text: employee.foreignerCardId[10] + "",
                x: 463,
                y: 550,
            });
            yield this.drawText(pages[0], {
                text: employee.foreignerCardId[11] + "",
                x: 476,
                y: 550,
            });
            yield this.drawText(pages[0], {
                text: employee.foreignerCardId[12] + "",
                x: 498,
                y: 550,
            });
            yield this.drawText(pages[0], {
                text: employer.poatReason,
                x: 150,
                y: 495,
            });
            yield this.drawText(pages[0], {
                text: employer.poatPersonName,
                x: 260,
                y: 400,
            });
            yield this.drawText(pages[0], {
                text: employer.address.id,
                x: 130,
                y: 382,
            });
            yield this.drawText(pages[0], {
                text: employer.address.mooOrBuilding,
                x: 200,
                y: 382,
            });
            yield this.drawText(pages[0], {
                text: employer.address.soi,
                x: 270,
                y: 382,
            });
            yield this.drawText(pages[0], {
                text: employer.address.road,
                x: 420,
                y: 382,
            });
            yield this.drawText(pages[0], {
                text: employer.address.tambonOrKhang,
                x: 130,
                y: 364,
            });
            yield this.drawText(pages[0], {
                text: employer.address.aumphoeOrKate,
                x: 250,
                y: 364,
            });
            yield this.drawText(pages[0], {
                text: employer.address.province,
                x: 420,
                y: 364,
            });
            yield this.drawText(pages[0], {
                text: employer.poatPersonName,
                x: 210,
                y: 310,
            });
            yield this.drawText(pages[0], {
                text: employee.name,
                x: 270,
                y: 230,
            });
            yield this.drawText(pages[0], {
                text: employer.poatPersonName,
                x: 270,
                y: 175,
            });
        });
    }
}
exports.DocPOAT = DocPOAT;
//# sourceMappingURL=DocPOAT.js.map