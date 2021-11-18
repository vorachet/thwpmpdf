#! /usr/bin/env node

import * as fs from "fs";
import yargs from "yargs/yargs";
import { IJob, IDoc, IEmployee } from "./SystemType";
import { DocBT50 } from "./DocBT50";
import { DocBT46 } from "./DocBT46";
import { DocPOAT } from "./DocPOAT";
import { DocMMR } from "./DocMMRC";

const bt50Doc: IDoc = new DocBT50();
const bt46Doc: IDoc = new DocBT46();
const mmrcDoc: IDoc = new DocMMR();
const poatDoc: IDoc = new DocPOAT();

(async function () {
  var jobs = JSON.parse(fs.readFileSync("./data/kp.json", "utf8"));
  jobs.map(async (job: IJob) => {
    job.employees.map(async (employee: IEmployee) => {
      bt50Doc.build(job.outDir, employee, job.employer);
      bt46Doc.build(job.outDir, employee, job.employer);
      poatDoc.build(job.outDir, employee, job.employer);
      mmrcDoc.build(job.outDir, employee, job.employer);
    });
  });
})();
