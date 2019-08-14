/**
 * 通用
 */

export const size = 10; // 分页数量

/**
 * 说明:阿拉伯数字转汉字数字
 * 作者:RayJ
 * 更新时间:2019-03-04 
 */
export function num2word(num){
    switch (num){
        case "1":
            return "一"
            break;
        case "2":
            return "二"
            break;
        case "3":
            return "三"
            break;
        case "4":
            return "四"
            break;
        case "5":
            return "五"
            break;
        case "6":
            return "六"
            break;
        case "7":
            return "七"
            break;
        case "8":
            return "八"
            break;
        case "9":
            return "九"
            break;
        case "10":
            return "十"
            break;
        // case "10":
        //     return "十"
        //     break;
    }
}


/* 
数字转阿拉伯
*/
export function convert(number) {
    var s1 = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    var s2 =["十", "百", "千", "万", "十", "百", "千", "亿", "十", "百", "千"];
   // var number = number + "";
    var result = "";
    //console.log(number, number.length,76766)
    var n = number.length;
    if (number == 10) {
        return s2[0];
    } else if (10 < number && number < 20) {
        return s2[0] + s1[parseInt(number.substring(number.length - 1))];
    } else {
        for (var i = 0; i < n; i++) {
            var num = number.charAt(i) - '0';
            if (i != n - 1 && num != 0) {
                result += s1[num] + s2[n - 2 - i];
            } else {
                result += s1[num];
            }
        }
        //console.log(result.substring(result.length - 1),77)
        if (result.substring(result.length - 1) == ("零")) {
            //对 20,30，40 等这样的数字做特殊处理
            result = result.substring(0, result.length - 1);
        }
    }
    return result;
}