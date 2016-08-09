/**
 * Created by JasonChou on 16/5/17.
 */
var rootView;

export var registerRoot = function (rv) {
    rootView = rv;
};

var publish = function (key, content) {
    if (!rootView)
        return;

    rootView.emit(key, content);
};
export {publish}