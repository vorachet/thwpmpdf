"use strict";
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
exports.IDoc = exports.IEmployerJuristicType = void 0;
var IEmployerJuristicType;
(function (IEmployerJuristicType) {
    IEmployerJuristicType["NATURAL_PERSON"] = "NATURAL_PERSON";
    IEmployerJuristicType["THAI_JURISTIC_PERSON"] = "THAI_JURISTIC_PERSON";
    IEmployerJuristicType["FOREIGN_JURISTIC_PERSON"] = "FOREIGN_JURISTIC_PERSON";
})(IEmployerJuristicType = exports.IEmployerJuristicType || (exports.IEmployerJuristicType = {}));
class IDoc {
    drawText(page, job) {
        return __awaiter(this, void 0, void 0, function* () {
            yield page.drawText(job.text, {
                x: job.x,
                y: job.y,
                size: this.getTextSize(),
                font: this.getFont(),
                color: this.getTextColor(),
            });
        });
    }
}
exports.IDoc = IDoc;
//# sourceMappingURL=SystemType.js.map