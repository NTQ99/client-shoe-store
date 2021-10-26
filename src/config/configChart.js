export const localeChartConfig = {
  name: "vi",
  options: {
    months: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    shortMonths: [
      "Thg 1",
      "Thg 2",
      "Thg 3",
      "Thg 4",
      "Thg 5",
      "Thg 6",
      "Thg 7",
      "Thg 8",
      "Thg 9",
      "Thg 10",
      "Thg 11",
      "Thg 12",
    ],
    days: [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy",
    ],
    shortDays: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
    toolbar: {
      exportToSVG: "Tải xuống SVG",
      exportToPNG: "Tải xuống PNG",
      exportToCSV: "Tải xuống CSV",
      menu: "Bảng chọn",
      selection: "Lựa chọn",
      selectionZoom: "Thu phóng lựa chọn",
      zoomIn: "Thu nhỏ",
      zoomOut: "Phóng to",
      pan: "Con trỏ",
      reset: "Đặt lại thu phóng",
    },
  },
};

export const donutChartConfig = {
  options: {
    chart: {
      toolbar: {
        show: true,
        tools: {
          download: true
        },
        export: {
          csv: {
            filename: "sl_don_hang",
            columnDelimiter: ',',
            headerCategory: 'Phân loại',
            headerValue: 'Số lượng',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString()
            }
          },
          svg: {
            filename: "sl_don_hang",
          },
          png: {
            filename: "sl_don_hang",
          }
        }
      },
    },
    labels: ["Giao thành công", "Giao thất bại", "Đang vận chuyển", "Khác"],
    colors: ["#00e396", "#ff4560", "#008ffb", "#feb019"],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontFamily: "Poppins,Helvetica,sans-serif",
    },
    plotOptions: {
      pie: {
        size: 200,
        expandOnClick: false,
        donut: {
          size: "50%",
          labels: {
            show: true,
            value: {
              show: true,
              offsetY: 0,
              fontSize: "20px",
              fontFamily: "Poppins,Helvetica,sans-serif",
              fontWeight: 600,
            },
            total: {
              showAlways: true,
              show: true,
              label: "Tổng",
              fontSize: "12px",
              fontFamily: "Poppins,Helvetica,sans-serif",
            },
          },
        },
      },
    },
  },
};

export const areaChartConfig = {
  series: [
    {
      name: "Doanh thu",
      data: [],
    },
    {
      name: "Lợi nhuận",
      data: [],
    },
  ],
  options: {
    chart: {
      locales: [localeChartConfig],
      defaultLocale: "vi",
      height: 350,
      type: "area",
      toolbar: {
        export: {
          csv: {
            filename: "loi_nhuan",
            columnDelimiter: ',',
            headerCategory: 'Thời gian',
            dateFormatter(timestamp) {
              return new Date(timestamp).toLocaleDateString('vi-VI');
            }
          },
          svg: {
            filename: "loi_nhuan",
          },
          png: {
            filename: "loi_nhuan",
          }
        }
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeFormatter: {
          year: "yyyy",
          month: "MM/yyyy",
          day: "dd MMM",
          hour: "HH:mm",
        },
      },
      categories: [],
    },
    tooltip: {
      x: {
        format: "dd/MM",
        labels: {
          datetimeFormatter: {
            year: "yyyy",
            month: "MM/yyyy",
            day: "dd/MM",
            hour: "HH:mm",
          },
        },
      },
    },
  },
};