function Validation() {
  this.kiemTraRong = function (input, spanId, mess) {
    if (input.trim() === "") {
      getEle(spanId).style.display = "block";
      getEle(spanId).innerHTML = mess;
      return false;
    }
    getEle(spanId).style.display = "none";
    getEle(spanId).innerHTML = "";
    return true;
  };

  this.kiemTraDoDaiKyTu = function (input, spanId, mess, min, max) {
    if (input.length >= min && input.length <= max) {
      getEle(spanId).style.display = "none";
      getEle(spanId).innerHTML = "";
      return true;
    }
    getEle(spanId).style.display = "block";
    getEle(spanId).innerHTML = mess;
    return false;
  };

  this.kiemTraChuoi = function (input, spanId, mess) {
    var pattern = new RegExp(
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
    );
    if (pattern.test(input)) {
      getEle(spanId).style.display = "none";
      getEle(spanId).innerHTML = "";
      return true;
    }

    getEle(spanId).style.display = "block";
    getEle(spanId).innerHTML = mess;
    return false;
  };

  this.checkEmail = function (input, spanId, mess) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (input.match(mailformat)) {
      getEle(spanId).style.display = "none";
      getEle(spanId).innerHTML = "";
      return true;
    }
    getEle(spanId).style.display = "block";
    getEle(spanId).innerHTML = mess;
    return false;
  };

  this.kiemTraChucVu = function (ele, spanId, mess) {
    if (getEle(ele).selectedIndex !== 0) {
      getEle(spanId).style.display = "none";
      getEle(spanId).innerHTML = "";
      return true;
    }
    getEle(spanId).style.display = "block";
    getEle(spanId).innerHTML = mess;
    return false;
  };

  this.kiemTraMaTrung = function (input, spanId, mess, arr) {
    /**
     * 0. duyệt mảng arr. forEach()
     * 1. Kiểm tra, nếu input có trùng với manv trong từng object
     * 2. Nếu có trùng: trả ra false, báo lỗi
     * 3. Nếu không trùng: trả true, tắt thông lỗi
     */
    var status = true;
    // arr.forEach(function (item) {
    //   if (item.maNV === input) {
    //     status = false;
    //   }
    // });

    status = !arr.some(function (item) {
      return item.maNV === input;
    });

    if (status) {
      getEle(spanId).style.display = "none";
      getEle(spanId).innerHTML = "";
      return true;
    }

    getEle(spanId).style.display = "block";
    getEle(spanId).innerHTML = mess;
    return false;
  };
}
