'use strict'
var pptx = require("pptxgenjs");
var fs = require('fs')


    pptx.setAuthor('AutoPowerpoint');
    pptx.setCompany('High Street Presbyterian, Antrim');

    var fileName = "newPPT"
    var text = "Lots of text...."

    var slide = pptx.addNewSlide();
    slide.addText(text,
        { x:0.0, y:0.0, w:'100%', h:'100%', align:'c', font_size:18, color:'0088CC', fill:'F1F1F1' })
    slide.bkgd  = 'fd7a16';
    slide.color = '696969'

    return pptx.save('../public/presentations/' + fileName)



// class GenerateTestDetailsExcel{
//     constructor(){
//
//        this.workbook = new Excel.Workbook();
//
//        this.sheet = this.workbook.addWorksheet('TransactionDetails');
//         this.sheet = this.workbook.addWorksheet('PolicyListDetails');
//         this.sheet = this.workbook.addWorksheet('JobDetails');
//         this.sheet = this.workbook.addWorksheet('RequestLevelInformation');
//         this.sheet = this.workbook.addWorksheet('SwitchesInformation');
//         this.sheet = this.workbook.addWorksheet('CodeTypesInformation');
//         this.sheet = this.workbook.addWorksheet('RateFilesInformation');
//
//
//        this.transactionWorksheet = this.workbook.getWorksheet('TransactionDetails');
//         this.policyListWorksheet = this.workbook.getWorksheet('PolicyListDetails');
//         this.jobDetailsWorksheet = this.workbook.getWorksheet('JobDetails')
//         this.requestLevelWorksheet = this.workbook.getWorksheet('RequestLevelInformation');
//         this.switchesWorksheet = this.workbook.getWorksheet('SwitchesInformation');
//         this.codeTypesWorksheet = this.workbook.getWorksheet('CodeTypesInformation');
//         this.rateFilesWorksheet = this.workbook.getWorksheet('RateFilesInformation');
//     }
//
//
//    generate(transData, policyList, jobList, fileName)  {
//
//        this.transactionWorksheet = this.formatWorksheet(this.transactionWorksheet, this.generateTransactionColumns());
//         this.getTransactionDetailsArray(transData).forEach((row) => {
//             console.log(row)
//             this.transactionWorksheet.addRow(row)
//         })
//
//        this.policyListWorksheet = this.formatWorksheet(this.policyListWorksheet, this.generatePolicyListColumns());
//         let policyDetailsArray = this.getPolicyDetailsArray(policyList)
//         policyDetailsArray.forEach(row => {
//             this.policyListWorksheet.addRow(row)
//         })
//
//        this.jobDetailsWorksheet = this.formatWorksheet(this.jobDetailsWorksheet, this.generateJobDetailsColumns());
//         let jobDetailsArray = this.getJobDetailsRowArray(jobList)
//         jobDetailsArray.forEach(row =>  {
//             this.jobDetailsWorksheet.addRow(row)
//         })
//
//        this.requestLevelWorksheet = this.formatWorksheet(this.requestLevelWorksheet, this.generateRequestLevelColumns());
//         transData.forEach(row => {
//             this.requestLevelWorksheet.addRow(row)
//         })
//
//        this.switchesWorksheet = this.formatWorksheet(this.switchesWorksheet, this.generateSwitchesColumns());
//         transData.forEach((trans)=>{
//             let switchRowArray = this.getSwitchRowArray(trans)
//             switchRowArray.forEach(row =>  {
//                 this.switchesWorksheet.addRow(row)
//             })
//         })
//
//        this.codeTypesWorksheet = this.formatWorksheet(this.codeTypesWorksheet, this.generateCodeTypesColumns());
//         transData.forEach(trans => {
//             let codeTypesArray = this.getCodeTypesArray(trans)
//             codeTypesArray.forEach(row =>  {
//                 this.codeTypesWorksheet.addRow(row)
//             })
//         })
//
//        this.rateFilesWorksheet = this.formatWorksheet(this.rateFilesWorksheet, this.generateRateFileColumns());
//         transData.forEach(trans => {
//             let rateFilesArray = this.getRateFilesArray(trans)
//             rateFilesArray.forEach((row)=> {
//                 this.rateFilesWorksheet.addRow(row)
//             })
//         })
//
//        return this.workbook.xlsx.writeFile(__dirname + "/../public/"+fileName).then(function(err){
//             return true;
//         })
//     }
