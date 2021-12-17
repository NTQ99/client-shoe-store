import React, { Component } from "react";

import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Chart from "react-apexcharts";
import overlayFactory from 'react-bootstrap-table2-overlay';
import TableLoading from "../extra/table-loading";
import BootstrapTable from "react-bootstrap-table-next";
import {deliveryColumns} from '../../../config/configTable';

import { donutChartConfig, areaChartConfig } from "../../../config/configChart";
import chartService from "../../../service/chart.service";
import GeneralDialog from "../modal/GeneralDialog";

class ChartContent extends Component {
  constructor(props) {
    super(props);
    var areaChartData = {...areaChartConfig};
    areaChartData.series[0].data = [31, 40, 28, 51, 42, 109, 100, 31, 40, 28, 51, 42, 109, 100, 31, 40, 28, 51, 42, 109, 100, 31, 40, 28, 51, 42, 109, 100, 109, 100];
    areaChartData.series[1].data = [11, 32, 45, 32, 34, 52, 41, 11, 32, 45, 32, 34, 52, 41, 11, 32, 45, 32, 34, 52, 41, 11, 32, 45, 32, 34, 52, 41, 52, 41];
    areaChartData.options.xaxis.categories = [
      "2021-12-01T00:00:00.000Z",
      "2021-12-02T00:00:00.000Z",
      "2021-12-03T00:00:00.000Z",
      "2021-12-04T00:00:00.000Z",
      "2021-12-05T00:00:00.000Z",
      "2021-12-06T00:00:00.000Z",
      "2021-12-07T00:00:00.000Z",
      "2021-12-08T00:00:00.000Z",
      "2021-12-09T00:00:00.000Z",
      "2021-12-10T00:00:00.000Z",
      "2021-12-11T00:00:00.000Z",
      "2021-12-12T00:00:00.000Z",
      "2021-12-13T00:00:00.000Z",
      "2021-12-14T00:00:00.000Z",
      "2021-12-15T00:00:00.000Z",
      "2021-12-16T00:00:00.000Z",
      "2021-12-17T00:00:00.000Z",
      "2021-12-18T00:00:00.000Z",
      "2021-12-19T00:00:00.000Z",
      "2021-12-20T00:00:00.000Z",
      "2021-12-21T00:00:00.000Z",
      "2021-12-22T00:00:00.000Z",
      "2021-12-23T00:00:00.000Z",
      "2021-12-24T00:00:00.000Z",
      "2021-12-25T00:00:00.000Z",
      "2021-12-26T00:00:00.000Z",
      "2021-12-27T00:00:00.000Z",
      "2021-12-28T00:00:00.000Z",
      "2021-12-29T00:00:00.000Z",
      "2021-12-30T00:00:00.000Z",
    ]
    this.state = {
      dateRange: {
        start: moment().startOf("month"),
        end: moment().endOf("date"),
      },
      chartData1: {
        ...donutChartConfig,
        series: [1, 1, 1, 1],
      },
      chartData2: areaChartData,
      isLoading: false,
      entities: []
    };
  }

  openResponseDialog = (variant, message) => {
    this.setState({
      dialogProps: {
        show: true,
        handleOk: () => this.setState({dialogProps:{...this.state.dialogProps, show: false}}),
        variant: variant,
        message: message
      }
    });
  }

  async componentDidMount() {
    await chartService.getTopProduct().then(async res => {
      if (!res.data) return;
      if (!res.data.error) return;
      if (res.data.error.statusCode === 100) this.setState({entities: res.data.data})
      else this.openResponseDialog("error", res.data.error.message);
    }).catch(error => this.openResponseDialog("error", error.response.data.error.message));
    await chartService.getOrderReport().then(async res => {
      if (!res.data) return;
      if (!res.data.error) return;
      if (res.data.error.statusCode === 100) this.setState({chartData1: {...this.state.chartData1, series: res.data.data}})
      else this.openResponseDialog("error", res.data.error.message);
    }).catch(error => this.openResponseDialog("error", error.response.data.error.message));
  }

