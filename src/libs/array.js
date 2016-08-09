/**
 * Created by JasonChou on 16/5/11.
 */

/**
 * 交集
 */
export default{
    intersection: function (arr, arr1, compareCB) {
        var res = [];
        arr.forEach(function (tmp) {
            arr1.forEach(function (tmp1) {
                if (compareCB(tmp, tmp1))
                    res.push(tmp);
            })
        });

        return res;
    },

    /**
     * 并集
     */
    union: function (arr, arr1, compareCB) {
        var res = [];
        arr.forEach(function (tmp) {
            res.push(tmp);
        });


        res.forEach(function (tmp) {
            arr1.forEach(function (tmp1) {
                if (!compareCB(tmp, tmp1))
                    res.push(tmp1);
            })
        });

        return res;
    }
}