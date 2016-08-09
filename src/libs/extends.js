/**
 * Created by JasonChou on 16/5/3.
 */
String.prototype.firstUpperCase = function () {
    this.replace(/(\w)/, function (v) {
        return v.toUpperCase() + 'ddd'
    });
};

var name = 'zwb';
var a = name.firstUpperCase();

console.log(a);
console.log(name);