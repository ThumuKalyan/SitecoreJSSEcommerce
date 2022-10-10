function pubSub() {
  const subscribers = {};

  function publish(eventName, data) {
    if (!Array.isArray(subscribers[eventName])) {
      if (document.querySelector('.badge')) {
        document.querySelector('.badge').innerHTML = data.length;
      }

      return;
    }
    subscribers[eventName].forEach((callback) => {
      callback(data);
    });
  }

  function subscribe(eventName, callback) {
    if (!Array.isArray(subscribers[eventName])) {
      subscribers[eventName] = [];
    }
    subscribers[eventName].push(callback);
  }

  return {
    publish,
    subscribe,
  };
}

export default pubSub;