  handleDateRange = (start, end) => {
    this.setState({ dateRange: { start, end } });
    this.setState({
      chartData2: {
        ...this.state.chartData2.options,
        series: [
          {
            name: "Doanh thu",
            data: [31, 40, 28, 51, 42, 109, 100],
          },
          {
            name: "Lợi nhuận",
            data: [40, 55, 65, 11, 23, 44, 33],
          },
        ],
      },
    });
  };
  render() {
    const { start, end } = this.state.dateRange;
    const { series, options } = this.state.chartData2;
    const { isLoading, entities, dialogProps } = this.state;
    return (<>
      <GeneralDialog { ...dialogProps } />
      <div className="row gutter-b">
        <div className="col-lg-4 col-md-4">
          {/* begin::Card */}
          <div className="card card-custom gutter-b">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="input-group">
                    <div className="input-group-append align-items-center">
                      <label className="mr-3 mb-0 d-none d-md-block">
                        Thời gian:
                      </label>
                    </div>
                    <div className="input-group-append">
                      <span className="input-group-text" style={{borderRadius: '.42rem 0 0 .42rem'}}>
                        <i className="la la-calendar-check-o"></i>
                      </span>
                    </div>
                    {/* begin::DateRangePicker */}
                    <DateRangePicker
                      initialSettings={{
                        autoApply: true,
                        startDate: start,
                        endDate: end,
                        locale: {
                          direction: "ltr",
                          format: "DD/MM/YYYY",
                          separator: " - ",
                          applyLabel: "Đồng ý",
                          cancelLabel: "Hủy bỏ",
                          customRangeLabel: "Tùy chọn",
                        },
                        ranges: {
                          "Tháng này": [
                            moment().startOf("month"),
                            moment().endOf("date"),
                          ],
                          "Năm nay": [
                            moment().startOf("year"),
                            moment().endOf("date"),
                          ],
                          "Tháng trước": [
                            moment().subtract(1, "month").startOf("month"),
                            moment().subtract(1, "month").endOf("month"),
                          ],
                          "Nửa năm trước": [
                            moment().subtract(6, "month").startOf("month"),
                            moment().subtract(1, "month").endOf("month"),
                          ],
                        },
                      }}
                      onCallback={this.handleDateRange}
                    >
                      <input
                        type="text"
                        className="form-control"
                        readonly
                        placeholder="Chọn khoảng ngày"
                      />
                    </DateRangePicker>
                    {/* end::DateRangePicker */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end::Card */}
          {/*begin::Card*/}
          <div
            className="card card-custom gutter-b"
            // style={{ minHeight: "371px" }}
          >
            <div className="card-header">
              <div className="card-title">
                <h3 className="card-label">Tỉ lệ đơn hàng</h3>
              </div>
            </div>
            <div className="card-body">
              {/*begin::Chart*/}
              {/* <div id="chart_11" className="d-flex justify-content-center" /> */}
              <Chart
              id="donutChart"
                options={this.state.chartData1.options}
                series={this.state.chartData1.series}
                type="donut"
                height={283}
              />
              {/*end::Chart*/}
            </div>
          </div>
          {/*end::Card*/}
        </div>
        <div className="col-lg-8 col-md-8">
          {/*begin::Card*/}
          <div className="card card-custom">
            <div className="card-header">
              <div className="card-title">
                <h3 className="card-label">Biểu đồ lợi nhuận</h3>
              </div>
            </div>
            <div className="card-body">
              {/*begin::Chart*/}
              <Chart
                id="reactchart-example"
                options={options}
                series={series}
                type="area"
                height={350}
              />
              {/*end::Chart*/}
            </div>
          </div>
          {/*end::Card*/}
        </div>
        <div className="col-lg-12 col-md-12">
        {/*begin::Card*/}
        <div className="card card-custom">
          <div className="card-header">
            <div className="card-title">
              <h3 className="card-label">Top sản phẩm bán chạy</h3>
            </div>
          </div>
          <div className="card-body">
          <BootstrapTable
              loading={ isLoading }
              wrapperClasses="table-responsive"
              bordered={false}
              classes="table table-head-custom table-vertical-center overflow-scroll"
              bootstrap4
              keyField="id"
              data={entities}
              columns={deliveryColumns(this)}
              noDataIndication="Không tìm thấy bản ghi nào"
              overlay={ overlayFactory({ spinner: TableLoading(), styles: { overlay: (base) => ({...base, background: '#fff', fontSize: '13px'}) }}) }
            >
            </BootstrapTable>
          </div>
        </div>
        {/*end::Card*/}
        </div>
      </div>
    </>);
  }
}

export default ChartContent;
