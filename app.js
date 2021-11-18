#! /usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const yargs_1 = __importDefault(require("yargs"));
const DocBT50_1 = require("./DocBT50");
const DocBT46_1 = require("./DocBT46");
const DocPOAT_1 = require("./DocPOAT");
const DocMMRC_1 = require("./DocMMRC");
const bt50Doc = new DocBT50_1.DocBT50();
const bt46Doc = new DocBT46_1.DocBT46();
const mmrcDoc = new DocMMRC_1.DocMMR();
const poatDoc = new DocPOAT_1.DocPOAT();
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const usage = "\nUsage: tran <lang_name> sentence to be translated";
        const options = yargs_1.default
            .usage(usage)
            .option("l", {
            alias: "languages",
            describe: "List all supported languages.",
            type: "boolean",
            demandOption: false,
        })
            .help(true).argv;
        if (yargs_1.default.argv.l == true || yargs_1.default.argv.languages == true) {
            var jobs = JSON.parse(fs.readFileSync("./data/kp.json", "utf8"));
            jobs.map((job) => __awaiter(this, void 0, void 0, function* () {
                job.employees.map((employee) => __awaiter(this, void 0, void 0, function* () {
                    bt50Doc.build(job.outDir, employee, job.employer);
                    bt46Doc.build(job.outDir, employee, job.employer);
                    poatDoc.build(job.outDir, employee, job.employer);
                    mmrcDoc.build(job.outDir, employee, job.employer);
                }));
            }));
            return;
        }
    });
})();
//# sourceMappingURL=app.js.map