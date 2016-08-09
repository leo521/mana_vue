/**
 * Created by JasonChou on 16/5/3.
 */

//Promise
export default function Promise(func) {

  var _Status_ = {
    Pending: 'Pending',
    Resolved: 'Resolved',
    Rejected: 'Rejected'
  };
  this.viewStatus = function () {
    return _Status_
  };
  var DoneList = [];
  var ErrorkList = [];

  var ErrorRes = null;
  var DoneRes = null;

  this.status = _Status_.Pending;
  this.done = function (callback) {
    if (typeof callback == 'function') {
      if (this.status == _Status_.Pending) {
        DoneList.push(callback);
      } else if (this.status == _Status_.Resolved) {
        callback(DoneRes);
      }
    }
    return this;
  };
  this.error = function (callback) {
    if (typeof callback == 'function') {
      if (this.status == _Status_.Pending) {
        ErrorkList.push(callback);
      } else if (this.status == _Status_.Rejected) {
        callback(ErrorRes);
      }
    }
    return this;
  };
  this.reject = function (error) {
    if (this.status == _Status_.Pending) {
      ErrorRes = error;
      this.status = _Status_.Rejected;
      for (var i = 0; i < ErrorkList.length; i++) {
        ErrorkList[i](ErrorRes);
      }
    }
  };
  this.resolve = function (done) {
    if (this.status == _Status_.Pending) {
      DoneRes = done;
      this.status = _Status_.Resolved;
      for (var i = 0; i < DoneList.length; i++) {
        DoneList[i](DoneRes);
      }
    }
  };
  this.then = function (nfunc) {
    var lastPromise = this;
    return new Promise(function (resolve, reject) {
      lastPromise.done(function () {
        new Promise(nfunc)
          .done(function () {
            resolve();
          }).error(function () {
          reject();
        })
      });
    });
  };
  if (typeof func == 'function')func.bind(this)(this.resolve.bind(this), this.reject.bind(this));
}
