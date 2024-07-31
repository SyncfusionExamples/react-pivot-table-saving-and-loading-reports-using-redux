import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PivotViewComponent, Inject, FieldList, CalculatedField, Toolbar, PDFExport, ExcelExport, ConditionalFormatting, NumberFormatting } from '@syncfusion/ej2-react-pivotview';
import { saveReport, removeReport, renameReport, loadReport, fetchReports } from './reportSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const currentReport = useSelector(state => state.reports.currentReport);
  const reportList = useSelector(state => state.reports.reportList);
  const isInitial = useSelector(state => state.reports.isInitial);
  const dataSourceSettings = JSON.parse(currentReport.report).dataSourceSettings;

  useEffect(() => {
    updateReportList(reportList, currentReport.reportName);
  });

  let pivotObj;
  let toolbarOptions = ['New', 'Save', 'SaveAs', 'Rename', 'Remove', 'Load',
    'Grid', 'Chart', 'Export', 'SubTotal', 'GrandTotal', 'Formatting', 'FieldList'];
  function savePivotReport(args) {
    if (!isInitial) {
      dispatch(saveReport(args));
    }
  }
  function fetchReport() {
    dispatch(fetchReports());
  }
  function updateReportList(list, reportName) {
    if (pivotObj) {
      const reportListObj = (
        document.querySelector(
          '#' + pivotObj.element.id + '_reportlist'
        )
      ).ej2_instances;
      if (reportListObj) {
        reportListObj[0].dataSource = list;
        reportListObj[0].value = reportName;
        reportListObj[0].refresh();
      }
    }
  }
  function loadPivotReport(args) {
    dispatch(loadReport(args.reportName));
  }
  function removePivotReport(args) {
    dispatch(removeReport(args.reportName));
  }
  function renamePivotReport(args) {
    dispatch(renameReport(args));
  }
  function newReport() {
    pivotObj.setProperties({ dataSourceSettings: { columns: [], rows: [], values: [], filters: [] } }, false);
  }
  function dataBound() {
    if (pivotObj) {
      if (isInitial) {
        dispatch(saveReport({ reportName: 'Sample Report', report: pivotObj.getPersistData() }));
      }
      pivotObj.isModified = false;
    }
  }
  return (<PivotViewComponent id='PivotView' ref={d => pivotObj = d} dataSourceSettings={dataSourceSettings} width={'100%'} height={350} showFieldList={true} allowExcelExport={true} allowConditionalFormatting={true} allowNumberFormatting={true} allowPdfExport={true} showToolbar={true} allowCalculatedField={true} displayOption={{ view: 'Both' }} gridSettings={{ columnWidth: 120 }} toolbar={toolbarOptions} dataBound={dataBound.bind(this)} newReport={newReport.bind(this)} renameReport={renamePivotReport.bind(this)} removeReport={removePivotReport.bind(this)} loadReport={loadPivotReport.bind(this)} fetchReport={fetchReport.bind(this)} saveReport={savePivotReport.bind(this)}><Inject services={[FieldList, CalculatedField, Toolbar, PDFExport, ExcelExport, ConditionalFormatting, NumberFormatting]} /></PivotViewComponent>);
};

export default App;