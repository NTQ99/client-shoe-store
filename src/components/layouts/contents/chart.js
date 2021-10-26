import React, { Component } from "react";

import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Chart from "react-apexcharts";

import { donutChartConfig, areaChartConfig } from "../../../config/configChart";

class ChartContent extends Component {
  constructor(props) {
    super(props);
    var areaChartData = {...areaChartConfig};
    areaChartData.series[0].data = [31, 40, 28, 51, 42, 109, 100, 31, 40, 28, 51, 42, 109, 100, 31, 40, 28, 51, 42, 109, 100, 31, 40, 28, 51, 42, 109, 100, 109, 100];
    areaChartData.series[1].data = [11, 32, 45, 32, 34, 52, 41, 11, 32, 45, 32, 34, 52, 41, 11, 32, 45, 32, 34, 52, 41, 11, 32, 45, 32, 34, 52, 41, 52, 41];
    areaChartData.options.xaxis.categories = [
      "2018-09-01T00:00:00.000Z",
      "2018-09-02T00:00:00.000Z",
      "2018-09-03T00:00:00.000Z",
      "2018-09-04T00:00:00.000Z",
      "2018-09-05T00:00:00.000Z",
      "2018-09-06T00:00:00.000Z",
      "2018-09-07T00:00:00.000Z",
      "2018-09-08T00:00:00.000Z",
      "2018-09-09T00:00:00.000Z",
      "2018-09-10T00:00:00.000Z",
      "2018-09-11T00:00:00.000Z",
      "2018-09-12T00:00:00.000Z",
      "2018-09-13T00:00:00.000Z",
      "2018-09-14T00:00:00.000Z",
      "2018-09-15T00:00:00.000Z",
      "2018-09-16T00:00:00.000Z",
      "2018-09-17T00:00:00.000Z",
      "2018-09-18T00:00:00.000Z",
      "2018-09-19T00:00:00.000Z",
      "2018-09-20T00:00:00.000Z",
      "2018-09-21T00:00:00.000Z",
      "2018-09-22T00:00:00.000Z",
      "2018-09-23T00:00:00.000Z",
      "2018-09-24T00:00:00.000Z",
      "2018-09-25T00:00:00.000Z",
      "2018-09-26T00:00:00.000Z",
      "2018-09-27T00:00:00.000Z",
      "2018-09-28T00:00:00.000Z",
      "2018-09-29T00:00:00.000Z",
      "2018-09-30T00:00:00.000Z",
    ]
    this.state = {
      dateRange: {
        start: moment().startOf("month"),
        end: moment().endOf("date"),
      },
      chartData1: {
        ...donutChartConfig,
        series: [44, 55, 41, 17],
      },
      chartData2: areaChartData
    };
  }

  handleDateRange = (start, end) => {
    this.setState({ dateRange: { start, end } });
    this.setState({
      chartData2: {
        ...this.state.chartData2.options,
        series: [
          {
            name: "series1",
            data: [31, 40, 28, 51, 42, 109, 100],
          },
          {
            name: "series2",
            data: [40, 55, 65, 11, 23, 44, 33],
          },
        ],
      },
    });
  };
  render() {
    const { start, end } = this.state.dateRange;
    const { series, options } = this.state.chartData2;
    return (
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
            className="card card-custom"
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
      </div>
    );
  }
}

export default ChartContent;
