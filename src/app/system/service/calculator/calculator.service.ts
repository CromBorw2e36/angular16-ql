import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }


  calculateFromString(chuoi?: string): any {
    // Xóa khoảng trắng trong chuỗi đầu vào

    try {
      if (chuoi) {
        const cleanedString = chuoi.replace(/\s/g, '');
        // Thay thế các chuỗi logarit bằng kết quả
        const replacedString = cleanedString.replace(/log\(/g, 'Math.log(');
        const replacedStringBase10 = replacedString.replace(/log10\(/g, 'Math.log10(');
        const replaceStringSqrt = cleanedString.replace(/sqrt\(/g, 'Math.sqrt(');

        // Phương trình bậc 2
        const matches = cleanedString.match(/(-?\d+(\.\d+)?)[*]?x\^2([-+]\d+(\.\d+)?[*]?x)?([-+]?\d+(\.\d+)?)/i);
        if (matches && matches.length >= 4) {
          return this.giaiPhuongTrinhBacHai(chuoi);
        }


        // Sử dụng hàm eval để tính toán biểu thức trong chuỗi
        const ketQua = eval(replaceStringSqrt);
        // Kiểm tra nếu kết quả là số vô hướng hoặc không
        if (isNaN(ketQua)) {
          return 'Không hợp lệ';
        } else {
          return ketQua;
        }
      }
    } catch (error) {
      return 'Lỗi';
    }
  }

  giaiPhuongTrinhBacHai(chuoi: string): string | number[] {
    // Xóa khoảng trắng trong chuỗi đầu vào
    const cleanedString = chuoi.replace(/\s/g, '');

    // Tìm các hệ số a, b, c trong chuỗi
    const matches = cleanedString.match(/(-?\d+(\.\d+)?)[*]?x\^2([-+]\d+(\.\d+)?[*]?x)?([-+]?\d+(\.\d+)?)/i);

    if (!matches || matches.length < 4) {
      return 'Không tìm thấy phương trình bậc hai hợp lệ trong chuỗi';
    }

    const a = parseFloat(matches[1]);
    const b = parseFloat(matches[3]) || 0;
    const c = parseFloat(matches[5]);

    if (a === 0) {
      return 'Đây không phải là phương trình bậc hai';
    }

    const delta = b * b - 4 * a * c;

    if (delta > 0) {
      const x1 = (-b + Math.sqrt(delta)) / (2 * a);
      const x2 = (-b - Math.sqrt(delta)) / (2 * a);
      return [x1, x2];
    } else if (delta === 0) {
      const x = -b / (2 * a);
      return [x];
    } else {
      return 'Phương trình không có nghiệm thực';
    }
  }

}
