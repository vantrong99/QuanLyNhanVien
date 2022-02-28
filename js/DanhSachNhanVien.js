function DanhSachNhanVien() {
  this.arr = [];

  this.themNhanVien = function (nhanVien) {
    this.arr.push(nhanVien);
  };

  this.timViTri = function (maNV) {
    /**
     * Tim ViTri
     * var viTri = -1; //Chưa tìm thấy
     * 0. Duyet mang mangNhanVien
     * 1. Nếu nhanVien.maNV === maNVXoa
     * 2. => Tìm được vị trí => viTri = index;
     */

    // var index = -1; // khong tim thay
    // this.arr.forEach(function (item, i) {
    //   if (item.maNV === maNV) {
    //     index = i;
    //   }
    // });
    // return index;

    return this.arr.findIndex(function (item) {
      return item.maNV === maNV;
    });
  };

  this.xoaNhanVien = function (maNV) {
    var index = this.timViTri(maNV);
    if (index !== -1) {
      //Tim thay => Xoa
      this.arr.splice(index, 1);
    }
  };

  this.layThongTinNhanVien = function (maNV) {
    // var nhanVien;
    // this.arr.forEach(function (item) {
    //   if (item.maNV === maNV) {
    //     nhanVien = item;
    //   }
    // });
    // return nhanVien;

    return this.arr.find(function (item) {
      return item.maNV === maNV;
    });
  };

  this.capNhatNhanVien = function (nhanVien) {
    /**
     * 0.Tìm vị trí nhanVien cần cập nhật
     * 1.Cập nhật nhanVien vào mảng thứ vị tri mà tìm thấy
     */
    var index = this.timViTri(nhanVien.maNV);
    if (index !== -1) {
      this.arr[index] = nhanVien;
    }
  };
}

DanhSachNhanVien.prototype.timKiemNhanVien = function (keyword) {
  /**
   *    Tạo ra 1 mảng tìm kiếm []
   * 0. Duyệt mảng arr
   * 1. Kiểm tra keyword tồn tại từng tenNV trong object không?
   * 2. Nếu tìm thấy => push mảng tìm kiếm
   * 3. trả mảng tìm kiếm
   */
  // var mangTimKiem = [];
  // this.arr.forEach(function (item) {
  //   if (item.tenNV.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
  //     mangTimKiem.push(item);
  //   }
  // });
  // return mangTimKiem;

  return this.arr.filter(function (item) {
    return item.tenNV.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
  });
};

/**
 * some => boolen: true || false
 * forEach  => duyet mang
 * map  => duyet mang, trả về mảng mới
 * find => trả về object tìm thấy trong mảng
 * findIndex => trả về số chỉ mục tìm thấy trong mảng
 * filter => trả về mảng sau khi lọc tương ứng với điều kiện
 * push => thêm vào mảng
 * splice => xóa phần tử trong mảng
 */
