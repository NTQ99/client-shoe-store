import {addressData} from '../config/dvhcvn';
export class Timer {
  constructor(fn, t) {
    this.fn = fn;
    this.t = t;
    this.timerObj = setInterval(fn, t);
  }
  stop = () => {
    if (this.timerObj) {
      clearInterval(this.timerObj);
      this.timerObj = null;
    }
    return this;
  };

  // start timer using current settings (if it's not already running)
  start = async () => {
    if (!this.timerObj) {
      this.stop();
      await this.fn();
      this.timerObj = setInterval(this.fn, this.t);
    }
    return this;
  };

  // start with new or original interval, stop current interval
  reset = async () => {
    return this.stop().start();
  };
}

export const getTimeFormat = (date, format) => {
  date = new Date(date);
  return format
    .replace("dd", ("0" + date.getDate()).slice(-2))
    .replace("mm", ("0" + (date.getMonth() + 1)).slice(-2))
    .replace("yyyy", date.getFullYear())
    .replace("yy", ("0" + date.getFullYear()).slice(-2))
    .replace("HH", ("0" + date.getHours()).slice(-2))
    .replace("MM", ("0" + date.getMinutes()).slice(-2))
    .replace("SS", ("0" + date.getSeconds()).slice(-2));
};

export function onAddressSelect(e) {
  let deliveryTo = this.state.deliveryTo;
  let addressListRow = this.state.addressList;
  switch (e.target.id) {
    case "addressProvince":
      document.getElementById("addressDistrict").value = "-1";
      document
        .getElementById("addressProvince")
        .classList.remove("border-warning");
      const provinceId = e.target.value;
      let province = e.target.options[e.target.selectedIndex].text;
      let districtList = [];
      if (provinceId !== "-1") {
        districtList = addressData.find(
          (el) => el.level1_id === provinceId
        ).level2s;
      } else province = null;
      deliveryTo = {
        ...deliveryTo,
        provinceId: provinceId,
        province: province,
        districtId: null,
        district: null,
        wardId: null,
        ward: null,
      };
      addressListRow = {
        district: districtList,
        ward: [],
      };
      this.setState({
        deliveryTo: deliveryTo,
        addressList: addressListRow,
      });
      break;
    case "addressDistrict":
      document.getElementById("addressWard").value = "-1";
      document
        .getElementById("addressDistrict")
        .classList.remove("border-warning");
      const districtId = e.target.value;
      let district = e.target.options[e.target.selectedIndex].text;
      let wardList = [];
      if (districtId !== "-1") {
        wardList = addressData
          .find((el) => el.level1_id === this.state.deliveryTo.provinceId)
          .level2s.find((el) => el.level2_id === districtId).level3s;
      } else district = null;
      deliveryTo = {
        ...deliveryTo,
        districtId: districtId,
        district: district,
        wardId: null,
        ward: null,
      };
      addressListRow = {
        ...addressListRow,
        ward: wardList,
      };
      this.setState({
        deliveryTo: deliveryTo,
        addressList: addressListRow,
      });
      break;
    case "addressWard":
      document.getElementById("addressWard").classList.remove("border-warning");
      const wardId = e.target.value;
      let ward = e.target.options[e.target.selectedIndex].text;
      if (wardId === "-1") ward = null;
      deliveryTo = {
        ...deliveryTo,
        wardId: wardId,
        ward: ward,
      };
      this.setState({
        deliveryTo: deliveryTo,
      });
      break;
    default:
      const detail = e.target.value;
      deliveryTo = {
        ...deliveryTo,
        detail: detail,
      };
      this.setState({
        deliveryTo: deliveryTo,
      });
      break;
  }
};
export function openResponseDialog(cb) {
  return cb.then(res => {
    console.log(res);
    this.setState({
      dialogProps: {
        show: true,
        handleOk: () => this.setState({dialogProps:{...this.state.dialogProps, show: false}}),
        variant: "success",
        message: res.data.error.message
      }
    });
    return res.data;
  }).catch(error => {
    console.log(error);
    this.setState({
      dialogProps: {
        show: true,
        handleOk: () => this.setState({dialogProps:{...this.state.dialogProps, show: false}}),
        variant: "error",
        message: error.response.data? error.response.data.error.message : error.message
      }
    })
    return "error";
  }) 
}