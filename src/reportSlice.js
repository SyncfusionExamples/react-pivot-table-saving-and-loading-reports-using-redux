import { createSlice } from '@reduxjs/toolkit';
import { dataSource } from './data';

let defaultReport = {
  reportName: 'Sample Report', report: JSON.stringify({
    dataSourceSettings: {
      columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
      dataSource: dataSource,
      expandAll: false,
      filters: [],
      formatSettings: [{ name: 'Amount', format: 'C0' }],
      rows: [{ name: 'Country' }, { name: 'Products' }],
      values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }]
    }
  })
};

const reportSlice = createSlice({
  name: 'reports',
  initialState: {
    reports: [{
      reportName: 'Sample Report',
      report: defaultReport
    }],
    reportList: ['Sample Report'],
    currentReport: defaultReport,
    isInitial: true
  },
  reducers: {
    saveReport(state, action) {
      let isSave = state.reports.filter(report => report.reportName === action.payload.reportName).length > 0;
      if (!isSave) {
        state.reports.push(action.payload);
        state.reportList = state.reports.map(report => report.reportName);
      } else {
        state.reports = state.reports.map(report =>
          report.reportName === action.payload.reportName ? action.payload : report
        );
        state.isInitial = false;
      }
      state.currentReport = action.payload;
    },
    removeReport(state, action) {
      state.reports = state.reports.filter(report => report.reportName !== action.payload);
      state.reportList = state.reports.map(report => report.reportName);
      state.currentReport = state.reports[state.reports.length - 1];
    },
    renameReport(state, action) {
      state.reports = state.reports.map(report =>
        report.reportName === action.payload.reportName ? { ...report, reportName: action.payload.rename } : report
      );
      state.reportList = state.reports.map(report => report.reportName);
    },
    fetchReports(state) {
      state.reportList = state.reports.map(report => report.reportName);
    },
    loadReport(state, action) {
      state.currentReport = state.reports.filter(report => report.reportName === action.payload)[0];
    },
  },
});

export const {
  saveReport,
  saveAsReport,
  removeReport,
  renameReport,
  fetchReports,
  loadReport,
} = reportSlice.actions;

export default reportSlice.reducer;
