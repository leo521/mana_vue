/**
 * Created by JasonChou on 16/4/11.
 */

var eventBus = {};

var events_subscribers = {};

var queue = [];
var time = 100;

/**
 * 订阅者
 * @param event
 * @param subscriber
 * @param once
 */
eventBus.subscribe = function (event, subscriber, once) {
    if (!events_subscribers[event]) {
        events_subscribers[event] = [];
    }
    events_subscribers[event].push({
        cb: subscriber,
        once: once
    });
};

eventBus.subscribeOnce = function (event, subscriber) {
    this.subscribe(event, subscriber, true);
};

/**
 * 发布信息
 * @param event
 * @param data
 * @param intercept
 */
eventBus.publish = function (event, data, intercept) {
    this.startPoll();

    var message = {
        event: event,
        data: data,
        intercept: intercept
    };
    //进入队列
    queue.push(message);
};

/**
 * 执行信息
 */
eventBus.execute = function () {
    while (true) {
        var message = queue.pop();
        if (!message)
            return;

        this.execMsg(message);
    }
};

eventBus.execMsg = function (message) {
    var subscribers = events_subscribers[message.event];

    if (subscribers && subscribers.length > 0)
        subscribers.forEach(function (subscriber, i) {

            try {
                if (subscriber.cb(message.data, message.error_cb)) {
                    if (subscriber.once) {
                        subscribers.splice(i, 1);
                    }

                    if (message.intercept)
                        return;

                }
            } catch (e) {
                //处理错误
            }
        });
};


var intervalId;

/**
 * 定时轮询信息
 */
eventBus.startPoll = function () {
    if (!intervalId)
        intervalId = setInterval(function () {
            if (queue.length != 0) {
                //执行队列消息
                eventBus.execute();
                clearInterval(intervalId);
                intervalId = null;
            }
        }, time);
};

export{ eventBus};