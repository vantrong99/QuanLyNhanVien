var dsnv = new DanhSachNhanVien();
var validation = new Validation();

getLocalStorage();

getEle("btnThem").addEventListener("click", function () {
  //Dom tới nút Cập nhật cho nó ẩn
  getEle("btnCapNhat").style.display = "none";
  getEle("btnThemNV").style.display = "block";

  getEle("msnv").removeAttribute("disabled");
});

/**
 * Thêm Nhân viên
 */
getEle("btnThemNV").addEventListener("click", function () {
  // Dom tới 6 ô input lấy value
  var maNV = getEle("msnv").value;
  var tenNV = getEle("name").value;
  var email = getEle("email").value;
  var password = getEle("password").value;
  var date = getEle("datepicker").value;
  var chucVu = getEle("chucvu").value;

  var isValid = true;

  isValid &=
    validation.kiemTraRong(maNV, "tbMaNV", "(*) Manv k dc rong!") &&
    validation.kiemTraDoDaiKyTu(
      maNV,
      "tbMaNV",
      "(*) Do dai ky tu 4 - 10",
      4,
      10
    ) &&
    validation.kiemTraMaTrung(maNV, "tbMaNV", "(*) manv da ton tai!", dsnv.arr);
  isValid &=
    validation.kiemTraRong(tenNV, "tbTen", "(*) Tennv k dc rong!") &&
    validation.kiemTraChuoi(tenNV, "tbTen", "(*) Phai nhap vao chuoi");
  isValid &=
    validation.kiemTraRong(email, "tbEmail", "(*) Email k dc rong!") &&
    validation.checkEmail(email, "tbEmail", "(*) Email k dung dinh dang!");
  isValid &= validation.kiemTraRong(
    password,
    "tbMatKhau",
    "(*) Password k dc rong!"
  );
  isValid &= validation.kiemTraRong(date, "tbNgay", "(*) Date k dc rong!");
  isValid &= validation.kiemTraChucVu(
    "chucvu",
    "tbChucVu",
    "(*) Phai chon chuc vu"
  );
  /**
   * Ví dụ isValid = false => phủ định false => true
   * => Chương trình dừng thực thi
   */
  if (!isValid) return;

  var nhanVien = new NhanVien(maNV, tenNV, email, password, date, chucVu);
  dsnv.themNhanVien(nhanVien);
  taoBang(dsnv.arr);
  setLocalStorage();
  getEle("btnDong").click();
});

// function taoBang(arr) {
//   getEle("tableDanhSach").innerHTML = "";
//   for (var i = 0; i < arr.length; i++) {
//     //Tao dòng
//     var tagTR = document.createElement("tr");

//     //Tạo 5 cột: manv, tennv, email, date, chucvu
//     var tagTDMaNV = document.createElement("td");
//     var tagTDTenNV = document.createElement("td");
//     var tagTDEmail = document.createElement("td");
//     var tagTDDate = document.createElement("td");
//     var tagTDChucVu = document.createElement("td");

//     //gán nội dung cho 5 cột
//     tagTDMaNV.innerHTML = arr[i].maNV;
//     tagTDTenNV.innerHTML = arr[i].tenNV;
//     tagTDEmail.innerHTML = arr[i].email;
//     tagTDDate.innerHTML = arr[i].date;
//     tagTDChucVu.innerHTML = arr[i].chucVu;

//     //appendChild 5 cột vào dòng
//     tagTR.appendChild(tagTDMaNV);
//     tagTR.appendChild(tagTDTenNV);
//     tagTR.appendChild(tagTDEmail);
//     tagTR.appendChild(tagTDDate);
//     tagTR.appendChild(tagTDChucVu);

//     //appendChild dòng vào tbody
//     getEle("tableDanhSach").appendChild(tagTR);
//   }
// }

function taoBang(arr) {
  var contentHTML = "";
  arr.forEach(function (item) {
    contentHTML += `
      <tr>
        <td>${item.maNV}</td>
        <td>${item.tenNV}</td>
        <td>${item.email}</td>
        <td>${item.date}</td>
        <td>${item.chucVu}</td>
        <td>
          <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="suaNhanVien('${item.maNV}')">Edit</button>
          <button class="btn btn-danger" onclick="xoaNhanVien('${item.maNV}')">Delete</button>
        </td>
      </tr>
    `;
  });
  getEle("tableDanhSach").innerHTML = contentHTML;
}

/**
 * Xoa Nhan Vien
 */
function xoaNhanVien(maNV) {
  dsnv.xoaNhanVien(maNV);
  taoBang(dsnv.arr);
  setLocalStorage();
}

/**
 * Sua Nhan Vien
 */
function suaNhanVien(maNV) {
  getEle("btnThemNV").style.display = "none";
  getEle("btnCapNhat").style.display = "block";

  var nhanVien = dsnv.layThongTinNhanVien(maNV);
  console.log(nhanVien);
  /**
   * Dom 6 ô input gán value từ nhanVien
   */
  getEle("msnv").value = nhanVien.maNV;

  getEle("msnv").setAttribute("disabled", true);

  getEle("name").value = nhanVien.tenNV;
  getEle("email").value = nhanVien.email;
  getEle("password").value = nhanVien.password;
  getEle("datepicker").value = nhanVien.date;
  getEle("chucvu").value = nhanVien.chucVu;
}

/**
 * Cap nhat Nhan Vien
 */
getEle("btnCapNhat").addEventListener("click", function () {
  /**
   * Dom tới 6 ô input lấy value mới
   */
  var maNV = getEle("msnv").value;
  var tenNV = getEle("name").value;
  var email = getEle("email").value;
  var password = getEle("password").value;
  var date = getEle("datepicker").value;
  var chucVu = getEle("chucvu").value;

  var nhanVien = new NhanVien(maNV, tenNV, email, password, date, chucVu);
  dsnv.capNhatNhanVien(nhanVien);
  taoBang(dsnv.arr);
  setLocalStorage();

  getEle("btnDong").click();
});

/**
 * Tim kiem nhan vien
 */
getEle("searchName").addEventListener("keyup", function () {
  var keyword = getEle("searchName").value;
  var mangTimKiem = dsnv.timKiemNhanVien(keyword);
  taoBang(mangTimKiem);
});

/**
 * Lưu mảng dsnv.arr xuống LocalStorage
 * Chuyển data thành kiểu string
 */
function setLocalStorage() {
  localStorage.setItem("DSNV", JSON.stringify(dsnv.arr));
}

/**
 * lấy mảng dsnv.arr từ LocalStorage
 * Chuyển qua kiểu JSON
 */
function getLocalStorage() {
  if (localStorage.getItem("DSNV")) {
    //Lấy mảng từ LocalStorage gán vào biến arr
    var arr = localStorage.getItem("DSNV");
    //Chuyển arr thành kiểu JSON sau đó gán vào dsnv.arr
    dsnv.arr = JSON.parse(arr);
    taoBang(dsnv.arr);
  }
}

function getEle(id) {
  return document.getElementById(id);
}
// document.getElementById("searchName").addEventListener("keyup", function () {
//   console.log(document.getElementById("searchName").value);
// });
